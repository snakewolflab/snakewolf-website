
import WorkDetailClient from './work-detail-client';

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
