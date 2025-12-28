import { DashboardListResponse } from "@/entities/dashboard/dashboard-list/model/type";
import { DashboardItem } from "@/entities/dashboard/dashboard-list/ui/DashboardItem";
import { DashboardType } from "../model/type";
import { Pagination } from "@/shared/ui/Pagination";
import { StatusTooltip } from "@/entities/dashboard/dashboard-list/ui/StatusTooltip";

interface DashboardTableProps {
  data: DashboardListResponse;
  setPage: (page: number) => void;
  type: DashboardType;
}

export const DashboardTable = ({ data, setPage, type }: DashboardTableProps) => {
  const isStats = type === "stats";

  return (
    <div className="bg-card rounded-2xl shadow-md border border-border/50">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          총 <span className="font-semibold text-foreground">{data?.totalCount}</span>건
        </p>
      </div>
      <div className={isStats ? "" : "min-h-[760px] flex flex-col"}>
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
                  <StatusTooltip />
                </div>
              </th>
              <th className="w-[7%] px-5 py-2.5 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">{isStats ? "보기" : "수정"}</th>
            </tr>
          </thead>
          <tbody>
            {data.dashboardList.map((e) => (
              <DashboardItem key={e.dashboardId} item={e} type={type} />
            ))}
          </tbody>
        </table>

        {!isStats && <div className="flex-1" />}

        {!isStats && data.totalPages > 1 && (
          <div className="border-t border-border">
            <Pagination currentPage={data.currentPage} totalPages={data.totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};
