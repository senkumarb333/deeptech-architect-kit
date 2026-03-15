import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const regions = [
  { name: "Tamil Nadu", x: "52%", y: "78%", deployments: "Smart Irrigation Pilot" },
  { name: "Karnataka", x: "42%", y: "65%", deployments: "AI Crop Monitoring" },
  { name: "Andhra Pradesh", x: "55%", y: "60%", deployments: "Precision Mushroom Cultivation" },
];

const DeploymentMapSection = () => (
  <section className="bg-muted py-20 lg:py-28 border-b border-border">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          Geographic Presence
        </span>
        <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
          Deployment Regions Across India
        </h2>
        <p className="text-muted-foreground">
          Active pilot deployments and technology partnerships in key agricultural regions.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {/* Simplified India map outline as SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto aspect-[3/4] max-w-md rounded-2xl border border-border bg-card p-6 shadow-card overflow-hidden"
        >
          {/* Map background shape */}
          <svg viewBox="0 0 400 500" className="h-full w-full" fill="none">
            {/* Simplified India outline */}
            <path
              d="M200 30 C240 30 280 50 300 80 C320 110 330 150 320 190 C330 210 340 240 350 260 C360 290 360 320 340 350 C320 370 300 390 280 410 C260 430 240 450 220 460 C200 470 180 470 170 450 C160 440 150 430 140 420 C120 400 100 380 90 350 C80 320 70 290 80 260 C90 230 100 210 100 190 C100 160 90 130 100 100 C110 70 140 50 170 40 C180 35 190 30 200 30Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            {/* Grid dots */}
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 6 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={100 + col * 40}
                  cy={80 + row * 50}
                  r="1.5"
                  fill="hsl(var(--border))"
                  opacity="0.5"
                />
              ))
            )}
          </svg>

          {/* Region pins */}
          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
              className="absolute group"
              style={{ left: region.x, top: region.y, transform: "translate(-50%, -50%)" }}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/30 h-8 w-8 -translate-x-2 -translate-y-2" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-hero -translate-x-0">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              {/* Tooltip */}
              <div className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-2 shadow-elevated opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <p className="text-xs font-semibold text-foreground">{region.name}</p>
                <p className="text-[10px] text-muted-foreground">{region.deployments}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Region cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{region.name}</p>
                <p className="text-xs text-muted-foreground">{region.deployments}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default DeploymentMapSection;
