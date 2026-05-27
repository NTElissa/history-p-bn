import { useEffect, useState } from 'react';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../../api/blogApi.js';
import Loader from '../../components/ui/Loader.jsx';

const initialForm = { title: '', content: '' };

const Activities = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleEdit = (item) => {
    setSelectedId(item._id);
    setForm({ title: item.title, content: item.content });
  };

  const handleReset = () => {
    setSelectedId(null);
    setForm(initialForm);
    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      if (selectedId) {
        await updateBlog(selectedId, form);
        setStatus('Activity updated successfully');
      } else {
        await createBlog(form);
        setStatus('Activity created successfully');
      }
      await loadActivities();
      handleReset();
    } catch (error) {
      setStatus(error.message || 'Unable to save activity');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await deleteBlog(id);
      await loadActivities();
      setStatus('Activity removed successfully');
    } catch (error) {
      setStatus(error.message || 'Unable to remove activity');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading museum activities…" />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Museum activities</h2>
            <p className="mt-2 text-slate-400">Create articles or activity posts that appear in your visitor experience.</p>
          </div>
        </div>

        {status && <div className="mt-6 rounded-3xl bg-slate-950 p-4 text-slate-200">{status}</div>}

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
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="4"
                required
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {selectedId ? 'Update activity' : 'Add activity'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-3xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
            <h3 className="text-lg font-semibold text-white">Activity list</h3>
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <p className="text-slate-500">No activities created yet.</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog._id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-white">{blog.title}</h4>
                        <p className="mt-2 text-slate-400">{blog.content.slice(0, 120)}...</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(blog)}
                          className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog._id)}
                          className="rounded-3xl border border-rose-500 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Activities;
