import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe, Sun, Moon } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useI18n } from '../i18n/I18nContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useAccessibility();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const languages: { id: Language; label: string }[] = [
    { id: 'fr', label: 'FR' },
    { id: 'en', label: 'EN' },
    { id: 'es', label: 'ES' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3.5 flex items-center justify-between gap-6 sm:gap-8 shadow-2xl shadow-black/60 border border-white/10">
        {/* Zone 1: Brand Wordmark with Magnetic Feel */}
        <Magnetic strength={0.15}>
          <a
            href="#"
            data-cursor="link"
            className="font-syne text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-[#D4AF37]">
              AURA
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-medium">
              STUDIO
            </span>
          </a>
        </Magnetic>

        {/* Zone 2: Clean single-line navigation links with Magnetic effect */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Magnetic strength={0.25}>
            <a
              href="#servicios"
              data-cursor="link"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 block px-2 py-1"
            >
              {t.nav.services}
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#proyectos"
              data-cursor="link"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 block px-2 py-1"
            >
              {t.nav.caseStudies}
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#faq"
              data-cursor="link"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 block px-2 py-1"
            >
              {t.nav.faq}
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="#guia"
              data-cursor="link"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-blue-400/90 hover:text-blue-300 flex items-center gap-1 block px-2 py-1"
            >
              {t.nav.guide}
            </a>
          </Magnetic>
        </nav>

        {/* Zone 3: Language Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-black/50 border border-white/10 rounded-lg text-[11px] font-mono">
            {languages.map((item) => (
              <button
                key={item.id}
                onClick={() => setLang(item.id)}
                data-cursor="button"
                className={`px-2 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                  lang === item.id
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Passer en ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Streamlined Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            data-cursor="button"
            aria-label={theme === 'dark' ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
            title={theme === 'dark' ? 'Modo Claro / Light' : 'Modo Oscuro / Dark'}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-black/50 border border-white/10 text-slate-300 hover:text-white hover:border-blue-400/40 transition-all cursor-pointer shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <Sun
              className={`w-4 h-4 text-amber-400 transition-all duration-300 ${
                theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50 absolute pointer-events-none'
              }`}
            />
            <Moon
              className={`w-4 h-4 text-blue-300 transition-all duration-300 ${
                theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50 absolute pointer-events-none'
              }`}
            />
          </button>

          {/* Primary CTA */}
          <Magnetic strength={0.3}>
            <button
              onClick={onOpenBooking}
              data-cursor="button"
              className="relative group px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white rounded-xl overflow-hidden whitespace-nowrap shrink-0 transition-transform duration-200 active:scale-95 cursor-pointer block"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-600 to-[#D4AF37] p-[1px] rounded-xl pointer-events-none">
                <span className="block w-full h-full bg-[#0a0a14] rounded-[11px] group-hover:bg-opacity-80 transition-all duration-300" />
              </span>
              <span className="relative flex items-center gap-1.5 z-10 text-slate-100 group-hover:text-white">
                <span className="hidden sm:inline">{t.nav.bookConsultation}</span>
                <span className="sm:hidden">Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </Magnetic>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl glass-panel rounded-xl p-5 border border-white/10 flex flex-col gap-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Langue / Language / Idioma:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Activar Modo Claro' : 'Activar Modo Oscuro'}
                className="flex items-center justify-center p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-white"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>
              <div className="flex items-center gap-1">
                {languages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLang(item.id)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                      lang === item.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-white py-1"
          >
            {t.nav.services}
          </a>
          <a
            href="#proyectos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-white py-1"
          >
            {t.nav.caseStudies}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-200 hover:text-white py-1"
          >
            {t.nav.faq}
          </a>
          <a
            href="#guia"
            onClick={() => setMobileMenuOpen(false)}
            className="text-blue-400 hover:text-blue-300 py-1"
          >
            {t.nav.guide}
          </a>
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider text-center"
            >
              {t.nav.bookConsultation}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
