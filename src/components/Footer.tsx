import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from "lucide-react";

const WhatsappIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.7L1 31l7.4-1.5A15.3 15.3 0 0 0 16 31.5c8.6 0 15.5-7 15.5-15.5S24.6.5 16 .5Zm0 28.2c-2.6 0-5.1-.7-7.3-2l-.5-.3-4.4.9.9-4.3-.3-.6A12.7 12.7 0 0 1 3.3 16C3.3 8.7 8.7 3.3 16 3.3S28.7 8.7 28.7 16 23.3 28.7 16 28.7Zm7.3-9.7c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.4-2.3-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.4-.9-.7-.7-1-.7l-.8-.1c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.3 0 2 1.4 3.9 1.6 4.1.2.3 2.9 4.3 6.9 6.1 4 1.7 4 1.2 4.8 1.1.7-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z"
    />
  </svg>
);

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Our Suits", path: "/suits" },
  { label: "Premium Fabrics", path: "/fabrics" },
  { label: "Lookbook", path: "/lookbook" },
  { label: "About Us", path: "/about" },
  { label: "Book Fitting", path: "/book" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold tracking-wider">MAXJUMA</h3>
            <p className="text-white/80 leading-relaxed">
              Crafting custom suits and tuxedos that are luxurious, cost-efficient,
              and sustainable. Hand-made in Nairobi.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center transition-transform hover:scale-105"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center transition-transform hover:scale-105"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/254748215758"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center transition-transform hover:scale-105"
              >
                <WhatsappIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
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

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Get in Touch</h4>
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
                <a
                  href="tel:+254748215758"
                  className="hover:text-accent transition-colors"
                >
                  +254 748 215758
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:merceljuma1@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  merceljuma1@gmail.com
                </a>
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

          <div className="space-y-4 text-white/80">
            <h4 className="text-lg font-bold mb-6 text-accent">Connect</h4>
            <p>
              Reach us on WhatsApp or call the same line for bespoke
              consultations.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-accent/90"
            >
              Book a Fitting
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-white/60">
            <p>© 2024 MaxJuma Bespoke Tailors. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link
                to="/about"
                className="hover:text-accent transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/book"
                className="hover:text-accent transition-colors"
              >
                Book Fitting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
