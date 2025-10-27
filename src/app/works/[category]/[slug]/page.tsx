'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppWindow, ArrowLeft, Gamepad2, Layers, Download } from 'lucide-react';
import { collection, query, where, limit } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { WorkItem, MediaItem } from '@/lib/firebase-data';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default function WorkDetailPage() {
  const params = useParams<{ category: 'apps' | 'games'; slug: string }>();
  const firestore = useFirestore();

  const itemQuery = useMemoFirebase(() => 
    query(collection(firestore, 'works'), where('slug', '==', params.slug), where('category', '==', params.category === 'apps' ? 'App' : 'Game'), limit(1)),
    [firestore, params.slug, params.category]
  );

  const { data: items, isLoading: itemLoading } = useCollection<WorkItem>(itemQuery);
  const item = items?.[0];

  const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]));

  const isLoading = itemLoading || mediaLoading;
  
  if(isLoading) {
      return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="mb-8 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
            </div>
             <Skeleton className="w-full aspect-video mb-8" />
             <Separator className="my-8" />
             <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
             </div>
        </div>
      );
  }

  if (!item) {
    notFound();
  }

  const categoryName = item.category === 'App' ? 'アプリ実績' : 'ゲーム実績';
  const categoryUrl = `/works/${item.category.toLowerCase()}s`;
  const Icon = item.category === 'App' ? AppWindow : Gamepad2;
  const ctaText = item.category === 'App' ? 'アプリを入手する' : 'ゲームをプレイする';

  const galleryImages = item.galleryImageIds?.map(id => mediaItems?.find(p => p.id === id)).filter(Boolean) as MediaItem[];

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
       <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href={categoryUrl}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {categoryName}一覧に戻る
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <Icon className="h-5 w-5" />
            <span>{item.category}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">{item.title}</h1>
            <Button asChild size="lg">
                <Link href={`/works/${params.category}/${params.slug}/use`}>
                    <Download className="mr-2 h-5 w-5" />
                    {ctaText}
                </Link>
            </Button>
        </div>
         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                {item.platforms.map((platform) => (
                    <Badge key={platform.name} variant="secondary">{platform.name}</Badge>
                ))}
                </div>
            </div>
        </div>
      </header>

      {galleryImages && galleryImages.length > 0 && (
        <Carousel className="w-full mb-8" opts={{ loop: true }}>
          <CarouselContent>
            {galleryImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                       {img && (
                         <Image
                          src={img.fileUrl}
                          alt={`${item.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          data-ai-hint={img.imageHint}
                        />
                       )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      )}

      <Separator className="my-8" />
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: item.longDescription }}
      />

    </div>
  );
}
