
import WorkDetailClient from './work-detail-client';

interface PageProps {
    params: {
        category: 'apps' | 'games';
        slug: string;
    }
}

export async function generateStaticParams() {
  // We will not pre-build any pages at build time.
  // Instead, they will be generated on-demand on the client.
  return [];
}

// The page itself is a Server Component, which wraps the Client Component
export default function WorkDetailPage({ params }: PageProps) {
  return <WorkDetailClient category={params.category} slug={params.slug} />;
}
