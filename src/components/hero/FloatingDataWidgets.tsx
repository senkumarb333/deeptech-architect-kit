import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Brain } from "lucide-react";

const widgets = [
  {
    icon: Thermometer,
    label: "Temperature",
    value: "24°C",
    trend: "+0.3°",
    color: "text-accent",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/10",
    position: "top-[18%] left-[5%] sm:left-[8%]",
    delay: 1.2,
  },
  {
    icon: Droplets,
    label: "Humidity",
    value: "82%",
    trend: "Optimal",
    color: "text-secondary",
    borderColor: "border-secondary/30",
    bgColor: "bg-secondary/10",
    position: "top-[35%] right-[3%] sm:right-[6%]",
    delay: 1.5,
  },
  {
    icon: Wind,
    label: "CO₂ Level",
    value: "420 ppm",
    trend: "Normal",
    color: "text-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/10",
    position: "bottom-[28%] left-[3%] sm:left-[5%]",
    delay: 1.8,
  },
  {
    icon: Brain,
    label: "AI Prediction",
    value: "93%",
    trend: "Yield Forecast",
    color: "text-secondary",
    borderColor: "border-secondary/30",
    bgColor: "bg-secondary/10",
    position: "bottom-[18%] right-[3%] sm:right-[5%]",
    delay: 2.0,
  },
];

const floatAnimation = (delay: number) => ({
  y: [0, -6, 0],
  transition: {
    duration: 4 + delay * 0.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

const FloatingDataWidgets = () => (
  <div className="absolute inset-0 z-20 pointer-events-none">
    {widgets.map((w, i) => (
      <motion.div
        key={w.label}
        className={`absolute ${w.position} hidden sm:block`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, ...floatAnimation(w.delay) }}
        transition={{ delay: w.delay, type: "spring", stiffness: 120, damping: 15 }}
      >
        <div
          className={`flex items-center gap-3 rounded-xl border ${w.borderColor} ${w.bgColor} backdrop-blur-xl px-4 py-3 shadow-lg`}
        >
          {/* Pulse indicator */}
          <div className="relative">
            <w.icon className={`h-5 w-5 ${w.color}`} />
            <motion.div
              className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${w.color === "text-accent" ? "bg-accent" : w.color === "text-secondary" ? "bg-secondary" : "bg-primary"}`}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50 font-medium">
              {w.label}
            </p>
            <p className="text-sm font-bold text-primary-foreground">{w.value}</p>
            <p className={`text-[10px] ${w.color} font-medium`}>{w.trend}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default FloatingDataWidgets;
