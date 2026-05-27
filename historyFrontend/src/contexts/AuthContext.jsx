import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginApi, register as registerApi } from '../api/authApi.js';

const AuthContext = createContext(null);

const decodeToken = (token) => {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('HISTORY_TOKEN'));
  const [user, setUser] = useState(() => decodeToken(localStorage.getItem('HISTORY_TOKEN')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('HISTORY_TOKEN', token);
      setUser(decodeToken(token));
    } else {
      localStorage.removeItem('HISTORY_TOKEN');
      setUser(null);
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await loginApi(credentials);
      setToken(response.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err?.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError('');
    try {
      await registerApi(payload);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err?.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
