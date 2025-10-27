
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // If auth state is not loading and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      // Redirect will be handled by the effect hook or a global state listener
      router.push('/login');
    }
  };

  // While checking auth state, show a loader
  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If there is a user, show the admin content
  if (user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">管理画面</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            ようこそ、{user.email || '管理者'}さん。
          </p>
        </header>
        <div className="max-w-md mx-auto text-center">
          <p className="mb-8">ここは管理者専用ページです。</p>
          <Button onClick={handleLogout} variant="destructive">
            ログアウト
          </Button>
        </div>
      </div>
    );
  }

  // If no user and not loading, this will be briefly rendered before the redirect effect runs.
  // You can also return null or a loader here.
  return null;
}
