import { motion } from "framer-motion";

const TechGridOverlay = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {/* Animated grid */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(162 59% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(162 59% 50%) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />

    {/* Scanning line effect */}
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />

    {/* Vertical scanning line */}
    <motion.div
      className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary to-transparent opacity-20"
      initial={{ left: "0%" }}
      animate={{ left: "100%" }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
    />

    {/* Corner brackets */}
    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
  </div>
);

export default TechGridOverlay;
