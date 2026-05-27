import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="grid min-h-screen place-items-center text-slate-100">Loading session…</div>;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
