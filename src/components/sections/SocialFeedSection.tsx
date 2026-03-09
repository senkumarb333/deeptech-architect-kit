import { motion } from "framer-motion";
import { Linkedin, Youtube, Twitter, ExternalLink, Play, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialPosts = [
  {
    platform: "linkedin",
    icon: Linkedin,
    color: "text-[#0A66C2]",
    bgColor: "bg-[#0A66C2]/10",
    title: "Smart Mushroom Farm Deployment",
    content: "Excited to announce the successful deployment of our SILIR1000 system at a 5000 sq.ft mushroom cultivation facility in Tamil Nadu! 🍄",
    engagement: { likes: 234, comments: 45 },
    date: "2 days ago",
  },
  {
    platform: "youtube",
    icon: Youtube,
    color: "text-[#FF0000]",
    bgColor: "bg-[#FF0000]/10",
    title: "SILIR Smart Farming Demo",
    content: "Watch how our AI-powered IoT system automates environmental control for precision agriculture.",
    engagement: { views: "12K", duration: "3:24" },
    date: "1 week ago",
    isVideo: true,
  },
  {
    platform: "twitter",
    icon: Twitter,
    color: "text-foreground",
    bgColor: "bg-foreground/10",
    title: "AgriTech Innovation Update",
    content: "Our KitHub IoT platform now supports 50+ sensor types with real-time analytics! Building the future of smart agriculture. #AgriTech #IoT",
    engagement: { likes: 156, retweets: 42 },
    date: "3 days ago",
  },
];

const SocialFeedSection = () => (
  <section className="bg-muted py-16 lg:py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-tech-blue">
          Stay Connected
        </span>
        <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
          Latest Updates
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Follow our journey in transforming agriculture through technology.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {socialPosts.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-elevated hover:border-primary/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${post.bgColor}`}>
                  <post.icon className={`h-5 w-5 ${post.color}`} />
                </div>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>

            {post.isVideo && (
              <div className="relative mb-4 rounded-lg bg-foreground/5 aspect-video flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tech-blue/20" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center"
                >
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </motion.div>
                <span className="absolute bottom-2 right-2 text-xs bg-foreground/80 text-background px-2 py-1 rounded">
                  {post.engagement.duration}
                </span>
              </div>
            )}

            <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.content}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {post.engagement.likes && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" /> {post.engagement.likes}
                </span>
              )}
              {post.engagement.comments && (
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {post.engagement.comments}
                </span>
              )}
              {post.engagement.retweets && (
                <span className="flex items-center gap-1">
                  <Share2 className="h-3.5 w-3.5" /> {post.engagement.retweets}
                </span>
              )}
              {post.engagement.views && (
                <span>{post.engagement.views} views</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center gap-4 mt-10"
      >
        <Button variant="outline" size="sm" asChild>
          <a href="https://linkedin.com/company/iyarkai" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://youtube.com/@iyarkai" target="_blank" rel="noopener noreferrer">
            <Youtube className="h-4 w-4 mr-2" /> YouTube
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://twitter.com/iyarkai" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4 mr-2" /> Twitter
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default SocialFeedSection;
