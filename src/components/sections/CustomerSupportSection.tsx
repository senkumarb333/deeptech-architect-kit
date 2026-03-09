import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Headphones, BookOpen, Video, MessageSquare, Clock, Shield, Users, Wrench } from "lucide-react";

const supportFeatures = [
  {
    icon: Wrench,
    title: "Technology Onboarding",
    desc: "Complete setup and configuration of your SILIR system with hands-on training.",
  },
  {
    icon: Users,
    title: "Deployment Assistance",
    desc: "On-site deployment support and integration with existing farm infrastructure.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    desc: "24/7 technical support via phone, email, and live chat for all customers.",
  },
  {
    icon: BookOpen,
    title: "Training Programs",
    desc: "Comprehensive training for farmers, operators, and agri entrepreneurs.",
  },
];

const supportChannels = [
  { icon: MessageSquare, label: "Live Chat", desc: "Instant support via chat", action: "Start Chat" },
  { icon: Video, label: "Video Support", desc: "Schedule a video call", action: "Book Call" },
  { icon: Clock, label: "24/7 Helpline", desc: "+91-XXX-XXX-XXXX", action: "Call Now" },
];

const CustomerSupportSection = () => (
  <section className="py-16 lg:py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          We're Here to Help
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Customer Success & Support
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          From technology onboarding to ongoing technical support, we're committed to your success
          in smart agriculture.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {supportFeatures.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary/30"
          >
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0] }}
              className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10"
            >
              <feature.icon className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-tech-blue/5 p-8 lg:p-12"
      >
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Dedicated Support Team</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
              Get Help Anytime, Anywhere
            </h3>
            <p className="text-muted-foreground mb-6">
              Our customer success team is available around the clock to assist with technical issues,
              training requests, and deployment support. We speak your language and understand
              farming challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <Link to="/book-consultation">Talk to Expert</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {supportChannels.map((channel, i) => (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary/30"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <channel.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{channel.label}</p>
                    <p className="text-sm text-muted-foreground">{channel.desc}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  {channel.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CustomerSupportSection;
