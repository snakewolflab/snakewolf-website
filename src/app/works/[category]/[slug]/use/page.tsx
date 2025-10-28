
import UseClient from './use-client';

interface PageProps {
    params: {
        category: 'apps' | 'games';
        slug: string;
    }
}

export default function UsePage({ params }: PageProps) {
  return <UseClient category={params.category} slug={params.slug} />;
}
