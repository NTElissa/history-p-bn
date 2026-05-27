import { useEffect, useState } from 'react';
import { getBlogs } from '../../api/blogApi.js';
import { getExhibits } from '../../api/exhibitApi.js';
import { getMessages } from '../../api/messageApi.js';
import Loader from '../../components/ui/Loader.jsx';

const statCards = [
  { label: 'Exhibits', valueKey: 'exhibits' },
  { label: 'Activities', valueKey: 'blogs' },
  { label: 'Visitor messages', valueKey: 'messages' },
];

const Dashboard = () => {
  const [stats, setStats] = useState({ exhibits: 0, blogs: 0, messages: 0 });
  const [latest, setLatest] = useState({ exhibits: [], messages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [exhibits, blogs, messages] = await Promise.all([getExhibits(), getBlogs(), getMessages()]);
        setStats({ exhibits: exhibits.length, blogs: blogs.length, messages: messages.length });
        setLatest({ exhibits: exhibits.slice(0, 3), messages: messages.slice(0, 3) });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader label="Loading dashboard…" />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{card.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{stats[card.valueKey]}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Recent exhibits</h3>
          <div className="mt-4 space-y-4">
            {latest.exhibits.length > 0 ? (
              latest.exhibits.map((item) => (
                <div key={item._id} className="rounded-3xl bg-slate-950 p-4">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-400">{item.category}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No exhibits yet</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Recent messages</h3>
          <div className="mt-4 space-y-4">
            {latest.messages.length > 0 ? (
              latest.messages.map((message) => (
                <div key={message._id} className="rounded-3xl bg-slate-950 p-4">
                  <p className="font-semibold text-white">{message.content.slice(0, 50)}...</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">From visitor</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
