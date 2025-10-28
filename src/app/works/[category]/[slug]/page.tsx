
import WorkDetailClient from './work-detail-client';
import { getWorkBySlug, getWorks } from '@/lib/data-loader';

interface PageProps {
    params: {
        category: 'apps' | 'games';
        slug: string;
    }
}

export async function generateStaticParams() {
    const works = await getWorks();
    return works.map(work => ({
        category: work.category.toLowerCase() + 's',
        slug: work.slug,
    }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const item = await getWorkBySlug(params.slug);
  return <WorkDetailClient category={params.category} slug={params.slug} item={item} />;
}
