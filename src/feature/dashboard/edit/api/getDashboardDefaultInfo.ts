import { apiClient } from "@/shared/lib/interceptors";
import { DashboardDefaultInfo, DashboardDetailInfo, DatabaseColumn } from "@/stores/dashboardStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface DashboardDefaultInfoResponse {
  createdAt: string;
  updatedAt: string;
  databaseColumnList: DatabaseColumn[];
  dashboardDefaultInfo: DashboardDefaultInfo;
  dashboardDetailInfo: DashboardDetailInfo;
}

export const getDashboardDefaultInfo = async (params: { dashboardId: string; status: string }) => {
  const response = await apiClient.get<DashboardDefaultInfoResponse>(`${API_BASE_URL}/api/dashboard`, { params });

  return response.data;
};
