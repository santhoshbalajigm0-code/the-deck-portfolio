import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, Activity } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const HobbiesDeck: React.FC = () => {
  const { hobbies } = PORTFOLIO_DATA;

  const getHobbyIcon = (icon: string) => {
    switch (icon) {
      case 'Trophy': return <Trophy className="w-8 h-8 text-blue-500" />;
      case 'Flame': return <Flame className="w-8 h-8 text-rose-500" />;
      case 'Zap': return <Zap className="w-8 h-8 text-amber-500" />;
      default: return <Activity className="w-8 h-8 text-emerald-500" />;
    }
  };

  return (
    <section id="hobbies" className="min-h-[75vh] flex flex-col items-center justify-center py-16 px-4 relative">
      {/* Background Atmosphere: Pink + Teal Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-pink-400">♥</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            8♥ — PERSONAL HAND & HOBBIES
          </h2>
          <span className="font-poker text-2xl text-pink-400">♥</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-8 text-center">
          Athletic Pursuits & Active Team Sports
        </p>

        {/* 3 Playful Mini Playing Cards (Standardized Identical Heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="h-[380px] w-full"
              data-cursor="SPORT ♥"
            >
              <PlayingCard
                rank={hobby.rank}
                suit={hobby.suit as '♠' | '♥' | '♦' | '♣'}
                variant="ivory"
                accentTheme="amethyst"
                className="w-full h-full shadow-lg hover:-translate-y-2 transition-transform"
                tiltIntensity={14}
              >
                <div className="flex-1 flex flex-col justify-between py-1 text-center text-slate-900 h-full">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-800">
                    SPORT CARD
                  </span>

                  {/* Icon & Name */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-900/10 shadow-sm flex items-center justify-center mb-2">
                      {getHobbyIcon(hobby.icon)}
                    </div>
                    <h4 className="font-serif text-xl font-black text-slate-950">
                      {hobby.name}
                    </h4>
                  </div>

                  {/* Note */}
                  <p className="text-xs text-slate-600 px-2 leading-relaxed">
                    {hobby.note}
                  </p>

                  <div className="pt-2 border-t border-amber-900/10 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>ATHLETICS</span>
                    <span className="font-bold text-slate-800">{hobby.rank}{hobby.suit}</span>
                  </div>
                </div>
              </PlayingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
