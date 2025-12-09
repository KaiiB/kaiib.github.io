import { ScrollArrow } from '../ScrollArrow';

export const HeroSection = () => {
  return (
    <section id="hero" className="section-container">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-foreground opacity-0 animate-fade-in-up flex items-center">
          <span>KAII</span>
          <span className="cursor-blink ml-1 font-thin">|</span>
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light tracking-widest opacity-0 animate-fade-in-up animation-delay-400">
          DEVELOPER • DESIGNER • CREATOR
        </p>
      </div>
      <ScrollArrow targetId="about" />
    </section>
  );
};
