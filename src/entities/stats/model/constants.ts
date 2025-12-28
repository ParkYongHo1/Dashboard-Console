export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0"];

export const statQueryKeys = {
  all: ["statistics"] as const,
  group: (params: { dashboardId: string; selectGroupData: string; startDate: Date; endDate: Date }) => [...statQueryKeys.all, "group", params] as const,
  aggregate: (params: { dashboardId: string; selectGroupData: string; selectAggregatedData: string; startDate: Date; endDate: Date }) => [...statQueryKeys.all, "aggregate", params] as const,
};
