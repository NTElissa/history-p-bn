export default function Profile() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-white">Profile</h2>
      <p className="mt-2 text-slate-300">This profile view can be connected to user details and role-based permissions.</p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="text-sm text-slate-300">Role</p>
        <p className="text-lg font-semibold text-white">Visitor / Staff / Admin</p>
      </div>
    </div>
  );
}
