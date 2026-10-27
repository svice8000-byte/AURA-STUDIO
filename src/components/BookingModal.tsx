import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const normalizeService = (srv?: string): string => {
  if (!srv) return '';
  const s = srv.toLowerCase();
  if (s === 'landing-page' || s.includes('landing')) return 'landing-page';
  if (s === 'site-vitrine' || s.includes('vitrine') || s.includes('showcase')) return 'site-vitrine';
  if (s === 'refonte-web' || s.includes('refonte') || s.includes('moderniz') || s.includes('redesign') || s.includes('mantenimiento') || s.includes('sla')) return 'refonte-web';
  if (s === 'site-institutionnel' || s.includes('corporate') || s.includes('institution') || s.includes('multi')) return 'site-institutionnel';
  if (s === 'saas-platform' || s.includes('saas') || s.includes('platform')) return 'saas-platform';
  if (s === 'web-app' || s.includes('app') || s.includes('sur-mesure') || s.includes('medida')) return 'web-app';
  if (s === 'portail-client' || s.includes('portail') || s.includes('portal') || s.includes('membre') || s.includes('member')) return 'portail-client';
  if (s === 'api-integration' || s.includes('api') || s.includes('agent') || s.includes('ia') || s.includes('ai')) return 'api-integration';
  if (s === 'ui-ux-design' || s.includes('design') || s.includes('prototype') || s.includes('ui') || s.includes('ux')) return 'ui-ux-design';
  if (s === 'audit-performance' || s.includes('audit') || s.includes('vital') || s.includes('perf')) return 'audit-performance';
  return srv;
};

export const SERVICE_PRICING_MAP: Record<
  string,
  { label: string; price: string; group: string }
> = {
  'landing-page': {
    label: 'Landing Page Haute Conversion',
    price: '500 € - 2.500 €',
    group: 'Solutions Web',
  },
  'site-vitrine': {
    label: 'Site Vitrine Sur-Mesure',
    price: '800 € - 6.500 €',
    group: 'Solutions Web',
  },
  'refonte-web': {
    label: 'Refonte & Modernisation Web',
    price: '1.500 € - 5.000 €',
    group: 'Solutions Web',
  },
  'site-institutionnel': {
    label: 'Site Corporate Multi-langues',
    price: '2.000 € - 8.000 €',
    group: 'Solutions Web',
  },
  'saas-platform': {
    label: 'SaaS Full-Stack & Plateformes',
    price: '15.000 € - 45.000 €+',
    group: 'Ingénierie & SaaS',
  },
  'web-app': {
    label: 'Application Web Sur-Mesure',
    price: '8.000 € - 25.000 €',
    group: 'Ingénierie & SaaS',
  },
  'portail-client': {
    label: 'Portail Client / Espace Membre',
    price: '6.000 € - 18.000 €',
    group: 'Ingénierie & SaaS',
  },
  'api-integration': {
    label: 'Architecture & APIs',
    price: '4.000 € - 12.000 €',
    group: 'Ingénierie & SaaS',
  },
  'ui-ux-design': {
    label: 'Design UI/UX & Prototypes',
    price: '1.000 € - 4.000 €',
    group: 'Design & Audit',
  },
  'audit-performance': {
    label: 'Audit Technique & Performance',
    price: '900 € - 1.500 €',
    group: 'Design & Audit',
  },
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const { t } = useI18n();

  const initialService = normalizeService(preselectedService) || '';
  const initialBudget = initialService && SERVICE_PRICING_MAP[initialService]
    ? SERVICE_PRICING_MAP[initialService].price
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService,
    budget: initialBudget,
    timeline: '1 a 2 meses',
    projectDetails: '',
    rgpdConsent: false,
  });

  useEffect(() => {
    if (preselectedService) {
      const normalized = normalizeService(preselectedService);
      setFormData((prev) => ({
        ...prev,
        service: normalized,
        budget: SERVICE_PRICING_MAP[normalized]?.price || prev.budget,
      }));
    }
  }, [preselectedService, isOpen]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceKey = e.target.value;
    const matchingPrice = SERVICE_PRICING_MAP[selectedServiceKey]?.price;
    setFormData((prev) => ({
      ...prev,
      service: selectedServiceKey,
      budget: matchingPrice || prev.budget,
    }));
  };

  const activeServiceInfo = formData.service ? SERVICE_PRICING_MAP[formData.service] : null;

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

    if (!formData.service) {
      setStatus('error');
      setErrorMessage('Veuillez sélectionner un service requis / Por favor selecciona un servicio.');
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
                  <label htmlFor="service-select" className="block text-xs font-mono text-slate-300 mb-1.5 font-medium">
                    Service Requis <span className="text-blue-400">*</span>
                  </label>
                  <select
                    id="service-select"
                    name="service"
                    value={formData.service}
                    onChange={handleServiceChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="" disabled>Sélectionnez un service...</option>
                    
                    <optgroup label="Solutions Web" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="landing-page" className="bg-[#07070f] text-white">Landing Page Haute Conversion (500 € - 2.500 €)</option>
                      <option value="site-vitrine" className="bg-[#07070f] text-white">Site Vitrine Sur-Mesure (800 € - 6.500 €)</option>
                      <option value="refonte-web" className="bg-[#07070f] text-white">Refonte & Modernisation Web (1.500 € - 5.000 €)</option>
                      <option value="site-institutionnel" className="bg-[#07070f] text-white">Site Corporate Multi-langues (2.000 € - 8.000 €)</option>
                    </optgroup>
                    
                    <optgroup label="Ingénierie & SaaS" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="saas-platform" className="bg-[#07070f] text-white">SaaS Full-Stack & Plateformes (15.000 € - 45.000 €+)</option>
                      <option value="web-app" className="bg-[#07070f] text-white">Application Web Sur-Mesure (8.000 € - 25.000 €)</option>
                      <option value="portail-client" className="bg-[#07070f] text-white">Portail Client / Espace Membre (6.000 € - 18.000 €)</option>
                      <option value="api-integration" className="bg-[#07070f] text-white">Architecture & APIs (4.000 € - 12.000 €)</option>
                    </optgroup>
                    
                    <optgroup label="Design & Audit" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="ui-ux-design" className="bg-[#07070f] text-white">Design UI/UX & Prototypes (1.000 € - 4.000 €)</option>
                      <option value="audit-performance" className="bg-[#07070f] text-white">Audit Technique & Performance (900 € - 1.500 €)</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="budget-select" className="block text-xs font-mono text-slate-300 font-medium">
                      {t.bookingModal.budgetLabel || 'Budget Estimé'} <span className="text-blue-400">*</span>
                    </label>
                    {activeServiceInfo && (
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/35 font-semibold">
                        {activeServiceInfo.price}
                      </span>
                    )}
                  </div>
                  <select
                    id="budget-select"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="" disabled>Sélectionnez un budget...</option>

                    <optgroup label="Tarifs par Service Requis (Solutions Web)" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="500 € - 2.500 €" className="bg-[#07070f] text-white">500 € - 2.500 € (Landing Page Haute Conversion)</option>
                      <option value="800 € - 6.500 €" className="bg-[#07070f] text-white">800 € - 6.500 € (Site Vitrine Sur-Mesure)</option>
                      <option value="1.500 € - 5.000 €" className="bg-[#07070f] text-white">1.500 € - 5.000 € (Refonte & Modernisation Web)</option>
                      <option value="2.000 € - 8.000 €" className="bg-[#07070f] text-white">2.000 € - 8.000 € (Site Corporate Multi-langues)</option>
                    </optgroup>

                    <optgroup label="Tarifs par Service Requis (Ingénierie & SaaS)" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="15.000 € - 45.000 €+" className="bg-[#07070f] text-white">15.000 € - 45.000 €+ (SaaS Full-Stack & Plateformes)</option>
                      <option value="8.000 € - 25.000 €" className="bg-[#07070f] text-white">8.000 € - 25.000 € (Application Web Sur-Mesure)</option>
                      <option value="6.000 € - 18.000 €" className="bg-[#07070f] text-white">6.000 € - 18.000 € (Portail Client / Espace Membre)</option>
                      <option value="4.000 € - 12.000 €" className="bg-[#07070f] text-white">4.000 € - 12.000 € (Architecture & APIs)</option>
                    </optgroup>

                    <optgroup label="Tarifs par Service Requis (Design & Audit)" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="1.000 € - 4.000 €" className="bg-[#07070f] text-white">1.000 € - 4.000 € (Design UI/UX & Prototypes)</option>
                      <option value="900 € - 1.500 €" className="bg-[#07070f] text-white">900 € - 1.500 € (Audit Technique & Performance)</option>
                    </optgroup>

                    <optgroup label="Enveloppes Globales & Enterprise" className="bg-[#0f111a] text-slate-300 font-semibold">
                      <option value="5.000 € - 10.000 €" className="bg-[#07070f] text-white">5.000 € - 10.000 € (Enveloppe Globale PME)</option>
                      <option value="10.000 € - 25.000 €" className="bg-[#07070f] text-white">10.000 € - 25.000 € (Projet Structuré)</option>
                      <option value="25.000 € - 50.000 €" className="bg-[#07070f] text-white">25.000 € - 50.000 € (Programme Digital Avancé)</option>
                      <option value="+50.000 € (Enterprise)" className="bg-[#07070f] text-white">+50.000 € (Enterprise Custom SLA)</option>
                    </optgroup>
                  </select>

                  {/* Dynamic Pricing Callout */}
                  {activeServiceInfo ? (
                    <div className="mt-2 p-2 rounded-lg bg-blue-950/40 border border-blue-500/25 text-[11px] font-mono flex items-center justify-between text-slate-300">
                      <span className="truncate">Tarif indicatif du service :</span>
                      <span className="text-[#D4AF37] font-bold shrink-0 ml-2">{activeServiceInfo.price}</span>
                    </div>
                  ) : (
                    <div className="mt-2 text-[11px] font-mono text-slate-400">
                      💡 Chaque prix de service s’affiche et s’aligne ici automatiquement.
                    </div>
                  )}
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
