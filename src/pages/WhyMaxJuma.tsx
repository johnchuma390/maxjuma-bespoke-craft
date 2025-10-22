import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Droplet, Leaf, Award } from "lucide-react";
import fabricGrid from "@/assets/fabric-grid.jpg";

const WhyMaxJuma = () => {
  const sustainabilityRef = useRef(null);
  const isInView = useInView(sustainabilityRef, { once: true });
  
  const [waterSaved, setWaterSaved] = useState(0);
  const [landfillReduced, setLandfillReduced] = useState(0);

  useEffect(() => {
    if (isInView) {
      const waterInterval = setInterval(() => {
        setWaterSaved((prev) => {
          if (prev >= 76) {
            clearInterval(waterInterval);
            return 76;
          }
          return prev + 1;
        });
      }, 20);

      const landfillInterval = setInterval(() => {
        setLandfillReduced((prev) => {
          if (prev >= 85) {
            clearInterval(landfillInterval);
            return 85;
          }
          return prev + 1;
        });
      }, 18);

      return () => {
        clearInterval(waterInterval);
        clearInterval(landfillInterval);
      };
    }
  }, [isInView]);

  const benefits = [
    {
      icon: Sparkles,
      title: "AI-Enhanced Precision",
      description:
        "Our advanced sizing intelligence analyzes thousands of measurements to predict your perfect fit before the first cut. Data-driven accuracy meets traditional craftsmanship.",
    },
    {
      icon: Award,
      title: "Master Tailors",
      description:
        "Every suit is crafted by experienced artisans with decades of expertise. Hand-stitched details and traditional techniques ensure lasting quality.",
    },
    {
      icon: Droplet,
      title: "Sustainable Luxury",
      description:
        "Made-to-order production eliminates waste. We use eco-conscious practices and responsibly sourced materials without compromising on quality.",
    },
    {
      icon: Leaf,
      title: "180-Day Guarantee",
      description:
        "We stand behind our craftsmanship. If your suit doesn't fit perfectly, we'll remake it at no cost within 180 days of delivery.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              Why Choose MaxJuma?
            </h1>
            <p className="text-xl text-white/90">
              Where artificial intelligence meets artisan craftsmanship to create
              the perfect suit for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Fit Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-foreground">
                100% Guaranteed
                <br />
                <span className="text-accent">PERFECT FITS</span>
                <br />
                powered by A.I.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our advanced sizing intelligence predicts your perfect fit before
                our tailors cut the cloth—marrying data with craftsmanship. The
                result? A suit that feels like it was made for you. Because it
                was.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground">
                    Precision measurements from 40+ data points
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground">
                    AI-predicted fit validated by master tailors
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground">
                    Free alterations and remakes within 180 days
                  </span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={fabricGrid}
                alt="AI-assisted tailoring"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section ref={sustainabilityRef} className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <h2 className="text-4xl font-bold">
              Luxury That's Kind to Our Planet
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl font-bold text-accent mb-2">
                  {waterSaved}%
                </div>
                <p className="text-xl font-medium">Less Freshwater Used</p>
                <p className="text-white/80 mt-2">
                  Compared to mass-produced textile lifecycle
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl font-bold text-accent mb-2">
                  {landfillReduced}%
                </div>
                <p className="text-xl font-medium">Less Landfill Impact</p>
                <p className="text-white/80 mt-2">
                  Through made-to-order production
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold">What You Get & What the World Gets</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="font-bold text-accent">You Get:</h4>
                  <ul className="space-y-1 text-white/90">
                    <li>• Perfect fits that last</li>
                    <li>• Lasting clothing quality</li>
                    <li>• Suits designed for your life</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-accent">World Gets:</h4>
                  <ul className="space-y-1 text-white/90">
                    <li>• Fewer natural resources used</li>
                    <li>• Reduced water consumption</li>
                    <li>• Less textile waste</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyMaxJuma;
