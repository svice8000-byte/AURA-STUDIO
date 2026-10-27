import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { SocialProof } from './components/SocialProof';
import { LeadMagnetTunnel } from './components/LeadMagnetTunnel';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { GuideReaderModal } from './components/GuideReaderModal';
import { LegalModal } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';
import { CustomCursor } from './components/CustomCursor';
import { FAQ } from './components/FAQ';
import { CaseStudies } from './components/CaseStudies';
import { CountdownBanner } from './components/CountdownBanner';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { VirtualConsultant } from './components/VirtualConsultant';
import { I18nProvider } from './i18n/I18nContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');
  const [isGuideReaderOpen, setIsGuideReaderOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'aviso-legal' | 'privacidad' | 'cookies' | null>(null);

  const handleOpenBooking = (service?: string) => {
    setSelectedServiceForBooking(service || '');
    setIsBookingOpen(true);
  };

  const handleScrollToLeadMagnet = () => {
    const el = document.getElementById('guia');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030305] text-[#E2E8F0] selection:bg-blue-600/30 selection:text-white bg-noise overflow-x-hidden">
      {/* High-Performance Framer Motion Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Accessibility Toolbar (Dark, Light, High-Contrast & Font Scaling) */}
      <AccessibilityToolbar />

      {/* Floating Top Bar with Language Switcher */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Flow */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Hero with interactive Canvas GLSL/Shader */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToLeadMagnet={handleScrollToLeadMagnet}
        />

        {/* Live Countdown & Accessible Priority Intake Newsletter */}
        <CountdownBanner />

        {/* Asymmetric Bento Grid Services */}
        <BentoGrid onSelectService={(service) => handleOpenBooking(service)} />

        {/* Interactive Case Studies Portfolio (Slider & Deep Dives) */}
        <CaseStudies onOpenBooking={(service) => handleOpenBooking(service)} />

        {/* Social Proof & Quantifiable Metrics */}
        <SocialProof />

        {/* B2B Engineering & Process FAQ (Bento Accordion) */}
        <FAQ onOpenBooking={() => handleOpenBooking()} />

        {/* Lead Magnet Capture Tunnel (10 Errores Web B2B) */}
        <LeadMagnetTunnel
          onOpenGuideReader={() => setIsGuideReaderOpen(true)}
          onOpenPrivacyModal={() => setLegalModalType('privacidad')}
        />
      </main>

      {/* Footer with Multi-Language Legal Disclosures & Kinetic Typography */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Modals & Overlays */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedServiceForBooking}
      />

      <GuideReaderModal
        isOpen={isGuideReaderOpen}
        onClose={() => setIsGuideReaderOpen(false)}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Multi-Language Cookie Consent Banner */}
      <CookieBanner
        onOpenCookiesPolicy={() => setLegalModalType('cookies')}
      />

      {/* Virtual Engineering Consultant (Gemini 3.8 Flash Agent) */}
      <VirtualConsultant
        onOpenBooking={(service) => handleOpenBooking(service)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </AccessibilityProvider>
  );
}
