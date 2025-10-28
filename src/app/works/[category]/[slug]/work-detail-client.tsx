
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppWindow, ArrowLeft, Gamepad2, Layers, Download, Loader2 } from 'lucide-react';

import type { WorkItem } from '@/lib/firebase-data';
import { getWorkBySlug } from '@/lib/data-loader';
import { getGitHubImageUrl } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';

export default function WorkDetailClient() {
  const params = useParams();
  const category = params.category as 'apps' | 'games';
  const slug = params.slug as string;
  const [item, setItem] = useState<WorkItem | undefined | null>(undefined);

  useEffect(() => {
    if (slug) {
      getWorkBySlug(slug).then(data => {
        setItem(data === undefined ? null : data);
      });
    }
  }, [slug]);

  if (item === undefined) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (item === null) {
    notFound();
  }

  const categoryName = item.category === 'App' ? 'アプリ実績' : 'ゲーム実績';
  const categoryUrl = `/works/${item.category.toLowerCase()}s`;
  const Icon = item.category === 'App' ? AppWindow : Gamepad2;
  const ctaText = item.category === 'App' ? 'アプリを入手する' : 'ゲームをプレイする';

  const galleryImages = item.galleryImageIds?.map(id => getGitHubImageUrl(id)).filter(Boolean) as string[];

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
                <Link href={`/works/${category}/${slug}/use`}>
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
            {galleryImages.map((imgUrl, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                       {imgUrl && (
                         <Image
                          src={imgUrl}
                          alt={`${item.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
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
