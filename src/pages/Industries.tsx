import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import { ArrowRight } from "lucide-react";
import industryMushroom from "@/assets/industry-mushroom.jpg";
import industryPoultry from "@/assets/industry-poultry.jpg";
import industryPolyhouse from "@/assets/industry-polyhouse.jpg";
import industryIrrigation from "@/assets/industry-irrigation.jpg";
import industryPostharvest from "@/assets/industry-postharvest.jpg";
import industryResearch from "@/assets/industry-research.jpg";

const industries = [
  { title: "Mushroom Farming", desc: "Precision environment control and automation for commercial mushroom cultivation.", product: "SILIR1000", img: industryMushroom, link: "/products/silir1000" },
  { title: "Poultry Farming", desc: "AI-driven health monitoring, feed optimization, and farm management.", product: "SILIR2000", img: industryPoultry, link: "/products/silir2000" },
  { title: "Polyhouse Farming", desc: "Automated climate control and crop management for protected cultivation.", product: "SILIR5000", img: industryPolyhouse, link: "/products/silir5000" },
  { title: "Open Field Agriculture", desc: "Smart irrigation and crop management for open field farming.", product: "SILIR4000", img: industryIrrigation, link: "/products/silir4000" },
  { title: "PostHarvest Processing", desc: "Cold chain management, traceability, and quality assurance.", product: "SILIR3000", img: industryPostharvest, link: "/products/silir3000" },
  { title: "Research Institutions", desc: "Technology platforms for agricultural research and academic programs.", product: "All SILIR", img: industryResearch, link: "/solutions/technology-consulting" },
];

const Industries = () => (
  <div>
    <PageHeader tag="Industries" title="Industries We Serve" description="Purpose-built DeepTech solutions across the agriculture and food ecosystem." />
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div key={ind.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={ind.img} alt={ind.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">{ind.product}</span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{ind.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{ind.desc}</p>
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link to={ind.link}>Learn More <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/request-demo">Discuss Your Industry Needs</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Industries;
