import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Deals from "./pages/Deals";
import Analytics from "./pages/Analytics";
import Companies from "./pages/Companies";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Tasks from "./pages/Tasks";
import Spreadsheet from "./pages/Spreadsheet";
import DiagramEditorPage from "./pages/DiagramEditorPage";
import NotFound from "./pages/NotFound";
import { WhatsAppWidget } from "./components/WhatsAppWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crm" element={<Index />} />
          <Route path="/clients" element={<Companies />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/spreadsheet" element={<Spreadsheet />} />
          <Route path="/diagram-editor" element={<DiagramEditorPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppWidget phoneNumber="33612345678" />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
