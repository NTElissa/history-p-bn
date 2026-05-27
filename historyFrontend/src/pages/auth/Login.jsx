import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#111827_0%,#030712_45%,#020617_100%)] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 md:p-10 bg-linear-to-br from-emerald-500/10 via-slate-950 to-sky-500/10">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">AR Museum</p>
          <h1 className="mt-4 text-3xl font-semibold">Explore Rwanda history through interactive AR stories.</h1>
          <p className="mt-4 text-slate-300">A modern museum platform combining exhibits, music, comments, and management tools for staff and visitors.</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            <li>• AR-ready image and audio exhibits</li>
            <li>• Visitor comments and museum activity feed</li>
            <li>• Staff and admin dashboard controls</li>
          </ul>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-slate-300">Use your museum account to continue.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loading} className="w-full rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-70">{loading ? 'Signing in...' : 'Login'}</button>
          </form>
          <p className="mt-6 text-sm text-slate-300">No account yet? <Link to="/register" className="text-emerald-300">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
