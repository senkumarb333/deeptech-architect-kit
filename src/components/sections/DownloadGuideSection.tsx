import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, FileText } from "lucide-react";

const DownloadGuideSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Guide link sent to your email!");
    setEmail("");
  };

  return (
    <section className="bg-foreground py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-primary-foreground lg:text-3xl">
            Download Free Guide
          </h2>
          <p className="mb-6 text-primary-foreground/70">
            Beginner Guide to Smart Mushroom Farming — get started with AI-powered cultivation.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
            />
            <Button variant="hero" type="submit">
              <Download className="mr-1 h-4 w-4" /> Get Guide
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadGuideSection;
