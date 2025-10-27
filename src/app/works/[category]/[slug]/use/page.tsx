
'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Smartphone, Server, Monitor, Globe } from 'lucide-react';
import Image from 'next/image';

import { workItems, type Platform } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Platform icons mapping
const platformIcons: { [key: string]: React.ElementType } = {
  'App Store': Smartphone,
  'Google Play': Smartphone,
  'Steam': Server,
  'Epic Games Store': Server,
  'Console': Gamepad,
  'Web': Globe,
};

function Gamepad(props: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <line x1="6" x2="10" y1="12" y2="12" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="15" x2="15.01" y1="13" y2="13" />
            <line x1="18" x2="18.01" y1="11" y2="11" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.01.15v6.52c0 .05-.004.1-.01.15A4 4 0 0 0 6.68 19h10.64a4 4 0 0 0 3.99-3.59c.006-.05.01-.1.01-.15V8.59c0-.05.004-.1.01-.15A4 4 0 0 0 17.32 5z" />
        </svg>
    );
}

export default function UsePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const item = workItems.find((w) => w.slug === slug);

  if (!item) {
    notFound();
  }

  const ctaText = item.category === 'App' ? 'を入手する' : 'をプレイする';
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
       <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href={`/works/${category}/${slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            詳細に戻る
          </Link>
        </Button>
      </div>

      <header className="text-center mb-12">
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{item.title} {ctaText}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          以下のプラットフォームからご利用いただけます。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {item.platforms.map((platform) => {
          const Icon = platformIcons[platform.name] || Monitor;
          const isAvailable = platform.url !== '#';

          return (
            <Button
                key={platform.name}
                asChild
                size="lg"
                variant={isAvailable ? 'default' : 'secondary'}
                className={cn(!isAvailable && 'cursor-not-allowed opacity-50')}
                disabled={!isAvailable}
                style={{ justifyContent: 'start' }}
            >
              <Link href={isAvailable ? platform.url : '#'} target="_blank" rel="noopener noreferrer" onClick={(e) => !isAvailable && e.preventDefault()}>
                <div className="flex items-center w-full">
                    <Icon className="h-6 w-6 mr-4" />
                    <span className="flex-grow text-left">{platform.name}</span>
                    {isAvailable ? <ExternalLink className="h-5 w-5 text-primary-foreground/70" /> : <span className="text-xs text-muted-foreground">準備中</span>}
                </div>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
