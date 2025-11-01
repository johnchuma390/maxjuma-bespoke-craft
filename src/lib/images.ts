export const suitFallbacks = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520975691579-d706d99a486d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80",
];

export function resolveImageUrl(input?: string, fallback?: string) {
  if (!input || typeof input !== "string") return fallback || suitFallbacks[0];

  // Absolute remote URL
  if (/^https?:\/\//i.test(input)) return input;

  // Convert dev-only paths like "/src/assets/suits/xyz.jpg" -> "/images/suits/xyz.jpg"
  const cleaned = input
    .replace(/^@?\/?src\/assets\//i, "") // strip src/assets/
    .replace(/^\.?\//, ""); // strip leading ./ or /
  return `/images/${cleaned}`; // expects files in public/images/
}