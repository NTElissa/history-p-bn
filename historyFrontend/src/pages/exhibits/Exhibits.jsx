import { useEffect, useMemo, useState } from 'react';
import { createExhibit, deleteExhibit, getExhibits, updateExhibit } from '../../api/exhibitApi.js';
import Loader from '../../components/ui/Loader.jsx';

const initialForm = {
  title: '',
  description: '',
  category: 'History',
  imageUrl: '',
  arFrameworkType: 'image',
  audioUrl: '',
};

const Exhibits = () => {
  const [exhibits, setExhibits] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const loadExhibits = async () => {
    setLoading(true);
    try {
      const data = await getExhibits();
      setExhibits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExhibits();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setSelectedId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl,
      arFrameworkType: item.arFrameworkType,
      audioUrl: item.audioUrl || '',
    });
  };

  const handleReset = () => {
    setSelectedId(null);
    setForm(initialForm);
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (selectedId) {
        await updateExhibit(selectedId, form);
        setMessage('Exhibit updated successfully');
      } else {
        await createExhibit(form);
        setMessage('Exhibit created successfully');
      }
      await loadExhibits();
      handleReset();
    } catch (error) {
      setMessage(error.message || 'Could not save exhibit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setSubmitting(true);
    try {
      await deleteExhibit(id);
      await loadExhibits();
      setMessage('Exhibit deleted successfully');
    } catch (error) {
      setMessage(error.message || 'Could not delete exhibit');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryOptions = useMemo(
    () => ['History', 'Culture', 'Nature', 'Art', 'Education'],
    []
  );

  if (loading) {
    return <Loader label="Loading exhibits…" />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Exhibits management</h2>
            <p className="mt-2 text-slate-400">Create, update and remove museum exhibits from the AR experience.</p>
          </div>
        </div>

        {message && <div className="mt-6 rounded-3xl bg-slate-950 p-4 text-sm text-slate-200">{message}</div>}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            <label className="block text-sm text-slate-300">
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-slate-300">
              AR type
              <select
                name="arFrameworkType"
                value={form.arFrameworkType}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              >
                <option value="image">Image</option>
                <option value="arrow">Arrow</option>
                <option value="audio">Audio</option>
              </select>
            </label>
            <label className="block text-sm text-slate-300">
              Image URL
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Audio URL
              <input
                name="audioUrl"
                value={form.audioUrl}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-60"
              >
                {selectedId ? 'Update exhibit' : 'Add exhibit'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Reset form
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            <h3 className="text-lg font-semibold text-white">All exhibits</h3>
            <div className="space-y-4">
              {exhibits.map((item) => (
                <div key={item._id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">{item.category} · {item.arFrameworkType}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="rounded-3xl border border-rose-500 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Exhibits;
