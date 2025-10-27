
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, Search } from 'lucide-react';
import { collection, query, orderBy } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { NewsArticle, MediaItem } from '@/lib/firebase-data';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function NewsPage() {
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const newsQuery = useMemoFirebase(() => 
    query(collection(firestore, 'news_articles'), orderBy('publicationDate', 'desc')),
    [firestore]
  );
  const { data: articles, isLoading: articlesLoading } = useCollection<NewsArticle>(newsQuery);
  const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]));
  
  const isLoading = articlesLoading || mediaLoading;

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (!searchTerm) return articles;

    const lowercasedTerm = searchTerm.toLowerCase();
    return articles.filter(article =>
      (article.title && article.title.toLowerCase().includes(lowercasedTerm)) ||
      (article.contentSummary && article.contentSummary.toLowerCase().includes(lowercasedTerm)) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)))
    );
  }, [articles, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">ニュース</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          SnakeWolfの最新の活動、製品リリース、イベント情報などをお届けします。
        </p>
      </header>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder="ニュースを検索..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden">
              <Skeleton className="h-56 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-full" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredArticles.length === 0 ? (
            <p className="text-center col-span-full text-muted-foreground">
              {searchTerm ? '検索結果が見つかりませんでした。' : '記事がありません。'}
            </p>
        ) : filteredArticles.map((article) => {
          const articleImage = mediaItems?.find(p => p.id === article.imageId);
          const articleTags = article.tags || [];
          return (
            <Card key={article.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {articleImage && (
                <Link href={`/news/${article.slug}`} className="block relative h-56 w-full">
                  <Image
                    src={articleImage.fileUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={articleImage.imageHint}
                  />
                </Link>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Newspaper className="h-4 w-4" />
                  <span>{new Date(article.publicationDate).toLocaleDateString('ja-JP')}</span>
                </div>
                <CardTitle className="font-headline text-xl leading-snug pt-2">
                  <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground line-clamp-3 flex-grow">{article.contentSummary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {articleTags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
