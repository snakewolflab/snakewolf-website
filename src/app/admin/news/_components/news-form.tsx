
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { NewsArticle } from '@/lib/data';
import { addArticle, updateArticle } from '../actions';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  slug: z.string().min(1, 'スラッグは必須です。').regex(/^[a-z0-9-]+$/, 'スラッグは小文字の英数字とハイフンのみ使用できます。'),
  summary: z.string().min(1, '概要は必須です。'),
  content: z.string().min(1, '本文は必須です。'),
  tags: z.string().min(1, 'タグは必須です。'),
  imageId: z.string().min(1, '画像IDは必須です。'),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  article: NewsArticle | null;
  onSuccess: () => void;
}

export function NewsForm({ article, onSuccess }: NewsFormProps) {
  const { toast } = useToast();
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      summary: '',
      content: '',
      tags: '',
      imageId: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (article) {
      reset({
        ...article,
        tags: article.tags.join(','),
      });
    } else {
      reset({
        title: '',
        slug: '',
        summary: '',
        content: '',
        tags: '',
        imageId: '',
      });
    }
  }, [article, reset]);

  const onSubmit = async (data: NewsFormValues) => {
    try {
      const articleData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
        date: article?.date || format(new Date(), 'yyyy年M月d日'),
      };

      if (article && article.id) {
        // Update existing article
        await updateArticle(article.id, articleData);
        toast({ title: '成功', description: '記事を更新しました。' });
      } else {
        // Create new article
        await addArticle(articleData);
        toast({ title: '成功', description: '記事を追加しました。' });
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'エラー',
        description: '記事の保存に失敗しました。',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>スラッグ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>概要</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文 (HTML)</FormLabel>
              <FormControl>
                <Textarea className="min-h-[200px] font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ (カンマ区切り)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>画像ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {article ? '更新' : '作成'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
