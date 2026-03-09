import { motion } from "framer-motion";
import { Sprout, Thermometer, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    icon: Sprout,
    title: "Mushroom Farm Automation",
    problem: "Manual climate control causing inconsistent yields and high labor costs.",
    solution: "Deployed SILIR1000 with automated humidity, CO2, and temperature management.",
    tech: ["AI Climate Control", "IoT Sensors", "Mobile Dashboard"],
    impact: "40% yield increase, 60% labor reduction",
    link: "/products/silir1000",
  },
  {
    icon: Thermometer,
    title: "Polyhouse Climate Control",
    problem: "Temperature fluctuations affecting crop quality in greenhouse operations.",
    solution: "Integrated SILIR5000 for precision climate automation with predictive adjustments.",
    tech: ["Edge Computing", "Weather Integration", "Automated Ventilation"],
    impact: "25% energy savings, 35% quality improvement",
    link: "/products/silir5000",
  },
  {
    icon: Package,
    title: "Post-Harvest Monitoring",
    problem: "Lack of cold chain visibility causing spoilage during transport and storage.",
    solution: "Implemented SILIR3000 blockchain-enabled tracking with real-time alerts.",
    tech: ["Blockchain Traceability", "Cold Chain IoT", "Alert System"],
    impact: "50% spoilage reduction, full supply chain visibility",
    link: "/products/silir3000",
  },
];

const CaseStudies = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Case Studies
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Real-World Deployments
        </h2>
        <p className="text-muted-foreground">
          See how our technology transforms agricultural operations across industries.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <study.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{study.title}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-destructive/80 mb-1">Problem</p>
                <p className="text-sm text-muted-foreground">{study.problem}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Solution</p>
                <p className="text-sm text-muted-foreground">{study.solution}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="rounded-lg bg-primary/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-1">Impact</p>
                <p className="text-sm font-semibold text-primary">{study.impact}</p>
              </div>

              <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-primary" asChild>
                <Link to={study.link}>
                  View Product <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
