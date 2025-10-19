import Image from 'next/image';
import { Image as ImageIcon, Video, Info } from 'lucide-react';
import type { Metadata } from 'next';

import { mediaItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'ギャラリー',
  description: 'SnakeWolfの活動や製品を紹介する画像や動画をご覧ください。',
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">メディアギャラリー</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          SnakeWolfの世界観を伝えるビジュアルコンテンツコレクションです。
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => {
          const mediaImage = PlaceHolderImages.find(p => p.id === item.imageId);
          return (
            <Card key={item.id} className="overflow-hidden group transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="relative aspect-w-3 aspect-h-2">
                  {mediaImage && (
                    <Image
                      src={mediaImage.imageUrl}
                      alt={item.title}
                      width={mediaImage.width || 600}
                      height={mediaImage.height || 400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={mediaImage.imageHint}
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-full shadow-md">
                    {item.type === 'image' ? (
                      <ImageIcon className="h-5 w-5 text-primary" />
                    ) : (
                      <Video className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-headline text-lg leading-snug truncate">{item.title}</CardTitle>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex flex-col items-start gap-1">
                <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>{item.format} / {item.size}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>{item.uploadDate}</span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
