import { useEffect, useState } from 'react';
import { createMessage, deleteMessage, getMessages } from '../../api/messageApi.js';
import Loader from '../../components/ui/Loader.jsx';

const Comments = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ recipient: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');
    try {
      await createMessage(form);
      setStatus('Comment sent successfully');
      setForm({ recipient: '', content: '' });
      await loadMessages();
    } catch (error) {
      setStatus(error.message || 'Unable to send comment');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await deleteMessage(id);
      await loadMessages();
      setStatus('Comment deleted successfully');
    } catch (error) {
      setStatus(error.message || 'Unable to delete comment');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader label="Loading comments…" />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-white">Visitor comments</h2>
        <p className="mt-2 text-slate-400">Collect messages from visitors and manage problem reports or story feedback.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-300">
            Recipient ID
            <input
              name="recipient"
              value={form.recipient}
              onChange={handleChange}
              placeholder="User ID or staff ID"
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            />
          </label>

          <label className="block text-sm text-slate-300 sm:col-span-2">
            Comment
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="4"
              required
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-60"
            >
              {saving ? 'Posting comment…' : 'Post comment'}
            </button>
            {status && <p className="mt-3 text-sm text-slate-300">{status}</p>}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h3 className="text-lg font-semibold text-white">Recent comments</h3>
        <div className="mt-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-slate-500">No comments available. Add a message above to get started.</p>
          ) : (
            messages.map((message) => (
              <div key={message._id} className="rounded-3xl bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-white">{message.content}</p>
                  <button
                    type="button"
                    onClick={() => handleDelete(message._id)}
                    className="rounded-3xl border border-rose-500 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 text-sm text-slate-500">Recipient: {message.recipient || 'Staff'}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
