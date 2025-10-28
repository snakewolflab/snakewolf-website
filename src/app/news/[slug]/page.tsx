
import type { Metadata, ResolvingMetadata } from 'next';
import type { NewsArticle } from '@/lib/firebase-data';
import NewsArticleClient from './news-article-client';

type Props = {
  params: { slug: string }
}

// メタデータはクライアント側でフェッチされるため、この関数は簡略化または削除できます。
// ただし、基本的なメタデータを提供するために残しておくことも可能です。
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  // 静的ビルド時にはサーバーサイドでデータを取得できないため、
  // 固定のタイトルまたは汎用的なタイトルを設定します。
  // 詳細なタイトルはクライアントコンポーネント側で設定されます（必要であれば）。

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: 'ニュース記事', // 汎用的なタイトル
    description: 'SnakeWolfの最新ニュース記事です。',
    openGraph: {
      title: 'ニュース記事',
      description: 'SnakeWolfの最新ニュース記事です。',
      // images: [...previousImages],
    },
  }
}

// ページコンポーネント
export default function NewsArticlePage({ params }: Props) {
  // The client component will handle data fetching via hooks and rendering
  return <NewsArticleClient slug={params.slug} />;
}
