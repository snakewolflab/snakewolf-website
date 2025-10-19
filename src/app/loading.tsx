
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const LoadingSpinner = () => {
    const suneuruImage = PlaceHolderImages.find(p => p.id === 'suneuru-kun-icon');
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-primary">
                {suneuruImage && (
                    <Image 
                        src={suneuruImage.imageUrl} 
                        alt="Suneuru-kun" 
                        width={suneuruImage.width} 
                        height={suneuruImage.height} 
                        className="h-12 w-12 text-primary"
                        data-ai-hint={suneuruImage.imageHint} 
                    />
                )}
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
