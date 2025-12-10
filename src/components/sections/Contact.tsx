import { Mail, Github, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <div
      className="
        w-1/2 mx-auto
        py-8 px-6 
        flex flex-col md:flex-row 
        items-center justify-between 
        gap-6 md:gap-10
        animate-fade-in-up
      "
    >
      {/* Left Side */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-light tracking-[0.1em] text-foreground">
          Let's Connect.
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          And build something amazing together.
        </p>
      </div>

      {/* Middle Contact Links */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">

        <a
          href="mailto:bijlanikaii@gmail.com"
          className="
            flex items-center gap-2 
            text-muted-foreground 
            hover:text-foreground 
            transition-colors
          "
        >
          <Mail className="w-5 h-5" />
          <span className="text-sm">bijlanikaii@gmail.com</span>
        </a>

        <a
          href="https://github.com/KaiiB"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 
            text-muted-foreground 
            hover:text-foreground 
            transition-colors
          "
        >
          <Github className="w-5 h-5" />
          <span className="text-sm">GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/kaii-bijlani/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 
            text-muted-foreground 
            hover:text-foreground 
            transition-colors
          "
        >
          <Linkedin className="w-5 h-5" />
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>

      {/* Right Side CTA Button */}
      <a
        href="mailto:bijlanikaii@gmail.com"
        className="
          bg-accent text-accent-foreground 
          px-5 py-2 rounded-md 
          font-medium
          hover:bg-accent/80 
          transition-colors
          text-sm
        "
      >
        Send a Message
      </a>
    </div>
  );
};
