import { ScrollArrow } from '../ScrollArrow';

export const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-foreground mb-12">
          ABOUT
        </h2>
        <div className="content-card">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Hi, I'm Kaii — a passionate developer with a love for creating elegant, 
            functional digital experiences. I specialize in building modern web applications 
            with clean code and thoughtful design.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            My interests span across machine learning, data visualization, and 
            creating interactive tools that make complex concepts accessible.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, 
            studying for my next challenge, or working on side projects that push 
            the boundaries of what's possible on the web.
          </p>
        </div>
      </div>
      <ScrollArrow targetId="experience" />
    </section>
  );
};
