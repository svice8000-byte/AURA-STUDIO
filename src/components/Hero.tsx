import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroCanvasShader } from './HeroCanvasShader';
import { Magnetic } from './Magnetic';
import { useI18n } from '../i18n/I18nContext';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToLeadMagnet: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.45,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToLeadMagnet }) => {
  const { t, lang } = useI18n();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-8 overflow-hidden">
      {/* Interactive Canvas Shader */}
      <HeroCanvasShader />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-[#D4AF37]/5 blur-[100px] pointer-events-none rounded-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        {/* Modern "Under Construction // En Construcción" Status Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-4 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-violet-500/15 border border-amber-500/40 shadow-lg shadow-amber-500/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-amber-400">
            {lang === 'es'
              ? 'Plataforma en Construcción // Lanzamiento Q2 2026'
              : lang === 'fr'
              ? 'Plateforme en Construction // Lancement Q2 2026'
              : 'Platform Under Construction // Launching Q2 2026'}
          </span>
          <span className="hidden sm:inline text-slate-500" aria-hidden="true">•</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 hidden sm:inline">
            {lang === 'es'
              ? 'Ingeniería 87% Completada'
              : lang === 'fr'
              ? 'Ingénierie à 87% Finalisée'
              : '87% Core Systems Completed'}
          </span>
        </motion.div>

        {/* Subtle unboxed metadata kicker */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-mono mb-6 tracking-wide"
        >
          <span className="text-blue-400 font-semibold">{t.hero.kicker}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{t.hero.location}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-emerald-400 font-medium">{t.hero.compliance}</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight text-balance max-w-4xl mb-6"
        >
          {t.hero.headlinePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-[#D4AF37]">
            {t.hero.headlineGradient}
          </span>
        </motion.h1>

        {/* Subtitle / Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-lg lg:text-xl text-slate-300/90 leading-relaxed max-w-2xl text-balance mb-10 font-normal"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Action CTAs with Magnetic Effect */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              data-cursor="button"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-medium text-sm tracking-wide shadow-xl shadow-blue-900/30 hover:shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              onClick={onScrollToLeadMagnet}
              data-cursor="button"
              className="w-full sm:w-auto px-7 py-4 glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white rounded-xl font-medium text-sm tracking-wide border border-white/10 hover:border-violet-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.secondaryCta}</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Quantitative Proof Strip with Staggered Motion */}
        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-left"
        >
          <motion.div
            variants={statItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl glass-panel transition-colors hover:border-blue-500/30"
          >
            <div className="font-mono text-2xl lg:text-3xl font-bold text-white tabular-nums">
              &lt; 90ms
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">
              {t.hero.metricTtfb}
            </div>
          </motion.div>

          <motion.div
            variants={statItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl glass-panel transition-colors hover:border-blue-500/30"
          >
            <div className="font-mono text-2xl lg:text-3xl font-bold text-blue-400 tabular-nums">
              +42%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">
              {t.hero.metricConversion}
            </div>
          </motion.div>

          <motion.div
            variants={statItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl glass-panel transition-colors hover:border-violet-500/30"
          >
            <div className="font-mono text-2xl lg:text-3xl font-bold text-violet-400 tabular-nums">
              100/100
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans">
              {t.hero.metricLighthouse}
            </div>
          </motion.div>

          <motion.div
            variants={statItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl glass-panel transition-colors hover:border-[#D4AF37]/30"
          >
            <div className="font-mono text-2xl lg:text-3xl font-bold text-[#D4AF37] tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.hero.metricLegal}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
