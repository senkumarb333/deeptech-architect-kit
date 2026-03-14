import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const StickyDemoButton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 2, type: "spring" }}
    className="fixed bottom-6 right-6 z-50"
  >
    <Link
      to="/book-consultation"
      className="flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-hero transition-transform hover:scale-105 active:scale-95"
    >
      <CalendarCheck className="h-4 w-4" />
      Start Pilot
    </Link>
  </motion.div>
);

export default StickyDemoButton;
