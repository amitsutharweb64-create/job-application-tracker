import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ActionButtons from "./ActionButtons";
import SearchFilters from "./SearchFilters";
import { getApplications, deleteApplication } from "../api/applicationApi"; 
import EditApplicationModal from "./EditApplicationModal";


// Status ke according badge color
const statusClass = {
  Applied: "bg-violet-100 text-violet-600",
  Interview: "bg-blue-100 text-blue-600",
  Rejected: "bg-red-100 text-red-600",
  Selected: "bg-emerald-100 text-emerald-700",
};
function ApplicationsTable() {    
  // MongoDB se aayi applications yahan store hongi
  const [applications, setApplications] = useState([]);  

  const [search, setSearch] = useState("");   
  const [status, setStatus] = useState("All Status");
  
  // Backend se applications lane ka function
  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data.data);
    } catch (error) {
      console.log("Applications fetch error:", error);
    }
  };
  // Component load hone par GET API call hogi
  useEffect(() => {
    fetchApplications();
  }, []);   

  const applicationDelete = async (id) => {
    try {
      const response = await deleteApplication(id);
      if (response.status === 200) {
        fetchApplications();
      }
    } catch (error) {
      console.log("Application delete error:", error);
    }
  };   

  const [editingApplication, setEditingApplication] = useState(null);    
  
  const filteredApplications = applications.filter((application) => {
    const searchValue = search.toLowerCase();
  
    const matchesSearch =
      application.company?.toLowerCase().includes(searchValue) ||
      application.role?.toLowerCase().includes(searchValue);
  
    const matchesStatus =
      status === "All Status" || application.status === status;
  
    return matchesSearch && matchesStatus;
  }); 
 
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-violet-600 dark:text-violet-400">
          My Applications
        </h2>

        <SearchFilters 
          search={search}
          setSearch={setSearch}   
          status={status}
           setStatus={setStatus}
        />
      </div>

      

      {/* Table */}
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

            {filteredApplications.map((application) => (

              <tr
                key={application._id}
                className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/60"
              >

                {/* Company */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">

                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                      {application.company?.charAt(0).toUpperCase()}
                    </span>

                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {application.company}
                    </span>

                  </div>
                </td>


                {/* Role */}
                <td className="px-4 py-3">
                  {application.role}
                </td>


                {/* Status */}
                <td className="px-4 py-3">

                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      statusClass[application.status] || ""
                    }`}
                  >
                    {application.status}
                  </span>

                </td>


                {/* Applied Date */}
                <td className="whitespace-nowrap px-4 py-3">
                  {application.appliedDate}
                </td>


                {/* Notes */}
                <td className="px-4 py-3">
                  {application.notes || "-"}
                </td>


                {/* Actions */}
                <td className="px-4 py-3"> 
                  <ActionButtons   
                    onEdit={() => setEditingApplication(application)}
                    onDelete={() => applicationDelete(application._id)}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>  

      </div>
      {editingApplication && (
        <EditApplicationModal
          application={editingApplication}
          onClose={() => setEditingApplication(null)}
          fetchApplications={fetchApplications}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800">

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {applications.length} results
        </p>

        <div className="flex items-center gap-1">

          <button
            type="button"
            aria-label="Previous page"
            className="grid h-7 w-7 place-items-center rounded border border-slate-200 text-slate-400 dark:border-slate-700"
          >
            <ChevronLeft size={13} />
          </button>

          <button
            type="button"
            className="h-7 min-w-7 rounded bg-violet-600 px-2 text-xs text-white"
          >
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
