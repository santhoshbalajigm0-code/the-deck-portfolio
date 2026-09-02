import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cardAudio } from '../../utils/soundEffects';

export interface PlayingCardProps {
  rank?: string;
  suit?: '♠' | '♥' | '♦' | '♣';
  variant?: 'ivory' | 'dark' | 'back';
  accentTheme?: 'gold' | 'ruby' | 'royal' | 'emerald' | 'amethyst';
  className?: string;
  isFlipped?: boolean;
  backContent?: React.ReactNode;
  children?: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  badge?: string;
  glowOnHover?: boolean;
  tiltIntensity?: number;
  dataCursor?: string;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  rank = 'A',
  suit = '♠',
  variant = 'ivory',
  accentTheme = 'gold',
  className = '',
  isFlipped = false,
  backContent,
  children,
  interactive = true,
  onClick,
  badge,
  glowOnHover = true,
  tiltIntensity = 15,
  dataCursor = 'DRAW'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  const isRedSuit = suit === '♥' || suit === '♦';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (interactive) {
      setIsHovered(true);
      cardAudio.playGlide();
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleClick = () => {
    if (onClick) {
      cardAudio.playDeal();
      onClick();
    }
  };

  // Color theme mapping
  const getThemeGlow = () => {
    if (!glowOnHover || !isHovered) return '';
    switch (accentTheme) {
      case 'ruby': return 'shadow-card-glow-red';
      case 'royal': return 'shadow-card-glow-blue';
      case 'emerald': return 'shadow-card-glow-green';
      case 'amethyst': return 'shadow-card-glow-purple';
      default: return 'shadow-card-hover';
    }
  };

  const suitColorClass = isRedSuit ? 'text-rose-500' : (variant === 'ivory' ? 'text-slate-900' : 'text-slate-100');

  // Realistic Card Back Design
  const renderCardBack = () => (
    <div className="w-full h-full relative rounded-2xl overflow-hidden card-back-pattern border-2 border-amber-500/40 p-3 flex flex-col justify-between shadow-2xl">
      {/* Outer & Inner Foil Frame */}
      <div className="absolute inset-1.5 border border-amber-400/30 rounded-xl pointer-events-none" />
      <div className="absolute inset-2.5 border border-dashed border-amber-400/20 rounded-lg pointer-events-none" />

      {/* 4 Corner Ornaments */}
      <div className="flex justify-between items-center text-amber-400/70 font-serif text-xs">
        <span className="font-poker text-sm">♠</span>
        <span className="font-poker text-sm">♦</span>
      </div>

      {/* Center Mandala Seal */}
      <div className="flex-1 flex flex-col items-center justify-center relative my-2">
        <div className="w-20 h-20 rounded-full border-2 border-amber-400/40 flex items-center justify-center bg-navy-950/80 shadow-inner relative">
          <div className="absolute inset-1 rounded-full border border-amber-400/20 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="text-center">
            <span className="block font-poker text-xl font-bold gold-foil-text tracking-widest">SB</span>
            <span className="block text-[8px] tracking-[0.2em] text-amber-300/60 uppercase">The Deck</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-amber-200/50 tracking-widest font-mono">
          <span>♠</span><span>♥</span><span>♦</span><span>♣</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-amber-400/70 font-serif text-xs">
        <span className="font-poker text-sm rotate-180">♣</span>
        <span className="font-poker text-sm rotate-180">♥</span>
      </div>
    </div>
  );

  return (
    <div
      className={`perspective-1500 inline-block select-none ${className}`}
      data-cursor={dataCursor}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered && interactive ? 1.025 : 1,
          y: isHovered && interactive ? -6 : 0,
        }}
        transition={{
          rotateY: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
          scale: { duration: 0.2 },
          y: { duration: 0.2 },
        }}
        className={`relative w-full h-full rounded-2xl transition-shadow duration-300 preserve-3d cursor-pointer ${getThemeGlow()}`}
      >
        {/* CARD FRONT FACE */}
        <div
          className={`w-full h-full rounded-2xl overflow-hidden preserve-3d backface-hidden ${
            variant === 'ivory'
              ? 'card-ivory-texture text-slate-900 border border-amber-300/40'
              : 'card-dark-texture text-slate-100 border border-amber-500/30'
          }`}
        >
          {/* Card Border Filigree */}
          <div className="card-filigree-border absolute inset-0 pointer-events-none z-10" />

          {/* Glare effect based on mouse position */}
          {interactive && isHovered && (
            <div
              className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-2xl"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)`,
              }}
            />
          )}

          {/* Top-Left Corner Index */}
          <div className="absolute top-2.5 left-3 flex flex-col items-center leading-none z-20 pointer-events-none">
            <span className={`font-poker text-lg md:text-xl font-black ${suitColorClass} tracking-tighter`}>
              {rank}
            </span>
            <span className={`text-sm md:text-base ${suitColorClass} -mt-0.5`}>
              {suit}
            </span>
          </div>

          {/* Top-Right Optional Badge */}
          {badge && (
            <div className="absolute top-2.5 right-3 z-20 pointer-events-none">
              <span className="text-[10px] tracking-wider uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-semibold shadow-sm">
                {badge}
              </span>
            </div>
          )}

          {/* Card Main Content */}
          <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between z-10">
            {children}
          </div>

          {/* Bottom-Right Rotated Corner Index */}
          <div className="absolute bottom-2.5 right-3 flex flex-col items-center leading-none z-20 pointer-events-none rotate-180">
            <span className={`font-poker text-lg md:text-xl font-black ${suitColorClass} tracking-tighter`}>
              {rank}
            </span>
            <span className={`text-sm md:text-base ${suitColorClass} -mt-0.5`}>
              {suit}
            </span>
          </div>

          {/* Subtle Center Background Watermark Suit */}
          <div
            className={`absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none text-[180px] md:text-[240px] font-poker ${
              isRedSuit ? 'text-red-500' : 'text-slate-400'
            }`}
          >
            {suit}
          </div>
        </div>

        {/* CARD BACK FACE (For 3D Flip) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl preserve-3d backface-hidden rotate-y-180 z-0"
        >
          {backContent ? (
            <div className={`w-full h-full rounded-2xl overflow-hidden ${variant === 'ivory' ? 'card-ivory-texture text-slate-900' : 'card-dark-texture text-slate-100'} border border-amber-500/40 p-6 md:p-8 flex flex-col justify-between relative`}>
              <div className="card-filigree-border absolute inset-0 pointer-events-none z-10" />
              {/* Corner Indices on back too for authentic card feel */}
              <div className="absolute top-2.5 left-3 flex flex-col items-center leading-none z-20 pointer-events-none">
                <span className={`font-poker text-base md:text-lg font-black ${suitColorClass}`}>
                  {rank}
                </span>
                <span className={`text-xs md:text-sm ${suitColorClass}`}>
                  {suit}
                </span>
              </div>
              <div className="absolute bottom-2.5 right-3 flex flex-col items-center leading-none z-20 pointer-events-none rotate-180">
                <span className={`font-poker text-base md:text-lg font-black ${suitColorClass}`}>
                  {rank}
                </span>
                <span className={`text-xs md:text-sm ${suitColorClass}`}>
                  {suit}
                </span>
              </div>
              <div className="relative z-10 w-full h-full flex flex-col justify-between pt-2 pb-2">
                {backContent}
              </div>
            </div>
          ) : (
            renderCardBack()
          )}
        </div>
      </motion.div>
    </div>
  );
};
