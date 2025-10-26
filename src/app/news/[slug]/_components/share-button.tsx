
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [canShare, setCanShare] = useState(false);
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    // navigator is only available on the client side.
    if (navigator.share) {
      setCanShare(true);
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
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.error('共有に失敗しました', error);
        toast({
            variant: "destructive",
            title: "エラー",
            description: `記事の共有に失敗しました: ${error}`,
        });
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "成功",
        description: "記事のURLをクリップボードにコピーしました。",
      });
    } catch (error) {
      console.error('コピーに失敗しました', error);
      toast({
        variant: "destructive",
        title: "エラー",
        description: "URLのコピーに失敗しました。",
      });
    }
  };

  if (canShare) {
    return (
        <Button onClick={handleShare} variant="outline" size="sm">
          <Share className="mr-2 h-4 w-4" />
          記事を共有する
        </Button>
    );
  }

  // Fallback for browsers that don't support navigator.share
  return (
    <Button onClick={handleCopy} variant="outline" size="sm">
      <Copy className="mr-2 h-4 w-4" />
      URLをコピー
    </Button>
  );
}
