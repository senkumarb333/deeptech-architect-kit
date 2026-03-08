import { motion } from "framer-motion";
import { Radio, Cpu, Cloud, BarChart3, Zap, Server } from "lucide-react";

const steps = [
  { icon: Radio, label: "Sensors", sub: "IoT Devices", color: "text-primary" },
  { icon: Cpu, label: "Edge Controllers", sub: "Local Processing", color: "text-tech-blue" },
  { icon: Server, label: "Gateway", sub: "Data Routing", color: "text-primary" },
  { icon: Cloud, label: "KitHub Cloud", sub: "MQTT Platform", color: "text-tech-blue" },
  { icon: BarChart3, label: "AI Analytics", sub: "Intelligence", color: "text-primary" },
  { icon: Zap, label: "Automation", sub: "Control Systems", color: "text-accent" },
];

const TechFlowDiagram = () => (
  <div className="relative py-8">
    <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
            className="group relative flex flex-col items-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-all group-hover:shadow-elevated group-hover:border-primary/40">
              <step.icon className={`h-7 w-7 ${step.color}`} />
              <div className="absolute -inset-1 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <p className="mt-2 text-xs font-semibold text-foreground">{step.label}</p>
            <p className="text-[10px] text-muted-foreground">{step.sub}</p>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
              className="hidden md:block h-px w-8 lg:w-12 bg-gradient-to-r from-primary/40 to-tech-blue/40 origin-left mx-1"
            />
          )}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
              className="md:hidden w-px h-6 bg-gradient-to-b from-primary/40 to-tech-blue/40 origin-top"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default TechFlowDiagram;
