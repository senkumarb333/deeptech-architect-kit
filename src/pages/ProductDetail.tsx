import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const productData: Record<string, { name: string; title: string; desc: string; icon: string; problem: string; features: string[]; specs: string[]; useCases: string[] }> = {
  silir1000: { name: "SILIR1000", title: "Smart Mushroom Cultivation System", icon: "🍄", desc: "AI-powered environmental control, monitoring, and automation for commercial mushroom farming operations.", problem: "Mushroom cultivation requires precise environmental control—temperature, humidity, CO2 levels, and light cycles must be carefully managed. Manual monitoring is labor-intensive, error-prone, and limits scalability.", features: ["AI-driven climate control", "Real-time growth monitoring", "Automated harvesting triggers", "Yield prediction models", "Contamination detection", "Multi-chamber management"], specs: ["Temperature range: 10-35°C ±0.5°C", "Humidity: 40-99% ±2%", "CO2 monitoring: 0-5000ppm", "Edge compute: ARM-based controllers", "Cloud: KitHub MQTT platform", "Power: 220V AC, battery backup"], useCases: ["Commercial mushroom farms", "Research institutions", "Startup mushroom ventures", "Agricultural training centers"] },
  silir2000: { name: "SILIR2000", title: "Smart Poultry AI IoT Robotics", icon: "🐔", desc: "Intelligent poultry farm management with AI-driven health monitoring, feed optimization, and robotics.", problem: "Poultry farming faces challenges in disease detection, feed efficiency, and environmental management at scale.", features: ["AI health monitoring", "Automated feed systems", "Environmental controls", "Production analytics", "Disease early warning", "Robotics integration"], specs: ["Bird capacity: 1000-50000+", "Feed accuracy: ±1%", "Temp control: ±0.3°C", "Camera: HD with AI processing", "Connectivity: WiFi/4G/LoRa", "Cloud: KitHub platform"], useCases: ["Commercial poultry farms", "Hatcheries", "Layer & broiler operations", "Research facilities"] },
  silir3000: { name: "SILIR3000", title: "Smart PostHarvest Blockchain & Cold Chain", icon: "📦", desc: "End-to-end post-harvest management with blockchain traceability and IoT cold chain monitoring.", problem: "Post-harvest losses account for 30-40% of production. Lack of cold chain visibility and traceability leads to waste and quality issues.", features: ["Blockchain traceability", "Cold chain IoT sensors", "Quality grading AI", "Supply chain visibility", "Compliance tracking", "Predictive analytics"], specs: ["Temp range: -30°C to 50°C", "GPS tracking: real-time", "Blockchain: Hyperledger", "Battery: 30-day sensor life", "Protocol: LoRaWAN/NB-IoT", "Cloud: KitHub platform"], useCases: ["Cold storage facilities", "Transportation logistics", "Food processing units", "Export operations"] },
  silir4000: { name: "SILIR4000", title: "Smart Open Field Irrigation", icon: "🌾", desc: "Precision irrigation using AI, soil sensors, and weather intelligence for optimal water management.", problem: "Agricultural irrigation wastes 40-60% of water due to imprecise scheduling and lack of soil-weather intelligence.", features: ["Soil moisture sensing", "Weather integration", "AI scheduling", "Water flow control", "Crop-specific models", "Mobile dashboard"], specs: ["Soil sensors: capacitive", "Weather: local + API", "Valves: 12V/24V solenoid", "Coverage: up to 100 acres", "Connectivity: LoRa/WiFi", "Cloud: KitHub platform"], useCases: ["Open field farms", "Orchards & vineyards", "Government schemes", "Water management projects"] },
  silir5000: { name: "SILIR5000", title: "Smart Polyhouse Automation", icon: "🏠", desc: "Complete polyhouse environment automation with AI climate control and crop management.", problem: "Polyhouse operations require 24/7 climate management with rapid response to changing conditions.", features: ["Climate automation", "Fertigation control", "Growth monitoring", "Energy management", "Shade & vent control", "Crop cycle planning"], specs: ["Area: up to 10,000 sq.m", "Sensors: 20+ parameters", "Actuators: motors/valves", "Response time: <30s", "Power: solar compatible", "Cloud: KitHub platform"], useCases: ["Commercial polyhouses", "Hi-tech farming", "Seedling nurseries", "Research greenhouses"] },
  kithub: { name: "KitHub", title: "MQTT IoT Cloud Platform", icon: "☁️", desc: "Enterprise IoT cloud platform for device management, data processing, and analytics.", problem: "IoT deployments lack unified platforms for device management, data processing, and actionable insights at scale.", features: ["MQTT broker", "Device management", "Real-time dashboards", "Rule engine", "API gateway", "Multi-tenant"], specs: ["Protocol: MQTT 3.1.1/5.0", "Scale: 100K+ devices", "Storage: time-series DB", "API: REST & WebSocket", "Auth: OAuth2/JWT", "Deploy: cloud/on-prem"], useCases: ["Smart farming", "Industrial IoT", "Smart cities", "Environmental monitoring"] },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const product = productData[productId || ""];

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <Button variant="hero" asChild><Link to="/products">View All Products</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
        <div className="container">
          <Link to="/products" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="mr-1 h-4 w-4" /> All Products</Link>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 text-6xl">{product.icon}</div>
              <h1 className="mb-2 text-4xl font-bold text-foreground lg:text-5xl">{product.name}</h1>
              <p className="mb-4 text-xl text-primary font-medium">{product.title}</p>
              <p className="mb-8 text-lg text-muted-foreground">{product.desc}</p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/request-demo">Request Demo <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
              <h3 className="mb-4 font-semibold text-foreground">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-12 rounded-xl border border-border bg-accent/5 p-8">
            <h2 className="mb-3 text-2xl font-bold text-foreground">The Problem</h2>
            <p className="text-muted-foreground">{product.problem}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Technical Specifications</h2>
              <ul className="space-y-2">
                {product.specs.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-tech-blue" />{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Use Cases</h2>
              <ul className="space-y-2">
                {product.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />{u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-hero py-16 text-center">
        <div className="container">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Interested in {product.name}?</h2>
          <p className="mb-8 text-primary-foreground/80">Schedule a demo to see how it can transform your operations.</p>
          <Button variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link to="/request-demo">Request Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
