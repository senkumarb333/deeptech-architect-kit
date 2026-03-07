import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const industries = [
  { title: "Mushroom Farming", desc: "Precision environment control and automation for commercial mushroom cultivation.", product: "SILIR1000", icon: "🍄" },
  { title: "Poultry Farming", desc: "AI-driven health monitoring, feed optimization, and farm management.", product: "SILIR2000", icon: "🐔" },
  { title: "Polyhouse Farming", desc: "Automated climate control and crop management for protected cultivation.", product: "SILIR5000", icon: "🏠" },
  { title: "Open Field Agriculture", desc: "Smart irrigation and crop management for open field farming.", product: "SILIR4000", icon: "🌾" },
  { title: "PostHarvest Processing", desc: "Cold chain management, traceability, and quality assurance.", product: "SILIR3000", icon: "📦" },
  { title: "Research Institutions", desc: "Technology platforms for agricultural research and academic programs.", product: "All SILIR", icon: "🔬" },
];

const Industries = () => (
  <div>
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Industries</span>
        <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Industries We Serve</h1>
        <p className="text-lg text-muted-foreground">Purpose-built DeepTech solutions across the agriculture and food ecosystem.</p>
      </div>
    </section>
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div key={ind.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow">
              <div className="mb-4 text-4xl">{ind.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{ind.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{ind.desc}</p>
              <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">{ind.product}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/request-demo">Discuss Your Industry Needs</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Industries;
