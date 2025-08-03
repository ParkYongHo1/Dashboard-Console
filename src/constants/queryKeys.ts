export const QUERY_KEYS = {
  DASHBOARD: {
    LIST: (params: { page: number; size: number }) =>
      ["DASHBOARD", "LIST", params] as const,
    CREATE: (params: {
      dashboardName: string;
      databaseName: string;
      dashboardDescription: string;
    }) => ["DASHBOARD", "CREATE", params] as const,

    READ: (params: { dashboardId: string; status: string }) =>
      ["DASHBOARD", "READ", params] as const,

    DETAIL: (id: string) => ["DASHBOARD", "DETAIL", id] as const,
  },

  STATISTICS: {
    GROUP: (params: {
      dashboardId: string;
      selectGroupData: string;
      startDate: Date;
      endDate: Date;
    }) => ["STATISTICS", "GROUP", params] as const,
    AGGREGATE: (params: {
      dashboardId: string;
      selectGroupData: string;
      selectAggregatedData: string;
      startDate: Date;
      endDate: Date;
    }) => ["STATISTICS", "AGGREGATE", params] as const,
  },
} as const;
