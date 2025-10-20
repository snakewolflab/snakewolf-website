
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

    useEffect(() => {
        // Generate a random number between 0 and 19
        const randomIndex = Math.floor(Math.random() * characterImages.length);
        setCharacterImage(characterImages[randomIndex]);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-primary">
                {characterImage ? (
                    <Image 
                        src={characterImage} 
                        alt="Suneuru-kun" 
                        width={100} 
                        height={100}
                        className="h-24 w-24 text-primary"
                        data-ai-hint="wolf mascot"
                    />
                ) : (
                    <div className="h-24 w-24"></div>
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
