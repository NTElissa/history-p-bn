import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Exhibits from './pages/exhibits/Exhibits';
import Audio from './pages/audio/Audio';
import Comments from './pages/comments/Comments';
import Activities from './pages/activities/Activities';
import Analytics from './pages/analytics/Analytics';
import AdminManagement from './pages/admin/AdminManagement';
import Profile from './pages/profile/Profile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ className: 'bg-slate-900 text-white' }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exhibits" element={<Exhibits />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<AdminManagement />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}