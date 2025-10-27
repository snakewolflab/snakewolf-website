'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください。' }),
});

const signupSchema = z.object({
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

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '' },
  });

  if (isUserLoading || isAuthLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (user) {
    router.push('/admin');
    return null;
  }

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsAuthLoading(true);
    try {
      initiateEmailSignIn(auth, data.email, data.password);
      // Non-blocking, relying on onAuthStateChanged to redirect
      toast({ title: 'ログイン処理を開始しました。' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'ログインエラー', description: error.message });
      setIsAuthLoading(false);
    }
  };

  const handleSignup = async (data: z.infer<typeof signupSchema>) => {
    setIsAuthLoading(true);
    try {
      initiateEmailSignUp(auth, data.email, data.password);
      toast({ title: 'サインアップ処理を開始しました。' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'サインアップエラー', description: error.message });
      setIsAuthLoading(false);
    }
  };
  
  const handleAnonymousLogin = () => {
    setIsAuthLoading(true);
    try {
        initiateAnonymousSignIn(auth);
        toast({ title: '匿名ログイン処理を開始しました。'});
    } catch (error: any) {
        toast({ variant: 'destructive', title: '匿名ログインエラー', description: error.message });
        setIsAuthLoading(false);
    }
  }

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">ログイン</TabsTrigger>
          <TabsTrigger value="signup">新規登録</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>ログイン</CardTitle>
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
               <Button variant="outline" onClick={handleAnonymousLogin} className="w-full mt-4" disabled={isAuthLoading}>
                  {isAuthLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : '匿名で続ける'}
                </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>新規登録</CardTitle>
              <CardDescription>新しいアカウントを作成します。</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">メールアドレス</Label>
                  <Input id="signup-email" {...signupForm.register('email')} />
                  {signupForm.formState.errors.email && <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">パスワード</Label>
                  <Input id="signup-password" type="password" {...signupForm.register('password')} />
                  {signupForm.formState.errors.password && <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : '登録'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
