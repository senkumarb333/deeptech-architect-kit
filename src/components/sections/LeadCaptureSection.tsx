import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Users, Handshake, GraduationCap, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ctaCards = [
  {
    icon: Calendar,
    title: "Request Demo",
    desc: "See SILIR and KitHub in action",
    link: "/request-demo",
    variant: "hero" as const,
  },
  {
    icon: Users,
    title: "Talk to Expert",
    desc: "Discuss your farming needs",
    link: "/book-consultation",
    variant: "outline" as const,
  },
  {
    icon: Handshake,
    title: "Become a Partner",
    desc: "Join our ecosystem",
    link: "/partner-application",
    variant: "outline" as const,
  },
  {
    icon: GraduationCap,
    title: "Join Training",
    desc: "Learn smart farming",
    link: "/resources",
    variant: "outline" as const,
  },
];

const LeadCaptureSection = () => {
  const [email, setEmail] = useState("");

  const handleQuickSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Get Started
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
            Ready to Transform Your Agriculture?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose how you'd like to engage with us and take the first step towards smart farming.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {ctaCards.map((cta, i) => (
            <motion.div
              key={cta.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={cta.link}
                className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="mb-4 p-3 rounded-xl bg-primary/10"
                >
                  <cta.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cta.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{cta.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Email Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Stay Updated</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on smart farming technology and training programs.
            </p>
            <form onSubmit={handleQuickSignup} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="hero">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
