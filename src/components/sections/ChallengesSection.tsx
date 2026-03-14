import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Droplets, BarChart3, Wifi } from "lucide-react";

const challenges = [
  {
    icon: Droplets,
    problem: "Water Inefficiency",
    desc: "Traditional irrigation wastes up to 40% of water due to lack of real-time soil and weather data.",
    solution: "AI-driven irrigation scheduling with soil moisture sensors reduces water consumption by 35%.",
  },
  {
    icon: BarChart3,
    problem: "Unpredictable Crop Yields",
    desc: "Farmers rely on intuition, leading to inconsistent production and financial uncertainty.",
    solution: "ML-based crop analytics provide predictive yield models with 90%+ accuracy.",
  },
  {
    icon: Wifi,
    problem: "Lack of Real-Time Farm Data",
    desc: "Most farms operate blind—without visibility into soil health, microclimate, or crop stress.",
    solution: "IoT sensor networks deliver continuous, real-time farm intelligence to any device.",
  },
];

const ChallengesSection = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
          Industry Challenges
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Agriculture Challenges We Solve
        </h2>
        <p className="text-muted-foreground">
          How our AI + IoT platform transforms critical agricultural pain points into competitive advantages.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {challenges.map((c, i) => (
          <motion.div
            key={c.problem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-card"
          >
            {/* Problem */}
            <div className="border-b border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Challenge</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{c.problem}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </div>
            {/* Solution */}
            <div className="p-6 bg-primary/[0.03]">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Solution</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.solution}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ChallengesSection;
