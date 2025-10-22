import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const whatsappUrl = "https://wa.me/254700000000?text=Hello%20MaxJuma,%20I'm%20interested%20in%20booking%20a%20fitting";

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
              Get In Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Visit our atelier, call us, or send a message. We're here to craft
              your perfect suit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Visit Our Atelier
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Opposite Jeevanjee Gardens
                        <br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a
                        href="tel:+254700000000"
                        className="text-accent hover:underline"
                      >
                        +254 700 000 000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:info@maxjuma.com"
                        className="text-accent hover:underline"
                      >
                        info@maxjuma.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Monday – Saturday: 9:00 – 19:00
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90"
                  asChild
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Message on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Map & Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Find Us
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="w-12 h-12 text-accent mx-auto" />
                    <p className="text-muted-foreground">
                      Map integration available
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-primary text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-1">How long does it take?</h4>
                    <p className="text-white/80 text-sm">
                      Standard delivery is 4-6 weeks. Expedited service available
                      in 7-15 days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Do you ship internationally?</h4>
                    <p className="text-white/80 text-sm">
                      Yes, we ship worldwide with full tracking and insurance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">What if it doesn't fit?</h4>
                    <p className="text-white/80 text-sm">
                      Free alterations and remakes within 180 days. 100%
                      guaranteed.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="/why-maxjuma">Learn More</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
