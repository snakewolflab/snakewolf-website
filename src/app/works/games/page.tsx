'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import { collection, query, where } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WorkItem, MediaItem } from '@/lib/firebase-data';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// export const metadata: Metadata = {
//   title: 'ゲーム実績',
//   description: '私たちが情熱を注いで開発した、没入感あふれるゲームの数々をご覧ください。',
// };

export default function GamesPage() {
  const firestore = useFirestore();

  const worksQuery = useMemoFirebase(() => 
    query(collection(firestore, 'works'), where('category', '==', 'Game')),
    [firestore]
  );
  const { data: gameWorks, isLoading: worksLoading } = useCollection<WorkItem>(worksQuery);
  const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]));

  const isLoading = worksLoading || mediaLoading;

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">ゲーム実績</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちが情熱を注いで開発した、没入感あふれるゲームの数々をご覧ください。
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2">
        {isLoading ? (
            Array.from({length: 2}).map((_, i) => (
                <Card key={i} className="flex flex-col overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <CardHeader>
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <Skeleton className="h-12 w-full flex-grow" />
                        <div className="mt-4 flex flex-wrap items-center justify-between">
                            <div className='flex flex-wrap gap-2'>
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-8 w-28 mt-4 sm:mt-0" />
                        </div>
                    </CardContent>
                </Card>
            ))
        ) : gameWorks && gameWorks.length === 0 ? (
          <p className="text-center col-span-full text-muted-foreground">ゲームがありません。</p>
        ) : gameWorks?.map((item) => {
          const itemImage = mediaItems?.find(p => p.id === item.imageId);
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {itemImage && (
                 <Link href={`/works/games/${item.slug}`}>
                    <div className="relative h-64 w-full">
                    <Image
                        src={itemImage.fileUrl}
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
                    <Gamepad2 className="h-4 w-4 text-primary" />
                    <span className='font-bold text-primary'>{item.category}</span>
                </div>
                 <CardTitle className="font-headline text-2xl pt-2">
                    <Link href={`/works/games/${item.slug}`} className="hover:text-primary transition-colors">
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
                        <Link href={`/works/games/${item.slug}`}>
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
