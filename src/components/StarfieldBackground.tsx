import { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  baseY: number;
  size: 'small' | 'medium' | 'large';
  speedMultiplier: number;
  opacity: number;
}

export const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const animationFrameId = useRef<number>();
  const [stars, setStars] = useState<Star[]>([]);
  const [stretch, setStretch] = useState(0);

  // Generate stars on mount
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
          opacity: 0.2 + Math.random() * 0.6,
        });
      }
      
      starsRef.current = newStars;
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Handle scroll with parallax and vertical stretch
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;
    scrollVelocity.current = delta;
    lastScrollY.current = currentScrollY;

    // Calculate stretch based on scroll velocity (vertical stretching instead of blur)
    const absVelocity = Math.abs(delta);
    const newStretch = Math.min(absVelocity * 0.8, 30); // Max 30px stretch
    setStretch(newStretch);

    // Update star positions based on scroll
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = pageHeight > 0 ? currentScrollY / pageHeight : 0;

    const updatedStars = starsRef.current.map(star => ({
      ...star,
      y: (star.baseY + scrollProgress * 100 * star.speedMultiplier) % 100,
    }));

    starsRef.current = updatedStars;
    setStars([...updatedStars]);

    // Decay stretch
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      setTimeout(() => setStretch(prev => prev * 0.85), 30);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll]);

  const getStarSize = (size: string) => {
    switch (size) {
      case 'small': return { width: 2, height: 2 };
      case 'medium': return { width: 4, height: 4 };
      case 'large': return { width: 6, height: 6 };
      default: return { width: 2, height: 2 };
    }
  };

  const getStarGlow = (size: string) => {
    switch (size) {
      case 'small': return 'none';
      case 'medium': return '0 0 4px 1px hsl(210 100% 80% / 0.5)';
      case 'large': return '0 0 8px 2px hsl(210 100% 80% / 0.6)';
      default: return 'none';
    }
  };

  // Direction of scroll determines stretch direction
  const stretchDirection = scrollVelocity.current >= 0 ? 1 : -1;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {stars.map(star => {
        const baseSize = getStarSize(star.size);
        // Stretch height based on scroll velocity, proportional to star speed
        const stretchAmount = stretch * star.speedMultiplier;
        const stretchedHeight = baseSize.height + stretchAmount;
        
        return (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${baseSize.width}px`,
              height: `${stretchedHeight}px`,
              opacity: star.opacity,
              background: `linear-gradient(${stretchDirection > 0 ? '180deg' : '0deg'}, 
                hsl(210 100% 80%) 0%, 
                hsl(210 100% 80% / 0.6) 30%,
                hsl(210 100% 80% / 0.1) 100%)`,
              boxShadow: stretch < 2 ? getStarGlow(star.size) : 'none',
              borderRadius: stretchAmount > 2 ? '50% 50% 50% 50% / 20% 20% 80% 80%' : '50%',
              transform: `translateY(${stretchDirection > 0 ? 0 : -stretchAmount}px)`,
              transition: 'height 0.1s ease-out, transform 0.1s ease-out',
            }}
          />
        );
      })}
    </div>
  );
};
