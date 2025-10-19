
import { LoadingSpinner } from '@/app/loading';
import { cn } from '@/lib/utils';

export function LoadingScreen({ className }: { className?: string }) {
    return (
        <div className={cn("pointer-events-none fixed inset-0 flex items-center justify-center bg-background z-[100]", className)}>
            <LoadingSpinner />
        </div>
    );
}
