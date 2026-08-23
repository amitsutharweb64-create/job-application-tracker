import { Plus } from "lucide-react";
import { useState } from "react";
import { createApplication } from "../api/applicationApi.js";

const inputClass =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20";


function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function ApplicationForm() {   
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });     

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };  

  const saveApplication = async (event) => {
    event.preventDefault();

    try {
      const response = await createApplication(formData);
      alert(response.data.message);
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
      });
    } catch (error) {
      alert(error.response?.data?.message ||
        "Application save nahi hui");
    }
  };

  
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
      <h2 className="mb-4 text-base font-semibold text-violet-600 dark:text-violet-400">Add New Application</h2>

      <form onSubmit={saveApplication}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="Company Name">
            <input className={inputClass}
              type="text"
              name="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange} />
          </Field>

          <Field label="Role">
            <input className={inputClass}
              type="text"
              name="role"
              placeholder="Enter role"
              value={formData.role}
              onChange={handleChange} />
          </Field>

          <Field label="Status">
            <select className={inputClass}
              name="status"
              value={formData.status}
              onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>
          </Field>

          <Field label="Applied Date">
            <input className={inputClass}
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange} />
          </Field>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_auto] xl:items-end">
          <Field label="Notes (Optional)">
            <textarea
              className="min-h-12 w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this application..."
            />
          </Field>

          <button
            type="submit" className="flex h-11 items-center justify-center gap-2 rounded-md bg-violet-600 px-5 text-sm font-medium text-white"
          >
            <Plus size={15} />
            Add Application
          </button>
        </div>
      </form>
    </section>
  );
}

export default ApplicationForm;
