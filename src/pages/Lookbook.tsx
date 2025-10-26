import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import lookbookData from "@/data/lookbook.json";

const Lookbook = () => {
  const [items, setItems] = useState(lookbookData);
  const [filteredItems, setFilteredItems] = useState(lookbookData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  useEffect(() => {
    const savedLookbook = localStorage.getItem('maxjuma-lookbook');
    if (savedLookbook) {
      const parsed = JSON.parse(savedLookbook);
      setItems(parsed);
      setFilteredItems(parsed);
    }
  }, []);

  useEffect(() => {
    let filtered = items;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.event.includes(selectedCategory));
    }
    if (selectedStyle !== "All") {
      filtered = filtered.filter(item => item.style === selectedStyle);
    }
    if (selectedGender !== "All") {
      filtered = filtered.filter(item => item.gender === selectedGender);
    }

    setFilteredItems(filtered);
  }, [selectedCategory, selectedStyle, selectedGender, items]);

  const categories = ["All", "Weddings", "Corporate", "Cultural", "Formal"];
  const styles = ["All", ...new Set(items.map(item => item.style))];
  const genders = ["All", ...new Set(items.map(item => item.gender))];

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
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-wider">
              LOOKBOOK
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Real clients, real style. Nairobi's changemakers trust MaxJuma for weddings, business, and life's important moments.
            </p>
            <p className="text-accent text-lg font-medium">#custom #bespoke</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-foreground mb-2">Style</label>
              <div className="flex flex-wrap gap-2">
                {styles.map(style => (
                  <Button
                    key={style}
                    variant={selectedStyle === style ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStyle(style)}
                    className={selectedStyle === style ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
              <div className="flex flex-wrap gap-2">
                {genders.map(gender => (
                  <Button
                    key={gender}
                    variant={selectedGender === gender ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGender(gender)}
                    className={selectedGender === gender ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    {gender}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length} items
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No items match your filters</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedStyle("All");
                  setSelectedGender("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-block bg-accent px-3 py-1 rounded-full text-xs font-medium">
                          {item.gender}
                        </span>
                        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                          {item.color}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
                      <p className="text-xs text-white/70">{item.event}</p>
                      <p className="text-accent font-semibold text-sm mt-2">{item.priceRange}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Be Part of Our Story
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join Nairobi's most stylish professionals. Your custom suit awaits.
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/book">Book Your Fitting</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lookbook;
