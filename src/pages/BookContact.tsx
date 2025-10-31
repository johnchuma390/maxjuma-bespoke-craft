import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import settingsData from "@/data/settings.json";

type PrefillMeta = {
  piece?: string;
  style?: string;
  fabric?: string;
  details?: string;
  title?: string;
};

const WhatsappIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
    <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2.1 7.7L1 31l7.4-1.5A15.3 15.3 0 0 0 16 31.5c8.6 0 15.5-7 15.5-15.5S24.6.5 16 .5Zm0 28.2c-2.6 0-5.1-.7-7.3-2l-.5-.3-4.4.9.9-4.3-.3-.6A12.7 12.7 0 0 1 3.3 16C3.3 8.7 8.7 3.3 16 3.3S28.7 8.7 28.7 16 23.3 28.7 16 28.7Zm7.3-9.7c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.7-.2-1 .2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.4-2.3-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.4-.9-.7-.7-1-.7l-.8-.1c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.3 0 2 1.4 3.9 1.6 4.1.2.3 2.9 4.3 6.9 6.1 4 1.7 4 1.2 4.8 1.1.7-.1 2.3-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z" />
  </svg>
);

const BookContact = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [prefillMeta, setPrefillMeta] = useState<PrefillMeta | null>(null);
  const [settings, setSettings] = useState(settingsData);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    selectedSuit: "",
    selectedFabric: "",
    message: "",
    fitType: "in-store"
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("maxjuma-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const selectedDesign = sessionStorage.getItem("selected-design");
    const selectedFabric = sessionStorage.getItem("selected-fabric");

    if (selectedDesign) {
      setFormData((prev) => ({ ...prev, selectedSuit: selectedDesign }));
    }
    if (selectedFabric) {
      setFormData((prev) => ({ ...prev, selectedFabric }));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const piece = params.get("piece") ?? "";
    const style = params.get("style") ?? "";
    const fabric = params.get("fabric") ?? "";
    const details = params.get("details") ?? params.get("item") ?? "";

    if (piece || style || fabric || details) {
      const displayTitle =
        details || [piece, style].filter(Boolean).join(" · ") || piece;

      setPrefillMeta({
        piece: piece || undefined,
        style: style || undefined,
        fabric: fabric || undefined,
        details: details || undefined,
        title: displayTitle || undefined,
      });

      setFormData((prev) => ({
        ...prev,
        selectedSuit: displayTitle || prev.selectedSuit,
        selectedFabric: fabric || prev.selectedFabric,
      }));

      if (displayTitle) {
        sessionStorage.setItem("selected-design", displayTitle);
      }
      if (fabric) {
        sessionStorage.setItem("selected-fabric", fabric);
      }
    } else {
      setPrefillMeta(null);
    }
  }, [location.search, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `*New Fitting Request from MaxJuma Website*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    if (formData.email) message += `*Email:* ${formData.email}\n`;
    message += `*Preferred Date:* ${formData.preferredDate}\n`;
    message += `*Preferred Time:* ${formData.preferredTime}\n`;
    message += `*Fitting Type:* ${formData.fitType === "in-store" ? "In-Store" : "Virtual"}\n`;

    if (formData.selectedSuit) {
      message += `*Selected Design:* ${formData.selectedSuit}\n`;
    }
    if (prefillMeta?.style && !formData.message.includes(prefillMeta.style)) {
      message += `*Style Inspiration:* ${prefillMeta.style}\n`;
    }
    if (formData.selectedFabric) {
      message += `*Selected Fabric:* ${formData.selectedFabric}\n`;
    } else if (prefillMeta?.fabric) {
      message += `*Fabric Idea:* ${prefillMeta.fabric}\n`;
    }
    if (prefillMeta?.details && prefillMeta.details !== formData.selectedSuit) {
      message += `*Lookbook Reference:* ${prefillMeta.details}\n`;
    }
    if (formData.message) {
      message += `\n*Additional Notes:*\n${formData.message}`;
    }

    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your booking details...",
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      selectedSuit: "",
      selectedFabric: "",
      message: "",
      fitType: "in-store",
    });
    setPrefillMeta(null);
    sessionStorage.removeItem("selected-design");
    sessionStorage.removeItem("selected-fabric");
  };

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
              BOOK YOUR FITTING
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Begin your bespoke journey. Schedule a consultation with our master tailors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Schedule Your Fitting</CardTitle>
                  <p className="text-muted-foreground">
                    Fill in your details and we'll confirm your appointment via WhatsApp
                  </p>
                </CardHeader>
                <CardContent>
                  {prefillMeta && (
                    <div className="mb-6 rounded-2xl border border-accent/30 bg-muted/40 p-4 text-sm text-foreground">
                      <p className="font-semibold text-accent">Lookbook selection captured</p>
                      {prefillMeta.title && <p className="text-muted-foreground">Design: {prefillMeta.title}</p>}
                      {prefillMeta.style && <p className="text-muted-foreground">Style: {prefillMeta.style}</p>}
                      {prefillMeta.fabric && <p className="text-muted-foreground">Fabric: {prefillMeta.fabric}</p>}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="+254 700 000 000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fitType">Fitting Type *</Label>
                      <select
                        id="fitType"
                        value={formData.fitType}
                        onChange={(e) => setFormData({ ...formData, fitType: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        required
                      >
                        <option value="in-store">In-Store Fitting</option>
                        <option value="virtual">Virtual Consultation</option>
                      </select>
                    </div>

                    {/* Selection Summary */}
                    {(formData.selectedSuit || formData.selectedFabric) && (
                      <div className="rounded-xl bg-muted/40 p-4 space-y-2">
                        <p className="font-semibold text-sm text-foreground">Your selections</p>
                        {formData.selectedSuit && (
                          <p className="text-sm text-muted-foreground">Design: {formData.selectedSuit}</p>
                        )}
                        {prefillMeta?.piece && (
                          <p className="text-sm text-muted-foreground">Piece: {prefillMeta.piece}</p>
                        )}
                        {prefillMeta?.style && (
                          <p className="text-sm text-muted-foreground">Style: {prefillMeta.style}</p>
                        )}
                        {formData.selectedFabric && (
                          <p className="text-sm text-muted-foreground">Fabric: {formData.selectedFabric}</p>
                        )}
                      </div>
                    )}

                    {/* Quick Selection Links */}
                    <div className="p-4 bg-secondary rounded-lg space-y-3">
                      <p className="text-sm font-medium">Haven't selected yet?</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link to="/lookbook">Browse Lookbook</Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link to="/fabrics">Choose Fabric</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Notes</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any special requests or questions..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-6 text-lg shadow-lg transition-all"
                    >
                      <WhatsappIcon className="mr-2 h-5 w-5" />
                      Send Booking via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Visit Our Atelier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                      <a 
                        href={`tel:${settings.phone}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a 
                        href={`mailto:${settings.email}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-muted-foreground">{settings.hours}</p>
                      <p className="text-sm text-muted-foreground mt-1">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      title="Garden Chambers Nairobi"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.859290668671!2d36.818495976315496!3d-1.2835153356227414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10db0fefd4d9%3A0xbbdd4ba120fa5f31!2sGarden%20Chambers%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1730397865000!5m2!1sen!2ske"
                      width="600"
                      height="450"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick WhatsApp Button */}
              <Card className="bg-accent text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Need Immediate Assistance?</h3>
                  <p className="mb-4 text-white/90">
                    Chat with us directly on WhatsApp for quick questions or urgent bookings.
                  </p>
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white shadow-lg transition-all"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon className="mr-2 h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookContact;
