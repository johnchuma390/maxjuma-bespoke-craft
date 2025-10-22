import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import suitSilhouette from "@/assets/suit-silhouette.jpg";

const FabricShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fabrics = [
    "SUPIMA COTTON",
    "120s WOOL",
    "BELGIAN LINEN",
    "ITALIAN MILLS",
    "VEGAN STRETCH",
    "CASHMERE BLEND",
    "MOHAIR",
    "SILK BLEND",
  ];

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-40 overflow-hidden bg-primary"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${suitSilhouette})` }}
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-16 space-y-4"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              luxury fabrics •<br />
              <span className="text-accent">expertly tailored</span>
            </h2>
          </motion.div>

          {/* Fabric Scroller */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden py-8"
          >
            <motion.div
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex space-x-8 whitespace-nowrap"
            >
              {[...fabrics, ...fabrics, ...fabrics].map((fabric, index) => (
                <span
                  key={index}
                  className="text-2xl lg:text-3xl font-medium text-white/80 tracking-wider"
                >
                  {fabric}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg group"
              asChild
            >
              <Link to="/fabrics">
                Design Your Suit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FabricShowcase;
