import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import lookbookData from "@/data/lookbook.json";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type RawLookbookItem = {
  title: string;
  group: string;
  occasions?: string[];
  event?: string;
  piece: string;
  gender?: string;
  style: string;
  color?: string;
  priceRange: string;
  material?: string;
  sizes?: string[];
  image: string;
  summary?: string;
  description: string;
};

type LookbookItem = {
  title: string;
  group: string;
  occasions: string[];
  piece: string;
  style: string;
  material: string;
  priceRange: string;
  image: string;
  summary: string;
  description: string;
};

const OCCASION_FILTERS = [
  { label: "All", value: "All" },
  { label: "Business", value: "Business" },
  { label: "Wedding", value: "Wedding" },
  { label: "Traditional Ceremonies", value: "Traditional" },
  { label: "Formal", value: "Formal" },
  { label: "Casual", value: "Casual" },
];

const GROUP_FILTERS = ["All", "Women", "Men", "Kids"];

const displayOccasionLabel = (value: string | undefined) => {
  if (!value) return "Occasion";
  const match = OCCASION_FILTERS.find((item) => item.value === value);
  return match?.label ?? value;
};

const normalizeItem = (item: RawLookbookItem): LookbookItem => {
  const occasions = item.occasions?.length
    ? item.occasions
    : item.event
    ? [item.event]
    : [];

  const primaryOccasion = occasions[0] ?? "Formal";
  const summary =
    item.summary ??
    `${item.group} · ${displayOccasionLabel(primaryOccasion)} · ${item.piece}`;

  return {
    title: item.title,
    group: item.group,
    occasions,
    piece: item.piece,
    style: item.style,
    material: item.material ?? "Custom Fabric",
    priceRange: item.priceRange,
    image: item.image,
    summary,
    description: item.description,
  };
};

const initialItems = (lookbookData as RawLookbookItem[]).map(normalizeItem);

const Lookbook = () => {
  const [items, setItems] = useState<LookbookItem[]>(initialItems);
  const [filteredItems, setFilteredItems] = useState<LookbookItem[]>(initialItems);
  const [groupFilter, setGroupFilter] = useState("All");
  const [occasionFilter, setOccasionFilter] = useState("All");
  const [pieceFilter, setPieceFilter] = useState("All");
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxContainerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const programmaticScrollRef = useRef(false);

  const isLightboxOpen = lightboxIndex !== null;

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const slide = slideRefs.current[index];
    if (!slide) return;
    programmaticScrollRef.current = true;
    slide.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, behavior === "auto" ? 80 : 380);
  }, []);

  const goToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      if (!filteredItems.length) return;
      const total = filteredItems.length;
      const nextIndex = ((index % total) + total) % total;
      setLightboxIndex(nextIndex);
      setActiveCard(filteredItems[nextIndex]?.title ?? null);
      requestAnimationFrame(() => scrollToIndex(nextIndex, behavior));
    },
    [filteredItems, scrollToIndex]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setActiveCard(null);
  }, []);

  const showNext = useCallback(() => {
    if (!filteredItems.length) return;
    const current = lightboxIndex ?? -1;
    goToIndex(current + 1);
  }, [filteredItems.length, goToIndex, lightboxIndex]);

  const showPrev = useCallback(() => {
    if (!filteredItems.length) return;
    const current = lightboxIndex ?? filteredItems.length;
    goToIndex(current - 1);
  }, [filteredItems.length, goToIndex, lightboxIndex]);

  const openLightbox = useCallback(
    (index: number) => {
      goToIndex(index, "auto");
    },
    [goToIndex]
  );

  const handleCardBlur = () => setActiveCard(null);

  useEffect(() => {
    const savedLookbook = localStorage.getItem("maxjuma-lookbook");
    if (!savedLookbook) return;

    try {
      const parsed = (JSON.parse(savedLookbook) as RawLookbookItem[]).map(normalizeItem);
      setItems(parsed);
      setFilteredItems(parsed);
    } catch (error) {
      console.warn("Failed to parse saved lookbook data:", error);
    }
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesGroup = groupFilter === "All" || item.group === groupFilter;
      const matchesOccasion =
        occasionFilter === "All" || item.occasions.some((occasion) => occasion === occasionFilter);
      const matchesPiece = pieceFilter === "All" || item.piece === pieceFilter;

      return matchesGroup && matchesOccasion && matchesPiece;
    });

    setFilteredItems(filtered);
  }, [groupFilter, occasionFilter, pieceFilter, items]);

  const pieceOptions = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.piece)));
    return ["All", ...unique.sort()];
  }, [items]);

  useEffect(() => {
    if (!isLightboxOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (!filteredItems.length) {
      closeLightbox();
      return;
    }
    if (lightboxIndex > filteredItems.length - 1) {
      goToIndex(filteredItems.length - 1, "auto");
      return;
    }
    setActiveCard(filteredItems[lightboxIndex]?.title ?? null);
    requestAnimationFrame(() => scrollToIndex(lightboxIndex, "auto"));
  }, [filteredItems, lightboxIndex, closeLightbox, goToIndex, scrollToIndex]);

  const handleLightboxScroll = () => {
    if (programmaticScrollRef.current) return;
    const container = lightboxContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    if (!width) return;

    const newIndex = Math.round(container.scrollLeft / width);
    if (newIndex !== lightboxIndex) {
      setLightboxIndex(newIndex);
      setActiveCard(filteredItems[newIndex]?.title ?? null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-wider">LOOKBOOK</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tailored looks for every moment—from boardrooms to weddings and cultural celebrations.
            </p>
            <p className="text-accent text-lg font-medium">#custom #bespoke #Nairobi</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-secondary/20 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Group</span>
              <select
                value={groupFilter}
                onChange={(event) => setGroupFilter(event.target.value)}
                className="h-11 rounded-full border border-border bg-background/80 px-4 text-sm font-medium text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {GROUP_FILTERS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Occasion</span>
              <select
                value={occasionFilter}
                onChange={(event) => setOccasionFilter(event.target.value)}
                className="h-11 rounded-full border border-border bg-background/80 px-4 text-sm font-medium text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {OCCASION_FILTERS.map((occasion) => (
                  <option key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Piece</span>
              <select
                value={pieceFilter}
                onChange={(event) => setPieceFilter(event.target.value)}
                className="h-11 rounded-full border border-border bg-background/80 px-4 text-sm font-medium text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {pieceOptions.map((piece) => (
                  <option key={piece} value={piece}>
                    {piece}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length} looks
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 space-y-4"
            >
              <h3 className="text-2xl font-semibold text-foreground">No looks match those filters.</h3>
              <p className="text-muted-foreground">Try another combination or reset everything.</p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setGroupFilter("All");
                  setOccasionFilter("All");
                  setPieceFilter("All");
                }}
              >
                Reset filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredItems.map((item, index) => {
                const primaryOccasion = item.occasions[0];
                const occasionLabel = displayOccasionLabel(primaryOccasion);
                const metaLine = `${item.group} · ${occasionLabel} · ${item.piece}`;
                const shortCopy =
                  item.description.length > 110
                    ? `${item.description.slice(0, 107)}…`
                    : item.description;

                const bookingLink = `/book?${new URLSearchParams({
                  piece: item.piece,
                  style: item.style,
                  fabric: item.material,
                  details: `${item.title} (${metaLine})`,
                }).toString()}`;

                const isActive = activeCard === item.title;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openLightbox(index);
                        }
                      }}
                      onBlur={handleCardBlur}
                      onMouseEnter={() => setActiveCard(item.title)}
                      onMouseLeave={handleCardBlur}
                      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/80 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent/60"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div
                          className={cn(
                            "absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/60 to-black/0 px-4 py-3 text-white opacity-0 transition-opacity duration-300",
                            "group-hover:opacity-100",
                            isActive && "opacity-100"
                          )}
                        >
                          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.25em]">
                            <Badge className="rounded-full bg-primary/20 px-3 py-1 text-white/90">
                              {item.group}
                            </Badge>
                            <Badge className="rounded-full bg-accent px-3 py-1 text-white">
                              {occasionLabel}
                            </Badge>
                            <Badge className="rounded-full bg-white/20 px-3 py-1 text-white/80">
                              {item.piece}
                            </Badge>
                          </div>

                          <div className="space-y-2 bg-black/55 backdrop-blur-sm rounded-2xl p-4">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                              {metaLine}
                            </p>
                            <p className="text-sm text-white/80">{shortCopy}</p>
                            <div className="flex items-center justify-center border-t border-white/10 pt-3">
                              <Button
                                asChild
                                size="sm"
                                className="rounded-full bg-accent px-4 py-2 text-white hover:bg-accent/90"
                              >
                                <Link to={bookingLink}>Book this {item.piece.toLowerCase()}</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Partner with MaxJuma</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your vision and we will tailor the next signature piece to match your occasion.
            </p>
            <Button asChild size="lg" className="rounded-full bg-accent px-8 py-3 text-white hover:bg-accent/90">
              <Link to="/book">Start your fitting</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            key="lookbook-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[75] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 z-[75] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Previous look"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 z-[75] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Next look"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex h-full w-full items-center justify-center px-0 sm:px-6 lg:px-12">
              <div className="relative h-full w-full max-w-6xl">
                <div
                  ref={lightboxContainerRef}
                  onScroll={handleLightboxScroll}
                  className="flex h-full w-full snap-x snap-mandatory touch-pan-y overflow-x-auto scroll-smooth"
                >
                  {filteredItems.map((item, index) => {
                    const primaryOccasion = item.occasions[0];
                    const occasionLabel = displayOccasionLabel(primaryOccasion);
                    const metaLine = `${item.group} · ${occasionLabel} · ${item.piece}`;

                    const bookingLink = `/book?${new URLSearchParams({
                      piece: item.piece,
                      style: item.style,
                      fabric: item.material,
                      details: `${item.title} (${metaLine})`,
                    }).toString()}`;

                    return (
                      <div
                        key={`${item.title}-lightbox`}
                        ref={(element) => (slideRefs.current[index] = element)}
                        className="min-w-full snap-center"
                      >
                        <div className="flex h-full flex-col gap-6 px-4 py-12 md:flex-row md:gap-10 md:px-10">
                          <div className="relative w-full md:w-2/3">
                            <div className="aspect-[3/4] md:aspect-[3/2] w-full overflow-hidden rounded-3xl bg-black">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>

                          <div className="flex w-full flex-col justify-between space-y-6 rounded-3xl bg-white/5 p-6 text-white md:w-1/3">
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em]">
                                <Badge className="rounded-full bg-primary/20 px-3 py-1 text-white/90">
                                  {item.group}
                                </Badge>
                                <Badge className="rounded-full bg-accent px-3 py-1 text-white">
                                  {occasionLabel}
                                </Badge>
                                <Badge className="rounded-full bg-white/20 px-3 py-1 text-white/80">
                                  {item.piece}
                                </Badge>
                              </div>

                              <div className="space-y-3">
                                <h3 className="text-2xl font-semibold">{item.title}</h3>
                                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                                  {metaLine}
                                </p>
                                <p className="text-sm text-white/80">{item.description}</p>
                              </div>

                              <div className="space-y-2 text-sm text-white/70">
                                <p>
                                  <span className="font-semibold text-white">Style:</span> {item.style}
                                </p>
                                <p>
                                  <span className="font-semibold text-white">Fabric:</span> {item.material}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-center border-t border-white/10 pt-4">
                              <Button
                                asChild
                                size="lg"
                                className="rounded-full bg-accent px-6 py-2 text-white hover:bg-accent/90"
                              >
                                <Link to={bookingLink}>Book this {item.piece.toLowerCase()}</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lookbook;
