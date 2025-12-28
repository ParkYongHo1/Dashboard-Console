import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDateToISOStringNoSeconds = (date: Date): string => {
  return date.toISOString().slice(0, 16); // "2025-11-24T18:00"
};

export const getAggregatedDataStatistics = async (params: { dashboardId: string; selectGroupData: string; selectAggregatedData: string; startDate: Date; endDate: Date }) => {
  const startDateStr = formatDateToISOStringNoSeconds(params.startDate);
  const endDateStr = formatDateToISOStringNoSeconds(params.endDate);

  const url = `${API_BASE_URL}/api/filterData?dashboardId=${decodeURIComponent(params.dashboardId)}&selectGroupData=${encodeURIComponent(
    params.selectGroupData
  )}&selectAggregatedData=${encodeURIComponent(params.selectAggregatedData)}&startDate=${startDateStr}&endDate=${endDateStr}`;

  const response = await apiClient.get(url);
  return response.data;
};
