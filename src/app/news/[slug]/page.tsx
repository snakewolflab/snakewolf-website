import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';

import { newsArticles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShareButton } from './_components/share-button';
import Wallpaper from '../../wallpaper.png';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = newsArticles.find((article) => article.slug === params.slug);

  if (!article) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: article.title,
    description: article.summary,
  };
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsArticlePage({ params }: Props) {
  const article = newsArticles.find((article) => article.slug === params.slug);

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
            <ShareButton title={article.title} />
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
