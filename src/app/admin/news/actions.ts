
'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateNewsPaths() {
  revalidatePath('/news');
  revalidatePath('/admin/news');
}

export async function revalidateArticlePath(slug: string) {
    revalidatePath('/news');
    revalidatePath(`/news/${slug}`);
    revalidatePath('/admin/news');
}
