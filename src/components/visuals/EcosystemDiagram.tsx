import { motion } from "framer-motion";

const nodes = [
  { label: "Farm Production", sub: "Crops & Livestock", x: 50, y: 10 },
  { label: "SILIR Automation", sub: "AI + IoT + Robotics", x: 20, y: 35 },
  { label: "KitHub Platform", sub: "IoT Cloud & Data", x: 80, y: 35 },
  { label: "MushroomShop", sub: "Marketplace", x: 10, y: 65 },
  { label: "eBothi", sub: "Consumer Platform", x: 50, y: 65 },
  { label: "GreenCommune", sub: "Community Network", x: 90, y: 65 },
  { label: "iSmart Farms", sub: "Smart Farm Network", x: 30, y: 90 },
  { label: "Chennai Sandhai", sub: "Local Markets", x: 70, y: 90 },
];

const connections = [
  [0, 1], [0, 2], [1, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7],
];

const EcosystemDiagram = () => (
  <div className="relative mx-auto w-full max-w-3xl" style={{ paddingBottom: "70%" }}>
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="hsl(162 59% 30% / 0.2)"
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.6 }}
        />
      ))}
    </svg>
    {nodes.map((node, i) => (
      <motion.div
        key={node.label}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08, type: "spring" }}
        className="absolute flex flex-col items-center"
        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-card text-center hover:shadow-elevated hover:border-primary/30 transition-all cursor-default">
          <p className="text-[10px] font-semibold text-foreground sm:text-xs">{node.label}</p>
          <p className="text-[8px] text-muted-foreground sm:text-[10px]">{node.sub}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

export default EcosystemDiagram;
