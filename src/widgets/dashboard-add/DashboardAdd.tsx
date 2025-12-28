import { DashboardDefaultInfo } from "@/feature/dashboard/add/ui/DashboardDefaultInfo";
import { useDevice } from "@/shared/hooks/useDevice";

export const DashboardAdd = () => {
  const { isMobile } = useDevice();
  return isMobile ? <DashboardDefaultInfo /> : <DashboardDefaultInfo />;
};
