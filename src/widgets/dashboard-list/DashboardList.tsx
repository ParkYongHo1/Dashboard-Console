import { useDevice } from "@/shared/hooks/useDevice";
import { DashboardListDesktop } from "./ui/DashboardList.desktop";
import { DashboardListMobile } from "./ui/DashboardList.mobile";
import { useDashboardList } from "@/feature/dashboard/list/hooks/useDashboardList";
import ErrorPage from "@/pages/common/ErrorPage";
import { DashboardType } from "./model/type";

interface DashboardListProps {
  type?: DashboardType;
}

export const DashboardList = ({ type = "all" }: DashboardListProps) => {
  const { isMobile } = useDevice();
  const { data, isLoading, error, setPage } = useDashboardList({
    pageSize: 10,
    type,
  });

  if (error) return <ErrorPage />;

  return isMobile ? <DashboardListMobile /> : <DashboardListDesktop data={data} isLoading={isLoading} setPage={setPage} type={type} />;
};
