import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Droplets, Eye } from "lucide-react";

const deployments = [
  {
    icon: Droplets,
    title: "Smart Irrigation Pilot – Tamil Nadu",
    metric: "35%",
    metricLabel: "Water Consumption Reduced",
    desc: "AI-driven irrigation deployed across 200 acres of paddy fields, automating water scheduling based on soil moisture and weather forecasts.",
    tech: ["IoT Sensors", "AI Scheduling", "SILIR4000"],
    location: "Thanjavur, Tamil Nadu",
    link: "/products/silir4000",
  },
  {
    icon: Eye,
    title: "AI Crop Monitoring Deployment",
    metric: "90%+",
    metricLabel: "Disease Detection Accuracy",
    desc: "Computer vision-based crop health monitoring system providing real-time analytics and early disease alerts for polyhouse operations.",
    tech: ["Computer Vision", "ML Models", "SILIR5000"],
    location: "Coimbatore, Tamil Nadu",
    link: "/products/silir5000",
  },
  {
    icon: MapPin,
    title: "Smart Mushroom Cultivation",
    metric: "40%",
    metricLabel: "Yield Improvement",
    desc: "Fully automated environmental control for mushroom cultivation facility, managing temperature, humidity, CO₂, and fresh air exchange.",
    tech: ["Automation", "IoT Cloud", "SILIR1000"],
    location: "Chennai, Tamil Nadu",
    link: "/products/silir1000",
  },
];

const DeploymentsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Real-World Deployments
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Proven Results in the Field
        </h2>
        <p className="text-muted-foreground">
          Our technology is deployed and delivering measurable impact across Indian agriculture.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {deployments.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30"
          >
            <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {d.location}
            </div>

            <div className="mb-4">
              <span className="text-4xl font-bold text-primary">{d.metric}</span>
              <p className="text-sm font-medium text-foreground mt-1">{d.metricLabel}</p>
            </div>

            <h3 className="mb-2 text-lg font-bold text-foreground">{d.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{d.desc}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {d.tech.map((t) => (
                <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {t}
                </span>
              ))}
            </div>

            <Button variant="ghost" className="w-full justify-start text-primary p-0 h-auto" asChild>
              <Link to={d.link}>
                View Deployment <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DeploymentsSection;
