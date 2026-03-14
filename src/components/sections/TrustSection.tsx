import { motion } from "framer-motion";
import { Award, Trophy, Star, GraduationCap, Building2, Microscope, Cpu, Leaf } from "lucide-react";

const partners = [
  "Tamil Nadu Agricultural University",
  "ICAR Research Institute",
  "AgriTech Accelerator India",
  "Smart Farm Cooperatives",
  "NABARD Innovation Hub",
  "Indian Council of Food Research",
  "Precision Ag Alliance",
  "IoT India Consortium",
];

const awards = [
  { icon: Trophy, title: "AgriTech Innovation Award", org: "National Startup Awards 2024" },
  { icon: Award, title: "AI Research Grant Recipient", org: "Dept. of Science & Technology" },
  { icon: Star, title: "Best DeepTech Startup", org: "TiE Chennai 2024" },
  { icon: GraduationCap, title: "University Research Partner", org: "TNAU Collaboration" },
];

const partnerTypes = [
  { icon: Microscope, label: "Research Institutions" },
  { icon: GraduationCap, label: "Agriculture Universities" },
  { icon: Building2, label: "Enterprise Partners" },
  { icon: Cpu, label: "Technology Partners" },
  { icon: Leaf, label: "Agri Cooperatives" },
];

const TrustSection = () => (
  <section className="border-b border-border bg-card py-14 lg:py-16">
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Trusted by Innovators and Research Partners
        </h2>
      </motion.div>

      {/* Partner logo strip */}
      <div className="relative overflow-hidden mb-10">
        <div className="flex animate-scroll gap-8 w-max">
          {[...partners, ...partners].map((p, i) => (
            <motion.div
              key={`${p}-${i}`}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner type icons */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {partnerTypes.map((pt, i) => (
          <motion.div
            key={pt.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <pt.icon className="h-4 w-4 text-primary" />
            <span>{pt.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Awards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {awards.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-border bg-background p-4 text-center transition-all hover:border-primary/30 hover:shadow-card"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <a.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xs font-semibold text-foreground">{a.title}</h3>
            <p className="mt-1 text-[10px] text-muted-foreground">{a.org}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
