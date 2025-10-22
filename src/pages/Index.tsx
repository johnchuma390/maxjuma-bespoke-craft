import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ProductCarousel from "@/components/ProductCarousel";
import FabricShowcase from "@/components/FabricShowcase";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <IntroSection />
        <ProductCarousel />
        <FabricShowcase />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
