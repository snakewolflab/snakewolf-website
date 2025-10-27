
'use client';

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { collection, query, where, limit } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { NewsArticle, MediaItem, Tag as TagType } from '@/lib/firebase-data';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShareMenu } from './_components/share-button';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsArticlePage() {
  const params = useParams<{ slug: string }>();
  const firestore = useFirestore();

  const articleQuery = useMemoFirebase(() => 
    query(collection(firestore, 'news_articles'), where('slug', '==', params.slug), limit(1)),
    [firestore, params.slug]
  );
  
  const { data: articles, isLoading: articleLoading } = useCollection<NewsArticle>(articleQuery);
  const article = articles?.[0];

  const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]));
  
  const isLoading = articleLoading || mediaLoading;

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
             <Skeleton className="h-10 w-48 mb-8" />
             <Skeleton className="h-12 w-full mb-4" />
             <Skeleton className="h-8 w-3/4 mb-8" />
             <Skeleton className="aspect-video w-full rounded-lg mb-8" />
             <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
             </div>
        </div>
    );
  }

  if (!article) {
    notFound();
  }

  const articleImage = mediaItems?.find(p => p.id === article.imageId);
  const articleTags = article.tags || [];

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ニュース一覧に戻る
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.publicationDate).toLocaleDateString('ja-JP')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                    {articleTags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    </div>
                </div>
            </div>
            <ShareMenu title={article.title} />
        </div>
      </header>

      {articleImage && (
        <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={articleImage.fileUrl}
            alt={article.title}
            fill
            className="object-cover"
            data-ai-hint={articleImage.imageHint}
            priority
          />
        </div>
      )}

      <Separator className="my-8" />

      <div
        className="prose prose-lg dark:prose-invert max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
