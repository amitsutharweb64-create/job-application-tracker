import ApplicationForm from "./components/ApplicationForm";
import ApplicationsTable from "./components/ApplicationsTable";
import InterviewPrep from "./components/InterviewPrep";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import { useState } from "react";

const pageContent = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Track and manage your job applications in one place.",
  },
  applications: {
    title: "Applications",
    subtitle: "View and organize all your job applications.",
  },
  "add-application": {
    title: "Add Application",
    subtitle: "Add a new job application to your tracker.",
  },
  stats: {
    title: "Statistics",
    subtitle: "See a quick overview of your application progress.",
  },
  prep: {
    title: "Interview Prep",
    subtitle: "Type a topic and practice questions for that interview.",
  },
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const currentPage = pageContent[activePage];

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="px-4 pb-8 pt-[145px] sm:px-6 md:ml-56 md:px-7 md:pt-24">
        <div className="mx-auto max-w-7xl space-y-4">
          <header>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {currentPage.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {currentPage.subtitle}
            </p>
          </header>

          {activePage === "dashboard" && <StatsCards />}

          {activePage === "applications" && <ApplicationsTable />}
          {activePage === "add-application" && <ApplicationForm />}
          {activePage === "stats" && <StatsCards />}
          {activePage === "prep" && <InterviewPrep />}
        </div>
      </main>
    </div>
  );
}

export default App;
