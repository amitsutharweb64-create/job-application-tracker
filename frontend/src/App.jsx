import ApplicationForm from "./components/ApplicationForm";
import ApplicationsTable from "./components/ApplicationsTable";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getApplications } from "./api/applicationApi.js";
import AuthPage from "./components/AuthPage";
import { getCurrentUser, signOut } from "./api/authApi";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";

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
  profile: {
    title: "Profile",
    subtitle: "Manage your personal account details.",
  },
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [screen, setScreen] = useState("landing");
  const currentPage = pageContent[activePage];  

  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data.data);    
       
    } catch (error) {
      console.error("Applications fetch error:", error);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setUser(response.data.user);
        setScreen("dashboard");
      })
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      setApplications([]);
      setUser(null);
      setScreen("landing");
    }
  };

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
    setScreen("dashboard");
  };

  if (checkingSession) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">Loading your workspace...</div>;
  if (!user && screen === "landing") return <><Toaster richColors position="top-right" closeButton /><LandingPage onSignIn={() => setScreen("login")} onSignUp={() => setScreen("signup")} /></>;
  if (!user) return <><Toaster richColors position="top-right" closeButton /><AuthPage onAuthenticated={handleAuthenticated} onBack={() => setScreen("landing")} initialSignUp={screen === "signup"} /></>;

  return (   
    <>
    <Toaster richColors position="top-right" closeButton />
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <Navbar activePage={activePage} onNavigate={setActivePage} user={user} onLogout={handleLogout} />
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

          {activePage === "dashboard" && <StatsCards application={applications} />}

          {activePage === "applications" && <ApplicationsTable />}
          {activePage === "add-application" && <ApplicationForm />}
          {activePage === "stats" && <StatsCards application={applications} />}
          {activePage === "profile" && <ProfilePage user={user} onUpdated={setUser} />}
        </div>
      </main>
      </div>  
    </>
  );
}

export default App;
