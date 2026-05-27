import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import MainLayout from '../components/layouts/MainLayout.jsx';
import GuestLayout from '../components/layouts/GuestLayout.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Exhibits from '../pages/exhibits/Exhibits.jsx';
import AudioLibrary from '../pages/audio/AudioLibrary.jsx';
import Comments from '../pages/comments/Comments.jsx';
import Activities from '../pages/activities/Activities.jsx';
import AdminPanel from '../pages/admin/AdminPanel.jsx';
import Analytics from '../pages/analytics/Analytics.jsx';
import Profile from '../pages/profile/Profile.jsx';
import NotFound from '../pages/NotFound.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<GuestLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="exhibits" element={<Exhibits />} />
      <Route path="audio" element={<AudioLibrary />} />
      <Route path="comments" element={<Comments />} />
      <Route path="activities" element={<Activities />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
