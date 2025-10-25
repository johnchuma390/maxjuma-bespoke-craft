import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import fabricsData from "@/data/fabrics.json";

const Fabrics = () => {
  const [fabrics, setFabrics] = useState(fabricsData);

  useEffect(() => {
    const savedFabrics = localStorage.getItem('maxjuma-fabrics');
    if (savedFabrics) {
      setFabrics(JSON.parse(savedFabrics));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-wider">LUXURY FABRICS</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">Expertly sourced from the world's finest mills.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fabrics.map((fabric, index) => (
              <motion.div key={fabric.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4"><Badge className="bg-accent text-white">{fabric.category}</Badge></div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{fabric.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span className="font-medium">{fabric.origin}</span><span>•</span><span>{fabric.weight}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{fabric.description}</p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-lg font-semibold text-accent mb-3">{fabric.priceRange}</p>
                      <Button className="w-full bg-primary hover:bg-primary/90" asChild><Link to="/book">Select This Fabric</Link></Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fabrics;
