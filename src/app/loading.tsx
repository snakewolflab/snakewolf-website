import { Wind } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-primary">
                <Wind className="h-12 w-12 animate-spin" />
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
