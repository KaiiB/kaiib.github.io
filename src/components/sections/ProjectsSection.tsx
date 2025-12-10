import { ScrollArrow } from '../ScrollArrow';
import { ExternalLink, Github } from 'lucide-react';
import { RecentProjectBookmark } from '../RecentProjectBookmark.tsx';

interface Project {
  bookmark: boolean;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    bookmark: true,
    title: 'ML Under-the-Hood',
    description:
      'An interactive educational platform that visualizes scikit-learn algorithms step-by-step—bringing matrix operations, decision boundaries, and optimization processes to life.',
    tags: ['React', 'TypeScript', 'Machine Learning', 'Python', 'FastAPI', 'Vite'],
    link: 'https://ml-under-the-hood-site.vercel.app/',
    github: 'https://github.com/KaiiB/ml-under-the-hood-site',
  },
  {
    bookmark: false,
    title: 'Handwriting to LaTeX Conversion Program',
    description: 'Developing a model to embed handwritten mathematical expressions and formal LaTeX into a shared latent space for accurate conversion.',
    tags: ['Linear Algebra', 'Computer Vision', 'Deep Learning', 'PyTorch'],
    github: 'https://github.com/kaiib',
  },
  {
    bookmark: false,
    title: 'Keys of Parkinson\'s',
    description: 'Is it possible to detect Parkinson\'s Disease through typing patterns? We developed a web application that collects typing data and does a thorough multi-stage analysis on potential indicators of Parkinson\'s.',
    tags: ['React', 'TypeScript', 'D3.js', 'MongoDB', 'Machine Learning'],
    link: 'https://k1mittal.github.io/Keys-of-Parkinsons/',
    github: 'https://github.com/k1mittal/Keys-of-Parkinsons.git'
  },
  {
    bookmark: false,
    title: 'Multimodal Audio Classification',
    description: 'Simulated a standard music recommendation system and genre classification using 1). RNN-CNN and 2). LSTM as our model architecture of choice. \
    Utilized Mel Spectrograms and fourier transforms to represent audio signal in a feature space, achieving 80% accuracy.',
    tags: ['LSTM', 'CNN', 'Signal Processing', 'TensorFlow', 'Deep Learning'],
    github: 'https://github.com/KaiiB/MusicGenreClassification.git'
  }
];


export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-container">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-foreground mb-12 text-center">
          PROJECTS
        </h2>


        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="content-card group hover:border-muted-foreground/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-serif tracking-wide text-foreground mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Visit project"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {project.bookmark && <RecentProjectBookmark />}
  
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <ScrollArrow targetId="blog" />
    </section>
  );
};
