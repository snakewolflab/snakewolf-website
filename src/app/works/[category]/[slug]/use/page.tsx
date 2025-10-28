
import UseClient from './use-client';

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

export default function UsePage({ params }: PageProps) {
  return <UseClient category={params.category} slug={params.slug} />;
}
