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
import { Link } from "react-router-dom";
import settingsData from "@/data/settings.json";

const BookContact = () => {
  const { toast } = useToast();
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
    const savedSettings = localStorage.getItem('maxjuma-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check for selected items from lookbook/fabrics
    const selectedDesign = sessionStorage.getItem('selected-design');
    const selectedFabric = sessionStorage.getItem('selected-fabric');
    
    if (selectedDesign) {
      setFormData(prev => ({ ...prev, selectedSuit: selectedDesign }));
    }
    if (selectedFabric) {
      setFormData(prev => ({ ...prev, selectedFabric: selectedFabric }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp message
    let message = `*New Fitting Request from MaxJuma Website*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    if (formData.email) message += `*Email:* ${formData.email}\n`;
    message += `*Preferred Date:* ${formData.preferredDate}\n`;
    message += `*Preferred Time:* ${formData.preferredTime}\n`;
    message += `*Fitting Type:* ${formData.fitType === 'in-store' ? 'In-Store' : 'Virtual'}\n`;
    
    if (formData.selectedSuit) {
      message += `*Selected Design:* ${formData.selectedSuit}\n`;
    }
    if (formData.selectedFabric) {
      message += `*Selected Fabric:* ${formData.selectedFabric}\n`;
    }
    if (formData.message) {
      message += `\n*Additional Notes:*\n${formData.message}`;
    }

    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your booking details...",
    });

    // Clear form
    setFormData({
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
    sessionStorage.removeItem('selected-design');
    sessionStorage.removeItem('selected-fabric');
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
                      <div className="p-4 bg-accent/10 rounded-lg space-y-2">
                        <p className="font-semibold text-sm text-accent">Your Selections:</p>
                        {formData.selectedSuit && (
                          <p className="text-sm">Design: {formData.selectedSuit}</p>
                        )}
                        {formData.selectedFabric && (
                          <p className="text-sm">Fabric: {formData.selectedFabric}</p>
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
                      className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
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
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be embedded here</p>
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
                    className="w-full bg-white text-accent hover:bg-white/90"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
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
