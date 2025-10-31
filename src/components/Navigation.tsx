import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsappIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.7L1 31l7.4-1.5A15.3 15.3 0 0 0 16 31.5c8.6 0 15.5-7 15.5-15.5S24.6.5 16 .5Zm0 28.2c-2.6 0-5.1-.7-7.3-2l-.5-.3-4.4.9.9-4.3-.3-.6A12.7 12.7 0 0 1 3.3 16C3.3 8.7 8.7 3.3 16 3.3S28.7 8.7 28.7 16 23.3 28.7 16 28.7Zm7.3-9.7c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.4-2.3-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.4-.9-.7-.7-1-.7l-.8-.1c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.3 0 2 1.4 3.9 1.6 4.1.2.3 2.9 4.3 6.9 6.1 4 1.7 4 1.2 4.8 1.1.7-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z" />
  </svg>
);

const highlightColor = "#F5D77B";
const navBackground = "#12223A";

const logoSrc = "https://i.postimg.cc/9fWHQBhs/Whats-App-Image-2025-10-31-at-21-41-21-f7b5400c.jpg";

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappNumber = "+254 748 215758";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  const menuItems = [
    { label: "Our Suits", path: "/suits" },
    { label: "Premium Fabrics", path: "/fabrics" },
    { label: "Lookbook", path: "/lookbook" },
    { label: "Blog", path: "/blog" },
    { label: "About Us", path: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden md:block bg-[#08111D] text-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-xs uppercase tracking-[0.35em]">
          <div className="flex items-center gap-3 text-white/80">
            <PhoneCall className="h-3.5 w-3.5" style={{ color: highlightColor }} />
            <span>Garden Chambers · Opposite Jeevanjee Gardens</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${whatsappNumber}`} className="transition hover:text-[rgb(245,215,123)]">
              {whatsappNumber}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-[rgb(245,215,123)]"
            >
              <WhatsappIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`border-b border-white/10 bg-[#12223A] text-white transition-colors duration-500 ${
          isScrolled ? "shadow-xl" : "shadow-md"
        }`}
        style={{ backgroundColor: navBackground }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 p-2 ring-2 ring-white/30">
              <img
                src={logoSrc}
                alt="MaxJuma Tailors logo"
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white">
                MAXJUMA
              </span>
              <span className="text-[10px] tracking-[0.45em]" style={{ color: highlightColor }}>
                BESPOKE TAILORS
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "text-[rgb(245,215,123)]"
                      : "text-white/75 hover:text-[rgb(245,215,123)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-[#25D366] px-5 py-2 font-semibold text-white hover:bg-[#1DA851] shadow-md"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="mr-2 h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[rgb(245,215,123)] px-5 py-2 font-semibold text-[#0B141E] hover:bg-[rgb(232,200,104)]"
            >
              <Link to="/book">
                <Calendar className="mr-2 h-4 w-4" />
                Book Fitting
              </Link>
            </Button>
          </div>

          <button
            className="flex items-center justify-center rounded-full border border-white/20 p-2.5 text-white hover:text-[rgb(245,215,123)] focus:outline-none focus:ring-2 focus:ring-[rgb(245,215,123)] focus:ring-offset-2 focus:ring-offset-[#0F1B2B] md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
          >
            <div className="absolute inset-0" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute top-4 left-4 right-4 rounded-3xl bg-[#0E1B2E] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 p-1.5 ring-2 ring-white/20">
                    <img
                      src={logoSrc}
                      alt="MaxJuma Tailors logo"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold tracking-[0.3em] text-white">
                      MAXJUMA
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                      Bespoke Tailors
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border border-white/20 p-2 text-white/60 hover:text-[rgb(245,215,123)] focus:outline-none focus:ring-2 focus:ring-[rgb(245,215,123)]"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-base font-semibold transition ${
                        isActive
                          ? "border-[rgb(245,215,123)] bg-white/10 text-[rgb(245,215,123)]"
                          : "border-white/10 text-white hover:border-white/30 hover:text-[rgb(245,215,123)]"
                      }`}
                    >
                      {item.label}
                      <motion.span
                        animate={{ x: isActive ? 8 : 0 }}
                        className="text-sm text-white/50"
                      >
                        →
                      </motion.span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  asChild
                  className="w-full rounded-2xl bg-[#25D366] py-6 text-base font-semibold text-white hover:bg-[#1DA851]"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl border-white/30 py-6 text-base font-semibold text-white hover:border-[rgb(245,215,123)] hover:text-[rgb(245,215,123)]"
                >
                  <Link to="/book">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Fitting
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
                <span>Garden Chambers · Nairobi CBD</span>
                <a href={`tel:${whatsappNumber}`} className="hover:text-[rgb(245,215,123)]">
                  {whatsappNumber}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
