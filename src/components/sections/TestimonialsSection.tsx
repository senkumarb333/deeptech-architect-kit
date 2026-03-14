import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialRamesh from "@/assets/testimonial-ramesh.jpg";
import testimonialPriya from "@/assets/testimonial-priya.jpg";
import testimonialAnand from "@/assets/testimonial-anand.jpg";

const testimonials = [
  {
    quote: "Iyarkai Tech Lab's AI irrigation platform helped us reduce water usage by 35% while improving crop yield. The real-time monitoring changed how we manage our farm.",
    name: "Ramesh Kumar",
    role: "Farm Operations Director",
    org: "GreenField Agri Enterprises",
    img: testimonialRamesh,
  },
  {
    quote: "The IoT soil monitoring network gave us visibility we never had before. We reduced fertilizer costs by 20% and our soil health has measurably improved.",
    name: "Dr. Priya Sharma",
    role: "Research Lead",
    org: "Tamil Nadu Agricultural University",
    img: testimonialPriya,
  },
  {
    quote: "SILIR1000 automated our entire mushroom cultivation process. We went from manual monitoring to full automation in under 3 weeks. Outstanding technology.",
    name: "Anand Rajan",
    role: "Founder & CEO",
    org: "FreshCap Mushroom Farms",
    img: testimonialAnand,
  },
];

const TestimonialsSection = () => (
  <section className="bg-muted py-20 lg:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
          Testimonials
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          What Our Partners Say
        </h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
          >
            <Quote className="mb-4 h-8 w-8 text-primary/30" />
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <img
                src={t.img}
                alt={t.name}
                className="h-11 w-11 rounded-full object-cover border-2 border-primary/20"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
                <p className="text-xs text-primary">{t.org}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
