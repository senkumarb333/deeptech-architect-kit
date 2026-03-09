import { motion } from "framer-motion";
import { Building2, GraduationCap, Rocket, Landmark } from "lucide-react";

const partnerCategories = [
  { icon: Building2, label: "Technology Partners", count: 12 },
  { icon: GraduationCap, label: "Research Institutions", count: 8 },
  { icon: Rocket, label: "Startup Ecosystem", count: 15 },
  { icon: Landmark, label: "Government Programs", count: 6 },
];

const partners = [
  "Microsoft for Startups", "AWS Activate", "Google Cloud", "NASSCOM",
  "Tamil Nadu Startup", "TNAU", "IIT Madras", "Anna University",
  "Startup India", "ICAR", "NABARD", "AgriTech Hub",
];

const PartnersSection = () => (
  <section className="bg-muted py-16 lg:py-20 overflow-hidden">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Our Network
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Technology & Ecosystem Partners
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Collaborating with leading technology companies, research institutions, and government programs
          to accelerate agricultural innovation.
        </p>
      </motion.div>

      {/* Partner Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {partnerCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, borderColor: "hsl(162 59% 30% / 0.4)" }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-card transition-all"
          >
            <cat.icon className="h-8 w-8 text-primary" />
            <span className="text-sm font-semibold text-foreground text-center">{cat.label}</span>
            <span className="text-2xl font-bold text-primary">{cat.count}+</span>
          </motion.div>
        ))}
      </div>

      {/* Scrolling Partner Logos */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted to-transparent z-10" />
        
        <div className="flex gap-8 animate-scroll">
          {[...partners, ...partners].map((partner, i) => (
            <motion.div
              key={`${partner}-${i}`}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center justify-center h-16 px-8 rounded-lg border border-border bg-card"
            >
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
