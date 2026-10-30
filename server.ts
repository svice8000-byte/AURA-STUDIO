import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory persistent arrays for demo session
  const leads: any[] = [];
  const bookings: any[] = [];

  // API endpoint for lead capture (Lead Magnet)
  app.post('/api/lead', (req, res) => {
    const { name, email, company, serviceInterest, rgpdConsent, source } = req.body;

    // Server-side validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Por favor, proporciona un correo electrónico corporativo válido.' });
    }
    if (!rgpdConsent) {
      return res.status(400).json({ success: false, error: 'Es obligatorio aceptar el consentimiento informado RGPD/LSSI para recibir el documento.' });
    }

    const leadEntry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name?.trim() || 'Profesional B2B',
      email: email.trim().toLowerCase(),
      company: company?.trim() || 'Empresa / Startup',
      serviceInterest: serviceInterest || 'Auditoría Web & Arquitectura',
      rgpdConsent: true,
      timestamp: new Date().toISOString(),
      country: 'ES',
      source: source || 'checklist_10_errores_b2b',
      ipCountryHint: 'España (EU)'
    };

    leads.push(leadEntry);
    console.log('>>> [LEAD CAPTURED - CONVERSIÓN B2B ESPAÑA]:', JSON.stringify(leadEntry, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Tu solicitud ha sido procesada conforme al RGPD. Tu guía está lista para descarga.',
      leadId: leadEntry.id,
      leadData: {
        name: leadEntry.name,
        email: leadEntry.email,
        guideTitle: 'Guía Ejecutiva: 10 Errores Críticos de Arquitectura Web en B2B Tech (2026)'
      }
    });
  });

  // API endpoint for consultation booking
  app.post('/api/booking', (req, res) => {
    const name = req.body.Nom_Et_Prenom || req.body.name;
    const email = req.body.Email_Professionnel || req.body.email;
    const company = req.body.Entreprise_Projet || req.body.company;
    const service = req.body.Service_Requis || req.body.service;
    const budget = req.body.Budget_Estime || req.body.budget;
    const timeline = req.body.Delai_Souhaite || req.body.timeline;
    const projectDetails = req.body.Description_Projet || req.body.projectDetails;
    const consent = req.body.Consentement_RGPD === 'Accepte' || req.body.Consentement_RGPD === true || req.body.rgpdConsent === true;

    if (!email || !email.includes('@') || !consent) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios o el consentimiento de privacidad / Champs obligatoires manquants.' });
    }

    const bookingEntry = {
      id: `book_${Date.now()}`,
      name: name?.trim() || 'Client / Lead B2B',
      email: email.trim().toLowerCase(),
      company: company?.trim() || 'Entreprise / Startup',
      service: service?.trim() || 'Audit Technique',
      budget: budget || '3.000€ - 7.500€',
      timeline: timeline || '1 - 2 mois',
      projectDetails: projectDetails?.trim() || 'Demande d\'audit technique de faisabilité',
      consent: true,
      createdAt: new Date().toISOString()
    };

    bookings.push(bookingEntry);
    console.log('>>> [CONSULTATION AUDIT BOOKING RECEIVED]:', JSON.stringify(bookingEntry, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Demande d\'audit technique enregistrée avec succès. Notre équipe analysera votre architecture sous 24h ouvrées.',
      bookingId: bookingEntry.id
    });
  });

  // API status check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'online',
      studio: 'AURA Digital // Creative B2B Engineering',
      location: 'Madrid / Barcelona, Spain',
      totalLeads: leads.length,
      totalBookings: bookings.length
    });
  });

  // API endpoint for Virtual Engineering Consultant (Gemini 3.8 Flash)
  app.post('/api/consultant/chat', async (req, res) => {
    try {
      const { message, history = [], lang = 'es' } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ success: false, error: 'A message prompt is required.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY is not defined in environment variables.');
        return res.status(503).json({
          success: false,
          error: 'Le service IA nécessite une clé API configurée sur le serveur (GEMINI_API_KEY).'
        });
      }

      // Map conversation history
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      // Include recent history (limit to last 6 turns to keep context optimal)
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }]
            });
          }
        }
      }

      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: message.trim() }]
      });

      const langName = lang === 'fr' ? 'French' : lang === 'en' ? 'English' : 'Spanish';

      let reply: string | null = null;

      try {
        // Execute Gemini call with 8s timeout to avoid hanging
        const apiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: `You are the Virtual Principal Systems Architect at AURA Digital, an elite B2B creative engineering studio based in Spain (Madrid & Barcelona).
You provide authoritative, highly technical, and strategic architectural guidance for B2B scaleups, SaaS founders, and enterprise engineering teams.
Your areas of expertise:
1. High-Performance Web Architecture (Sub-50ms TTFB, 99+ Core Web Vitals, React 19, Server Components, Edge Caching, Vite/Node.js).
2. Spain & EU Legal/Compliance Architecture (LSSI-CE 34/2002, RGPD/GDPR, Double Opt-in, explicit consent, AEPD standards).
3. Private AI Agent Integrations & RAG pipelines (Safe server-side orchestration, private enterprise vector DBs, sub-second latency).
4. B2B Sales Funnel Engineering (Frictionless B2B conversion loops, measurable ROI, interactive lead magnets).

CRITICAL INSTRUCTIONS:
- You MUST respond in ${langName}.
- Keep your tone sophisticated, technical, direct, and authoritative (like a Principal Architect / VP of Engineering).
- Structure responses with concise Markdown (bold highlights, clear bulleted architectural recommendations, brief code or schema snippets when relevant).
- Avoid corporate fluff or generic AI preambles.
- End your response with a 1-sentence pragmatic suggestion to book an in-depth Architectural Feasibility Audit with AURA Digital if the user has custom constraints.`
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT')), 8500)
        );

        const response: any = await Promise.race([apiPromise, timeoutPromise]);
        reply = response?.text || null;
      } catch (geminiError: any) {
        console.warn('Gemini live call error or timeout, engaging curated architectural fallback:', geminiError?.message);

        // Curated Architectural Knowledge Base Fallback
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('lssi') || lowerMsg.includes('rgpd') || lowerMsg.includes('gdpr') || lowerMsg.includes('legal') || lowerMsg.includes('consent')) {
          if (lang === 'fr') {
            reply = `### Architecture de Conformité Légale : LSSI-CE & RGPD en Espagne

1. **Consentement Exprès (Opt-in Strict) :** L'article 21 de la LSSI espagnole prohibe formellement le démarchage commercial sans consentement préalable exprès. Toute case pré-cochée est nulle de plein droit.
2. **Double Couche d'Information AEPD :** Chaque formulaire B2B doit comporter une couche informative visible (Responsable, Finalité, Base juridique, Droits ARCO/RGPD) avec lien vers la Politique de Confidentialité.
3. **Sécurité et Traçabilité des Preuves :** Horodatage certifié UTC, enregistrement de la version des CGU acceptées et chiffrement des données au repos (AES-256).
4. **Gestion des Cookies (Art. 22.2 LSSI) :** Blocage préventif des scripts analytics/marketing avant acceptation explicite de l'utilisateur.

*Pour valider l'étanchéité juridique de vos tunnels de conversion en Espagne, vous pouvez planifier un Audit Technique avec AURA Digital.*`;
          } else if (lang === 'en') {
            reply = `### Legal Compliance Architecture: Spain LSSI-CE & EU GDPR

1. **Explicit Opt-in Requirement:** Article 21 of the Spanish LSSI strictly forbids unsolicited commercial communications without prior, provable consent. Pre-checked boxes are illegal.
2. **AEPD Two-Layer Disclosure:** Every B2B lead capture interface must display an initial informative layer (Data Controller, Processing Purpose, Legal Basis, ARCO Rights) alongside explicit policy links.
3. **Audit Trail & Cryptographic Verification:** UTC timestamps, exact terms-hash capture, and encrypted storage (AES-256) to withstand Data Protection Agency (AEPD) inspections.
4. **Cookie Consent Automation (Art. 22.2 LSSI):** Prior consent gate preventing non-essential tracking scripts from executing before explicit user agreement.

*To verify your B2B lead funnel against Spanish regulations, book a Technical Feasibility Audit with AURA Digital.*`;
          } else {
            reply = `### Arquitectura de Cumplimiento Técnico: LSSI-CE y RGPD en España

1. **Consentimiento Expreso Obligatorio:** El artículo 21 de la LSSI prohíbe taxativamente el envío de comunicaciones comerciales no solicitadas sin consentimiento previo. Las casillas pre-marcadas son ilegales (Art. 6 RGPD).
2. **Primera Capa Informativa AEPD:** Todo formulario de captación B2B debe incluir los datos del Responsable, Finalidad comercial, Base jurídica de legitimación y ejercicio de derechos.
3. **Trazabilidad de Consentimientos:** Registro de timestamp UTC, versión del clausulado aceptado e IP en base de datos cifrada (AES-256) ante auditorías de la AEPD.
4. **Bloqueo Preventivo de Cookies (Art. 22.2 LSSI):** Ningún script analítico o de prospección debe dispararse antes de la pulsación de aceptación del usuario.

*Para certificar tus flujos de captación B2B en España, te sugerimos reservar una Auditoría Técnica de Viabilidad con AURA Digital.*`;
          }
        } else if (lowerMsg.includes('ttfb') || lowerMsg.includes('vitals') || lowerMsg.includes('lighthouse') || lowerMsg.includes('performance') || lowerMsg.includes('rendimiento')) {
          if (lang === 'fr') {
            reply = `### Architecture de Performance Extrême : TTFB < 50ms & Lighthouse 99+

1. **Distribution Perruche & Edge Caching :** Déploiement sur CDN mondial avec en-têtes \`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400\` et compression HTTP/3 Brotli.
2. **Zero Layout Shift (CLS < 0.01) :** Conteneurs de dimensions réservées, typographies auto-hébergées avec \`font-display: swap\` et rendu prioritaire sans flash de style.
3. **Hydration Pruning (INP < 50ms) :** Découpage du code via \`React.lazy\`, élimination des bundles tiers bloquants et déport des calculs complexes dans des Web Workers.
4. **Shader & WebGL Acceleration :** Rendu GPU via canvas offscreen avec fallback CSS haute fidélité pour éviter la dégradation sur mobile.

*Vous souhaitez faire passer votre plateforme B2B sous la barre des 50ms ? Réservez une session d'ingénierie avec AURA Digital.*`;
          } else if (lang === 'en') {
            reply = `### High-Performance Web Architecture: Sub-50ms TTFB & 99+ Lighthouse

1. **Edge CDN & Stale-While-Revalidate:** Multi-region edge deployment with \`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400\` and HTTP/3 Brotli encoding.
2. **Zero Cumulative Layout Shift (CLS < 0.01):** Hard reservation of aspect ratios, self-hosted fonts with \`font-display: swap\`, and atomic CSS bundling.
3. **Hydration Pruning (INP < 50ms):** Component splitting with \`React.lazy\`, execution of telemetry via background Web Workers, and zero blocking third-party scripts.
4. **GPU-Accelerated Shaders:** Canvas WebGL animations isolated to non-blocking render loops to prevent CPU main thread starvation.

*Looking to benchmark and optimize your application latency? Schedule a Technical Discovery Call with AURA Digital.*`;
          } else {
            reply = `### Arquitectura de Rendimiento: Sub-50ms TTFB y Lighthouse 99+

1. **Edge Caching & Stale-While-Revalidate:** Distribución en CDN perimetral con cabeceras \`Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400\` y compresión HTTP/3 Brotli.
2. **Eliminación Total de CLS (CLS < 0.01):** Asignación estricta de contenedores dimensionales y auto-alojamiento de fuentes tipográficas con \`font-display: swap\`.
3. **Poda de Hidratación (INP < 50ms):** Carga dinámica de módulos (\`React.lazy\`), offloading de operaciones en Web Workers y eliminación de librerías analíticas síncronas.
4. **Optimización de Shaders WebGL:** Renderizado desacoplado del hilo principal para garantizar 60/120 FPS sin consumo térmico en clientes móviles.

*¿Deseas auditar y llevar tu infraestructura B2B al percentil 99? Reserva una Auditoría Técnica de Viabilidad con AURA Digital.*`;
          }
        } else if (lowerMsg.includes('agent') || lowerMsg.includes('ia') || lowerMsg.includes('ai') || lowerMsg.includes('rag') || lowerMsg.includes('vector')) {
          if (lang === 'fr') {
            reply = `### Architecture d'Intégration Sécurisée d'Agents IA B2B

1. **Orchestration Server-Authoritative :** Aucune clé d'API de modèle exposée côté client. Toutes les requêtes transitent par un proxy Express/Node.js avec validation de schéma Zod et limitation de débit.
2. **Pipeline RAG Entreprise Privé :** Vectorisation via Cloud SQL pgvector au sein d'un VPC privé fermé à tout accès public, sans indexation par des modèles tiers.
3. **Garantie Contractuelle Zero Data Retention :** Accords contractuels interdisant formellement l'utilisation des flux d'affaires pour l'entraînement de modèles.
4. **Streaming Temps Réel SSE :** Diffusion progressive des jetons de réponse (Server-Sent Events) pour maintenir une latence perçue inférieure à 400ms.

*Pour concevoir et déployer vos agents d'automatisation d'entreprise, planifiez un Audit d'Architecture avec AURA Digital.*`;
          } else if (lang === 'en') {
            reply = `### Secure Enterprise AI Agent Architecture

1. **Server-Authoritative Orchestration:** Zero client-side API keys. Every AI interaction routes through an Express proxy enforcing strict JSON schemas, IP rate limiting, and JWT auth.
2. **Private RAG Vector Pipeline:** Storage on private VPC vector instances (Cloud SQL pgvector) isolated from public network routes with end-to-end TLS encryption.
3. **Zero Data Retention Guarantees:** Enterprise SLA agreements ensuring your proprietary B2B data is never stored or used to train third-party foundation models.
4. **Low-Latency Streaming:** Real-time token dispatching via Server-Sent Events (SSE) or WebSockets to keep perceived time-to-first-token under 400ms.

*Interested in integrating autonomous private AI agents into your product? Book a Technical Discovery Call with AURA Digital.*`;
          } else {
            reply = `### Arquitectura de Integración de Agentes IA Privados

1. **Orquestación en Servidor Estricta:** Ninguna clave de modelo viaja al navegador. El backend Node.js autentica las peticiones y valida los esquemas de entrada antes de consultar al modelo.
2. **Pipeline RAG con VPC Privada:** Almacenamiento vectorial en Cloud SQL pgvector o instancias dedicadas sin salida pública a internet, garantizando secreto industrial.
3. **Cláusula de Retención Cero (Zero Retention):** Acuerdos que garantizan que los datos confidenciales de tus clientes no se utilizan para reentrenar modelos públicos.
4. **Streaming de Tokens de Baja Latencia:** Entrega progresiva mediante SSE para una experiencia conversacional fluida sin bloqueos de interfaz.

*Si deseas implementar flujos de agentes IA en tu empresa, reserva una Auditoría Técnica de Viabilidad con AURA Digital.*`;
          }
        } else {
          // General architectural response
          if (lang === 'fr') {
            reply = `### Analyse d'Architecture B2B AURA Digital

1. **Architecture Moderne Full-Stack :** Front-end React 19 avec Tailwind CSS couplé à une couche serveur Node.js haut débit pour garantir un temps de réponse optimal et une sécurité maximale.
2. **Génération de Leads & Conversion :** Conception axée sur la suppression des frictions : formulaires asynchrones réactifs, preuves de conformité RGPD intégrées et transitions Framer Motion à 60 FPS.
3. **Conformité & Souveraineté des Données :** Alignement systématique sur les standards AEPD / CNIL et le RGPD européen (UE 2016/679).

*Pour examiner votre feuille de route technique en détail, réservez un Audit de Faisabilité avec notre ingénieur principal.*`;
          } else if (lang === 'en') {
            reply = `### AURA Digital B2B Architecture Assessment

1. **Modern Full-Stack Stack:** React 19 client layer with Tailwind CSS paired with an Express/Node.js edge-ready server architecture ensuring sub-50ms execution and strict security.
2. **High-Conversion B2B Engineering:** Micro-interaction design using Framer Motion, instant client-side validation, and friction-free lead capture tunnels.
3. **European Legal & Privacy Rigor:** Systematic adherence to Spanish LSSI-CE 34/2002 and European GDPR standards (EU 2016/679).

*To review your technical roadmap with our team, book an Architectural Feasibility Audit with AURA Digital.*`;
          } else {
            reply = `### Diagnóstico de Arquitectura B2B AURA Digital

1. **Pila Full-Stack de Alto Rendimiento:** Capa visual React 19 + Tailwind CSS respaldada por backend Node.js perimetral para máxima velocidad de respuesta y seguridad.
2. **Ingeniería de Conversión B2B:** Interfaces cinematográficas con animaciones fluidas a 60 FPS (Framer Motion), micro-interacciones y túneles de captación sin fricción.
3. **Cumplimiento Normativo Español y Europeo:** Alineación estricta con la LSSI-CE 34/2002 y el RGPD europeo (UE 2016/679).

*Para analizar los retos de escalabilidad y conversión de tu plataforma, te invitamos a reservar una Auditoría Técnica con AURA Digital.*`;
          }
        }
      }

      return res.status(200).json({ success: true, reply });
    } catch (error: any) {
      console.error('Error in consultant route handler:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Error processing architectural consultation request.'
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AURA B2B STUDIO] Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
