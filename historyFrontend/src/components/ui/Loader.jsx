const Loader = ({ label = 'Loading…' }) => {
  return (
    <div className="flex items-center justify-center rounded-3xl bg-slate-900/80 p-6 text-slate-300">
      <div className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
