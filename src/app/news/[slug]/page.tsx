
import type { Metadata, ResolvingMetadata } from 'next';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { NewsArticle } from '@/lib/firebase-data';
import NewsArticleClient from './news-article-client';

type Props = {
  params: { slug: string }
}

// 静的パスを生成
export async function generateStaticParams() {
  // Note: This function cannot use hooks, so we initialize a temporary client.
  const { firestore } = initializeFirebase();
  const articlesCollection = collection(firestore, 'news_articles');
  const articlesSnapshot = await getDocs(articlesCollection);
  const paths = articlesSnapshot.docs
    .map(doc => ({ slug: doc.data().slug }))
    .filter(p => p.slug); // Filter out any articles that might not have a slug
  return paths;
}

// メタデータを生成
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { firestore } = initializeFirebase();
  const articleQuery = query(collection(firestore, 'news_articles'), where('slug', '==', params.slug), limit(1));
  const articleSnapshot = await getDocs(articleQuery);
  const article = articleSnapshot.docs[0]?.data() as NewsArticle;

  if (!article) {
    return {
      title: '記事が見つかりません',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: article.title,
    description: article.contentSummary,
    openGraph: {
      title: article.title,
      description: article.contentSummary,
      // You might want to add an image from the article here
      // images: [article.imageUrl, ...previousImages],
    },
  }
}

// ページコンポーネント
export default function NewsArticlePage({ params }: Props) {
  // The client component will handle data fetching via hooks and rendering
  return <NewsArticleClient slug={params.slug} />;
}
