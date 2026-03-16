import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Lightbulb, Cpu } from "lucide-react";

const platforms = [
  {
    icon: Sprout,
    title: "Silir Smart Mushroom System",
    desc: "AI + IoT climate controlled cultivation technology for precision mushroom farming at any scale.",
    cta: "Get Silir Details",
    link: "/products/silir1000",
  },
  {
    icon: Lightbulb,
    title: "Design Thinking Workshops",
    desc: "Innovation training programs for engineering colleges, universities, and startup ecosystems.",
    cta: "Book Workshop",
    link: "/book-consultation",
  },
  {
    icon: Cpu,
    title: "KitHub DeepTech Platform",
    desc: "Architecture frameworks for building AI, IoT, and DeepTech products faster.",
    cta: "Explore KitHub",
    link: "/products/kithub",
  },
];

const CorePlatformsSection = () => (
  <section className="bg-background py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          What We Build
        </span>
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          Core Innovation Platforms
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {platforms.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-card"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <p.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">{p.title}</h3>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            <Button variant="hero" size="default" asChild>
              <Link to={p.link}>
                {p.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CorePlatformsSection;
