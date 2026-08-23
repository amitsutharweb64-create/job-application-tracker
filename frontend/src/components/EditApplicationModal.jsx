import { useState } from "react";
import { updateApplication } from "../api/applicationApi";

function EditApplicationModal({
  application,
  onClose,
  fetchApplications,
}) {
  const [formData, setFormData] = useState({
    company: application.company || "",
    role: application.role || "",
    status: application.status || "Applied",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateApplication(application._id, formData);

      await fetchApplications();

      onClose();
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[420px] rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-xl font-semibold">
          Edit Application
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Role
            </label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-white"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditApplicationModal;