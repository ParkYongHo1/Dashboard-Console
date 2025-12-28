import { statQueryKeys } from "@/entities/stats/model/constants";
import { getAggregatedDataStatistics } from "@/feature/stats/api/getAggregatedDataStatistics";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseCrossTableDataParams {
  dashboardId: string;
  selectGroupData: string;
  aggregatedItems: { value: string; label: string }[];
  dateRange: { startDate: Date; endDate: Date };
  enabled?: boolean;
}

export const useCrossTableData = ({ dashboardId, selectGroupData, aggregatedItems, dateRange, enabled = true }: UseCrossTableDataParams) => {
  const queries = useQueries({
    queries: aggregatedItems.map((aggregated) => ({
      queryKey: statQueryKeys.aggregate({
        dashboardId,
        selectGroupData,
        selectAggregatedData: aggregated.value,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      queryFn: () =>
        getAggregatedDataStatistics({
          dashboardId,
          selectGroupData,
          selectAggregatedData: aggregated.value,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
      enabled: Boolean(enabled && dashboardId && selectGroupData && aggregated.value),
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const matrixData = useMemo(() => {
    if (queries.length === 0) return [];

    const firstData = queries[0]?.data;
    const rowCount = firstData?.aggregatedDataList?.length || 0;

    if (rowCount === 0) return [];

    const matrix: number[][] = Array.from({ length: rowCount }, () => Array.from({ length: aggregatedItems.length }, () => 0));

    queries.forEach((query, aggIndex) => {
      const aggregatedDataList = query.data?.aggregatedDataList || [];
      aggregatedDataList.forEach((value: number, groupIndex: number) => {
        if (matrix[groupIndex]) {
          matrix[groupIndex][aggIndex] = value;
        }
      });
    });

    return matrix;
  }, [queries, aggregatedItems.length]);

  const refetchAll = () => {
    queries.forEach((q) => q.refetch());
  };

  return { matrixData, isLoading, isError, refetchAll };
};
