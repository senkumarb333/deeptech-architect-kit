import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Cpu, BarChart3, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Cpu,
    title: "IoT for Smart Farming",
    desc: "Hands-on training in sensor networks, edge computing, and farm automation systems.",
  },
  {
    icon: BarChart3,
    title: "AI in Precision Agriculture",
    desc: "Learn crop intelligence, predictive analytics, and AI-driven decision-making for farms.",
  },
  {
    icon: GraduationCap,
    title: "Agriculture Data Analytics",
    desc: "Master data collection, visualization, and actionable insights for agricultural operations.",
  },
];

const TrainingSection = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Capacity Building
        </span>
        <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
          AI & IoT Training for Smart Agriculture
        </h2>
        <p className="text-muted-foreground">
          Structured programs designed for agriculture professionals, researchers, and enterprises.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {programs.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <p.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Button variant="hero" size="lg" asChild>
          <Link to="/book-consultation">
            Explore Training <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="hero-outline" size="lg" asChild>
          <Link to="/book-consultation">Request Training Program</Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default TrainingSection;
