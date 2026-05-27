import { Outlet } from 'react-router-dom';
import Header from '../nav/Header.jsx';
import Sidebar from '../nav/Sidebar.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="lg:flex lg:min-h-screen">
        <aside className="w-full border-b border-slate-800 bg-slate-900/95 lg:w-72 lg:border-r lg:border-b-0">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 lg:p-6">
          <Header />
          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
