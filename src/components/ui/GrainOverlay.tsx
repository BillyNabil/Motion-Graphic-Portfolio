'use client';

import { useEffect, useState } from 'react';

const GrainOverlay = () => {
    // Only mount on client to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-overlay">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6"
                        stitchTiles="stitch"
                        numOctaves="3"
                        seed="0"
                    >
                        <animate
                            attributeName="seed"
                            from="0"
                            to="10"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};

export default GrainOverlay;
