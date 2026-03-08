import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import productSilir1000 from "@/assets/product-silir1000.jpg";
import productSilir2000 from "@/assets/product-silir2000.jpg";
import productSilir3000 from "@/assets/product-silir3000.jpg";
import productSilir4000 from "@/assets/product-silir4000.jpg";
import productSilir5000 from "@/assets/product-silir5000.jpg";
import productKithub from "@/assets/product-kithub.jpg";

const products = [
  { id: "silir1000", name: "SILIR1000", title: "Smart Mushroom Cultivation System", desc: "AI-powered environmental control, monitoring, and automation for commercial mushroom farming operations.", img: productSilir1000, features: ["Climate Control AI", "Growth Monitoring", "Automated Harvesting", "Yield Optimization"] },
  { id: "silir2000", name: "SILIR2000", title: "Smart Poultry AI IoT Robotics System", desc: "Intelligent poultry farm management with AI-driven health monitoring, feed optimization, and robotics integration.", img: productSilir2000, features: ["Health Monitoring", "Feed Optimization", "Environmental Control", "Production Analytics"] },
  { id: "silir3000", name: "SILIR3000", title: "Smart PostHarvest Blockchain & Cold Chain", desc: "End-to-end post-harvest management with blockchain traceability and IoT-enabled cold chain monitoring.", img: productSilir3000, features: ["Blockchain Traceability", "Cold Chain IoT", "Quality Assurance", "Supply Chain Analytics"] },
  { id: "silir4000", name: "SILIR4000", title: "Smart Open Field Agriculture Irrigation", desc: "Precision irrigation management using AI, soil sensors, and weather intelligence for optimal water usage.", img: productSilir4000, features: ["Soil Sensing", "Weather Intelligence", "Water Optimization", "Crop Analytics"] },
  { id: "silir5000", name: "SILIR5000", title: "Smart Polyhouse Automation System", desc: "Complete polyhouse environment automation with AI-driven climate control and crop management.", img: productSilir5000, features: ["Climate Automation", "Fertigation Control", "Growth Monitoring", "Energy Management"] },
  { id: "kithub", name: "KitHub", title: "MQTT IoT Cloud Platform", desc: "Enterprise-grade IoT cloud platform for device management, data processing, and real-time analytics.", img: productKithub, features: ["MQTT Protocol", "Device Management", "Real-time Analytics", "API Gateway"] },
];

const Products = () => (
  <div>
    <PageHeader tag="Products" title="SILIR Smart Farming Ecosystem" description="Comprehensive AI, IoT, and automation platforms designed for every segment of agriculture." />
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="space-y-12">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className={`group grid gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated transition-shadow lg:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}>
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/30 to-transparent" />
                </div>
                <div className="p-8">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">{p.name}</h2>
                  <h3 className="mb-3 text-lg text-primary font-medium">{p.title}</h3>
                  <p className="mb-6 text-muted-foreground">{p.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />{f}
                      </div>
                    ))}
                  </div>
                  <Button variant="hero" asChild>
                    <Link to={`/products/${p.id}`}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
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
