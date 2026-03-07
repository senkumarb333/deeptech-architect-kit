import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Cloud, Zap, BarChart3 } from "lucide-react";

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--tech-blue) / 0.08) 0%, transparent 50%)" }} />
    <div className="container relative">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            DeepTech Innovation
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Engineering Intelligent Infrastructure for{" "}
          <span className="text-gradient-primary">Sustainable Agriculture</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground lg:text-xl">
          AI, IoT and automation platforms powering the future of agriculture and food systems.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="hero" size="xl" asChild>
            <Link to="/request-demo">Request Demo <ArrowRight className="ml-1 h-5 w-5" /></Link>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <Link to="/products">Explore Products</Link>
          </Button>
        </motion.div>
      </div>

      {/* Tech Icons */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 mx-auto max-w-3xl">
        {[
          { icon: Cpu, label: "Artificial Intelligence", color: "text-primary" },
          { icon: Cloud, label: "IoT & Cloud", color: "text-tech-blue" },
          { icon: Zap, label: "Automation Systems", color: "text-accent" },
          { icon: BarChart3, label: "Data Intelligence", color: "text-primary" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 shadow-card">
            <item.icon className={`h-8 w-8 ${item.color}`} />
            <span className="text-xs font-medium text-muted-foreground text-center">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

const metrics = [
  { value: "6+", label: "SILIR Platforms" },
  { value: "5+", label: "Core Technologies" },
  { value: "6", label: "Industry Verticals" },
  { value: "1", label: "IoT Cloud Platform" },
];

const Metrics = () => (
  <section className="border-y border-border bg-card py-12">
    <div className="container">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-3xl font-bold text-primary lg:text-4xl">{m.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const products = [
  { id: "silir1000", name: "SILIR1000", desc: "Smart Mushroom Cultivation System", icon: "🍄" },
  { id: "silir2000", name: "SILIR2000", desc: "Smart Poultry AI IoT Robotics System", icon: "🐔" },
  { id: "silir3000", name: "SILIR3000", desc: "Smart PostHarvest Blockchain & Cold Chain", icon: "📦" },
  { id: "silir4000", name: "SILIR4000", desc: "Smart Open Field Agriculture Irrigation", icon: "🌾" },
  { id: "silir5000", name: "SILIR5000", desc: "Smart Polyhouse Automation System", icon: "🏠" },
  { id: "kithub", name: "KitHub", desc: "MQTT IoT Cloud Platform", icon: "☁️" },
];

const ProductsOverview = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">SILIR Ecosystem</span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Intelligent Platforms for Every Agricultural Need</h2>
        <p className="text-muted-foreground">End-to-end smart farming systems powered by AI, IoT, and automation.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Link to={`/products/${p.id}`} className="group block rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
              <div className="mb-4 text-4xl">{p.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const solutions = [
  "Mushroom Farm Automation",
  "Poultry Farm Automation",
  "PostHarvest Automation",
  "Smart Irrigation Infrastructure",
  "Polyhouse Automation",
  "Technology Consulting",
  "Design Thinking Training",
  "Innovation Coaching",
];

const SolutionsOverview = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-tech-blue">Solutions</span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Transforming Agriculture with Technology</h2>
        <p className="text-muted-foreground">From farm automation to strategic consulting, we deliver comprehensive solutions.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground shadow-card hover:border-primary/30 transition-colors cursor-pointer">
            {s}
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button variant="hero-outline" asChild>
          <Link to="/solutions">View All Solutions</Link>
        </Button>
      </div>
    </div>
  </section>
);

const TechPlatform = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Technology Platform</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Built on Deep Technology</h2>
          <p className="mb-6 text-muted-foreground">Our platforms integrate cutting-edge AI, IoT edge computing, cloud infrastructure, and automation systems into cohesive solutions.</p>
          <ul className="space-y-3 mb-8">
            {["IoT Architecture & Edge Controllers", "AI & Data Intelligence Models", "KitHub MQTT Cloud Platform", "Embedded Automation Systems", "Developer APIs & SDKs"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
          <Button variant="tech" asChild>
            <Link to="/technology">Explore Technology</Link>
          </Button>
        </div>
        <div className="relative rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Edge Devices", val: "IoT" },
              { label: "Cloud", val: "KitHub" },
              { label: "Intelligence", val: "AI/ML" },
              { label: "Control", val: "Auto" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-card p-4 text-center shadow-card">
                <div className="text-lg font-bold text-primary">{item.val}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-gradient-hero py-20 lg:py-24">
    <div className="container text-center">
      <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">Ready to Transform Your Agricultural Operations?</h2>
      <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
        Connect with our team to explore how iYarKai's DeepTech platforms can drive efficiency, sustainability, and growth.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
          <Link to="/request-demo">Request Demo</Link>
        </Button>
        <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
          <Link to="/book-consultation">Book Consultation</Link>
        </Button>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <>
      <Hero />
      <Metrics />
      <ProductsOverview />
      <SolutionsOverview />
      <TechPlatform />
      <CTASection />
    </>
  );
};

export default Index;
