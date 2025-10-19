
import { Wind } from 'lucide-react';

const SuneuruKun = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-12 w-12 text-primary" fill="currentColor">
        <path d="M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,45.1 89.1,40.4 87.5,36 C80,38 75,45 75,50 C75,63.8 63.8,75 50,75 C36.2,75 25,63.8 25,50 C25,36.2 36.2,25 50,25 C55,25 60,27 64,30.5 C59.6,31.9 55,36.2 55,42 C55,48.6 60.4,54 67,54 C70.8,54 74.2,52.2 76.5,49.5 C81,46 85,41 87.5,36C80,20 65,10 50,10 Z M65,40 A5,5 0 0 1 60,45 A5,5 0 0 1 55,40 A5,5 0 0 1 65,40 M35,40 A5,5 0 0 1 30,45 A5,5 0 0 1 25,40 A5,5 0 0 1 35,40" />
        <path d="M70,20 C68,18 66,16.5 63.8,15.2 C65.5,13.2 67.5,11.5 70,10 L70,20 Z" />
    </svg>
)

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-primary">
                <SuneuruKun />
                <span className="font-headline text-2xl font-bold">SnakeWolf</span>
            </div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
    );
};


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
      <LoadingSpinner />
    </div>
  );
}

export { LoadingSpinner };
