import { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  baseY: number;
  size: 'small' | 'medium' | 'large';
  speedMultiplier: number;
  baseOpacity: number;       // the star's fixed base brightness
  twinkleOpacity: number;    // the dynamic opacity during idle twinkling
}

export const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const animationFrameId = useRef<number>();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const twinkleIntervalRef = useRef<NodeJS.Timeout>();

  const [stars, setStars] = useState<Star[]>([]);
  const [stretch, setStretch] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // generate on mount
  useEffect(() => {
    const generateStars = () => {
      const starCount = 150;
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        const sizeRand = Math.random();
        let size: 'small' | 'medium' | 'large';
        if (sizeRand < 0.6) size = 'small';
        else if (sizeRand < 0.85) size = 'medium';
        else size = 'large';

        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          baseY: Math.random() * 100,
          size,
          speedMultiplier: 0.3 + Math.random() * 0.7,
          baseOpacity: 0.2 + Math.random() * 0.4,
          twinkleOpacity: 0.1 + Math.random() * 0.15,
        });
      }
      
      starsRef.current = newStars;
      setStars(newStars);
    };

    generateStars();
  }, []);

// idle twinkle
  useEffect(() => {
    const twinkle = () => {
      if (isScrolling) return; // Don't twinkle while scrolling

      starsRef.current = starsRef.current.map(s => ({
        ...s,
        twinkleOpacity: Math.random() ** 4

      }));

      setStars([...starsRef.current]);
    };

    twinkleIntervalRef.current = setInterval(twinkle, Math.random() ** 2 * 700);

    return () => clearInterval(twinkleIntervalRef.current);
  }, [isScrolling]);

// scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    // Reset fade-off timer
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      // reset stretch when scroll stops
      setStretch(0);
    }, 180);

    // Track scroll velocity
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;
    scrollVelocity.current = delta;
    lastScrollY.current = currentScrollY;

    // Stretch factor
    const absVelocity = Math.abs(delta);
    const newStretch = Math.min(absVelocity * 0.8, 40);
    setStretch(newStretch);

    // Parallax update
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = pageHeight > 0 ? currentScrollY / pageHeight : 0;

    const updatedStars = starsRef.current.map(star => ({
      ...star,
      y: (star.baseY + scrollProgress * 100 * star.speedMultiplier) % 100,
    }));

    starsRef.current = updatedStars;
    setStars([...updatedStars]);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
      clearInterval(twinkleIntervalRef.current);
    };
  }, [handleScroll]);

// helpers
  const getStarSize = (size: string) => {
    switch (size) {
      case 'small': return { width: 2, height: 2 };
      case 'medium': return { width: 4, height: 4 };
      case 'large': return { width: 6, height: 6 };
    }
    return { width: 2, height: 2 };
  };

  const getStarGlow = (size: string) => {
    switch (size) {
      case 'small': return 'none';
      case 'medium': return '0 0 4px 1px hsl(210 100% 80% / 0.5)';
      case 'large': return '0 0 8px 2px hsl(210 100% 80% / 0.6)';
    }
    return 'none';
  };

  // Direction determines gradient orientation
  const stretchDirection = scrollVelocity.current >= 0 ? 1 : -1;

// render
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {stars.map(star => {
        const baseSize = getStarSize(star.size);
        const stretchAmount = stretch * star.speedMultiplier;
        const stretchedHeight = baseSize.height + stretchAmount;

        // ⭐ BRIGHTNESS DURING SCROLL
        const absVel = Math.abs(scrollVelocity.current);
        const scrollGlow = Math.min(absVel * 0.01, 1.2);

        const dynamicOpacity = isScrolling
          ? Math.min(1, star.baseOpacity + scrollGlow * star.speedMultiplier)
          : star.twinkleOpacity; // idle twinkle

        // Fade OFF after scrolling stops
        const finalOpacity = isScrolling
          ? dynamicOpacity
          : star.twinkleOpacity;

        return (
          <div
            key={star.id}
            className="absolute rounded-full transition-opacity duration-500"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${baseSize.width}px`,
              height: `${stretchedHeight}px`,
              opacity: finalOpacity,
              background: `linear-gradient(${stretchDirection > 0 ? '180deg' : '0deg'}, 
                hsl(210 100% 80%) 0%, 
                hsl(210 100% 80% / 0.6) 30%,
                hsl(210 100% 80% / 0.1) 100%)`,
              boxShadow: stretch < 2 ? getStarGlow(star.size) : 'none',
              borderRadius:
                stretchAmount > 2 
                  ? '50% 50% 50% 50% / 15% 15% 85% 85%' 
                  : '50%',
              transform: `translateY(${stretchDirection > 0 ? 0 : -stretchAmount}px)`,
              transition: `
                opacity 0.5s ease,
                height 0.12s ease-out,
                transform 0.12s ease-out
              `,
            }}
          />
        );
      })}
    </div>
  );
};
