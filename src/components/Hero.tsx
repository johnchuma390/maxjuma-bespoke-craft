import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import heroImage from "@/assets/hero-suit.jpg";

type HeroCta = {
  label: string;
  to: string;
  external?: boolean;
  variant?: "accent" | "outline";
};

type HeroPreset = {
  eyebrow: string;
  heading: string;
  highlight?: string;
  subheading: string;
  image: string;
  imageAlt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

const defaultPreset: HeroPreset = {
  eyebrow: "New-Age Luxury",
  heading: "Custom Suits",
  highlight: "Tailored to Your Shape",
  subheading: "Hand-measured fittings and master tailoring from Garden Chambers, Nairobi.",
  image: heroImage,
  imageAlt: "Black gentleman in a bespoke suit adjusting his cufflinks.",
  primaryCta: { label: "Book Your Fitting", to: "/book", variant: "accent" },
  secondaryCta: { label: "View Lookbook", to: "/lookbook", variant: "outline" }
};

const heroPresets: { matcher: RegExp; preset: HeroPreset }[] = [];

const resolvePreset = (pathname: string): HeroPreset => {
  const match = heroPresets.find(({ matcher }) => matcher.test(pathname));
  return match?.preset ?? defaultPreset;
};

const Hero = () => {
  const { pathname } = useLocation();
  const preset = resolvePreset(pathname);

  const renderCta = (cta: HeroCta, emphasize = false) => {
    const isOutline = cta.variant === "outline";
    const baseClasses = isOutline
      ? "border-white/70 bg-white/10 text-white hover:bg-white hover:text-primary hover:border-white"
      : "bg-accent hover:bg-accent/90 text-white";
    const className = emphasize ? `${baseClasses} group` : baseClasses;

    const content = (
      <>
        {cta.label}
        {emphasize && !cta.external && (
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </>
    );

    return (
      <Button size="lg" variant={isOutline ? "outline" : "default"} className={`${className} px-8 py-6 text-lg`} asChild>
        {cta.external ? (
          <a href={cta.to} target="_blank" rel="noopener noreferrer">{content}</a>
        ) : (
          <Link to={cta.to}>{content}</Link>
        )}
      </Button>
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${preset.image})` }} role="img" aria-label={preset.imageAlt} />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/35" />
      </motion.div>

      <div className="relative flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="mx-auto max-w-4xl space-y-6">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm font-medium uppercase tracking-[0.35em] text-accent lg:text-base">
              {preset.eyebrow}
            </motion.p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {preset.heading.toUpperCase()}
              {preset.highlight && (<><br /><span className="text-accent">{preset.highlight.toUpperCase()}</span></>)}
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-white/90 lg:text-xl">{preset.subheading}</p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
              {renderCta(preset.primaryCta, true)}
              {renderCta(preset.secondaryCta)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
