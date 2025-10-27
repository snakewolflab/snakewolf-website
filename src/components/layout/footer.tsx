
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Favicon from '@/app/favicon.png';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const footerLinks = [
    { href: "/terms", label: "利用規約" },
    { href: "/privacy", label: "プライバシーポリシー" },
    { href: "/defamation", label: "誹謗中傷について" },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Image src={Favicon} alt="SnakeWolf Logo" width={24} height={24} />
            <span className="font-headline font-bold text-lg">SnakeWolf</span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} SnakeWolf. All Rights Reserved.
            </p>
          </div>
          <div className="w-24 hidden md:block"></div>
        </div>
      </div>
    </footer>
  );
}
