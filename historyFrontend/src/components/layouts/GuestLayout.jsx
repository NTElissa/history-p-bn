import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_35%),linear-gradient(180deg,_#020617,_#0f172a)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
