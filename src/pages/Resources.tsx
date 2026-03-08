import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import { BookOpen, FileText, Newspaper, Download, Radio } from "lucide-react";

const resources = [
  { title: "Case Studies", desc: "Real-world deployments and measurable outcomes from our SILIR platforms.", tag: "Featured", icon: FileText },
  { title: "Knowledge Hub", desc: "Technical articles, guides, and educational content on AgriTech.", tag: "Learn", icon: BookOpen },
  { title: "Blog", desc: "Latest updates, product launches, and industry perspectives.", tag: "Updates", icon: Newspaper },
  { title: "Whitepapers", desc: "In-depth research and technical documentation on our technology platforms.", tag: "Research", icon: Download },
  { title: "Media & Press", desc: "Press releases, media coverage, and company announcements.", tag: "News", icon: Radio },
];

const Resources = () => (
  <div>
    <PageHeader tag="Resources" title="Knowledge & Insights" description="Case studies, whitepapers, blog posts, and industry insights from iYarKai Tech Lab." />
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <r.icon className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.tag}</span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{r.desc}</p>
              <p className="text-sm text-muted-foreground italic">Coming soon</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Want to stay updated?</p>
          <Button variant="hero" asChild>
            <Link to="/book-consultation">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Resources;
