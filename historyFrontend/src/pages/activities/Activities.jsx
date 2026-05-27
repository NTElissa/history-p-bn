export default function Activities() {
  const list = [
    { title: 'AR exhibit tour', time: '10:30 AM' },
    { title: 'Audio narration session', time: '12:00 PM' },
    { title: 'Staff content update', time: '2:15 PM' },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Museum activities</h2>
      <p className="mt-2 text-slate-300">Manage daily museum operations and visitor engagements.</p>
      <div className="mt-6 space-y-3">{list.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between"><div><h3 className="text-white font-semibold">{item.title}</h3><p className="text-sm text-slate-300">Scheduled time</p></div><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-100">{item.time}</span></div>)}</div>
    </div>
  );
}
