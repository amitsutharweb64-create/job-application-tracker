import { ArrowRight, BarChart3, BriefcaseBusiness, LockKeyhole, PlusCircle, ShieldCheck } from "lucide-react";

const features = [
  { icon: PlusCircle, title: "Track every application", text: "Save the company, role, application date and notes in one organised workspace." },
  { icon: BarChart3, title: "See your progress", text: "Understand your interview, selected and rejected application totals at a glance." },
  { icon: ShieldCheck, title: "Private by default", text: "Your applications are linked to your account and visible only after you sign in." },
];

function LandingPage({ onSignIn, onSignUp }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3 font-semibold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500"><BriefcaseBusiness size={21} /></span>Job Application Tracker</div>
        <div className="flex items-center gap-3"><button onClick={onSignIn} className="text-sm font-medium text-slate-200 hover:text-white">Sign in</button><button onClick={onSignUp} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-violet-100">Create account</button></div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-sm font-medium text-violet-200"><LockKeyhole size={15} /> A focused, private job search</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Turn your job search into a clear plan.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Keep every application, outcome and follow-up in one place. Create your free account to start tracking.</p>
          <div className="mt-9 flex flex-wrap gap-3"><button onClick={onSignUp} className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-3 font-semibold hover:bg-violet-400">Get started <ArrowRight size={18} /></button><button onClick={onSignIn} className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-100 hover:bg-slate-800">I already have an account</button></div>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-violet-950/40 sm:p-8">
          <div className="flex items-center justify-between"><p className="font-semibold">Your application journey</p><span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">Sign in required</span></div>
          <div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-800 p-4"><p className="text-3xl font-semibold">—</p><p className="mt-1 text-sm text-slate-400">Applications</p></div><div className="rounded-xl bg-slate-800 p-4"><p className="text-3xl font-semibold">—</p><p className="mt-1 text-sm text-slate-400">Interviews</p></div></div>
          <p className="mt-6 rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400">Create an account or sign in to view and manage your personal dashboard.</p>
        </div>
      </section>
      <section className="border-t border-slate-800 bg-slate-900/50"><div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 sm:grid-cols-3 sm:px-8">{features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><Icon className="text-violet-300" size={22} /><h2 className="mt-4 font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></article>)}</div></section>
    </main>
  );
}

export default LandingPage;
