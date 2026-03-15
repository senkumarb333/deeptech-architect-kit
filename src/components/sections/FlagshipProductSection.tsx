import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Thermometer, Activity, Brain, Monitor } from "lucide-react";
import productSilir1000 from "@/assets/product-silir1000.jpg";

const capabilities = [
  { icon: Droplets, label: "Automated Humidity Control" },
  { icon: Thermometer, label: "Temperature Management" },
  { icon: Activity, label: "Real-Time Environmental Monitoring" },
  { icon: Brain, label: "AI Crop Analytics" },
  { icon: Monitor, label: "Remote Farm Dashboard" },
];

const FlagshipProductSection = () => (
  <section className="bg-foreground py-24 lg:py-32">
    <div className="container">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <img
            src={productSilir1000}
            alt="SILIR1000 Smart Mushroom Cultivation System"
            className="h-full w-full object-cover aspect-[4/3]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="rounded-full bg-primary/90 px-4 py-1.5 text-xs font-semibold text-primary-foreground">
              Flagship Product
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            SILIR1000
          </span>
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
            Smart Mushroom Cultivation System
          </h2>
          <p className="mb-8 text-primary-foreground/70 leading-relaxed">
            An AI and IoT powered mushroom cultivation platform designed for precision
            environmental control, automated monitoring, and scalable commercial
            mushroom production.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3"
              >
                <cap.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-primary-foreground/80">{cap.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild>
              <Link to="/book-consultation">
                Start Mushroom Pilot <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/request-demo">Book Demo</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FlagshipProductSection;
