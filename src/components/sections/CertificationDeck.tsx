import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const CertificationDeck: React.FC = () => {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <section id="certifications" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Atmosphere: Orange + Gold */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-amber-400">♦</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            9♦ — CERTIFICATION DECK
          </h2>
          <span className="font-poker text-2xl text-amber-400">♦</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-10 text-center">
          Verified Industry Credentials from Infosys, Systech & IBM SkillsBuild
        </p>

        {/* 3 Collectible Mini Playing Cards (Standardized Identical Heights) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="h-[430px] w-full"
              data-cursor="CERT ♦"
            >
              <PlayingCard
                rank={cert.rank}
                suit={cert.suit}
                variant="ivory"
                accentTheme="gold"
                className="w-full h-full shadow-xl hover:scale-103 transition-transform"
                tiltIntensity={12}
                badge={cert.issuer}
              >
                <div className="flex-1 flex flex-col justify-between py-1 text-slate-900 h-full">
                  {/* Top Issuer Info */}
                  <div className="text-center pt-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-900 uppercase">
                      COLLECTIBLE #{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-black text-slate-950 mt-0.5 leading-tight">
                      {cert.name}
                    </h3>
                  </div>

                  {/* Center Emblem */}
                  <div className="my-auto flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-900/10 text-center shadow-inner">
                    <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mb-1.5 border border-amber-400/40">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {cert.issuer}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Credential</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-700 leading-relaxed text-center px-1">
                    {cert.description}
                  </p>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-amber-900/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{cert.issuer}</span>
                    <span className="font-bold text-slate-800">{cert.rank}{cert.suit}</span>
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
