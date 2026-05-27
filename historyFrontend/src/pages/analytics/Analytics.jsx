export default function Analytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        ['Visitors', '124'],
        ['Exhibits viewed', '38'],
        ['Comments sent', '12'],
        ['Audio sessions', '9'],
        ['Staff updates', '5'],
        ['AR interactions', '17'],
      ].map(([label, value]) => (
        <article key={label} className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </article>
      ))}
    </div>
  );
}
