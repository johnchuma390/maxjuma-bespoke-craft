import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import fabricsData from "@/data/fabrics.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Fabric = {
  id: string;
  name: string;
  category: string;
  origin: string;
  weight: string;
  image: string;
  description: string;
  bestFor?: string[];
  features?: string[];
};

const Fabrics = () => {
  const [fabrics, setFabrics] = useState<Fabric[]>(fabricsData as Fabric[]);

  useEffect(() => {
    const saved = localStorage.getItem("maxjuma-fabrics");
    if (saved) setFabrics(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.45em] text-accent">Premium Cloth Library</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Luxury Fabrics</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Curated cloths that suit Kenya’s climate—ready for your next commission.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {fabrics.map((fabric) => (
              <article key={fabric.id} className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img
                    src={fabric.image}
                    alt={`${fabric.name} fabric`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">{fabric.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {fabric.category} • {fabric.origin} • {fabric.weight}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground">{fabric.description}</p>

                  {fabric.features && fabric.features.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Key Features</h4>
                      <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        {fabric.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {fabric.bestFor && fabric.bestFor.length > 0 && (
                    <div className="mt-5 space-y-2">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        {fabric.bestFor.map((b) => (
                          <span key={b} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-6 border-t border-border">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link to="/book">Select This Fabric</Link>
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

export default Fabrics;
