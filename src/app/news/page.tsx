import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';

import { newsArticlesData, type NewsArticle } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'ニュース',
  description: 'SnakeWolfの最新の活動、製品リリース、イベント情報などをお届けします。',
};

export default function NewsPage() {
  const articles = [...newsArticlesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">ニュース</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          SnakeWolfの最新の活動、製品リリース、イベント情報などをお届けします。
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.length === 0 ? (
            <p className="text-center col-span-full text-muted-foreground">記事がありません。</p>
        ) : articles.map((article) => {
          const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
          return (
            <Card key={article.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {articleImage && (
                <div className="relative h-56 w-full">
                  <Image
                    src={articleImage.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={articleImage.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Newspaper className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <CardTitle className="font-headline text-xl leading-snug pt-2">
                  <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground line-clamp-3 flex-grow">{article.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
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
