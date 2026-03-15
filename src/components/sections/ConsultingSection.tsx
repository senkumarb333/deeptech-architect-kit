import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Brain, Network, Rocket, ArrowRight } from "lucide-react";

const services = [
  { icon: Settings, title: "Smart Agriculture System Design", desc: "End-to-end architecture for IoT-powered farming operations." },
  { icon: Brain, title: "AI Deployment Strategy", desc: "Roadmap for integrating AI analytics into agricultural workflows." },
  { icon: Network, title: "IoT Infrastructure Planning", desc: "Sensor network design, connectivity, and edge computing strategy." },
  { icon: Rocket, title: "Pilot Project Implementation", desc: "Structured deployment plans from proof-of-concept to production." },
];

const ConsultingSection = () => (
  <section className="border-b border-border bg-card py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Advisory Services
        </span>
        <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
          Agriculture Technology Consulting
        </h2>
        <p className="text-muted-foreground">
          Expert guidance for organizations deploying smart agriculture infrastructure.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Button variant="hero" size="lg" asChild>
          <Link to="/book-consultation">
            Request Consultation <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default ConsultingSection;
