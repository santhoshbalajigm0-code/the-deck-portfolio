import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, ArrowDown } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

interface HeroCardProps {
  onExploreDeck: () => void;
  onViewProjects: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({ onExploreDeck, onViewProjects }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-16 overflow-hidden"
    >
      {/* Background Ambience & Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl md:max-w-2xl relative"
      >
        {/* Oversized K♠ King of Spades Card */}
        <PlayingCard
          rank="K"
          suit="♠"
          variant="ivory"
          accentTheme="gold"
          className="w-full h-auto min-h-[580px] md:min-h-[620px]"
          tiltIntensity={10}
          dataCursor="KING ♠"
        >
          <div className="flex-1 flex flex-col justify-between py-2 text-center">
            {/* Top Ornamental Header */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-[1px] w-6 bg-amber-700/40" />
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-amber-800 uppercase">
                  THE ROYAL DEVELOPER CARD
                </span>
                <span className="h-[1px] w-6 bg-amber-700/40" />
              </div>
              <div className="text-2xl md:text-3xl text-slate-800 font-serif font-black">
                ♠ KING OF SPADES ♠
              </div>
            </div>

            {/* Center Crown Emblem & Identity */}
            <div className="my-4 flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-600/40 bg-gradient-to-br from-amber-100 to-amber-200/50 flex flex-col items-center justify-center shadow-inner relative mb-3">
                <span className="font-poker text-3xl md:text-4xl text-slate-950 font-black">♠</span>
                <span className="text-[9px] font-mono tracking-widest text-amber-900 font-bold uppercase">MASTER</span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight text-slate-950 mb-1">
                {profile.name}
              </h1>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 font-mono text-xs md:text-sm font-bold tracking-wider mb-3">
                <span>MCA GRADUATE</span>
                <span>•</span>
                <span>SOFTWARE DEVELOPER</span>
              </div>

              <p className="text-xs md:text-sm text-slate-700 font-medium max-w-md mx-auto leading-relaxed mb-4">
                Python • Java • SQL • Web Technologies
              </p>

              {/* Bio snippet directly from CV */}
              <p className="text-[11px] md:text-xs text-slate-600 italic max-w-sm mx-auto leading-relaxed">
                "{profile.bio}"
              </p>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  cardAudio.playDeal();
                  onExploreDeck();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-serif text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 border border-amber-500/60 shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                data-cursor="DEAL"
              >
                <Sparkles className="w-4 h-4" />
                <span>DRAW MY DECK</span>
              </button>

              <button
                onClick={() => {
                  cardAudio.playGlide();
                  onViewProjects();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-serif text-sm font-bold text-slate-900 bg-white/80 hover:bg-white border border-slate-300 hover:border-amber-500 shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
                data-cursor="VIEW"
              >
                <Eye className="w-4 h-4 text-amber-700" />
                <span>VIEW PROJECTS</span>
              </button>
            </div>
          </div>
        </PlayingCard>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="mt-8 flex flex-col items-center gap-1 text-slate-400 text-xs font-mono"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll For Next Card</span>
        <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
      </motion.div>
    </section>
  );
};
