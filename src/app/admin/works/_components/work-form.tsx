
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, doc } from 'firebase/firestore';

import { type WorkItem, type Platform } from '@/lib/data';
import { revalidateWorksPath } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  slug: z.string().min(1, 'スラッグは必須です。').regex(/^[a-z0-9-]+$/, 'スラッグは小文字の英数字とハイフンのみ使用できます。'),
  category: z.enum(['App', 'Game']),
  description: z.string().min(1, '概要は必須です。'),
  longDescription: z.string().min(1, '詳細説明は必須です。'),
  platforms: z.string().min(1, 'プラットフォームは必須です。'),
  imageId: z.string().min(1, '画像IDは必須です。'),
  galleryImageIds: z.string(),
});

type WorkFormValues = z.infer<typeof formSchema>;

interface WorkFormProps {
  workItem: WorkItem | null;
  onSuccess: () => void;
  category: 'App' | 'Game';
}

export function WorkForm({ workItem, onSuccess, category }: WorkFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<WorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: category,
      description: '',
      longDescription: '',
      platforms: '',
      imageId: '',
      galleryImageIds: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (workItem) {
      reset({
        ...workItem,
        platforms: workItem.platforms.map(p => `${p.name}:${p.url}`).join(','),
        galleryImageIds: workItem.galleryImageIds.join(','),
      });
    } else {
      reset({
        title: '',
        slug: '',
        category: category,
        description: '',
        longDescription: '',
        platforms: '',
        imageId: '',
        galleryImageIds: '',
      });
    }
  }, [workItem, reset, category]);
  
  const parsePlatforms = (platformStr: string): Platform[] => {
    return platformStr.split(',').map(p => {
        const parts = p.split(':');
        const name = parts[0]?.trim();
        const url = parts.slice(1).join(':').trim();
        return { name, url };
    }).filter(p => p.name && p.url);
  };

  const onSubmit = async (data: WorkFormValues) => {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'エラー',
            description: 'データベースに接続できませんでした。',
        });
        return;
    }
    
    try {
      const workItemData = {
        ...data,
        platforms: parsePlatforms(data.platforms),
        galleryImageIds: data.galleryImageIds.split(',').map(id => id.trim()).filter(Boolean),
      };

      if (workItem && workItem.id) {
        const workItemRef = doc(firestore, 'work_items', workItem.id);
        updateDocumentNonBlocking(workItemRef, workItemData);
        await revalidateWorksPath(workItemData.category, workItemData.slug);
      } else {
        const collectionRef = collection(firestore, 'work_items');
        addDocumentNonBlocking(collectionRef, workItemData);
        await revalidateWorksPath(workItemData.category, workItemData.slug);
      }
      toast({ title: '成功', description: `実績を${workItem ? '更新' : '追加'}しました。` });
      onSuccess();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'エラー',
        description: '実績の保存に失敗しました。',
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
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>カテゴリー</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="App" />
                    </FormControl>
                    <FormLabel className="font-normal">アプリ</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Game" />
                    </FormControl>
                    <FormLabel className="font-normal">ゲーム</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
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
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>詳細説明 (HTML)</FormLabel>
              <FormControl>
                <Textarea className="min-h-[150px] font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platforms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>プラットフォーム</FormLabel>
              <FormControl>
                <Input {...field} placeholder="例: iOS:https://apple.com,Android:https://google.com" />
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
              <FormLabel>メイン画像ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="galleryImageIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ギャラリー画像ID (カンマ区切り)</FormLabel>
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
            {workItem ? '更新' : '作成'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
