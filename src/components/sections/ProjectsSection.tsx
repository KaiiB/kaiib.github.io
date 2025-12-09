import { ScrollArrow } from '../ScrollArrow';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Discriminant Analysis Visualizer',
    description: 'Interactive 3D visualization of LDA and QDA algorithms for machine learning education.',
    tags: ['JavaScript', 'Plotly.js', 'Machine Learning'],
    github: 'https://github.com/kaiib',
  },
  {
    title: 'Portfolio Website',
    description: 'A minimal, dark-themed portfolio showcasing projects and blog posts.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/kaiib/portfolio',
  },
  {
    title: 'Data Visualization Projects',
    description: 'Collection of interactive data visualizations exploring various datasets.',
    tags: ['D3.js', 'Python', 'Data Analysis'],
  },
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
