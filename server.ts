import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { name, email, company, budget, timeline, projectDetails, rgpdConsent } = req.body;

    if (!email || !email.includes('@') || !rgpdConsent) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios o el consentimiento de privacidad.' });
    }

    const bookingEntry = {
      id: `book_${Date.now()}`,
      name: name?.trim() || 'Cliente Potencial',
      email: email.trim().toLowerCase(),
      company: company?.trim() || 'Empresa Tech',
      budget: budget || '10.000€ - 25.000€',
      timeline: timeline || '1 a 3 meses',
      projectDetails: projectDetails?.trim() || 'Consulta inicial de viabilidad técnica y rediseño',
      rgpdConsent: true,
      createdAt: new Date().toISOString()
    };

    bookings.push(bookingEntry);
    console.log('>>> [CONSULTATION BOOKING RECEIVED]:', JSON.stringify(bookingEntry, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Solicitud de consulta reservada con éxito. Revisaremos tu arquitectura y te responderemos en menos de 24 horas laborables.',
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
