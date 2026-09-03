import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const PortfolioBackground: React.FC = () => {
  // Smooth mouse 3D parallax across the whole screen
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [mouseX, mouseY]);

  // Floating ambient suit glyphs with depth
  const floatingSuits = [
    { suit: '♠', left: '6%', top: '12%', size: 44, depth: 60, delay: 0, color: 'text-amber-400/20' },
    { suit: '♥', left: '92%', top: '18%', size: 40, depth: 50, delay: 1.2, color: 'text-rose-500/20' },
    { suit: '♦', left: '10%', top: '65%', size: 38, depth: 70, delay: 2.1, color: 'text-amber-300/20' },
    { suit: '♣', left: '88%', top: '75%', size: 42, depth: 55, delay: 1.6, color: 'text-emerald-400/20' },
    { suit: '♠', left: '22%', top: '35%', size: 28, depth: 35, delay: 0.8, color: 'text-blue-400/15' },
    { suit: '♦', left: '78%', top: '42%', size: 32, depth: 45, delay: 2.4, color: 'text-yellow-400/15' },
    { suit: '♥', left: '5%', top: '88%', size: 36, depth: 65, delay: 1.9, color: 'text-rose-400/15' },
    { suit: '♣', left: '94%', top: '48%', size: 30, depth: 40, delay: 3.0, color: 'text-emerald-300/15' },
  ];

  // Twinkling golden star dust embers
  const starParticles = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    left: `${(i * 13.7) % 100}%`,
    top: `${(i * 19.3) % 100}%`,
    size: (i % 3) + 2,
    duration: 3.2 + (i % 4) * 0.8,
    delay: (i % 6) * 0.35,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Deep Blue-Black Canvas */}
      <div className="absolute inset-0 bg-[#030611]" />

      {/* Subtle Analog Texture Grid */}
      <div className="absolute inset-0 bg-noise opacity-25" />

      {/* Center Radiant Cosmic Solar Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-amber-500/18 via-yellow-600/10 to-transparent rounded-full blur-[150px] animate-cosmic-pulse" />

      {/* Sapphire & Ruby Ambient Light Nebulae */}
      <div className="absolute top-10 left-10 w-[550px] h-[500px] bg-blue-600/15 rounded-full blur-[160px]" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[500px] bg-rose-600/15 rounded-full blur-[160px]" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[170px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px]" />

      {/* Cyber-Casino Dotted Light Grid Floor */}
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.35) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      {/* Twinkling Golden Star Dust Particles */}
      <div className="absolute inset-0 overflow-hidden">
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
              opacity: [0.15, 0.9, 0.15],
              scale: [0.8, 1.35, 0.8],
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
      <div className="absolute inset-0 overflow-hidden">
        {floatingSuits.map((item, idx) => (
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
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
            className={`absolute font-poker ${item.color} select-none drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]`}
          >
            {item.suit}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
