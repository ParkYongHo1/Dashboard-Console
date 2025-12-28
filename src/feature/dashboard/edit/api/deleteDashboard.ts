import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteDashboard = async (params: { dashboardId: string }) => {
  const response = await apiClient.delete(`${API_BASE_URL}/api/dashboard`, {
    data: params,
  });

  return response.data;
};
