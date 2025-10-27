
'use client';

import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useFirebaseApp } from '@/firebase';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageWithUrlProps {
  imageId: string;
  alt: string;
  isAvatar?: boolean;
}

export function ImageWithUrl({ imageId, alt, isAvatar = false }: ImageWithUrlProps) {
  const firebaseApp = useFirebaseApp();
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageId || !firebaseApp) {
        setIsLoading(false);
        return;
    };
    
    setIsLoading(true);
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, `images/${imageId}`);
    getDownloadURL(imageRef)
      .then((downloadUrl) => {
        setUrl(downloadUrl);
      })
      .catch((error) => {
        console.error(`Failed to get download URL for imageId ${imageId}`, error);
        setUrl(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [imageId, firebaseApp]);

  const containerClasses = isAvatar 
    ? 'w-12 h-12 relative bg-muted rounded-full overflow-hidden' 
    : 'w-16 h-10 relative bg-muted rounded-md overflow-hidden';

  if (isLoading) {
    return <Skeleton className={isAvatar ? 'w-12 h-12 rounded-full' : 'w-16 h-10 rounded-md'} />;
  }

  return (
    <div className={containerClasses}>
      {url ? (
        <Image src={url} alt={alt} fill className="object-cover" />
      ) : (
        <ImageIcon className="w-6 h-6 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
