import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await register(form);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 text-slate-100">
      <div className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400/80">History Backend</p>
        <h1 className="text-4xl font-semibold text-white">Create a new Museum account</h1>
        <p className="text-slate-400">Register to manage exhibits, audio content and museum activities with ease.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/95 p-8 shadow-xl shadow-slate-950/10">
        {error && <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">Full name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

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
          className="w-full rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p className="text-center text-sm text-slate-400">
          Already registered? <a href="/login" className="font-semibold text-sky-300 underline">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
