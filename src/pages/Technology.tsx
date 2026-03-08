import { Cpu, Cloud, Zap, Server, Code, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import TechFlowDiagram from "@/components/visuals/TechFlowDiagram";
import techPattern from "@/assets/tech-pattern.jpg";

const techAreas = [
  { icon: Cloud, title: "IoT Architecture", desc: "Scalable IoT infrastructure with edge-to-cloud connectivity using MQTT, LoRaWAN, and cellular protocols.", details: ["Multi-protocol support", "Edge computing", "Gateway management", "OTA updates"] },
  { icon: Cpu, title: "AI & Data Intelligence", desc: "Machine learning models for predictive analytics, computer vision, and intelligent automation.", details: ["Predictive models", "Computer vision", "NLP processing", "AutoML pipelines"] },
  { icon: Server, title: "Edge Controllers", desc: "Custom embedded systems with real-time processing, sensor integration, and actuator control.", details: ["ARM-based compute", "Real-time OS", "Sensor fusion", "Actuator control"] },
  { icon: BarChart3, title: "Cloud Platform (KitHub)", desc: "Enterprise MQTT IoT cloud with device management, dashboards, rule engines, and API gateway.", details: ["MQTT broker", "Time-series DB", "Rule engine", "Multi-tenant"] },
  { icon: Zap, title: "Automation Systems", desc: "Industrial-grade automation with PLC integration, motor control, and safety systems.", details: ["PLC integration", "Motor control", "Safety systems", "HMI interfaces"] },
  { icon: Code, title: "Developer Platform", desc: "APIs, SDKs, and developer tools for building on top of SILIR and KitHub platforms.", details: ["REST APIs", "WebSocket streams", "SDKs", "Documentation"] },
];

const Technology = () => (
  <div>
    <PageHeader tag="Technology" title="Deep Technology Stack" description="Our platforms are built on a foundation of AI, IoT, cloud computing, and embedded systems engineering." />

    {/* Architecture flow */}
    <section className="relative overflow-hidden border-b border-border bg-card py-16">
      <div className="absolute inset-0 opacity-5">
        <img src={techPattern} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="container relative">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Technology Architecture</h2>
        <TechFlowDiagram />
      </div>
    </section>

    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techAreas.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <t.icon className="mb-4 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="space-y-1.5">
                {t.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />{d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Technology;
