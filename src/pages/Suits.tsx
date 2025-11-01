import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import suitsData from "@/data/suits.json";
import { resolveImageUrl } from "@/lib/images";

const Suits = () => {
  const [suits, setSuits] = useState<any[]>(suitsData as any[]);

  useEffect(() => {
    const savedSuits = localStorage.getItem("maxjuma-suits");
    if (savedSuits) {
      setSuits(JSON.parse(savedSuits));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.45em] text-accent">Signature Collection</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Bespoke Suits</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Made-to-measure pieces tailored in Nairobi—built to your silhouette and style.
          </p>
        </div>
      </section>

      {/* Suits Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suits.map((suit, idx) => (
              <article key={suit.id ?? idx} className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-[4/5] w-full bg-muted">
                  <img
                    src={resolveImageUrl(suit.image)}
                    alt={suit.name ?? "Bespoke suit"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">
                    {suit.name ?? "Custom Suit"}
                  </h3>
                  {suit.description && (
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {suit.description}
                    </p>
                  )}

                  {/* No price tag */}
                  <div className="pt-4 mt-6 border-t border-border">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link to="/book">Book Fitting</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Suits;
