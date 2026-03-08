import { motion } from "framer-motion";

interface PageHeaderProps {
  tag: string;
  title: string;
  description: string;
  tagColor?: string;
}

const PageHeader = ({ tag, title, description, tagColor = "text-primary" }: PageHeaderProps) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
    {/* Subtle grid overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />
    <div className="container relative">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-2 inline-block text-sm font-semibold uppercase tracking-wider ${tagColor}`}
        >
          {tag}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-4xl font-bold text-foreground lg:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>
    </div>
  </section>
);

export default PageHeader;
