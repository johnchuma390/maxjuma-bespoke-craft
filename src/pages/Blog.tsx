import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import blogData from "@/data/blog.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  heroImage: string;
};

const Blog = () => {
  const posts = useMemo(() => {
    const list = blogData as BlogPost[];
    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto flex flex-col items-center px-4 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.45em] text-accent">
            MaxJuma Journal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">
            Stories from the Atelier
          </h1>
          <p className="mt-6 max-w-2xl text-white/80">
            Tailoring insights, style inspiration, and behind-the-scenes moments
            from our Garden Chambers studio.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-primary">
                    {post.title}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={`${post.id}-${tag}`}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                    <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                      By {post.author}
                    </div>
                    <Button asChild className="rounded-full bg-accent px-5 text-white hover:bg-accent/90">
                      <Link to={`/blog/${post.slug}`}>Read Story</Link>
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

export default Blog;