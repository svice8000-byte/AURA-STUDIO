import React from 'react';
import { TrendingUp, Quote, Shield } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const SocialProof: React.FC = () => {
  const { t } = useI18n();

  return (
    <section id="testimonios" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Logos Strip (Spanish & European Tech Ecosystem) */}
      <div className="mb-20 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-8">
          {t.socialProof.trustedBy}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="font-syne font-bold text-xl tracking-wider text-slate-300">
            NOVAFLOW<span className="text-blue-500">.</span>TECH
          </div>
          <div className="font-syne font-bold text-xl tracking-wider text-slate-300">
            SECURITAS<span className="text-violet-500">_</span>CLOUD
          </div>
          <div className="font-syne font-bold text-xl tracking-wider text-slate-300">
            IBERICA<span className="text-[#D4AF37]">·</span>PAY
          </div>
          <div className="font-syne font-bold text-xl tracking-wider text-slate-300">
            TALENT<span className="text-blue-400">PULSE</span>
          </div>
          <div className="font-syne font-bold text-xl tracking-wider text-slate-300">
            METRIC<span className="text-emerald-400">LAB</span>
          </div>
        </div>
      </div>

      {/* Proof Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          {t.socialProof.kicker}
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.socialProof.title}
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-400 mt-3">
          {t.socialProof.subtitle}
        </p>
      </div>

      {/* Testimonials Grid with Concrete KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Case 1: Novaflow Tech */}
        <div className="glass-panel rounded-2xl p-8 relative flex flex-col justify-between border border-white/10 hover:border-blue-500/30 transition-all duration-300">
          <div>
            {/* KPI Banner */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">
                    {t.socialProof.case1.metric}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {t.socialProof.case1.metricLabel}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-blue-400 px-2.5 py-1 rounded bg-blue-950/40 border border-blue-800/40">
                {t.socialProof.case1.location}
              </span>
            </div>

            <Quote className="w-8 h-8 text-blue-500/20 mb-4" />
            <p className="font-sans text-slate-200 text-base leading-relaxed mb-8">
              &ldquo;{t.socialProof.case1.quote}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <img
              src="/src/assets/images/avatar_client_cto_1792926632010.jpg"
              alt={t.socialProof.case1.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border border-white/20"
            />
            <div>
              <div className="font-heading font-semibold text-white text-sm">
                {t.socialProof.case1.name}
              </div>
              <div className="text-xs text-slate-400">
                {t.socialProof.case1.role}
              </div>
            </div>
          </div>
        </div>

        {/* Case 2: Securitas Cloud SL */}
        <div className="glass-panel rounded-2xl p-8 relative flex flex-col justify-between border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
          <div>
            {/* KPI Banner */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-[#D4AF37] tabular-nums">
                    {t.socialProof.case2.metric}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {t.socialProof.case2.metricLabel}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] px-2.5 py-1 rounded bg-amber-950/30 border border-amber-800/40">
                {t.socialProof.case2.location}
              </span>
            </div>

            <Quote className="w-8 h-8 text-[#D4AF37]/20 mb-4" />
            <p className="font-sans text-slate-200 text-base leading-relaxed mb-8">
              &ldquo;{t.socialProof.case2.quote}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-syne font-bold text-white text-base border border-white/20">
              EL
            </div>
            <div>
              <div className="font-heading font-semibold text-white text-sm">
                {t.socialProof.case2.name}
              </div>
              <div className="text-xs text-slate-400">
                {t.socialProof.case2.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
