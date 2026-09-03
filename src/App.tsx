import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShuffleIntro } from './components/intro/ShuffleIntro';
import { CustomCursor } from './components/common/CustomCursor';
import { PortfolioBackground } from './components/common/PortfolioBackground';
import { CVModal } from './components/common/CVModal';
import { CardNavFan } from './components/nav/CardNavFan';
import { HeroCard } from './components/sections/HeroCard';
import { AboutCard } from './components/sections/AboutCard';
import { SkillsDeck } from './components/sections/SkillsDeck';
import { ProjectDeck } from './components/sections/ProjectDeck';
import { ExperienceStack } from './components/sections/ExperienceStack';
import { EducationCards } from './components/sections/EducationCards';
import { CertificationDeck } from './components/sections/CertificationDeck';
import { HobbiesDeck } from './components/sections/HobbiesDeck';
import { ContactCard } from './components/sections/ContactCard';
import { FinalDeck } from './components/sections/FinalDeck';

export const App: React.FC = () => {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (!introCompleted) return;

    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'hobbies', 'contact'];
    
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [introCompleted]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReshuffle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIntroCompleted(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 relative selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Portfolio Background (Nebulae, Grid, Golden Stardust & Floating Suits) */}
      <PortfolioBackground />

      {/* Opening Shuffling Intro Experience */}
      <AnimatePresence>
        {!introCompleted && (
          <ShuffleIntro onComplete={() => setIntroCompleted(true)} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Surface */}
      {introCompleted && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Interactive Card Fan Dock & Sticky Navigation */}
          <CardNavFan
            activeSection={activeSection}
            onSelectSection={(id) => scrollToSection(id)}
            onOpenCV={() => setIsCVModalOpen(true)}
          />

          {/* Portfolio Playing Card Sections */}
          <HeroCard
            onExploreDeck={() => scrollToSection('about')}
            onViewProjects={() => scrollToSection('projects')}
            onOpenCV={() => setIsCVModalOpen(true)}
          />

          <AboutCard onOpenCV={() => setIsCVModalOpen(true)} />

          <SkillsDeck />

          <ProjectDeck />

          <ExperienceStack />

          <EducationCards />

          <CertificationDeck />

          <HobbiesDeck />

          <ContactCard onOpenCV={() => setIsCVModalOpen(true)} />

          <FinalDeck onReshuffle={handleReshuffle} />
        </motion.main>
      )}

      {/* Global Curriculum Vitae (CV) Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />
    </div>
  );
};

export default App;
