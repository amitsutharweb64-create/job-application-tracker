import { ChevronLeft, ChevronRight } from "lucide-react";
import ActionButtons from "./ActionButtons";
import SearchFilters from "./SearchFilters";

const applications = [
  {
    company: "Infosys",
    role: "MERN Stack Intern",
    status: "Applied",
    date: "18 Aug 2026",
    notes: "-",
    initial: "I",
    avatar: "bg-violet-500",
  },
  {
    company: "TCS",
    role: "React Developer",
    status: "Interview",
    date: "15 Aug 2026",
    notes: "HR Round done",
    initial: "T",
    avatar: "bg-sky-500",
  },
  {
    company: "Wipro",
    role: "Web Developer",
    status: "Rejected",
    date: "10 Aug 2026",
    notes: "-",
    initial: "W",
    avatar: "bg-red-500",
  },
  {
    company: "Google",
    role: "Frontend Intern",
    status: "Selected",
    date: "05 Aug 2026",
    notes: "Joining next month",
    initial: "G",
    avatar: "bg-emerald-500",
  },
];

const statusClass = {
  Applied: "bg-violet-100 text-violet-600",
  Interview: "bg-blue-100 text-blue-600",
  Rejected: "bg-red-100 text-red-600",
  Selected: "bg-emerald-100 text-emerald-700",
};

function ApplicationsTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-violet-600 dark:text-violet-400">My Applications</h2>
        <SearchFilters />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-300">
            {applications.map((application) => (
              <tr key={application.company} className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold text-white ${application.avatar}`}
                    >
                      {application.initial}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{application.company}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{application.role}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-1 text-xs font-medium ${statusClass[application.status]}`}>
                    {application.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">{application.date}</td>
                <td className="px-4 py-3">{application.notes}</td>
                <td className="px-4 py-3">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">Showing 1 to 4 of 4 results</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            className="grid h-7 w-7 place-items-center rounded border border-slate-200 text-slate-400 dark:border-slate-700"
          >
            <ChevronLeft size={13} />
          </button>
          <button type="button" className="h-7 min-w-7 rounded bg-violet-600 px-2 text-xs text-white">
            1
          </button>
          <button
            type="button"
            aria-label="Next page"
            className="grid h-7 w-7 place-items-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ApplicationsTable;
