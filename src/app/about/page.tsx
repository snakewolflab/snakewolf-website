import type { Metadata } from 'next';
import Image from 'next/image';
import { Building, Globe, Target } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: '企業情報',
  description: 'SnakeWolfの企業概要、ビジョン、沿革について。',
};

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

  const companyInfo = [
    { label: '会社名', value: '株式会社SnakeWolf' },
    { label: '設立', value: '2023年4月1日' },
    { label: '代表者', value: '代表取締役 山田 太郎' },
    { label: '所在地', value: '東京都千代田区丸の内1-1-1' },
  ];

  return (
    <div>
      <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="企業情報"
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">企業情報</h1>
          <p className="mt-4 text-lg md:text-xl">テクノロジーで未来を創造する</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight">私たちのビジョン</h2>
              <p className="text-lg text-muted-foreground">
                SnakeWolfは、最先端のテクノロジーと人間の創造性を融合させ、世界が直面する課題に対する革新的な解決策を提供することを使命としています。
              </p>
              <p className="text-muted-foreground">
                私たちは、AI、ゲーム、クリエイティブ産業の境界を越え、人々がより豊かで、より繋がりのある生活を送れるような、新しい体験と価値を創造し続けます。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Target className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">ミッション</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>革新的なテクノロジーで、持続可能な未来と新しい文化を創造する。</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center gap-4">
                        <Globe className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">バリュー</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                            <li>挑戦を恐れない</li>
                            <li>創造性を尊重する</li>
                            <li>誠実であること</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">会社概要</h2>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {companyInfo.map((info, index) => (
                  <li key={index} className="flex flex-col sm:flex-row">
                    <span className="font-bold w-full sm:w-1/4">{info.label}</span>
                    <span className="text-muted-foreground w-full sm:w-3/4">{info.value}</span>
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
