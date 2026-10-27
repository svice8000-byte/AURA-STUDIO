import React, { useState, useEffect } from 'react';
import { Clock, Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const CountdownBanner: React.FC = () => {
  const { lang } = useI18n();

  // Target date: 14 days and 18 hours from now or fixed future date in 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    // Standard target timestamp for live countdown
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    targetDate.setHours(targetDate.getHours() + 18);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg('');

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setFeedbackMsg(
        lang === 'es'
          ? 'Por favor, introduce un correo corporativo válido.'
          : lang === 'fr'
          ? 'Veuillez saisir un email professionnel valide.'
          : 'Please enter a valid corporate email address.'
      );
      return;
    }

    setStatus('loading');

    try {
      // Simulate / POST to backend lead capture
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          company: 'Early Access Waitlist',
          serviceInterest: 'Lanzamiento Q1 2026 & Intake',
          rgpdConsent: true,
          source: 'countdown_newsletter_form',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error processing subscription.');
      }

      setStatus('success');
      setFeedbackMsg(
        lang === 'es'
          ? '¡Suscripción confirmada! Te notificaremos con prioridad antes de la apertura pública.'
          : lang === 'fr'
          ? 'Inscription confirmée ! Vous recevrez un accès prioritaire avant l’ouverture publique.'
          : 'Subscription confirmed! You will receive priority access before the public launch.'
      );
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setFeedbackMsg(
        err.message ||
          (lang === 'es'
            ? 'Error de conexión. Inténtalo de nuevo.'
            : lang === 'fr'
            ? 'Erreur de connexion. Veuillez réessayer.'
            : 'Connection error. Please try again.')
      );
    }
  };

  const copy = {
    es: {
      kicker: 'CONVOCATORIA SPRINT Q1 2026',
      title: 'Próxima Apertura de Plazas de Ingeniería B2B',
      subtitle:
        'Solo aceptamos 4 proyectos simultáneos por trimestre para garantizar Core Web Vitals 99+, arquitectura blindada y disponibilidad directa del ingeniero principal.',
      days: 'DÍAS',
      hours: 'HORAS',
      minutes: 'MIN',
      seconds: 'SEG',
      formTitle: 'Acceso Prioritario & Lista de Espera',
      placeholder: 'tu-email@empresa.com',
      submit: 'Solicitar Plaza Prioritaria',
      submitting: 'Registrando...',
      compliance: 'Sin spam. Conforme RGPD / LSSI. Cancelación en 1 clic.',
    },
    en: {
      kicker: 'Q1 2026 SPRINT INTAKE',
      title: 'Upcoming B2B Engineering Intake Opening',
      subtitle:
        'We strictly cap intake to 4 concurrent projects per quarter to guarantee 99+ Core Web Vitals, enterprise GDPR compliance, and dedicated principal engineering access.',
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MIN',
      seconds: 'SEC',
      formTitle: 'Priority Waitlist & Early Access',
      placeholder: 'name@yourcompany.com',
      submit: 'Join Priority Waitlist',
      submitting: 'Registering...',
      compliance: 'Zero spam. GDPR compliant. One-click unsubscribe.',
    },
    fr: {
      kicker: 'SESSION DE DÉVELOPPEMENT Q1 2026',
      title: 'Prochaine Ouverture des Projets B2B & SaaS',
      subtitle:
        'Nous limitons strictement chaque trimestre à 4 projets simultanés afin de garantir un score Core Web Vitals de 99+, un blindage RGPD et l’accès direct à l’ingénieur principal.',
      days: 'JOURS',
      hours: 'HEURES',
      minutes: 'MIN',
      seconds: 'SEC',
      formTitle: 'Liste d’Attente & Accès Prioritaire',
      placeholder: 'nom@entreprise.fr',
      submit: 'Réserver un Accès Prioritaire',
      submitting: 'Enregistrement...',
      compliance: 'Zéro spam. Conforme RGPD. Désabonnement en 1 clic.',
    },
  }[lang] || {
    kicker: 'SPRINT INTAKE 2026',
    title: 'Upcoming B2B Engineering Intake',
    subtitle: 'Limited to 4 projects per quarter for maximum performance and dedicated focus.',
    days: 'DAYS',
    hours: 'HOURS',
    minutes: 'MIN',
    seconds: 'SEC',
    formTitle: 'Priority Waitlist',
    placeholder: 'name@company.com',
    submit: 'Join Waitlist',
    submitting: 'Saving...',
    compliance: 'GDPR compliant. No spam.',
  };

  return (
    <section
      aria-label="Cuenta atrás de apertura e inscripción prioritaria"
      className="py-16 px-4 sm:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden bg-gradient-to-b from-[#090918]/90 to-[#04040a]/90 shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#D4AF37]/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Intake Copy & Countdown Cards (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{copy.kicker}</span>
            </div>

            <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {copy.title}
            </h2>

            <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-xl mb-8">
              {copy.subtitle}
            </p>

            {/* Live Countdown Cards Grid */}
            <div
              role="timer"
              aria-live="polite"
              className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg"
            >
              {[
                { label: copy.days, value: timeLeft.days },
                { label: copy.hours, value: timeLeft.hours },
                { label: copy.minutes, value: timeLeft.minutes },
                { label: copy.seconds, value: timeLeft.seconds },
              ].map((slot) => (
                <div
                  key={slot.label}
                  className="p-3 sm:p-4 rounded-2xl bg-black/50 border border-white/10 text-center flex flex-col justify-center items-center shadow-inner"
                >
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-white tabular-nums">
                    {String(slot.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                    {slot.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Engineering Build Milestone Tracker */}
            <div className="mt-7 pt-5 border-t border-white/10 max-w-lg">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {lang === 'es' ? 'Fase de Construcción B2B' : lang === 'fr' ? 'Phase de Construction B2B' : 'B2B Construction Phase'}
                </span>
                <span className="font-bold text-amber-400">87% COMPLETED</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 rounded-full w-[87%]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span>Architecture: Vite + React 19 ✓</span>
                <span>LSSI / RGPD: Validated ✓</span>
                <span>Launch: Q2 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Newsletter Signup Form (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#080814]/90 border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="font-syne font-bold text-white text-base sm:text-lg">
                {copy.formTitle}
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-6 font-sans">
              {lang === 'es'
                ? 'Recibe notificación anticipada 48h antes para agendar tu consulta técnica.'
                : lang === 'fr'
                ? 'Soyez prévenu 48h en avance pour planifier votre session technique.'
                : 'Get notified 48 hours early to reserve your discovery call slot.'}
            </p>

            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-0.5">
                    {lang === 'es' ? '¡Inscripción Exitosa!' : lang === 'fr' ? 'Inscription Validée !' : 'Priority Slot Reserved!'}
                  </div>
                  <div>{feedbackMsg}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                {status === 'error' && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2 text-xs text-red-300"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="countdown-email" className="sr-only">
                    {copy.placeholder}
                  </label>
                  <input
                    id="countdown-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40 transition-transform active:scale-95 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>{copy.submitting}</span>
                  ) : (
                    <>
                      <span>{copy.submit}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{copy.compliance}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
