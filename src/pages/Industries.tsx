import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import { Cpu, Cloud, Zap, Radio, Server, FlaskConical } from "lucide-react";

const industries = [
  { title: "Mushroom Farming", desc: "Precision environment control and automation for commercial mushroom cultivation.", product: "SILIR1000", icon: Radio },
  { title: "Poultry Farming", desc: "AI-driven health monitoring, feed optimization, and farm management.", product: "SILIR2000", icon: Cpu },
  { title: "Polyhouse Farming", desc: "Automated climate control and crop management for protected cultivation.", product: "SILIR5000", icon: Cloud },
  { title: "Open Field Agriculture", desc: "Smart irrigation and crop management for open field farming.", product: "SILIR4000", icon: Zap },
  { title: "PostHarvest Processing", desc: "Cold chain management, traceability, and quality assurance.", product: "SILIR3000", icon: Server },
  { title: "Research Institutions", desc: "Technology platforms for agricultural research and academic programs.", product: "All SILIR", icon: FlaskConical },
];

const Industries = () => (
  <div>
    <PageHeader tag="Industries" title="Industries We Serve" description="Purpose-built DeepTech solutions across the agriculture and food ecosystem." />
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div key={ind.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <ind.icon className="mb-4 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{ind.title}</h3>
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
