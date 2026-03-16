import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const products = [
  { id: "silir1000", name: "SILIR1000", title: "Entry Smart Mushroom System", featured: true },
  { id: "silir2000", name: "SILIR2000", title: "Advanced Farm Automation", featured: false },
  { id: "silir3000", name: "SILIR3000", title: "Commercial Mushroom Farm", featured: false },
  { id: "silir4000", name: "SILIR4000", title: "Industrial Scale Cultivation", featured: false },
  { id: "silir5000", name: "SILIR5000", title: "Smart Agriculture Ecosystem", featured: false },
];

const SilirProductLadder = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Product Ecosystem
        </span>
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          SILIR Smart Farming Product Ladder
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Start with SILIR1000 and scale your smart agriculture infrastructure as you grow.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl space-y-4">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={`/products/${p.id}`}
              className={`group flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-card ${
                p.featured
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${
                  p.featured
                    ? "bg-gradient-hero text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {p.featured ? <Star className="h-5 w-5" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      Recommended Start
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{p.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="hero" size="lg" asChild>
          <Link to="/products/silir1000">
            Start with SILIR1000 <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default SilirProductLadder;
