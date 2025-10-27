
'use client';

import { useState } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { type CreatorItem } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { CreatorForm } from './_components/creator-form';
import { deleteCreator } from './actions';
import Link from 'next/link';

export default function CreatorsAdminPage() {
  useAuthRedirect();
  const { user, isUserLoading } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<CreatorItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CreatorItem | null>(null);
  
  const firestore = useFirestore();

  const creatorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'creator_items'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: creators, isLoading } = useCollection<CreatorItem>(creatorsQuery);

  const handleAddNew = () => {
    setSelectedCreator(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: CreatorItem) => {
    setSelectedCreator(item);
    setDialogOpen(true);
  };

  const handleDeleteClick = (item: CreatorItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete && itemToDelete.id) {
      await deleteCreator(itemToDelete.id);
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    setSelectedCreator(null);
  };
  
  if (isUserLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-4">
        <Button asChild variant="link">
          <Link href="/admin">← 管理ダッシュボードに戻る</Link>
        </Button>
      </div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">クリエイター管理</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規追加
        </Button>
      </header>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead className="w-[120px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  読み込み中...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && creators?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={2} className="text-center">
                    クリエイターがいません。
                    </TableCell>
                </TableRow>
            )}
            {creators?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">編集</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(item)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">削除</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCreator ? 'クリエイターを編集' : 'クリエイターを新規作成'}</DialogTitle>
          </DialogHeader>
          <CreatorForm
            creator={selectedCreator}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              このクリエイター「{itemToDelete?.name}」を削除します。この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>削除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
