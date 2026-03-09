import { motion } from "framer-motion";
import { Cpu, Wifi, Bot, Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const metrics = [
  { icon: Cpu, value: 50, suffix: "+", label: "Smart Farms Enabled" },
  { icon: Wifi, value: 2500, suffix: "+", label: "IoT Devices Connected" },
  { icon: Bot, value: 120, suffix: "+", label: "Automation Deployments" },
  { icon: Users, value: 1000, suffix: "+", label: "Farmers Supported" },
];

const ImpactMetrics = () => (
  <section className="border-y border-border bg-card py-16">
    <div className="container">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Impact
        </span>
        <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
          Technology Driving Real Results
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group text-center"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
              <m.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary lg:text-4xl">
              <AnimatedCounter value={m.value} suffix={m.suffix} />
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactMetrics;
