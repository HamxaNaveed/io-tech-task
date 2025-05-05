export const fallbackServices = [
  {
    id: 1,
    title_en: "Corporate Legal Services",
    title_ar: "الخدمات القانونية للشركات",
    slug: "corporate-legal-services",
    description_en:
      "<p>Our corporate legal services provide comprehensive support for businesses of all sizes. We offer expert advice on company formation, corporate governance, mergers and acquisitions, and regulatory compliance.</p><p>Our team of experienced attorneys will guide you through complex legal frameworks to ensure your business operates within the law while achieving its objectives.</p>",
    approach_en:
      "<p>Our approach to corporate legal matters is both strategic and practical. We begin with a thorough assessment of your business needs and objectives, then develop customized legal solutions that align with your goals.</p><p>We prioritize clear communication and proactive problem-solving to help you navigate legal challenges efficiently.</p>",
    image: {
      url: "/placeholder.svg",
    },
    approach_image: {
      url: "/placeholder.svg",
    },
    features: [
      {
        title_en: "Company Formation",
        description_en:
          "<p>Assistance with all aspects of setting up a new business entity, including documentation, registration, and compliance with local regulations.</p>",
      },
      {
        title_en: "Corporate Governance",
        description_en:
          "<p>Development and implementation of governance frameworks, board procedures, and compliance policies.</p>",
      },
      {
        title_en: "Mergers & Acquisitions",
        description_en:
          "<p>Legal support throughout the M&A process, including due diligence, transaction structuring, and post-merger integration.</p>",
      },
    ],
  },
  {
    id: 2,
    title_en: "Dispute Resolution",
    title_ar: "حل النزاعات",
    slug: "dispute-resolution",
    description_en:
      "<p>Our dispute resolution services offer effective strategies for resolving conflicts across various domains. We specialize in litigation, arbitration, mediation, and negotiation to help clients achieve favorable outcomes.</p><p>Our goal is to resolve disputes efficiently while minimizing costs and disruption to your business or personal life.</p>",
    approach_en:
      "<p>We take a tailored approach to dispute resolution, first understanding the nature of the conflict and your objectives. Then we develop and implement the most appropriate strategy, whether that involves negotiation, mediation, arbitration, or litigation.</p><p>Throughout the process, we provide clear guidance and representation to protect your interests.</p>",
    image: {
      url: "/placeholder.svg",
    },
    approach_image: {
      url: "/placeholder.svg",
    },
    features: [
      {
        title_en: "Commercial Litigation",
        description_en:
          "<p>Representation in business disputes, contract breaches, partnership conflicts, and other commercial matters.</p>",
      },
      {
        title_en: "Arbitration Services",
        description_en:
          "<p>Expert representation in domestic and international arbitration proceedings across various industries.</p>",
      },
      {
        title_en: "Mediation Support",
        description_en:
          "<p>Facilitation of mediated negotiations to reach mutually acceptable resolutions without lengthy court proceedings.</p>",
      },
    ],
  },
  {
    id: 3,
    title_en: "Real Estate Law",
    title_ar: "قانون العقارات",
    slug: "real-estate-law",
    description_en:
      "<p>Our real estate legal services cover all aspects of property transactions and management. From residential purchases to commercial developments, we provide comprehensive legal support to protect your property interests.</p><p>We handle everything from contract drafting and due diligence to dispute resolution and regulatory compliance.</p>",
    approach_en:
      "<p>Our approach to real estate law combines technical expertise with practical business understanding. We conduct thorough reviews of property documentation, identify potential issues, and develop strategies to mitigate risks.</p><p>We ensure all transactions are structured appropriately and comply with relevant regulations and zoning requirements.</p>",
    image: {
      url: "/placeholder.svg",
    },
    approach_image: {
      url: "/placeholder.svg",
    },
    features: [
      {
        title_en: "Property Transactions",
        description_en:
          "<p>Legal support for buying, selling, and leasing residential and commercial properties, including contract review and negotiation.</p>",
      },
      {
        title_en: "Development Projects",
        description_en:
          "<p>Comprehensive legal services for construction and development projects, including permits, contracts, and compliance.</p>",
      },
      {
        title_en: "Property Dispute Resolution",
        description_en:
          "<p>Representation in boundary disputes, title issues, landlord-tenant conflicts, and other property-related disputes.</p>",
      },
    ],
  },
  {
    id: 4,
    title_en: "Employment Law",
    title_ar: "قانون العمل",
    slug: "employment-law",
    description_en:
      "<p>Our employment law services provide guidance to both employers and employees on workplace legal matters. We help navigate the complex landscape of employment regulations, rights, and obligations.</p><p>From contract drafting to dispute resolution, we offer practical advice to protect your interests in employment relationships.</p>",
    approach_en:
      "<p>We take a balanced approach to employment law, recognizing the importance of maintaining productive working relationships while protecting legal rights. We focus on preventive strategies to avoid disputes, but also provide strong representation when conflicts arise.</p><p>Our team stays current with evolving employment regulations to ensure our advice reflects the latest legal developments.</p>",
    image: {
      url: "/placeholder.svg",
    },
    approach_image: {
      url: "/placeholder.svg",
    },
    features: [
      {
        title_en: "Employment Contracts",
        description_en:
          "<p>Drafting, reviewing, and negotiating employment agreements, confidentiality clauses, and non-compete agreements.</p>",
      },
      {
        title_en: "Workplace Policies",
        description_en:
          "<p>Development of employee handbooks, workplace policies, and compliance procedures aligned with current regulations.</p>",
      },
      {
        title_en: "Dispute Resolution",
        description_en:
          "<p>Representation in employment disputes, discrimination claims, wrongful termination cases, and severance negotiations.</p>",
      },
    ],
  },
];

export function getFallbackServiceBySlug(slug: string) {
  return fallbackServices.find((service) => service.slug === slug) || null;
}
