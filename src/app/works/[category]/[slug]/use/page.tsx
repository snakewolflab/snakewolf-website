
import { getWorks } from '@/lib/data-loader';
import UseClient from './use-client';

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({
    category: work.category.toLowerCase() + 's',
    slug: work.slug,
  }));
}

export default function UsePage() {
  return <UseClient />;
}
