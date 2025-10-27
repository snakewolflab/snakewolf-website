
'use client';

import { useForm, Controller } from 'react-hook-form';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useFirebaseApp } from '@/firebase';
import { collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import type { Tag } from '@/lib/firebase-data';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUploader } from './image-uploader';

const newsFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  publicationDate: z.date({ required_error: '公開日は必須です。' }),
  contentSummary: z.string().min(1, '概要は必須です。'),
  content: z.string().min(1, '本文は必須です。'),
  tagIds: z.array(z.string()).min(1, '少なくとも1つのタグを選択してください。'),
  imageId: z.string().optional(),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

interface NewsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: NewsFormValues) => void;
  defaultValues: Partial<NewsFormValues> & { publicationDate?: string | Date, id?: string } | null;
}

export function NewsForm({ isOpen, onOpenChange, onSubmit, defaultValues }: NewsFormProps) {
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  const tagsQuery = useMemoFirebase(() => collection(firestore, 'tags'), [firestore]);
  const { data: tags, isLoading: tagsLoading } = useCollection<Tag>(tagsQuery);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      publicationDate: new Date(),
      contentSummary: '',
      content: '',
      tagIds: [],
      imageId: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const pubDate = defaultValues?.publicationDate ? new Date(defaultValues.publicationDate) : new Date();
      form.reset({
        title: defaultValues?.title || '',
        publicationDate: pubDate,
        contentSummary: defaultValues?.contentSummary || '',
        content: defaultValues?.content || '',
        tagIds: defaultValues?.tagIds || [],
        imageId: defaultValues?.imageId || '',
      });
      setImageUrl(null);
      if (defaultValues?.imageId) {
        const storage = getStorage(firebaseApp);
        getDownloadURL(ref(storage, `images/${defaultValues.imageId}`))
          .then(setImageUrl)
          .catch(console.error);
      }
    }
  }, [isOpen, defaultValues, form, firebaseApp]);

  const handleImageUpload = (fileId: string, downloadUrl: string) => {
    form.setValue('imageId', fileId, { shouldValidate: true });
    setImageUrl(downloadUrl);
  };

  const isEditing = !!defaultValues?.id;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'ニュース記事編集' : '新規ニュース記事作成'}</DialogTitle>
           <DialogDescription>
            {isEditing ? 'ニュース記事の情報を編集します。' : '新しいニュース記事を作成します。'}
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
              name="publicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>公開日</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>日付を選択</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contentSummary"
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
                  <FormLabel>本文 (HTML可)</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タグ</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {tags?.map((tag) => (
                      <FormItem key={tag.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tag.id)}
                            onCheckedChange={(checked) => {
                              const currentTagIds = field.value || [];
                              if (checked) {
                                field.onChange([...currentTagIds, tag.id]);
                              } else {
                                field.onChange(currentTagIds.filter(value => value !== tag.id));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{tag.name}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageId"
              render={() => (
                <FormItem>
                  <FormLabel>メイン画像</FormLabel>
                  <FormControl>
                    <ImageUploader onUpload={handleImageUpload} initialImageUrl={imageUrl}/>
                  </FormControl>
                  <FormMessage />
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
