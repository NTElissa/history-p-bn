export default function AdminManagement() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Admin controls</h2>
        <p className="mt-2 text-slate-300">Manage staff, exhibits, blogs, and content approvals from one place.</p>
        <div className="mt-6 space-y-3">
          {['Approve exhibits', 'Review comments', 'Assign staff roles'].map((item) => <button key={item} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-white hover:bg-white/8">{item}</button>)}
        </div>
      </article>
      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">System overview</h2>
        <ul className="mt-4 space-y-3 text-slate-200"> <li>• Staff role access enabled</li><li>• AR exhibits can be created or edited</li><li>• Messages and feedback are monitored</li></ul>
      </article>
    </div>
  );
}
