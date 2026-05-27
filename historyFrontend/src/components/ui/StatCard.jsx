export default function StatCard({ title, value, accent = 'emerald' }) {
  const accentClasses = {
    emerald: 'from-emerald-400/15 to-emerald-500/5 text-emerald-100',
    blue: 'from-sky-400/15 to-sky-500/5 text-sky-100',
    amber: 'from-amber-400/15 to-amber-500/5 text-amber-100',
    rose: 'from-rose-400/15 to-rose-500/5 text-rose-100',
  };

  return (
    <article className={`rounded-3xl border border-white/10 bg-linear-to-br ${accentClasses[accent]} p-5 shadow-xl`}>
      <p className="text-sm text-slate-200">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </article>
  );
}
