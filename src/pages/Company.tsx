import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageHeader from "@/components/visuals/PageHeader";
import { Users, MapPin, Lightbulb, Handshake, TrendingUp } from "lucide-react";

const Company = () => (
  <div>
    <PageHeader tag="Company" title="About iYarKai Tech Lab" description="A DeepTech Innovation & Infrastructure company building intelligent systems for sustainable agriculture." />

    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Vision</h2>
            <p className="mb-6 text-muted-foreground leading-relaxed">To be the global leader in DeepTech infrastructure for intelligent agriculture, enabling sustainable food production through AI, IoT, and automation.</p>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">To design, develop, and deploy intelligent technology platforms that transform agricultural operations, improve yields, reduce waste, and create a sustainable food ecosystem.</p>
          </motion.div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} id="leadership" className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Leadership</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-2xl font-bold text-primary-foreground">SK</div>
                <div>
                  <p className="font-semibold text-foreground">Senthil Kumar Babu</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Location</h3>
              </div>
              <p className="text-muted-foreground">Chennai, India</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { title: "Innovation Programs", desc: "Structured programs for agricultural innovation, incubation, and startup acceleration.", icon: Lightbulb },
            { title: "Partners", desc: "Technology partnerships with leading hardware, cloud, and domain companies.", icon: Handshake },
            { title: "Investors", desc: "Building infrastructure for the future of agriculture with strategic investment partners.", icon: TrendingUp },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
              <item.icon className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div id="contact" className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Get in Touch</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild><Link to="/request-demo">Request Demo</Link></Button>
            <Button variant="hero-outline" size="lg" asChild><Link to="/partner-application">Become a Partner</Link></Button>
            <Button variant="outline" size="lg" asChild><Link to="/investor-inquiry">Investor Inquiry</Link></Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Company;
