import { Pencil, Trash2 } from "lucide-react";

function ActionButtons({ onDelete, onEdit }) {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onEdit}
        type="button"
        aria-label="Edit application"
        className="grid h-8 w-8 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
      >
        <Pencil size={14} />
      </button>
      <button 
        onClick={onDelete}
        type="button"
        aria-label="Delete application"
        className="grid h-8 w-8 place-items-center rounded-md border border-red-100 text-red-500 transition hover:border-red-200 hover:bg-red-50 dark:border-red-500/25 dark:text-red-400 dark:hover:border-red-500/40 dark:hover:bg-red-500/10"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default ActionButtons;
