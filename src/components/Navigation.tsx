import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, Scissors, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Our Suits", path: "/suits", icon: ShoppingBag },
    { label: "Premium Fabrics", path: "/fabrics", icon: Scissors },
    { label: "Lookbook", path: "/lookbook", icon: null },
    { label: "About Us", path: "/about", icon: null },
    { label: "Book Fitting", path: "/book", icon: null },
  ];

  const whatsappUrl = "https://wa.me/254748215758";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-effect shadow-lg border-b border-border/50"
          : "bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo - More Prominent */}
          <Link to="/" className="z-50 group">
            <motion.div
              className="flex flex-col items-start"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <h1
                className={`text-3xl lg:text-4xl font-bold tracking-[0.2em] transition-all duration-300 ${
                  isScrolled ? "text-primary" : "text-white drop-shadow-lg"
                }`}
              >
                MAXJUMA
              </h1>
              <p
                className={`text-[10px] lg:text-xs tracking-[0.3em] font-light transition-all duration-300 ${
                  isScrolled ? "text-accent" : "text-accent/90"
                }`}
              >
                BESPOKE TAILORS
              </p>
            </motion.div>
          </Link>

          {/* Desktop Menu - Enhanced */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="group relative"
                >
                  <div
                    className={`px-5 py-3 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-2 ${
                      location.pathname === item.path
                        ? isScrolled
                          ? "text-accent bg-accent/10"
                          : "text-accent bg-white/10"
                        : isScrolled
                        ? "text-foreground hover:text-accent hover:bg-accent/5"
                        : "text-white hover:text-accent hover:bg-white/5"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </div>
                  {/* Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8 ${
                      location.pathname === item.path ? "w-3/4 left-1/8" : ""
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={`${
                isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
              } transition-colors`}
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/book">Book Fitting</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden z-50 p-2 rounded-lg transition-all duration-300 ${
              isMobileMenuOpen
                ? "bg-accent text-white"
                : isScrolled
                ? "text-foreground hover:bg-accent/10"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 bg-gradient-to-br from-primary via-primary to-black z-40 lg:hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center justify-center h-full space-y-8 px-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-center py-4 px-6 text-2xl font-display transition-all duration-300 rounded-lg ${
                      location.pathname === item.path
                        ? "text-accent bg-white/10 border-2 border-accent"
                        : "text-white hover:text-accent hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {item.icon && <item.icon className="h-6 w-6" />}
                      {item.label}
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 shadow-xl"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
