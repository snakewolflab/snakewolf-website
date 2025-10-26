
'use client';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import Snewol1 from '../../character/1.png';
import Snewol2 from '../../character/2.png';
import Snewol3 from '../../character/3.png';
import Snewol4 from '../../character/4.png';
import Snewol5 from '../../character/5.png';
import Snewol6 from '../../character/6.png';
import Snewol7 from '../../character/7.png';
import Snewol8 from '../../character/8.png';
import Snewol9 from '../../character/9.png';
import Snewol10 from '../../character/10.png';
import Snewol11 from '../../character/11.png';
import Snewol12 from '../../character/12.png';
import Snewol13 from '../../character/13.png';
import Snewol14 from '../../character/14.png';
import Snewol15 from '../../character/15.png';
import Snewol16 from '../../character/16.png';
import Snewol17 from '../../character/17.png';
import Snewol18 from '../../character/18.png';
import Snewol19 from '../../character/19.png';
import Snewol20 from '../../character/20.png';

const characterImages = [
    Snewol1, Snewol2, Snewol3, Snewol4, Snewol5,
    Snewol6, Snewol7, Snewol8, Snewol9, Snewol10,
    Snewol11, Snewol12, Snewol13, Snewol14, Snewol15,
    Snewol16, Snewol17, Snewol18, Snewol19, Snewol20
];


// export const metadata: Metadata = {
//   title: 'スネウル君のご紹介',
//   description: 'SnakeWolf公式キャラクター「スネウル君」のプロフィールページです。',
// };

export default function SuneuruKunPage() {

  const profileItems = [
    { label: '名前', value: 'スネウル君 (Suneuru-kun)' },
    { label: '種族', value: 'デジタル生命体のオオカミ' },
    { label: '性格', value: '好奇心旺盛でいたずら好き。でも根は優しい。' },
    { label: '特技', value: 'コードの中を自由に移動できる。' },
    { label: '好きなもの', value: 'SnakeWolfメンバー' },
    { label: '苦手なもの', value: '寝起き' },
  ];

  return (
    <div>
      <section className="py-12 md:py-16 bg-primary/10">
        <div className="container mx-auto px-4">
            <Carousel className="w-full max-w-4xl mx-auto"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {characterImages.map((img, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="overflow-hidden">
                                <CardContent className="flex aspect-square items-center justify-center p-0">
                                    <Image
                                        src={img}
                                        alt={`スネウル君 スタイル ${index + 1}`}
                                        className="object-contain w-full h-full"
                                        data-ai-hint="wolf mascot"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
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
              <p className="text-muted-foreground pt-4">
                スネウル君は寝起きはオッドアイではありません(そういう特殊な子です)。
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
