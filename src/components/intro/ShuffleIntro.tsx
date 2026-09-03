import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Play, FastForward, Volume2, VolumeX } from 'lucide-react';
import { cardAudio } from '../../utils/soundEffects';

interface ShuffleIntroProps {
  onComplete: () => void;
}

export const ShuffleIntro: React.FC<ShuffleIntroProps> = ({ onComplete }) => {
  const [shufflePhase, setShufflePhase] = useState<'idle' | 'lifting' | 'shuffling' | 'fanning' | 'revealing'>('idle');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax for background elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  // Original 5-Card Deck Stack
  const deckCards = [
    { id: 1, rot: -8, x: -16, y: 4, rank: 'A', suit: '♠' },
    { id: 2, rot: 5, x: 12, y: -6, rank: 'K', suit: '♣' },
    { id: 3, rot: -4, x: -8, y: 2, rank: 'Q', suit: '♦' },
    { id: 4, rot: 6, x: 10, y: -2, rank: 'J', suit: '♥' },
    { id: 5, rot: 0, x: 0, y: 0, rank: 'K', suit: '♠' }, // Top Card
  ];

  // Floating ambient suit particles for the rich background
  const floatingSuitParticles = [
    { suit: '♠', left: '8%', top: '15%', size: 48, depth: 70, delay: 0, color: 'text-amber-400/25' },
    { suit: '♥', left: '90%', top: '20%', size: 42, depth: 50, delay: 1, color: 'text-rose-500/25' },
    { suit: '♦', left: '12%', top: '75%', size: 40, depth: 80, delay: 2, color: 'text-amber-300/25' },
    { suit: '♣', left: '86%', top: '80%', size: 46, depth: 60, delay: 1.5, color: 'text-emerald-400/25' },
    { suit: '♠', left: '25%', top: '40%', size: 30, depth: 40, delay: 0.5, color: 'text-blue-400/20' },
    { suit: '♦', left: '75%', top: '45%', size: 34, depth: 50, delay: 2.5, color: 'text-yellow-400/20' },
  ];

  // Animated star dust particles
  const starParticles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: (i % 3) + 2,
    duration: 3 + (i % 4),
    delay: (i % 5) * 0.4,
  }));

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

  const toggleMute = () => {
    const isMuted = cardAudio.toggleMute();
    setIsAudioMuted(isMuted);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 bg-[#030611] flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none"
    >
      {/* RICH BACKGROUND EFFECTS & NEBULA LIGHTING */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      {/* Center Golden Solar Core Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/20 via-yellow-600/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-cosmic-pulse" />

      {/* Sapphire & Ruby Ambient Highlights */}
      <div className="absolute top-10 left-10 w-[500px] h-[450px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[450px] bg-rose-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber-Casino Light Grid Floor */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Twinkling Golden Star Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {starParticles.map((star) => (
          <motion.div
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
            className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]"
          />
        ))}
      </div>

      {/* 3D Floating Suit Parallax Glyphs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingSuitParticles.map((item, idx) => (
          <motion.div
            key={idx}
            style={{
              left: item.left,
              top: item.top,
              fontSize: `${item.size}px`,
              x: useTransform(smoothMouseX, [-0.5, 0.5], [-item.depth * 0.45, item.depth * 0.45]),
              y: useTransform(smoothMouseY, [-0.5, 0.5], [-item.depth * 0.45, item.depth * 0.45]),
            }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
            className={`absolute font-poker ${item.color} select-none drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
          >
            {item.suit}
          </motion.div>
        ))}
      </div>

      {/* TOP RIGHT CONTROLS */}
      <div className="w-full max-w-6xl flex items-center justify-end z-30 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-navy-950/70 border border-slate-700/70 text-slate-300 hover:text-amber-300 hover:border-amber-400/60 backdrop-blur-md transition-all cursor-pointer shadow-md"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={skipIntro}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-amber-300 transition-all px-3.5 py-1.5 rounded-full border border-slate-700/70 hover:border-amber-400/60 bg-navy-950/70 backdrop-blur-md group cursor-pointer shadow-md"
            data-cursor="SKIP"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* CENTER INTRO CARD STACK (ORIGINAL GITHUB SHUFFLE ANIMATION) */}
      <div className="relative w-64 h-96 md:w-72 md:h-[420px] flex items-center justify-center perspective-1500 my-auto z-20">
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

      {/* TYPOGRAPHY & CALL TO ACTION (NO 7.99 CGPA) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center z-30 w-full max-w-3xl px-4 pb-2"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-[1px] w-8 bg-amber-500/50" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-300/80 font-bold">
            THE DEVELOPER'S DECK
          </span>
          <span className="h-[1px] w-8 bg-amber-500/50" />
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight text-white mb-2 whitespace-nowrap">
          SANTHOSH BALAJI G
        </h1>

        <p className="font-mono text-xs md:text-sm text-slate-300 tracking-wider mb-6">
          MCA GRADUATE <span className="text-amber-400">♦</span> SOFTWARE DEVELOPER
        </p>

        <p className="text-xs text-slate-400 italic mb-6 max-w-sm mx-auto">
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
          <span className="tracking-widest uppercase font-serif font-black">
            {shufflePhase === 'idle' ? 'DRAW MY CARD' : 'SHUFFLING THE DECK...'}
          </span>
          <Play className="w-4 h-4 fill-navy-950 text-navy-950" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
