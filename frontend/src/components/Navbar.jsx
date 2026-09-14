import {
  BarChart3,
  BriefcaseBusiness,
  Files,
  LayoutDashboard,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: Files },
  { id: "add-application", label: "Add Application", icon: Plus },
  { id: "stats", label: "Stats", icon: BarChart3 },
];

function Navbar({ activePage, onNavigate }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("job-tracker-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("job-tracker-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-t-[5px] border-t-black border-b border-slate-200 bg-white px-4 transition-colors dark:border-b-slate-700 dark:bg-slate-900 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <BriefcaseBusiness
            aria-hidden="true"
            className="shrink-0 fill-slate-700 text-slate-700"
            size={20}
          />
          <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[17px]">
            Job Application Tracker
          </h1>
        </div>

        <div className="ml-3 flex shrink-0 items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            aria-label="Use light theme"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
            className={`grid h-7 w-7 place-items-center rounded-full transition ${
              theme === "light"
                ? "bg-slate-100 text-amber-500 dark:bg-slate-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            }`}
          >
            <Sun size={14} />
          </button>
          <button
            type="button"
            aria-label="Use dark theme"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
            className={`grid h-7 w-7 place-items-center rounded-full transition ${
              theme === "dark"
                ? "bg-slate-700 text-violet-300"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Moon size={14} />
          </button>
        </div>
      </header>

      <aside className="fixed bottom-0 left-0 top-16 hidden w-56 border-r border-slate-200 bg-white px-3 py-4 transition-colors dark:border-slate-700 dark:bg-slate-900 md:block">
        <nav aria-label="Main navigation" className="space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition ${
                activePage === id
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 top-16 z-40 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 transition-colors dark:border-slate-700 dark:bg-slate-900 md:hidden"
      >
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
              activePage === id
                ? "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
                : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

export default Navbar;
