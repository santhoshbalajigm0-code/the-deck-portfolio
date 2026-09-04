import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronUp, Volume2, VolumeX } from 'lucide-react';
import { cardAudio } from '../../utils/soundEffects';

interface CardNavFanProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

interface NavCardItem {
  id: string;
  rank: string;
  suit: '♠' | '♥' | '♦' | '♣';
  label: string;
  color: string;
}

export const CardNavFan: React.FC<CardNavFanProps> = ({ activeSection, onSelectSection }) => {
  const [isFanned, setIsFanned] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const navCards: NavCardItem[] = [
    { id: 'hero', rank: 'K', suit: '♠', label: 'HERO', color: 'text-amber-400' },
    { id: 'about', rank: 'A', suit: '♠', label: 'ABOUT', color: 'text-slate-100' },
    { id: 'skills', rank: 'K', suit: '♣', label: 'SKILLS', color: 'text-emerald-400' },
    { id: 'projects', rank: 'Q', suit: '♦', label: 'PROJECTS', color: 'text-rose-400' },
    { id: 'experience', rank: 'J', suit: '♥', label: 'EXPERIENCE', color: 'text-rose-400' },
    { id: 'education', rank: '10', suit: '♠', label: 'EDUCATION', color: 'text-blue-400' },
    { id: 'certifications', rank: '9', suit: '♦', label: 'CERTIFICATIONS', color: 'text-amber-400' },
    { id: 'hobbies', rank: '8', suit: '♥', label: 'HOBBIES', color: 'text-pink-400' },
    { id: 'contact', rank: 'A', suit: '♥', label: 'CONTACT', color: 'text-rose-500' },
  ];

  const handleCardClick = (id: string) => {
    cardAudio.playDeal();
    onSelectSection(id);
    setIsFanned(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    cardAudio.enabled = nextState;
  };

  return (
    <>
      {/* Sticky Top Micro Header (Minimal & Accessible) */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-3.5 sm:px-4 py-2 rounded-full bg-navy-950/85 backdrop-blur-md border border-amber-500/30 flex items-center gap-2.5 sm:gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => handleCardClick('hero')}
          className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 hover:text-white transition-colors"
          data-cursor="DECK"
        >
          <span className="font-poker text-sm">♠</span>
          <span>THE DECK</span>
        </button>

        <span className="text-slate-600">|</span>

        {/* Quick section jumps */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono">
          {navCards.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`px-2 py-1 rounded-md transition-all ${
                activeSection === item.id
                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="mr-0.5">{item.rank}{item.suit}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={toggleAudio}
          className="p-1.5 rounded-full text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
          title={isAudioEnabled ? "Mute Card Audio" : "Unmute Card Audio"}
        >
          {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
        </button>
      </nav>

      {/* Floating Bottom Card Fan Dock */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Expanded Fan Container */}
        <div className="relative mb-2">
          <AnimatePresence>
            {isFanned && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 p-3 bg-navy-950/90 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl overflow-x-auto max-w-[90vw]"
              >
                {navCards.map((card) => {
                  const isActive = activeSection === card.id;
                  const isRed = card.suit === '♥' || card.suit === '♦';

                  return (
                    <motion.button
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      onMouseEnter={() => cardAudio.playGlide()}
                      whileHover={{ y: -8, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-16 h-24 rounded-lg flex flex-col justify-between p-1.5 transition-all shadow-md ${
                        isActive
                          ? 'bg-amber-100 text-slate-900 border-2 border-amber-400 shadow-[0_0_15px_#d4af37]'
                          : 'bg-navy-900/90 text-slate-100 border border-slate-700 hover:border-amber-400/60'
                      }`}
                      data-cursor="DEAL"
                    >
                      {/* Top Corner */}
                      <div className="flex flex-col items-start leading-none">
                        <span className="font-poker text-xs font-bold">{card.rank}</span>
                        <span className={`text-[10px] ${isRed ? 'text-rose-500' : (isActive ? 'text-slate-900' : 'text-slate-300')}`}>
                          {card.suit}
                        </span>
                      </div>

                      {/* Label in center */}
                      <div className="text-[8px] font-mono uppercase tracking-tighter text-center font-bold truncate w-full">
                        {card.label}
                      </div>

                      {/* Bottom Rotated Corner */}
                      <div className="flex flex-col items-end leading-none rotate-180">
                        <span className="font-poker text-xs font-bold">{card.rank}</span>
                        <span className={`text-[10px] ${isRed ? 'text-rose-500' : (isActive ? 'text-slate-900' : 'text-slate-300')}`}>
                          {card.suit}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Master Hand Toggle Trigger */}
        <motion.button
          onClick={() => {
            cardAudio.playGlide();
            setIsFanned(!isFanned);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-navy-900 to-navy-950 border-2 border-amber-500/60 text-amber-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:border-amber-400 transition-all group"
          data-cursor="DECK"
        >
          <Layers className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>{isFanned ? 'CLOSE HAND' : 'FAN CARD DECK'}</span>
          <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isFanned ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>
    </>
  );
};
