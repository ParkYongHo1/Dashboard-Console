export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  lists: () => [...dashboardQueryKeys.all, "list"] as const,
  list: (params: { page: number; size: number }) => [...dashboardQueryKeys.lists(), params] as const,
  read: (params: { dashboardId: string; status: string }) => [...dashboardQueryKeys.all, "read", params] as const,
  detail: (id: string) => [...dashboardQueryKeys.all, "detail", id] as const,
};
