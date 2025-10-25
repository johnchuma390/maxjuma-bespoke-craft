import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import suitsData from "@/data/suits.json";

const Suits = () => {
  const [suits, setSuits] = useState(suitsData);

  useEffect(() => {
    const savedSuits = localStorage.getItem('maxjuma-suits');
    if (savedSuits) {
      setSuits(JSON.parse(savedSuits));
    }
  }, []);

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
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-wider">
              BESPOKE SUITS & TUXEDOS
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Each piece is meticulously crafted to your exact measurements, style preferences, and lifestyle needs. Hand-cut, hand-sewn, and made to last a lifetime.
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
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={suit.image}
                      alt={suit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Badge className="bg-accent text-white">
                        {suit.category}
                      </Badge>
                      <Badge variant="outline" className="bg-white/90 text-primary border-0">
                        {suit.style}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {suit.name}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {suit.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {suit.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-accent mr-2">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Perfect For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suit.occasions.map((occasion, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border mt-auto">
                      <p className="text-xl font-semibold text-accent mb-3">
                        {suit.price}
                      </p>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <Link to="/book">Book Fitting</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
