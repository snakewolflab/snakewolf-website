
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { WorkItem } from '@/lib/firebase-data';
import WorkDetailClient from './work-detail-client';

export async function generateStaticParams() {
    // Note: This function cannot use hooks, so we initialize a temporary client.
    const { firestore } = initializeFirebase();
    const worksCollection = collection(firestore, 'works');
    const worksSnapshot = await getDocs(worksCollection);
    const paths = worksSnapshot.docs
      .map(doc => {
        const work = doc.data() as WorkItem;
        if (!work.slug || !work.category) return null;
        return {
            category: work.category === 'App' ? 'apps' : 'games',
            slug: work.slug,
        };
      })
      .filter(Boolean) as { category: string, slug: string }[];
    return paths;
}

interface PageProps {
    params: {
        category: 'apps' | 'games';
        slug: string;
    }
}

// The page itself is a Server Component, which wraps the Client Component
export default function WorkDetailPage({ params }: PageProps) {
  return <WorkDetailClient category={params.category} slug={params.slug} />;
}
