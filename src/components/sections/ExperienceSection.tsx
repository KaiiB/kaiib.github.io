import { ScrollArrow } from '../ScrollArrow';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Code, Award, Building2} from 'lucide-react';

interface TimelineItem {
  id: number;
  type: 'work' | 'education' | 'project' | 'award' | "organization";
  title: string;
  organization: string;
  date: string;
  description: string;
  skills?: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'education',
    title: 'B.S. Computer Science, B.S. Mathematics',
    organization: 'University of California, San Diego',
    date: '2023 - June 2027',
    description: 'GPA: 3.87/4.00. Courses include DSA/Advanced Algorithms, RDBMS, Distributed & Scalable Systems, Probabilistic ML, Linear Algebra, Discrete Math.',
    skills: ['Python', 'Java', 'C++', 'SQL', 'PyTorch', 'TensorFlow'],
  },
  {
    id: 2,
    type: 'work',
    title: 'Software Engineer Intern - OTA Operations',
    organization: 'Rivian & Volkswagen Technologies',
    date: 'Jun 2025 - Sep 2025',
    description: 'Developed R1 failure agents with Databricks/Spark, parsing Kinesis streamed JSON logs. Used BERT/self-tuned embedders for high-dimensional ECU data clustering.',
    skills: ['Databricks', 'Spark', 'BERT', 'MLFlow', 'Docker'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Computer Vision Research Assistant',
    organization: 'Talmo Lab - Salk Institute',
    date: 'Feb 2025 - Present',
    description: 'Optimizing 3D pose estimation with SLEAP using PyTorch. Applied Kalman filtering, 3D CNNs, graph NNs, and PAFs for multi-animal segmentation.',
    skills: ['PyTorch', 'Docker', 'Kubernetes', 'Computer Vision'],
  },
   {
    id: 4,
    type: 'work',
    title: 'Teaching Assistant',
    organization: 'Halicioglu Data Science Institute',
    date: 'January 2024 - Present',
    description: 'Instructional Assistant for Theoretical Foundations, Data Sturctures, and Advanced Algorithms of Data Science. Algorithms include topological sort, \
    Djikstras, Bellman-Ford, Prims, Kruskals, etc.',
    skills: ['TensorFlow', 'AWS SageMaker', 'React', 'Node.js', 'MongoDB'],
  },
  {
    id: 5,
    type: 'organization',
    title: 'Director of Projects & Fullstack Developer',
    organization: 'Data Science Student Society',
    date: 'May 2024 - Present',
    description: 'Built collaborative filtering and deep learning models for Amazon. Developed Tesla semantic segmentation with UNet and OpenCV. Help maintain DS3 external and internal website in a school-hosted Virtual Machine, using Node.js.',
    skills: ['TensorFlow', 'AWS SageMaker', 'React', 'Node.js', 'MongoDB'],
  },
  {
    id: 5,
    type: 'organization',
    title: 'Founding Engineer',
    organization: 'CarPro-S',
    date: 'Mar 2024 - Jun 2024',
    description: 'Built AI-powered driving kit with RPI, camera, and CV model to detect unsafe driving. Optimized facial landmark detection with TensorFlow.',
    skills: ['TensorFlow', 'OpenCV', 'Flask', 'Raspberry Pi', 'Pytest'],
  },
    {
    id: 6,
    type: 'work',
    title: 'Machine Learning Researcher',
    organization: 'Data Science Alliance & UCSD HDSI',
    date: 'Jul 2024 - Feb 2025',
    description: 'Trained LSTM and Transformer models with PyTorch. Built ETL pipelines on 100+ GB data using PySpark and SQL with 85%+ accuracy.',
    skills: ['PyTorch', 'PySpark', 'AWS EC2', 'MLflow', 'Jenkins'],
  },
    {
    id: 7,
    type: 'work',
    title: 'Software Engineering Intern',
    organization: 'Lavner Inc.',
    date: 'Jun 2024 - Sep 2024',
    description: 'Managed MySQL databases with Redis caching achieving sub-100ms access times. Built backend solutions with Python, Flask, and Twilio APIs.',
    skills: ['Python', 'Flask', 'MySQL', 'Redis', 'AWS EC2'],
  },
  {
    id: 8,
    type: 'project',
    title: 'ML Under-the-Hood',
    organization: 'DS3 x SUMS @ UCSD',
    date: 'Oct 2025 - Present',
    description: 'An interactive educational platform that visualizes scikit-learn algorithms step-by-step-bringing matrix operations, decision boundaries, and optimization processes to life.',
    skills: ['FastAPI', 'Python', 'React', 'Render', 'TypeScript', 'Vite'],
  },
  {
    id: 8,
    type: 'project',
    title: 'Handwriting to LaTeX Conversion',
    organization: 'Personal',
    date: 'June 2025 - Present',
    description: 'Developing a program to convert handwriting images into LaTeX using Visual Transformer architecture with positional embeddings.',
    skills: ['Django', 'PyTorch', 'Hugging Face', 'Transformers'],
  },
  {
    id: 9,
    type: 'project',
    title: 'Multi-modal Audio Classification',
    organization: 'Personal',
    date: 'Oct 2023 - Jan 2024',
    description: 'Built music classification with RNN-CNN joint architecture and double-layered LSTM using Mel Spectrograms, achieving 80% accuracy.',
    skills: ['PyTorch', 'Torchaudio', 'Signal Processing'],
  },
  {
    id: 10,
    type: 'project',
    title: 'Facial Recognition UI',
    organization: 'Personal',
    date: 'Jun 2023 - Aug 2023',
    description: 'Applied computer vision techniques for facial recognition pipeline. Built demo UI hosted on Apache with Flask and AWS SageMaker.',
    skills: ['TensorFlow', 'Flask', 'MongoDB', 'React', 'AWS'],
  },
  {
    id: 11,
    type: 'award',
    title: 'Academic Honors & Achievements',
    organization: 'Various',
    date: '2023 - Present',
    description: '3x AIME Qualifier, Teaching Assistant (DSA), UCSD Undergraduate Research Scholar, National Merit Scholar, Published Author.',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'work': return Briefcase;
    case 'education': return GraduationCap;
    case 'project': return Code;
    case 'award': return Award;
    case 'organization': return Building2;
    default: return Briefcase;
  }
};

export const ExperienceSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="experience" className="section-container">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] text-foreground mb-12 text-center">
          EXPERIENCE
        </h2>

        <div className="relative">
          {/* Scroll buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Scroll left"
            >
              ←
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Scroll right"
            >
              →
            </button>
          )}

          {/* Timeline container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 min-w-max">
              {/* Timeline line */}
              <div className="absolute top-[60px] left-12 right-12 h-0.5 bg-border" />
              
              {timelineData.map((item, index) => {
                const IconComponent = getIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="relative flex-shrink-0 w-[320px]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline dot and icon */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary border-2 border-accent flex items-center justify-center mb-2">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-xs text-muted-foreground tracking-wider uppercase">
                        {item.date}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="content-card h-full hover:border-muted-foreground/30 transition-all duration-300">
                      <span className="text-xs text-accent uppercase tracking-wider mb-2 block">
                        {item.type}
                      </span>
                      <h3 className="text-lg font-serif text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-m font-serif text-foreground mb-1">
                        {item.organization}
                      </p>
                      <p className="text-m font-serif text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      {item.skills && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map(skill => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ScrollArrow targetId="projects" />
    </section>
  );
};
