
'use server';

import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

// We are not using the useFirestore hook as it's for client components
function getDb() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export async function deleteArticle(id: string) {
  const db = getDb();
  await deleteDoc(doc(db, 'news_articles', id));
  revalidateNewsPaths();
}

export async function revalidateNewsPaths() {
  revalidatePath('/news', 'page');
  revalidatePath('/admin/news', 'page');
  revalidatePath('/', 'page');
}

export async function revalidateArticlePath(slug: string) {
    revalidatePath('/news', 'page');
    revalidatePath(`/news/${slug}`, 'page');
    revalidatePath('/admin/news', 'page');
    revalidatePath('/', 'page');
}
