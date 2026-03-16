import { motion } from "framer-motion";
import { Users, Building, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "2000+", label: "Women Empowered" },
  { icon: Building, value: "56+", label: "Mushroom Units" },
  { icon: MapPin, value: "36", label: "Districts Impact" },
];

const ImpactStatsSection = () => (
  <section className="bg-background border-y border-border py-14">
    <div className="container">
      <div className="grid grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-3xl font-bold text-foreground lg:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStatsSection;
