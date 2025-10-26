
import Link from 'next/link';
import Image from 'next/image';
import Favicon from '@/app/favicon.png';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src={Favicon} alt="SnakeWolf Logo" width={24} height={24} />
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
