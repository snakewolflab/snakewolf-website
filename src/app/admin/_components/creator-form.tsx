
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { TagInput } from './tag-input';
import Image from 'next/image';
import { getGitHubImageUrl } from '@/lib/utils';

const creatorFormSchema = z.object({
  name: z.string().min(1, '名前は必須です。'),
  description: z.string().min(1, '説明は必須です。'),
  url: z.string().url('有効なURLを入力してください。'),
  tags: z.array(z.string()).min(1, '少なくとも1つのタグを入力してください。'),
  imageId: z.string().min(1, '画像ファイル名は必須です。'),
});

export type CreatorFormValues = z.infer<typeof creatorFormSchema>;

interface CreatorFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: CreatorFormValues) => void;
  defaultValues: Partial<CreatorFormValues> & { id?: string } | null;
}

export function CreatorForm({ isOpen, onOpenChange, onSubmit, defaultValues }: CreatorFormProps) {
  const form = useForm<CreatorFormValues>({
    resolver: zodResolver(creatorFormSchema),
    defaultValues: {
      name: '',
      description: '',
      url: '',
      tags: [],
      imageId: '',
    },
  });

  const imageId = form.watch('imageId');
  const imageUrl = getGitHubImageUrl(imageId);

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: defaultValues?.name || '',
        description: defaultValues?.description || '',
        url: defaultValues?.url || '',
        tags: defaultValues?.tags || [],
        imageId: defaultValues?.imageId || '',
      });
    }
  }, [isOpen, defaultValues, form]);
  
  const isEditing = !!defaultValues?.id;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'クリエイター編集' : '新規クリエイター追加'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'クリエイターの情報を編集します。' : '新しいクリエイターをシステムに追加します。'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6 pl-1">
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
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
                  <FormLabel>タグ</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="タグを入力してEnter"
                    />
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
                  <FormLabel>画像ファイル名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="example.png" />
                  </FormControl>
                  <FormMessage />
                   {imageUrl && (
                    <div className="mt-4 relative w-40 h-40">
                      <Image src={imageUrl} alt="画像プレビュー" fill className="object-cover rounded-md"/>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <DialogFooter className="sticky bottom-0 bg-background pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                キャンセル
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? '保存中...' : '保存'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
