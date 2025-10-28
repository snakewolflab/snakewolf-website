
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, Loader2 } from 'lucide-react';

import type { NewsArticle } from '@/lib/firebase-data';
import { getNewsBySlug } from '@/lib/data-loader';
import { getGitHubImageUrl } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShareMenu } from './_components/share-button';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsArticleClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<NewsArticle | undefined | null>(undefined);

  useEffect(() => {
    if (slug) {
      getNewsBySlug(slug).then(data => {
        setArticle(data === undefined ? null : data);
      });
    }
  }, [slug]);

  if (article === undefined) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  if (article === null) {
    notFound();
  }

  const articleImage = getGitHubImageUrl(article.imageId);
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
            src={articleImage}
            alt={article.title}
            fill
            className="object-cover"
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
