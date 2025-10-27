
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AppWindow } from 'lucide-react';

import { workItemsData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'アプリ実績',
  description: 'SnakeWolfが開発したアプリの実績一覧です。',
};

const workItems = workItemsData.map((item, index) => ({...item, id: `${index + 1}`}));

export default function AppsPage() {
  const appWorks = workItems.filter(item => item.category === 'App');

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">アプリ実績</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちが情熱を注いで開発した、革新的なアプリケーションの数々をご覧ください。
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {appWorks.map((item) => {
          const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {itemImage && (
                <Link href={`/works/apps/${item.slug}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={itemImage.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      data-ai-hint={itemImage.imageHint}
                    />
                  </div>
                </Link>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AppWindow className="h-4 w-4 text-primary" />
                    <span className='font-bold text-primary'>{item.category}</span>
                </div>
                <CardTitle className="font-headline text-2xl pt-2">
                  <Link href={`/works/apps/${item.slug}`} className="hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="flex-grow">{item.description}</CardDescription>
                <div className="mt-4 flex flex-wrap items-center justify-between">
                    <div className='flex flex-wrap gap-2'>
                        {item.platforms.map((platform) => (
                            <Badge key={platform.name} variant="secondary">{platform.name}</Badge>
                        ))}
                    </div>
                     <Button asChild variant="link" className="mt-4 sm:mt-0">
                        <Link href={`/works/apps/${item.slug}`}>
                            詳しく見る <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
