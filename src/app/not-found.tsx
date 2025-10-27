
'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.32))] text-center px-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl">
        404 - ページが見つかりません
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Button asChild className="mt-8">
        <Link href="/">ホームに戻る</Link>
      </Button>
    </div>
  );
}
