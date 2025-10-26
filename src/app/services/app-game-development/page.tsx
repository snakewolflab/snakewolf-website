
import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Code, Gamepad2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Wallpaper from '../../wallpaper.png';

export const metadata: Metadata = {
    title: 'アプリ・ゲーム開発',
    description: '企画から開発、運用までワンストップでサポート。あなたのアイデアを形にします。',
};

export default function AppGameDevelopmentPage() {
    const features = [
        {
            icon: Smartphone,
            title: 'マルチプラットフォーム対応',
            description: 'iOS, Android, Web, PC, コンソールなど、様々なプラットフォームに対応した開発が可能です。',
        },
        {
            icon: Gamepad2,
            title: '魅力的なゲーム体験',
            description: 'UnityやUnreal Engineを駆使し、プレイヤーを夢中にさせる高品質なゲームを開発します。',
        },
        {
            icon: Code,
            title: '最新技術の活用',
            description: 'AIやクラウド技術を積極的に取り入れ、他にはないユニークな機能を持つアプリやゲームを創造します。',
        },
    ];

    return (
        <div>
            <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
                <Image
                    src={Wallpaper}
                    alt="アプリ・ゲーム開発"
                    fill
                    className="object-cover"
                    data-ai-hint="abstract modern"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 p-4 max-w-4xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold">アプリ・ゲーム開発</h1>
                    <p className="mt-4 text-lg md:text-xl">あなたのアイデアを、世界を魅了する体験へ。</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">企画から運用までワンストップで</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            SnakeWolfは、単なる開発会社ではありません。お客様のビジョンを深く理解し、企画、デザイン、開発、そしてリリース後の運用・改善まで、一貫したパートナーとしてプロジェクトを成功に導きます。
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 bg-card rounded-lg shadow-md">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4">
                     <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">制作実績</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            私たちが手掛けたプロジェクトの一部をご覧ください。
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                           <Button asChild size="lg">
                                <Link href="/works/apps">アプリ一覧を見る</Link>
                            </Button>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/works/games">ゲーム一覧を見る</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
