
import WorkDetailClient from './work-detail-client';

interface PageProps {
    params: {
        category: 'apps' | 'games';
        slug: string;
    }
}

export default function WorkDetailPage({ params }: PageProps) {
  return <WorkDetailClient category={params.category} slug={params.slug} />;
}
