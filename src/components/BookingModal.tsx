import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'SaaS Full-Stack',
    budget: '10.000€ - 25.000€',
    timeline: '1 a 2 meses',
    projectDetails: '',
    rgpdConsent: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Por favor introduce un email profesional válido / Please enter a valid email.');
      return;
    }

    if (!formData.rgpdConsent) {
      setStatus('error');
      setErrorMessage('Debes aceptar los términos de privacidad y consentimiento RGPD/LSSI.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No se pudo procesar la reserva.');
      }

      setBookingResponse(data);
      setStatus('success');
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Error de conexión.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] glass-panel rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-[#07070f]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-syne font-bold text-white text-base">
              {t.bookingModal.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {status === 'success' ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.bookingModal.successBadge}</span>
              </div>

              <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
                {t.bookingModal.successTitle}, {formData.name || ''}
              </h3>

              <p className="font-sans text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                {t.bookingModal.successDesc}
              </p>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-slate-400 w-full max-w-sm mb-6">
                <div>Ref: {bookingResponse?.bookingId || 'AURA-BK-2026'}</div>
                <div>{t.bookingModal.channelInfo}</div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {t.bookingModal.closeButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300">
                {t.bookingModal.subtitle}
              </p>

              {status === 'error' && errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.bookingModal.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.emailLabel} <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.bookingModal.emailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t.bookingModal.companyPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="SaaS Full-Stack">SaaS Full-Stack & Platforms</option>
                    <option value="Agentes de IA">AI Agents & Autonomous Pipelines</option>
                    <option value="Optimización Core Web Vitals">Core Web Vitals & Latency Tuning</option>
                    <option value="Mantenimiento y RGPD">Enterprise SLA & GDPR Shield</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.budgetLabel}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="5.000€ - 10.000€">5.000€ - 10.000€</option>
                    <option value="10.000€ - 25.000€">10.000€ - 25.000€</option>
                    <option value="25.000€ - 50.000€">25.000€ - 50.000€</option>
                    <option value="+50.000€">+50.000€ (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.bookingModal.timelineLabel}
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Inmediato (< 3 semanas)">&lt; 3 weeks / Inmediato / Immédiat</option>
                    <option value="1 a 2 meses">1 - 2 months / mois / meses</option>
                    <option value="3 a 6 meses">3 - 6 months / mois / meses</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  {t.bookingModal.detailsLabel}
                </label>
                <textarea
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder={t.bookingModal.detailsPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.rgpdConsent}
                    onChange={(e) => setFormData({ ...formData, rgpdConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-400 leading-normal">
                    {t.bookingModal.consentText}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-900/30 transition-all duration-200 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>{t.bookingModal.submittingButton}</span>
                ) : (
                  <>
                    <span>{t.bookingModal.submitButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
