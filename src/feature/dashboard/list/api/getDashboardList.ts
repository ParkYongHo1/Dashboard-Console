import { DashboardListResponse } from "@/entities/dashboard/dashboard-list/model/type";
import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDashboardList = async (params: { page: number; size: number }) => {
  const response = await apiClient.get<DashboardListResponse>(`${API_BASE_URL}/api/dashboards`, { params });
  return response.data;
};
