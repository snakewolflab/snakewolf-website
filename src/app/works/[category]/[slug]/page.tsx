
import { getWorks } from '@/lib/data-loader';
import WorkDetailClient from './work-detail-client';

export const dynamicParams = true;

export async function generateStaticParams() {
  const works = await getWorks();
  if (!works) return [];
  return works.map((work) => ({
    category: work.category.toLowerCase() + 's',
    slug: work.slug,
  }));
}

export default function WorkDetailPage() {
  return <WorkDetailClient />;
}
