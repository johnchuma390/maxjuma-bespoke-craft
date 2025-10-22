import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import suitNavy from "@/assets/suit-navy.jpg";
import suitCamel from "@/assets/suit-camel.jpg";
import tuxWhite from "@/assets/tux-white.jpg";
import tuxVelvet from "@/assets/tux-velvet.jpg";

const ProductCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      id: 1,
      name: "Classic Navy",
      category: "Three-Piece Suit",
      image: suitNavy,
      price: "From KES 45,000",
    },
    {
      id: 2,
      name: "Camel Double-Breasted",
      category: "Business Suit",
      image: suitCamel,
      price: "From KES 52,000",
    },
    {
      id: 3,
      name: "White Tuxedo",
      category: "Wedding Formal",
      image: tuxWhite,
      price: "From KES 65,000",
    },
    {
      id: 4,
      name: "Midnight Velvet",
      category: "Evening Tuxedo",
      image: tuxVelvet,
      price: "From KES 72,000",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Bespoke Suits & Tuxedos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece meticulously crafted to your exact measurements and style
            preferences
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      variant="outline"
                      className="bg-white text-primary border-0 hover:bg-accent hover:text-white"
                      asChild
                    >
                      <Link to="/suits">
                        <Eye className="mr-2 h-4 w-4" />
                        View Style
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <p className="text-sm text-accent font-medium uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground">{product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group"
            asChild
          >
            <Link to="/suits">
              View All Suits
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;
