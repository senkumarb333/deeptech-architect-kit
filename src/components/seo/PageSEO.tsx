import { useLocation, useParams, matchPath } from "react-router-dom";
import { SEO, organizationJsonLd, websiteJsonLd, breadcrumbJsonLd } from "./SEO";

type Meta = {
  title: string;
  description: string;
  keywords?: string;
  crumbs?: { name: string; path: string }[];
};

const STATIC: Record<string, Meta> = {
  "/": {
    title: "iYarKai Tech Lab | DeepTech AI & IoT for Smart Agriculture",
    description:
      "AI, IoT, and automation platforms for intelligent agriculture — SILIR mushroom systems, KitHub DeepTech kits, and design thinking workshops.",
    keywords: "smart mushroom farming, IoT agriculture, deeptech India, SILIR, KitHub, design thinking workshops",
  },
  "/products": {
    title: "Products | SILIR Smart Farming & KitHub DeepTech Kits",
    description:
      "Explore SILIR 1000–5000 smart mushroom systems, KitHub innovation kits, and design thinking programs by iYarKai Tech Lab.",
    keywords: "SILIR 1000, SILIR 5000, KitHub, smart farming products, IoT kits",
    crumbs: [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }],
  },
  "/solutions": {
    title: "Solutions | AI Agriculture, Post-Harvest & Innovation",
    description:
      "End-to-end DeepTech solutions across mushroom, poultry, polyhouse, irrigation, post-harvest, consulting, and innovation coaching.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }],
  },
  "/technology": {
    title: "Technology | AI, IoT, Edge & Cloud Stack",
    description:
      "Our DeepTech stack — sensors, edge controllers, AI models, and cloud dashboards powering intelligent agriculture.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Technology", path: "/technology" }],
  },
  "/industries": {
    title: "Industries We Serve | Agri, Food & Research",
    description:
      "iYarKai serves mushroom, poultry, polyhouse, irrigation, post-harvest, and research industries with AI-driven automation.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }],
  },
  "/resources": {
    title: "Resources | Guides, Case Studies & Downloads",
    description:
      "Free DeepTech and smart farming guides, case studies, and technical resources by iYarKai Tech Lab.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }],
  },
  "/company": {
    title: "Company | iYarKai Tech Lab — DeepTech AgriTech India",
    description:
      "Mission, timeline, awards, and testimonials of iYarKai Tech Lab — an India-born DeepTech AgriTech company.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/company" }],
  },
  "/request-demo": {
    title: "Request a Demo | Start Pilot with iYarKai",
    description: "Book a live demo of SILIR smart farming or KitHub DeepTech kits. Start your pilot in weeks.",
  },
  "/book-consultation": {
    title: "Book Consultation | DeepTech Advisory",
    description: "Consult iYarKai experts on AI, IoT, agriculture automation, or innovation strategy.",
  },
  "/partner-application": {
    title: "Become a Partner | iYarKai Tech Lab",
    description: "Join the iYarKai ecosystem as a channel, integration, or research partner.",
  },
  "/investor-inquiry": {
    title: "Investor Inquiry | iYarKai Tech Lab",
    description: "Explore investment opportunities in India's leading DeepTech AgriTech platform.",
  },
  "/privacy": { title: "Privacy Policy | iYarKai Tech Lab", description: "How iYarKai collects, uses, and protects your data." },
  "/terms": { title: "Terms of Service | iYarKai Tech Lab", description: "Terms and conditions for using iYarKai services." },
};

const titleize = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const PageSEO = () => {
  const { pathname } = useLocation();
  const params = useParams();

  let meta: Meta | undefined = STATIC[pathname];

  if (!meta && matchPath("/products/:productId", pathname)) {
    const name = titleize(String(params.productId || "Product"));
    meta = {
      title: `${name} | iYarKai Products`,
      description: `${name} by iYarKai Tech Lab — DeepTech platform for smart agriculture and innovation.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name, path: pathname },
      ],
    };
  }
  if (!meta && matchPath("/solutions/:solutionId", pathname)) {
    const name = titleize(String(params.solutionId || "Solution"));
    meta = {
      title: `${name} | iYarKai Solutions`,
      description: `${name} solution — AI, IoT, and automation stack by iYarKai Tech Lab.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
        { name, path: pathname },
      ],
    };
  }

  if (!meta) {
    meta = {
      title: "iYarKai Tech Lab | DeepTech for Intelligent Agriculture",
      description: "DeepTech AI, IoT, and automation platforms for intelligent agriculture.",
    };
  }

  const jsonLd: any[] = [organizationJsonLd, websiteJsonLd];
  if (meta.crumbs) jsonLd.push(breadcrumbJsonLd(meta.crumbs));

  const noindex =
    pathname === "/request-demo" ||
    pathname === "/book-consultation" ||
    pathname === "/partner-application" ||
    pathname === "/investor-inquiry";

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      path={pathname}
      keywords={meta.keywords}
      jsonLd={jsonLd}
      noindex={noindex}
    />
  );
};
