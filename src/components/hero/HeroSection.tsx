import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroSmartfarm from "@/assets/hero-smartfarm.jpg";
import TechGridOverlay from "./TechGridOverlay";

const Hero = () => (
  <section className="relative overflow-hidden bg-foreground min-h-[100vh] flex items-center">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={heroSmartfarm}
        alt="Smart greenhouse with IoT sensors and automation"
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,5%)] via-[hsl(220,20%,5%,0.75)] to-[hsl(162,59%,12%,0.5)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,20%,5%,0.5)] via-transparent to-[hsl(217,91%,20%,0.2)]" />
    </div>

    <TechGridOverlay />

    {/* Content */}
    <div className="container relative z-30 py-24 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            DeepTech for Agriculture
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary-foreground sm:text-5xl lg:text-7xl"
        >
          AI + IoT Infrastructure for{" "}
          <span className="text-gradient-primary">Intelligent Agriculture</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70 lg:text-xl leading-relaxed"
        >
          Deploy intelligent farming systems with real-time crop intelligence, automated irrigation, and smart environmental monitoring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/book-consultation">
              Start Pilot <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="hero-outline"
            size="xl"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
            asChild
          >
            <Link to="/request-demo">
              Book Demo
            </Link>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 mx-auto max-w-3xl"
        >
          {[
            { value: "20+", label: "Research Collaborations" },
            { value: "5+", label: "Pilot Deployments" },
            { value: "3+", label: "AI Platforms" },
            { value: "1000+", label: "Acres Monitored" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-md p-4 text-center"
            >
              <div className="text-2xl font-bold text-primary lg:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
