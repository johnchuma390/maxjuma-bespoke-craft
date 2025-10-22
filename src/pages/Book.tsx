import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Video, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Book = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    location: "in-store",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Appointment Requested!",
      description: "We'll confirm your fitting appointment within 24 hours",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-secondary">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 shadow-2xl max-w-2xl mx-4 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Appointment Requested!
            </h2>
            <p className="text-lg text-muted-foreground">
              Thank you, {formData.name}! We've received your fitting request for{" "}
              {formData.date} at {formData.time}.
            </p>
            <p className="text-muted-foreground">
              Our team will contact you at <strong>{formData.phone}</strong> within
              24 hours to confirm your appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
              >
                Book Another
              </Button>
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <a href="/">Return Home</a>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

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
              Book Your Fitting
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Start your bespoke journey. Choose between in-store or virtual
              consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone / WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Appointment Type *</Label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="in-store">In-Store (Nairobi)</option>
                    <option value="virtual">Virtual Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us about your style preferences, occasion, or any special requirements..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Request Appointment
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      In-Store Fitting
                    </h3>
                    <p className="text-muted-foreground">
                      Visit our Nairobi atelier opposite Jeevanjee Gardens.
                      Experience our fabric collection firsthand and meet our
                      master tailors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Virtual Consultation
                    </h3>
                    <p className="text-muted-foreground">
                      Can't visit in person? We offer video consultations with
                      guided self-measurement. Our AI assists with fit
                      predictions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      What to Expect
                    </h3>
                    <p className="text-muted-foreground">
                      Your fitting takes 45-60 minutes. We'll discuss style,
                      take measurements, select fabrics, and design your perfect
                      suit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Delivery Timeline</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Standard delivery: 4-6 weeks</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Expedited service: 7-15 days*</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent text-xl">•</span>
                    <span>Free alterations within 180 days</span>
                  </li>
                </ul>
                <p className="text-sm text-white/70 mt-4">
                  *Additional fees apply for expedited service
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
