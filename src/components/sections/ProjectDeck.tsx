import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Layers, Shield, Anchor, Globe, CheckCircle2, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

export const ProjectDeck: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [isStackMode, setIsStackMode] = useState(false);
  const [currentStackIndex, setCurrentStackIndex] = useState(0);

  const toggleFlip = (id: string) => {
    cardAudio.playFlip();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getProjectIcon = (rank: string) => {
    switch (rank) {
      case 'A': return <Shield className="w-9 h-9 text-rose-500" />;
      case 'K': return <Anchor className="w-9 h-9 text-emerald-500" />;
      case 'J': return <Globe className="w-9 h-9 text-blue-500" />;
      default: return <Sparkles className="w-9 h-9 text-amber-500" />;
    }
  };

  const handleNextInStack = () => {
    cardAudio.playDeal();
    setCurrentStackIndex(prev => prev + 1);
  };

  const handleResetStack = () => {
    cardAudio.playShuffle();
    setCurrentStackIndex(0);
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Atmosphere: Ruby Red + Amber Orange */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-rose-500">♦</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            Q♦ — PROJECT HAND
          </h2>
          <span className="font-poker text-2xl text-rose-500">♦</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-6 text-center">
          Verified Academic & Research Projects • Click any card for 3D Flip
        </p>

        {/* Mode Toggle: Grid View vs Interactive Deal Stack */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => {
              cardAudio.playGlide();
              setIsStackMode(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              !isStackMode
                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                : 'bg-navy-900 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            <span>HAND VIEW (3 CARDS)</span>
          </button>

          <button
            onClick={() => {
              cardAudio.playShuffle();
              setIsStackMode(true);
              setCurrentStackIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isStackMode
                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                : 'bg-navy-900 text-slate-400 border border-slate-700 hover:text-white'
            }`}
            data-cursor="DEAL"
          >
            <Layers className="w-4 h-4" />
            <span>DEAL PROJECT STACK</span>
          </button>
        </div>

        {/* VIEW 1: Standard 3-Card Poker Hand (Standardized Identical Heights) */}
        {!isStackMode ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {projects.map((proj, idx) => {
              const isFlipped = !!flippedCards[proj.id];

              return (
                <div key={proj.id} className="h-[540px] w-full">
                  <PlayingCard
                    rank={proj.rank}
                    suit={proj.suit}
                    variant="ivory"
                    accentTheme={proj.colorTheme}
                    isFlipped={isFlipped}
                    className="w-full h-full shadow-2xl"
                    tiltIntensity={12}
                    dataCursor="FLIP"
                    onClick={() => toggleFlip(proj.id)}
                    badge={proj.period}
                    backContent={
                      <div className="flex-1 flex flex-col justify-between text-slate-900 h-full">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-amber-900/20 mb-2.5">
                            <span className="text-[10px] font-mono uppercase font-bold text-amber-900">ARCHITECTURAL DETAILS</span>
                            <span className="text-[10px] font-mono text-slate-500 font-bold">{proj.period}</span>
                          </div>

                          <h4 className="font-serif text-lg font-black text-slate-950 mb-1.5 leading-tight">
                            {proj.title}
                          </h4>

                          <p className="text-xs text-slate-700 leading-relaxed mb-3">
                            {proj.description}
                          </p>

                          <div className="space-y-1.5 mb-3">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 block">
                              Key Highlights:
                            </span>
                            {proj.highlights.map((hl, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-snug">
                                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-amber-900/15 flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(proj.id);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-slate-900 font-mono text-xs font-bold flex items-center gap-1.5 border border-amber-800/20 cursor-pointer"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Flip to Front</span>
                          </button>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">CARD #{idx + 1}</span>
                        </div>
                      </div>
                    }
                  >
                    {/* Front Face Content */}
                    <div className="flex-1 flex flex-col justify-between py-1 text-slate-900 h-full">
                      {/* Top Header */}
                      <div className="text-center pt-1">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-900 uppercase">
                          PROJECT 0{idx + 1}
                        </span>
                        <h3 className="font-serif text-xl font-black text-slate-950 mt-0.5 leading-tight">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-600 font-semibold mt-1">
                          {proj.subtitle}
                        </p>
                      </div>

                      {/* Visual Center Emblem */}
                      <div className="my-auto flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/50 border border-amber-900/10 shadow-inner">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-2">
                          {getProjectIcon(proj.rank)}
                        </div>
                        <span className="font-serif text-xs font-bold text-slate-800">
                          {proj.techStack[0]} • {proj.techStack[1]}
                        </span>
                      </div>

                      {/* Tech Stack Chips & Flip Prompt */}
                      <div>
                        <div className="flex flex-wrap gap-1 justify-center mb-3">
                          {proj.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-200/60 text-slate-900 border border-amber-800/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-rose-600 pt-2 border-t border-amber-900/15">
                          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                          <span>Click Card to Flip 3D</span>
                        </div>
                      </div>
                    </div>
                  </PlayingCard>
                </div>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: Interactive Deal Stack Mode */
          <div className="w-full max-w-md h-[540px] relative flex flex-col items-center justify-center">
            {currentStackIndex < projects.length ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {projects.slice(currentStackIndex).map((proj, sIdx) => {
                  const isTop = sIdx === 0;

                  return (
                    <motion.div
                      key={proj.id}
                      drag={isTop ? 'x' : false}
                      dragConstraints={{ left: -100, right: 100 }}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.x) > 100) {
                          handleNextInStack();
                        }
                      }}
                      initial={{ scale: 0.9, y: sIdx * 12, opacity: 0 }}
                      animate={{
                        scale: 1 - sIdx * 0.05,
                        y: sIdx * 10,
                        opacity: 1 - sIdx * 0.2,
                        rotate: (sIdx % 2 === 0 ? 1 : -1) * sIdx * 3,
                      }}
                      className="absolute inset-0 h-full w-full"
                      style={{ zIndex: 10 - sIdx }}
                    >
                      <PlayingCard
                        rank={proj.rank}
                        suit={proj.suit}
                        variant="ivory"
                        accentTheme={proj.colorTheme}
                        className="w-full h-full shadow-2xl"
                        tiltIntensity={isTop ? 10 : 0}
                        dataCursor="SWIPE"
                      >
                        <div className="flex-1 flex flex-col justify-between py-2 text-slate-900 h-full">
                          <div className="text-center pt-2">
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-900 uppercase">
                              CARD {currentStackIndex + sIdx + 1} OF {projects.length}
                            </span>
                            <h3 className="font-serif text-xl font-black text-slate-950 mt-1">
                              {proj.title}
                            </h3>
                            <p className="text-[11px] font-mono text-slate-600 font-semibold mt-0.5">
                              {proj.subtitle}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-amber-50 border border-amber-900/10 my-2">
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {proj.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1 justify-center mb-3">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200 text-slate-900">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {isTop && (
                            <button
                              onClick={handleNextInStack}
                              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-serif text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                            >
                              <span>DEAL NEXT CARD</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </PlayingCard>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* All cards dealt screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-8 rounded-2xl bg-navy-900/90 border border-rose-500/40 text-center shadow-2xl"
              >
                <span className="font-poker text-4xl text-rose-500 block mb-2">♦</span>
                <h3 className="font-serif text-2xl font-black text-white mb-2">
                  THAT'S THE HAND.
                </h3>
                <p className="text-xs text-slate-300 font-mono mb-6">
                  You have reviewed all current project cards.
                </p>
                <button
                  onClick={handleResetStack}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-navy-950 font-serif font-bold text-sm flex items-center justify-center gap-2 mx-auto shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>BACK TO DECK</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
