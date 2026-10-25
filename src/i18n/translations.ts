export type Language = 'es' | 'en' | 'fr';

export interface Translations {
  nav: {
    services: string;
    caseStudies: string;
    faq: string;
    guide: string;
    bookConsultation: string;
  };
  hero: {
    kicker: string;
    location: string;
    compliance: string;
    headlinePart1: string;
    headlineGradient: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    metricTtfb: string;
    metricConversion: string;
    metricLighthouse: string;
    metricLegal: string;
  };
  bento: {
    sectionKicker: string;
    sectionTitlePart1: string;
    sectionTitleGradient: string;
    sectionSubtitle: string;
    card1: {
      tag: string;
      title: string;
      desc: string;
      f1: string;
      f2: string;
      f3: string;
      f4: string;
      stack: string;
      cta: string;
    };
    card2: {
      tag: string;
      title: string;
      desc: string;
      bottomText: string;
      cta: string;
    };
    card3: {
      tag: string;
      title: string;
      desc: string;
      auditTitle: string;
      bottomText: string;
      cta: string;
    };
    card4: {
      tag: string;
      title: string;
      desc: string;
      f1Title: string;
      f1Desc: string;
      f2Title: string;
      f2Desc: string;
      f3Title: string;
      f3Desc: string;
      bottomText: string;
      cta: string;
    };
  };
  caseStudies: {
    kicker: string;
    region: string;
    titlePart1: string;
    titleGradient: string;
    tabs: {
      all: string;
      fintech: string;
      cloud: string;
      ai: string;
    };
    delivered: string;
    viewCase: string;
    fullCaseModal: string;
    challengeTitle: string;
    solutionTitle: string;
    metricsTitle: string;
    needSimilar: string;
    bookCta: string;
  };
  socialProof: {
    trustedBy: string;
    kicker: string;
    title: string;
    subtitle: string;
    case1: {
      metric: string;
      metricLabel: string;
      location: string;
      quote: string;
      name: string;
      role: string;
    };
    case2: {
      metric: string;
      metricLabel: string;
      location: string;
      quote: string;
      name: string;
      role: string;
    };
  };
  faq: {
    kicker: string;
    titlePart1: string;
    titleGradient: string;
    subtitle: string;
    sideCardTitle: string;
    sideCardDesc: string;
    responseTime: string;
    ndaAvailable: string;
    sideCta: string;
    items: Array<{
      id: string;
      num: string;
      tag: string;
      question: string;
      answer: string;
    }>;
  };
  leadMagnet: {
    kicker: string;
    title: string;
    subtitle: string;
    pdfPages: string;
    readTime: string;
    immediateAccess: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    challengeLabel: string;
    challengeOptions: {
      conversion: string;
      redesign: string;
      saas: string;
      ai: string;
    };
    consentText: string;
    privacyLinkText: string;
    consentSuffix: string;
    submitButton: string;
    submittingButton: string;
    legalLayer: {
      title: string;
      responsible: string;
      purpose: string;
      legalBasis: string;
      recipients: string;
      rights: string;
    };
    success: {
      badge: string;
      title: string;
      body: string;
      readOnline: string;
      downloadPdf: string;
      anotherRequest: string;
    };
  };
  guideReader: {
    modalTitle: string;
    printButton: string;
    kicker: string;
    guideTitle: string;
    intro: string;
    solutionLabel: string;
    impactLabel: string;
    ctaBannerTitle: string;
    ctaBannerDesc: string;
    ctaBannerButton: string;
    footerText: string;
    closeText: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    timelineLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    consentText: string;
    submitButton: string;
    submittingButton: string;
    successBadge: string;
    successTitle: string;
    successDesc: string;
    channelInfo: string;
    closeButton: string;
  };
  footer: {
    desc: string;
    address: string;
    navTitle: string;
    legalTitle: string;
    legalDesc: string;
    legalNotice: string;
    privacy: string;
    cookies: string;
    kineticKicker: string;
    kineticText: string;
    kineticCta: string;
    copyright: string;
  };
  cookies: {
    title: string;
    desc: string;
    moreInfo: string;
    reject: string;
    accept: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      services: 'Servicios',
      caseStudies: 'Casos de Éxito',
      faq: 'FAQ',
      guide: 'Guía 2026',
      bookConsultation: 'Reservar Consulta',
    },
    hero: {
      kicker: 'ESTUDIO B2B ESPAÑA',
      location: 'MADRID & BARCELONA',
      compliance: 'LSSI & RGPD AUDITADO',
      headlinePart1: 'Ingeniería Web de Alto Rendimiento para la',
      headlineGradient: 'Era Digital',
      subtitle:
        'Diseño y desarrollo plataformas SaaS, agentes de IA y portales corporativos para startups y pymes en España. Arquitectura ultrarrápida que transforma tráfico B2B en clientes de alto valor.',
      primaryCta: 'Reservar Consulta de Viabilidad',
      secondaryCta: 'Descargar Guía 2026 (Checklist B2B)',
      metricTtfb: 'Tiempo de Respuesta TTFB',
      metricConversion: 'Conversión Media de Leads',
      metricLighthouse: 'Google PageSpeed Score',
      metricLegal: 'LSSI / RGPD Blindado',
    },
    bento: {
      sectionKicker: 'Capacidades de Ingeniería',
      sectionTitlePart1: 'Servicios Diseñados para la',
      sectionTitleGradient: 'Conversión y la Escala',
      sectionSubtitle:
        'Cada arquitectura se construye a medida, eliminando intermediarios lentos y garantizando máxima seguridad técnica y retorno medible.',
      card1: {
        tag: '01 · ARQUITECTURA',
        title: 'Plataformas SaaS & Aplicaciones Web Full-Stack',
        desc: 'Desarrollo integral desde la infraestructura backend hasta interfaces con micro-interacciones cinematográficas. Diseñado para soportar miles de usuarios corporativos concurrentes con fiabilidad bancaria.',
        f1: 'React 19 / Next.js & Node.js de baja latencia',
        f2: 'Autenticación RBAC y pasarelas de pago seguras',
        f3: 'Modelos de datos relacionales optimizados',
        f4: 'Dashboards interactivos en tiempo real',
        stack: 'Stack: Node / React / TypeScript / PostgreSQL',
        cta: 'Consultar viabilidad',
      },
      card2: {
        tag: '02 · IA APLICADA',
        title: 'Agentes de IA & Pipelines Autónomos',
        desc: 'Integra modelos de lenguaje avanzados, agentes autónomos y recuperación RAG para automatizar flujos operativos B2B complejos.',
        bottomText: 'Automatización de backoffice & leads',
        cta: 'Ver casos',
      },
      card3: {
        tag: '03 · PERFORMANCE',
        title: 'Rendimiento Extremo & Core Web Vitals',
        desc: 'Cada 100ms de retraso reduce conversiones un 7%. Reestructuro el renderizado crítico para garantizar puntuaciones de 99+ en Google Lighthouse.',
        auditTitle: 'Lighthouse Audit',
        bottomText: 'Audit instantáneo incluido',
        cta: 'Auditar web',
      },
      card4: {
        tag: '04 · CONFORMIDAD LEGAL & SLA',
        title: 'Mantenimiento Premium & Blindaje LSSI / RGPD España',
        desc: 'Evita sanciones de la AEPD y fallos críticos en servidores. Configuración legal completa para el mercado español: gestión de cookies por capas, cláusulas informativas de captación y monitorización de uptime 99.9%.',
        f1Title: 'LSSI-CE Art. 22.2',
        f1Desc: 'Bloqueo previo de scripts analíticos y banner consentible.',
        f2Title: 'RGPD UE 2016/679',
        f2Desc: 'Consentimiento explícito de doble capa en formularios.',
        f3Title: 'SLA 24/7 Garantizado',
        f3Desc: 'Copias de seguridad diarias y respuesta a incidentes en < 2h.',
        bottomText: 'Ideal para empresas que venden a clientes corporativos en la UE',
        cta: 'Solicitar plan de soporte',
      },
    },
    caseStudies: {
      kicker: 'Portfolio de Casos de Éxito',
      region: 'ESPAÑA & EUROPA',
      titlePart1: 'Ingeniería que Impulsa',
      titleGradient: 'Crecimiento Medible',
      tabs: {
        all: 'Todos los Casos',
        fintech: 'FinTech & Pagos',
        cloud: 'Logística & Cloud',
        ai: 'Agentes de IA',
      },
      delivered: 'Entregado & Verificado',
      viewCase: 'Examinar Caso',
      fullCaseModal: 'Ver Caso Completo',
      challengeTitle: 'El Desafío Previo',
      solutionTitle: 'Solución de Ingeniería',
      metricsTitle: 'Resultados Certificados en Producción',
      needSimilar: '¿Necesitas una arquitectura similar para tu empresa?',
      bookCta: 'Reservar Consulta Técnica',
    },
    socialProof: {
      trustedBy: 'Tecnología y arquitectura de confianza para startups y empresas de software',
      kicker: 'Evidencia Cuantitativa',
      title: 'Resultados Reales en Producción',
      subtitle: 'No vendemos código decorativo. Construimos plataformas diseñadas para impactar directamente en el pipeline de ventas de nuestros clientes.',
      case1: {
        metric: '+42%',
        metricLabel: 'Conversión en Inbound Enterprise (6 meses)',
        location: 'Madrid, ES',
        quote: 'Teníamos un producto SaaS robusto pero nuestra web parecía una plantilla genérica que no transmitía el valor a directores de compras corporativos. El rediseño no solo elevó nuestra imagen de marca al nivel de Silicon Valley, sino que multiplicó las solicitudes de demo un 42% en el primer trimestre.',
        name: 'Carlos Mendoza',
        role: 'CTO & Co-Founder en Novaflow Tech',
      },
      case2: {
        metric: '-65% LCP',
        metricLabel: 'De 3.2s a 0.7s de carga crítica',
        location: 'Barcelona, ES',
        quote: 'Nuestra mayor preocupación era la conformidad legal con la AEPD en España y la velocidad de carga para clientes enterprise que navegan con filtros estrictos de red. Conseguimos puntuación de 100 en Lighthouse y cerramos nuestro primer contrato de seis cifras al mes de lanzamiento.',
        name: 'Elena López',
        role: 'Directora de Crecimiento en Securitas Cloud SL',
      },
    },
    faq: {
      kicker: 'Resolución de Dudas Frecuentes',
      titlePart1: 'Ingeniería Clara,',
      titleGradient: 'Sin Letra Pequeña',
      subtitle: 'Respuestas técnicas y contractuales directas para directores de tecnología, fundadores y líderes de producto en España.',
      sideCardTitle: '¿Tu proyecto tiene requerimientos específicos?',
      sideCardDesc: 'Cada arquitectura corporativa tiene matices propios. Si tienes dudas sobre integraciones con tu ERP, stack actual o normativas de ciberseguridad, lo analizamos en una llamada técnica de 30 minutos sin compromiso.',
      responseTime: 'Tiempo de respuesta: < 24h laborables',
      ndaAvailable: 'Acuerdo de Confidencialidad (NDA) disponible',
      sideCta: 'Consultar Viabilidad Técnica',
      items: [
        {
          id: 'faq-1',
          num: '01',
          tag: 'METODOLOGÍA & PLAZOS',
          question: '¿Cuál es el proceso y plazo habitual para una plataforma SaaS o rediseño B2B?',
          answer: 'Nuestro ciclo estándar se divide en 4 sprints ágiles de 2 semanas (8 semanas en total): (1) Diagnóstico de conversión y arquitectura de datos; (2) Diseño de interfaz de alta fidelidad con micro-interacciones; (3) Desarrollo full-stack en TypeScript/React/Node con pipelines CI/CD; y (4) Auditoría de rendimiento Core Web Vitals y validación LSSI/RGPD previa al despliegue.',
        },
        {
          id: 'faq-2',
          num: '02',
          tag: 'RENDIMIENTO TÉCNICO',
          question: '¿Cómo garantizáis una puntuación de 99+ en Google Core Web Vitals?',
          answer: 'Eliminamos el "bloatware" y las plantillas pesadas de terceros. Implementamos Server-Side Rendering (SSR), compresión Brotli en CDN perimetral, división de código inteligente (code splitting), pre-carga predictiva de rutas y optimización matemática de imágenes. Cada entrega pasa por pruebas automatizadas de Lighthouse en entornos de staging.',
        },
        {
          id: 'faq-3',
          num: '03',
          tag: 'CUMPLIMIENTO LEGAL',
          question: '¿En qué consiste el blindaje legal frente a la AEPD y la normativa LSSI-CE en España?',
          answer: 'Configuramos el bloqueo previo estricto de cualquier script analítico o de marketing hasta que el usuario preste consentimiento libre e informado en el banner de cookies (LSSI Art. 22.2). En los formularios de captación de leads, integramos casillas desmarcadas por defecto y la doble capa informativa requerida por el RGPD y la LOPDGDD 3/2018.',
        },
        {
          id: 'faq-4',
          num: '04',
          tag: 'IA & AUTONOMÍA',
          question: '¿Cómo se integran los agentes de IA sin comprometer la privacidad corporativa?',
          answer: 'Desarrollamos pipelines autónomos conectados a tus bases de conocimiento mediante arquitecturas RAG privadas. Los datos sensibles de tu empresa no se utilizan para re-entrenar modelos comerciales públicos. Además, integramos mecanismos de moderación estricta y supervisión ("human-in-the-loop") para tareas críticas.',
        },
        {
          id: 'faq-5',
          num: '05',
          tag: 'PROPIEDAD INTELECTUAL',
          question: '¿Quién es el propietario del código fuente y los activos digitales?',
          answer: 'Tu empresa posee el 100% de la propiedad intelectual, repositorios Git, diseños y configuraciones cloud desde el momento del pago final. No aplicamos ningún tipo de permanencia forzosa ("vendor lock-in") y entregamos documentación técnica exhaustiva para que tu equipo interno pueda escalar la plataforma.',
        },
        {
          id: 'faq-6',
          num: '06',
          tag: 'SLA & MANTENIMIENTO',
          question: '¿Qué incluye el soporte post-lanzamiento y el SLA de disponibilidad?',
          answer: 'Ofrecemos acuerdos de nivel de servicio (SLA) con monitorización proactiva 24/7, copias de seguridad redundantes diarias en servidores europeos, actualización continua de dependencias de seguridad y respuesta garantizada en menos de 2 horas ante cualquier incidencia crítica.',
        },
      ],
    },
    leadMagnet: {
      kicker: 'Lead Magnet Exclusivo · Edición 2026',
      title: '10 Errores Críticos que Hunden la Conversión Web en Startups y B2B',
      subtitle: 'Una guía técnica condensada para CEOs, CTOs y Directores de Crecimiento en España que van a rediseñar su web este año. Evita gastar miles de euros en diseños vacíos que no generan pipeline.',
      pdfPages: 'PDF Ejecutivo (18 Páginas)',
      readTime: 'Lectura: 12 min',
      immediateAccess: 'Acceso Inmediato',
      formTitle: 'Recibe la Guía Directamente en tu Bandeja',
      formSubtitle: 'Introduce tus datos profesionales para generar tu enlace de descarga verificado.',
      nameLabel: 'Nombre y Apellidos',
      namePlaceholder: 'Ej. Marc Navarro',
      emailLabel: 'Email Corporativo',
      emailPlaceholder: 'nombre@tuempresa.es',
      companyLabel: 'Empresa / Startup',
      companyPlaceholder: 'Ej. NexaTech SL',
      challengeLabel: 'Mayor Reto en tu Web',
      challengeOptions: {
        conversion: 'Baja tasa de conversión de leads',
        redesign: 'Diseño anticuado / poco profesional',
        saas: 'Arquitectura técnica lenta o inestable',
        ai: 'Falta de automatizaciones y agentes',
      },
      consentText: 'Consentimiento expreso (Obligatorio)',
      privacyLinkText: 'Política de Privacidad',
      consentSuffix: 'y autorizo el tratamiento de mis datos de conformidad con el RGPD (UE 2016/679) y la Ley 34/2002 (LSSI-CE) para recibir esta guía técnica y comunicaciones sobre ingeniería web.',
      submitButton: 'Descargar Checklist 2026 Gratis',
      submittingButton: 'Validando consentimiento y generando guía...',
      legalLayer: {
        title: 'Información básica sobre Protección de Datos (AEPD / LSSI-CE)',
        responsible: 'Responsable: AURA Digital // Creative B2B Engineering (España).',
        purpose: 'Finalidad: Remitir la guía descargable y prospección técnica comercial si consiente.',
        legalBasis: 'Legitimación: Consentimiento expreso del interesado (Art. 6.1.a RGPD).',
        recipients: 'Destinatarios: No se ceden datos a terceros sin mandato legal expreso.',
        rights: 'Derechos: Acceso, rectificación, supresión y oposición en legal@auradigital.es.',
      },
      success: {
        badge: 'Consentimiento Registrado · Conforme RGPD',
        title: '¡Tu Guía Está Lista para Descarga!',
        body: 'Hemos enviado una copia a tu correo. También puedes leerla o descargarla directamente aquí:',
        readOnline: 'Leer Guía Online Ahora',
        downloadPdf: 'Descargar Versión PDF',
        anotherRequest: 'Registrar otra solicitud o actualizar datos',
      },
    },
    guideReader: {
      modalTitle: 'Visor Ejecutivo · 10 Errores Web B2B (Edición 2026)',
      printButton: 'Imprimir / Guardar PDF',
      kicker: 'Documento de Arquitectura y Estrategia B2B',
      guideTitle: '10 Errores Críticos que Hunden la Conversión Web en Startups y B2B',
      intro: 'Publicado por AURA Digital para líderes de producto, directores de tecnología y fundadores en España. Esta guía condensa las lecciones aprendidas tras analizar más de 120 plataformas web corporativas.',
      solutionLabel: 'Solución Recomendada:',
      impactLabel: 'Impacto medido:',
      ctaBannerTitle: '¿Quieres auditar la web de tu empresa sin compromiso?',
      ctaBannerDesc: 'Revisamos tu stack, tiempos de respuesta y embudo de conversión para entregarte un diagnóstico de 15 minutos.',
      ctaBannerButton: 'Solicitar Diagnóstico',
      footerText: 'AURA Digital Studio · España (LSSI/RGPD)',
      closeText: 'Cerrar Visor',
    },
    bookingModal: {
      title: 'Reservar Consulta Técnica de Viabilidad',
      subtitle: 'Sesión de 30 minutos sin coste comercial. Evaluamos tu arquitectura actual, cuellos de botella y te proponemos un plan de ejecución con presupuesto cerrado.',
      nameLabel: 'Tu Nombre y Apellidos',
      namePlaceholder: 'Ej. Sara Ortiz',
      emailLabel: 'Email Corporativo',
      emailPlaceholder: 'sara@empresa.com',
      companyLabel: 'Empresa / Proyecto',
      companyPlaceholder: 'Ej. ScaleUp SL',
      serviceLabel: 'Servicio Principal',
      budgetLabel: 'Presupuesto Estimado',
      timelineLabel: 'Plazo Deseado',
      detailsLabel: 'Cuéntanos brevemente sobre tu proyecto o reto técnico',
      detailsPlaceholder: 'Ej. Necesitamos migrar nuestra plataforma antigua a Next.js, integrar autenticación corporativa y mejorar la conversión de clientes B2B en España y Europa.',
      consentText: 'Consentimiento LSSI/RGPD: Acepto el tratamiento confidencial de los datos suministrados para la coordinación de la consulta técnica con AURA Digital de acuerdo al RGPD (UE 2016/679).',
      submitButton: 'Confirmar Solicitud de Consulta',
      submittingButton: 'Procesando reserva...',
      successBadge: 'Consulta Recibida con Éxito',
      successTitle: 'Gracias por tu solicitud',
      successDesc: 'Analizaremos los requerimientos técnicos y nos pondremos en contacto contigo en menos de 24 horas laborables.',
      channelInfo: 'Canal: Videollamada Técnica Privada (Google Meet)',
      closeButton: 'Volver al Sitio',
    },
    footer: {
      desc: 'Estudio de ingeniería web y arquitectura B2B en España. Desarrollamos plataformas de alto rendimiento, agentes de IA e interfaces cinematográficas orientadas a la conversión.',
      address: 'Paseo de la Castellana 95, Madrid · Barcelona Hub',
      navTitle: 'Arquitectura & Servicios',
      legalTitle: 'Conformidad Legal España',
      legalDesc: 'Todas las operaciones, formularios y cookies cumplen rigurosamente la Ley 34/2002 (LSSI-CE) y el Reglamento Europeo de Protección de Datos (RGPD UE 2016/679).',
      legalNotice: 'Aviso Legal (LSSI)',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      kineticKicker: 'Haz clic para iniciar tu proyecto',
      kineticText: "LET'S BUILD THE FUTURE",
      kineticCta: 'Iniciar Consulta Técnica de Viabilidad',
      copyright: 'Todos los derechos reservados.',
    },
    cookies: {
      title: 'Gestión de Cookies (LSSI-CE Art. 22.2)',
      desc: 'Utilizamos cookies técnicas necesarias y, si nos autorizas, analíticas anónimas para evaluar el rendimiento técnico conforme a las directrices de la AEPD.',
      moreInfo: 'Más información',
      reject: 'Solo Esenciales',
      accept: 'Aceptar Todas',
    },
  },
  en: {
    nav: {
      services: 'Services',
      caseStudies: 'Case Studies',
      faq: 'FAQ',
      guide: '2026 Guide',
      bookConsultation: 'Book Consultation',
    },
    hero: {
      kicker: 'B2B STUDIO SPAIN & EU',
      location: 'MADRID & BARCELONA',
      compliance: 'GDPR & LSSI COMPLIANT',
      headlinePart1: 'High-Performance Web Engineering for the',
      headlineGradient: 'Digital Era',
      subtitle:
        'We engineer scalable SaaS platforms, autonomous AI agents, and flagship B2B web applications for tech startups and SMEs. Ultra-fast architectures built to convert corporate traffic into high-ticket pipeline.',
      primaryCta: 'Book Technical Feasibility Call',
      secondaryCta: 'Download 2026 B2B Checklist',
      metricTtfb: 'TTFB Response Time',
      metricConversion: 'Avg Lead Conversion Lift',
      metricLighthouse: 'Google PageSpeed Score',
      metricLegal: 'Full GDPR & EU Compliance',
    },
    bento: {
      sectionKicker: 'Engineering Capabilities',
      sectionTitlePart1: 'Services Built for',
      sectionTitleGradient: 'Conversion & Scale',
      sectionSubtitle:
        'Every web architecture is custom-crafted, cutting slow intermediaries and guaranteeing military-grade security with quantifiable commercial return.',
      card1: {
        tag: '01 · ARCHITECTURE',
        title: 'Full-Stack SaaS & Flagship Web Platforms',
        desc: 'End-to-end development from distributed cloud infrastructure to cinematic frontend micro-interactions. Engineered to support thousands of concurrent enterprise users with bank-grade reliability.',
        f1: 'React 19 / Next.js & Low-latency Node.js',
        f2: 'Enterprise RBAC auth & secure payment gateways',
        f3: 'Optimized relational schema designs',
        f4: 'Real-time collaborative analytics dashboards',
        stack: 'Stack: Node / React / TypeScript / PostgreSQL',
        cta: 'Check feasibility',
      },
      card2: {
        tag: '02 · APPLIED AI',
        title: 'Autonomous AI Agents & RAG Pipelines',
        desc: 'Integrate advanced language models, autonomous workflow agents, and private vector retrieval to automate complex B2B operational workflows without data leakage.',
        bottomText: 'Back-office & inbound lead automation',
        cta: 'View AI cases',
      },
      card3: {
        tag: '03 · PERFORMANCE',
        title: 'Core Web Vitals & Extreme Latency Tuning',
        desc: 'Every 100ms of latency cuts conversions by 7%. We re-engineer critical rendering paths to guarantee flawless 99+ scores on Google Lighthouse.',
        auditTitle: 'Lighthouse Audit',
        bottomText: 'Instant audit included',
        cta: 'Audit your site',
      },
      card4: {
        tag: '04 · COMPLIANCE & SLA',
        title: 'Mission-Critical SLA & EU GDPR Shielding',
        desc: 'Prevent EU regulator penalties and server downtime. Full regulatory compliance: tiered consent managers, explicit dual-layer data notices, and 99.9% uptime SLA.',
        f1Title: 'LSSI-CE Art. 22.2',
        f1Desc: 'Strict script pre-blocking with audit-ready cookie manager.',
        f2Title: 'EU GDPR 2016/679',
        f2Desc: 'Unbundled opt-in checkboxes and verified data policies.',
        f3Title: '24/7 Guaranteed SLA',
        f3Desc: 'Daily European backups and < 2h critical incident response.',
        bottomText: 'Designed for companies selling to European enterprise accounts',
        cta: 'Request support plan',
      },
    },
    caseStudies: {
      kicker: 'Proven Portfolio',
      region: 'SPAIN & EUROPE',
      titlePart1: 'Engineering That Powers',
      titleGradient: 'Measurable Growth',
      tabs: {
        all: 'All Projects',
        fintech: 'FinTech & Payments',
        cloud: 'Cloud Logistics',
        ai: 'AI Agents',
      },
      delivered: 'Delivered & Verified',
      viewCase: 'Inspect Case',
      fullCaseModal: 'View Full Case Study',
      challengeTitle: 'The Pre-Existing Challenge',
      solutionTitle: 'Engineering Solution',
      metricsTitle: 'Production Certified Outcomes',
      needSimilar: 'Need a similar architecture for your organization?',
      bookCta: 'Book Technical Consultation',
    },
    socialProof: {
      trustedBy: 'Trusted engineering and digital architecture for software startups and high-growth scaleups',
      kicker: 'Quantitative Evidence',
      title: 'Real Production Impact',
      subtitle: 'We do not sell decorative websites. We engineer digital engines built to directly accelerate your enterprise sales pipeline.',
      case1: {
        metric: '+42%',
        metricLabel: 'Enterprise Inbound Conversion (6 Mo)',
        location: 'Madrid, ES',
        quote: 'We had a powerful SaaS backend, but our marketing site looked like an amateur template that failed to convince enterprise procurement teams. The re-architecture elevated our brand to Silicon Valley caliber and increased inbound demo requests by 42% in Q1.',
        name: 'Carlos Mendoza',
        role: 'CTO & Co-Founder at Novaflow Tech',
      },
      case2: {
        metric: '-65% LCP',
        metricLabel: 'From 3.2s down to 0.7s LCP',
        location: 'Barcelona, ES',
        quote: 'Our chief concern was strict GDPR compliance in Europe and speed for enterprise buyers browsing behind strict firewalls. AURA delivered a 100/100 Lighthouse score and we closed our first six-figure enterprise deal one month after launch.',
        name: 'Elena López',
        role: 'Head of Growth at Securitas Cloud SL',
      },
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      titlePart1: 'Transparent Engineering,',
      titleGradient: 'Zero Small Print',
      subtitle: 'Direct technical and contractual answers for CTOs, Founders, and Product Leaders across Europe.',
      sideCardTitle: 'Have custom architectural requirements?',
      sideCardDesc: 'Enterprise systems have unique nuances. Whether you need legacy ERP connectors, private LLMs, or specialized security audits, let us analyze your requirements in a 30-minute technical discovery call.',
      responseTime: 'Response time: < 24 business hours',
      ndaAvailable: 'Mutual NDA available on request',
      sideCta: 'Check Technical Feasibility',
      items: [
        {
          id: 'faq-1',
          num: '01',
          tag: 'METHODOLOGY & TIMELINES',
          question: 'What is the typical timeline and sprint process for a SaaS or B2B platform?',
          answer: 'Our standard engagement is structured into 4 agile two-week sprints (8 weeks total): (1) Conversion diagnostic and data model schema; (2) High-fidelity interface design with interactive micro-interactions; (3) Full-stack TypeScript/React/Node development with automated CI/CD; and (4) Core Web Vitals audit and GDPR/LSSI verification prior to release.',
        },
        {
          id: 'faq-2',
          num: '02',
          tag: 'TECHNICAL PERFORMANCE',
          question: 'How do you guarantee a 99+ Google Core Web Vitals score?',
          answer: 'We eliminate bloated third-party templates. We deploy Server-Side Rendering (SSR), Brotli edge CDN compression, predictive route pre-fetching, and mathematically optimized vector media. Every build passes automated Lighthouse gatekeeper tests in staging environments.',
        },
        {
          id: 'faq-3',
          num: '03',
          tag: 'LEGAL COMPLIANCE',
          question: 'How does your solution ensure strict European GDPR and Spanish LSSI compliance?',
          answer: 'We enforce hard pre-blocking of analytical and advertising trackers until explicit opt-in is granted via the cookie consent interface (LSSI Art. 22.2). On lead forms, we implement unbundled, unchecked checkboxes and dual-layer privacy disclosures as required by the GDPR and AEPD guidelines.',
        },
        {
          id: 'faq-4',
          num: '04',
          tag: 'AI & AUTONOMY',
          question: 'How are AI agents integrated without exposing corporate IP or private data?',
          answer: 'We architect private RAG pipelines connected to your internal data stores. Your proprietary data is never used to train public commercial LLMs. We also incorporate strict deterministic safety guardrails and human-in-the-loop fallback mechanisms for critical operations.',
        },
        {
          id: 'faq-5',
          num: '05',
          tag: 'INTELLECTUAL PROPERTY',
          question: 'Who owns the source code and digital intellectual property?',
          answer: 'Your company retains 100% ownership of all Git repositories, codebases, design systems, and cloud configurations upon final payment. We enforce zero vendor lock-in and deliver complete technical documentation for your internal engineers to scale.',
        },
        {
          id: 'faq-6',
          num: '06',
          tag: 'SLA & MAINTENANCE',
          question: 'What is included in post-launch maintenance and SLA uptime guarantees?',
          answer: 'We provide comprehensive SLAs featuring 24/7 proactive monitoring, daily redundant snapshots stored in EU data centers, continuous security patch management, and a guaranteed < 2-hour response window for critical incidents.',
        },
      ],
    },
    leadMagnet: {
      kicker: 'Exclusive Lead Magnet · 2026 Edition',
      title: '10 Critical Web Architecture Mistakes That Kill B2B Conversion',
      subtitle: 'A condensed technical guide for CEOs, CTOs, and Heads of Growth planning a web redesign this year. Avoid spending tens of thousands on decorative sites that fail to generate corporate pipeline.',
      pdfPages: 'Executive PDF (18 Pages)',
      readTime: 'Read: 12 min',
      immediateAccess: 'Instant Access',
      formTitle: 'Receive the Guide in Your Inbox',
      formSubtitle: 'Enter your business details to generate your verified download link.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Marc Navarro',
      emailLabel: 'Corporate Email',
      emailPlaceholder: 'name@yourcompany.com',
      companyLabel: 'Company / Startup',
      companyPlaceholder: 'e.g. NexaTech SL',
      challengeLabel: 'Biggest Website Challenge',
      challengeOptions: {
        conversion: 'Low inbound lead conversion rate',
        redesign: 'Outdated or amateur brand design',
        saas: 'Slow, unstable technical architecture',
        ai: 'Lack of automation and AI workflows',
      },
      consentText: 'Explicit consent (Required)',
      privacyLinkText: 'Privacy Policy',
      consentSuffix: 'and authorize the processing of my contact information in accordance with EU GDPR (2016/679) and LSSI-CE to receive this technical guide and engineering updates.',
      submitButton: 'Download Free 2026 Checklist',
      submittingButton: 'Validating consent & generating guide...',
      legalLayer: {
        title: 'Basic Data Protection Notice (EU GDPR / LSSI-CE)',
        responsible: 'Data Controller: AURA Digital // Creative B2B Engineering (Spain).',
        purpose: 'Purpose: Delivery of requested technical asset and B2B commercial follow-up upon consent.',
        legalBasis: 'Legal Basis: Explicit consent of the data subject (Art. 6.1.a GDPR).',
        recipients: 'Recipients: No data is shared with third parties without legal mandate.',
        rights: 'Rights: Access, rectification, erasure, and objection via legal@auradigital.es.',
      },
      success: {
        badge: 'Consent Logged · GDPR Compliant',
        title: 'Your Guide is Ready for Download!',
        body: 'We sent a copy directly to your inbox. You can also read or download it right here:',
        readOnline: 'Read Guide Online Now',
        downloadPdf: 'Download PDF Version',
        anotherRequest: 'Submit another inquiry or update data',
      },
    },
    guideReader: {
      modalTitle: 'Executive Viewer · 10 Critical B2B Web Mistakes (2026)',
      printButton: 'Print / Save as PDF',
      kicker: 'B2B Strategy & Architecture Playbook',
      guideTitle: '10 Critical Web Architecture Mistakes That Kill B2B Conversion',
      intro: 'Published by AURA Digital for European product leaders, CTOs, and founders. This executive guide synthesizes hard data collected across 120+ corporate web platforms.',
      solutionLabel: 'Recommended Engineering Solution:',
      impactLabel: 'Measured business impact:',
      ctaBannerTitle: 'Want to audit your company website with zero commitment?',
      ctaBannerDesc: 'We evaluate your codebase, server response times, and conversion funnel to deliver a 15-minute diagnostic.',
      ctaBannerButton: 'Request Diagnostic',
      footerText: 'AURA Digital Studio · Spain & EU (GDPR Compliant)',
      closeText: 'Close Viewer',
    },
    bookingModal: {
      title: 'Book Technical Feasibility Consultation',
      subtitle: '30-minute private technical session with zero sales fluff. We analyze your current architecture, bottlenecks, and map out a fixed-budget execution plan.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Sarah Ortiz',
      emailLabel: 'Corporate Email',
      emailPlaceholder: 'sarah@company.com',
      companyLabel: 'Company / Project',
      companyPlaceholder: 'e.g. ScaleUp Corp',
      serviceLabel: 'Primary Service Needed',
      budgetLabel: 'Estimated Budget',
      timelineLabel: 'Desired Timeline',
      detailsLabel: 'Tell us briefly about your project or technical bottleneck',
      detailsPlaceholder: 'e.g. We need to re-architect our legacy portal to Next.js, integrate enterprise RBAC auth, and improve B2B pipeline conversion across Europe.',
      consentText: 'GDPR Consent: I agree to confidential processing of the submitted details to coordinate the technical discovery call with AURA Digital in accordance with EU GDPR (2016/679).',
      submitButton: 'Confirm Consultation Request',
      submittingButton: 'Scheduling consultation...',
      successBadge: 'Consultation Request Confirmed',
      successTitle: 'Thank you for your request',
      successDesc: 'Our principal engineer will review your technical requirements and respond within 24 business hours.',
      channelInfo: 'Channel: Private Video Call (Google Meet)',
      closeButton: 'Return to Site',
    },
    footer: {
      desc: 'B2B web engineering and high-conversion architectural studio in Spain. We build low-latency SaaS platforms, autonomous AI workflows, and cinematic web interfaces.',
      address: 'Paseo de la Castellana 95, Madrid · Barcelona Hub',
      navTitle: 'Architecture & Services',
      legalTitle: 'European & Spanish Compliance',
      legalDesc: 'All operations, data capture forms, and analytics strictly comply with Spanish Law 34/2002 (LSSI-CE) and EU GDPR (2016/679).',
      legalNotice: 'Legal Notice (LSSI)',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      kineticKicker: 'Click anywhere to initiate your project',
      kineticText: "LET'S BUILD THE FUTURE",
      kineticCta: 'Initiate Technical Discovery Call',
      copyright: 'All rights reserved.',
    },
    cookies: {
      title: 'Cookie Management (LSSI-CE Art. 22.2)',
      desc: 'We use strictly necessary technical cookies and, with your consent, anonymous analytics to measure performance according to European AEPD guidelines.',
      moreInfo: 'Learn more',
      reject: 'Essential Only',
      accept: 'Accept All',
    },
  },
  fr: {
    nav: {
      services: 'Services',
      caseStudies: 'Études de Cas',
      faq: 'FAQ',
      guide: 'Guide 2026',
      bookConsultation: 'Réserver un Audit',
    },
    hero: {
      kicker: 'STUDIO B2B ESPAGNE & EUROPE',
      location: 'MADRID & BARCELONE',
      compliance: 'CONFORME RGPD & LSSI',
      headlinePart1: 'Ingénierie Web Haute Performance pour',
      headlineGradient: "l'Ère Digitale",
      subtitle:
        'Conception et développement de plateformes SaaS, agents IA et portails B2B pour startups tech et PME en Espagne et Europe. Architecture ultra-rapide conçue pour convertir le trafic corporate en opportunités commerciales de haut niveau.',
      primaryCta: 'Réserver un Audit de Faisabilité',
      secondaryCta: 'Télécharger la Checklist B2B 2026',
      metricTtfb: 'Temps de Réponse TTFB',
      metricConversion: 'Hausse Moyenne de Conversion',
      metricLighthouse: 'Score Google PageSpeed',
      metricLegal: '100% Conforme RGPD / LSSI',
    },
    bento: {
      sectionKicker: "Capacités d'Ingénierie",
      sectionTitlePart1: 'Des Services Pensés pour la',
      sectionTitleGradient: 'Conversion et la Montée en Charge',
      sectionSubtitle:
        'Chaque architecture est conçue sur mesure, éliminant les intermédiaires lents et garantissant une sécurité technique maximale avec un retour sur investissement mesurable.',
      card1: {
        tag: '01 · ARCHITECTURE',
        title: 'Plateformes SaaS & Applications Web Full-Stack',
        desc: 'Développement complet depuis les infrastructures cloud jusqu’aux micro-interactions cinématographiques. Conçu pour absorber des milliers d’utilisateurs corporate simultanés avec une fiabilité bancaire.',
        f1: 'React 19 / Next.js & Node.js ultra-faible latence',
        f2: 'Authentification RBAC et passerelles de paiement sécurisées',
        f3: 'Modèles de données relationnels optimisés',
        f4: 'Tableaux de bord analytiques temps réel',
        stack: 'Stack: Node / React / TypeScript / PostgreSQL',
        cta: 'Vérifier la faisabilité',
      },
      card2: {
        tag: '02 · IA APPLIQUÉE',
        title: 'Agents IA & Pipelines Autonomes',
        desc: 'Intégrez des modèles de langage avancés, des agents autonomes et des architectures RAG privées pour automatiser vos processus opérationnels B2B complexes sans fuite de données.',
        bottomText: 'Automatisation backoffice & acquisition de leads',
        cta: 'Voir les cas IA',
      },
      card3: {
        tag: '03 · PERFORMANCE',
        title: 'Core Web Vitals & Optimisation Extrême',
        desc: 'Chaque 100ms de latence supplémentaire réduit les conversions de 7%. Nous réarchitecturons le rendu critique pour garantir des scores parfaits de 99+ sur Google Lighthouse.',
        auditTitle: 'Audit Lighthouse',
        bottomText: 'Audit instantané inclus',
        cta: 'Auditer votre site',
      },
      card4: {
        tag: '04 · CONFORMITÉ LÉGALE & SLA',
        title: 'Maintenance Critique & Blindage LSSI / RGPD Espagne',
        desc: 'Évitez les amendes de la CNIL/AEPD et les pannes serveur. Conformité européenne complète : gestion des cookies par couches, formulaires à consentement explicite et SLA de disponibilité 99.9%.',
        f1Title: 'LSSI-CE Art. 22.2',
        f1Desc: 'Blocage préalable strict des scripts traceurs et bandeau conforme.',
        f2Title: 'RGPD UE 2016/679',
        f2Desc: 'Cases à cocher non pré-cochées et double niveau d’information.',
        f3Title: 'SLA 24/7 Garanti',
        f3Desc: 'Sauvegardes quotidiennes en Europe et résolution critique en < 2h.',
        bottomText: 'Indispensable pour les entreprises vendant à des comptes corporate en Europe',
        cta: 'Demander un plan de support',
      },
    },
    caseStudies: {
      kicker: 'Portfolio de Projets',
      region: 'ESPAGNE & EUROPE',
      titlePart1: 'Une Ingénierie qui Génère une',
      titleGradient: 'Croissance Mesurable',
      tabs: {
        all: 'Tous les Projets',
        fintech: 'FinTech & Paiements',
        cloud: 'Logistique & Cloud',
        ai: 'Agents IA',
      },
      delivered: 'Livré & Certifié',
      viewCase: 'Examiner le Projet',
      fullCaseModal: "Voir l'Étude Complète",
      challengeTitle: 'Le Défi Initial',
      solutionTitle: "Solution d'Ingénierie",
      metricsTitle: 'Résultats Certifiés en Production',
      needSimilar: 'Besoin d’une architecture similaire pour votre organisation ?',
      bookCta: 'Réserver un Audit Technique',
    },
    socialProof: {
      trustedBy: 'Architecture technique de confiance pour startups logicielles et scale-ups européennes',
      kicker: 'Preuves Quantitatives',
      title: 'Impact Réel en Production',
      subtitle: 'Nous ne concevons pas de vitrines décoratives. Nous bâtissons des moteurs digitaux conçus pour alimenter directement votre pipeline de vente B2B.',
      case1: {
        metric: '+42%',
        metricLabel: 'Conversion Inbound Entreprise (6 mois)',
        location: 'Madrid, ES',
        quote: 'Notre produit SaaS était puissant mais notre site ressemblait à un template générique incapable de rassurer les directions des achats. La refonte a positionné notre marque au niveau des meilleurs acteurs de la Silicon Valley et a fait bondir les demandes de démo de 42% au premier trimestre.',
        name: 'Carlos Mendoza',
        role: 'CTO & Co-Fondateur chez Novaflow Tech',
      },
      case2: {
        metric: '-65% LCP',
        metricLabel: 'De 3.2s à 0.7s de temps de chargement',
        location: 'Barcelone, ES',
        quote: 'Notre priorité absolue était la stricte conformité RGPD et la vitesse de navigation pour nos clients corporate soumis à des pare-feux stricts. AURA a obtenu un score de 100 sur Lighthouse et nous avons conclu notre premier contrat à 6 chiffres le mois suivant.',
        name: 'Elena López',
        role: 'Directrice de la Croissance chez Securitas Cloud SL',
      },
    },
    faq: {
      kicker: 'Foire Aux Questions',
      titlePart1: 'Ingénierie Transparente,',
      titleGradient: 'Sans Ligne Cachée',
      subtitle: 'Réponses techniques et contractuelles directes pour directeurs techniques, fondateurs et responsables de produit.',
      sideCardTitle: 'Des exigences d’architecture spécifiques ?',
      sideCardDesc: 'Chaque plateforme d’entreprise comporte ses propres contraintes. Intégration ERP, LLMs locaux ou audits de cybersécurité : parlons-en lors d’un échange technique sans engagement de 30 minutes.',
      responseTime: 'Délai de réponse : < 24h ouvrées',
      ndaAvailable: 'Accord de confidentialité (NDA) disponible',
      sideCta: 'Évaluer la Faisabilité Technique',
      items: [
        {
          id: 'faq-1',
          num: '01',
          tag: 'MÉTHODOLOGIE & DÉLAIS',
          question: 'Quel est le calendrier type pour une plateforme SaaS ou une refonte B2B ?',
          answer: 'Notre cycle type s’articule en 4 sprints agiles de 2 semaines (8 semaines au total) : (1) Diagnostic de conversion et schéma de données ; (2) Conception d’interface haute fidélité avec micro-interactions ; (3) Développement full-stack TypeScript/React/Node et pipelines CI/CD ; et (4) Audit de performance Core Web Vitals et validation juridique RGPD/LSSI avant mise en production.',
        },
        {
          id: 'faq-2',
          num: '02',
          tag: 'PERFORMANCE TECHNIQUE',
          question: 'Comment garantissez-vous un score de 99+ sur Google Core Web Vitals ?',
          answer: 'Nous éliminons les frameworks lourds et templates superflus. Nous mettons en œuvre le rendu côté serveur (SSR), la compression Brotli en périphérie CDN, le découpage intelligent du code (code splitting) et l’optimisation mathématique des médias. Chaque version subit des tests Lighthouse automatisés en pré-production.',
        },
        {
          id: 'faq-3',
          num: '03',
          tag: 'CONFORMITÉ JURIDIQUE',
          question: 'En quoi consiste le blindage légal face à la réglementation RGPD et LSSI en Espagne ?',
          answer: 'Nous configurons le blocage amont strict de tout tracker analytique jusqu’à l’obtention d’un consentement libre et éclairé via le bandeau de cookies (LSSI Art. 22.2). Sur les formulaires, les cases ne sont jamais pré-cochées et nous intégrons les mentions d’information à deux niveaux préconisées par l’AEPD et la CNIL.',
        },
        {
          id: 'faq-4',
          num: '04',
          tag: 'IA & AUTONOMIE',
          question: 'Comment intégrer des agents IA sans exposer les données sensibles de l’entreprise ?',
          answer: 'Nous développons des pipelines RAG privés connectés à vos bases documentaires internes. Vos données propriétaires ne sont jamais envoyées pour ré-entraîner des modèles publics commerciaux. Nous incluons également des garde-fous déterministes et un contrôle humain pour les tâches critiques.',
        },
        {
          id: 'faq-5',
          num: '05',
          tag: 'PROPRIÉTÉ INTELLECTUELLE',
          question: 'Qui détient la propriété du code source et des actifs créés ?',
          answer: 'Votre entreprise détient 100% de la propriété intellectuelle, des dépôts Git et des configurations cloud dès le règlement final. Nous n’imposons aucun verrouillage propriétaire (vendor lock-in) et remettons une documentation exhaustive pour vos équipes internes.',
        },
        {
          id: 'faq-6',
          num: '06',
          tag: 'SLA & MAINTENANCE',
          question: 'Que comprend le support post-lancement et les engagements de SLA ?',
          answer: 'Nous proposons des contrats SLA comprenant une supervision proactive 24/7, des sauvegardes quotidiennes redondantes en serveurs européens, des mises à jour continues de sécurité et un temps d’intervention garanti sous 2h en cas d’incident critique.',
        },
      ],
    },
    leadMagnet: {
      kicker: 'Lead Magnet Exclusif · Édition 2026',
      title: '10 Erreurs Critiques qui Plombent la Conversion Web en B2B Tech',
      subtitle: 'Un guide technique condensé pour les CEO, CTO et directeurs de la croissance qui envisagent une refonte web cette année. Évitez de dépenser des dizaines de milliers d’euros dans des designs vides qui ne génèrent aucun pipe commercial.',
      pdfPages: 'Guide Exécutif PDF (18 Pages)',
      readTime: 'Lecture : 12 min',
      immediateAccess: 'Accès Immédiat',
      formTitle: 'Recevez le Guide dans votre Boîte Mail',
      formSubtitle: 'Indiquez vos coordonnées professionnelles pour générer votre lien de téléchargement vérifié.',
      nameLabel: 'Nom et Prénom',
      namePlaceholder: 'Ex. Marc Navarro',
      emailLabel: 'Email Professionnel',
      emailPlaceholder: 'nom@votreentreprise.fr',
      companyLabel: 'Entreprise / Startup',
      companyPlaceholder: 'Ex. NexaTech SAS',
      challengeLabel: 'Défi Principal de votre Web',
      challengeOptions: {
        conversion: 'Faible taux de conversion des leads',
        redesign: 'Design vieillissant / manque de crédibilité',
        saas: 'Architecture technique lente ou instable',
        ai: 'Manque d’automatisation et d’agents IA',
      },
      consentText: 'Consentement explicite (Obligatoire)',
      privacyLinkText: 'Politique de Confidentialité',
      consentSuffix: 'et j’autorise le traitement de mes coordonnées conformément au RGPD (UE 2016/679) et à la LSSI pour recevoir ce guide technique et des informations sur l’ingénierie web.',
      submitButton: 'Télécharger la Checklist 2026 Gratuite',
      submittingButton: 'Validation du consentement & génération du guide...',
      legalLayer: {
        title: 'Information de base sur la Protection des Données (RGPD / LSSI)',
        responsible: 'Responsable : AURA Digital // Creative B2B Engineering (Espagne/UE).',
        purpose: 'Finalité : Envoi de la ressource demandée et prospection B2B spécialisée si consenti.',
        legalBasis: 'Légitimation : Consentement explicite de l’intéressé (Art. 6.1.a RGPD).',
        recipients: 'Destinataires : Aucune cession de données à des tiers sans obligation légale.',
        rights: 'Droits : Accès, rectification, effacement et opposition via legal@auradigital.es.',
      },
      success: {
        badge: 'Consentement Enregistré · Conforme RGPD',
        title: 'Votre Guide est Prêt !',
        body: 'Une copie a été envoyée sur votre messagerie. Vous pouvez également le consulter ou le télécharger immédiatement ici :',
        readOnline: 'Consulter le Guide en Ligne',
        downloadPdf: 'Télécharger la Version PDF',
        anotherRequest: 'Faire une autre demande ou actualiser les données',
      },
    },
    guideReader: {
      modalTitle: 'Visionneuse Exécutive · 10 Erreurs Web B2B (2026)',
      printButton: 'Imprimer / Enregistrer en PDF',
      kicker: 'Document d’Architecture et de Stratégie B2B',
      guideTitle: '10 Erreurs Critiques qui Plombent la Conversion Web en B2B Tech',
      intro: 'Publié par AURA Digital pour les dirigeants tech et responsables de produit. Ce guide condense les enseignements tirés de l’audit de plus de 120 plateformes d’entreprises.',
      solutionLabel: 'Solution d’Ingénierie Recommandée :',
      impactLabel: 'Impact business mesuré :',
      ctaBannerTitle: 'Souhaitez-vous auditer la web de votre entreprise sans engagement ?',
      ctaBannerDesc: 'Nous évaluons votre stack, vos temps de réponse et vos tunnels de conversion pour vous remettre un diagnostic en 15 minutes.',
      ctaBannerButton: 'Demander un Diagnostic',
      footerText: 'AURA Digital Studio · Espagne & Europe (Conforme RGPD)',
      closeText: 'Fermer la Visionneuse',
    },
    bookingModal: {
      title: 'Réserver un Audit Technique de Faisabilité',
      subtitle: 'Session privée de 30 minutes sans discours commercial inutile. Nous analysons votre architecture actuelle, vos goulets d’étranglement et vous proposons un plan chiffré.',
      nameLabel: 'Nom et Prénom',
      namePlaceholder: 'Ex. Sophie Bernard',
      emailLabel: 'Email Professionnel',
      emailPlaceholder: 'sophie@entreprise.fr',
      companyLabel: 'Entreprise / Projet',
      companyPlaceholder: 'Ex. ScaleUp SAS',
      serviceLabel: 'Service Requis',
      budgetLabel: 'Budget Estimé',
      timelineLabel: 'Délai Souhaité',
      detailsLabel: 'Décrivez brièvement votre projet ou défi technique',
      detailsPlaceholder: 'Ex. Nous souhaitons moderniser notre portail client en Next.js, sécuriser les flux de données et multiplier nos prises de rendez-vous B2B en Europe.',
      consentText: 'Consentement RGPD : J’accepte le traitement confidentiel des données transmises pour l’organisation de la session technique avec AURA Digital conformément au RGPD (UE 2016/679).',
      submitButton: 'Confirmer la Demande d’Audit',
      submittingButton: 'Traitement de la réservation...',
      successBadge: 'Demande Reçue avec Succès',
      successTitle: 'Merci pour votre démarche',
      successDesc: 'Notre ingénieur principal étudiera votre cahier des charges et vous répondra sous 24h ouvrées.',
      channelInfo: 'Canal : Visioconférence Privée (Google Meet)',
      closeButton: 'Retourner au Site',
    },
    footer: {
      desc: 'Studio d’ingénierie web et d’architecture B2B haute conversion en Espagne et Europe. Développement de plateformes SaaS, workflows IA autonomes et interfaces cinématographiques.',
      address: 'Paseo de la Castellana 95, Madrid · Hub Barcelone',
      navTitle: 'Architecture & Services',
      legalTitle: 'Conformité Européenne & Espagnole',
      legalDesc: 'Toutes les opérations et formulaires respectent rigoureusement la loi espagnole LSSI-CE 34/2002 et le RGPD européen (UE 2016/679).',
      legalNotice: 'Mentions Légales (LSSI)',
      privacy: 'Politique de Confidentialité',
      cookies: 'Politique des Cookies',
      kineticKicker: 'Cliquez n’importe où pour initier votre projet',
      kineticText: "LET'S BUILD THE FUTURE",
      kineticCta: 'Initier un Audit Technique de Faisabilité',
      copyright: 'Tous droits réservés.',
    },
    cookies: {
      title: 'Gestion des Cookies (LSSI-CE Art. 22.2)',
      desc: 'Nous utilisons des cookies techniques nécessaires et, avec votre accord, des mesures analytiques anonymes pour évaluer la performance selon les directives AEPD et CNIL.',
      moreInfo: 'En savoir plus',
      reject: 'Essentiels Uniquement',
      accept: 'Tout Accepter',
    },
  },
};
