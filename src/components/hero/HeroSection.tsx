import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroSmartfarm from "@/assets/hero-smartfarm.jpg";
import SensorNetwork from "./SensorNetwork";
import FloatingDataWidgets from "./FloatingDataWidgets";
import TechGridOverlay from "./TechGridOverlay";

const Hero = () => (
  <section className="relative overflow-hidden bg-foreground min-h-[100vh] flex items-center">
    {/* Layer 1 – Cinematic smart farm background */}
    <div className="absolute inset-0">
      <img
        src={heroSmartfarm}
        alt="Smart greenhouse with IoT sensors and automation"
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,7%)] via-[hsl(220,20%,7%,0.7)] to-[hsl(162,59%,15%,0.4)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,20%,7%,0.6)] via-transparent to-[hsl(217,91%,20%,0.3)]" />
    </div>

    {/* Layer 2 – Technology grid overlay */}
    <TechGridOverlay />

    {/* Layer 3 – IoT sensor network visualization */}
    <SensorNetwork />

    {/* Layer 4 – Floating data dashboard widgets */}
    <FloatingDataWidgets />

    {/* Layer 5 – Hero content */}
    <div className="container relative z-30 py-20 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/15 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            🔬 DeepTech Innovation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 80 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-7xl"
        >
          Engineering Intelligent{" "}
          <br className="hidden sm:block" />
          Infrastructure for{" "}
          <motion.span
            className="inline-block relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-gradient-primary">Sustainable Agriculture</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            />
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/75 lg:text-xl leading-relaxed"
        >
          AI, IoT and automation platforms powering the future of agriculture and food ecosystems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/request-demo">
                Request Demo <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="hero-outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
              asChild
            >
              <Link to="/products">Explore Products</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Credibility line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-foreground/50"
        >
          <Shield className="h-4 w-4" />
          <span>Trusted by farmers, researchers, and agri innovators.</span>
        </motion.div>
      </div>

      {/* Tech pillars */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 mx-auto max-w-3xl"
      >
        {[
          { label: "Artificial Intelligence", icon: "🧠", glow: "from-primary/20" },
          { label: "IoT & Cloud", icon: "☁️", glow: "from-secondary/20" },
          { label: "Automation Systems", icon: "⚡", glow: "from-accent/20" },
          { label: "Data Intelligence", icon: "📊", glow: "from-primary/20" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.06, y: -4 }}
            className={`flex flex-col items-center gap-2 rounded-xl border border-primary-foreground/10 bg-gradient-to-b ${item.glow} to-transparent backdrop-blur-md p-4 cursor-default`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium text-primary-foreground/70 text-center">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Hero;
