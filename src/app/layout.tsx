
'use client';

import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { cn } from "@/lib/utils";


// Metadata cannot be exported from a client component.
// This is a static object, so we can define it here.
const metadata: Metadata = {
  title: {
    default: "SnakeWolf 公式HP",
    template: "%s | SnakeWolf 公式HP",
  },
  description: "SnakeWolfの公式ウェブサイトです。テクノロジーの未来を創造します。",
  keywords: ["SnakeWolf", "テクノロジー", "イノベーション", "公式HP"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFadingOut(false);
    
    const timer = setTimeout(() => {
      setFadingOut(true);
      // Wait for fade out animation to complete
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1000); // Minimum 1 second loading time

    return () => clearTimeout(timer);
  }, [pathname]);


  return (
    <html lang="ja">
      <head>
        <title>SnakeWolf 公式HP</title>
        <meta name="description" content="SnakeWolfの公式ウェブサイトです。テクノロジーの未来を創造します。" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {loading && <LoadingScreen className={cn(fadingOut && "animate-fade-out")} />}
        <div className={cn(loading ? "opacity-0" : "opacity-100 transition-opacity duration-500")}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
