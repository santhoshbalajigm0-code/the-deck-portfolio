import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Phone, Mail } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ExperienceStack: React.FC = () => {
  const { experience, references } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Atmosphere: Pink + Purple */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-pink-400">♥</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            J♥ — EXPERIENCE & INTERNSHIPS
          </h2>
          <span className="font-poker text-2xl text-pink-400">♥</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-8 text-center">
          Professional Engineering Tenures & Institutional References
        </p>

        {/* Primary Experience Card with Grand Playing Card Format */}
        {experience.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mb-8"
          >
            <PlayingCard
              rank={exp.rank}
              suit={exp.suit}
              variant="ivory"
              accentTheme="ruby"
              className="w-full h-auto min-h-[720px] md:min-h-[760px]"
              tiltIntensity={8}
              badge="VERIFIED INTERNSHIP"
              dataCursor="EXPERIENCE ♥"
            >
              <div className="flex-1 flex flex-col justify-between py-4 text-slate-900 h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-900/15 gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-[0.25em] text-rose-700 uppercase">
                      FULL STACK DEVELOPMENT
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-black text-slate-950 mt-1">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2 text-sm md:text-base font-mono font-bold text-slate-700 mt-1">
                      <Briefcase className="w-4 h-4 text-rose-600" />
                      <span>{exp.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 border border-amber-800/25 text-slate-800 font-mono text-xs md:text-sm font-bold self-start sm:self-auto shadow-xs">
                    <Calendar className="w-4 h-4 text-rose-600" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Body Description & Key Contributions */}
                <div className="my-auto space-y-4 py-3">
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-sans font-medium">
                    {exp.description}
                  </p>

                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-800 block mb-3">
                      Key Engineering Responsibilities:
                    </span>
                    <div className="space-y-2.5">
                      {exp.keyContributions.map((kc, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-800 bg-amber-50/80 p-3.5 rounded-xl border border-amber-900/10 shadow-xs">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{kc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="pt-4 border-t border-amber-900/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-200/80 text-slate-900 border border-amber-800/25 shadow-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
                    Extazee Cohort
                  </span>
                </div>
              </div>
            </PlayingCard>
          </motion.div>
        ))}

        {/* Academic References Cards Banner */}
        <div className="w-full max-w-2xl mt-2">
          <div className="text-center mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Institutional Academic References (Bishop Heber College)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-navy-900/80 border border-slate-700/60 shadow-lg text-xs"
              >
                <h4 className="font-serif font-bold text-white text-sm mb-0.5">
                  {ref.name}
                </h4>
                <p className="text-amber-300 font-mono text-[11px] mb-1">{ref.title}</p>
                <p className="text-slate-400 text-[11px] mb-3">{ref.institution}</p>

                <div className="flex flex-col space-y-1 text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{ref.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span className="truncate">{ref.email}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
