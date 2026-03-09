import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Brain, Radio, Cog, Leaf, Sprout, Users, Handshake, Trophy,
  Newspaper, Quote, MapPin, Calendar, ArrowRight, Star, Award,
  Lightbulb, GraduationCap, Building2, Globe, Rocket, Target,
  Eye, ChevronRight
} from "lucide-react";
import companyHero from "@/assets/company-hero.jpg";
import companyAbout from "@/assets/company-about.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const }
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── OVERVIEW HERO ─── */
const Overview = () => (
  <section className="relative overflow-hidden min-h-[520px] flex items-center">
    <img src={companyHero} alt="Smart farm with IoT sensors and AI analytics" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
    <div className="container relative z-10 py-20 lg:py-28">
      <div className="max-w-2xl">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
          DeepTech · AgriTech · Innovation
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 text-4xl font-bold leading-tight text-primary-foreground lg:text-5xl xl:text-6xl">
          Building DeepTech Infrastructure for Sustainable Agriculture
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
          iYarKai Tech Lab is a DeepTech AgriTech innovation company developing AI-driven IoT automation platforms for agriculture and food systems. Our mission is to empower farmers, agri entrepreneurs, and rural communities with intelligent technology that increases productivity, reduces manual effort, and enables sustainable farming practices.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap gap-3">
          <Button variant="hero" size="lg" asChild><Link to="/request-demo">Request Demo</Link></Button>
          <Button size="lg" className="border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-semibold" asChild><Link to="/technology">Explore Technology</Link></Button>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── ABOUT US ─── */
const timeline = [
  { year: "2018", label: "Company Founded", desc: "iYarKai Tech Lab established in Chennai" },
  { year: "2020", label: "SILIR Platform", desc: "Development of flagship IoT automation platform" },
  { year: "2022", label: "Smart Farm Deployments", desc: "First commercial smart farm installations" },
  { year: "2025", label: "AI + IoT Ecosystem", desc: "Expanded agriculture ecosystem with AI analytics" },
];

const AboutUs = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="container">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span variants={fadeUp} custom={0} className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">About Us</motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">About iYarKai Tech Lab</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mb-4 leading-relaxed text-muted-foreground">
            Founded in 2018 in Chennai, iYarKai Tech Lab focuses on developing intelligent infrastructure for agriculture using artificial intelligence, IoT sensors, and automation technologies.
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="mb-4 leading-relaxed text-muted-foreground">
            The company's flagship platform, SILIR, enables farmers to monitor and control environmental conditions such as temperature, humidity, and CO₂ levels in real time. By combining smart sensors, cloud connectivity, and AI analytics, the platform helps farmers optimize crop growth while reducing resource consumption.
          </motion.p>
          <motion.p variants={fadeUp} custom={4} className="leading-relaxed text-muted-foreground">
            iYarKai works closely with rural communities, agri entrepreneurs, research institutions, and government initiatives to promote sustainable agriculture and technology-enabled livelihoods.
          </motion.p>
        </div>
        <motion.div variants={fadeUp} custom={2} className="relative">
          <img src={companyAbout} alt="Smart farming operations with IoT monitoring" className="rounded-2xl shadow-elevated" />
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-elevated">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Chennai, India</p>
                <p className="text-xs text-muted-foreground">Founded 2018</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-16">
        <motion.h3 variants={fadeUp} className="mb-8 text-center text-2xl font-bold text-foreground">Our Journey</motion.h3>
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          <div className="grid gap-8 md:grid-cols-4">
            {timeline.map((t, i) => (
              <motion.div key={t.year} variants={fadeUp} custom={i} className="group relative text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold text-primary shadow-card transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-hero">
                  <Calendar className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold text-foreground">{t.year}</p>
                <p className="text-sm font-semibold text-primary">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── MISSION & VISION ─── */
const coreIcons = [
  { icon: Brain, label: "AI Intelligence" },
  { icon: Radio, label: "IoT Sensors" },
  { icon: Cog, label: "Automation" },
  { icon: Leaf, label: "Sustainability" },
  { icon: Sprout, label: "Agriculture" },
];

const MissionVision = () => (
  <section className="py-16 lg:py-24 bg-muted/50">
    <div className="container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-4xl">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Purpose & Direction</span>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">Mission & Vision</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={fadeUp} custom={1} className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Our Mission</h3>
            <p className="leading-relaxed text-muted-foreground">
              To empower farmers and agri entrepreneurs with intelligent technologies that make agriculture more productive, efficient, and sustainable.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={2} className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-transform group-hover:scale-110">
              <Eye className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">Our Vision</h3>
            <p className="leading-relaxed text-muted-foreground">
              To build the world's leading DeepTech platform for intelligent agriculture and rural economic transformation.
            </p>
          </motion.div>
        </div>

        {/* Core tech icons */}
        <motion.div variants={fadeUp} custom={3} className="mt-12 flex flex-wrap justify-center gap-6">
          {coreIcons.map((item, i) => (
            <motion.div key={item.label} whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── COLLABORATION ─── */
const collabAreas = [
  { icon: Lightbulb, title: "AgriTech Research", desc: "Joint R&D with leading agricultural research institutions" },
  { icon: Cog, title: "IoT & AI Platforms", desc: "Co-development of intelligent automation systems" },
  { icon: GraduationCap, title: "Entrepreneur Training", desc: "Skill development programs for rural entrepreneurs" },
  { icon: Leaf, title: "Sustainable Farming", desc: "Initiatives promoting eco-friendly farming practices" },
];

const Collaboration = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-5xl">
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Ecosystem</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Collaboration & Ecosystem</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            iYarKai Tech Lab collaborates with research institutions, technology partners, incubators, and government programs to accelerate innovation in agriculture.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collabAreas.map((area, i) => (
            <motion.div key={area.title} variants={fadeUp} custom={i} whileHover={{ y: -6 }} className="group rounded-2xl border border-border bg-card p-6 shadow-card text-center transition-all hover:shadow-elevated hover:border-primary/30">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                <area.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{area.title}</h3>
              <p className="text-sm text-muted-foreground">{area.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner ecosystem badges */}
        <motion.div variants={fadeUp} custom={5} className="mt-12 rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ecosystem Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Research Institutions", "Technology Partners", "Government Programs", "Startup Incubators", "Agricultural Universities"].map((p) => (
              <span key={p} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-card transition-all hover:border-primary/30 hover:shadow-elevated">{p}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── AWARDS ─── */
const awards = [
  { icon: Trophy, title: "AgriTech Innovation Award", org: "National Startup Program", year: "2023" },
  { icon: Award, title: "DeepTech Startup Recognition", org: "Technology Incubator Program", year: "2022" },
  { icon: Star, title: "Best IoT Solution — Agriculture", org: "Government Innovation Initiative", year: "2024" },
  { icon: Rocket, title: "Top AgriTech Startup", org: "Startup Ecosystem Competition", year: "2023" },
];

const Awards = () => (
  <section className="py-16 lg:py-24 bg-muted/50">
    <div className="container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Recognition</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">Awards & Recognition</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            iYarKai Tech Lab has received recognition from multiple innovation and startup ecosystems for its work in DeepTech agriculture and rural entrepreneurship.
          </p>
        </motion.div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {awards.map((a, i) => (
            <motion.div key={a.title} variants={fadeUp} custom={i} whileHover={{ scale: 1.02 }} className="group flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-accent/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-transform group-hover:scale-110">
                <a.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.org}</p>
                <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">{a.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── IN THE NEWS ─── */
const newsItems = [
  { title: "iYarKai's AI-Powered Smart Farming System Transforms Rural Agriculture", source: "AgriTech Today", date: "2024" },
  { title: "How IoT Sensors Are Revolutionizing Mushroom Cultivation in India", source: "Innovation Weekly", date: "2024" },
  { title: "Chennai Startup Builds DeepTech Infrastructure for Sustainable Farming", source: "Startup Ecosystem", date: "2023" },
];

const InTheNews = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Media</span>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">iYarKai Tech Lab in the Media</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Media coverage highlighting the company's work in smart agriculture, AI-driven farming, and rural entrepreneurship development.
          </p>
        </motion.div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {newsItems.map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -4 }} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Newspaper className="h-5 w-5 text-secondary" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{item.source}</p>
              <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
              <span className="text-xs text-muted-foreground">{item.date}</span>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Read more <ChevronRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── TESTIMONIALS ─── */
const testimonials = [
  {
    quote: "The SILIR smart farming system transformed our mushroom cultivation process by enabling real-time monitoring and automated environmental control.",
    name: "Ramesh Kumar",
    role: "Mushroom Farmer",
    initials: "RK",
  },
  {
    quote: "iYarKai's IoT platform made it possible for me to manage multiple grow rooms remotely. The data insights helped me reduce crop losses significantly.",
    name: "Priya Devi",
    role: "Agri Entrepreneur",
    initials: "PD",
  },
  {
    quote: "Partnering with iYarKai on their smart agriculture initiative has been rewarding. Their technology stack is genuinely built for real-world farming conditions.",
    name: "Dr. Anand Raj",
    role: "AgriTech Research Partner",
    initials: "AR",
  },
];

const Testimonials = () => (
  <section className="py-16 lg:py-24 bg-muted/50">
    <div className="container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</span>
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">What Our Community Says</h2>
        </motion.div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -4 }} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/30">
              <Quote className="mb-3 h-6 w-6 text-primary/30" />
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">{t.initials}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CTASection = () => (
  <section className="relative overflow-hidden py-16 lg:py-24">
    <div className="absolute inset-0 bg-gradient-hero" />
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
      backgroundSize: "32px 32px",
    }} />
    <div className="container relative z-10 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
          Partner with Us to Build the Future of Agriculture
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
          Join iYarKai Tech Lab in transforming agriculture through AI, IoT, and intelligent automation.
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold" asChild><Link to="/request-demo">Request Demo <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          <Button size="lg" className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-semibold" asChild><Link to="/technology">Explore Technology</Link></Button>
          <Button size="lg" className="border-2 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 font-semibold" asChild><Link to="/partner-application">Partner With ITL</Link></Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── PAGE ─── */
const Company = () => (
  <div>
    <Overview />
    <AboutUs />
    <MissionVision />
    <Collaboration />
    <Awards />
    <InTheNews />
    <Testimonials />
    <CTASection />
  </div>
);

export default Company;
