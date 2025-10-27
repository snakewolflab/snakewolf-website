
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const GITHUB_CHARACTER_BASE_URL = 'https://raw.githubusercontent.com/snakewolflab/snakewolf-website/refs/heads/assets/suneuru-kun/';

const characterImageCount = 20;

const LoadingSpinner = () => {
    const [characterImage, setCharacterImage] = useState<string | null>(null);
    const [dots, setDots] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const randomIndex = Math.floor(Math.random() * characterImageCount) + 1;
        setCharacterImage(`${GITHUB_CHARACTER_BASE_URL}${randomIndex}.png`);

        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="w-full h-full flex items-center justify-center">
             {isClient && characterImage ? (
                <div className="relative w-1/2 aspect-square">
                    <Image 
                        src={characterImage} 
                        alt="Suneuru-kun" 
                        fill
                        className="object-contain"
                        data-ai-hint="wolf mascot"
                        priority
                        unoptimized
                    />
                </div>
            ) : (
                <div className="w-1/2 aspect-square bg-muted/50 rounded-lg"></div>
            )}
            <p className="fixed bottom-4 right-4 text-muted-foreground">
                読み込み中{dots}
            </p>
        </div>
    );
};


export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}

export { LoadingSpinner };
