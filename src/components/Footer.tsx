import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About", path: "/why-maxjuma" },
    { label: "How it Works", path: "/why-maxjuma" },
    { label: "Fit Guarantee", path: "/why-maxjuma" },
    { label: "Philosophy", path: "/why-maxjuma" },
    { label: "FAQs", path: "/contact" },
  ];

  const shopLinks = [
    { label: "Suits", path: "/suits" },
    { label: "Tuxedos", path: "/suits?category=tuxedos" },
    { label: "Fabrics", path: "/fabrics" },
    { label: "Gallery", path: "/gallery" },
    { label: "Gift Cards", path: "/contact" },
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-wider">MAXJUMA</h3>
            <p className="text-white/80 leading-relaxed">
              Crafting custom suits & tuxedos that are luxurious, cost-efficient
              and sustainable. Hand-made in Nairobi.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">About Us</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Visit Us</h4>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span>
                  Opposite Jeevanjee Gardens
                  <br />
                  Nairobi, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span>
                  Mon–Sat: 9:00–19:00
                  <br />
                  Sunday: Closed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-white/60">
            <p>© 2024 MaxJuma Bespoke Tailors. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/contact" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
