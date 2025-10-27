
'use server';

import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function getDb() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export async function deleteWorkItem(id: string) {
  const db = getDb();
  await deleteDoc(doc(db, 'work_items', id));
  // Revalidate both app and game pages, as we don't know which one it was
  revalidatePath('/works/apps', 'page');
  revalidatePath('/works/games', 'page');
  revalidatePath('/admin/apps', 'page');
  revalidatePath('/admin/games', 'page');
}

export async function revalidateWorksPath(category: 'App' | 'Game', slug: string) {
    const categoryPath = category.toLowerCase() + 's';
    revalidatePath(`/works/${categoryPath}`, 'page');
    revalidatePath(`/works/${categoryPath}/${slug}`, 'page');
    revalidatePath(`/admin/${categoryPath}`, 'page');
}
