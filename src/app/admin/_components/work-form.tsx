
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
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
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { getGitHubImageUrl } from '@/lib/utils';


const platformSchema = z.object({
  name: z.string().min(1, 'プラットフォーム名は必須です。'),
  url: z.string().url('有効なURLを入力してください（準備中の場合は#）。'),
});

const workFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  description: z.string().min(1, '短い説明は必須です。'),
  longDescription: z.string().min(1, '詳しい説明は必須です。'),
  imageId: z.string().min(1, 'メイン画像は必須です。'),
  galleryImageIds: z.array(z.string()).min(1, '最低1枚のギャラリー画像が必要です。'),
  platforms: z.array(platformSchema).min(1, '最低1つのプラットフォームが必要です。'),
});

export type WorkFormValues = z.infer<typeof workFormSchema>;

interface WorkFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: WorkFormValues) => void;
  defaultValues: Partial<WorkFormValues> & { id?: string } | null;
  category: 'App' | 'Game';
}


export function WorkForm({ isOpen, onOpenChange, onSubmit, defaultValues, category }: WorkFormProps) {
  const form = useForm<WorkFormValues>({
    resolver: zodResolver(workFormSchema),
    defaultValues: {
      title: '',
      description: '',
      longDescription: '',
      imageId: '',
      galleryImageIds: [],
      platforms: [{ name: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'platforms',
  });

  const mainImageId = form.watch('imageId');
  const mainImageUrl = getGitHubImageUrl(mainImageId);

  const galleryImageIds = form.watch('galleryImageIds');
  const galleryImageUrls = galleryImageIds.map(id => getGitHubImageUrl(id)).filter(Boolean);

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: defaultValues?.title || '',
        description: defaultValues?.description || '',
        longDescription: defaultValues?.longDescription || '',
        imageId: defaultValues?.imageId || '',
        galleryImageIds: defaultValues?.galleryImageIds || [],
        platforms: defaultValues?.platforms && defaultValues.platforms.length > 0 ? defaultValues.platforms : [{ name: '', url: '#' }],
      });
    }
  }, [isOpen, defaultValues, form]);
  
  const isEditing = !!defaultValues?.id;
  const categoryName = category === 'App' ? 'アプリ' : 'ゲーム';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? `${categoryName}編集` : `新規${categoryName}追加`}</DialogTitle>
          <DialogDescription>
            {isEditing ? `${categoryName}の情報を編集します。` : `新しい${categoryName}をシステムに追加します。`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6 pl-1">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>短い説明</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
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
                  <FormLabel>詳しい説明 (HTML可)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
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
                  <FormLabel>メイン画像ファイル名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="main-image.png" />
                  </FormControl>
                  <FormMessage />
                  {mainImageUrl && (
                    <div className="mt-4 relative w-full aspect-video">
                      <Image src={mainImageUrl} alt="メイン画像プレビュー" fill className="object-contain rounded-md" />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="galleryImageIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ギャラリー画像ファイル名 (改行区切り)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="image1.png&#x000A;image2.png&#x000A;image3.png"
                      rows={4}
                      value={field.value.join('\n')}
                      onChange={(e) => field.onChange(e.target.value.split('\n'))}
                    />
                  </FormControl>
                   <FormMessage />
                  {galleryImageUrls.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {galleryImageUrls.map((url, index) => (
                        <div key={index} className="relative aspect-video">
                          <Image src={url} alt={`ギャラリー画像 ${index + 1}`} fill className="object-cover rounded-md" />
                        </div>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div>
              <FormLabel>プラットフォーム</FormLabel>
              <div className="space-y-2 mt-2">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-start">
                    <FormField
                      control={form.control}
                      name={`platforms.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="プラットフォーム名 (例: iOS)" />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`platforms.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="ストアURL" />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ name: '', url: '' })}>
                プラットフォームを追加
              </Button>
               <FormMessage>
                {form.formState.errors.platforms && typeof form.formState.errors.platforms.message === 'string' && form.formState.errors.platforms.message}
              </FormMessage>
            </div>

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
