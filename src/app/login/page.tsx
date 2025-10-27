
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, useUser, initiateEmailSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください。' }),
});

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Effect to redirect if user is already logged in
  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);


  if (isUserLoading || user) { // While loading or if user exists, show a loader or nothing to prevent flicker
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    if (!auth) return;
    setIsAuthLoading(true);
    try {
      await initiateEmailSignIn(auth, data.email, data.password);
      // The onAuthStateChanged listener in the provider will handle the redirect.
      toast({ title: 'ログイン処理を開始しました。' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'ログインエラー', description: error.message });
      setIsAuthLoading(false);
    }
  };


  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>管理者ログイン</CardTitle>
          <CardDescription>アカウント情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">メールアドレス</Label>
              <Input id="login-email" {...loginForm.register('email')} />
              {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">パスワード</Label>
              <Input id="login-password" type="password" {...loginForm.register('password')} />
              {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isAuthLoading}>
              {isAuthLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'ログイン'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
