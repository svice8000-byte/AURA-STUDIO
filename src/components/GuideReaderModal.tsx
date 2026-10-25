import React, { useState } from 'react';
import { X, CheckCircle, BookOpen, Printer, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface GuideReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorItem {
  num: string;
  titles: { es: string; en: string; fr: string };
  descriptions: { es: string; en: string; fr: string };
  solutions: { es: string; en: string; fr: string };
  impacts: { es: string; en: string; fr: string };
}

const ERRORS: ErrorItem[] = [
  {
    num: '01',
    titles: {
      es: 'Copiar la estética B2C sin una arquitectura de decisión B2B',
      en: 'Copying consumer B2C aesthetics without a B2B decision architecture',
      fr: 'Copier l’esthétique B2C sans architecture de décision B2B',
    },
    descriptions: {
      es: 'Muchos sitios B2B copian plantillas minimalistas sin botones de contacto claros, sin casos de uso por rol (ej. Compras vs CTO) y sin respuestas técnicas inmediatas. Los compradores corporativos buscan certidumbre técnica, no fuegos artificiales sin sustancia.',
      en: 'Many B2B websites replicate generic consumer landing pages lacking clear technical proof, stakeholder routing (CTO vs CFO), and rapid answers. Enterprise buyers look for verifiable competence, not superficial decoration.',
      fr: 'De nombreux sites B2B copient des templates grand public sans preuves techniques, sans parcours par persona (CTO vs DSI vs Achats) ni réponses immédiates. Les décideurs corporate recherchent de la certitude technique, pas des artifices creux.',
    },
    solutions: {
      es: 'Crea rutas diferenciadas por avatar de compra (CTO, CFO, Head of Ops) y proporciona fichas técnicas descargables sin fricción.',
      en: 'Architect differentiated buyer journeys by persona and provide self-serve technical whitepapers and specifications.',
      fr: 'Concevez des parcours ciblés par rôle décisionnaire et mettez à disposition des fiches d’architecture téléchargeables sans friction.',
    },
    impacts: {
      es: '+28% cualificación de leads',
      en: '+28% qualified lead velocity',
      fr: '+28% de qualification des leads',
    },
  },
  {
    num: '02',
    titles: {
      es: 'Tiempos de carga superiores a 2.5 segundos en redes corporativas',
      en: 'Load times exceeding 2.5 seconds behind enterprise corporate firewalls',
      fr: 'Temps de chargement supérieurs à 2.5s derrière les réseaux d’entreprise',
    },
    descriptions: {
      es: 'En el entorno B2B, los decisores abren 5 pestañas de proveedores concurrentemente. Si tu web tarda 3 segundos en mostrar el primer contenido relevante (LCP), serás cerrado antes de ser leído.',
      en: 'Enterprise evaluators open 5 competing vendor tabs in parallel. If your LCP takes over 2.5s to render, your tab is closed before reading.',
      fr: 'Les évaluateurs ouvrent 5 onglets de concurrents simultanément. Si votre LCP dépasse 2.5 secondes, l’onglet est fermé avant même d’être lu.',
    },
    solutions: {
      es: 'Optimiza el árbol de dependencias, implementa Server-Side Rendering (SSR) y sirve recursos desde CDNs distribuidas con compresión Brotli.',
      en: 'Prune third-party scripts, deploy Server-Side Rendering (SSR), and deliver compressed Brotli assets across edge networks.',
      fr: 'Nettoyez les dépendances superflues, appliquez le SSR et distribuez vos assets compressés en Brotli sur des CDNs edge.',
    },
    impacts: {
      es: 'Reducción del 35% en rebote',
      en: '35% drop in bounce rate',
      fr: 'Baisse de 35% du taux de rebond',
    },
  },
  {
    num: '03',
    titles: {
      es: 'Incumplir la normativa española LSSI-CE y el RGPD europeo',
      en: 'Non-compliance with European GDPR and Spanish LSSI directives',
      fr: 'Non-conformité aux exigences européennes RGPD et LSSI',
    },
    descriptions: {
      es: 'Instalar cookies de seguimiento antes de que el usuario haga clic en "Aceptar", o recopilar emails sin casilla no premarcada, expone a multas de la AEPD que oscilan entre 30.000€ y 300.000€.',
      en: 'Firing tracking pixels prior to explicit affirmative consent or using pre-ticked opt-in boxes exposes businesses to heavy EU regulatory fines.',
      fr: 'Déclencher des pixels traceurs avant consentement explicite ou collecter des emails via des cases pré-cochées expose à de lourdes sanctions de la CNIL/AEPD.',
    },
    solutions: {
      es: 'Bloqueo previo estricto de scripts mediante consent managers auditados y cláusula informativa de primera capa visible.',
      en: 'Implement hard script pre-blocking and clear dual-layer GDPR informational notices on every data capture point.',
      fr: 'Mettez en place un blocage amont strict des scripts et des mentions informatives complètes à deux niveaux.',
    },
    impacts: {
      es: '100% blindaje jurídico frente a inspecciones',
      en: '100% audit-proof regulatory compliance',
      fr: 'Blindage juridique à 100% en cas d’audit',
    },
  },
  {
    num: '04',
    titles: {
      es: 'Formularios con demasiados campos en la primera interacción',
      en: 'High-friction forms demanding too much data on step one',
      fr: 'Formulaires surchargés dès le premier point de contact',
    },
    descriptions: {
      es: 'Pedir número de teléfono, cargo, presupuesto y dirección postal en el primer contacto reduce la conversión hasta un 60%.',
      en: 'Demanding phone numbers, mailing addresses, and exact budgets upfront depresses inbound submission rates by up to 60%.',
      fr: 'Demander téléphone, budget exact et adresse dès le premier formulaire fait chuter les conversions de près de 60%.',
    },
    solutions: {
      es: 'Pide solo Nombre y Email profesional en la primera etapa. Enriquece los datos en la segunda interacción.',
      en: 'Request only Name and Corporate Email on step one. Progressively enrich prospect data during discovery.',
      fr: 'Limitez le premier palier au Nom et Email corporate. Enrichissez les données lors de la seconde phase.',
    },
    impacts: {
      es: '+45% de volumen de leads iniciales',
      en: '+45% initial lead volume',
      fr: '+45% d’inscriptions qualifiées',
    },
  },
  {
    num: '05',
    titles: {
      es: 'Falta de pruebas sociales con métricas cuantificables',
      en: 'Vague social proof devoid of quantifiable business outcomes',
      fr: 'Preuves sociales vagues sans chiffres concrets',
    },
    descriptions: {
      es: 'Frases genéricas como "Empresa líder y de confianza" no convencen a directores financieros ni directores de compras.',
      en: 'Empty generic quotes like "A trusted digital partner" fail to persuade financial controllers or buying committees.',
      fr: 'Les citations génériques comme "Partenaire de confiance" ne convainquent ni les DSI ni les directeurs financiers.',
    },
    solutions: {
      es: 'Expresa los testimonios con cifras concretas: "Redujimos la latencia un 65% y aumentamos el pipeline un 42% en 90 días".',
      en: 'Attribute testimonials with verified KPIs: e.g. "-65% server response latency, +42% pipeline closed in 90 days".',
      fr: 'Associez chaque témoignage à un KPI chiffré : "-65% de latence et +42% de conversion en 90 jours".',
    },
    impacts: {
      es: '+3.2x credibilidad percibida',
      en: '+3.2x perceived credibility',
      fr: '+3.2x de crédibilité perçue',
    },
  },
];

export const GuideReaderModal: React.FC<GuideReaderModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useI18n();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrintOrDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-[#07070e]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="font-syne font-bold text-white text-sm sm:text-base">
              {t.guideReader.modalTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintOrDownload}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.guideReader.printButton}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 font-sans">
          {downloadSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Print/PDF dialog initiated. You can save as PDF directly.</span>
            </div>
          )}

          {/* Guide Cover Introduction */}
          <div className="border-b border-white/10 pb-8">
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.guideReader.kicker}</span>
            </div>
            <h1 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {t.guideReader.guideTitle}
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {t.guideReader.intro}
            </p>
          </div>

          {/* Errors List */}
          <div className="space-y-6">
            {ERRORS.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-2xl font-bold text-blue-400 shrink-0 tabular-nums">
                    {item.num}.
                  </span>
                  <div className="space-y-3 flex-1">
                    <h3 className="font-syne text-lg font-bold text-white">
                      {item.titles[lang]}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.descriptions[lang]}
                    </p>

                    <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-200">
                      <strong className="text-white">{t.guideReader.solutionLabel}</strong> {item.solutions[lang]}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t.guideReader.impactLabel} {item.impacts[lang]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concluding CTA inside Guide */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-violet-900/40 to-transparent border border-white/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-syne text-xl font-bold text-white mb-2">
                {t.guideReader.ctaBannerTitle}
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                {t.guideReader.ctaBannerDesc}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                const bookingEl = document.getElementById('reservar');
                if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer shadow-lg shadow-blue-950/50"
            >
              {t.guideReader.ctaBannerButton}
            </button>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400">
          <span>{t.guideReader.footerText}</span>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-400 font-mono transition-colors cursor-pointer"
          >
            {t.guideReader.closeText}
          </button>
        </div>
      </div>
    </div>
  );
};
