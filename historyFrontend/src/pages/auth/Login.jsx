import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await login(form);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 text-slate-100">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">History Backend</p>
        <h1 className="text-4xl font-semibold text-white">Sign in to access the museum dashboard</h1>
        <p className="text-slate-400">Use your account to manage exhibits, audio content, comments, activities, and analytics.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/95 p-8 shadow-xl shadow-slate-950/10">
        {error && <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">Email address</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-sm text-slate-400">
          New here? <a href="/register" className="font-semibold text-sky-300 underline">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
