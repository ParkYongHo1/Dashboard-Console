import { Skeleton } from "@/shared/ui/Skeleton";
import { HelpCircle } from "lucide-react";

export const DashboardListSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-border/50">
      <div className="px-5 py-3 border-b border-border flex items-center">
        <span className="text-[13px] text-muted-foreground">총</span>
        <Skeleton className="h-4 w-6 mx-1" />
        <span className="text-[13px] text-muted-foreground">건</span>
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="w-[15%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">이름</th>
            <th className="w-[40%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">설명</th>
            <th className="w-[12%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">생성일</th>
            <th className="w-[12%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">수정일</th>
            <th className="w-[14%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
              <div className="flex items-center gap-1 justify-center">
                상태
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
              </div>
            </th>
            <th className="w-[7%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">수정</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="px-5 py-4 text-left">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-5 py-4 text-left">
                <Skeleton className="h-4 w-full" />
              </td>
              <td className="px-5 py-4 text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>
              <td className="px-5 py-4 text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </td>
              <td className="px-5 py-4 text-center">
                <Skeleton className="h-6 w-16 mx-auto rounded-md" />
              </td>
              <td className="px-5 py-4 text-center">
                <Skeleton className="h-8 w-8 mx-auto rounded-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
