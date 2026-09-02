import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

interface FinalDeckProps {
  onReshuffle: () => void;
}

export const FinalDeck: React.FC<FinalDeckProps> = ({ onReshuffle }) => {
  const { profile } = PORTFOLIO_DATA;

  const handleReshuffleClick = () => {
    cardAudio.playShuffle();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#d4af37', '#e11d48', '#2563eb', '#10b981', '#f5f0e6'],
      });
    } catch {
      // fallback
    }

    onReshuffle();
  };

  return (
    <footer className="py-24 px-4 relative flex flex-col items-center justify-center overflow-hidden border-t border-slate-800/80 bg-[#03060f]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none absolute" />

      <div className="w-full max-w-md flex flex-col items-center text-center relative z-10">
        <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-amber-400 mb-6 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DECK COMPLETED</span>
          <Sparkles className="w-3.5 h-3.5" />
        </span>

        {/* Master S♠ Tribute Card */}
        <div className="w-full h-[460px] mb-8">
          <PlayingCard
            rank="S"
            suit="♠"
            variant="ivory"
            accentTheme="gold"
            className="w-full h-full shadow-2xl"
            tiltIntensity={12}
            dataCursor="FINALE ♠"
          >
            <div className="flex-1 flex flex-col justify-between py-2 text-slate-900">
              <div className="text-center pt-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-900 uppercase">
                  MASTER SUITE CARD
                </span>
                <h3 className="font-serif text-2xl font-black text-slate-950 mt-1">
                  THANK YOU FOR VISITING
                </h3>
              </div>

              <div className="my-auto flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-900/10 shadow-inner">
                <div className="w-16 h-16 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center font-poker text-3xl mb-2 shadow-lg">
                  ♠
                </div>
                <h4 className="font-serif text-xl font-black text-slate-950">
                  {profile.name}
                </h4>
                <p className="text-xs font-mono text-slate-600 mt-0.5">
                  MCA Graduate • Software Developer
                </p>
              </div>

              <p className="text-xs text-slate-700 italic px-2">
                "Code with precision. Build with passion."
              </p>

              <div className="pt-2 border-t border-amber-900/10 flex justify-between text-[10px] font-mono text-slate-500">
                <span>THE DECK</span>
                <span className="font-bold text-slate-900">S♠ FINALE</span>
              </div>
            </div>
          </PlayingCard>
        </div>

        {/* Reshuffle Button */}
        <motion.button
          onClick={handleReshuffleClick}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="px-8 py-4 rounded-xl font-serif text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 border border-amber-500 shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] transition-all flex items-center gap-3 cursor-pointer group"
          data-cursor="RESHUFFLE"
        >
          <RefreshCw className="w-4 h-4 text-slate-950 group-hover:rotate-180 transition-transform duration-500" />
          <span className="tracking-wider uppercase">RESHUFFLE THE DECK</span>
        </motion.button>

        <p className="text-[11px] font-mono text-slate-500 mt-8 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          <span>for Santhosh Balaji G • 2026</span>
        </p>
      </div>
    </footer>
  );
};
