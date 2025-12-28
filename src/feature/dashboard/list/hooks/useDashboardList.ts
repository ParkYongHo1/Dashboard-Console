import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";
import { getDashboardList } from "../api/getDashboardList";

interface UseDashboardListOptions {
  pageSize?: number;
  type?: "all" | "stats";
}

export const useDashboardList = ({ pageSize = 10, type = "all" }: UseDashboardListOptions = {}) => {
  const [page, setPage] = useState(1);

  const limit = type === "stats" ? 100 : pageSize;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: dashboardQueryKeys.list({ page, size: limit }),
    queryFn: () => getDashboardList({ page, size: limit }),
    placeholderData: keepPreviousData,
  });

  const filteredData = useMemo(() => {
    if (!data || type === "all") return data;

    const completed = data.dashboardList.filter((d) => d.dashboardStatus === "COMPLETED");

    return {
      ...data,
      dashboardList: completed,
      totalCount: completed.length,
    };
  }, [data, type]);

  return {
    data: filteredData,
    isLoading,
    error,
    page,
    setPage,
    pageSize,
    refetch,
  };
};
