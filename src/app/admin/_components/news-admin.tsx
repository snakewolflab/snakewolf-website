
'use client';

import { useState } from 'react';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { NewsArticle } from '@/lib/firebase-data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
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
import { NewsForm, type NewsFormValues } from './news-form';

export function NewsAdmin() {
  const firestore = useFirestore();
  const newsQuery = useMemoFirebase(() => query(collection(firestore, 'news_articles'), orderBy('publicationDate', 'desc')), [firestore]);
  const { data: articles, isLoading } = useCollection<NewsArticle>(newsQuery);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingArticle(null);
    setIsFormOpen(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingArticleId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deletingArticleId || !firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'news_articles', deletingArticleId));
    setIsDeleteDialogOpen(false);
    setDeletingArticleId(null);
  };

  const handleFormSubmit = (data: NewsFormValues) => {
    if (!firestore) return;

    const id = editingArticle?.id || doc(collection(firestore, 'news_articles')).id;
    const slug = editingArticle?.slug || `${Date.now()}-${data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`;
    const docRef = doc(firestore, 'news_articles', id);
    
    const articleData: NewsArticle = {
      id,
      slug,
      title: data.title,
      publicationDate: data.publicationDate.toISOString(),
      contentSummary: data.contentSummary,
      content: data.content,
      tagIds: data.tagIds,
      imageId: data.imageId,
    };
    
    setDocumentNonBlocking(docRef, articleData, { merge: true });
    setIsFormOpen(false);
    setEditingArticle(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>ニュース管理</CardTitle>
            <CardDescription>ニュース記事の追加、編集、削除を行います。</CardDescription>
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
                  <TableHead>タイトル</TableHead>
                  <TableHead className="w-[120px]">公開日</TableHead>
                  <TableHead className="w-[100px]">ステータス</TableHead>
                  <TableHead className="w-[120px] text-right">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles?.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{new Date(article.publicationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={new Date(article.publicationDate) > new Date() ? 'outline' : 'default'}>
                        {new Date(article.publicationDate) > new Date() ? '予約済み' : '公開済み'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(article.id)}>
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

      <NewsForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        defaultValues={editingArticle}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>削除の確認</AlertDialogTitle>
            <AlertDialogDescription>
              本当にこの記事を削除しますか？この操作は元に戻せません。
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
