import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useI18n } from '../i18n/I18nContext';

interface FAQProps {
  onOpenBooking: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenBooking }) => {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[110px] pointer-events-none rounded-full" />

      {/* Section Header with Bento Aesthetic */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.faq.kicker}</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.faq.titlePart1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-[#D4AF37]">
              {t.faq.titleGradient}
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-md">
          {t.faq.subtitle}
        </p>
      </div>

      {/* Asymmetric Bento-Styled Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Consultation Bento Card (4 Cols) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[70px] pointer-events-none rounded-full" />

          <div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 w-fit mb-6">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-3">
              {t.faq.sideCardTitle}
            </h3>
            <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
              {t.faq.sideCardDesc}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.faq.responseTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.faq.ndaAvailable}</span>
              </div>
            </div>
          </div>

          <Magnetic strength={0.25} className="w-full">
            <button
              onClick={onOpenBooking}
              data-cursor="button"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40 transition-transform active:scale-95"
            >
              <span>{t.faq.sideCta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Magnetic>
        </div>

        {/* Right Column: Accordion Cards (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {t.faq.items.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={false}
                className={`glass-panel rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/40 bg-[#0c0c1c]/90 shadow-lg shadow-blue-950/20'
                    : 'border-white/10 hover:border-white/20 bg-[#080812]/70'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  data-cursor="button"
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm sm:text-base font-bold text-blue-400 pt-0.5 tabular-nums">
                      {faq.num}
                    </span>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-1">
                        {faq.tag}
                      </div>
                      <h4
                        className={`font-syne text-base sm:text-lg font-bold transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-200 hover:text-white'
                        }`}
                      >
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  {/* Toggle Indicator Icon */}
                  <div
                    className={`p-2 rounded-xl border shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 rotate-180'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 text-sm sm:text-base font-sans text-slate-300 leading-relaxed pl-14">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
