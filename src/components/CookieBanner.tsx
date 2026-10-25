import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesPolicy }) => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aura_cookie_consent');
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aura_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('aura_cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 shadow-2xl shadow-black/90 bg-[#0a0a14]/95">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <div className="font-syne font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
              <span>{t.cookies.title}</span>
            </div>
            <p className="font-sans text-[11px] sm:text-xs text-slate-300 mt-1 leading-normal">
              {t.cookies.desc}{' '}
              <button
                onClick={onOpenCookiesPolicy}
                className="text-blue-400 underline hover:text-blue-300 cursor-pointer inline"
              >
                {t.cookies.moreInfo}
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
          <button
            onClick={handleReject}
            className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.cookies.reject}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg text-xs font-mono font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/40 transition-colors cursor-pointer"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
