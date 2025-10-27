
'use client';

import { useState } from 'react';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { CreatorItem } from '@/lib/firebase-data';
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
import { getGitHubImageUrl } from '@/lib/utils';
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
import { CreatorForm, type CreatorFormValues } from './creator-form';

export function CreatorsAdmin() {
  const firestore = useFirestore();
  const creatorsQuery = useMemoFirebase(() => query(collection(firestore, 'creators'), orderBy('name')), [firestore]);
  const { data: creators, isLoading } = useCollection<CreatorItem>(creatorsQuery);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState<CreatorItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCreatorId, setDeletingCreatorId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingCreator(null);
    setIsFormOpen(true);
  };

  const handleEdit = (creator: CreatorItem) => {
    setEditingCreator(creator);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingCreatorId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deletingCreatorId || !firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'creators', deletingCreatorId));
    setIsDeleteDialogOpen(false);
    setDeletingCreatorId(null);
  };

  const handleFormSubmit = (data: CreatorFormValues) => {
    if (!firestore) return;
    const id = editingCreator?.id || doc(collection(firestore, 'creators')).id;
    const docRef = doc(firestore, 'creators', id);

    const creatorData: CreatorItem = {
      id,
      name: data.name,
      description: data.description,
      imageId: data.imageId,
      url: data.url,
      tags: data.tags,
    };
    
    setDocumentNonBlocking(docRef, creatorData, { merge: true });
    setIsFormOpen(false);
    setEditingCreator(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>クリエイター管理</CardTitle>
            <CardDescription>クリエイターの追加、編集、削除を行います。</CardDescription>
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
                  <TableHead>名前</TableHead>
                  <TableHead>タグ</TableHead>
                  <TableHead className="w-[120px] text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators?.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell>
                      <div className="w-12 h-12 relative bg-muted rounded-full overflow-hidden">
                        <Image src={getGitHubImageUrl(creator.imageId)} alt={creator.name} fill className="object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{creator.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{creator.tags.join(', ')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(creator)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(creator.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <CreatorForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        defaultValues={editingCreator}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>削除の確認</AlertDialogTitle>
            <AlertDialogDescription>
              本当にこのクリエイターを削除しますか？この操作は元に戻せません。
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
