import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

export const EducationCards: React.FC = () => {
  const { education } = PORTFOLIO_DATA;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="education" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Atmosphere Gradients: Blue + Gold */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-blue-400">♠</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            10♠ — ACADEMIC HAND
          </h2>
          <span className="font-poker text-2xl text-blue-400">♠</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-10 text-center">
          Bishop Heber College, Tiruchirappalli • Two-Card Academic Spread
        </p>

        {/* 2-Card Poker Hand Spread with Equal Ratio Proportions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-4xl relative">
          {education.map((edu, idx) => {
            const isFirst = idx === 0;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={edu.degree}
                onMouseEnter={() => {
                  cardAudio.playGlide();
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  rotate: isFirst ? (isHovered ? -4 : -2) : (isHovered ? 4 : 2),
                  x: isFirst ? (isHovered ? -10 : 0) : (isHovered ? 10 : 0),
                  y: isHovered ? -12 : 0,
                  scale: isHovered ? 1.025 : 1,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-full md:w-[390px] h-[520px]"
                data-cursor="EDUCATION ♠"
              >
                <PlayingCard
                  rank={edu.rank}
                  suit={edu.suit}
                  variant="ivory"
                  accentTheme={isFirst ? 'royal' : 'gold'}
                  className="w-full h-full shadow-2xl"
                  tiltIntensity={10}
                  badge={`CGPA: ${edu.cgpa}`}
                >
                  <div className="flex-1 flex flex-col justify-between py-1 text-slate-900 h-full">
                    {/* Header */}
                    <div className="text-center pt-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-mono text-[10px] font-bold uppercase mb-1.5 shadow-xs">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                        <span>{edu.period}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-black text-slate-950 leading-tight">
                        {edu.degree.split('(')[0]}
                      </h3>
                      <p className="font-mono text-xs text-blue-800 font-bold mt-1">
                        {edu.field}
                      </p>
                    </div>

                    {/* Institution & CGPA Highlight Box with 7.99 for MCA */}
                    <div className="my-auto p-4 rounded-xl bg-gradient-to-b from-amber-50 to-amber-100/70 border border-amber-900/15 text-center shadow-inner">
                      <span className="font-serif text-sm font-bold text-slate-900 block mb-1.5">
                        {edu.institution}
                      </span>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-400/30 border border-amber-600/40 text-slate-950 font-mono text-xs font-black shadow-xs">
                        <Award className="w-4 h-4 text-amber-700" />
                        <span>Cumulative CGPA: {edu.cgpa} / 10.0</span>
                      </div>
                    </div>

                    {/* Academic Highlights */}
                    <div className="space-y-1.5 pt-2.5 border-t border-amber-900/15">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        Curriculum Scope:
                      </span>
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-amber-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>BISHOP HEBER COLLEGE</span>
                      <span className="font-bold text-slate-800">{edu.rank}♠</span>
                    </div>
                  </div>
                </PlayingCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
