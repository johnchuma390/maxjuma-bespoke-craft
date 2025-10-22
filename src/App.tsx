import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Suits from "./pages/Suits";
import Fabrics from "./pages/Fabrics";
import WhyMaxJuma from "./pages/WhyMaxJuma";
import Gallery from "./pages/Gallery";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/suits" element={<Suits />} />
          <Route path="/fabrics" element={<Fabrics />} />
          <Route path="/why-maxjuma" element={<WhyMaxJuma />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
