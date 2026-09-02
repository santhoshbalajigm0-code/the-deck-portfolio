import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Find nearest element with data-cursor
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        setCursorText(target.getAttribute('data-cursor') || 'DRAW');
        setIsHovered(true);
      } else {
        const isClickable = (e.target as HTMLElement)?.closest('button, a, input, select');
        if (isClickable) {
          setCursorText('OPEN');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Small glowing center dot */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_12px_#d4af37]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          opacity: isHovered ? 0.3 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Dynamic ring / chip that expands and displays card label */}
      <motion.div
        className="fixed rounded-full border border-amber-400/80 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center text-amber-300 font-mono text-[10px] tracking-widest uppercase font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        animate={{
          x: mousePosition.x - (isHovered ? 32 : 16),
          y: mousePosition.y - (isHovered ? 32 : 16),
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          borderColor: isHovered ? '#d4af37' : 'rgba(212, 175, 55, 0.4)',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.2 }}
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] tracking-widest font-semibold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
