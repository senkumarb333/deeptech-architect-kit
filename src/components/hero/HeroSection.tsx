import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Cpu, FlaskConical, Apple, Lightbulb } from "lucide-react";
import heroSmartfarm from "@/assets/hero-smartfarm.jpg";
import TechGridOverlay from "./TechGridOverlay";

const domainSlides = [
  {
    icon: Sprout,
    headline: "Smart Mushroom Technology",
    value: "AI + IoT climate-controlled cultivation for commercial mushroom production",
    cta: "Explore SILIR1000",
    link: "/products/silir1000",
  },
  {
    icon: Cpu,
    headline: "AgriTech Innovation",
    value: "Intelligent automation systems for precision farming and crop monitoring",
    cta: "View Solutions",
    link: "/solutions",
  },
  {
    icon: FlaskConical,
    headline: "Animal Life Science",
    value: "Smart monitoring and environmental control for poultry and livestock",
    cta: "Learn More",
    link: "/products/silir2000",
  },
  {
    icon: Apple,
    headline: "Post Harvest Food Technology",
    value: "Automated cold chain, drying, and storage systems for food preservation",
    cta: "Explore Solutions",
    link: "/products/silir3000",
  },
  {
    icon: Lightbulb,
    headline: "Design Thinking & Innovation Education",
    value: "Hands-on workshops for engineering colleges, universities, and startups",
    cta: "Book Workshop",
    link: "/book-consultation",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % domainSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
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
              DeepTech for Agriculture & Innovation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-primary-foreground sm:text-4xl lg:text-6xl"
          >
            AI + IoT Powered Smart Agriculture and{" "}
            <span className="text-gradient-primary">DeepTech Innovation Platforms</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70 lg:text-xl leading-relaxed"
          >
            Build smart farms, deeptech products, and innovation ecosystems with iYarKai Tech Lab technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/products/silir1000">
                Explore Silir Smart Mushroom System <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
              asChild
            >
              <Link to="/book-consultation">Book Design Thinking Workshop</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/products/kithub">Explore KitHub</Link>
            </Button>
          </motion.div>

          {/* Domain Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 mx-auto max-w-2xl"
          >
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-md p-6 min-h-[140px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {(() => {
                    const slide = domainSlides[activeSlide];
                    const Icon = slide.icon;
                    return (
                      <>
                        <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                        <h3 className="text-lg font-bold text-primary-foreground mb-1">{slide.headline}</h3>
                        <p className="text-sm text-primary-foreground/60 mb-3">{slide.value}</p>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary" asChild>
                          <Link to={slide.link}>{slide.cta} <ArrowRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {domainSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-6 bg-primary" : "w-2 bg-primary-foreground/30"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
