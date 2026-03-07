import { Cpu, Cloud, Zap, Server, Code, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Technology</span>
          <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Deep Technology Stack</h1>
          <p className="text-lg text-muted-foreground">Our platforms are built on a foundation of AI, IoT, cloud computing, and embedded systems engineering.</p>
        </div>
      </div>
    </section>
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techAreas.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <t.icon className="mb-4 h-10 w-10 text-primary" />
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
