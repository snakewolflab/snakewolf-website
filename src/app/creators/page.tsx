
'use client';

import Image from 'next/image';
import { collection, query, orderBy } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { type CreatorItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Loader2 } from 'lucide-react';
import { ExternalLink } from '@/components/external-link';
import { Skeleton } from '@/components/ui/skeleton';

export default function CreatorsPage() {
  const firestore = useFirestore();

  const creatorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'creator_items'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: creators, isLoading } = useCollection<CreatorItem>(creatorsQuery);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">クリエイター</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          私たちは、才能あふれるクリエイターの活動を支援しています。
        </p>
      </header>
      
      {isLoading && (
        <div className="grid gap-12 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 p-4"><Skeleton className="aspect-square rounded-full" /></div>
                        <div className="md:w-2/3 flex flex-col p-6">
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <div className="flex flex-wrap gap-2 pt-2 mb-4">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-full mb-4" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      )}

      {!isLoading && creators && (
        <div className="grid gap-12 md:grid-cols-2">
          {creators.length === 0 ? (
            <p className='text-center col-span-2 text-muted-foreground'>クリエイターがいません。</p>
          ) : creators.map((item) => {
            const itemImage = PlaceHolderImages.find(p => p.id === item.imageId);
            return (
              <Card key={item.id} className="overflow-hidden group">
                  <div className="md:flex">
                      <div className="md:w-1/3 p-4">
                          {itemImage ? (
                          <div className="relative aspect-square">
                              <Image
                                  src={itemImage.imageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-full border-4 border-primary/20 group-hover:scale-105 transition-transform duration-300"
                                  data-ai-hint={itemImage.imageHint}
                              />
                          </div>
                          ) : <Skeleton className="aspect-square rounded-full" />}
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
      )}
    </div>
  );
}
