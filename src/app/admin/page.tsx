
'use client';

import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { useUser } from '@/firebase';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Newspaper, Gamepad2, AppWindow, Users } from 'lucide-react';

const adminSections = [
    {
        title: "ニュース管理",
        description: "サイトに表示されるニュース記事の追加、編集、削除を行います。",
        href: "/admin/news",
        icon: Newspaper,
    },
    {
        title: "アプリ管理",
        description: "実績として掲載するアプリの情報を管理します。",
        href: "/admin/apps",
        icon: AppWindow,
    },
    {
        title: "ゲーム管理",
        description: "実績として掲載するゲームの情報を管理します。",
        href: "/admin/games",
        icon: Gamepad2,
    },
    {
        title: "クリエイター管理",
        description: "サポートしているクリエイターの情報を管理します。",
        href: "/admin/creators",
        icon: Users,
    }
];

export default function AdminDashboardPage() {
  useAuthRedirect();
  const { user, isUserLoading } = useUser();

  if (isUserLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">管理ダッシュボード</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          ウェブサイトのコンテンツをここから管理します。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {adminSections.map((section) => (
            <Card key={section.href} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <section.icon className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">{section.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <CardDescription className="flex-grow">{section.description}</CardDescription>
                    <Button asChild className="mt-4 self-start">
                        <Link href={section.href}>
                            移動する <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
