import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useI18n } from '../i18n/I18nContext';

interface CaseStudiesProps {
  onOpenBooking: (serviceName?: string) => void;
}

interface CaseStudyData {
  id: string;
  num: string;
  category: 'fintech' | 'cloud' | 'ai';
  titles: { es: string; en: string; fr: string };
  categoryLabels: { es: string; en: string; fr: string };
  client: string;
  location: string;
  heroMetric: string;
  heroMetricLabels: { es: string; en: string; fr: string };
  descriptions: { es: string; en: string; fr: string };
  image: string;
  stack: string[];
  challenges: { es: string; en: string; fr: string };
  solutions: { es: string; en: string; fr: string };
  metrics: Array<{
    labels: { es: string; en: string; fr: string };
    value: string;
  }>;
  accentColor: string;
}

const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'case-1',
    num: '01',
    category: 'fintech',
    categoryLabels: {
      es: 'FinTech & Pagos B2B',
      en: 'FinTech & B2B Payments',
      fr: 'FinTech & Paiements B2B',
    },
    titles: {
      es: 'Plataforma de Pagos Institucionales & Terminal Analítica',
      en: 'Institutional Payment Platform & Analytics Terminal',
      fr: 'Plateforme de Paiements Institutionnels & Terminal Analytique',
    },
    client: 'IbericaPay Technologies SL',
    location: 'Madrid, ES',
    heroMetric: '+140%',
    heroMetricLabels: {
      es: 'Volumen Transaccionado en 6 Meses',
      en: 'Transaction Volume Growth in 6 Months',
      fr: 'Hausse du Volume Transactionné en 6 Mois',
    },
    descriptions: {
      es: 'Reingeniería completa del checkout institucional y dashboard analítico para transacciones B2B transfronterizas de alto ticket en la Eurozona.',
      en: 'Complete re-engineering of the institutional checkout and analytics dashboard for high-ticket cross-border B2B transactions across the Eurozone.',
      fr: 'Refonte complète du checkout institutionnel et du dashboard analytique pour les transactions B2B transfrontalières à fort montant dans la zone euro.',
    },
    image: '/src/assets/images/casestudy_fintech_portal_1792928494172.jpg',
    stack: ['React 19', 'Node.js', 'PostgreSQL', 'TLS 1.3', 'Tailwind CSS'],
    challenges: {
      es: 'La plataforma previa sufría caídas durante picos de conciliación bancaria y tardaba 4.2 segundos en validar pasarelas de pago SEPA, generando abandono en compradores corporativos.',
      en: 'The previous platform suffered downtime during bank reconciliation spikes and took 4.2 seconds to validate SEPA gateways, leading to drop-offs among corporate buyers.',
      fr: 'L’ancienne plateforme subissait des ralentissements lors des pics de conciliation bancaire et mettait 4.2 secondes à valider les passerelles SEPA, causant des abandons corporate.',
    },
    solutions: {
      es: 'Desarrollamos una arquitectura de microservicios con backend en Node.js de baja latencia, caching en memoria y un diseño en modo oscuro con visualización de datos financieros en tiempo real.',
      en: 'We engineered a microservice architecture with low-latency Node.js backend, in-memory caching, and a luxury dark mode interface with real-time financial data streaming.',
      fr: 'Nous avons développé une architecture de microservices avec backend Node.js ultra-réactif, cache mémoire et interface dark luxury avec flux de données financières en temps réel.',
    },
    metrics: [
      { labels: { es: 'Tiempo de Carga LCP', en: 'LCP Load Time', fr: 'Temps de Chargement LCP' }, value: '0.62s' },
      { labels: { es: 'Pipeline Cerrado', en: 'Closed Pipeline', fr: 'Pipeline Conclu' }, value: '4.8M€' },
      { labels: { es: 'Tasa de Éxito API', en: 'API Success Rate', fr: 'Disponibilité API' }, value: '99.98%' },
    ],
    accentColor: '#D4AF37',
  },
  {
    id: 'case-2',
    num: '02',
    category: 'cloud',
    categoryLabels: {
      es: 'Logística & Cloud SaaS',
      en: 'Cloud Logistics SaaS',
      fr: 'Logistique & Cloud SaaS',
    },
    titles: {
      es: 'Sistema de Telemetría y Despacho de Flotas en Tiempo Real',
      en: 'Real-Time Fleet Telemetry & Dispatch Control Platform',
      fr: 'Système de Télémétrie et Régulation de Flotte Temps Réel',
    },
    client: 'LogistiX Cloud Solutions',
    location: 'Barcelona, ES',
    heroMetric: '-68%',
    heroMetricLabels: {
      es: 'Reducción de Latencia de Red',
      en: 'Network Latency Reduction',
      fr: 'Réduction de la Latence Réseau',
    },
    descriptions: {
      es: 'Portal de control centralizado para la monitorización de 800+ vehículos comerciales con mapeo reactivo y despacho automatizado.',
      en: 'Centralized command center for real-time tracking of 800+ commercial transport fleets with reactive cartography and automated dispatch.',
      fr: 'Poste de commandement centralisé pour la supervision de 800+ véhicules commerciaux avec cartographie réactive et dispatching automatisé.',
    },
    image: '/src/assets/images/casestudy_logistics_cloud_1792928494610.jpg',
    stack: ['Next.js', 'WebSockets', 'Mapbox GL', 'Redis', 'TypeScript'],
    challenges: {
      es: 'Manejo de miles de eventos de telemetría por segundo sin saturar el hilo principal del navegador ni provocar bloqueos en las estaciones de control logístico.',
      en: 'Handling thousands of telemetry events per second without choking the main browser thread or crashing logistics workstation dispatchers.',
      fr: 'Traitement de milliers d’événements télémétriques par seconde sans saturer le thread principal du navigateur ni bloquer les postes de régulation.',
    },
    solutions: {
      es: 'Implementación de Web Workers para el procesamiento de coordenadas en segundo plano, WebSockets multiplexados y renderizado por canvas vectorizado para 60 FPS estables.',
      en: 'Implemented background Web Workers for coordinate transforms, multiplexed WebSockets, and vectorized canvas rendering ensuring stable 60 FPS.',
      fr: 'Mise en œuvre de Web Workers pour le calcul des coordonnées en arrière-plan, WebSockets multiplexés et rendu canvas vectorisé assurant 60 FPS constants.',
    },
    metrics: [
      { labels: { es: 'Eventos Procesados/s', en: 'Processed Events/s', fr: 'Événements Traités/s' }, value: '12.5k' },
      { labels: { es: 'Ahorro Operativo', en: 'Operational Savings', fr: 'Économie Opérationnelle' }, value: '32%' },
      { labels: { es: 'Core Web Vitals', en: 'Core Web Vitals', fr: 'Core Web Vitals' }, value: '100/100' },
    ],
    accentColor: '#3B82F6',
  },
  {
    id: 'case-3',
    num: '03',
    category: 'ai',
    categoryLabels: {
      es: 'Inteligencia Artificial',
      en: 'Artificial Intelligence',
      fr: 'Intelligence Artificielle',
    },
    titles: {
      es: 'Pipeline Autónomo de Datos para Ensayos Clínicos',
      en: 'Autonomous Clinical Trial Data Pipeline & RAG Infrastructure',
      fr: 'Pipeline Autonome de Données pour Essais Cliniques',
    },
    client: 'Novaflow Clinical AI',
    location: 'Valencia, ES',
    heroMetric: '4.2x',
    heroMetricLabels: {
      es: 'Velocidad de Validación de Datos',
      en: 'Data Validation Speed Multiplier',
      fr: 'Accélération de la Validation des Données',
    },
    descriptions: {
      es: 'Plataforma que integra modelos RAG privados para estructurar y validar expedientes médicos complejos con estricta gobernanza RGPD y consentimiento biomédico.',
      en: 'Platform integrating private RAG models to parse and structure complex medical trial dossiers with strict European GDPR governance and patient consent tracking.',
      fr: 'Plateforme intégrant des modèles RAG privés pour analyser et structurer des dossiers cliniques complexes avec stricte gouvernance RGPD biomédicale.',
    },
    image: '/src/assets/images/casestudy_ai_biotech_1792928494984.jpg',
    stack: ['Python FastAPI', 'React', 'pgvector', 'Docker', 'Ollama EU'],
    challenges: {
      es: 'Los investigadores clínicos invertían semanas revisando formularios dispersos manualmente. Era crítico procesar datos no estructurados sin enviar información a servidores fuera de la UE.',
      en: 'Clinical research associates spent weeks manually parsing unstructured forms. Crucially, sensitive medical records could never leave EU jurisdiction.',
      fr: 'Les chercheurs passaient des semaines à examiner manuellement des dossiers dispersés. Les données médicales sensibles ne devaient en aucun cas quitter le territoire européen.',
    },
    solutions: {
      es: 'Despliegue de modelos de lenguaje autoalojados en servidores dedicados en Frankfurt y Madrid con arquitectura RAG vectorial, certificados para conformidad RGPD médica.',
      en: 'Deployed self-hosted open-weights LLMs in dedicated Frankfurt and Madrid data centers with vector search retrieval, fully certified for biomedical GDPR compliance.',
      fr: 'Déploiement de modèles de langage auto-hébergés sur des serveurs dédiés à Francfort et Madrid avec recherche vectorielle RAG, certifiés conformes au RGPD biomédical.',
    },
    metrics: [
      { labels: { es: 'Precisión de Extracción', en: 'Extraction Precision', fr: 'Précision d’Extraction' }, value: '99.4%' },
      { labels: { es: 'Horas Ahorradas/Mes', en: 'Hours Saved/Month', fr: 'Heures Économisées/Mois' }, value: '380h' },
      { labels: { es: 'Blindaje AEPD', en: 'EU GDPR Shield', fr: 'Audit RGPD' }, value: 'Auditado' },
    ],
    accentColor: '#8B5CF6',
  },
];

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenBooking }) => {
  const { lang, t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCase, setSelectedCase] = useState<CaseStudyData | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'fintech' | 'cloud' | 'ai'>('all');

  const filteredStudies = activeFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === activeFilter);

  const activeStudy = filteredStudies[currentIndex] || filteredStudies[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStudies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStudies.length) % filteredStudies.length);
  };

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Header with Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 flex items-center gap-2">
            <span>{t.caseStudies.kicker}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{t.caseStudies.region}</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.caseStudies.titlePart1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-[#D4AF37]">
              {t.caseStudies.titleGradient}
            </span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: t.caseStudies.tabs.all },
            { id: 'fintech', label: t.caseStudies.tabs.fintech },
            { id: 'cloud', label: t.caseStudies.tabs.cloud },
            { id: 'ai', label: t.caseStudies.tabs.ai },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id as any);
                setCurrentIndex(0);
              }}
              data-cursor="button"
              className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Showcase Card with Slider */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl bg-[#090914]/90"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Visual Mockup (7 Cols) */}
              <div
                onClick={() => setSelectedCase(activeStudy)}
                data-cursor="card"
                className="lg:col-span-7 relative group cursor-pointer overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] bg-[#05050a]"
              >
                <img
                  src={activeStudy.image}
                  alt={activeStudy.titles[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                    {activeStudy.location} · {activeStudy.client}
                  </span>
                  <span className="text-blue-400 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>{t.caseStudies.viewCase}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Right Column: Case Story & Key Numbers (5 Cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                      {t.caseStudies.kicker} {activeStudy.num} · {activeStudy.categoryLabels[lang]}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {t.caseStudies.delivered}
                    </span>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                    {activeStudy.titles[lang]}
                  </h3>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
                    {activeStudy.descriptions[lang]}
                  </p>

                  {/* Highlight KPI Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-mono text-3xl sm:text-4xl font-extrabold tabular-nums"
                        style={{ color: activeStudy.accentColor }}
                      >
                        {activeStudy.heroMetric}
                      </span>
                      <span className="text-xs font-mono text-slate-300">
                        {activeStudy.heroMetricLabels[lang]}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Slider Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedCase(activeStudy)}
                    data-cursor="button"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.caseStudies.fullCaseModal}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <Magnetic strength={0.3}>
                      <button
                        onClick={handlePrev}
                        data-cursor="button"
                        className="p-2.5 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                        aria-label="Previous case"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </Magnetic>

                    <span className="text-xs font-mono text-slate-500 tabular-nums px-1">
                      {currentIndex + 1} / {filteredStudies.length}
                    </span>

                    <Magnetic strength={0.3}>
                      <button
                        onClick={handleNext}
                        data-cursor="button"
                        className="p-2.5 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
                        aria-label="Next case"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-[#070710]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span style={{ color: selectedCase.accentColor }}>●</span>
                  <span>{selectedCase.client}</span>
                  <span>·</span>
                  <span>{selectedCase.location}</span>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  data-cursor="button"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {selectedCase.titles[lang]}
                  </h3>
                  <p className="font-sans text-slate-300 text-sm leading-relaxed">
                    {selectedCase.descriptions[lang]}
                  </p>
                </div>

                {/* Visual Image Preview */}
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] bg-black">
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.titles[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2 font-semibold">
                      {t.caseStudies.challengeTitle}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {selectedCase.challenges[lang]}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
                      {t.caseStudies.solutionTitle}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {selectedCase.solutions[lang]}
                    </p>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-3">
                    {t.caseStudies.metricsTitle}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedCase.metrics.map((m) => (
                      <div
                        key={m.labels.en}
                        className="p-4 rounded-xl bg-black/60 border border-white/10 text-center"
                      >
                        <div
                          className="font-mono text-xl sm:text-2xl font-bold tabular-nums"
                          style={{ color: selectedCase.accentColor }}
                        >
                          {m.value}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 font-sans">
                          {m.labels[lang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 border-t border-white/10 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400 text-center sm:text-left">
                  {t.caseStudies.needSimilar}
                </span>
                <button
                  onClick={() => {
                    const chosen = selectedCase;
                    setSelectedCase(null);
                    onOpenBooking(chosen.categoryLabels[lang]);
                  }}
                  data-cursor="button"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40"
                >
                  <span>{t.caseStudies.bookCta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
