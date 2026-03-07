import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LeadFormProps {
  title: string;
  subtitle: string;
  projectTypes: string[];
  submitLabel?: string;
}

const LeadForm = ({ title, subtitle, projectTypes, submitLabel = "Submit" }: LeadFormProps) => {
  const [form, setForm] = useState({ name: "", organization: "", email: "", phone: "", projectType: "", timeline: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you! We'll be in touch shortly.");
    setForm({ name: "", organization: "", email: "", phone: "", projectType: "", timeline: "", message: "" });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-8 shadow-elevated">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
              </div>
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} maxLength={100} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
              </div>
            </div>
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <select id="projectType" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select...</option>
                {projectTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <select id="timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select timeline...</option>
                <option value="immediate">Immediate (0-1 month)</option>
                <option value="short">Short-term (1-3 months)</option>
                <option value="medium">Medium-term (3-6 months)</option>
                <option value="long">Long-term (6+ months)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="message">Additional Details</Label>
              <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={4} />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full">{submitLabel}</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LeadForm;
