import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center text-slate-100">
    <p className="text-sm uppercase tracking-[0.4em] text-slate-500">404</p>
    <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
    <p className="mt-4 text-slate-400">The page you are looking for doesn’t exist or has been moved.</p>
    <Link
      to="/dashboard"
      className="mt-8 inline-flex rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
    >
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
