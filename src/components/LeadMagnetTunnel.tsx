import React, { useState } from 'react';
import { Download, ShieldCheck, CheckCircle2, FileText, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface LeadMagnetTunnelProps {
  onOpenGuideReader: () => void;
  onOpenPrivacyModal: () => void;
}

export const LeadMagnetTunnel: React.FC<LeadMagnetTunnelProps> = ({
  onOpenGuideReader,
  onOpenPrivacyModal,
}) => {
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Auditoría Web & Arquitectura',
    rgpdConsent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Por favor introduce un correo profesional válido / Please enter a valid email.');
      return;
    }

    if (!formData.rgpdConsent) {
      setStatus('error');
      setErrorMessage('Debes marcar la casilla obligatoria de consentimiento RGPD/LSSI.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'funnel_landing_leadmagnet',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ocurrió un error al procesar tu solicitud.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Error de conexión.');
    }
  };

  return (
    <section id="guia" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-[#D4AF37]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/15 overflow-hidden shadow-2xl shadow-black/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Offer & Mockup Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.leadMagnet.kicker}</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              {t.leadMagnet.title}
            </h2>

            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {t.leadMagnet.subtitle}
            </p>

            {/* Visual Book Cover Preview with 3D shadow */}
            <div className="relative max-w-[260px] sm:max-w-[300px] my-4 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-[#D4AF37] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                <img
                  src="/src/assets/images/leadmagnet_guide_cover_1792926631364.jpg"
                  alt="Guide Cover"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-4">
              <span>{t.leadMagnet.pdfPages}</span>
              <span>·</span>
              <span>{t.leadMagnet.readTime}</span>
              <span>·</span>
              <span className="text-emerald-400">{t.leadMagnet.immediateAccess}</span>
            </div>
          </div>

          {/* Right Column: Capture Form or Success State (7 Cols) */}
          <div className="lg:col-span-7">
            {status === 'success' ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-[#080812]/90 border border-emerald-500/30 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1">
                  {t.leadMagnet.success.badge}
                </div>
                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
                  {t.leadMagnet.success.title}
                </h3>
                <p className="font-sans text-slate-300 text-sm max-w-md mb-8">
                  {t.leadMagnet.success.body} <strong className="text-white font-mono">{formData.email}</strong>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={onOpenGuideReader}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/30 transition-transform active:scale-95"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.leadMagnet.success.readOnline}</span>
                  </button>

                  <button
                    onClick={onOpenGuideReader}
                    className="px-6 py-3.5 glass-panel hover:bg-white/[0.08] text-slate-200 hover:text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>{t.leadMagnet.success.downloadPdf}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      serviceInterest: 'Auditoría Web & Arquitectura',
                      rgpdConsent: false,
                    });
                  }}
                  className="mt-8 text-xs text-slate-500 hover:text-slate-300 transition-colors underline cursor-pointer"
                >
                  {t.leadMagnet.success.anotherRequest}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-2xl bg-[#090914]/80 border border-white/10 flex flex-col gap-5 shadow-xl"
              >
                <div>
                  <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2">
                    {t.leadMagnet.formTitle}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-400">
                    {t.leadMagnet.formSubtitle}
                  </p>
                </div>

                {status === 'error' && errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.leadMagnet.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.leadMagnet.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.leadMagnet.emailLabel} <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.leadMagnet.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Company & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.leadMagnet.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.leadMagnet.companyPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.leadMagnet.challengeLabel}
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="Auditoría Web & Arquitectura">{t.leadMagnet.challengeOptions.conversion}</option>
                      <option value="Rediseño Completo B2B">{t.leadMagnet.challengeOptions.redesign}</option>
                      <option value="Plataforma SaaS & Software">{t.leadMagnet.challengeOptions.saas}</option>
                      <option value="Integración de IA">{t.leadMagnet.challengeOptions.ai}</option>
                    </select>
                  </div>
                </div>

                {/* Mandatory RGPD / LSSI Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={formData.rgpdConsent}
                      onChange={(e) => setFormData({ ...formData, rgpdConsent: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-blue-600 focus:ring-blue-500 focus:ring-offset-black cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-slate-300 leading-normal select-none">
                      <strong className="text-white">{t.leadMagnet.consentText}</strong>: He leído y acepto la / I have read and agree to the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyModal}
                        className="text-blue-400 underline hover:text-blue-300 cursor-pointer inline"
                      >
                        {t.leadMagnet.privacyLinkText}
                      </button>{' '}
                      {t.leadMagnet.consentSuffix}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-900/40 transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.leadMagnet.submittingButton}</span>
                    </div>
                  ) : (
                    <>
                      <span>{t.leadMagnet.submitButton}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Legal Information Layer (First Layer) */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.leadMagnet.legalLayer.title}</span>
                  </div>
                  <div><strong>{t.leadMagnet.legalLayer.responsible}</strong></div>
                  <div><strong>{t.leadMagnet.legalLayer.purpose}</strong></div>
                  <div><strong>{t.leadMagnet.legalLayer.legalBasis}</strong></div>
                  <div><strong>{t.leadMagnet.legalLayer.recipients}</strong></div>
                  <div><strong>{t.leadMagnet.legalLayer.rights}</strong></div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
