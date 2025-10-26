
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { newsArticles } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

import Snewol1 from '../character/1.png';
import Wallpaper from './wallpaper.png';

export default function HomePage() {
  const latestNews = newsArticles.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src={Wallpaper}
          alt="ヒーロー背景画像"
          fill
          className="object-cover"
          data-ai-hint="abstract modern"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            革新的なデジタル体験で、未来を創造する
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            SnakeWolfは、最先端のテクノロジーと創造的なアイデアを融合させ、持続可能でより良い未来を築くことを目指しています。
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">
              お問い合わせ <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">私たちの使命</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            SnakeWolfは、最先端のテクノロジーと創造的なアイデアを融合させ、持続可能でより良い未来を築くことを目指しています。私たちは常に挑戦し、革新を追求し続けます。
          </p>
        </div>
      </section>

      <Separator />

      {/* Latest News Section */}
      <section id="news" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">最新ニュース</h2>
            <Button asChild variant="outline">
              <Link href="/news">
                もっと見る <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((article) => {
              const articleImage = PlaceHolderImages.find(p => p.id === article.imageId);
              return (
                <Card key={article.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  {articleImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={articleImage.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        data-ai-hint={articleImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Newspaper className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <CardTitle className="font-headline text-xl leading-snug pt-2">
                      <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <Wrench className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">サービス</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            SnakeWolfが提供する最先端のテクノロジーサービスをご覧ください。
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/services">
              サービス一覧を見る <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Suneuru-kun Section */}
       <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={Snewol1}
                alt="スネウル君"
                fill
                className="object-contain"
                data-ai-hint="wolf mascot"
              />
            </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">公式キャラクター「スネウル君」</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            SnakeWolfの公式マスコット、スネウル君です！彼のプロフィールやストーリーをチェックしよう！
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/suneuru-kun">
              スネウル君に会いにいく <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
