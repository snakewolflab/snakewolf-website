
import { LoadingSpinner } from '@/app/loading';

export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-background">
            <LoadingSpinner />
        </div>
    );
}
