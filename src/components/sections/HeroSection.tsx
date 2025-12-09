import { ScrollArrow } from '../ScrollArrow';
import { useEffect, useState, useRef } from 'react';

export const HeroSection = () => {
  const firstName = "Kaii";
  const lastName = "Bijlani";

  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState(false);

  const loopRef = useRef(null);

  // Configurable speeds
  const SPEED_FIRST = 150;   // slower typing
  const SPEED_LAST = 120;     // faster typing
  const PAUSE_AFTER_TYPE = 2500; 
  const PAUSE_AFTER_HIGHLIGHT = 1500;

  const typeText = (word, speed) => {
    return new Promise<void>((resolve) => {
      let i = 0;

      const step = () => {
        setText(word.slice(0, i));
        i++;
        if (i <= word.length) {
          loopRef.current = setTimeout(step, speed);
        } else {
          resolve();
        }
      };

      step();
    });
  };

  const deleteText = () => {
    return new Promise<void>((resolve) => {
      setText("");
      resolve();
    });
  };

  const highlightText = () => {
    return new Promise<void>((resolve) => {
      setHighlight(true);
      loopRef.current = setTimeout(() => {
        setHighlight(false);
        resolve();
      }, PAUSE_AFTER_HIGHLIGHT);
    });
  };

  const pauseLoop = (duration) => {
    return new Promise<void>((resolve) => {
      loopRef.current = setTimeout(() => {
        resolve(); 
      }, duration)

    })
  }

  const animateLoop = async () => {
    while (true) {
      // First Name
      await typeText(firstName, SPEED_FIRST);
      await new Promise((res) => setTimeout(res, PAUSE_AFTER_TYPE));
      
      await highlightText();
      await deleteText();


      // Last Name
      await typeText(lastName, SPEED_LAST);
      await new Promise((res) => setTimeout(res, PAUSE_AFTER_TYPE));
      await highlightText();
      await deleteText();

    
    }
  };

  useEffect(() => {
    animateLoop();

    return () => clearTimeout(loopRef.current);
  }, []);

  return (
    <section id="hero" className="section-container">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.3em] text-foreground opacity-0 animate-fade-in-up flex items-center">
          
          <span
            id="typing-container"
            className={
              highlight
                ? "bg-white text-black px-2 rounded transition-all duration-300"
                : "transition-all duration-300"
            }
          >
            {text}
          </span>

          <span className="cursor-blink ml-1 font-thin">|</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light tracking-widest opacity-0 animate-fade-in-up animation-delay-400">
          • A curious software developer interested in the intersection of math and machine learning
        </p>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light tracking-widest opacity-0 animate-fade-in-up animation-delay-400">
          Currently double majoring in Computer Science and Mathematics at{" "} <span className="font-bold">UCSD</span> •
        </p>
      </div>

      <ScrollArrow targetId="about" />
    </section>
  );
};
