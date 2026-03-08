import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Cloud, Zap, Radio, BarChart3, Server, Users, BookOpen, Lightbulb } from "lucide-react";
import PageHeader from "@/components/visuals/PageHeader";

const solutionData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Cpu;
  benefits: string[];
  howItWorks: { step: string; desc: string }[];
  techStack: string[];
  useCases: string[];
  relatedProduct?: { name: string; path: string };
}> = {
  "mushroom-automation": {
    title: "Mushroom Farm Automation",
    subtitle: "AI-Powered Environmental Control for Commercial Cultivation",
    description: "Our SILIR1000 platform delivers end-to-end automation for commercial mushroom cultivation. Using AI-driven environmental control, IoT sensors, and predictive analytics, we enable consistent yield quality, reduced labor dependency, and real-time monitoring across multiple chambers.",
    icon: Radio,
    benefits: [
      "Automated climate control for temperature, humidity, CO2, and light cycles",
      "Real-time contamination detection using computer vision",
      "Yield prediction models with 95%+ accuracy",
      "Multi-chamber management from a single dashboard",
      "Reduced labor costs by up to 60%",
      "Consistent crop quality across cultivation cycles",
    ],
    howItWorks: [
      { step: "Sensor Deployment", desc: "IoT sensors monitor temperature, humidity, CO2, light, and air quality across all chambers." },
      { step: "Edge Processing", desc: "SILIR1000 edge controllers process sensor data locally for real-time actuator control." },
      { step: "AI Analytics", desc: "Machine learning models analyze growth patterns and predict yield, contamination, and harvest timing." },
      { step: "Automated Response", desc: "Climate systems, ventilation, and irrigation are automatically adjusted based on AI recommendations." },
    ],
    techStack: ["SILIR1000", "AI/ML", "IoT Sensors", "KitHub Cloud", "Edge Computing", "Computer Vision"],
    useCases: [
      "Commercial oyster mushroom farms scaling beyond 10,000 sq ft",
      "Multi-location farm operators needing centralized monitoring",
      "Research institutions studying mushroom cultivation parameters",
      "Organic mushroom producers requiring contamination-free environments",
    ],
    relatedProduct: { name: "SILIR1000", path: "/products/silir1000" },
  },
  "poultry-automation": {
    title: "Poultry Farm Automation",
    subtitle: "Intelligent Poultry Management with AI & Robotics",
    description: "SILIR2000 combines computer vision, robotics, and IoT to transform poultry farm operations. From automated health monitoring and feed optimization to robotic egg collection, our platform enables data-driven poultry management at scale.",
    icon: Cpu,
    benefits: [
      "AI-powered bird health monitoring and early disease detection",
      "Automated feed optimization reducing waste by 25%",
      "Robotic systems for egg collection and sorting",
      "Environmental control for optimal growth conditions",
      "Real-time mortality alerts and flock analytics",
      "Integration with supply chain and distribution systems",
    ],
    howItWorks: [
      { step: "Vision Systems", desc: "Cameras and computer vision monitor bird behavior, health indicators, and mortality in real-time." },
      { step: "Smart Feeding", desc: "AI algorithms optimize feed schedules and quantities based on flock age, weight, and growth targets." },
      { step: "Robotic Automation", desc: "Robotic systems handle egg collection, sorting, and routine maintenance tasks." },
      { step: "Cloud Analytics", desc: "KitHub platform aggregates data for farm-wide analytics, reporting, and decision support." },
    ],
    techStack: ["SILIR2000", "Computer Vision", "Robotics", "KitHub Cloud", "AI/ML", "Edge Controllers"],
    useCases: [
      "Large-scale broiler and layer farm operations",
      "Integrated poultry companies with multiple locations",
      "Hatcheries requiring automated monitoring",
      "Feed mills optimizing nutrition delivery",
    ],
    relatedProduct: { name: "SILIR2000", path: "/products/silir2000" },
  },
  "postharvest-automation": {
    title: "PostHarvest Automation",
    subtitle: "Blockchain-Enabled Traceability & Cold Chain Management",
    description: "SILIR3000 provides comprehensive post-harvest infrastructure with blockchain traceability, cold chain IoT monitoring, and quality assurance automation. Ensure food safety, reduce wastage, and build consumer trust across the supply chain.",
    icon: Server,
    benefits: [
      "End-to-end blockchain traceability from farm to consumer",
      "Real-time cold chain temperature and humidity monitoring",
      "Automated quality grading using computer vision",
      "Reduction in post-harvest losses by up to 40%",
      "Compliance with food safety regulations and certifications",
      "Consumer-facing transparency and trust building",
    ],
    howItWorks: [
      { step: "Harvest Tracking", desc: "Blockchain records capture origin, harvest date, quality grades, and handling at every step." },
      { step: "Cold Chain IoT", desc: "Temperature and humidity sensors monitor storage and transit conditions in real-time." },
      { step: "Quality Assurance", desc: "Computer vision systems automate sorting, grading, and defect detection." },
      { step: "Distribution", desc: "Smart logistics integration ensures optimal routing and delivery timing." },
    ],
    techStack: ["SILIR3000", "Blockchain", "Cold Chain IoT", "KitHub Cloud", "Computer Vision", "Smart Logistics"],
    useCases: [
      "Fresh produce supply chains requiring traceability",
      "Cold storage operators managing perishable goods",
      "Export-oriented farms needing compliance documentation",
      "Retail chains building farm-to-fork transparency",
    ],
    relatedProduct: { name: "SILIR3000", path: "/products/silir3000" },
  },
  "smart-irrigation": {
    title: "Smart Irrigation Infrastructure",
    subtitle: "Precision Water Management with Soil Intelligence",
    description: "SILIR4000 delivers precision irrigation using soil moisture sensors, weather data integration, and AI-driven scheduling. Optimize water usage, improve crop yields, and manage irrigation infrastructure across large-scale open field operations.",
    icon: Cloud,
    benefits: [
      "Water savings of 30-50% compared to traditional irrigation",
      "AI-driven irrigation scheduling based on soil and weather data",
      "Multi-zone control for diverse crop requirements",
      "Pump and motor automation with fault detection",
      "Weather-adaptive scheduling with forecast integration",
      "Mobile app for remote monitoring and manual overrides",
    ],
    howItWorks: [
      { step: "Soil Intelligence", desc: "Multi-depth soil moisture, temperature, and EC sensors provide real-time field data." },
      { step: "Weather Integration", desc: "Local weather stations and forecast APIs inform evapotranspiration models." },
      { step: "AI Scheduling", desc: "Machine learning optimizes irrigation timing, duration, and volume for each zone." },
      { step: "Automated Control", desc: "Valves, pumps, and motors are controlled automatically with safety interlocks." },
    ],
    techStack: ["SILIR4000", "Soil Sensors", "Weather AI", "KitHub Cloud", "Motor Control", "Mobile App"],
    useCases: [
      "Large-scale row crop and cereal farming operations",
      "Orchard and plantation irrigation management",
      "Government irrigation modernization projects",
      "Water-scarce regions requiring precision water management",
    ],
    relatedProduct: { name: "SILIR4000", path: "/products/silir4000" },
  },
  "polyhouse-automation": {
    title: "Polyhouse Automation",
    subtitle: "Complete Climate & Crop Management for Protected Cultivation",
    description: "SILIR5000 automates every aspect of polyhouse farming — from climate control and fertigation to crop monitoring and harvest planning. Built for commercial polyhouse operators, it delivers consistent yields in controlled environments.",
    icon: Zap,
    benefits: [
      "Automated climate control: ventilation, fogging, shading, heating",
      "Precision fertigation with nutrient dosing automation",
      "Crop growth monitoring with AI-based disease detection",
      "Energy optimization reducing operational costs by 35%",
      "Multi-polyhouse management from centralized dashboard",
      "Harvest scheduling and yield forecasting",
    ],
    howItWorks: [
      { step: "Environment Sensing", desc: "Sensors monitor temperature, humidity, light, CO2, wind speed, and rain across the polyhouse." },
      { step: "Climate Automation", desc: "Actuators control roof vents, side curtains, foggers, fans, and shade nets automatically." },
      { step: "Smart Fertigation", desc: "EC/pH sensors and dosing pumps deliver precise nutrient solutions to each zone." },
      { step: "Crop Intelligence", desc: "Camera-based monitoring tracks crop health, growth rate, and pest/disease indicators." },
    ],
    techStack: ["SILIR5000", "Climate AI", "Fertigation", "KitHub Cloud", "Computer Vision", "PLC Controllers"],
    useCases: [
      "Commercial polyhouse vegetable and flower production",
      "Hi-tech greenhouse nurseries and seedling production",
      "Research institutions studying protected cultivation",
      "Corporate farms scaling polyhouse operations",
    ],
    relatedProduct: { name: "SILIR5000", path: "/products/silir5000" },
  },
  "technology-consulting": {
    title: "Technology Consulting",
    subtitle: "Strategic Technology Advisory for Agricultural Enterprises",
    description: "Our technology consulting practice helps agricultural enterprises, institutions, and startups navigate the adoption of AI, IoT, and automation technologies. From assessment to implementation, we provide hands-on guidance for digital transformation.",
    icon: BarChart3,
    benefits: [
      "Technology readiness assessment and gap analysis",
      "Architecture design for smart farming infrastructure",
      "Vendor evaluation and technology selection support",
      "Implementation roadmap with phased deployment plans",
      "Team training and capability building programs",
      "Ongoing advisory and technical support",
    ],
    howItWorks: [
      { step: "Assessment", desc: "We evaluate your current operations, infrastructure, and technology readiness." },
      { step: "Strategy", desc: "We design a technology roadmap aligned with your business goals and budget." },
      { step: "Implementation", desc: "Our engineers guide the deployment, integration, and testing of solutions." },
      { step: "Optimization", desc: "Continuous improvement through data analysis, feedback, and system tuning." },
    ],
    techStack: ["Assessment", "Architecture Design", "Implementation", "Training", "Support", "Advisory"],
    useCases: [
      "Agricultural enterprises planning digital transformation",
      "Government bodies modernizing farming infrastructure",
      "Agritech startups building technology products",
      "Educational institutions developing smart agriculture programs",
    ],
  },
  "design-thinking": {
    title: "Design Thinking Consultancy & Training",
    subtitle: "Innovation Methodologies for Agricultural Challenges",
    description: "We bring design thinking methodology to the agricultural sector, helping teams solve complex challenges through human-centered innovation. Our programs combine workshops, coaching, and hands-on projects to build lasting innovation capabilities.",
    icon: Lightbulb,
    benefits: [
      "Structured innovation workshops for agricultural challenges",
      "Human-centered design approach for farm technology",
      "Cross-functional team collaboration frameworks",
      "Rapid prototyping and validation methodologies",
      "Certified training programs for teams and individuals",
      "Long-term innovation culture development",
    ],
    howItWorks: [
      { step: "Empathize", desc: "Deep stakeholder research to understand farmer needs, pain points, and context." },
      { step: "Define & Ideate", desc: "Problem framing workshops and structured ideation sessions to generate solutions." },
      { step: "Prototype", desc: "Rapid prototyping of concepts using low-fidelity models and digital tools." },
      { step: "Test & Iterate", desc: "Field validation with real users, feedback synthesis, and solution refinement." },
    ],
    techStack: ["Workshops", "Coaching", "Certification", "Programs", "Mentoring", "Tools"],
    useCases: [
      "Corporate innovation teams in agriculture companies",
      "Farmer producer organizations exploring new models",
      "University programs in agricultural innovation",
      "Government agencies designing farmer-centric policies",
    ],
  },
  "innovation-coaching": {
    title: "Innovation Coaching",
    subtitle: "Guided Innovation Programs for AgriTech Ventures",
    description: "Our innovation coaching programs guide startups and enterprises through the journey from idea to scalable agritech product. With structured mentoring, technical validation, and market guidance, we help accelerate innovation in agriculture.",
    icon: Users,
    benefits: [
      "One-on-one mentoring with experienced agritech innovators",
      "Technical feasibility validation and architecture guidance",
      "Market analysis and go-to-market strategy support",
      "Investor readiness preparation and pitch coaching",
      "Prototype development support with engineering teams",
      "Network access to partners, customers, and investors",
    ],
    howItWorks: [
      { step: "Discovery", desc: "We assess your idea, team, market opportunity, and technology requirements." },
      { step: "Validation", desc: "Structured experiments to validate problem-solution fit and technical feasibility." },
      { step: "Build", desc: "Guided prototype development with access to engineering expertise and infrastructure." },
      { step: "Scale", desc: "Go-to-market planning, partnership development, and funding strategy support." },
    ],
    techStack: ["Mentoring", "Prototyping", "Validation", "Scaling", "Funding", "Partnerships"],
    useCases: [
      "Early-stage agritech startups seeking product-market fit",
      "Corporate intrapreneurs building new agriculture ventures",
      "Researchers commercializing agricultural technologies",
      "Social enterprises addressing food system challenges",
    ],
  },
};

const SolutionDetail = () => {
  const { solutionId } = useParams();
  const solution = solutionId ? solutionData[solutionId] : null;

  if (!solution) return <Navigate to="/solutions" replace />;

  const Icon = solution.icon;

  return (
    <div>
      <PageHeader tag="Solution" title={solution.title} description={solution.subtitle} />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <Link to="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> All Solutions
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground leading-relaxed">
              {solution.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground lg:text-3xl">Key Benefits</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {solution.benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-foreground">{b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground lg:text-3xl">How It Works</h2>
            <div className="space-y-6">
              {solution.howItWorks.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{step.step}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-muted py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-foreground lg:text-3xl">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {solution.techStack.map((t) => (
                <span key={t} className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-foreground lg:text-3xl">Ideal For</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {solution.useCases.map((uc, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <p className="text-sm text-foreground">{uc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary-foreground lg:text-3xl">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
            Connect with our team to explore how this solution can transform your operations.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero-outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/request-demo">Request Demo <ArrowRight className="ml-1 h-5 w-5" /></Link>
            </Button>
            {solution.relatedProduct && (
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to={solution.relatedProduct.path}>View {solution.relatedProduct.name} →</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionDetail;
