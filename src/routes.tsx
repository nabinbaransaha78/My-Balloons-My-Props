import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./components/admin/AnalyticsDashboard"; // or your actual admin page
import { AuthProvider } from "./context/AuthContext";

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
