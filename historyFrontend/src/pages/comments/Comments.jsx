import { useEffect, useState } from 'react';
import api from '../../api/api';
import toast from 'react-hot-toast';

export default function Comments() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  const load = async () => {
    try { const res = await api.get('/messages'); setMessages(res.data); } catch { toast.error('Comments not available yet'); }
  };

  useEffect(() => { load(); }, []);

  const send = async (e) => {
    e.preventDefault();
    try { await api.post('/messages', { recipient: null, content }); setContent(''); load(); toast.success('Message sent'); } catch { toast.error('Failed to send'); }
  };

  return <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]"> <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl"> <h2 className="text-xl font-semibold text-white">Visitor comments</h2><p className="mt-2 text-slate-300">Connected to the messages API for visitor communication.</p><form onSubmit={send} className="mt-6 space-y-3"><textarea value={content} onChange={(e)=>setContent(e.target.value)} className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Write a comment or museum feedback" /><button className="rounded-2xl bg-sky-400 px-4 py-3 font-semibold text-slate-950">Send comment</button></form></article> <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl"> <h2 className="text-xl font-semibold text-white">Recent feedback</h2>{messages.length===0 ? <p className="mt-4 text-slate-300">No messages yet.</p> : messages.map((item)=> <div key={item._id} className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-sm text-slate-300">{item.content}</p></div>)}</article></div>;
}
