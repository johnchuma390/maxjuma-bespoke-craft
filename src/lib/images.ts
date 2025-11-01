export const suitFallbacks = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520975691579-d706d99a486d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
];

export function resolveImageUrl(input?: string, fallback?: string) {
  if (!input) return fallback || "";
  if (/^https?:\/\//i.test(input)) return input;

  // Handle dev-only paths e.g. "/src/assets/suits/a.jpg" or "src/assets/suits/a.jpg"
  const cleaned = input
    .replace(/^\/?src\/assets\//i, "")
    .replace(/^@?\/?assets\//i, "")
    .replace(/^\.?\//, "");

  // Now serve from public/images
  return `/images/${cleaned}`;
}