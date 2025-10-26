
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isShareable, setIsShareable] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    // navigator is only available on the client side.
    if (navigator.share) {
      setIsShareable(true);
    }
    // window.location.origin is also client-side only
    setFullUrl(window.location.origin + pathname);
  }, [pathname]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `SnakeWolfのニュースをチェック: ${title}`,
          url: fullUrl,
        });
      } catch (error) {
        // AbortError is thrown when the user cancels the share dialog.
        // We don't want to show an error toast in that case.
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('共有に失敗しました', error);
        toast({
            variant: "destructive",
            title: "エラー",
            description: "記事の共有に失敗しました。",
        });
      }
    }
  };

  if (!isShareable) {
    return null;
  }

  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <Share className="mr-2 h-4 w-4" />
      記事を共有する
    </Button>
  );
}
