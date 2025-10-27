
'use client';

import { useState } from 'react';
import { collection, query, where, orderBy, doc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { WorkItem, MediaItem } from '@/lib/firebase-data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { WorkForm, type WorkFormValues } from './work-form';

interface WorksAdminProps {
  category: 'App' | 'Game';
}

export function WorksAdmin({ category }: WorksAdminProps) {
  const firestore = useFirestore();
  
  const worksQuery = useMemoFirebase(() => 
    query(collection(firestore, 'works'), where('category', '==', category), orderBy('title')), 
    [firestore, category]
  );
  const { data: works, isLoading: worksLoading } = useCollection<WorkItem>(worksQuery);
  const mediaQuery = useMemoFirebase(() => collection(firestore, 'media_items'), [firestore]);
  const { data: mediaItems, isLoading: mediaLoading } = useCollection<MediaItem>(mediaQuery);

  const isLoading = worksLoading || mediaLoading;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingWorkId, setDeletingWorkId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingWork(null);
    setIsFormOpen(true);
  };

  const handleEdit = (work: WorkItem) => {
    setEditingWork(work);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingWorkId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deletingWorkId || !firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'works', deletingWorkId));
    setIsDeleteDialogOpen(false);
    setDeletingWorkId(null);
  };

  const handleFormSubmit = (data: WorkFormValues) => {
    if (!firestore) return;

    const id = editingWork?.id || doc(collection(firestore, 'works')).id;
    const slug = editingWork?.slug || `${Date.now()}-${data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
    const docRef = doc(firestore, 'works', id);

    const workData: WorkItem = {
      id,
      slug,
      title: data.title,
      category,
      description: data.description,
      longDescription: data.longDescription,
      imageId: data.imageId,
      galleryImageIds: data.galleryImageIds,
      platforms: data.platforms,
    };
    
    setDocumentNonBlocking(docRef, workData, { merge: true });
    setIsFormOpen(false);
    setEditingWork(null);
  };

  const getImageUrl = (imageId: string) => {
    return mediaItems?.find(m => m.id === imageId)?.fileUrl || null;
  }

  const categoryName = category === 'App' ? 'アプリ' : 'ゲーム';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{categoryName}管理</CardTitle>
            <CardDescription>{categoryName}の追加、編集、削除を行います。</CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規追加
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">画像</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead>プラットフォーム</TableHead>
                  <TableHead className="w-[120px] text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {works?.map((work) => {
                  const imageUrl = getImageUrl(work.imageId);
                  return (
                    <TableRow key={work.id}>
                      <TableCell>
                        <div className="w-16 h-10 relative bg-muted rounded-md overflow-hidden">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={work.title} fill className="object-cover" />
                          ) : <ImageIcon className="w-6 h-6 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{work.title}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{work.platforms.map(p => p.name).join(', ')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(work)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(work.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <WorkForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        defaultValues={editingWork}
        category={category}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>削除の確認</AlertDialogTitle>
            <AlertDialogDescription>
              本当にこの{categoryName}を削除しますか？この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} variant="destructive">削除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
