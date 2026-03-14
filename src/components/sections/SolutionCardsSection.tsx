import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Radio, Droplets } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "AI Crop Intelligence Platform",
    problem: "Farmers lack predictive insights on crop health, leading to yield loss and reactive decision-making.",
    tech: "Computer vision, satellite imagery, ML-based disease detection, real-time analytics dashboard.",
    outcome: "30% improvement in yield prediction accuracy, early disease alerts reducing crop loss by 25%.",
    link: "/products/silir1000",
  },
  {
    icon: Radio,
    title: "IoT Soil Monitoring Network",
    problem: "Soil health data is unavailable at scale, causing over-fertilization and degraded land quality.",
    tech: "Multi-sensor IoT nodes, edge computing, LoRaWAN connectivity, KitHub cloud platform.",
    outcome: "Real-time soil analytics across 1000+ acres, 20% reduction in fertilizer costs.",
    link: "/products/silir4000",
  },
  {
    icon: Droplets,
    title: "Smart Irrigation Automation System",
    problem: "Manual irrigation wastes water and fails to adapt to changing weather and soil moisture conditions.",
    tech: "AI-driven scheduling, soil moisture sensors, weather API integration, automated valve control.",
    outcome: "35% reduction in water consumption, fully automated irrigation with zero manual intervention.",
    link: "/products/silir4000",
  },
];

const SolutionCardsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Products & Solutions
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Intelligent Platforms for Every Agricultural Need
        </h2>
        <p className="text-muted-foreground">
          End-to-end smart farming systems powered by AI, IoT, and automation.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-4 text-lg font-bold text-foreground">{s.title}</h3>

            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Problem</span>
              <p className="mt-1 text-sm text-muted-foreground">{s.problem}</p>
            </div>
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Technology</span>
              <p className="mt-1 text-sm text-muted-foreground">{s.tech}</p>
            </div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Outcome</span>
              <p className="mt-1 text-sm text-muted-foreground">{s.outcome}</p>
            </div>

            <div className="mt-auto">
              <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary" asChild>
                <Link to={s.link}>
                  Explore Solution <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionCardsSection;
