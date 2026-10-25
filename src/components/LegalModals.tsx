import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'aviso-legal' | 'privacidad' | 'cookies' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] glass-panel rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-[#080812]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="font-syne font-bold text-white text-base">
              {type === 'aviso-legal' && 'Aviso Legal (LSSI-CE 34/2002)'}
              {type === 'privacidad' && 'Política de Privacidad (RGPD UE 2016/679 & LOPDGDD 3/2018)'}
              {type === 'cookies' && 'Política de Cookies y Guía AEPD'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Text Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {type === 'aviso-legal' && (
            <>
              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  1. Información General y Datos Identificativos
                </h3>
                <p>
                  En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos mercantiles y de contacto:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 font-mono text-xs">
                  <li><strong>Titular:</strong> AURA Digital Studio // Creative B2B Engineering</li>
                  <li><strong>Domicilio Social:</strong> Paseo de la Castellana 95, 28046 Madrid, España</li>
                  <li><strong>CIF/NIF:</strong> B-89402918 (Sociedad Limitada Profesional de Tecnología)</li>
                  <li><strong>Email de Contacto Legal:</strong> legal@auradigital.es</li>
                  <li><strong>Actividad:</strong> Servicios de programación, desarrollo de software web y consultoría informática (CNAE 6201).</li>
                </ul>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  2. Condiciones de Uso y Propiedad Intelectual
                </h3>
                <p>
                  El acceso a este portal atribuye la condición de usuario e implica la aceptación plena de las presentes disposiciones. Todos los elementos gráficos, códigos fuente, shaders WebGL, marcas y diseños están protegidos por el Real Decreto Legislativo 1/1996, por el que se aprueba el texto refundido de la Ley de Propiedad Intelectual. Queda prohibida la reproducción total o parcial sin autorización previa y por escrito del titular.
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  3. Legislación Aplicable y Jurisdicción
                </h3>
                <p>
                  Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web, será de aplicación la legislación española, sometiéndose las partes expresamente a la jurisdicción de los Juzgados y Tribunales de la ciudad de Madrid (España).
                </p>
              </div>
            </>
          )}

          {type === 'privacidad' && (
            <>
              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  1. Responsable del Tratamiento de Datos
                </h3>
                <p>
                  El responsable del tratamiento de los datos recabados en los formularios de este sitio web es AURA Digital Studio SL, con domicilio en Madrid (España) y correo electrónico de protección de datos: <strong>dpo@auradigital.es</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  2. Finalidades y Bases Jurídicas del Tratamiento
                </h3>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>
                    <strong>Envío de la Guía y Recursos (Lead Magnet):</strong> Gestión de la entrega del documento técnico solicitado en base al consentimiento explícito otorgado (Art. 6.1.a RGPD).
                  </li>
                  <li>
                    <strong>Atención de Consultas Técnicas:</strong> Tramitación de solicitudes de contacto, presupuesto o análisis de proyectos web en base a la aplicación de medidas precontractuales (Art. 6.1.b RGPD).
                  </li>
                  <li>
                    <strong>Comunicaciones B2B Especializadas:</strong> Remisión de boletines técnicos e información sobre nuevos desarrollos siempre que el usuario haya prestado su consentimiento expreso mediante la casilla no premarcada exigida por la LSSI-CE.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  3. Plazo de Conservación y Derechos ARSOPOL
                </h3>
                <p>
                  Los datos se conservarán mientras se mantenga la relación profesional o hasta que el interesado solicite su supresión. En cualquier momento puede ejercer sus derechos de Acceso, Rectificación, Supresión, Limitación, Portabilidad y Oposición enviando un correo a <strong>legal@auradigital.es</strong> acompañado de documento acreditativo de identidad. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).
                </p>
              </div>
            </>
          )}

          {type === 'cookies' && (
            <>
              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  1. ¿Qué son las Cookies?
                </h3>
                <p>
                  Una cookie es un pequeño archivo de texto que un sitio web guarda en su navegador. Conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE) y la Guía de Cookies de la AEPD, este sitio utiliza únicamente cookies estrictamente necesarias para el funcionamiento técnico y cookies analíticas de navegación si el usuario las autoriza expresamente.
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  2. Clasificación de Cookies Utilizadas
                </h3>
                <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-300">
                  <li>
                    <strong>Cookies Técnicas / Esenciales:</strong> Necesarias para recordar la sesión, el consentimiento otorgado y la navegación básica segura (no requieren consentimiento previo).
                  </li>
                  <li>
                    <strong>Cookies Analíticas (Optativas):</strong> Nos permiten cuantificar el número de usuarios y realizar mediciones estadísticas anónimas para optimizar el rendimiento técnico del sitio (bloqueadas por defecto hasta su aceptación).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-syne font-bold text-white text-base mb-2">
                  3. Gestión del Consentimiento
                </h3>
                <p>
                  Puede revocar o modificar sus preferencias de cookies en cualquier momento borrando el almacenamiento local o restableciendo la configuración del banner en el pie de página.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
