import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Droplet, Recycle, Heart, Scissors, Trash2, Wind } from "lucide-react";
import artisanImage from "@/assets/artisan-hands.jpg";

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Scissors, label: "Slow Fashion" },
    { icon: Recycle, label: "Zero Waste" },
    { icon: Heart, label: "Responsible Manufacturing" },
    { icon: Scissors, label: "Hand-Crafted" },
    { icon: Trash2, label: "Reduce Landfills" },
    { icon: Wind, label: "Conserve Water" },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              >
                CUSTOM SUITS
                <br />
                <span className="text-accent">A.I. TAILORED FOR YOU</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                We craft custom suits & tuxedos that are luxurious,
                cost-efficient and sustainable. Hand-made in our Nairobi atelier,
                enhanced by AI for precise fits that marry data with
                craftsmanship.
              </motion.p>
            </div>

            {/* Feature Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-square">
              <img
                src={artisanImage}
                alt="Artisan hand-crafting a bespoke suit"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-accent text-white px-6 py-4 rounded-xl shadow-xl"
            >
              <p className="text-sm font-medium">Nairobi Atelier</p>
              <p className="text-2xl font-bold">Since 2020</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
