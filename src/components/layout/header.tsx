
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Wind, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "ニュース" },
];

const serviceLinks = [
    { href: "/services", label: "サービス概要" },
    { href: "/services/app-game", label: "アプリ・ゲーム開発" },
    { href: "/services/creator-support", label: "クリエイター支援" },
];

const worksLinks = [
    { href: "/works/apps", label: "アプリ一覧" },
    { href: "/works/games", label: "ゲーム一覧" },
];


export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );
  
  const DropdownNavLink = ({ label, links }: { label: string, links: { href: string, label: string }[] }) => {
    const isActive = links.some(link => pathname.startsWith(link.href));
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary p-0 h-auto",
                    isActive ? "text-primary" : "text-muted-foreground",
                    "hover:bg-transparent"
                )}>
                    {label}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {links.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Wind className="h-6 w-6 text-primary" />
          <span className="font-headline">SnakeWolf</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
          <DropdownNavLink label="サービス" links={[
              { href: "/services", label: "サービス概要"},
              { href: "/services/app-game-development", label: "アプリ・ゲーム開発"},
              { href: "/services/creator-support", label: "クリエイター支援"},
          ]} />
          <DropdownNavLink label="実績" links={worksLinks} />
          <NavLink href="/creators">クリエイター</NavLink>
          <NavLink href="/contact">お問い合わせ</NavLink>
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  <Wind className="h-6 w-6 text-primary" />
                  <span className="font-headline">SnakeWolf</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                      {link.label}
                    </Link>
                  ))}
                  <p className="text-muted-foreground">サービス</p>
                  {serviceLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("pl-4 transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                          {link.label}
                      </Link>
                  ))}
                   <p className="text-muted-foreground">実績</p>
                  {worksLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("pl-4 transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                          {link.label}
                      </Link>
                  ))}
                  <Link href="/creators" onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === '/creators' ? "text-primary" : "text-foreground")}>クリエイター</Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === '/contact' ? "text-primary" : "text-foreground")}>お問い合わせ</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
