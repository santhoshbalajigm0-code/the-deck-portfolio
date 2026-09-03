import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, MapPin, Mail, Globe, FileText, Download } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

interface AboutCardProps {
  onOpenCV?: () => void;
}

export const AboutCard: React.FC<AboutCardProps> = ({ onOpenCV }) => {
  const { profile } = PORTFOLIO_DATA;

  const infoChips = [
    'MCA', 'BCA', 'Python', 'Java', 'SQL', 'Web Dev', 'Spring Boot', 'Flask'
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Atmosphere Gradients */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header Banner */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-poker text-2xl text-violet-400">♠</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            A♠ — ABOUT THE PLAYER
          </h2>
          <span className="font-poker text-2xl text-violet-400">♠</span>
        </div>

        {/* Oversized A♠ Ace Card in Grand Playing Card Format */}
        <div className="w-full max-w-4xl">
          <PlayingCard
            rank="A"
            suit="♠"
            variant="ivory"
            accentTheme="amethyst"
            className="w-full h-auto min-h-[720px] md:min-h-[760px]"
            tiltIntensity={8}
            dataCursor="ABOUT ♠"
          >
            <div className="flex-1 flex flex-col justify-between py-4 text-slate-900 h-full">
              {/* Card Header */}
              <div className="text-center pb-4 border-b border-amber-900/15">
                <span className="text-xs font-mono font-bold tracking-[0.28em] text-amber-900 uppercase">
                  THE ACE OF SPADES
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-black text-slate-950 mt-1">
                  SANTHOSH BALAJI G
                </h3>
                <p className="font-mono text-sm md:text-base text-slate-700 font-semibold mt-1">
                  MCA Graduate • Software Developer
                </p>
              </div>

              {/* Center Portrait & Identity Seal with Signature */}
              <div className="my-2 p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-700/20 text-center shadow-inner flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-slate-900/30 flex items-center justify-center bg-white shadow-md mb-2 relative">
                  <span className="font-poker text-3xl text-slate-950">♠</span>
                </div>
                <span className="font-serif text-base font-black text-slate-950">
                  SANTHOSH BALAJI
                </span>
                <span className="text-[11px] font-mono text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-700" />
                  <span>Trichy, Tamil Nadu</span>
                </span>

                {/* Player Signature in Luxury Calligraphy */}
                <div className="mt-2.5 pt-2 border-t border-amber-900/15 w-full flex flex-col items-center">
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold">PLAYER SIGNATURE</span>
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    className="font-signature text-2xl md:text-3xl font-bold text-amber-900 tracking-wide cursor-default select-none my-0.5"
                  >
                    ~ Santhosh Balaji ~
                  </motion.div>
                </div>
              </div>

              {/* Bio & Core Details */}
              <div className="space-y-3 px-1">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Career Objective</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>

                {/* Core Foundation Chips */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 mb-1.5">
                    Core Foundations
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {infoChips.map((chip) => (
                      <span
                        key={chip}
                        className="px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold bg-amber-200/60 text-slate-900 border border-amber-800/20 shadow-xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills & Languages */}
                <div className="pt-2 border-t border-amber-900/10 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div>
                    <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mb-1">Soft Skills</span>
                    <ul className="space-y-0.5">
                      {profile.softSkills.slice(0, 3).map((sk) => (
                        <li key={sk} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mb-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-blue-700" />
                      <span>Languages</span>
                    </span>
                    <p className="font-medium text-slate-800">Tamil, English</p>
                    <span className="font-bold text-amber-950 block text-[10px] uppercase font-mono mt-1 mb-0.5 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-rose-700" />
                      <span>Email</span>
                    </span>
                    <p className="font-mono text-[10px] text-slate-700 truncate">{profile.email}</p>
                  </div>
                </div>

                {/* Official Curriculum Vitae (CV) Access Bar */}
                <div className="pt-2 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-900 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-mono font-bold text-slate-900 block leading-tight">Official Curriculum Vitae</span>
                      <span className="text-[9.5px] font-mono text-slate-600">Verified PDF Resume • Santhosh Balaji G</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onOpenCV && (
                      <button
                        onClick={() => {
                          cardAudio.playGlide();
                          onOpenCV();
                        }}
                        className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        data-cursor="CV"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View CV</span>
                      </button>
                    )}

                    <a
                      href="./Santhosh_Balaji_CV.pdf"
                      download="Santhosh_Balaji_CV.pdf"
                      onClick={() => cardAudio.playDeal()}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-[11px] font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3 h-3 text-amber-700" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between pt-2.5 border-t border-amber-900/10 text-[10px] font-mono text-slate-500">
                <span>SUIT: SPADES</span>
                <span className="tracking-widest uppercase">THE DEVELOPER'S PLAYING DECK</span>
                <span>RANK: ACE</span>
              </div>
            </div>
          </PlayingCard>
        </div>
      </div>
    </section>
  );
};
