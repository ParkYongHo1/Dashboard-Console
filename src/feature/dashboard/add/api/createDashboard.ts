import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CreateDashboardResponse {
  dashboardId: string;
}

export const createDashboard = async (params: { dashboardName: string; tableName: string; dashboardDescription?: string }) => {
  const response = await apiClient.post<CreateDashboardResponse>(`${API_BASE_URL}/api/dashboard`, params);
  return response.data;
};
