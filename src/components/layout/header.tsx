
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Favicon from "@/app/favicon.png";
import { useAuth, useUser } from "@/firebase";

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
  const router = useRouter();
  const auth = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    await auth?.signOut();
    router.push('/');
  };

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
            {user && (
              <>
                <Link
                  href="/admin"
                  className={cn(
                    "transition-colors hover:text-primary",
                    pathname.startsWith('/admin') ? "text-primary" : "text-foreground/60"
                  )}
                >
                  管理画面
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                <UserCog className="h-5 w-5" />
                <span className="sr-only">管理画面</span>
              </Button>
            )}
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
                      {user && (
                        <>
                          <hr className="my-2" />
                          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname.startsWith('/admin') ? "text-primary" : "text-foreground")}>
                            管理画面
                          </Link>
                          <Button variant="ghost" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="justify-start text-lg p-0 h-auto">
                            ログアウト
                          </Button>
                        </>
                      )}
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
