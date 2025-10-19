"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Wind, Newspaper, Gamepad2, Sparkles, User, Wrench, AppWindow, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "企業情報", icon: Building },
  { href: "/news", label: "ニュース", icon: Newspaper },
  { href: "/creators", label: "クリエイター", icon: User },
  { href: "/contact", label: "お問い合わせ" },
];

const servicesComponents: { title: string; href: string; description: string, icon: React.FC<any> }[] = [
  {
    title: "アプリ・ゲーム開発",
    href: "/services/app-game-development",
    description: "企画から開発、運用までワンストップでサポート。あなたのアイデアを形にします。",
    icon: Gamepad2,
  },
  {
    title: "クリエイター支援",
    href: "/services/creator-support",
    description: "コンテンツ制作から収益化まで、あなたのクリエイティブ活動を全面的にバックアップします。",
    icon: Sparkles,
  },
];

const worksComponents: { title: string; href: string; description: string, icon: React.FC<any> }[] = [
  {
    title: "アプリ実績",
    href: "/works/apps",
    description: "私たちが開発した革新的なアプリケーションの数々をご覧ください。",
    icon: AppWindow,
  },
  {
    title: "ゲーム実績",
    href: "/works/games",
    description: "私たちが情熱を注いで開発した、没入感あふれるゲームの数々をご覧ください。",
    icon: Gamepad2,
  },
];


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2 font-bold text-lg">
          <Wind className="h-6 w-6 text-primary" />
          <span className="font-headline">SnakeWolf</span>
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
             <NavigationMenuItem>
                <Link href="/" passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/" ? "text-primary" : "")}>
                    ホーム
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/about" ? "text-primary" : "")}>
                    企業情報
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(pathname.startsWith('/services') ? "text-primary" : "")}>サービス</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {servicesComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(pathname.startsWith('/works') ? "text-primary" : "")}>実績</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {worksComponents.map((component) => (
                     <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <Link href="/creators" passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/creators" ? "text-primary" : "")}>
                    クリエイター
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/news" passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname.startsWith('/news') ? "text-primary" : "")}>
                  ニュース
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end gap-4">
           <Button asChild className="hidden md:flex">
            <Link href="/contact">お問い合わせ</Link>
          </Button>

          {/* Mobile Navigation */}
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
                    <div>
                      <p className="text-muted-foreground mt-2">サービス</p>
                      <div className="pl-4 flex flex-col gap-4 mt-2">
                        {servicesComponents.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                                {link.title}
                            </Link>
                        ))}
                      </div>
                    </div>
                     <div>
                      <p className="text-muted-foreground mt-2">実績</p>
                       <div className="pl-4 flex flex-col gap-4 mt-2">
                        {worksComponents.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground")}>
                                {link.title}
                            </Link>
                        ))}
                      </div>
                    </div>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.FC<any> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
