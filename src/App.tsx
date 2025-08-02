import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import { PUBLISHABLE_KEY } from '@/lib/clerk';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Index from "./pages/Index";
import PropsStore from "./pages/PropsStore";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import EventGallery from "./pages/EventGallery";
import EventPlanner from "./pages/EventPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // For development without valid Clerk key
  if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('placeholder')) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/props-store" element={<PropsStore />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/gallery" element={<EventGallery />} />
              <Route path="/event-planner" element={<EventPlanner />} />
              <Route path="/login" element={<div className="min-h-screen flex items-center justify-center"><p>Login disabled in development mode</p></div>} />
              <Route path="/admin" element={<div className="min-h-screen flex items-center justify-center"><p>Admin panel disabled in development mode</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/props-store" element={<PropsStore />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/gallery" element={<EventGallery />} />
              <Route path="/event-planner" element={<EventPlanner />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
