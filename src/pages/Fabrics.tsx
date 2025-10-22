import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import fabricGrid from "@/assets/fabric-grid.jpg";

const Fabrics = () => {
  const fabricCategories = [
    {
      name: "SUPIMA COTTON",
      description: "Breathable luxury for tropical climates",
      origin: "Egyptian & American mills",
      weight: "180-220 gsm",
    },
    {
      name: "120s WOOL",
      description: "Classic business suiting with natural stretch",
      origin: "Italian & British mills",
      weight: "240-280 gsm",
    },
    {
      name: "BELGIAN LINEN",
      description: "Lightweight summer fabric with natural texture",
      origin: "Belgian artisan weavers",
      weight: "200-240 gsm",
    },
    {
      name: "CASHMERE BLEND",
      description: "Ultimate luxury with exceptional softness",
      origin: "Italian mills",
      weight: "260-300 gsm",
    },
    {
      name: "VEGAN STRETCH",
      description: "Modern sustainable alternative with comfort",
      origin: "European innovation labs",
      weight: "220-260 gsm",
    },
    {
      name: "MOHAIR BLEND",
      description: "Crisp finish with natural sheen",
      origin: "South African & Italian mills",
      weight: "240-280 gsm",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${fabricGrid})` }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              Premium Fabrics
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hand-selected from the world's finest mills. Each fabric tells a
              story of craftsmanship and quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fabric Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fabricCategories.map((fabric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">
                    {fabric.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {fabric.description}
                  </p>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Origin:</span>
                      <span className="font-medium text-foreground">
                        {fabric.origin}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium text-foreground">
                        {fabric.weight}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 bg-white rounded-2xl p-8 lg:p-12 shadow-xl"
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                How to Choose Your Fabric
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                During your fitting appointment, our expert stylists will guide
                you through our fabric collection. We'll help you select the
                perfect material based on your climate, occasion, and personal
                style preferences. Each fabric can be viewed and felt in person
                at our Nairobi atelier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <motion.a
                  href="/book"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium"
                >
                  Book Fabric Consultation
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fabrics;
