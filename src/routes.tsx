import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./components/admin/AnalyticsDashboard";

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? element : <Navigate to="/login" replace />;
};

// Usage
<Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
