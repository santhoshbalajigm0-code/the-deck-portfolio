import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutCard: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const infoChips = [
    'MCA', 'BCA', 'Python', 'Java', 'SQL', 'Web Development', 'Spring Boot', 'Flask'
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Atmosphere Gradients */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header Banner */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-poker text-2xl text-violet-400">♠</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            A♠ — ABOUT THE PLAYER
          </h2>
          <span className="font-poker text-2xl text-violet-400">♠</span>
        </div>

        {/* Oversized A♠ Ace Card */}
        <div className="w-full max-w-3xl">
          <PlayingCard
            rank="A"
            suit="♠"
            variant="ivory"
            accentTheme="amethyst"
            className="w-full h-auto"
            tiltIntensity={8}
            dataCursor="ABOUT ♠"
          >
            <div className="flex flex-col justify-between py-2 text-slate-900">
              {/* Card Header */}
              <div className="text-center pb-4 border-b border-amber-900/10">
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-amber-900 uppercase">
                  THE ACE OF SPADES
                </span>
                <h3 className="font-serif text-2xl md:text-4xl font-black text-slate-950 mt-1">
                  SANTHOSH BALAJI G
                </h3>
                <p className="font-mono text-xs md:text-sm text-slate-700 font-semibold mt-0.5">
                  MCA Graduate • Software Developer
                </p>
              </div>

              {/* Card Main Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
                {/* Left Portrait & Suit Monogram */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-700/20 text-center shadow-inner">
                  <div className="w-24 h-24 rounded-full border-2 border-slate-900/30 flex items-center justify-center bg-white shadow-md mb-3 relative">
                    <span className="font-poker text-5xl text-slate-950">♠</span>
                  </div>
                  <span className="font-serif text-lg font-black text-slate-950">
                    SANTHOSH BALAJI
                  </span>
                  <span className="text-[11px] font-mono text-slate-600">
                    Trichy, Tamil Nadu
                  </span>

                  {/* Animated Signature */}
                  <div className="mt-4 pt-3 border-t border-amber-900/15 w-full flex flex-col items-center">
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">PLAYER SIGNATURE</span>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="font-serif italic font-black text-2xl text-amber-900 tracking-widest cursor-default select-none mt-1"
                    >
                      ~ {profile.signature} Balaji ~
                    </motion.div>
                  </div>
                </div>

                {/* Right Bio & Core Details */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Career Objective</span>
                    </h4>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  {/* Key Info Chips */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-2">
                      Core Foundations
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {infoChips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-200/60 text-slate-900 border border-amber-800/20 shadow-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills & Communication */}
                  <div className="pt-2 border-t border-amber-900/10 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                    <div>
                      <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mb-1">Soft Skills</span>
                      <ul className="space-y-0.5">
                        {profile.softSkills.slice(0, 3).map((sk) => (
                          <li key={sk} className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>{sk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mb-1">Languages</span>
                      <p className="font-medium text-slate-800">Tamil, English</p>
                      <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mt-2 mb-0.5">Email</span>
                      <p className="font-mono text-[10px] text-slate-700 truncate">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-900/10 text-[10px] font-mono text-slate-500">
                <span>SUIT: SPADES</span>
                <span className="tracking-widest uppercase">THE DEVELOPER'S PLAYING DECK</span>
                <span>RANK: ACE</span>
              </div>
            </div>
          </PlayingCard>
        </div>
      </div>
    </section>
  );
};
