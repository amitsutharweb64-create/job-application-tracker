import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex items-center gap-2">

      {/* Previous */}
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid h-7 w-7 place-items-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page */}
      <span className="text-xs text-slate-600">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid h-7 w-7 place-items-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={14} />
      </button>

    </div>
  );
}

export default Pagination;