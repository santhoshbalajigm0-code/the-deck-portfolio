import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, FastForward } from 'lucide-react';
import { cardAudio } from '../../utils/soundEffects';

interface ShuffleIntroProps {
  onComplete: () => void;
}

export const ShuffleIntro: React.FC<ShuffleIntroProps> = ({ onComplete }) => {
  const [shufflePhase, setShufflePhase] = useState<'idle' | 'lifting' | 'shuffling' | 'fanning' | 'revealing'>('idle');

  const startDrawSequence = () => {
    cardAudio.playShuffle();
    setShufflePhase('lifting');

    setTimeout(() => {
      setShufflePhase('shuffling');
    }, 400);

    setTimeout(() => {
      cardAudio.playGlide();
      setShufflePhase('fanning');
    }, 1100);

    setTimeout(() => {
      cardAudio.playFlip();
      setShufflePhase('revealing');
    }, 1800);

    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  const skipIntro = () => {
    cardAudio.playDeal();
    onComplete();
  };

  const deckCards = [
    { id: 1, rot: -8, x: -16, y: 4, rank: 'A', suit: '♠' },
    { id: 2, rot: 5, x: 12, y: -6, rank: 'K', suit: '♣' },
    { id: 3, rot: -4, x: -8, y: 2, rank: 'Q', suit: '♦' },
    { id: 4, rot: 6, x: 10, y: -2, rank: 'J', suit: '♥' },
    { id: 5, rot: 0, x: 0, y: 0, rank: 'K', suit: '♠' }, // Top Card
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 bg-[#040712] flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -bottom-20" />

      {/* Floating Subtle Suit Symbols in Background */}
      <div className="absolute inset-0 flex items-center justify-between px-12 opacity-5 pointer-events-none text-7xl font-poker select-none">
        <span>♠</span>
        <span>♥</span>
        <span>♦</span>
        <span>♣</span>
      </div>

      {/* Skip Button Top Right */}
      <button
        onClick={skipIntro}
        className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-full border border-slate-700/60 hover:border-amber-400/40 bg-navy-900/50 backdrop-blur-sm group z-50"
        data-cursor="SKIP"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Center Intro Card Stack */}
      <div className="relative w-64 h-96 md:w-72 md:h-[420px] flex items-center justify-center perspective-1500 mb-8">
        <AnimatePresence>
          {deckCards.map((card, index) => {
            const isTopCard = index === deckCards.length - 1;

            let animProps = {
              x: card.x,
              y: card.y,
              rotate: card.rot,
              rotateY: 0,
              scale: 1,
              opacity: 1,
            };

            if (shufflePhase === 'lifting') {
              animProps = {
                x: card.x * 1.5,
                y: card.y - 25,
                rotate: card.rot * 1.2,
                rotateY: 0,
                scale: 1.05,
                opacity: 1,
              };
            } else if (shufflePhase === 'shuffling') {
              animProps = {
                x: (index % 2 === 0 ? -1 : 1) * (40 + index * 15),
                y: (index - 2) * 8,
                rotate: (index - 2) * 9,
                rotateY: (index % 2 === 0 ? 15 : -15),
                scale: 1.02,
                opacity: 1,
              };
            } else if (shufflePhase === 'fanning') {
              animProps = {
                x: (index - 2) * 60,
                y: Math.abs(index - 2) * 12,
                rotate: (index - 2) * 14,
                rotateY: 0,
                scale: 1,
                opacity: 1,
              };
            } else if (shufflePhase === 'revealing') {
              if (isTopCard) {
                animProps = {
                  x: 0,
                  y: -30,
                  rotate: 0,
                  rotateY: 0,
                  scale: 1.2,
                  opacity: 1,
                };
              } else {
                animProps = {
                  x: (index - 2) * 120,
                  y: 100,
                  rotate: (index - 2) * 20,
                  rotateY: 0,
                  scale: 0.8,
                  opacity: 0,
                };
              }
            }

            return (
              <motion.div
                key={card.id}
                animate={animProps}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 18,
                }}
                className="absolute inset-0 rounded-2xl shadow-2xl preserve-3d"
                style={{ zIndex: index }}
              >
                {/* Authentic Luxury Card Back with Foil Stamping */}
                <div className="w-full h-full rounded-2xl overflow-hidden card-back-pattern border-2 border-amber-500/50 p-3 flex flex-col justify-between shadow-2xl relative">
                  <div className="absolute inset-1.5 border border-amber-400/40 rounded-xl pointer-events-none" />
                  <div className="absolute inset-3 border border-dashed border-amber-400/25 rounded-lg pointer-events-none" />

                  {/* Corner Ornaments */}
                  <div className="flex justify-between items-center text-amber-400/70 font-poker text-sm px-1">
                    <span>♠</span>
                    <span>♦</span>
                  </div>

                  {/* Center Emblem */}
                  <div className="flex flex-col items-center justify-center my-auto relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-400/50 flex flex-col items-center justify-center bg-navy-950/90 shadow-inner relative">
                      <div className="absolute inset-1 rounded-full border border-amber-400/25 animate-spin" style={{ animationDuration: '30s' }} />
                      <span className="font-poker text-2xl font-black gold-foil-text tracking-widest">SB</span>
                      <span className="text-[8px] tracking-[0.25em] text-amber-300/70 uppercase font-mono">The Deck</span>
                    </div>
                  </div>

                  {/* Bottom Corner Ornaments */}
                  <div className="flex justify-between items-center text-amber-400/70 font-poker text-sm px-1">
                    <span className="rotate-180">♣</span>
                    <span className="rotate-180">♥</span>
                  </div>

                  {/* Glossy Sheen sweeping through */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Typography & Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center z-10 max-w-lg px-4"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-8 bg-amber-500/50" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-300/80 font-bold">
            THE DEVELOPER'S DECK
          </span>
          <span className="h-[1px] w-8 bg-amber-500/50" />
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
          SANTHOSH BALAJI G
        </h1>

        <p className="font-mono text-xs md:text-sm text-slate-300 tracking-wider mb-6">
          MCA GRADUATE <span className="text-amber-400">♦</span> SOFTWARE DEVELOPER
        </p>

        <p className="text-xs text-slate-400 italic mb-8 max-w-sm mx-auto">
          "Every card tells a part of my story."
        </p>

        {/* DRAW MY CARD Interactive Button */}
        <motion.button
          onClick={startDrawSequence}
          disabled={shufflePhase !== 'idle'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-serif text-base font-bold text-navy-950 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] border border-amber-200 transition-all cursor-pointer group disabled:opacity-75"
          data-cursor="DRAW"
        >
          <Sparkles className="w-5 h-5 text-navy-950 group-hover:rotate-12 transition-transform" />
          <span className="tracking-widest uppercase">
            {shufflePhase === 'idle' ? 'DRAW MY CARD' : 'SHUFFLING THE DECK...'}
          </span>
          <Play className="w-4 h-4 fill-navy-950 text-navy-950" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
