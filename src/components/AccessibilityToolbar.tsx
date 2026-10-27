import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { useAccessibility, ThemeMode, FontScale } from '../context/AccessibilityContext';
import { useI18n } from '../i18n/I18nContext';

export const AccessibilityToolbar: React.FC = () => {
  const { theme, setTheme, fontScale, setFontScale } = useAccessibility();
  const { lang } = useI18n();

  const labels = {
    es: {
      theme: 'Tema visual',
      dark: 'Modo Oscuro',
      light: 'Modo Claro',
      contrast: 'Alto Contraste WCAG AAA',
      font: 'Tamaño de texto',
      fontSmall: 'Reducir tamaño de fuente (A-)',
      fontMedium: 'Tamaño de fuente estándar (A)',
      fontLarge: 'Aumentar tamaño de fuente (A+)',
    },
    en: {
      theme: 'Theme Mode',
      dark: 'Dark Mode',
      light: 'Light Mode',
      contrast: 'High Contrast WCAG AAA',
      font: 'Font Size',
      fontSmall: 'Decrease font size (A-)',
      fontMedium: 'Standard font size (A)',
      fontLarge: 'Increase font size (A+)',
    },
    fr: {
      theme: 'Thème visuel',
      dark: 'Mode Sombre',
      light: 'Mode Clair',
      contrast: 'Contraste Élevé WCAG AAA',
      font: 'Taille du texte',
      fontSmall: 'Réduire la police (A-)',
      fontMedium: 'Taille normale (A)',
      fontLarge: 'Agrandir la police (A+)',
    },
  }[lang] || {
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    contrast: 'High Contrast',
    font: 'Font Size',
    fontSmall: 'Decrease (A-)',
    fontMedium: 'Normal (A)',
    fontLarge: 'Increase (A+)',
  };

  return (
    <aside
      aria-label="Controles de accesibilidad / Accessibility Controls"
      className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 p-1.5 glass-panel rounded-2xl border border-white/15 shadow-xl bg-black/70 backdrop-blur-lg"
    >
      {/* Theme Controls */}
      <div className="flex items-center gap-1 p-0.5 bg-white/5 rounded-xl border border-white/10" role="group" aria-label={labels.theme}>
        <button
          onClick={() => setTheme('dark')}
          aria-label={labels.dark}
          title={labels.dark}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'dark' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setTheme('light')}
          aria-label={labels.light}
          title={labels.light}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'light' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setTheme('contrast')}
          aria-label={labels.contrast}
          title={labels.contrast}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'contrast' ? 'bg-yellow-400 text-black font-bold shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="h-4 w-[1px] bg-white/20" aria-hidden="true" />

      {/* Font Size Scaling Controls */}
      <div className="flex items-center gap-1 p-0.5 bg-white/5 rounded-xl border border-white/10" role="group" aria-label={labels.font}>
        <button
          onClick={() => setFontScale('sm')}
          aria-label={labels.fontSmall}
          title={labels.fontSmall}
          className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded-lg transition-colors cursor-pointer ${
            fontScale === 'sm' ? 'bg-white/25 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          A-
        </button>

        <button
          onClick={() => setFontScale('md')}
          aria-label={labels.fontMedium}
          title={labels.fontMedium}
          className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
            fontScale === 'md' ? 'bg-white/25 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          A
        </button>

        <button
          onClick={() => setFontScale('lg')}
          aria-label={labels.fontLarge}
          title={labels.fontLarge}
          className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
            fontScale === 'lg' ? 'bg-white/25 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          A+
        </button>
      </div>
    </aside>
  );
};
