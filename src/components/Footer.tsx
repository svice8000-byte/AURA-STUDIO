import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface FooterProps {
  onOpenLegal: (type: 'aviso-legal' | 'privacidad' | 'cookies') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenBooking }) => {
  const { t } = useI18n();
  const [, setHovered] = useState(false);

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-8 border-t border-white/10 overflow-hidden bg-[#020204]">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Mission (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-syne text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-[#D4AF37]">
                AURA DIGITAL
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase">
                STUDIO
              </span>
            </div>

            <p className="font-sans text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <span>contacto@auradigital.es · legal@auradigital.es</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-white transition-colors">
                  {t.nav.caseStudies}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#guia" className="hover:text-white transition-colors text-blue-400">
                  {t.nav.guide}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.footer.legalTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {t.footer.legalDesc}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono">
              <button
                onClick={() => onOpenLegal('aviso-legal')}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                {t.footer.legalNotice}
              </button>
              <button
                onClick={() => onOpenLegal('privacidad')}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                {t.footer.privacy}
              </button>
              <button
                onClick={() => onOpenLegal('cookies')}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                {t.footer.cookies}
              </button>
            </div>
          </div>
        </div>

        {/* Massive Interactive Kinetic Typography Section */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onOpenBooking}
          className="relative py-16 sm:py-24 text-center cursor-pointer group select-none"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 group-hover:text-blue-400 transition-colors">
            {t.footer.kineticKicker}
          </div>

          <h2 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-600 group-hover:from-blue-400 group-hover:via-violet-400 group-hover:to-[#D4AF37] transition-all duration-700">
            {t.footer.kineticText}
          </h2>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
            <span>{t.footer.kineticCta}</span>
            <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} AURA Digital Studio SL. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <span>Madrid · Barcelona · Paris · London</span>
            <span>·</span>
            <span>TypeScript / React 19 / Node</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
