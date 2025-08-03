import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Index from "./pages/Index";
import PropsStore from "./pages/PropsStore";
import AdminPanel from "./pages/AdminPanel";
import Blog from "./pages/Blog";
import EventGallery from "./pages/EventGallery";
import EventPlanner from "./pages/EventPlanner";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
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
                element={<AdminRoute element={<AdminPanel />} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
