import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#111827_0%,#030712_45%,#020617_100%)] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 md:p-10 bg-linear-to-br from-sky-500/10 via-slate-950 to-emerald-500/10">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300">New visitor</p>
          <h1 className="mt-4 text-3xl font-semibold">Create your museum account.</h1>
          <p className="mt-4 text-slate-300">Register to explore exhibits, leave comments, and enjoy AR audio features.</p>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loading} className="w-full rounded-2xl bg-sky-400 px-4 py-3 font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-70">{loading ? 'Creating account...' : 'Register'}</button>
          </form>
          <p className="mt-6 text-sm text-slate-300">Already have an account? <Link to="/login" className="text-emerald-300">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
