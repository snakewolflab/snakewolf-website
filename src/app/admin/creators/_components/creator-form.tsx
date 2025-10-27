
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, doc } from 'firebase/firestore';

import { type CreatorItem } from '@/lib/data';
import { revalidateCreatorsPath } from '../actions';
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

const formSchema = z.object({
  name: z.string().min(1, '名前は必須です。'),
  description: z.string().min(1, '説明は必須です。'),
  imageId: z.string().min(1, '画像IDは必須です。'),
  url: z.string().url('有効なURLを入力してください。'),
  tags: z.string().min(1, 'タグは必須です。'),
});

type CreatorFormValues = z.infer<typeof formSchema>;

interface CreatorFormProps {
  creator: CreatorItem | null;
  onSuccess: () => void;
}

export function CreatorForm({ creator, onSuccess }: CreatorFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<CreatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      imageId: '',
      url: '',
      tags: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (creator) {
      reset({
        ...creator,
        tags: creator.tags.join(','),
      });
    } else {
      reset({
        name: '',
        description: '',
        imageId: '',
        url: '',
        tags: '',
      });
    }
  }, [creator, reset]);

  const onSubmit = async (data: CreatorFormValues) => {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'エラー',
            description: 'データベースに接続できませんでした。',
        });
        return;
    }
    
    try {
      const creatorData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
      };

      if (creator && creator.id) {
        const creatorRef = doc(firestore, 'creator_items', creator.id);
        updateDocumentNonBlocking(creatorRef, creatorData);
      } else {
        const collectionRef = collection(firestore, 'creator_items');
        addDocumentNonBlocking(collectionRef, creatorData);
      }
      await revalidateCreatorsPath();
      toast({ title: '成功', description: `クリエイター情報を${creator ? '更新' : '追加'}しました。` });
      onSuccess();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'エラー',
        description: 'クリエイター情報の保存に失敗しました。',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} />
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
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {creator ? '更新' : '作成'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
