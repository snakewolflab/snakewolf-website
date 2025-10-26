
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">SnakeWolf</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SnakeWolf. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
