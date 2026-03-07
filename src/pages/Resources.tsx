import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Resources = () => (
  <div>
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Resources</span>
        <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Knowledge & Insights</h1>
        <p className="text-lg text-muted-foreground">Case studies, whitepapers, blog posts, and industry insights from iYarKai Tech Lab.</p>
      </div>
    </section>
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Case Studies", desc: "Real-world deployments and measurable outcomes from our SILIR platforms.", tag: "Featured" },
            { title: "Knowledge Hub", desc: "Technical articles, guides, and educational content on AgriTech.", tag: "Learn" },
            { title: "Blog", desc: "Latest updates, product launches, and industry perspectives.", tag: "Updates" },
            { title: "Whitepapers", desc: "In-depth research and technical documentation on our technology platforms.", tag: "Research" },
            { title: "Media & Press", desc: "Press releases, media coverage, and company announcements.", tag: "News" },
          ].map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.tag}</span>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{r.desc}</p>
              <p className="text-sm text-muted-foreground italic">Coming soon</p>
            </div>
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
