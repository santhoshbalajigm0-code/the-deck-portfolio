import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy } from 'lucide-react';
import { PlayingCard } from '../common/PlayingCard';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { cardAudio } from '../../utils/soundEffects';

export const ContactCard: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    cardAudio.playGlide();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative">
      {/* Background Atmosphere: Deep Red + Magenta */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-poker text-2xl text-rose-500">♥</span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-white tracking-wide">
            A♥ — LET'S PLAY A NEW HAND
          </h2>
          <span className="font-poker text-2xl text-rose-500">♥</span>
        </div>

        <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide mb-10 text-center">
          Have an opportunity, project, or idea? Let's connect.
        </p>

        {/* Large A♥ Ace of Hearts Playing Card */}
        <div className="w-full max-w-2xl">
          <PlayingCard
            rank="A"
            suit="♥"
            variant="ivory"
            accentTheme="ruby"
            className="w-full h-auto min-h-[500px]"
            tiltIntensity={8}
            dataCursor="CONTACT ♥"
          >
            <div className="flex-1 flex flex-col justify-between py-2 text-slate-900">
              {/* Header */}
              <div className="text-center pb-4 border-b border-rose-900/15">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-rose-700 uppercase">
                  THE FINAL CARD OF THE DECK
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-black text-slate-950 mt-1">
                  SANTHOSH BALAJI G
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
                  MCA Graduate • Software Developer
                </p>
              </div>

              {/* Contact Information Chips & Actions */}
              <div className="my-6 space-y-4">
                {/* Email Direct Action */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-rose-800 block">
                        Official Direct Email
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm md:text-base font-serif font-bold text-slate-900 hover:text-rose-600 transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-slate-800 hover:bg-rose-100 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Phone & Location Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-900 block">Phone</span>
                      <a href={`tel:${profile.phone}`} className="text-xs md:text-sm font-mono font-bold text-slate-900 hover:underline">
                        +91 {profile.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-blue-900 block">Location</span>
                      <span className="text-xs md:text-sm font-sans font-bold text-slate-900">
                        {profile.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-rose-900/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}?subject=Portfolio%20Inquiry%20-%20Santhosh%20Balaji`}
                  onClick={() => cardAudio.playDeal()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(225,29,72,0.4)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.6)] hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND AN EMAIL</span>
                </a>

                <span className="text-[11px] font-mono text-slate-500 text-center sm:text-right">
                  ♠ ♥ ♦ ♣ Open to Developer Opportunities
                </span>
              </div>
            </div>
          </PlayingCard>
        </div>
      </div>
    </section>
  );
};
