
import type { Metadata, ResolvingMetadata } from 'next';
import NewsArticleClient from './news-article-client';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'ニュース記事',
    description: 'SnakeWolfの最新ニュース記事です。',
    openGraph: {
      title: 'ニュース記事',
      description: 'SnakeWolfの最新ニュース記事です。',
      // images: [...previousImages],
    },
  }
}

export default function NewsArticlePage({ params }: Props) {
  return <NewsArticleClient slug={params.slug} />;
}
