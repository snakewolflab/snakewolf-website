
'use client';

import { useState, useEffect } from 'react';
import Image, { type StaticImageData } from 'next/image';

import Snewol1 from '../character/1.png';
import Snewol2 from '../character/2.png';
import Snewol3 from '../character/3.png';
import Snewol4 from '../character/4.png';
import Snewol5 from '../character/5.png';
import Snewol6 from '../character/6.png';
import Snewol7 from '../character/7.png';
import Snewol8 from '../character/8.png';
import Snewol9 from '../character/9.png';
import Snewol10 from '../character/10.png';
import Snewol11 from '../character/11.png';
import Snewol12 from '../character/12.png';
import Snewol13 from '../character/13.png';
import Snewol14 from '../character/14.png';
import Snewol15 from '../character/15.png';
import Snewol16 from '../character/16.png';
import Snewol17 from '../character/17.png';
import Snewol18 from '../character/18.png';
import Snewol19 from '../character/19.png';
import Snewol20 from '../character/20.png';

const characterImages = [
    Snewol1, Snewol2, Snewol3, Snewol4, Snewol5,
    Snewol6, Snewol7, Snewol8, Snewol9, Snewol10,
    Snewol11, Snewol12, Snewol13, Snewol14, Snewol15,
    Snewol16, Snewol17, Snewol18, Snewol19, Snewol20
];

const LoadingSpinner = () => {
    const [characterImage, setCharacterImage] = useState<StaticImageData | null>(null);
    const [dots, setDots] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const randomIndex = Math.floor(Math.random() * characterImages.length);
        setCharacterImage(characterImages[randomIndex]);
    }, []);

    useEffect(() => {
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
