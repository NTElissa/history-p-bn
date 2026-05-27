import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('museum_user');
    const storedToken = localStorage.getItem('museum_token');
    if (storedUser && storedToken) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('museum_token', data.token);
    const decoded = JSON.parse(atob(data.token.split('.')[1]));
    const profile = { id: decoded.userId, role: decoded.role, email };
    localStorage.setItem('museum_user', JSON.stringify(profile));
    setUser(profile);
    toast.success('Welcome back to the museum dashboard');
  };

  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password });
    toast.success('Account created. Please log in.');
  };

  const logout = () => {
    localStorage.removeItem('museum_token');
    localStorage.removeItem('museum_user');
    setUser(null);
    toast('You have been signed out.', { icon: '👋' });
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
