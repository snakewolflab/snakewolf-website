
'use client';

import type { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240" {...props}>
        <path fill="currentColor" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
        <path fill="currentColor" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
    </svg>
);


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
                    <Link
                      href="https://discord.gg/CEYmfyQQ2y"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-white font-bold rounded-lg px-4 py-2.5 bg-[#7289da] hover:bg-[#6a7fc9] transition-colors no-underline"
                    >
                      <DiscordIcon className="w-6 h-6 mr-3" />
                      <span>Join Discord</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
