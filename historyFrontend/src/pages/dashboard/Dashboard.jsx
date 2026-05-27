import { useEffect, useState } from 'react';
import api from '../../api/api';
import StatCard from '../../components/ui/StatCard';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [blogsRes, exhibitsRes] = await Promise.all([api.get('/blogs'), api.get('/exhibits')]);
        setBlogs(blogsRes.data);
        setExhibits(exhibitsRes.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Museum Exhibits" value={exhibits.length} accent="emerald" />
        <StatCard title="Stories & Blogs" value={blogs.length} accent="blue" />
        <StatCard title="Audio Stops" value="4" accent="amber" />
        <StatCard title="Live Visitors" value="18" accent="rose" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white">Recent museum highlights</h2>
          <p className="mt-2 text-slate-300">This dashboard is connected to your backend for exhibits and stories.</p>
          <div className="mt-6 space-y-3">
            {loading ? <p>Loading data...</p> : blogs.slice(0, 4).map((item) => <div key={item._id} className="rounded-2xl border border-white/10 bg-black/20 p-4"> <h3 className="font-semibold text-white">{item.title}</h3><p className="text-sm text-slate-300">{item.content.slice(0, 120)}...</p></div>)}
          </div>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-white">AR exhibit preview</h2>
          <p className="mt-2 text-slate-300">Use image or arrow-based AR markers for Rwanda history and animals.</p>
          <div className="mt-6 space-y-3">
            {exhibits.slice(0, 4).map((item) => <div key={item._id} className="rounded-2xl border border-white/10 bg-black/20 p-4"><strong className="text-white">{item.title}</strong><p className="text-sm text-slate-300">{item.category}</p></div>)}
          </div>
        </article>
      </section>
    </div>
  );
}
