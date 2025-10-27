
'use client';

import type { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: 'お問い合わせ',
//   description: 'SnakeWolfへのご質問、ご意見、ビジネスに関するお問い合わせはこちらから。',
// };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">お問い合わせ</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          ご質問やご相談、ビジネスに関するお問い合わせなど、お気軽にご連絡ください。
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h2 className="font-headline text-2xl font-bold mb-6">お問い合わせフォーム</h2>
          <ContactForm />
        </div>
        <div className="flex flex-col justify-center space-y-8">
            <h3 className="font-headline text-2xl font-bold">その他の連絡方法</h3>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold">メール</h4>
                    <p className="text-muted-foreground">一般的なお問い合わせはこちら</p>
                    <a href="mailto:snakewolf.info@gmail.com" className="text-primary hover:underline">snakewolf.info@gmail.com</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold">サポートサーバー</h4>
                    <p className="text-muted-foreground">お急ぎの場合</p>
                    <Button asChild>
                        <Link href="https://discord.gg/CEYmfyQQ2y" target="_blank" rel="noopener noreferrer">Join Discord</Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
