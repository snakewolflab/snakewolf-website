
import type { NewsArticle, WorkItem, CreatorItem } from '@/lib/firebase-data';

const GITHUB_DATA_BASE_URL = 'https://raw.githubusercontent.com/snakewolflab/snakewolf-website/assets/';

async function fetchData<T>(fileName: string): Promise<T[]> {
    try {
        const response = await fetch(`${GITHUB_DATA_BASE_URL}${fileName}`, {
            // Revalidate data every hour
            next: { revalidate: 3600 } 
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

export async function getWorkBySlug(slug: string): Promise<WorkItem | undefined> {
    const works = await getWorks();
    return works.find(work => work.slug === slug);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const news = await getNews();
    return news.find(n => n.slug === slug);
}
