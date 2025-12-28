import { LinkedButton } from "@/shared/ui/LinkedButton";
import { Plus } from "lucide-react";
import { DashboardListResponse } from "@/entities/dashboard/dashboard-list/model/type";
import { DashboardEmpty } from "./DashboardEmpty";
import { DashboardListSkeleton } from "./DashboardSkeleton";
import { DashboardTable } from "./DashboardTable";
import { DashboardType } from "../model/type";

interface DashboardListDesktopProps {
  data?: DashboardListResponse;
  isLoading: boolean;
  setPage: (page: number) => void;
  type: DashboardType;
}

const PAGE_CONFIG = {
  all: {
    subtitle: "한눈에 보는",
    title: "대시보드",
    showAddButton: true,
  },
  stats: {
    subtitle: "완료된",
    title: "통계 현황",
    showAddButton: false,
  },
};

export const DashboardListDesktop = ({ data, isLoading, setPage, type }: DashboardListDesktopProps) => {
  const config = PAGE_CONFIG[type];

  const renderContent = () => {
    if (isLoading) return <DashboardListSkeleton />;
    if (!data?.dashboardList?.length) return <DashboardEmpty />;
    return <DashboardTable data={data} setPage={setPage} type={type} />;
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[14px] text-muted-foreground">{config.subtitle}</p>
            <h1 className="text-[32px] font-bold text-foreground">{config.title}</h1>
          </div>
          {config.showAddButton && (
            <LinkedButton to="/add-dashboard" variant="ghost" size="md">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              추가
            </LinkedButton>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
