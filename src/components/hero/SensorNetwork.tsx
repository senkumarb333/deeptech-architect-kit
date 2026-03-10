import { motion } from "framer-motion";

const nodes = [
  { x: 12, y: 25, label: "Sensor A" },
  { x: 28, y: 55, label: "Sensor B" },
  { x: 45, y: 30, label: "Controller" },
  { x: 65, y: 65, label: "Sensor C" },
  { x: 80, y: 35, label: "Cloud" },
  { x: 55, y: 80, label: "Sensor D" },
  { x: 20, y: 78, label: "Actuator" },
  { x: 88, y: 70, label: "AI Engine" },
];

const connections: [number, number][] = [
  [0, 2], [1, 2], [2, 4], [3, 4], [5, 3],
  [6, 1], [3, 7], [4, 7], [0, 6], [5, 7],
];

const SensorNetwork = () => (
  <svg className="absolute inset-0 z-15 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
    {/* Connection lines with animated data flow */}
    {connections.map(([from, to], i) => (
      <g key={`conn-${i}`}>
        <motion.line
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="hsl(162 59% 40%)"
          strokeWidth="0.15"
          strokeOpacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
        />
        {/* Data packet animation */}
        <motion.circle
          r="0.4"
          fill="hsl(217 91% 60%)"
          opacity="0.8"
          initial={{ cx: nodes[from].x, cy: nodes[from].y }}
          animate={{
            cx: [nodes[from].x, nodes[to].x],
            cy: [nodes[from].y, nodes[to].y],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: 2 + i * 0.4,
            ease: "linear",
          }}
        />
      </g>
    ))}

    {/* Sensor nodes with glow */}
    {nodes.map((node, i) => (
      <g key={`node-${i}`}>
        {/* Glow pulse */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="1.5"
          fill="none"
          stroke="hsl(162 59% 40%)"
          strokeWidth="0.1"
          initial={{ r: 0.8, opacity: 0.6 }}
          animate={{ r: 2.5, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
        />
        {/* Node dot */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="0.6"
          fill="hsl(162 59% 50%)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
        />
        {/* Inner bright dot */}
        <circle cx={node.x} cy={node.y} r="0.25" fill="hsl(162 59% 80%)" opacity="0.9" />
      </g>
    ))}
  </svg>
);

export default SensorNetwork;
