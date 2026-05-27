import { useEffect, useState } from 'react';
import { getBlogs } from '../../api/blogApi.js';
import { getExhibits } from '../../api/exhibitApi.js';
import { getMessages } from '../../api/messageApi.js';
import Loader from '../../components/ui/Loader.jsx';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ exhibits: 0, blogs: 0, messages: 0 });

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [exhibits, blogs, messages] = await Promise.all([getExhibits(), getBlogs(), getMessages()]);
        setCounts({ exhibits: exhibits.length, blogs: blogs.length, messages: messages.length });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, []);

  if (loading) {
    return <Loader label="Loading admin panel…" />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Admin management</h2>
            <p className="mt-2 text-slate-400">Monitor the entire history museum system and access key management actions.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/exhibits" className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-400">
              Manage Exhibits
            </Link>
            <Link to="/activities" className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-slate-500">
              Manage Activities
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Exhibits</p>
            <p className="mt-4 text-4xl font-semibold text-white">{counts.exhibits}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Activities</p>
            <p className="mt-4 text-4xl font-semibold text-white">{counts.blogs}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Messages</p>
            <p className="mt-4 text-4xl font-semibold text-white">{counts.messages}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h3 className="text-lg font-semibold text-white">Admin notes</h3>
        <p className="mt-3 text-slate-400">Use this panel to control everything from content creation to system maintenance for your museum visitors.</p>
      </section>
    </div>
  );
};

export default AdminPanel;
