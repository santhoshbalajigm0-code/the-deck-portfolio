import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, X, FileText, Sparkles, CheckCircle2, Phone, Mail, MapPin, Award, Briefcase, GraduationCap } from 'lucide-react';
import { cardAudio } from '../../utils/soundEffects';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'overview'>('pdf');
  const cvUrl = './Santhosh_Balaji_CV.pdf';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        cardAudio.playGlide();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    cardAudio.playDeal();
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Santhosh_Balaji_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    cardAudio.playGlide();
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              cardAudio.playGlide();
              onClose();
            }}
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[90vh] bg-[#090e24] border-2 border-amber-500/50 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden z-10 text-slate-100"
          >
            {/* Top Ornamental Header Bar */}
            <div className="px-5 py-3.5 bg-[#0b1230] border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-poker font-bold">
                  ♠
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base md:text-lg font-black text-white tracking-wide">
                      CURRICULUM VITAE
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                      OFFICIAL PDF
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Santhosh Balaji G • MCA Graduate & Software Developer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Mode tabs */}
                <div className="flex items-center bg-navy-900/90 rounded-xl p-1 border border-slate-700/60 text-xs font-mono">
                  <button
                    onClick={() => {
                      cardAudio.playGlide();
                      setActiveTab('pdf');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'pdf'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PDF Viewer
                  </button>
                  <button
                    onClick={() => {
                      cardAudio.playGlide();
                      setActiveTab('overview');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Summary
                  </button>
                </div>

                {/* Open in New Tab Button */}
                <button
                  onClick={handleOpenNewTab}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="Open CV in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </button>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 hover:from-amber-200 hover:to-amber-400 text-slate-950 font-serif font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                  title="Download Santhosh Balaji CV PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    cardAudio.playGlide();
                    onClose();
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors ml-1 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 bg-[#040816] overflow-hidden relative">
              {activeTab === 'pdf' ? (
                <div className="w-full h-full relative flex flex-col">
                  {/* Embedded PDF iframe */}
                  <iframe
                    src={`${cvUrl}#toolbar=1&navpanes=0`}
                    title="Santhosh Balaji CV PDF"
                    className="w-full h-full border-0 bg-slate-900"
                  />

                  {/* Fallback bar if browser restricts PDF inline */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-navy-950/90 border border-amber-500/40 backdrop-blur-md text-xs font-mono text-slate-300 flex items-center gap-3 shadow-xl pointer-events-auto">
                    <span className="text-amber-400">Can't see the preview?</span>
                    <button
                      onClick={handleOpenNewTab}
                      className="text-amber-300 underline font-bold hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Fullscreen</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <span>•</span>
                    <button
                      onClick={handleDownload}
                      className="text-amber-300 underline font-bold hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Direct Download</span>
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Structured Resume Overview */
                <div className="w-full h-full overflow-y-auto p-6 md:p-8 space-y-6 text-slate-300">
                  {/* Candidate Header */}
                  <div className="p-6 rounded-2xl bg-navy-900/60 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-3xl font-black text-white">SANTHOSH BALAJI G</h2>
                      <p className="font-mono text-sm text-amber-300 mt-1 font-semibold">
                        MCA Graduate • Software Developer
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>+91 9791871968</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-rose-400" />
                          <span>santhoshbalajigm07@gmail.com</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-400" />
                          <span>Trichy - 620011, Tamil Nadu</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-slate-950 font-serif font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official PDF</span>
                    </button>
                  </div>

                  {/* Career Objective */}
                  <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Career Objective</span>
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      Motivated MCA student with strong programming skills and a passion for software development.
                      Familiar with Java, Python, SQL, and web technologies. Quick learner, team player, and eager to apply
                      technical knowledge to real-world software engineering projects.
                    </p>
                  </div>

                  {/* Experience & Internship */}
                  <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Work & Internship Experience</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif text-base font-bold text-white">Full Stack Developer Intern</h5>
                          <span className="text-xs font-mono text-amber-300 font-semibold">May 2025 – Jun 2025</span>
                        </div>
                        <p className="text-xs font-mono text-slate-400 mb-2">Extazee Software Solutions</p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Developed responsive multi-page website and interactive web applications using HTML, CSS, and
                          JavaScript with local storage. Gained hands-on experience integrating frontend interfaces with
                          backend systems using Java Spring Boot and MySQL.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Education */}
                  <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Academic Background</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-navy-950/70 border border-blue-500/30">
                        <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">2024 – 2026</span>
                        <h5 className="font-serif text-sm font-bold text-white mt-1">Master of Computer Applications (MCA)</h5>
                        <p className="text-xs text-slate-400 font-sans">Bishop Heber College, Tiruchirappalli</p>
                        <div className="mt-2 text-xs font-mono text-amber-300 font-bold">
                          CGPA: 7.99 / 10.0
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-navy-950/70 border border-amber-500/30">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">2021 – 2024</span>
                        <h5 className="font-serif text-sm font-bold text-white mt-1">Bachelor of Computer Applications (BCA)</h5>
                        <p className="text-xs text-slate-400 font-sans">Bishop Heber College, Tiruchirappalli</p>
                        <div className="mt-2 text-xs font-mono text-amber-300 font-bold">
                          CGPA: 7.00 / 10.0
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Projects */}
                  <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Major Engineering Projects</span>
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-navy-950/70 border border-rose-500/30">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif text-sm font-bold text-white">
                            Secure File Sharing Platform Using Facial Recognition & OTP
                          </h5>
                          <span className="text-xs font-mono text-rose-300">Jan 2026 – Mar 2026</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Developed a secure file sharing system using Python, Flask, and MySQL with facial recognition and
                          OTP authentication for secure user access. Implemented encrypted file upload/download, email-based
                          verification keys, and secure cloud storage.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-navy-950/70 border border-emerald-500/30">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif text-sm font-bold text-white">
                            Powered Precision Fishing System Using Internet of Things (IoT)
                          </h5>
                          <span className="text-xs font-mono text-emerald-300">Dec 2023 – Apr 2024</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          Developed an IoT-powered autonomous fishing boat with real-time monitoring and advanced algorithms
                          to optimize fish detection, catch efficiency, and remote control for sustainable marine practices.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications & References */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" />
                        <span>Certifications</span>
                      </h4>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>INFOSYS — Basics of Python</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>SYSTECH — Python Programming</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>IBM SkillsBuild — AI Fundamentals</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-navy-900/40 border border-slate-700/60">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" />
                        <span>Academic References</span>
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="font-bold text-white">Dr. R. Thamaraiselvi, M.Sc., M.Phil., Ph.D.</p>
                          <p className="text-[11px] text-slate-400 font-mono">Director-MCA, Bishop Heber College</p>
                        </div>
                        <div className="pt-1 border-t border-slate-700/40">
                          <p className="font-bold text-white">Dr. Anita Priya Raja</p>
                          <p className="text-[11px] text-slate-400 font-mono">Training & Placement Officer, Bishop Heber College</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
