
import Image from 'next/image';
import type { Metadata } from 'next';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { serviceItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'サービス',
  description: 'SnakeWolfが提供する最先端のテクノロジーサービス一覧です。',
};

const serviceLinks = {
  'アプリ・ゲーム開発': '/services/app-game-development',
  'クリエイター支援': '/services/creator-support',
}

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
          const serviceLink = serviceLinks[item.title as keyof typeof serviceLinks] || '/services';

          return (
            <Card key={item.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
              <div className="w-full h-56 relative">
                {serviceImage && (
                  <Image
                    src={serviceImage.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={serviceImage.imageHint}
                  />
                )}
              </div>
              <div className="w-full flex flex-col flex-grow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                       <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className='flex-grow'>{item.description}</CardDescription>
                   <Button asChild variant="link" className="p-0 mt-4 self-start">
                      <Link href={serviceLink}>
                          詳しく見る <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
