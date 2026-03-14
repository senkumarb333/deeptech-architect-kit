import { motion } from "framer-motion";
import { Building2, Truck, Users, Microscope } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Agriculture Enterprises",
    desc: "Large-scale farms and agribusinesses deploying AI and IoT for operational efficiency and yield optimization.",
  },
  {
    icon: Truck,
    title: "Food Supply Chains",
    desc: "Cold chain management, post-harvest monitoring, and blockchain traceability for food safety compliance.",
  },
  {
    icon: Users,
    title: "Agri Cooperatives",
    desc: "Shared technology infrastructure enabling smallholder farmers to access enterprise-grade smart farming tools.",
  },
  {
    icon: Microscope,
    title: "Research Institutions",
    desc: "Data collection platforms and analytics tools for agricultural research, climate studies, and crop science.",
  },
];

const IndustriesSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
          Industries Served
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Technology for Every Agriculture Vertical
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card text-center transition-all hover:shadow-elevated hover:border-primary/30"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <ind.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold text-foreground">{ind.title}</h3>
            <p className="text-sm text-muted-foreground">{ind.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustriesSection;
