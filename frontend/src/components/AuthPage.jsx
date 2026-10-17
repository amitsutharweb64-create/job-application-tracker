import { BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signIn, signUp } from "../api/authApi";

function AuthPage({ onAuthenticated, onBack, initialSignUp = false }) {
  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const switchMode = () => {
    setIsSignUp((current) => !current);
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const response = await signUp(form);
        toast.success(response.data.message || "Account created. Please sign in.");
        setIsSignUp(false);
        setForm({ name: "", email: form.email, password: "" });
      } else {
        const response = await signIn({ email: form.email, password: form.password });
        toast.success(response.data.message || "Welcome back!");
        onAuthenticated(response.data.user);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reach the server. Check the API URL and allowed frontend origin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <section className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500"><BriefcaseBusiness size={21} /></span>
          Job Application Tracker
        </div>
        <div className="max-w-md">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.24em] text-violet-300">Stay organised</p>
          <h1 className="text-5xl font-semibold leading-tight">Keep every opportunity in one place.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Track applications, follow-ups and your job-search progress without losing momentum.</p>
        </div>
        <p className="text-sm text-slate-400">Your next role starts with a clear plan.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 text-white"><BriefcaseBusiness size={21} /></span>
            <span className="font-semibold text-slate-900">Job Application Tracker</span>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
            {onBack && <button type="button" onClick={onBack} className="mb-5 text-sm font-medium text-slate-500 hover:text-violet-600">← Back to home</button>}
            <p className="text-sm font-medium text-violet-600">{isSignUp ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{isSignUp ? "Start tracking today" : "Sign in to your account"}</h2>
            <p className="mt-2 text-sm text-slate-500">{isSignUp ? "Create an account to organise your job search." : "Enter your details to continue to your dashboard."}</p>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              {isSignUp && <label className="block text-sm font-medium text-slate-700">Full name
                <span className="relative mt-1.5 block"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required name="name" value={form.name} onChange={updateField} placeholder="Your name" className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></span>
              </label>}
              <label className="block text-sm font-medium text-slate-700">Email address
                <span className="relative mt-1.5 block"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required type="email" name="email" value={form.email} onChange={updateField} placeholder="you@example.com" className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></span>
              </label>
              <label className="block text-sm font-medium text-slate-700">Password
                <span className="relative mt-1.5 block"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required minLength="6" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={updateField} placeholder="At least 6 characters" className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-11 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /><button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" type="button" onClick={() => setShowPassword((current) => !current)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span>
              </label>
              <button disabled={isSubmitting} className="mt-2 w-full rounded-lg bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}</button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">{isSignUp ? "Already have an account?" : "New here?"} <button type="button" onClick={switchMode} className="font-semibold text-violet-600 hover:text-violet-700">{isSignUp ? "Sign in" : "Create an account"}</button></p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;
