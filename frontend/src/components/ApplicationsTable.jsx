import { useEffect, useState } from "react";

import ActionButtons from "./ActionButtons";
import SearchFilters from "./SearchFilters";
import { getApplications, deleteApplication } from "../api/applicationApi";
import EditApplicationModal from "./EditApplicationModal";
import Pagination from "./Pagination";

// Status ke according badge color
const statusClass = {
  Applied: "bg-violet-100 text-violet-600",
  Interview: "bg-blue-100 text-blue-600",
  Rejected: "bg-red-100 text-red-600",
  Selected: "bg-emerald-100 text-emerald-700",
};

function formatAppliedDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function ApplicationsTable() {
  // MongoDB se aayi applications
  const [applications, setApplications] = useState([]);

  // Search and filter
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  // Edit application
  const [editingApplication, setEditingApplication] = useState(null);

  // Backend se applications lane ka function
  const fetchApplications = async () => {
    try {
      const response = await getApplications(currentPage, 10);

      // Current page ki applications
      setApplications(response.data.data);

      // Pagination information
      setTotalPages(response.data.pagination.totalPages || 1);
      setTotalApplications(
        response.data.pagination.totalApplications ??
          response.data.pagination.totalapplication ??
          0
      );
    } catch (error) {
      console.log("Applications fetch error:", error);
    }
  };

  // Component load hone par aur page change hone par API call
  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  // Delete application
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

  // Search + Status filter
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

          {/* Table Header */}
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

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-300">

            {filteredApplications.length > 0 ? (

              filteredApplications.map((application) => (

                <tr
                  key={application._id}
                  className="transition hover:bg-slate-50/70 dark:hover:bg-slate-800/60"
                >

                  {/* Company */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-2.5">

                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                        {application.company
                          ?.charAt(0)
                          .toUpperCase()}
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
                    {formatAppliedDate(application.appliedDate)}
                  </td>

                  {/* Notes */}
                  <td className="px-4 py-3">
                    {application.notes || "-"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">

                    <ActionButtons
                      onEdit={() =>
                        setEditingApplication(application)
                      }
                      onDelete={() =>
                        applicationDelete(application._id)
                      }
                    />

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No applications found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Edit Modal */}
      {editingApplication && (
        <EditApplicationModal
          application={editingApplication}
          onClose={() => setEditingApplication(null)}
          fetchApplications={fetchApplications}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 dark:border-slate-800">

        {/* Results */}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {applications.length} of {totalApplications} results
        </p>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      </div>

    </section>
  );
}

export default ApplicationsTable;
