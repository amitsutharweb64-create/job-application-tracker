import {
  CircleCheck,
  CircleUserRound,
  FileText,
  XCircle,
} from "lucide-react";

function StatsCards({ application =[] }) {
  const totalApplications = application.length;

  const interviewCount = application.filter(
    (e) => e.status === "Interview"
  ).length;

  const rejectedCount = application.filter(
    (e) => e.status === "Rejected"
  ).length;

  const selectedCount = application.filter(
    (e) => e.status === "Selected"
  ).length;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      helper: "Applications you've sent",
      icon: FileText,
      cardClass:
        "border-violet-200 bg-violet-50/50 dark:border-violet-500/25 dark:bg-violet-500/10",
      iconClass:
        "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
    },
    {
      label: "Interview",
      value: interviewCount,
      helper: "Applications in interview",
      icon: CircleUserRound,
      cardClass:
        "border-blue-200 bg-blue-50/50 dark:border-blue-500/25 dark:bg-blue-500/10",
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      helper: "Applications rejected",
      icon: XCircle,
      cardClass:
        "border-red-200 bg-red-50/50 dark:border-red-500/25 dark:bg-red-500/10",
      iconClass:
        "bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-300",
    },
    {
      label: "Selected",
      value: selectedCount,
      helper: "Congratulations!",
      icon: CircleCheck,
      cardClass:
        "border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/25 dark:bg-emerald-500/10",
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
    },
  ];

  return (
    <section
      aria-label="Application statistics"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map(
        ({ label, value, helper, icon: Icon, cardClass, iconClass }) => (
          <article
            key={label}
            className={`rounded-xl border p-5 ${cardClass}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${iconClass}`}
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-none text-slate-900 dark:text-slate-100">
                  {value}
                </p>

                <h2 className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {label}
                </h2>

                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {helper}
                </p>
              </div>
            </div>
          </article>
        )
      )}
    </section>
  );
}

export default StatsCards;