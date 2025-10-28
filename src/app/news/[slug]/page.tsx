
import { getNews } from '@/lib/data-loader';
import NewsArticleClient from './news-article-client';

export async function generateStaticParams() {
  const news = await getNews();
  if (!news) return [];
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsArticlePage() {
  return <NewsArticleClient />;
}
