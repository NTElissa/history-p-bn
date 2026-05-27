import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">Welcome back</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">Museum dashboard overview</h2>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
          Signed in as <span className="font-semibold text-white">{user?.name || 'Guest'}</span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
