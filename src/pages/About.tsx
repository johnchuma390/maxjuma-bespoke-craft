import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const aboutHeroImg = "https://i.postimg.cc/C5rF2GhL/image.png";   // hero image
const aboutDetailImg = "https://i.postimg.cc/FzNdvVXk/image.png"; // secondary image

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHeroImg})` }}
          aria-label="MaxJuma Atelier"
          role="img"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <p className="text-xs uppercase tracking-[0.45em] text-accent">Our Story</p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-6xl">MaxJuma Atelier</h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Bespoke tailoring crafted with precision and care in Nairobi.
            </p>
          </div>
        </div>
      </section>

      {/* Content Part 1: Craft Philosophy */}
      <section className="py-14">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold text-primary">Craft Philosophy</h2>

            <p className="mt-4 text-muted-foreground">
              Located opposite the iconic Jeevanjee Gardens in the heart of Nairobi, MaxJuma Bespoke
              Tailors has been redefining luxury menswear since 2014. What began as a small atelier with
              a passion for perfect fits has grown into Kenya&apos;s premier destination for custom suits
              and formal wear.
            </p>

            <p className="mt-4 text-muted-foreground">
              We believe that every man deserves a suit that not only fits perfectly but tells his unique
              story. Our master tailors combine traditional craftsmanship with cutting-edge AI-assisted
              measurements to deliver unparalleled precision and style.
            </p>

            <p className="mt-4 text-muted-foreground">
              From weddings to boardrooms, from cultural celebrations to red carpet events, MaxJuma has
              dressed Kenya&apos;s finest. Our commitment to excellence, sustainable practices, and
              personalized service has made us the trusted choice for discerning gentlemen across East Africa.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={aboutDetailImg}
                alt="Atelier detail"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />

              {/* Overlay badge exactly like the design */}
              <div
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-[280px] h-[140px] sm:w-[320px] sm:h-[160px] rounded-2xl bg-[#C6A24D] text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)]"
                aria-label="10+ Years of Excellence"
              >
                <div className="flex h-full w-full flex-col items-start justify-center px-6 sm:px-8 text-left">
                  <div className="text-4xl sm:text-5xl font-bold leading-none">10+</div>
                  <div className="mt-2 sm:mt-3 text-sm sm:text-base">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Part 2: Our Process */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-semibold text-primary text-center">How We Work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Consult", text: "Discuss lifestyle, occasion, and personal style." },
              { step: "02", title: "Measure", text: "Precise measurements and posture assessment." },
              { step: "03", title: "Cut & Fit", text: "Pattern draft, fabric cut, and guided fittings." },
              { step: "04", title: "Finish", text: "Hand detailing, pressing, and final delivery." }
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6">
                <div className="text-accent text-sm font-semibold tracking-[0.3em]">{s.step}</div>
                <h3 className="mt-2 text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Part 3: Fabrics & Sustainability */}
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-semibold text-primary">Fabrics & Sustainability</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            We source breathable blends, fine wools, and statement weaves suited to Kenya’s climate.
            We prioritise lasting quality, careful waste reduction, and repairs that extend garment life.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Breathable", "Durable", "Repair-Friendly", "Climate-Suited", "Statement Options"].map((f) => (
              <span
                key={f}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Part 4: Visit the Studio */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:px-8">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h2 className="text-2xl font-semibold text-primary">Visit the Studio</h2>
            <p className="mt-4 text-muted-foreground">
              Find us at Garden Chambers, Nairobi CBD. Book a private consultation or fitting—onsite
              or virtual—to begin your commission.
            </p>
            <div className="mt-6">
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/book">Book a Fitting</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div
              className="h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-border bg-cover bg-center"
              style={{ backgroundImage: `url(${aboutHeroImg})` }}
              aria-label="Studio preview"
              role="img"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
