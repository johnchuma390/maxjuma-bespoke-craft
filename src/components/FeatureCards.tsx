import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Ruler, Bot, Sparkles } from "lucide-react";

const FeatureCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Ruler,
      title: "Your Measurements, Our Craft",
      description:
        "Every suit begins with your unique body measurements, ensuring a perfect fit that flatters your silhouette.",
    },
    {
      icon: Bot,
      title: "AI-Refined Fit, Tailor-Verified",
      description:
        "Our advanced sizing intelligence predicts your perfect fit before our tailors cut the cloth—marrying data with craftsmanship.",
    },
    {
      icon: Sparkles,
      title: "Hand-Selected Fabrics",
      description:
        "Choose from premium fabrics sourced from Italian, Belgian, and British mills for unparalleled quality.",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative p-8 lg:p-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-accent to-transparent mt-6 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
