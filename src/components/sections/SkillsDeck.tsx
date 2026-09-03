import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layers, Server, Palette, FileCode, Cpu, ShieldCheck } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA, type Skill } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

export const SkillsDeck: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code2 className="w-8 h-8" />;
      case 'Database': return <Database className="w-8 h-8" />;
      case 'Layers': return <Layers className="w-8 h-8" />;
      case 'Server': return <Server className="w-8 h-8" />;
      case 'Cpu': return <Cpu className="w-8 h-8" />;
      case 'FileCode': return <FileCode className="w-8 h-8" />;
      case 'Palette': return <Palette className="w-8 h-8" />;
      default: return <Code2 className="w-8 h-8" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Backend': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Frontend': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Database': return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      case 'Framework': return 'bg-purple-100 text-purple-900 border-purple-300';
      default: return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    }
  };

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Atmospheres: Emerald + Cyan */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-emerald-400">♣</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            K♣ — THE TOOLKIT
          </h2>
          <span className="font-poker text-2xl text-emerald-400">♣</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-10 text-center">
          Miniature Playing Cards representing Technical Competencies • Click any card
        </p>

        {/* 9 Miniature Skill Playing Cards Grid (Enlarged Luxury Playing Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full mb-10">
          {skills.map((skill, index) => {
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                onClick={() => {
                  cardAudio.playGlide();
                  setSelectedSkill(skill);
                }}
                className="cursor-pointer h-[480px] md:h-[500px] w-full"
                data-cursor="SKILL"
              >
                <PlayingCard
                  rank={skill.rank}
                  suit={skill.suit}
                  variant="ivory"
                  accentTheme={isSelected ? 'emerald' : 'gold'}
                  className={`w-full h-full transition-all shadow-2xl ${
                    isSelected ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-navy-950 scale-103 shadow-card-glow-green' : 'hover:scale-102'
                  }`}
                  tiltIntensity={10}
                >
                  <div className="flex-1 flex flex-col items-center justify-between py-3 text-center h-full">
                    {/* Category pill */}
                    <span className={`text-xs font-mono tracking-widest uppercase px-3.5 py-1 rounded-full border shadow-xs font-bold ${getCategoryBadgeClass(skill.category)}`}>
                      {skill.category}
                    </span>

                    {/* Skill Icon, Name, Domain & Details */}
                    <div className="flex flex-col items-center my-auto py-2">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-md transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: `${skill.accentColor}18`,
                          color: skill.accentColor,
                          border: `2px solid ${skill.accentColor}40`
                        }}
                      >
                        {getIcon(skill.iconName)}
                      </div>
                      <h4 className="font-serif text-2xl md:text-3xl font-black text-slate-950 mb-1.5 tracking-tight">
                        {skill.name}
                      </h4>
                      <span className="text-sm font-mono font-bold text-slate-700 tracking-wide mb-1">
                        {skill.proficiencyLevel}
                      </span>
                      <p className="text-xs text-slate-600 font-medium max-w-[220px] line-clamp-2 mb-3">
                        {skill.description}
                      </p>

                      {/* 5-pip Playing Card Suit Rating */}
                      <div className="flex items-center gap-2 text-sm font-poker" style={{ color: skill.accentColor }}>
                        <span>{skill.suit}</span>
                        <span>{skill.suit}</span>
                        <span>{skill.suit}</span>
                        <span>{skill.suit}</span>
                        <span className="opacity-35">{skill.suit}</span>
                      </div>
                    </div>

                    {/* Bottom Card Footer Details */}
                    <div className="pt-3 border-t border-amber-900/20 w-full flex items-center justify-between px-2 text-xs font-mono text-slate-600 font-bold">
                      <span className="uppercase text-amber-900 font-black tracking-wider">{skill.category}</span>
                      <span className="tracking-widest">ROYAL #{index + 1}</span>
                    </div>
                  </div>
                </PlayingCard>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Highlight Showcase */}
        {selectedSkill && (
          <motion.div
            key={selectedSkill.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl p-5 rounded-2xl bg-gradient-to-r from-navy-900/95 via-navy-800/95 to-navy-900/95 border border-emerald-500/40 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center gap-5"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"
              style={{ backgroundColor: `${selectedSkill.accentColor}30`, border: `1px solid ${selectedSkill.accentColor}` }}
            >
              <div style={{ color: selectedSkill.accentColor }}>
                {getIcon(selectedSkill.iconName)}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="font-poker text-emerald-400 text-sm">{selectedSkill.rank}{selectedSkill.suit}</span>
                <h3 className="font-serif text-lg font-bold text-white">{selectedSkill.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedSkill.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedSkill.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Skill</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
