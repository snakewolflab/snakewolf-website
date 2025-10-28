
import type { NewsArticle, WorkItem, CreatorItem } from '@/lib/firebase-data';

const GITHUB_DATA_BASE_URL = 'https://raw.githubusercontent.com/snakewolflab/snakewolf-website/assets/';

// This function is designed to be used in server-side data fetching for Next.js (e.g., generateStaticParams).
// It includes aggressive caching to avoid refetching during a single build process.
export async function fetchData<T>(fileName: string): Promise<T[]> {
    try {
        const response = await fetch(`${GITHUB_DATA_BASE_URL}${fileName}`, {
            // Use 'force-cache' to ensure that during a single build operation,
            // the same file is not fetched multiple times across different generateStaticParams calls.
            // Next.js's fetch cache will handle this.
            cache: 'force-cache',
        });
        if (!response.ok) {
            console.error(`Failed to fetch ${fileName}: ${response.statusText}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${fileName}:`, error);
        return [];
    }
}

// This function is for client-side use where we don't want to cache.
export async function fetchDataClient<T>(fileName: string): Promise<T[]> {
    try {
        const response = await fetch(`${GITHUB_DATA_BASE_URL}${fileName}`, {
            cache: 'no-store',
        });
        if (!response.ok) {
            console.error(`Failed to fetch ${fileName}: ${response.statusText}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${fileName}:`, error);
        return [];
    }
}


export const getNews = () => fetchData<NewsArticle>('news.json');
export const getWorks = () => fetchData<WorkItem>('works.json');
export const getCreators = () => fetchData<CreatorItem>('creators.json');

export const getNewsClient = () => fetchDataClient<NewsArticle>('news.json');
export const getWorksClient = () => fetchDataClient<WorkItem>('works.json');
export const getCreatorsClient = () => fetchDataClient<CreatorItem>('creators.json');


export async function getWorkBySlug(slug: string): Promise<WorkItem | undefined> {
    const works = await getWorksClient();
    return works.find(work => work.slug === slug);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const news = await getNewsClient();
    return news.find(n => n.slug === slug);
}
