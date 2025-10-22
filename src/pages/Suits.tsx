import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import suitNavy from "@/assets/suit-navy.jpg";
import suitCamel from "@/assets/suit-camel.jpg";
import tuxWhite from "@/assets/tux-white.jpg";
import tuxVelvet from "@/assets/tux-velvet.jpg";

const Suits = () => {
  const suits = [
    {
      id: 1,
      name: "Classic Navy Three-Piece",
      category: "Business",
      image: suitNavy,
      price: "From KES 45,000",
      description: "Timeless elegance for the modern professional",
    },
    {
      id: 2,
      name: "Camel Double-Breasted",
      category: "Casual",
      image: suitCamel,
      price: "From KES 52,000",
      description: "Bold statement piece for sophisticated occasions",
    },
    {
      id: 3,
      name: "White Dinner Tuxedo",
      category: "Wedding",
      image: tuxWhite,
      price: "From KES 65,000",
      description: "Perfect for your special day",
    },
    {
      id: 4,
      name: "Midnight Velvet Tuxedo",
      category: "Evening",
      image: tuxVelvet,
      price: "From KES 72,000",
      description: "Luxury evening wear with rich texture",
    },
    {
      id: 5,
      name: "Charcoal Pinstripe",
      category: "Business",
      image: suitNavy,
      price: "From KES 48,000",
      description: "Executive presence with classic detailing",
    },
    {
      id: 6,
      name: "Light Grey Summer",
      category: "Casual",
      image: suitCamel,
      price: "From KES 42,000",
      description: "Breathable linen blend for warm weather",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              Bespoke Suits & Tuxedos
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Each piece is meticulously crafted to your exact measurements,
              style preferences, and lifestyle needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Suits Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suits.map((suit, index) => (
              <motion.div
                key={suit.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={suit.image}
                    alt={suit.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {suit.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {suit.name}
                  </h3>
                  <p className="text-muted-foreground">{suit.description}</p>
                  <p className="text-lg font-semibold text-accent">
                    {suit.price}
                  </p>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link to="/book">Book Fitting</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every suit is fully customizable. Book a consultation to discuss
              your unique vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <Link to="/book">Schedule Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary"
                asChild
              >
                <Link to="/fabrics">Browse Fabrics</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Suits;
