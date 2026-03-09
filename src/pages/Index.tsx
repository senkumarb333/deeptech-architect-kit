import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Cloud, Zap, BarChart3, Radio, Server } from "lucide-react";
import ParticleField from "@/components/visuals/ParticleField";
import TechFlowDiagram from "@/components/visuals/TechFlowDiagram";
import EcosystemDiagram from "@/components/visuals/EcosystemDiagram";
import ImpactMetrics from "@/components/visuals/ImpactMetrics";
import CaseStudies from "@/components/visuals/CaseStudies";
import heroBg from "@/assets/hero-bg.jpg";
import productSilir1000 from "@/assets/product-silir1000.jpg";
import productSilir2000 from "@/assets/product-silir2000.jpg";
import productSilir3000 from "@/assets/product-silir3000.jpg";
import productSilir4000 from "@/assets/product-silir4000.jpg";
import productSilir5000 from "@/assets/product-silir5000.jpg";
import productKithub from "@/assets/product-kithub.jpg";

const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -8, 0],
    transition: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
  }),
};

const Hero = () => (
  <section className="relative overflow-hidden bg-foreground py-20 lg:py-32">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover opacity-40" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/40" />
    </div>
    <ParticleField className="z-10 opacity-60" particleCount={40} color="#1F7A63" />
    <div className="container relative z-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, type: "spring", stiffness: 120 }}>
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            DeepTech Innovation
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 80 }} className="mb-6 text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          Engineering Intelligent Infrastructure for{" "}
          <motion.span
            className="text-gradient-primary inline-block"
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            Sustainable Agriculture
          </motion.span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70 lg:text-xl">
          AI, IoT and automation platforms powering the future of agriculture and food systems.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/request-demo">Request Demo <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button variant="hero-outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/products">Explore Products</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 mx-auto max-w-3xl">
        {[
          { icon: Cpu, label: "Artificial Intelligence", color: "text-primary" },
          { icon: Cloud, label: "IoT & Cloud", color: "text-tech-blue" },
          { icon: Zap, label: "Automation Systems", color: "text-accent" },
          { icon: BarChart3, label: "Data Intelligence", color: "text-primary" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={floatingVariants}
            animate="animate"
            whileHover={{ scale: 1.08, borderColor: "hsl(162 59% 30% / 0.4)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-4 cursor-default"
          >
            <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </motion.div>
            <span className="text-xs font-medium text-primary-foreground/70 text-center">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);



const products = [
  { id: "silir1000", name: "SILIR1000", desc: "Smart Mushroom Cultivation System", img: productSilir1000 },
  { id: "silir2000", name: "SILIR2000", desc: "Smart Poultry AI IoT Robotics System", img: productSilir2000 },
  { id: "silir3000", name: "SILIR3000", desc: "Smart PostHarvest Blockchain & Cold Chain", img: productSilir3000 },
  { id: "silir4000", name: "SILIR4000", desc: "Smart Open Field Agriculture Irrigation", img: productSilir4000 },
  { id: "silir5000", name: "SILIR5000", desc: "Smart Polyhouse Automation System", img: productSilir5000 },
  { id: "kithub", name: "KitHub", desc: "MQTT IoT Cloud Platform", img: productKithub },
];

const ProductsOverview = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">SILIR Ecosystem</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Intelligent Platforms for Every Agricultural Need</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground">End-to-end smart farming systems powered by AI, IoT, and automation.</motion.p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}>
            <Link to={`/products/${p.id}`} className="group block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <motion.div
                  className="mt-3 flex items-center text-sm font-medium text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 5 }}
                  animate={{ opacity: 0 }}
                  whileInView={{ opacity: 0 }}
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </motion.div>
                <div className="mt-3 flex items-center text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TechPlatform = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Technology Architecture</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Built on Deep Technology</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground">Our platforms integrate AI, IoT edge computing, cloud infrastructure, and automation into cohesive solutions.</motion.p>
      </div>
      <TechFlowDiagram />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Radio, label: "IoT Sensors & Edge", desc: "Multi-protocol sensor networks with edge computing" },
          { icon: Cloud, label: "KitHub Cloud Platform", desc: "Enterprise MQTT IoT cloud with real-time analytics" },
          { icon: Cpu, label: "AI & Machine Learning", desc: "Predictive models, computer vision, and AutoML" },
          { icon: Server, label: "Embedded Controllers", desc: "ARM-based real-time processing and actuator control" },
          { icon: Zap, label: "Automation Systems", desc: "Industrial-grade PLC integration and motor control" },
          { icon: BarChart3, label: "Developer APIs", desc: "REST APIs, WebSocket streams, and SDKs" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring", stiffness: 150 }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px rgba(31, 122, 99, 0.15)" }}
            className="group rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/30">
            <motion.div whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.4 }}>
              <item.icon className="mb-3 h-8 w-8 text-primary" />
            </motion.div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">{item.label}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div className="mt-10 text-center" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} viewport={{ once: true }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
          <Button variant="tech" asChild>
            <Link to="/technology">Explore Technology</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const EcosystemSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-tech-blue">Ecosystem</span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Connected Platform Ecosystem</h2>
        <p className="text-muted-foreground">From farm production to consumer delivery — our platforms create an integrated value chain.</p>
      </div>
      <EcosystemDiagram />
    </div>
  </section>
);

const CTASection = () => (
  <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-24">
    <ParticleField particleCount={25} color="#ffffff" className="opacity-20" />
    <div className="container relative z-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80 }}
        className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl"
      >
        Ready to Transform Your Agricultural Operations?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mx-auto mb-8 max-w-xl text-primary-foreground/80"
      >
        Connect with our team to explore how iYarKai's DeepTech platforms can drive efficiency, sustainability, and growth.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link to="/request-demo">Request Demo</Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <Link to="/book-consultation">Book Consultation</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Index = () => (
  <>
    <Hero />
    <ImpactMetrics />
    <ProductsOverview />
    <TechPlatform />
    <EcosystemSection />
    <CaseStudies />
    <CTASection />
  </>
);

export default Index;
