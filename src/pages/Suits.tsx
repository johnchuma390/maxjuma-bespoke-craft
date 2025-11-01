import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import suitsData from "@/data/suits.json";

type Suit = {
  id: string;
  name: string;
  fit: string;
  piece: string;
  color: string;
  fabric: string;
  image: string;
  description: string;
  tags?: string[];
};

const Suits = () => {
  const suits = suitsData as Suit[]; // load directly from JSON
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
            {suits.map((suit) => (
              <article
                key={suit.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={suit.image}
                    alt={`${suit.name} bespoke suit`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">{suit.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {suit.piece} • {suit.fit} • {suit.fabric}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{suit.description}</p>
                  {suit.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {suit.tags.map((t) => (
                        <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
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
