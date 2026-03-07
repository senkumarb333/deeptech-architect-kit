import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  { id: "silir1000", name: "SILIR1000", title: "Smart Mushroom Cultivation System", desc: "AI-powered environmental control, monitoring, and automation for commercial mushroom farming operations.", icon: "🍄", features: ["Climate Control AI", "Growth Monitoring", "Automated Harvesting", "Yield Optimization"] },
  { id: "silir2000", name: "SILIR2000", title: "Smart Poultry AI IoT Robotics System", desc: "Intelligent poultry farm management with AI-driven health monitoring, feed optimization, and robotics integration.", icon: "🐔", features: ["Health Monitoring", "Feed Optimization", "Environmental Control", "Production Analytics"] },
  { id: "silir3000", name: "SILIR3000", title: "Smart PostHarvest Blockchain & Cold Chain", desc: "End-to-end post-harvest management with blockchain traceability and IoT-enabled cold chain monitoring.", icon: "📦", features: ["Blockchain Traceability", "Cold Chain IoT", "Quality Assurance", "Supply Chain Analytics"] },
  { id: "silir4000", name: "SILIR4000", title: "Smart Open Field Agriculture Irrigation", desc: "Precision irrigation management using AI, soil sensors, and weather intelligence for optimal water usage.", icon: "🌾", features: ["Soil Sensing", "Weather Intelligence", "Water Optimization", "Crop Analytics"] },
  { id: "silir5000", name: "SILIR5000", title: "Smart Polyhouse Automation System", desc: "Complete polyhouse environment automation with AI-driven climate control and crop management.", icon: "🏠", features: ["Climate Automation", "Fertigation Control", "Growth Monitoring", "Energy Management"] },
  { id: "kithub", name: "KitHub", title: "MQTT IoT Cloud Platform", desc: "Enterprise-grade IoT cloud platform for device management, data processing, and real-time analytics.", icon: "☁️", features: ["MQTT Protocol", "Device Management", "Real-time Analytics", "API Gateway"] },
];

const Products = () => (
  <div>
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Products</span>
          <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">SILIR Smart Farming Ecosystem</h1>
          <p className="text-lg text-muted-foreground">Comprehensive AI, IoT, and automation platforms designed for every segment of agriculture.</p>
        </div>
      </div>
    </section>
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="space-y-12">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className={`grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-card lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div>
                  <div className="mb-4 text-5xl">{p.icon}</div>
                  <h2 className="mb-2 text-2xl font-bold text-foreground">{p.name}</h2>
                  <h3 className="mb-3 text-lg text-primary font-medium">{p.title}</h3>
                  <p className="mb-6 text-muted-foreground">{p.desc}</p>
                  <Button variant="hero" asChild>
                    <Link to={`/products/${p.id}`}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {p.features.map((f) => (
                    <div key={f} className="rounded-lg border border-border bg-muted p-3 text-center text-sm font-medium text-foreground">{f}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Products;
