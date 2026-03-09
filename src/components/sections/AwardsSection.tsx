import { motion } from "framer-motion";
import { Award, Trophy, Star, Medal } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Best AgriTech Innovation",
    org: "Tamil Nadu Startup & Innovation Mission",
    year: "2024",
    desc: "Recognition for SILIR smart farming platform",
  },
  {
    icon: Award,
    title: "Startup India Recognition",
    org: "DPIIT, Government of India",
    year: "2023",
    desc: "DPIIT recognized startup for DeepTech innovation",
  },
  {
    icon: Star,
    title: "Top 100 AgriTech Startups",
    org: "NASSCOM AgriTech Challenge",
    year: "2023",
    desc: "Selected among India's top agritech innovators",
  },
  {
    icon: Medal,
    title: "Innovation Excellence Award",
    org: "IIT Madras Research Park",
    year: "2022",
    desc: "Excellence in IoT and AI for agriculture",
  },
];

const AwardsSection = () => (
  <section className="py-16 lg:py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
          Recognition
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Awards & Recognition
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Recognized by leading innovation ecosystems for our work in DeepTech agriculture
          and rural entrepreneurship development.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {awards.map((award, i) => (
          <motion.div
            key={award.title}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(31, 122, 99, 0.2)" }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/30"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10"
            >
              <award.icon className="h-7 w-7 text-primary" />
            </motion.div>
            <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {award.year}
            </span>
            <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {award.title}
            </h3>
            <p className="mb-2 text-sm font-medium text-primary/80">{award.org}</p>
            <p className="text-sm text-muted-foreground">{award.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AwardsSection;
