
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingSpinner = () => {
    const [characterImage, setCharacterImage] = useState<string | null>(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 20) + 1;
        setCharacterImage(`/character/${randomIndex}.png`);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-primary">
                {characterImage && (
                    <Image 
                        src={characterImage} 
                        alt="Suneuru-kun" 
                        width={100} 
                        height={100}
                        className="h-24 w-24 text-primary"
                        data-ai-hint="wolf mascot"
                        unoptimized
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
