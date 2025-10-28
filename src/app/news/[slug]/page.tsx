
import type { Metadata, ResolvingMetadata } from 'next';
import NewsArticleClient from './news-article-client';
import { getNews, getNewsBySlug } from '@/lib/data-loader';

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const news = await getNews();
  if (!news) return [];
  return news.map(article => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  const previousImages = (await parent).openGraph?.images || []

  if (!article) {
    return {
      title: 'ニュース記事が見つかりません',
    }
  }

  return {
    title: article.title,
    description: article.contentSummary,
    openGraph: {
      title: article.title,
      description: article.contentSummary,
      // images: article.imageId ? [getGitHubImageUrl(article.imageId), ...previousImages] : previousImages,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const article = await getNewsBySlug(params.slug);
  return <NewsArticleClient article={article} />;
}
