
import type { Metadata } from 'next';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'スネウル君のご紹介',
  description: 'SnakeWolf公式キャラクター「スネウル君」のプロフィールページです。',
};

export default function SuneuruKunPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'suneuru-kun-hero');

  const profileItems = [
    { label: '名前', value: 'スネウル君 (Suneuru-kun)' },
    { label: '種族', value: 'デジタル生命体のオオカミ' },
    { label: '性格', value: '好奇心旺盛でいたずら好き。でも根は優しい。' },
    { label: '特技', value: 'コードの中を自由に移動できる。' },
    { label: '好きなもの', value: '新しいテクノロジー、データの流れ、電気の味' },
    { label: '苦手なもの', value: 'バグ、オフライン環境' },
  ];

  return (
    <div>
      <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="スネウル君"
            fill
            className="object-contain"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/20 -z-10" />
      </section>

       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">スネウル君</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">SnakeWolf Official Character</p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight">スネウル君について</h2>
              <p className="text-lg text-muted-foreground">
                スネウル君は、デジタルワールドに生まれたオオカミの精霊です。SnakeWolfのサービスの中に住み着き、みんなの活動をこっそり応援したり、時にはちょっとしたイタズラをしたりしています。
              </p>
              <p className="text-muted-foreground">
                フードを深くかぶっているのは、まだ少し恥ずかしがり屋だからかもしれません。もしあなたがSnakeWolfのプロダクトの中で彼を見かけたら、ラッキーなことがあるかも？
              </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">プロフィール</CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-4">
                    {profileItems.map((info) => (
                    <li key={info.label} className="flex flex-col sm:flex-row">
                        <span className="font-bold w-full sm:w-1/3">{info.label}</span>
                        <span className="text-muted-foreground w-full sm:w-2/3">{info.value}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
