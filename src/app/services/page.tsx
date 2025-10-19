import Image from 'next/image';
import type { Metadata } from 'next';
import * as LucideIcons from 'lucide-react';

import { serviceItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'サービス',
  description: 'SnakeWolfが提供する最先端のテクノロジーサービス一覧です。',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">サービス</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちは、AIとデータを活用した革新的なソリューションでお客様のビジネスを成功に導きます。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {serviceItems.map((item) => {
          const serviceImage = PlaceHolderImages.find(p => p.id === item.imageId);
          const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] || LucideIcons.Wrench;

          return (
            <Card key={item.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/3">
                {serviceImage && (
                  <Image
                    src={serviceImage.imageUrl}
                    alt={item.title}
                    width={serviceImage.width || 600}
                    height={serviceImage.height || 400}
                    className="object-cover w-full h-full"
                    data-ai-hint={serviceImage.imageHint}
                  />
                )}
              </div>
              <div className="w-full sm:w-2/3 flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                       <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
