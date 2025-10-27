
'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Mic, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export const metadata: Metadata = {
//     title: 'クリエイター支援',
//     description: 'コンテンツ制作から収益化まで、あなたのクリエイティブ活動を全面的にバックアップします。',
// };

export default function CreatorSupportPage() {
    const supportMenu = [
        {
            icon: Mic,
            title: 'コンテンツ制作サポート',
            description: '企画立案、機材選定、撮影・編集技術の向上まで、質の高いコンテンツ作りを支援します。'
        },
        {
            icon: Users,
            title: 'コミュニティ運営',
            description: 'ファンとのエンゲージメントを高めるためのイベント企画やSNS戦略を一緒に考え、実行します。'
        },
        {
            icon: DollarSign,
            title: '収益化戦略',
            description: '広告収益、グッズ販売、メンバーシップなど、活動に合わせた多様な収益化プランを提案・サポートします。'
        },
        {
            icon: Heart,
            title: 'メンタル＆法務サポート',
            description: '活動に伴う悩みやトラブルに対して、専門家と連携し、安心して創作に集中できる環境を提供します。'
        }
    ];

    return (
        <div>
            <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
                <Image
                    src="https://raw.githubusercontent.com/snakewolflab/snakewolf-website/refs/heads/assets/wallpaper.png"
                    alt="クリエイター支援"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract modern"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 p-4 max-w-4xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">クリエイター支援</h1>
                    <p className="mt-4 text-lg md:text-xl">あなたの「好き」を、もっと遠くへ。</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">創作活動に、もっと集中できる環境を。</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           SnakeWolfは、クリエイターが自身の創造性を最大限に発揮できるよう、活動の裏側を全面的にサポートします。コンテンツ作りだけに集中したい、そんなあなたのためのパートナーです。
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {supportMenu.map((item, index) => (
                           <Card key={index}>
                                <CardHeader className="items-center text-center">
                                    <div className="bg-primary/10 p-4 rounded-full mb-2">
                                        <item.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className='font-headline text-xl'>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className='text-center'>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                           </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">サポートクリエイター</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            私たちと共に活動する素晴らしいクリエイターたちをご紹介します。
                        </p>
                        <div className="mt-8">
                           <Button asChild size="lg">
                                <Link href="/creators">クリエイター一覧を見る</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
