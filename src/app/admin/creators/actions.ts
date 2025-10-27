
'use server';

import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function getDb() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export async function deleteCreator(id: string) {
  const db = getDb();
  await deleteDoc(doc(db, 'creator_items', id));
  revalidateCreatorsPath();
}

export async function revalidateCreatorsPath() {
  revalidatePath('/creators', 'page');
  revalidatePath('/admin/creators', 'page');
}
