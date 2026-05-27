export default function Audio() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Audio gallery</h2>
        <p className="mt-2 text-slate-300">Play museum narration and instrument soundscapes for each exhibit.</p>
        <div className="mt-6 space-y-3">
          {['Rwanda Heritage', 'Crocodile Story', 'Snake Legend'].map((title) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4"> <h3 className="text-white font-semibold">{title}</h3><p className="text-sm text-slate-300">Audio clip ready for AR overlay.</p></div>
          ))}
        </div>
      </article>
      <article className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white">Playback panel</h2>
        <p className="mt-2 text-slate-300">This is where your front-end can attach audio controls and narration playback.</p>
        <button className="mt-6 w-full rounded-2xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950">Play selected narration</button>
      </article>
    </div>
  );
}
