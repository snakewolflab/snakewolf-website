
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';

import { creatorItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'クリエイター',
  description: 'SnakeWolfがサポートするクリエイターの方々です。',
};

export default function CreatorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">クリエイター</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちは、才能あふれるクリエイターの活動を支援しています。
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        {creatorItems.map((item) => {
          const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
          return (
            <Card key={item.id} className="overflow-hidden group">
                <div className="md:flex">
                    <div className="md:w-1/3 p-4">
                        {itemImage && (
                        <div className="relative aspect-square">
                            <Image
                                src={itemImage.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover rounded-full border-4 border-primary/20 group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={itemImage.imageHint}
                            />
                        </div>
                        )}
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{item.description}</CardDescription>
                            <Button asChild variant="link" className="p-0 mt-4">
                                <Link href={item.url}>
                                    活動を見る <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </CardContent>
                    </div>
                </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
