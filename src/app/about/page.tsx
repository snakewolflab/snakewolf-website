
import type { Metadata } from 'next';
import Image from 'next/image';
import { Building, Globe, Target, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Wallpaper from '../wallpaper.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '企業情報',
  description: 'SnakeWolfの企業概要、ビジョン、沿革について。',
};

export default function AboutPage() {
  const companyInfo = [
    { label: '会社名', value: '非公開' },
    { label: '設立', value: '非公開' },
    { label: '代表者', value: '非公開' },
  ];

  const projectInfo = [
    { label: 'プロジェクト名', value: 'SnakeWolf' },
    { label: 'ビジョン', value: '革新的なデジタル体験で、未来を創造する' },
    { label: '活動内容', value: 'ゲーム開発、クリエイター支援など' },
  ];


  return (
    <div>
      <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
        <Image
          src={Wallpaper}
          alt="企業情報"
          fill
          className="object-cover"
          data-ai-hint="abstract modern"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">企業情報</h1>
          <p className="mt-4 text-lg md:text-xl">革新的なデジタル体験で、未来を創造する</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight">私たちのビジョン</h2>
              <p className="text-lg text-muted-foreground">
                SnakeWolfは、「革新的なデジタル体験で、未来を創造する」ことを目指しています。最先端のテクノロジーと人間の創造性を融合させ、世界が直面する課題に対する画期的な解決策を提供します。
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

      <Separator />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">プロジェクト概要</h2>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline">プロジェクト情報</CardTitle>
            </CardHeader>
            <CardContent>
            <ul className="space-y-4">
                {projectInfo.map((info) => (
                <li key={info.label} className="flex flex-col">
                    <span className="font-bold">{info.label}</span>
                    <span className="text-muted-foreground">{info.value}</span>
                </li>
                ))}
            </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">採用情報</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            現在、SnakeWolfDeveloperメンバーを募集しています。ご興味のある方は、以下の専用フォームよりご応募ください。
          </p>
          <Button asChild className="mt-8">
            <Link href="https://forms.gle/uEsmNjqm8He5RMEf8" target="_blank" rel="noopener noreferrer">応募フォームへ</Link>
          </Button>
        </div>
      </section>
      
      <Separator />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
           <TrendingUp className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">IR情報</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            非公開
          </p>
        </div>
      </section>

    </div>
  );
}
