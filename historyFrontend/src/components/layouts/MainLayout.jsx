import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Image, Music4, MessageSquareText, CalendarRange, Shield, BarChart3, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/exhibits', label: 'Exhibits', icon: Image },
  { to: '/audio', label: 'Audio', icon: Music4 },
  { to: '/comments', label: 'Comments', icon: MessageSquareText },
  { to: '/activities', label: 'Activities', icon: CalendarRange },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin', label: 'Admin', icon: Shield },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#111827_0%,#030712_45%,#020617_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 p-4 lg:p-6">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-white/8 p-5 shadow-2xl backdrop-blur xl:block">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">AR Museum</p>
            <h2 className="mt-2 text-2xl font-semibold">HistoryHub</h2>
            <p className="mt-2 text-sm text-slate-300">Interactive museum explorer for Rwanda history, audio, and AR exhibits.</p>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-emerald-400/15 text-emerald-200' : 'text-slate-200 hover:bg-white/8 hover:text-white'}`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
          <button onClick={logout} className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500/15 px-4 py-3 text-sm font-semibold text-rose-100 hover:bg-rose-500/25"> <LogOut size={16}/> Sign out </button>
        </aside>

        <main className="flex-1 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur lg:p-6">
          <header className="mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-white/8 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Welcome</p>
              <h1 className="text-xl font-semibold text-white">Museum operations dashboard</h1>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-100">
              <UserCircle size={18} className="text-emerald-300"/>
              <span>{user?.email || 'Guest'}</span>
            </div>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
