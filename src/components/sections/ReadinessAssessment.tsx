import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle, Sprout } from "lucide-react";

const questions = [
  {
    id: "farmSize",
    question: "What is your farm or facility size?",
    options: ["Under 1 acre", "1–10 acres", "10–50 acres", "50+ acres"],
  },
  {
    id: "cropType",
    question: "What type of crop or produce?",
    options: ["Mushrooms", "Vegetables / Horticulture", "Grains / Cereals", "Mixed / Other"],
  },
  {
    id: "irrigation",
    question: "Current irrigation method?",
    options: ["Manual / Flood", "Drip irrigation", "Sprinkler", "No irrigation needed"],
  },
  {
    id: "techLevel",
    question: "Current technology usage level?",
    options: ["No technology", "Basic sensors", "Partial automation", "Fully automated"],
  },
  {
    id: "goal",
    question: "Primary deployment goal?",
    options: ["Reduce water usage", "Increase crop yield", "Automate monitoring", "Full smart farm setup"],
  },
];

const recommendations: Record<string, { title: string; desc: string }> = {
  Mushrooms: {
    title: "SILIR1000 – Smart Mushroom Cultivation System",
    desc: "AI-powered environmental control and monitoring for commercial mushroom production.",
  },
  "Reduce water usage": {
    title: "SILIR4000 – Smart Irrigation Automation",
    desc: "IoT-based precision irrigation with real-time soil moisture analytics.",
  },
  default: {
    title: "AI Crop Intelligence Platform",
    desc: "End-to-end smart farming with real-time crop monitoring, AI analytics, and automated control.",
  },
};

const ReadinessAssessment = () => {
  const [step, setStep] = useState(0); // 0-4 quiz, 5 = lead form, 6 = result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lead, setLead] = useState({ name: "", organization: "", email: "", phone: "", location: "" });

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[step].id]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(5); // lead form
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.email) {
      toast.error("Please provide your name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(lead.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Your personalized recommendation is ready!");
    setStep(6);
  };

  const getRecommendation = () => {
    if (answers.cropType === "Mushrooms") return recommendations["Mushrooms"];
    if (answers.goal === "Reduce water usage") return recommendations["Reduce water usage"];
    return recommendations["default"];
  };

  const progress = step <= 4 ? ((step + 1) / questions.length) * 100 : 100;

  return (
    <section className="bg-card py-20 lg:py-28 border-b border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Sprout className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
            Smart Agriculture Readiness Assessment
          </h2>
          <p className="text-muted-foreground">
            Answer 5 quick questions to receive a personalized deployment recommendation.
          </p>
        </motion.div>

        <div className="mx-auto max-w-xl">
          {/* Progress bar */}
          {step <= 5 && (
            <div className="mb-8 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-hero"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Quiz steps */}
            {step <= 4 && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-border bg-background p-8 shadow-elevated"
              >
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Question {step + 1} of {questions.length}
                </p>
                <h3 className="mb-6 text-lg font-semibold text-foreground">
                  {questions[step].question}
                </h3>
                <div className="grid gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="w-full rounded-xl border border-border bg-card px-5 py-3.5 text-left text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                )}
              </motion.div>
            )}

            {/* Lead capture */}
            {step === 5 && (
              <motion.form
                key="lead"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleLeadSubmit}
                className="rounded-2xl border border-border bg-background p-8 shadow-elevated space-y-4"
              >
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Get Your Personalized Recommendation
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Tell us about yourself so we can tailor the recommendation.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="Name *"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                  <Input
                    placeholder="Organization"
                    value={lead.organization}
                    onChange={(e) => setLead({ ...lead, organization: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  />
                </div>
                <Input
                  placeholder="Location (City, State)"
                  value={lead.location}
                  onChange={(e) => setLead({ ...lead, location: e.target.value })}
                />
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                  <Button variant="hero" size="lg" type="submit" className="flex-1">
                    View Recommendation <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Result */}
            {step === 6 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-primary/30 bg-background p-8 shadow-elevated text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  Recommended Solution
                </h3>
                <p className="mb-1 text-lg font-semibold text-primary">
                  {getRecommendation().title}
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  {getRecommendation().desc}
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="/book-consultation">
                    Start Pilot Deployment <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ReadinessAssessment;
