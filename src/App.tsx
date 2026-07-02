import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import Technology from "./pages/Technology";
import Industries from "./pages/Industries";
import Resources from "./pages/Resources";
import Company from "./pages/Company";
import RequestDemo from "./pages/RequestDemo";
import BookConsultation from "./pages/BookConsultation";
import PartnerApplication from "./pages/PartnerApplication";
import InvestorInquiry from "./pages/InvestorInquiry";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { RouteTracker } from "./components/seo/RouteTracker";
import { initAnalytics } from "./lib/analytics";

// EAOS
import AppShell from "./app/layout/AppShell";
import Login from "./app/pages/Login";
import Dashboard from "./app/pages/Dashboard";
import Applications from "./app/pages/Applications";
import ApplicationDetail from "./app/pages/ApplicationDetail";
import Capabilities from "./app/pages/Capabilities";
import AuditLog from "./app/pages/AuditLog";
import Placeholder from "./app/pages/Placeholder";

const queryClient = new QueryClient();

const MarketingApp = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/solutions/:solutionId" element={<SolutionDetail />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/company" element={<Company />} />
      <Route path="/request-demo" element={<RequestDemo />} />
      <Route path="/book-consultation" element={<BookConsultation />} />
      <Route path="/partner-application" element={<PartnerApplication />} />
      <Route path="/investor-inquiry" element={<InvestorInquiry />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

const App = () => {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteTracker />
            <Routes>
              <Route path="/app/login" element={<Login />} />
              <Route path="/app" element={<AppShell />}>
                <Route index element={<Dashboard />} />
                <Route path="search" element={<Placeholder title="Enterprise Search" />} />
                <Route path="capabilities" element={<Capabilities />} />
                <Route path="value-streams" element={<Placeholder title="Value Streams" />} />
                <Route path="processes" element={<Placeholder title="Business Processes" />} />
                <Route path="applications" element={<Applications />} />
                <Route path="applications/:id" element={<ApplicationDetail />} />
                <Route path="services" element={<Placeholder title="Services" />} />
                <Route path="apis" element={<Placeholder title="APIs & Events" />} />
                <Route path="data" element={<Placeholder title="Data Architecture" />} />
                <Route path="integration" element={<Placeholder title="Integration Architecture" />} />
                <Route path="infrastructure" element={<Placeholder title="Infrastructure" />} />
                <Route path="security" element={<Placeholder title="Security Architecture" />} />
                <Route path="agents" element={<Placeholder title="AI Agent Studio" phase="Phase 3" />} />
                <Route path="knowledge" element={<Placeholder title="Prompts & Knowledge Bases" phase="Phase 3" />} />
                <Route path="graph" element={<Placeholder title="Knowledge Graph" phase="Phase 2" />} />
                <Route path="decisions" element={<Placeholder title="Architecture Decisions" />} />
                <Route path="reviews" element={<Placeholder title="Architecture Reviews" phase="Phase 3" />} />
                <Route path="risks" element={<Placeholder title="Risks & Controls" />} />
                <Route path="portfolio" element={<Placeholder title="Portfolio Management" phase="Phase 4" />} />
                <Route path="audit" element={<AuditLog />} />
                <Route path="settings" element={<Placeholder title="Workspace Settings" />} />
                <Route path="admin" element={<Placeholder title="Workspace Administration" />} />
              </Route>
              <Route path="*" element={<MarketingApp />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
