import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";

const solutions = [
  { id: "mushroom-automation", title: "Mushroom Farm Automation", desc: "End-to-end automation for commercial mushroom cultivation with AI environmental control.", tech: ["SILIR1000", "AI/ML", "IoT Sensors", "KitHub"] },
  { id: "poultry-automation", title: "Poultry Farm Automation", desc: "Intelligent poultry management with health monitoring, feed optimization, and robotics.", tech: ["SILIR2000", "Computer Vision", "Robotics", "KitHub"] },
  { id: "postharvest-automation", title: "PostHarvest Automation", desc: "Blockchain-enabled traceability and cold chain management for post-harvest operations.", tech: ["SILIR3000", "Blockchain", "Cold Chain IoT", "KitHub"] },
  { id: "smart-irrigation", title: "Smart Irrigation Infrastructure", desc: "Precision water management using soil intelligence and weather-adaptive scheduling.", tech: ["SILIR4000", "Soil Sensors", "Weather AI", "KitHub"] },
  { id: "polyhouse-automation", title: "Polyhouse Automation", desc: "Complete polyhouse environment and crop management automation.", tech: ["SILIR5000", "Climate AI", "Fertigation", "KitHub"] },
  { id: "technology-consulting", title: "Technology Consulting", desc: "Strategic technology advisory for agricultural enterprises and institutions.", tech: ["Assessment", "Architecture", "Implementation", "Training"] },
  { id: "design-thinking", title: "Design Thinking Consultancy & Training", desc: "Innovation methodologies for agricultural challenges and workforce development.", tech: ["Workshops", "Coaching", "Programs", "Certification"] },
  { id: "innovation-coaching", title: "Innovation Coaching", desc: "Guided innovation programs for startups and enterprises in agritech.", tech: ["Mentoring", "Prototyping", "Validation", "Scaling"] },
];

const Solutions = () => (
  <div>
    <PageHeader tag="Solutions" title="Comprehensive AgriTech Solutions" description="From farm automation to strategic consulting, we deliver end-to-end solutions for the agriculture ecosystem." tagColor="text-tech-blue" />
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link to={`/solutions/${s.id}`}>Learn More →</Link>
                </Button>
                <Button variant="link" className="p-0 h-auto text-muted-foreground" asChild>
                  <Link to="/book-consultation">Book Consultation →</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Solutions;
