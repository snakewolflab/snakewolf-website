
'use server';

import { revalidatePath } from 'next/cache';
import {
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { NewsArticle } from '@/lib/data';

// This is a server-side action, but we need firestore instance
// We are not using the useFirestore hook as it's for client components
function getDb() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export async function addArticle(article: Omit<NewsArticle, 'id'>) {
  const db = getDb();
  await addDoc(collection(db, 'news_articles'), article);
  revalidatePath('/news');
  revalidatePath('/admin/news');
}

export async function updateArticle(id: string, article: Partial<NewsArticle>) {
  const db = getDb();
  const articleRef = doc(db, 'news_articles', id);
  await updateDoc(articleRef, article);
  revalidatePath('/news');
  revalidatePath(`/news/${article.slug}`);
  revalidatePath('/admin/news');
}

export async function deleteArticle(id: string) {
  const db = getDb();
  const articleRef = doc(db, 'news_articles', id);
  await deleteDoc(articleRef);
  revalidatePath('/news');
  revalidatePath('/admin/news');
}
