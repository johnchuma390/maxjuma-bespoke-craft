import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import suitNavy from "@/assets/suit-navy.jpg";
import suitCamel from "@/assets/suit-camel.jpg";
import tuxWhite from "@/assets/tux-white.jpg";
import tuxVelvet from "@/assets/tux-velvet.jpg";
import heroImage from "@/assets/hero-suit.jpg";
import fabricGrid from "@/assets/fabric-grid.jpg";

const Gallery = () => {
  const galleryItems = [
    {
      image: heroImage,
      category: "Business",
      title: "Corporate Executive",
      description: "Custom navy three-piece for Nairobi CEO",
    },
    {
      image: tuxWhite,
      category: "Wedding",
      title: "Wedding Special",
      description: "Groom's white tuxedo, Karen ceremony",
    },
    {
      image: suitCamel,
      category: "Casual",
      title: "Smart Casual",
      description: "Double-breasted camel for gallery opening",
    },
    {
      image: tuxVelvet,
      category: "Evening",
      title: "Gala Evening",
      description: "Velvet tuxedo for charity gala",
    },
    {
      image: suitNavy,
      category: "Business",
      title: "Legal Professional",
      description: "Classic navy for senior advocate",
    },
    {
      image: fabricGrid,
      category: "Craftsmanship",
      title: "Artisan Detail",
      description: "Hand-stitched perfection",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              Real Clients, Real Style
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Nairobi's changemakers trust MaxJuma for weddings, business, and
              life's important moments. <span className="text-accent">#custom #bespoke</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block bg-accent px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">
              Be Part of Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join Nairobi's most stylish professionals. Your custom suit awaits.
            </p>
            <motion.a
              href="/book"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium text-lg"
            >
              Book Your Fitting
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
