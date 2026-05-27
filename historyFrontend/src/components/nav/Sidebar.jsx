import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Exhibits', path: '/exhibits' },
  { label: 'Audio Library', path: '/audio' },
  { label: 'Comments', path: '/comments' },
  { label: 'Activities', path: '/activities' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Profile', path: '/profile' },
  { label: 'Admin', path: '/admin', admin: true },
];

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/20">
            H
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">History</p>
            <h1 className="text-xl font-semibold text-white">Museum AR</h1>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-400">
        <p className="text-slate-300">Visitor flow</p>
        <p className="mt-3 text-sm leading-6">
          Explore exhibits, launch audio narratives, and keep museum content updated from one dashboard.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
