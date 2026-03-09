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
        <motion.span initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Impact
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl font-bold text-foreground lg:text-3xl">
          Technology Driving Real Results
        </motion.h2>
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
            whileHover={{ y: -6 }}
            className="group text-center cursor-default"
          >
            <motion.div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10"
              whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], backgroundColor: "hsl(162 59% 30% / 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <m.icon className="h-7 w-7 text-primary" />
            </motion.div>
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
