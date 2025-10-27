
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
import { useEffect, useState, useCallback } from 'react';
import { useFirebaseApp } from '@/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ImageUploader } from './image-uploader';
import { Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2 } from 'lucide-react';
import Image from 'next/image';

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

function GalleryUploader({ onUpload, initialImageIds = [] }: { onUpload: (imageIds: string[]) => void, initialImageIds: string[] }) {
    const firebaseApp = useFirebaseApp();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    
    const fetchImageUrls = useCallback(async (imageIds: string[]) => {
        const storage = getStorage(firebaseApp);
        const urls = await Promise.all(
            imageIds.map(id => getDownloadURL(ref(storage, `images/${id}`)))
        );
        setImagePreviews(urls);
    }, [firebaseApp]);

    useEffect(() => {
        if (initialImageIds.length > 0) {
            fetchImageUrls(initialImageIds);
        } else {
            setImagePreviews([]);
        }
    }, [initialImageIds, fetchImageUrls]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true);
        const storage = getStorage(firebaseApp);
        const newImageIds = [...initialImageIds];
        const newImagePreviews = [...imagePreviews];
        
        await Promise.all(acceptedFiles.map(async (file) => {
            const fileId = `${Date.now()}-${file.name}`;
            const storageRef = ref(storage, `images/${fileId}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            newImageIds.push(fileId);
            newImagePreviews.push(downloadURL);
        }));

        setImagePreviews(newImagePreviews);
        onUpload(newImageIds);
        setUploading(false);

    }, [firebaseApp, onUpload, initialImageIds, imagePreviews]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });

    const removeImage = (index: number) => {
        const newImageIds = [...initialImageIds];
        newImageIds.splice(index, 1);
        const newImagePreviews = [...imagePreviews];
        newImagePreviews.splice(index, 1);
        
        setImagePreviews(newImagePreviews);
        onUpload(newImageIds);
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-2 mb-2">
                {imagePreviews.map((src, index) => (
                    <div key={index} className="relative aspect-video">
                        <Image src={src} alt={`Gallery image ${index + 1}`} fill className="object-cover rounded-md" />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeImage(index)}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>
            <div {...getRootProps()} className={`w-full h-24 rounded-md border-2 border-dashed flex flex-col justify-center items-center text-muted-foreground cursor-pointer hover:border-primary ${isDragActive ? 'border-primary bg-primary/10' : ''}`}>
                <input {...getInputProps()} />
                {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <UploadCloud className="h-8 w-8" />}
                <p className="text-xs mt-1">画像を追加</p>
            </div>
        </div>
    );
}

export function WorkForm({ isOpen, onOpenChange, onSubmit, defaultValues, category }: WorkFormProps) {
  const firebaseApp = useFirebaseApp();
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);

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
      setMainImageUrl(null);
      if (defaultValues?.imageId) {
        const storage = getStorage(firebaseApp);
        getDownloadURL(ref(storage, `images/${defaultValues.imageId}`))
          .then(setMainImageUrl)
          .catch(console.error);
      }
    }
  }, [isOpen, defaultValues, form, firebaseApp]);

  const handleMainImageUpload = (fileId: string, downloadUrl: string) => {
    form.setValue('imageId', fileId, { shouldValidate: true });
    setMainImageUrl(downloadUrl);
  };
  
  const handleGalleryUpload = (imageIds: string[]) => {
      form.setValue('galleryImageIds', imageIds, { shouldValidate: true });
  }

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
              render={() => (
                <FormItem>
                  <FormLabel>メイン画像</FormLabel>
                  <FormControl>
                    <ImageUploader onUpload={handleMainImageUpload} initialImageUrl={mainImageUrl}/>
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
                  <FormLabel>ギャラリー画像</FormLabel>
                  <FormControl>
                    <GalleryUploader onUpload={handleGalleryUpload} initialImageIds={field.value} />
                  </FormControl>
                  <FormMessage />
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
