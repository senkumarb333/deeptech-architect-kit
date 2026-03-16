import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const FinalCTASection = () => (
  <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
    <div className="container relative z-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-3xl font-bold text-primary-foreground lg:text-5xl"
      >
        Ready to Deploy Smart Agriculture Technology?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mx-auto mb-10 max-w-xl text-primary-foreground/80 text-lg"
      >
        Connect with our team to explore how Iyarkai Tech Lab's DeepTech platforms can drive efficiency, sustainability, and growth.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
          <Link to="/products/silir1000">
            Get Silir Details <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
          <Link to="/book-consultation">
            Book Workshop
          </Link>
        </Button>
        <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
          <Link to="/products/kithub">
            Explore KitHub
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default FinalCTASection;
