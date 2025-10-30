import { Navigate } from "react-router-dom";
import { useDecodedToken } from "./auth";

export default function ProtectedRoute({ children, role: requiredRole }) {
  const token = localStorage.getItem("accessToken");
  const decoded = useDecodedToken(token);

  // Jika belum login → arahkan ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika token tidak bisa dibaca
  if (!decoded) {
    return <p>Loading...</p>;
  }

  // Jika role tidak sesuai → tolak akses
  if (requiredRole && decoded.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
