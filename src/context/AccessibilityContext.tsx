import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'contrast';
export type FontScale = 'sm' | 'md' | 'lg';

interface AccessibilityContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [fontScale, setFontScaleState] = useState<FontScale>('md');

  useEffect(() => {
    // Read persisted theme
    const savedTheme = localStorage.getItem('aura_theme') as ThemeMode | null;
    if (savedTheme && ['dark', 'light', 'contrast'].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }

    // Read persisted font scale
    const savedScale = localStorage.getItem('aura_font_scale') as FontScale | null;
    if (savedScale && ['sm', 'md', 'lg'].includes(savedScale)) {
      setFontScaleState(savedScale);
      applyFontScale(savedScale);
    } else {
      applyFontScale('md');
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-contrast', 'dark');
    if (mode === 'dark') {
      root.classList.add('dark', 'theme-dark');
    } else if (mode === 'light') {
      root.classList.add('theme-light');
    } else if (mode === 'contrast') {
      root.classList.add('theme-contrast');
    }
  };

  const applyFontScale = (scale: FontScale) => {
    const root = document.documentElement;
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg');
    root.classList.add(`font-scale-${scale}`);
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('aura_theme', mode);
    applyTheme(mode);
  };

  const setFontScale = (scale: FontScale) => {
    setFontScaleState(scale);
    localStorage.setItem('aura_font_scale', scale);
    applyFontScale(scale);
  };

  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, fontScale, setFontScale }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
