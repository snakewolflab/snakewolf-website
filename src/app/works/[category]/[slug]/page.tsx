
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppWindow, ArrowLeft, Gamepad2, Layers, Download } from 'lucide-react';
import { collection, query, where, limit } from 'firebase/firestore';

import { type WorkItem } from '@/lib/data';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function WorkDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category;
  
  const firestore = useFirestore();

  const itemQuery = useMemoFirebase(() => {
    if (!firestore || !slug) return null;
    return query(collection(firestore, 'work_items'), where('slug', '==', slug), limit(1));
  }, [firestore, slug]);
  
  const { data: items, isLoading } = useCollection<WorkItem>(itemQuery);
  const item = items?.[0];

  const categoryMap = {
    apps: 'App',
    games: 'Game',
  };
  const category = categoryMap[categoryParam as keyof typeof categoryMap] || '';

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-8"><Skeleton className="h-10 w-56" /></div>
        <header className="mb-8">
            <Skeleton className="h-6 w-24 mb-2" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Skeleton className="h-12 w-3/5" />
                <Skeleton className="h-12 w-48" />
            </div>
            <div className="mt-4"><Skeleton className="h-6 w-48" /></div>
        </header>
        <Skeleton className="w-full aspect-video mb-8" />
        <Separator className="my-8" />
        <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (!item || item.category.toLowerCase() !== categoryParam.slice(0, -1)) {
    notFound();
  }

  const categoryName = item.category === 'App' ? 'アプリ実績' : 'ゲーム実績';
  const categoryUrl = `/works/${item.category.toLowerCase()}s`;
  const Icon = item.category === 'App' ? AppWindow : Gamepad2;
  const ctaText = item.category === 'App' ? 'アプリを入手する' : 'ゲームをプレイする';

  const galleryImages = item.galleryImageIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

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
                <Link href={`/works/${categoryParam}/${params.slug}/use`}>
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

      {galleryImages.length > 0 && (
        <Carousel className="w-full mb-8" opts={{ loop: true }}>
          <CarouselContent>
            {galleryImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                       {img && (
                         <Image
                          src={img.imageUrl}
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
