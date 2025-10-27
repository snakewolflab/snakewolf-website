
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { AppWindow, ArrowLeft, Gamepad2, Layers, ExternalLink } from 'lucide-react';

import { workItems } from '@/lib/data';
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

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const categoryMap = {
    apps: 'App',
    games: 'Game',
  };
  const category = categoryMap[params.category as keyof typeof categoryMap] || '';
  const item = workItems.find((w) => w.category === category && w.slug === params.slug);

  if (!item) {
    return {
      title: '実績が見つかりません',
    };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export function generateStaticParams() {
  return workItems.map((item) => ({
    category: item.category.toLowerCase() + 's',
    slug: item.slug,
  }));
}

export default function WorkDetailPage({ params }: Props) {
  const categoryMap = {
    apps: 'App',
    games: 'Game',
  };
  const category = categoryMap[params.category as keyof typeof categoryMap] || '';
  const item = workItems.find((w) => w.category === category && w.slug === params.slug);

  if (!item) {
    notFound();
  }

  const categoryName = item.category === 'App' ? 'アプリ実績' : 'ゲーム実績';
  const categoryUrl = `/works/${item.category.toLowerCase()}s`;
  const Icon = item.category === 'App' ? AppWindow : Gamepad2;

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
        <div className="flex items-center gap-4">
            <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">{item.title}</h1>
            {item.url && item.url !== "#" && (
                <Button asChild variant="outline" size="icon">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">Open link</span>
                    </Link>
                </Button>
            )}
        </div>
         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                {item.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary">{platform}</Badge>
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
