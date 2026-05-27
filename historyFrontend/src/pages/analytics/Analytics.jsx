import { useEffect, useState } from 'react';
import { getBlogs } from '../../api/blogApi.js';
import { getExhibits } from '../../api/exhibitApi.js';
import { getMessages } from '../../api/messageApi.js';
import Loader from '../../components/ui/Loader.jsx';

const Analytics = () => {
  const [data, setData] = useState({ exhibits: 0, blogs: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [exhibits, blogs, messages] = await Promise.all([getExhibits(), getBlogs(), getMessages()]);
        setData({ exhibits: exhibits.length, blogs: blogs.length, messages: messages.length });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (loading) {
    return <Loader label="Loading analytics…" />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-white">Performance analytics</h2>
        <p className="mt-2 text-slate-400">Quick metrics for your museum content and visitor engagement.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Exhibits</p>
            <p className="mt-4 text-4xl font-semibold text-white">{data.exhibits}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-sky-500" style={{ width: `${Math.min(data.exhibits * 10, 100)}%` }} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Activities</p>
            <p className="mt-4 text-4xl font-semibold text-white">{data.blogs}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(data.blogs * 10, 100)}%` }} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Comments</p>
            <p className="mt-4 text-4xl font-semibold text-white">{data.messages}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-rose-500" style={{ width: `${Math.min(data.messages * 10, 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-950 p-6">
          <p className="text-sm text-slate-400">Insight</p>
          <p className="mt-3 text-slate-200">
            This page aggregates exhibit, activity and message volume from your backend. Use these numbers to decide where to add more audio experiences or museum content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
