import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDateToISOStringNoSeconds = (date: Date): string => {
  return date.toISOString().slice(0, 16); // "2025-11-24T18:00"
};
export const getGroupDataStatistics = async (params: { dashboardId: string; selectGroupData: string; startDate: Date; endDate: Date }) => {
  const startDateStr = formatDateToISOStringNoSeconds(params.startDate);
  const endDateStr = formatDateToISOStringNoSeconds(params.endDate);

  const url = `${API_BASE_URL}/api/filterGroupData?dashboardId=${decodeURIComponent(params.dashboardId)}&selectGroupData=${encodeURIComponent(
    params.selectGroupData
  )}&startDate=${startDateStr}&endDate=${endDateStr}`;

  const response = await apiClient.get(url);
  return response.data;
};
