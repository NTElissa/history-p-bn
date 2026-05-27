import { useEffect, useState } from 'react';
import api from '../../api/api';
import toast from 'react-hot-toast';

export default function Exhibits() {
  const [exhibits, setExhibits] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: 'History', imageUrl: '', arFrameworkType: 'image', audioUrl: '' });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get('/exhibits');
      setExhibits(res.data);
    } catch {
      toast.error('Unable to load exhibits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/exhibits', form);
      toast.success('Exhibit created');
      setForm({ title: '', description: '', category: 'History', imageUrl: '', arFrameworkType: 'image', audioUrl: '' });
      load();
    } catch {
      toast.error('Failed to create exhibit');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/exhibits/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Create exhibit</h2>
        <p className="mt-2 text-slate-300">Define AR markers, images, and audio for museum stories.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Exhibit title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <input className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Audio URL" value={form.audioUrl} onChange={(e) => setForm({ ...form, audioUrl: e.target.value })} />
          <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white" value={form.arFrameworkType} onChange={(e) => setForm({ ...form, arFrameworkType: e.target.value })}>
            <option value="image">Image</option>
            <option value="arrow">Arrow</option>
            <option value="audio">Audio</option>
          </select>
          <button className="w-full rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950">Save exhibit</button>
        </form>
      </article>

      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Exhibit list</h2>
        <p className="mt-2 text-slate-300">Connected to /api/exhibits.</p>
        {loading ? <p className="mt-4 text-slate-200">Loading...</p> : exhibits.map((item) => (
          <div key={item._id} className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.category} · {item.arFrameworkType}</p>
              </div>
              <button onClick={() => remove(item._id)} className="rounded-xl bg-rose-500/15 px-3 py-2 text-sm text-rose-100">Delete</button>
            </div>
            <p className="mt-2 text-sm text-slate-200">{item.description}</p>
          </div>
        ))}
      </article>
    </div>
  );
}
