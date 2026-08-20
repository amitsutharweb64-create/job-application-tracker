import { Search } from "lucide-react";

function SearchFilters() {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <label className="relative block sm:w-72">
        <span className="sr-only">Search applications</span>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input
          type="search"
          placeholder="Search by company or role..."
          className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
        />
      </label>

      <label>
        <span className="sr-only">Filter applications by status</span>
        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-500 dark:focus:ring-violet-500/20 sm:w-40">
          <option>All Status</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>
      </label>
    </div>
  );
}

export default SearchFilters;
