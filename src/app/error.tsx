"use client";

import Link from 'next/link';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.32))] text-center px-4">
      <Ban className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl">
        403 - アクセスが拒否されました
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        このページにアクセスする権限がありません。
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()}>
          再試行
        </Button>
        <Button asChild variant="outline">
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
    </div>
  );
}
