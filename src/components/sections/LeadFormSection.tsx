import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, Rocket } from "lucide-react";

const LeadFormSection = () => {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    location: "",
    requirement: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you! Our team will contact you within 24 hours.");
    setForm({ name: "", organization: "", email: "", phone: "", location: "", requirement: "" });
  };

  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
              Start Your Smart Agriculture Pilot
            </h2>
            <p className="text-muted-foreground">
              Tell us about your project and our team will design a custom pilot deployment plan.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-elevated space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Name *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Organization</label>
                <Input
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="Company or farm name"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@organization.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Project Requirement</label>
              <Textarea
                value={form.requirement}
                onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                placeholder="Describe your agriculture challenge or project needs..."
                rows={4}
              />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">
              Start Pilot <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
