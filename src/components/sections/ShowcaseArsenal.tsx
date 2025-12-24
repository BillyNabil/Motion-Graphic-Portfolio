'use client';

import { useEffect, useState, memo } from 'react';
import Image from 'next/image';

const SharpStar = memo(({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0L14 11L24 12L14 13L12 24L10 13L0 12L10 11Z" />
    </svg>
));
SharpStar.displayName = 'SharpStar';

const adobeTools = [
    { name: 'AFTER EFFECTS', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
    { name: 'PREMIERE PRO', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
    { name: 'CINEMA 4D', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
    { name: 'BLENDER', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
    { name: 'FIGMA', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
    { name: 'ILLUSTRATOR', type: 'text' as const },
    { name: 'separator', type: 'icon' as const },
] as const;

const LogoItem = memo(({ logo, outlined = false }: { logo: { name: string; type: 'text' | 'icon' }, outlined?: boolean }) => {
    if (logo.type === 'icon') {
        return (
            <div className="flex items-center justify-center px-3 md:px-4">
                <SharpStar className={`w-4 h-4 md:w-6 md:h-6 ${outlined ? 'text-white/60' : 'text-primary'}`} />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center px-3 md:px-4">
            <span className={`
                font-display font-bold whitespace-nowrap tracking-tighter text-xl md:text-5xl
                ${outlined ? 'text-transparent text-stroke-thick' : 'text-white'}
            `}>
                {logo.name}
            </span>
        </div>
    );
});
LogoItem.displayName = 'LogoItem';

// CSS Animation based ribbon - no JS animation overhead
const VerticalRibbon = memo(({ direction, outlined = false }: {
    direction: 'up' | 'down',
    outlined?: boolean
}) => {
    const duplicatedLogos = [...adobeTools, ...adobeTools, ...adobeTools];

    return (
        <div
            className={`flex flex-col items-center gap-4 ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
        >
            {duplicatedLogos.map((logo, index) => (
                <div key={`${logo.name}-${index}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    <LogoItem logo={logo} outlined={outlined} />
                </div>
            ))}
        </div>
    );
});
VerticalRibbon.displayName = 'VerticalRibbon';

const ShowcaseArsenal = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Debounced mobile detection
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const checkMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
            }, 100);
        };

        // Initial check
        setIsMobile(window.innerWidth < 768);

        window.addEventListener('resize', checkMobile, { passive: true });
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <section className="relative h-[50vh] bg-black overflow-hidden will-change-auto">

            {/* Grid Container - Side by Side Layout 65-35 */}
            <div
                className={`relative h-full ${isMobile ? 'flex flex-col' : 'grid'}`}
                style={{ gridTemplateColumns: isMobile ? '1fr' : '65% 35%' }}
            >

                {/* LEFT SIDE: Parallax Showcase - 65% */}
                <div className="relative w-full h-[60%] md:h-full overflow-hidden">
                    {/* Main Image - Static, no parallax for performance */}
                    <Image
                        src="/comp 2.webp"
                        alt="Showcase Animation"
                        fill
                        className="object-cover"
                        sizes="65vw"
                        priority
                    />

                    {/* Overlay gradient - fade to black on right side */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent via-70% to-black" />

                </div>

                {/* RIGHT SIDE: Creative Arsenal - 35% */}
                <div className="relative w-full h-[40%] md:h-full overflow-hidden bg-black flex items-center justify-center">

                    {/* Left edge fade from image */}
                    <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10" />

                    {/* Vertical Ribbons - X Pattern */}
                    {!isMobile && (
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

                            {/* Ribbon 1: Filled - No backdrop-blur for performance */}
                            <div
                                className="absolute h-[250%] bg-white/10 border-x-2 border-white/20 z-10 w-[120px]"
                                style={{
                                    transform: 'rotate(45deg) translateZ(0)',
                                    left: '50%',
                                    marginLeft: '-60px'
                                }}
                            >
                                <div className="h-full flex items-start justify-center py-6 overflow-hidden">
                                    <VerticalRibbon direction="up" />
                                </div>
                            </div>

                            {/* Ribbon 2: Outlined - No backdrop-blur for performance */}
                            <div
                                className="absolute h-[250%] bg-black/80 border-x-2 border-white/20 z-20 w-[120px]"
                                style={{
                                    transform: 'rotate(-45deg) translateZ(0)',
                                    left: '50%',
                                    marginLeft: '-60px'
                                }}
                            >
                                <div className="h-full flex items-start justify-center py-6 overflow-hidden">
                                    <VerticalRibbon direction="down" outlined={true} />
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Mobile Stack Layout - CSS animations */}
                    {isMobile && (
                        <div className="relative w-full flex flex-col gap-6 py-8">
                            <div className="w-full bg-white/5 border-y border-white/10 py-3 overflow-hidden">
                                <div className="flex items-center animate-scroll-left">
                                    {[...adobeTools, ...adobeTools, ...adobeTools].map((logo, index) => (
                                        <LogoItem key={`${logo.name}-${index}`} logo={logo} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full bg-black/40 border-y border-white/10 py-3 overflow-hidden">
                                <div className="flex items-center animate-scroll-right">
                                    {[...adobeTools, ...adobeTools, ...adobeTools].map((logo, index) => (
                                        <LogoItem key={`${logo.name}-${index}-outlined`} logo={logo} outlined={true} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />

                </div>

            </div>

        </section>
    );
};

export default ShowcaseArsenal;
