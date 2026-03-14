import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "AI in Agriculture: Transforming Crop Management",
    desc: "How machine learning and computer vision are revolutionizing farm operations and decision-making.",
    tag: "AI Research",
  },
  {
    title: "IoT Smart Farming: A Complete Guide",
    desc: "Understanding sensor networks, edge computing, and cloud platforms for modern agriculture.",
    tag: "IoT Technology",
  },
  {
    title: "Precision Irrigation Systems",
    desc: "AI-driven water management techniques that reduce consumption while improving crop health.",
    tag: "Water Tech",
  },
  {
    title: "Climate-Smart Agriculture with DeepTech",
    desc: "Building resilient farming systems that adapt to changing climate conditions using real-time data.",
    tag: "Sustainability",
  },
];

const InsightsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">
          Insights & Research
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Knowledge Hub
        </h2>
        <p className="text-muted-foreground">
          Research articles, guides, and insights on AI-powered agriculture.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <Link
              to="/resources"
              className="group block rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated hover:border-primary/30 h-full"
            >
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {a.tag}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{a.desc}</p>
              <span className="inline-flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default InsightsSection;
