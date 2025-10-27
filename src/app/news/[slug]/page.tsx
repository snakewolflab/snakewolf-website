
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { collection, query, where, limit } from 'firebase/firestore';

import { type NewsArticle } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShareMenu } from './_components/share-button';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsArticlePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const firestore = useFirestore();

  const articleQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(collection(firestore, 'news_articles'), where('slug', '==', slug), limit(1));
  }, [firestore, slug]);
  
  const { data: articles, isLoading } = useCollection<NewsArticle>(articleQuery);
  const article = articles?.[0];

  if (isLoading) {
    return (
        <article className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="mb-8">
              <Skeleton className="h-10 w-48" />
            </div>

            <header className="mb-8">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-8 w-3/4 mb-6" />
              <div className="flex flex-wrap items-center justify-between gap-y-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-10 w-36" />
              </div>
            </header>

            <Skeleton className="relative h-64 md:h-96 w-full rounded-lg mb-8" />
            
            <Separator className="my-8" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
        </article>
    );
  }

  if (!article) {
    notFound();
  }

  const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);

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
                    <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
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
            src={articleImage.imageUrl}
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
