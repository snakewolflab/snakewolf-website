
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirebaseApp } from '@/firebase';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ImageUploaderProps {
  onUpload: (fileId: string, downloadUrl: string) => void;
  initialImageUrl?: string | null;
}

export function ImageUploader({ onUpload, initialImageUrl }: ImageUploaderProps) {
  const firebaseApp = useFirebaseApp();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(initialImageUrl || null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(initialImageUrl || null);
  }, [initialImageUrl]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('ファイルサイズは5MB以下にしてください。');
      return;
    }

    setUploading(true);
    setError(null);
    setPreview(URL.createObjectURL(file));
    
    const storage = getStorage(firebaseApp);
    const fileId = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `images/${fileId}`);

    try {
      // Note: uploadBytes does not provide progress. For progress, use uploadBytesResumable.
      // For simplicity, we simulate progress here.
      setProgress(30);
      const snapshot = await uploadBytes(storageRef, file);
      setProgress(70);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setProgress(100);
      onUpload(fileId, downloadURL);
    } catch (e: any) {
      console.error("Upload failed", e);
      setError('アップロードに失敗しました。');
      setPreview(initialImageUrl || null);
    } finally {
      setUploading(false);
    }
  }, [firebaseApp, onUpload, initialImageUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
    onUpload('', ''); // Notify parent component that image is removed
  };

  if (preview) {
    return (
      <div className="relative w-full aspect-video rounded-md border border-dashed flex justify-center items-center">
        <Image src={preview} alt="Preview" fill className="object-contain rounded-md" />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full"
          onClick={removeImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full aspect-video rounded-md border-2 border-dashed flex flex-col justify-center items-center text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : ''
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <>
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-sm">アップロード中...</p>
          <Progress value={progress} className="w-3/4 mt-2" />
        </>
      ) : (
        <>
          <UploadCloud className="h-8 w-8 mb-2" />
          <p className="text-sm">クリックまたはドラッグ＆ドロップ</p>
          <p className="text-xs">画像ファイル (5MBまで)</p>
          {error && <p className="text-xs text-destructive mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
