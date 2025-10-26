import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Clock, Heart, Users, Sparkles, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "10+", icon: Award },
    { label: "Happy Clients", value: "5000+", icon: Users },
    { label: "Custom Suits Made", value: "8000+", icon: Sparkles },
    { label: "Customer Satisfaction", value: "98%", icon: TrendingUp },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Craft",
      description: "Every stitch, every cut, every detail is executed with unwavering dedication to the art of bespoke tailoring.",
    },
    {
      icon: Award,
      title: "Uncompromising Quality",
      description: "We source only the finest fabrics from prestigious mills around the world and employ master tailors with decades of experience.",
    },
    {
      icon: Users,
      title: "Client-Centered Approach",
      description: "Your vision, preferences, and satisfaction are at the heart of everything we do. We listen, we understand, we deliver.",
    },
    {
      icon: Clock,
      title: "Timeless Elegance",
      description: "We create suits that transcend trends—pieces that will make you look and feel exceptional for years to come.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-black" />
        <div className="absolute inset-0 bg-[url('/src/assets/artisan-hands.jpg')] bg-cover bg-center opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            About MaxJuma
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            Crafting Excellence in Bespoke Tailoring Since 2014
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Located opposite the iconic Jeevanjee Gardens in the heart of Nairobi, MaxJuma Bespoke Tailors has been redefining luxury menswear since 2014. What began as a small atelier with a passion for perfect fits has grown into Kenya's premier destination for custom suits and formal wear.
                </p>
                <p>
                  We believe that every man deserves a suit that not only fits perfectly but tells his unique story. Our master tailors combine traditional craftsmanship with cutting-edge AI-assisted measurements to deliver unparalleled precision and style.
                </p>
                <p>
                  From weddings to boardrooms, from cultural celebrations to red carpet events, MaxJuma has dressed Kenya's finest. Our commitment to excellence, sustainable practices, and personalized service has made us the trusted choice for discerning gentlemen across East Africa.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg overflow-hidden">
                <img
                  src="/src/assets/artisan-hands.jpg"
                  alt="Master Tailor at Work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-lg shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/80 text-sm lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision, every stitch, and every client interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-colors group"
              >
                <value.icon className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Experience MaxJuma?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Visit our atelier opposite Jeevanjee Gardens or book a consultation today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg shadow-xl inline-block"
              >
                Book Your Fitting
              </motion.a>
              <motion.a
                href="/lookbook"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg border-2 border-white/30 inline-block"
              >
                View Lookbook
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
