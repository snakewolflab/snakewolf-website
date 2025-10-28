
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { getCreatorsClient } from '@/lib/data-loader';

import type { CreatorItem } from '@/lib/firebase-data';
import { getGitHubImageUrl } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search } from 'lucide-react';
import { ExternalLink } from '@/components/external-link';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function CreatorsPage() {
  const [creators, setCreators] = useState<CreatorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadCreators() {
      setIsLoading(true);
      const creatorsData = await getCreatorsClient();
      const sortedCreators = creatorsData.sort((a, b) => a.name.localeCompare(b.name));
      setCreators(sortedCreators);
      setIsLoading(false);
    }
    loadCreators();
  }, []);

  const filteredCreators = useMemo(() => {
    if (!creators) return [];
    if (!searchTerm) return creators;

    const lowercasedTerm = searchTerm.toLowerCase();
    return creators.filter(creator =>
      (creator.name && creator.name.toLowerCase().includes(lowercasedTerm)) ||
      (creator.description && creator.description.toLowerCase().includes(lowercasedTerm)) ||
      (creator.tags && creator.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)))
    );
  }, [creators, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">クリエイター</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちは、才能あふれるクリエイターの活動を支援しています。
        </p>
      </header>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder="クリエイターを検索..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
      
      <div className="grid gap-12 md:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-4">
                  <Skeleton className="aspect-square rounded-full" />
                </div>
                <div className="md:w-2/3 p-4 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </Card>
          ))
        ) : filteredCreators.length === 0 ? (
          <p className='text-center col-span-2 text-muted-foreground'>
            {searchTerm ? '検索結果が見つかりませんでした。' : 'クリエイターがいません。'}
          </p>
        ) : filteredCreators.map((item) => {
          const itemImage = getGitHubImageUrl(item.imageId);
          return (
            <Card key={item.id} className="overflow-hidden group">
                <div className="md:flex">
                    <div className="md:w-1/3 p-4 flex-shrink-0">
                        {itemImage && (
                        <div className="relative aspect-square">
                            <Image
                                src={itemImage}
                                alt={item.name}
                                fill
                                className="object-cover rounded-full border-4 border-primary/20 group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        )}
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{item.description}</CardDescription>
                            <ExternalLink 
                                href={item.url}
                                className="p-0 mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline"
                            >
                                活動を見る <ArrowRight className="ml-2 h-4 w-4" />
                            </ExternalLink>
                        </CardContent>
                    </div>
                </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
