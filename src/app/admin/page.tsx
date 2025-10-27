
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  LogOut,
  Newspaper,
  Gamepad2,
  AppWindow,
  Users,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { NewsAdmin } from '@/app/admin/_components/news-admin';
import { WorksAdmin } from '@/app/admin/_components/works-admin';
import { CreatorsAdmin } from '@/app/admin/_components/creators-admin';


export default function AdminPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState('news');

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
  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              管理ダッシュボード
            </h1>
            <p className="text-muted-foreground">
              ようこそ、{user.email || '管理者'}さん。
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="news">
              <Newspaper className="mr-2 h-4 w-4" />
              ニュース
            </TabsTrigger>
            <TabsTrigger value="apps">
              <AppWindow className="mr-2 h-4 w-4" />
              アプリ
            </TabsTrigger>
            <TabsTrigger value="games">
              <Gamepad2 className="mr-2 h-4 w-4" />
              ゲーム
            </TabsTrigger>
            <TabsTrigger value="creators">
              <Users className="mr-2 h-4 w-4" />
              クリエイター
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news" className="mt-6">
            <NewsAdmin />
          </TabsContent>
          <TabsContent value="apps" className="mt-6">
            <WorksAdmin category="App" />
          </TabsContent>
          <TabsContent value="games" className="mt-6">
            <WorksAdmin category="Game" />
          </TabsContent>
          <TabsContent value="creators" className="mt-6">
            <CreatorsAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
