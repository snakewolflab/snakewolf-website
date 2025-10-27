import { collection, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from '@/firebase';

// Data types from backend.json
export type NewsArticle = {
  id: string;
  title: string;
  publicationDate: string;
  contentSummary: string;
  content: string;
  tagIds: string[];
  imageId?: string;
  slug: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type MediaItem = {
    id: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadDate: string;
    imageHint?: string;
};

export type CreatorItem = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  url: string;
  tags: string[];
};

export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  category: 'App' | 'Game';
  description: string;
  longDescription: string;
  platforms: { name: string; url: string; }[];
  imageId: string;
  galleryImageIds: string[];
};

// Functions to fetch data from Firestore
export const getNewsArticles = async () => {
    const newsCollection = collection(firestore, "news_articles");
    const q = query(newsCollection, orderBy("publicationDate", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as NewsArticle));
};

export const getLatestNewsArticles = async (count: number) => {
    const newsCollection = collection(firestore, "news_articles");
    const q = query(newsCollection, orderBy("publicationDate", "desc"), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as NewsArticle));
};

export const getNewsArticleBySlug = async (slug: string) => {
    // In a real scenario, you would query by slug. Since slug is not in the model, we fetch all and filter.
    // This is inefficient and should be optimized in a real app, e.g., by making doc IDs the slugs.
    const articles = await getNewsArticles();
    return articles.find(article => article.slug === slug);
};


export const getTags = async () => {
    const tagsCollection = collection(firestore, "tags");
    const snapshot = await getDocs(tagsCollection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Tag));
};

export const getMediaItems = async () => {
    const mediaItemsCollection = collection(firestore, "media_items");
    const snapshot = await getDocs(mediaItemsCollection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as MediaItem));
};

export const getMediaItemById = async (id: string) => {
    const docRef = doc(firestore, "media_items", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as MediaItem;
    }
    return undefined;
}

export const getCreators = async () => {
  // Assuming creators are stored in a 'creators' collection
  const creatorsCollection = collection(firestore, "creators");
  const snapshot = await getDocs(creatorsCollection);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as CreatorItem));
};

export const getWorks = async () => {
    const worksCollection = collection(firestore, "works");
    const snapshot = await getDocs(worksCollection);
    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id} as WorkItem));
}

export const getWorkBySlug = async (slug: string) => {
    const works = await getWorks();
    return works.find(work => work.slug === slug);
}
