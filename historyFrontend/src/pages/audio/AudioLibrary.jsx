import { useEffect, useState } from 'react';
import { getExhibits } from '../../api/exhibitApi.js';
import Loader from '../../components/ui/Loader.jsx';

const AudioLibrary = () => {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAudioExhibits = async () => {
      try {
        const data = await getExhibits();
        setExhibits(data.filter((item) => item.audioUrl));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAudioExhibits();
  }, []);

  if (loading) {
    return <Loader label="Loading audio library…" />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Audio narratives</h2>
            <p className="mt-2 text-slate-400">Browse all AR audio experiences and play immersive museum stories directly in the dashboard.</p>
          </div>
        </div>

        {exhibits.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-slate-400">No audio exhibits are available yet.</div>
        ) : (
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {exhibits.map((item) => (
              <div key={item._id} className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                  </div>
                  <span className="rounded-3xl bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                    {item.arFrameworkType}
                  </span>
                </div>
                <audio controls className="w-full rounded-3xl bg-slate-900 p-3">
                  <source src={item.audioUrl} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;
