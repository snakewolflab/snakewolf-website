
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Twitter, Facebook, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ShareMenuProps = {
  title: string;
};

// SVG for LINE icon
const LineIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
        <path fill="currentColor" d="M218.7 191.5c-3-12-10-33.8-10.7-36.8c-2-8.8-13.3-6.5-16.7-5.3c-3.4 1.2-5.7 4.3-5.3 7.8c.4 3.7 3.3 8.3 4.2 9.5c1.4 1.8 1.3 4.2-.3 5.7c-1.6 1.5-4.1 1.6-5.7.3c-1.8-1.5-6.6-5.8-11.8-10.7c-11-10.4-21-22.3-22.6-35.3c-1.1-9.3 5.2-13.8 9.3-19.1c3.8-5 3.3-8.8-1-12.8c-4.2-3.8-9.3-3.7-12.7.3c-3.4 4-5.3 8.8-6.2 11.5c-1.6 4.9-3.7 11.2-12.3 11.2h-18.4c-12.8 0-14-11.2-14.3-12.8c-1-6.5 1-13 6.3-17.7c2.2-2 3.8-4.6 3.8-7.5c0-5.7-4.6-10.2-10.3-10.2c-3.4 0-6.5 1.7-8.5 4.3c-1.8 2.5-5.3 7-5.3 15.5c0 15 11.3 35.8 25.2 46.8c11.3 9 24.8 14.8 38.8 14.8h18.3c4.7 0 8.3-3.8 8.3-8.5v-6.3c0-1.5 1.5-2.5 3-1.8c1.5.8 2.3 2.5 1.8 4c-1.1 3.5-3.3 9.8 1.5 13.8c4.8 4 10.8 1.8 14.2-.2c3.4-2 6-5.2 7-9c.8-3.4 1.2-5.8 1.2-6.5c.2-2.3-1.3-4.5-3.5-5.3c-2.3-.8-4.8.3-5.8 2.5c-.8 1.8-1.8 4-4.2 4.8c-2.3.7-4.7-.5-5.5-2.7c-.8-2.3.2-4.8 2.5-5.7c2.3-1 5.8-.3 8.3 2.2c7.8 7.8 1.7 19.5-3.3 25.8c-5.2 6.5-13.7 9-20.5 6.2c-5.5-2.3-10-7-12.3-12.7c-1.8-4.3-3.3-9-9.5-9.8h-18.3c-12.2 0-24-4.8-34-12.7c-13.8-10.8-24.2-29.2-24.2-44.5c0-10.8 5-19.5 11-25c7.8-7.2 18.2-10.2 28.5-10.2c16.3 0 28.8 10.5 32.7 18.8c.2.5.7.8 1.2.8c.6 0 1.2-.4 1.4-1c3-11.8 15-20.8 29.5-20.8c12.3 0 23 7.5 27.5 18.2c.8 1.8 2.5 3 4.5 3s4-.8 5-2.3c4.7-7 12-11.5 20.2-11.5c14.2 0 25.7 11.5 25.7 25.8c0 5-1.4 9.8-4.2 13.8c-3.7 5.3-6.8 7.3-6.8 11c0 5.2 4.3 8.7 8.8 10.5c11.3 4.5 21 1.5 25-2.2c8.8-8.3 11-18.7 6.8-27c-1-2-1.2-4.3-.4-6.3c.8-2 2.8-3.5 5-3.8c2.2-.3 4.3.8 5.5 2.7c2.8 4.7 2.3 10.5-1.2 14.2c-3.3 3.7-8.3 5.3-12.8 4.3c-4.7-1-7.8-5.3-8-9.8c-.2-4.3 2.7-8.2 6.8-9.3c5.3-1.3 10 2.2 12 6.3c1.7 3.5 3 8.8 8.8 12.3c11.5 7 24.3 6.8 35.8-1.3c7.8-5.3 10.7-15.5 7.8-23.7c-1.6-4.5-5.5-7.8-10.2-8.3c-4.7-.5-9 2-11.5 5.8c-2.3 3.8-2.5 8.3-1 12.3c1.5 4 5.3 6.8 9.5 6.8c1.3 0 2.5-.3 3.7-.8c1-.5 1.8-1.5 2-2.7c2-10-6.8-17-15.7-17c-6.8 0-12.7 4-15.2 9.8c-1.3 2.8-4 4.7-7 4.7c-3.3 0-6.2-2.2-7.2-5.3c-4.5-13.8-18-24.3-33.8-24.3c-14.7 0-27.5 9-32.5 21.8c-1 2.5-3.5 4.3-6.2 4.3s-5.2-1.8-6.2-4.3C80 50.8 67.4 41.3 52.8 41.3c-12.7 0-23.7 7-28.5 17c-1.3 2.8-4.2 4.7-7.2 4.7c-2.8 0-5.3-1.7-6.5-4.3c-3-7.5-10.2-12.5-18.3-12.5c-11.3 0-20.5 9.2-20.5 20.5c0 7.7 4.2 14.5 10.5 18.2c1.6 1 2.7 2.6 2.7 4.5c0 3.3-1.8 6.3-4.7 8.2c-5.7 3.8-10.2 9.8-10.2 17c0 10.5 8.2 21.8 19.8 29.8c9.8 6.8 22.3 11 34.8 11h18.4c14.2 0 17.8-13.5 18.2-15c.2-.8.5-1.5 1-2c.8-1.2 2.2-2 3.7-2c2.5 0 4.7 2 5.3 4.5c1.1 4.5 5.8 8.8 13.8 8.8h.2c14.2 0 29-6.3 41.2-17.5c6.3-5.8 12.3-13 16.5-21c2.3-4.5 2.8-9.5 1.5-14.3c-1.3-4.8-4.8-8.5-9.7-9.5c-4.8-1-9.5 1.3-12.5 5c-3.3 4-4.2 9-2.3 13.3c1.8 4.3 5.8 7.2 10.5 7.2c1.3 0 2.5-.2 3.7-.7c3.2-1.2 5.3-4.3 4.8-7.7c-.5-3.3-3.2-6.2-6.2-7c-3-.8-6.3.8-8 3.4c-4.8 7.3-15.5 11.2-25.2 8.5c-9.8-2.8-17-10-18.8-19.8c-.1-.7-.7-1.3-1.4-1.3c-.6 0-1.1.3-1.3.8c-2.5 8-8.5 14.2-16 16.7c-8.3 2.8-17.2 1.3-24.3-4.2c-4-3.2-7-7.3-8.8-12c-2-5.3-2-11 0-16.3c1.1-2.8 0-6-2.3-8c-2.3-2-5.7-2.3-8.3-1c-5.3 2.8-8.2 8.3-7.5 14c.2 1.4 10.8 15 25.2 15h18.3c14.8 0 16-12.8 16.2-13.3c.3-1.3 1.5-2.3 2.8-2.3c1.5 0 2.8 1.2 3 2.7c1.3 9.3 10.5 16.3 20.7 16.3c9.3 0 17.5-6 20-14.5c.5-1.8 2-3.2 3.8-3.2c2.2 0 4 1.8 4.2 4c.5 6.7-3.8 12.5-10.2 14.3c-5.3 1.5-10.8-1-13.8-5.3c-3-4.3-3.3-9.8-1.2-14.5c2-4.7 6.3-8 11.2-8.5c5-.5 9.8 2.3 12.7 6.5c3.2 4.7 4.2 10.5 3 16c-.8 3.8.8 7.8 4.2 9.8c3.2 2 7.3 1.2 9.8-1.5c2.5-2.8 3-6.8 1.8-10.2c-1.3-3.7-4.3-6.3-8-6.8c-3.7-.5-7.3 1.5-9.5 4.7c-1.3 1.8-3.7 2.7-5.8 2.2c-2.3-.5-4-2.3-4.5-4.5c-1.3-6-6.7-10.5-12.7-10.5c-5.8 0-10.8 3.3-13.3 8.3c-1.8 3.3-5.2 5.3-8.7 5.3c-4.7 0-8.8-3-11-7.5c-3.5-7-2.8-15.5 1.8-21.5c4.7-6.2 12.2-9.7 20-9.7c10.8 0 20.5 6.7 24.3 16.7c1.1 2.7 3.6 4.6 6.5 4.6s5.4-1.9 6.5-4.6c5-12.2 16.8-20.2 30.2-20.2c13.8 0 26 8.5 30.5 21.2c1 2.8 3.6 4.8 6.5 4.8c3.1 0 5.8-2.2 6.8-5.2c5-15.2 19.8-26 36.5-26c20.3 0 36.8 16.5 36.8 36.8c0 10-4 19.3-11.2 26.2c-5.8 5.7-13.5 8.7-21.5 8.7c-5.8 0-11.3-2.2-15.7-6.2c-3.8-3.7-8.8-5.3-13.7-4.3c-5 .8-9.3 4.3-10.7 9c-1.5 5.3.8 10.8 5.3 13.8c4.5 3 10 3.2 14.8 1c5.8-2.5 10.3-7.7 12.2-13.7c1-3.3 2.3-8 8.2-10.7c12.2-5.7 27.5-3.8 37.8 5.3C216.5 178 220.3 184.2 218.7 191.5z"/>
    </svg>
);


export function ShareMenu({ title }: ShareMenuProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    // window.location.origin is only available on the client side
    setFullUrl(window.location.origin + pathname);
  }, [pathname]);

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

  const socialShares = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    },
    {
      name: 'LINE',
      icon: <LineIcon className="h-4 w-4 mr-2" />,
      url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(fullUrl)}`
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          記事を共有する
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {socialShares.map((social) => (
          <DropdownMenuItem key={social.name} asChild>
            <a href={social.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              {social.icon}
              {social.name}で共有
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          URLをコピー
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
