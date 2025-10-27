
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Favicon from "@/app/favicon.png";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "企業情報" },
  { href: "/services", label: "サービス" },
  { href: "/works/apps", label: "アプリ実績" },
  { href: "/works/games", label: "ゲーム実績" },
  { href: "/creators", label: "クリエイター" },
  { href: "/news", label: "ニュース" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold text-lg">
          <Image src={Favicon} alt="SnakeWolf Logo" width={24} height={24} />
          <span className="font-headline">SnakeWolf</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(1).map((link) => ( // ホームを除外
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname.startsWith(link.href) && link.href !== "/" ? "text-primary" : "text-foreground/60",
                   pathname === link.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link
              href="/contact"
              className={cn(
                "transition-colors hover:text-primary",
                pathname === "/contact" ? "text-primary" : "text-foreground/60"
              )}
            >
              お問い合わせ
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image src={Favicon} alt="SnakeWolf Logo" width={24} height={24} />
                      <span className="font-headline">SnakeWolf</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-6">
                  <nav className="flex flex-col gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                        {link.label}
                      </Link>
                    ))}
                     <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-foreground")}>
                        お問い合わせ
                      </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
