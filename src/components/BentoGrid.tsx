import React, { useState } from 'react';
import { Layers, Bot, Zap, ShieldCheck, ArrowUpRight, Check, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/I18nContext';

interface BentoGridProps {
  onSelectService: (serviceName: string) => void;
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const BentoGrid: React.FC<BentoGridProps> = ({ onSelectService }) => {
  const { t } = useI18n();

  // Interactive preview state for speed optimization card
  const [speedMetrics] = useState({
    lcp: '0.68s',
    cls: '0.001',
    fid: '12ms',
    score: 99,
  });

  return (
    <section id="servicios" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header with Motion Reveal */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
            {t.bento.sectionKicker}
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.bento.sectionTitlePart1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-[#D4AF37]">
              {t.bento.sectionTitleGradient}
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-md">
          {t.bento.sectionSubtitle}
        </p>
      </motion.div>

      {/* Asymmetric Bento Grid with Staggered Motion */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Card 1: SaaS Full-Stack (Col-span 2) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
          data-cursor="card"
          onClick={() => onSelectService(t.bento.card1.title)}
          className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/10 hover:border-blue-500/40 transition-colors duration-300 flex flex-col justify-between cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[90px] pointer-events-none rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {t.bento.card1.tag}
              </span>
            </div>

            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
              {t.bento.card1.title}
            </h3>
            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              {t.bento.card1.desc}
            </p>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.bento.card1.f1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.bento.card1.f2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.bento.card1.f3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.bento.card1.f4}</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Render */}
          <div className="relative mt-4 rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-[#090912]">
            <img
              src="/src/assets/images/bento_saas_architecture_1792926631625.jpg"
              alt="Dashboard SaaS Full-Stack"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>{t.bento.card1.stack}</span>
              <button
                data-cursor="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectService(t.bento.card1.title);
                }}
                className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded"
              >
                <span>{t.bento.card1.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Card 2: AI Agents & Automation (Col-span 1) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
          data-cursor="card"
          onClick={() => onSelectService(t.bento.card2.title)}
          className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/10 hover:border-violet-500/40 transition-colors duration-300 flex flex-col justify-between cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-violet-600/10 blur-[80px] pointer-events-none rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {t.bento.card2.tag}
              </span>
            </div>

            <h3 className="font-syne text-2xl font-bold text-white mb-3">
              {t.bento.card2.title}
            </h3>
            <p className="font-sans text-slate-300 text-sm leading-relaxed mb-6">
              {t.bento.card2.desc}
            </p>

            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-[#0c0c16] mb-6">
              <img
                src="/src/assets/images/bento_ai_agents_1792926631305.jpg"
                alt="Agents IA et pipelines"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent opacity-75" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-violet-300">
              {t.bento.card2.bottomText}
            </span>
            <button
              data-cursor="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectService(t.bento.card2.title);
              }}
              className="text-xs font-semibold text-white hover:text-violet-400 flex items-center gap-1 transition-colors cursor-pointer px-2 py-1 rounded"
            >
              <span>{t.bento.card2.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Card 3: Core Web Vitals & Speed (Col-span 1) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
          data-cursor="card"
          onClick={() => onSelectService(t.bento.card3.title)}
          className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/10 hover:border-emerald-500/40 transition-colors duration-300 flex flex-col justify-between cursor-pointer"
        >
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/10 blur-[80px] pointer-events-none rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {t.bento.card3.tag}
              </span>
            </div>

            <h3 className="font-syne text-2xl font-bold text-white mb-3">
              {t.bento.card3.title}
            </h3>
            <p className="font-sans text-slate-300 text-sm leading-relaxed mb-6">
              {t.bento.card3.desc}
            </p>

            {/* Interactive Speed Diagnostic Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <span className="text-slate-400 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  {t.bento.card3.auditTitle}
                </span>
                <span className="text-emerald-400 font-bold font-mono">
                  {speedMetrics.score}/100 PASS
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div>
                  <div className="text-slate-500 text-[10px]">LCP</div>
                  <div className="text-emerald-400 font-bold">{speedMetrics.lcp}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">CLS</div>
                  <div className="text-emerald-400 font-bold">{speedMetrics.cls}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">FID</div>
                  <div className="text-emerald-400 font-bold">{speedMetrics.fid}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-300">
              {t.bento.card3.bottomText}
            </span>
            <button
              data-cursor="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectService(t.bento.card3.title);
              }}
              className="text-xs font-semibold text-white hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer px-2 py-1 rounded"
            >
              <span>{t.bento.card3.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Card 4: Critical Maintenance & RGPD Compliance (Col-span 2) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
          data-cursor="card"
          onClick={() => onSelectService(t.bento.card4.title)}
          className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/10 hover:border-[#D4AF37]/40 transition-colors duration-300 flex flex-col justify-between cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 blur-[90px] pointer-events-none rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {t.bento.card4.tag}
              </span>
            </div>

            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
              {t.bento.card4.title}
            </h3>
            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              {t.bento.card4.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-mono text-[#D4AF37] font-semibold mb-1">
                  {t.bento.card4.f1Title}
                </div>
                <div className="text-xs text-slate-300">
                  {t.bento.card4.f1Desc}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-mono text-[#D4AF37] font-semibold mb-1">
                  {t.bento.card4.f2Title}
                </div>
                <div className="text-xs text-slate-300">
                  {t.bento.card4.f2Desc}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs font-mono text-[#D4AF37] font-semibold mb-1">
                  {t.bento.card4.f3Title}
                </div>
                <div className="text-xs text-slate-300">
                  {t.bento.card4.f3Desc}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              {t.bento.card4.bottomText}
            </span>
            <button
              data-cursor="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectService(t.bento.card4.title);
              }}
              className="text-xs font-semibold text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors cursor-pointer px-2 py-1 rounded"
            >
              <span>{t.bento.card4.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
