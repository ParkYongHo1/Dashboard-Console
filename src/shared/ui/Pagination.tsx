import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={cn("p-2 rounded-lg transition-colors", hasPrev ? "hover:bg-muted cursor-pointer text-foreground" : "text-muted-foreground/30 cursor-not-allowed")}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 px-2">
        <span className="text-[14px] font-medium text-foreground">{currentPage}</span>
        <span className="text-[14px] text-muted-foreground/50">/</span>
        <span className="text-[14px] text-muted-foreground">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={cn("p-2 rounded-lg transition-colors", hasNext ? "hover:bg-muted cursor-pointer text-foreground" : "text-muted-foreground/30 cursor-not-allowed")}
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
