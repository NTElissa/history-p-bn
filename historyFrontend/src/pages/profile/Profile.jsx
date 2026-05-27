import { useAuth } from '../../contexts/AuthContext.jsx';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h2 className="text-2xl font-semibold text-white">Profile</h2>
        <p className="mt-2 text-slate-400">Review your account details and role permissions for museum management.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.name || 'Guest'}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.email || 'n/a'}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Role</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.role || 'viewer'}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Member since</p>
            <p className="mt-3 text-xl font-semibold text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
        <h3 className="text-lg font-semibold text-white">Access summary</h3>
        <p className="mt-3 text-slate-400">Your role defines what parts of the museum system you can edit or manage.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Authenticated</p>
            <p className="mt-4 text-2xl font-semibold text-white">{user ? 'Yes' : 'No'}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Role</p>
            <p className="mt-4 text-2xl font-semibold text-white">{user?.role || 'visitor'}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Backend</p>
            <p className="mt-4 text-2xl font-semibold text-white">HistoryBackend</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
