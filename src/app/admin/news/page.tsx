
'use client';

import { useState } from 'react';
import { collection, orderBy, query, Firestore } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { type NewsArticle } from '@/lib/data';
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { NewsForm } from './_components/news-form';
import { deleteArticle } from './actions';
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

export default function NewsAdminPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);
  
  const firestore = useFirestore();

  const newsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'news_articles'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: articles, isLoading } = useCollection<NewsArticle>(newsQuery);

  const handleAddNew = () => {
    setSelectedArticle(null);
    setDialogOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleDeleteClick = (article: NewsArticle) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (articleToDelete && articleToDelete.id) {
      deleteArticle(articleToDelete.id);
    }
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">ニュース管理</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規追加
        </Button>
      </header>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead className="w-[150px]">公開日</TableHead>
              <TableHead className="w-[120px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  読み込み中...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && articles?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">
                    記事がありません。
                    </TableCell>
                </TableRow>
            )}
            {articles?.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(article)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">編集</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(article)}>
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
            <DialogTitle>{selectedArticle ? '記事を編集' : '記事を新規作成'}</DialogTitle>
            <DialogDescription>
              {selectedArticle ? '記事の内容を更新します。' : '新しい記事を作成します。'}
            </DialogDescription>
          </DialogHeader>
          <NewsForm
            article={selectedArticle}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この記事「{articleToDelete?.title}」を削除します。この操作は元に戻せません。
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
