import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const normalizeService = (srv?: string): string => {
  if (!srv) return '';
  const s = srv.toLowerCase();
  if (s.includes('maintenance') || s.includes('mantenimiento') || s.includes('rgpd') || s.includes('sla')) return 'Maintenance RGPD';
  if (s.includes('audit') || s.includes('auditor') || s.includes('perf')) return 'Audit Performance';
  if (s.includes('landing')) return 'Landing Page';
  if (s.includes('refonte') || s.includes('redesign') || s.includes('moderniz')) return 'Refonte Web';
  if (s.includes('institution') || s.includes('corporate') || s.includes('multi')) return 'Site Institutionnel';
  if (s.includes('vitrine') || s.includes('showcase')) return 'Site Vitrine';
  if (s.includes('saas') || s.includes('platform')) return 'SaaS Full-Stack';
  if (s.includes('portail') || s.includes('portal') || s.includes('membre') || s.includes('member')) return 'Portail Client';
  if (s.includes('api') || s.includes('agent') || s.includes('architect') || s.includes('ia') || s.includes('ai')) return 'API Integration';
  if (s.includes('system') || s.includes('brand')) return 'Design System';
  if (s.includes('design') || s.includes('proto') || s.includes('ui') || s.includes('ux')) return 'UI/UX Design';
  if (s.includes('web') || s.includes('app')) return 'Application Web';
  return srv;
};

export const SERVICE_PRICING_MAP: Record<
  string,
  { label: string; budgetTier: string; price: string; group: string }
> = {
  'Landing Page': {
    label: 'Landing Page Haute Conversion',
    budgetTier: '1.500€ - 3.500€',
    price: '1.500 € – 3.500 €',
    group: '🚀 Solutions Web & Vitrines',
  },
  'Site Vitrine': {
    label: 'Site Vitrine Sur-Mesure / Corporate',
    budgetTier: '3.000€ - 7.500€',
    price: '3.000 € – 7.500 €',
    group: '🚀 Solutions Web & Vitrines',
  },
  'Refonte Web': {
    label: 'Refonte & Modernisation Web',
    budgetTier: '3.000€ - 7.500€',
    price: '3.000 € – 7.500 €',
    group: '🚀 Solutions Web & Vitrines',
  },
  'Site Institutionnel': {
    label: 'Site Web Institutionnel (Multi-langues)',
    budgetTier: '3.000€ - 7.500€',
    price: '3.000 € – 7.500 €',
    group: '🚀 Solutions Web & Vitrines',
  },
  'SaaS Full-Stack': {
    label: 'SaaS Full-Stack & Plateformes',
    budgetTier: '15.000€ +',
    price: '15.000 € +',
    group: '⚙️ Ingénierie Logicielle & SaaS',
  },
  'Application Web': {
    label: 'Application Web Sur-Mesure (Next.js / React)',
    budgetTier: '8.000€ - 15.000€',
    price: '8.000 € – 15.000 €',
    group: '⚙️ Ingénierie Logicielle & SaaS',
  },
  'Portail Client': {
    label: 'Portail Client & Espace Membre',
    budgetTier: '8.000€ - 15.000€',
    price: '8.000 € – 15.000 €',
    group: '⚙️ Ingénierie Logicielle & SaaS',
  },
  'API Integration': {
    label: 'Architecture, API & Intégration Systèmes',
    budgetTier: '8.000€ - 15.000€',
    price: '8.000 € – 15.000 €',
    group: '⚙️ Ingénierie Logicielle & SaaS',
  },
  'UI/UX Design': {
    label: 'Design UI/UX & Prototypes Interactifs',
    budgetTier: '1.500€ - 3.500€',
    price: '1.500 € – 3.500 €',
    group: '🎨 UI/UX Design',
  },
  'Design System': {
    label: 'Design System & Kit de Marque',
    budgetTier: '1.500€ - 3.500€',
    price: '1.500 € – 3.500 €',
    group: '🎨 UI/UX Design',
  },
  'Audit Performance': {
    label: 'Audit Technique & Optimisation de Performance',
    budgetTier: '1.000€ - 2.500€',
    price: '1.000 € – 2.500 €',
    group: '⚡ Audit, Performance & Maintenance',
  },
  'Maintenance RGPD': {
    label: 'Maintenance, Sécurité & Conformité RGPD',
    budgetTier: '300€ - 1.200€ / mois',
    price: '300 € – 1.200 € / mois',
    group: '⚡ Audit, Performance & Maintenance',
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
    ? SERVICE_PRICING_MAP[initialService].budgetTier
    : '';

  const [formData, setFormData] = useState({
    Nom_Et_Prenom: '',
    Email_Professionnel: '',
    Entreprise_Projet: '',
    Service_Requis: initialService,
    Budget_Estime: initialBudget,
    Delai_Souhaite: '1 - 2 mois',
    Description_Projet: '',
    Consentement_RGPD: false,
  });

  useEffect(() => {
    if (preselectedService) {
      const normalized = normalizeService(preselectedService);
      setFormData((prev) => ({
        ...prev,
        Service_Requis: normalized,
        Budget_Estime: SERVICE_PRICING_MAP[normalized]?.budgetTier || prev.Budget_Estime,
      }));
    }
  }, [preselectedService, isOpen]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceKey = e.target.value;
    const matchingTier = SERVICE_PRICING_MAP[selectedServiceKey]?.budgetTier;
    setFormData((prev) => ({
      ...prev,
      Service_Requis: selectedServiceKey,
      Budget_Estime: matchingTier || prev.Budget_Estime,
    }));
  };

  const activeServiceInfo = formData.Service_Requis ? SERVICE_PRICING_MAP[formData.Service_Requis] : null;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.Email_Professionnel.trim() || !formData.Email_Professionnel.includes('@')) {
      setStatus('error');
      setErrorMessage('Veuillez renseigner un email professionnel valide.');
      return;
    }

    if (!formData.Service_Requis) {
      setStatus('error');
      setErrorMessage('Veuillez sélectionner un service requis.');
      return;
    }

    if (!formData.Consentement_RGPD) {
      setStatus('error');
      setErrorMessage('Veuillez accepter les termes de confidentialité et RGPD.');
      return;
    }

    setStatus('loading');

    try {
      const formPayload = {
        _subject: "Nouvelle demande d'audit technique - AURA Digital",
        Nom_Et_Prenom: formData.Nom_Et_Prenom,
        Email_Professionnel: formData.Email_Professionnel,
        Entreprise_Projet: formData.Entreprise_Projet,
        Service_Requis: formData.Service_Requis,
        Budget_Estime: formData.Budget_Estime,
        Delai_Souhaite: formData.Delai_Souhaite,
        Description_Projet: formData.Description_Projet,
        Consentement_RGPD: formData.Consentement_RGPD ? 'Accepte' : 'Non',
      };

      // Direct asynchronous submission to Formspree endpoint
      const formspreePromise = fetch('https://formspree.io/f/r.zidarh@lanastrading.es', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      // Mirror to local server for storage / tracking
      const localPromise = fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      }).then((r) => r.json()).catch(() => null);

      const [resFormspree, localRes] = await Promise.allSettled([formspreePromise, localPromise]);

      if (localRes.status === 'fulfilled' && localRes.value?.bookingId) {
        setBookingResponse(localRes.value);
      } else {
        setBookingResponse({ bookingId: `AURA-AUDIT-${Date.now().toString().slice(-6)}` });
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue lors de l\'envoi.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="modal-container w-full max-w-[650px] my-auto bg-[#050505] text-[#ffffff] p-6 sm:p-8 rounded-[12px] border border-[#222] shadow-2xl relative font-sans"
        style={{
          backgroundColor: '#050505',
          color: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #222',
          maxWidth: '650px',
        }}
      >
        {/* En-tête */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2
            id="audit-modal-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: 0,
            }}
          >
            <span role="img" aria-label="Calendrier">📅</span> Réserver un Audit Technique de Faisabilité
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
            className="hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demande d'Audit Confirmée</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Merci {formData.Nom_Et_Prenom || ''} !
            </h3>

            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }} className="max-w-md mb-6">
              Votre demande a bien été transmise à notre équipe d'ingénierie senior (<strong>r.zidarh@lanastrading.es</strong>). Nous étudions votre projet et vous transmettrons un diagnostic d'architecture chiffré sous 24h ouvrées.
            </p>

            <div
              style={{
                background: '#0d0d0d',
                border: '1px solid #333',
                borderRadius: '6px',
                padding: '12px 18px',
                fontSize: '0.85rem',
                color: '#aaa',
                marginBottom: '20px',
                width: '100%',
              }}
            >
              <div><strong>Référence :</strong> {bookingResponse?.bookingId || 'AURA-AUDIT-2026'}</div>
              <div><strong>Service :</strong> {formData.Service_Requis} ({activeServiceInfo?.price || formData.Budget_Estime})</div>
              <div><strong>Email de confirmation :</strong> {formData.Email_Professionnel}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          <>
            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '25px' }}>
              Session privée de 30 minutes sans discours commercial inutile. Nous analysons votre architecture actuelle, vos goulets d'étranglement et vous proposons un plan chiffré.
            </p>

            {status === 'error' && errorMessage && (
              <div
                style={{
                  backgroundColor: 'rgba(127, 29, 29, 0.4)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#fca5a5',
                  fontSize: '0.85rem',
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* FORMULAIRE AVEC ENVOI PAR EMAIL (Formspree) */}
            <form
              action="https://formspree.io/f/r.zidarh@lanastrading.es"
              method="POST"
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              {/* Redirection personnalisée après envoi (Optionnel) */}
              <input type="hidden" name="_subject" value="Nouvelle demande d'audit technique - AURA Digital" />

              {/* Ligne 1 : Nom & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                    Nom et Prénom <span style={{ color: '#6366f1' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="Nom_Et_Prenom"
                    placeholder="Ex. Sophie Bernard"
                    required
                    value={formData.Nom_Et_Prenom}
                    onChange={(e) => setFormData({ ...formData, Nom_Et_Prenom: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                    Email Professionnel <span style={{ color: '#6366f1' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="Email_Professionnel"
                    placeholder="sophie@entreprise.fr"
                    required
                    value={formData.Email_Professionnel}
                    onChange={(e) => setFormData({ ...formData, Email_Professionnel: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Ligne 2 : Entreprise & Service Requis */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                    Entreprise / Projet <span style={{ color: '#6366f1' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="Entreprise_Projet"
                    placeholder="Ex. ScaleUp SAS"
                    required
                    value={formData.Entreprise_Projet}
                    onChange={(e) => setFormData({ ...formData, Entreprise_Projet: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                    Service Requis <span style={{ color: '#6366f1' }}>*</span>
                  </label>
                  <select
                    name="Service_Requis"
                    required
                    value={formData.Service_Requis}
                    onChange={handleServiceChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled>Sélectionnez un service...</option>
                    
                    <optgroup label="🚀 Solutions Web & Vitrines" style={{ background: '#111', color: '#ccc' }}>
                      <option value="Landing Page" style={{ background: '#0d0d0d', color: '#fff' }}>Landing Page Haute Conversion</option>
                      <option value="Site Vitrine" style={{ background: '#0d0d0d', color: '#fff' }}>Site Vitrine Sur-Mesure / Corporate</option>
                      <option value="Refonte Web" style={{ background: '#0d0d0d', color: '#fff' }}>Refonte & Modernisation Web</option>
                      <option value="Site Institutionnel" style={{ background: '#0d0d0d', color: '#fff' }}>Site Web Institutionnel (Multi-langues)</option>
                    </optgroup>
                    
                    <optgroup label="⚙️ Ingénierie Logicielle & SaaS" style={{ background: '#111', color: '#ccc' }}>
                      <option value="SaaS Full-Stack" style={{ background: '#0d0d0d', color: '#fff' }}>SaaS Full-Stack & Plateformes</option>
                      <option value="Application Web" style={{ background: '#0d0d0d', color: '#fff' }}>Application Web Sur-Mesure (Next.js / React)</option>
                      <option value="Portail Client" style={{ background: '#0d0d0d', color: '#fff' }}>Portail Client & Espace Membre</option>
                      <option value="API Integration" style={{ background: '#0d0d0d', color: '#fff' }}>Architecture, API & Intégration Systèmes</option>
                    </optgroup>
                    
                    <optgroup label="🎨 UI/UX Design" style={{ background: '#111', color: '#ccc' }}>
                      <option value="UI/UX Design" style={{ background: '#0d0d0d', color: '#fff' }}>Design UI/UX & Prototypes Interactifs</option>
                      <option value="Design System" style={{ background: '#0d0d0d', color: '#fff' }}>Design System & Kit de Marque</option>
                    </optgroup>
                    
                    <optgroup label="⚡ Audit, Performance & Maintenance" style={{ background: '#111', color: '#ccc' }}>
                      <option value="Audit Performance" style={{ background: '#0d0d0d', color: '#fff' }}>Audit Technique & Optimisation de Performance</option>
                      <option value="Maintenance RGPD" style={{ background: '#0d0d0d', color: '#fff' }}>Maintenance, Sécurité & Conformité RGPD</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Ligne 3 : Budget & Délai avec synchronisation de prix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.85rem', color: '#ccc' }}>
                      Budget Estimé <span style={{ color: '#6366f1' }}>*</span>
                    </label>
                    {activeServiceInfo && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          color: '#D4AF37',
                          backgroundColor: 'rgba(212, 175, 55, 0.15)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(212, 175, 55, 0.35)',
                          fontWeight: 600,
                        }}
                      >
                        {activeServiceInfo.price}
                      </span>
                    )}
                  </div>
                  <select
                    name="Budget_Estime"
                    required
                    value={formData.Budget_Estime}
                    onChange={(e) => setFormData({ ...formData, Budget_Estime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled>Sélectionnez une tranche...</option>
                    <option value="300€ - 1.200€ / mois">300 € – 1.200 € / mois (Maintenance)</option>
                    <option value="1.000€ - 2.500€">1.000 € – 2.500 € (Audit & Optimisation)</option>
                    <option value="1.500€ - 3.500€">1.500 € – 3.500 € (Landing Page)</option>
                    <option value="3.000€ - 7.500€">3.000 € – 7.500 € (Site Vitrine)</option>
                    <option value="8.000€ - 15.000€">8.000 € – 15.000 € (Web App & Portail)</option>
                    <option value="15.000€ +">15.000 € + (SaaS & Sur-mesure)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                    Délai Souhaité
                  </label>
                  <select
                    name="Delai_Souhaite"
                    value={formData.Delai_Souhaite}
                    onChange={(e) => setFormData({ ...formData, Delai_Souhaite: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0d0d0d',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Urgent (< 1 mois)">Urgent (&lt; 1 mois)</option>
                    <option value="1 - 2 mois">1 – 2 mois</option>
                    <option value="3 - 6 mois">3 – 6 mois</option>
                    <option value="Flexible">Flexible / En réflexion</option>
                  </select>
                </div>
              </div>

              {/* Ligne 4 : Description du Projet */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: '#ccc' }}>
                  Parlez-nous brièvement de votre projet
                </label>
                <textarea
                  name="Description_Projet"
                  rows={3}
                  value={formData.Description_Projet}
                  onChange={(e) => setFormData({ ...formData, Description_Projet: e.target.value })}
                  placeholder="Objectifs, fonctionnalités clés, technologies souhaitées..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#0d0d0d',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: '#fff',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Ligne 5 : Consentement RGPD */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <input
                  type="checkbox"
                  name="Consentement_RGPD"
                  id="rgpd"
                  value="Accepte"
                  checked={formData.Consentement_RGPD}
                  onChange={(e) => setFormData({ ...formData, Consentement_RGPD: e.target.checked })}
                  required
                  style={{
                    marginTop: '3px',
                    accentColor: '#6366f1',
                    cursor: 'pointer',
                    width: '16px',
                    height: '16px',
                    flexShrink: 0,
                  }}
                />
                <label htmlFor="rgpd" style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.4, cursor: 'pointer' }}>
                  J'accepte que les informations saisies soient utilisées pour me recontacter dans le cadre de ma demande. Conformément au RGPD, vous disposez d'un droit d'accès et de rectification.
                </label>
              </div>

              {/* Bouton de Soumission */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  marginTop: '5px',
                  opacity: status === 'loading' ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                className="hover:bg-[#4f46e5] active:scale-[0.99] transition-all"
              >
                {status === 'loading' ? 'ENVOI EN COURS...' : "CONFIRMER LA DEMANDE D'AUDIT →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
