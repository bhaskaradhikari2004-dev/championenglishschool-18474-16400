import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import Results from "./pages/Results";
import Leadership from "./pages/Leadership";
import Contact from "./pages/Contact";
import ChildCare from "./pages/ChildCare";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminNotices from "./pages/admin/Notices";
import AdminGallery from "./pages/admin/Gallery";
import AdminResults from "./pages/admin/Results";
import AdminLeadership from "./pages/admin/Leadership";
import AdminMessages from "./pages/admin/Messages";
import AdminWelcomePopup from "./pages/admin/WelcomePopup";
import AdminAboutInfo from "./pages/admin/AboutInfo";
import AdminSettings from "./pages/admin/Settings";
import AdminAboutMedia from "./pages/admin/AboutMedia";
import AdminHomepageImages from "./pages/admin/HomepageImages";
import AdminChildCareImages from "./pages/admin/ChildCareImages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/childcare" element={<ChildCare />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
            <Route path="/admin/notices" element={<AdminLayout><AdminNotices /></AdminLayout>} />
            <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
            <Route path="/admin/results" element={<AdminLayout><AdminResults /></AdminLayout>} />
            <Route path="/admin/leadership" element={<AdminLayout><AdminLeadership /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
            <Route path="/admin/welcome-popup" element={<AdminLayout><AdminWelcomePopup /></AdminLayout>} />
            <Route path="/admin/about-info" element={<AdminLayout><AdminAboutInfo /></AdminLayout>} />
            <Route path="/admin/about-media" element={<AdminLayout><AdminAboutMedia /></AdminLayout>} />
            <Route path="/admin/homepage-images" element={<AdminLayout><AdminHomepageImages /></AdminLayout>} />
            <Route path="/admin/childcare-images" element={<AdminLayout><AdminChildCareImages /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
