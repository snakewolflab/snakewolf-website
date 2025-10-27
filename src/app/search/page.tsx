
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, orderBy, where, limit } from 'firebase/firestore';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { NewsArticle, WorkItem, CreatorItem, MediaItem } from '@/lib/firebase-data';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Newspaper, Gamepad2, AppWindow, User } from 'lucide-react';

function SearchResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || '';
    const firestore = useFirestore();

    // Data fetching
    const { data: news, isLoading: newsLoading } = useCollection<NewsArticle>(useMemoFirebase(() => collection(firestore, 'news_articles'), [firestore]));
    const { data: works, isLoading: worksLoading } = useCollection<WorkItem>(useMemoFirebase(() => collection(firestore, 'works'), [firestore]));
    const { data: creators, isLoading: creatorsLoading } = useCollection<CreatorItem>(useMemoFirebase(() => collection(firestore, 'creators'), [firestore]));
    const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]));

    const isLoading = newsLoading || worksLoading || creatorsLoading || mediaLoading;

    // Filtering logic
    const filteredResults = useMemo(() => {
        if (isLoading || !q) return { news: [], works: [], creators: [] };

        const lowercasedQuery = q.toLowerCase();

        const filteredNews = (news || []).filter(item => 
            item.title.toLowerCase().includes(lowercasedQuery) || 
            item.contentSummary.toLowerCase().includes(lowercasedQuery)
        );
        const filteredWorks = (works || []).filter(item => 
            item.title.toLowerCase().includes(lowercasedQuery) || 
            item.description.toLowerCase().includes(lowercasedQuery)
        );
        const filteredCreators = (creators || []).filter(item => 
            item.name.toLowerCase().includes(lowercasedQuery) || 
            item.description.toLowerCase().includes(lowercasedQuery)
        );

        return { news: filteredNews, works: filteredWorks, creators: filteredCreators };
    }, [q, news, works, creators, isLoading]);

    const totalResults = filteredResults.news.length + filteredResults.works.length + filteredResults.creators.length;

    const getImageUrl = (imageId: string | undefined) => {
        if (!imageId || !mediaItems) return null;
        return mediaItems.find(m => m.id === imageId)?.fileUrl || null;
    }
    
    if (isLoading) {
        return (
            <div>
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        );
    }
    
    return (
        <div>
            {totalResults > 0 ? (
                 <h2 className="text-2xl font-semibold mb-6">
                    「<span className="text-primary">{q}</span>」の検索結果: {totalResults}件
                </h2>
            ) : (
                <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">「<span className="text-primary">{q}</span>」に一致する結果は見つかりませんでした。</h2>
                    <p className="text-muted-foreground mt-2">別のキーワードでお試しください。</p>
                </div>
            )}
            
            <div className="space-y-8">
                {filteredResults.news.length > 0 && (
                    <section>
                        <h3 className="text-xl font-headline font-bold mb-4 flex items-center gap-2"><Newspaper />ニュース</h3>
                        <div className="space-y-4">
                        {filteredResults.news.map(item => (
                            <Card key={`news-${item.id}`}>
                                <CardHeader>
                                    <CardTitle><Link className="hover:text-primary" href={`/news/${item.slug}`}>{item.title}</Link></CardTitle>
                                    <CardDescription>{new Date(item.publicationDate).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-2">{item.contentSummary}</p>
                                </CardContent>
                            </Card>
                        ))}
                        </div>
                    </section>
                )}

                {filteredResults.works.length > 0 && (
                    <section>
                        <h3 className="text-xl font-headline font-bold mb-4 flex items-center gap-2"><AppWindow />アプリ & ゲーム</h3>
                         <div className="space-y-4">
                            {filteredResults.works.map(item => {
                                const imageUrl = getImageUrl(item.imageId);
                                return (
                                <Card key={`work-${item.id}`} className="flex overflow-hidden">
                                     {imageUrl && (
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            <Image src={imageUrl} alt={item.title} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <CardHeader>
                                            <CardTitle><Link className="hover:text-primary" href={`/works/${item.category.toLowerCase()}s/${item.slug}`}>{item.title}</Link></CardTitle>
                                            <Badge variant="secondary" className="w-fit">{item.category}</Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                                        </CardContent>
                                    </div>
                                </Card>
                            )})}
                        </div>
                    </section>
                )}

                {filteredResults.creators.length > 0 && (
                    <section>
                        <h3 className="text-xl font-headline font-bold mb-4 flex items-center gap-2"><User />クリエイター</h3>
                        <div className="space-y-4">
                            {filteredResults.creators.map(item => {
                                 const imageUrl = getImageUrl(item.imageId);
                                 return (
                                <Card key={`creator-${item.id}`} className="flex overflow-hidden items-center">
                                    {imageUrl && (
                                        <div className="relative w-24 h-24 flex-shrink-0 m-4 rounded-full overflow-hidden">
                                            <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <CardHeader>
                                            <CardTitle><Link className="hover:text-primary" href="/creators">{item.name}</Link></CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                                        </CardContent>
                                    </div>
                                </Card>
                            )})}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <header className="mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">検索結果</h1>
            </header>
            <Suspense fallback={<p>読み込み中...</p>}>
                <SearchResults />
            </Suspense>
        </div>
    );
}
