import { Link } from "react-router-dom";
import { Linkedin, Youtube, Twitter, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, url: "https://www.linkedin.com/company/iyarkai/", label: "LinkedIn" },
  { icon: Youtube, url: "https://www.youtube.com/@iyarkaitechlab8827", label: "YouTube" },
  { icon: Twitter, url: "https://x.com/iyarkai_lab", label: "X (Twitter)" },
  { icon: Instagram, url: "https://www.instagram.com/iyarkaitechlab/", label: "Instagram" },
  { icon: Facebook, url: "https://facebook.com/iyarkaiTechLab", label: "Facebook" },
];

const footerSections = [
  {
    title: "Products",
    links: [
      { label: "SILIR1000", path: "/products/silir1000" },
      { label: "SILIR2000", path: "/products/silir2000" },
      { label: "SILIR3000", path: "/products/silir3000" },
      { label: "SILIR4000", path: "/products/silir4000" },
      { label: "SILIR5000", path: "/products/silir5000" },
      { label: "KitHub", path: "/products/kithub" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Mushroom Automation", path: "/solutions/mushroom-automation" },
      { label: "Poultry Automation", path: "/solutions/poultry-automation" },
      { label: "Smart Irrigation", path: "/solutions/smart-irrigation" },
      { label: "Polyhouse Automation", path: "/solutions/polyhouse-automation" },
      { label: "Technology Consulting", path: "/solutions/technology-consulting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ITL", path: "/company" },
      { label: "Leadership", path: "/company#leadership" },
      { label: "Careers", path: "/company#careers" },
      { label: "Contact", path: "/company#contact" },
      { label: "Partners", path: "/partner-application" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", path: "/resources" },
      { label: "Blog", path: "/resources#blog" },
      { label: "Knowledge Hub", path: "/resources#knowledge" },
      { label: "Media & Press", path: "/resources#press" },
    ],
  },
];

const ecosystemLinks = [
  { label: "iYarKai Tech Lab", url: "https://iyarkaitechlab.com" },
  { label: "Mushroom Shop", url: "https://mushroomshop.in" },
  { label: "Green Commune", url: "https://greencommune.in" },
  { label: "eBothi", url: "https://ebothi.com" },
  { label: "iSmart Farms", url: "https://ismartfarms.in" },
  { label: "Chennai Sandhai", url: "https://chennaisandhai.com" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
                <span className="text-lg font-bold text-primary-foreground">iY</span>
              </div>
              <div>
                <p className="text-sm font-bold font-heading text-foreground">iYarKai Tech Lab</p>
                <p className="text-[10px] text-muted-foreground">Pvt Ltd</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              DeepTech Innovation & Infrastructure for intelligent agriculture and food ecosystems.
            </p>
            <p className="text-xs text-muted-foreground">Chennai, India</p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold font-heading text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ecosystem */}
        <div className="mt-12 border-t border-border pt-8">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ecosystem</h4>
          <div className="flex flex-wrap gap-4">
            {ecosystemLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} iYarKai Tech Lab Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
