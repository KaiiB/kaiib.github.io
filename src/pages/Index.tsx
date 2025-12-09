import { StarfieldBackground } from '@/components/StarfieldBackground';
import { SideNavigation } from '@/components/SideNavigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { BlogSection } from '@/components/sections/BlogSection';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarfieldBackground />
      <SideNavigation />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection />
      </main>
    </div>
  );
};

export default Index;
