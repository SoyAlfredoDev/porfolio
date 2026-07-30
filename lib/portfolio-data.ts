export type ProjectCategory = "web" | "landing" | "software" | "ai";

/** Optional client attribution when work was built for an external company. */
export type ProjectClient = {
  name: string;
  url: string;
  /** Override default i18n “Creado para {name}” / “Built for {name}” */
  labelEs?: string;
  labelEn?: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  category: ProjectCategory;
  description: { es: string; en: string };
  url?: string;
  tags: string[];
  client?: ProjectClient;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "web",
  "landing",
  "software",
  "ai",
];

export const CATEGORY_ACCENTS: Record<
  ProjectCategory,
  { from: string; to: string; glow: string }
> = {
  web: {
    from: "#01c676",
    to: "#34d399",
    glow: "rgba(1, 198, 118, 0.35)",
  },
  landing: {
    from: "#0ea5e9",
    to: "#38bdf8",
    glow: "rgba(14, 165, 233, 0.35)",
  },
  software: {
    from: "#1d4ed8",
    to: "#3b82f6",
    glow: "rgba(29, 78, 216, 0.35)",
  },
  ai: {
    from: "#f59e0b",
    to: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.35)",
  },
};

/** Shared SmartPro attribution — reuse on every project built for them. */
export const SMARTPRO_CLIENT: ProjectClient = {
  name: "SmartPro",
  url: "https://smartpro.cl",
  labelEs: "Creado para SmartPro",
  labelEn: "Built for SmartPro",
};

export function getClientLabel(
  client: ProjectClient,
  locale: "es" | "en",
  fallbackTemplate: string,
): string {
  const custom = locale === "es" ? client.labelEs : client.labelEn;
  if (custom) return custom;
  return fallbackTemplate.replace("{name}", client.name);
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "appsfly-saas",
    name: "AppsFly SaaS",
    category: "software",
    description: {
      es: "Plataforma SaaS para control de ventas, compras, inventario y gastos. Producto propio de AppsFly.",
      en: "SaaS platform for sales, purchases, inventory, and expense control. AppsFly’s own product.",
    },
    url: "https://appsfly.app",
    tags: ["SaaS", "Next.js", "Gestión"],
  },
  {
    id: "appsfly-web",
    name: "AppsFly",
    category: "web",
    description: {
      es: "Sitio corporativo de AppsFly: servicios de desarrollo web, landings, automatización y software a medida en Chile.",
      en: "AppsFly corporate site: web development, landings, automation, and custom software services in Chile.",
    },
    url: "https://appsfly.cl",
    tags: ["Next.js", "Agencia", "Landing"],
  },
  {
    id: "isapres-premium",
    name: "Isapres Premium",
    category: "landing",
    description: {
      es: "Landing page para comparador de isapres con diseño claro, enfoque comercial y experiencia optimizada para conversión.",
      en: "Landing page for an isapre comparator with a clear design, commercial focus, and conversion-optimized experience.",
    },
    url: "https://isaprespremium.cl/",
    tags: ["WordPress", "Landing Page", "Responsive"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "desde-tu-7",
    name: "Desde Tu 7%",
    category: "landing",
    description: {
      es: "Plataforma de cotización de isapres con cotizador digital, agenda online y valor UF en tiempo real.",
      en: "Isapre quotation platform with a digital quote tool, online scheduling, and real-time UF value.",
    },
    url: "https://desdetu7.cl/",
    tags: ["Next.js", "Vercel", "Isapres"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "estudio-lyv",
    name: "Estudio LyV",
    category: "web",
    description: {
      es: "Sitio institucional moderno para estudio creativo, con navegación fluida y presentación visual de servicios.",
      en: "Modern institutional site for a creative studio, with fluid navigation and a visual presentation of services.",
    },
    url: "https://www.estudiolyv.cl/",
    tags: ["Next.js", "Vercel", "UI/UX"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "turismo-dabar",
    name: "Turismo Dabar",
    category: "landing",
    description: {
      es: "Landing turística con propuesta visual atractiva, información de destinos y diseño orientado a captación de visitantes.",
      en: "Tourism landing with an attractive visual proposal, destination info, and a design focused on capturing visitors.",
    },
    url: "https://turismodabar.cl/",
    tags: ["Next.js", "Vercel", "Turismo"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "hotel-casa-paraiso",
    name: "Hotel Casa Paraíso",
    category: "web",
    description: {
      es: "Sitio de hotel con reservas en línea, catálogo de habitaciones y experiencia de compra integrada.",
      en: "Hotel website with online bookings, room catalog, and an integrated purchase experience.",
    },
    url: "https://hotelcasaparaiso.cl/",
    tags: ["Next.js", "Vercel", "Reservas"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "cotizalo-antes",
    name: "Cotízalo Antes",
    category: "software",
    description: {
      es: "Plataforma integral de cotización de isapres: sitio web y sistema de gestión para comparar y cotizar planes de salud.",
      en: "End-to-end isapre quotation platform: website and management system to compare and quote health plans.",
    },
    url: "https://cotizaloantes.cl/",
    tags: ["Página", "Sistema", "Isapres"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "cotizador-premium",
    name: "Cotizador Premium",
    category: "software",
    description: {
      es: "Comparador de planes Isapre con cotizador en vivo, directorio de isapres y red de asesores certificados.",
      en: "Isapre plan comparator with a live quote tool, isapre directory, and a network of certified advisors.",
    },
    url: "https://cotizadorpremium.cl/cotizador",
    tags: ["Next.js", "Vercel", "Isapres"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "agente-protegido",
    name: "Agente Protegido",
    category: "landing",
    description: {
      es: "Asesoría y defensa administrativa para ejecutivos del sistema de salud en Chile, con enfoque en protección profesional ante procesos y sanciones.",
      en: "Administrative defense and advisory for health-system executives in Chile, focused on professional protection in regulatory processes and sanctions.",
    },
    url: "https://agenteprotegido.cl/",
    tags: ["Landing Page", "Salud", "Responsive"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "tu-promesa",
    name: "Tu Promesa",
    category: "landing",
    description: {
      es: "Plataforma para visibilizar y denunciar incumplimientos inmobiliarios: retrasos de entrega, cambios de condiciones y problemas con promesas de compraventa.",
      en: "Platform to report and surface real-estate breaches: delivery delays, condition changes, and purchase-promise issues.",
    },
    url: "https://tupromesa.cl/",
    tags: ["Landing Page", "Inmobiliaria", "Next.js"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "experto-en-salud",
    name: "Experto en Salud",
    category: "landing",
    description: {
      es: "Asesoría personalizada para elegir, comparar y cambiar planes de Isapre en Chile, optimizando cobertura de salud.",
      en: "Personalized advisory to choose, compare, and switch Isapre plans in Chile, optimizing health coverage.",
    },
    url: "https://www.expertoensalud.cl/",
    tags: ["Landing Page", "Isapres", "Asesoría"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "realstock",
    name: "RealStock",
    category: "web",
    description: {
      es: "Biblioteca de contenido audiovisual latinoamericano auténtico y premium: imágenes, videos y reels para marcas.",
      en: "Library of authentic premium Latin American audiovisual content: images, videos, and reels for brands.",
    },
    url: "https://realstock.cl/",
    tags: ["Web", "Media", "UI/UX"],
    client: SMARTPRO_CLIENT,
  },
  {
    id: "cotizador-inteligente",
    name: "Cotizador Inteligente",
    category: "software",
    description: {
      es: "Comparador gratuito de Isapres en Chile: cotizador en vivo, calculadora del 7%, catálogo de planes y acompañamiento con asesores.",
      en: "Free Isapre comparator for Chile: live quote tool, 7% calculator, plan catalog, and advisor-guided recommendations.",
    },
    url: "https://cotizadorinteligente.cl/",
    tags: ["Next.js", "Isapres", "Cotizador"],
  },
  {
    id: "ai-assist",
    name: "Asistente IA de Cotización",
    category: "ai",
    description: {
      es: "Integración de asistencia con IA para orientar cotizaciones, responder consultas frecuentes y acelerar el flujo comercial.",
      en: "AI assistance integration to guide quotes, answer FAQs, and speed up the commercial flow.",
    },
    tags: ["IA", "Integración", "Automatización"],
  },
];
