
import UseClient from './use-client';
import { getWorks, getWorkBySlug } from '@/lib/data-loader';


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

export default async function UsePage({ params }: PageProps) {
  const item = await getWorkBySlug(params.slug);
  return <UseClient category={params.category} slug={params.slug} item={item}/>;
}
