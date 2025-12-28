import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";
import { statQueryKeys } from "@/entities/stats/model/constants";
import { getDashboardDefaultInfo } from "@/feature/dashboard/edit/api/getDashboardDefaultInfo";
import { getGroupDataStatistics } from "@/feature/stats/api/getGroupDataStatistics";
import { getAggregatedDataStatistics } from "@/feature/stats/api/getAggregatedDataStatistics";
import { useCrossTableData } from "@/widgets/stats/table/hooks/useCrossTableData";

interface FilterData {
  groupDataList: number[];
  aggregatedDataList?: number[];
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

const getInitialDateRange = (): DateRange => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);
  return { startDate, endDate: today };
};

export const useStatsPageData = () => {
  // URL 파라미터
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const decodedDashboardId = decodeURIComponent(dashboardId!);

  // 로컬 상태
  const [groupItem, setGroupItem] = useState("");
  const [aggregatedGroupItem, setAggregatedGroupItem] = useState("");
  const [aggregatedItem, setAggregatedItem] = useState("");
  const [crossTableGroupItem, setCrossTableGroupItem] = useState("");
  const [dateRange, setDateRange] = useState(getInitialDateRange);
  const [refreshKey, setRefreshKey] = useState(0);

  // 대시보드 데이터 조회
  const { data: dashboardData } = useQuery({
    queryKey: dashboardQueryKeys.read({
      dashboardId: decodedDashboardId,
      status: "COMPLETED",
    }),
    queryFn: () =>
      getDashboardDefaultInfo({
        dashboardId: decodedDashboardId,
        status: "COMPLETED",
      }),
    enabled: Boolean(dashboardId),
  });

  // 파생 데이터: 옵션들
  const groupItemOptions = useMemo(() => {
    if (!Array.isArray(dashboardData?.dashboardDetailInfo.groupData)) return [];
    const seen = new Set<string>();
    return dashboardData.dashboardDetailInfo.groupData
      .filter((item) => {
        if (seen.has(item.databaseColumn)) return false;
        seen.add(item.databaseColumn);
        return true;
      })
      .map((item) => ({
        value: item.databaseColumn,
        label: item.databaseColumnAlias,
      }));
  }, [dashboardData?.dashboardDetailInfo.groupData]);

  const aggregatedItemOptions = useMemo(() => {
    if (!Array.isArray(dashboardData?.dashboardDetailInfo.aggregatedData)) return [];
    return dashboardData.dashboardDetailInfo.aggregatedData.map((item) => ({
      value: item.databaseColumnAlias,
      label: item.databaseColumnAlias,
    }));
  }, [dashboardData?.dashboardDetailInfo.aggregatedData]);

  const groupLabels = useMemo(() => {
    if (!Array.isArray(dashboardData?.dashboardDetailInfo.groupData)) return [];
    return dashboardData.dashboardDetailInfo.groupData.map((item) => item.databaseColumnAlias);
  }, [dashboardData?.dashboardDetailInfo.groupData]);

  // 초기값 설정
  useEffect(() => {
    if (groupItemOptions.length > 0) {
      setGroupItem(groupItemOptions[0].value);
      setAggregatedGroupItem(groupItemOptions[0].value);
      setCrossTableGroupItem(groupItemOptions[0].value);
    }
  }, [groupItemOptions]);

  useEffect(() => {
    if (aggregatedItemOptions.length > 0) {
      setAggregatedItem(aggregatedItemOptions[0].label);
    }
  }, [aggregatedItemOptions]);

  // 그룹 통계 데이터
  const { data: groupFilterData, refetch: refetchGroupFilterData } = useQuery<FilterData | null>({
    queryKey: statQueryKeys.group({
      dashboardId: decodedDashboardId,
      selectGroupData: groupItem,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }),
    queryFn: async () => {
      if (!dashboardId || !groupItem) return null;
      return getGroupDataStatistics({
        dashboardId: decodedDashboardId,
        selectGroupData: groupItem,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }) as Promise<FilterData | null>;
    },
    enabled: Boolean(dashboardId && groupItem),
  });

  // 집계 통계 데이터
  const { data: aggregatedFilterData, refetch: refetchAggregatedFilterData } = useQuery<FilterData | null>({
    queryKey: statQueryKeys.aggregate({
      dashboardId: decodedDashboardId,
      selectGroupData: aggregatedGroupItem,
      selectAggregatedData: aggregatedItem,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }),
    queryFn: async () => {
      if (!dashboardId || !aggregatedGroupItem || !aggregatedItem) return null;
      return getAggregatedDataStatistics({
        dashboardId: decodedDashboardId,
        selectGroupData: aggregatedGroupItem,
        selectAggregatedData: aggregatedItem,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }) as Promise<FilterData | null>;
    },
    enabled: Boolean(dashboardId && aggregatedGroupItem && aggregatedItem),
  });

  // 교차 테이블 데이터
  const {
    matrixData,
    isLoading: isMatrixLoading,
    refetchAll: refetchMatrix,
  } = useCrossTableData({
    dashboardId: decodedDashboardId,
    selectGroupData: crossTableGroupItem,
    aggregatedItems: aggregatedItemOptions,
    dateRange,
    enabled: Boolean(dashboardId && crossTableGroupItem && aggregatedItemOptions.length > 0),
  });

  // 차트 데이터 변환
  const groupChartData = useMemo(() => {
    if (!groupFilterData?.groupDataList) return [];
    return groupFilterData.groupDataList.map((value, index) => ({
      name: groupLabels[index] || `항목 ${index + 1}`,
      value,
    }));
  }, [groupFilterData, groupLabels]);

  const aggregatedChartData = useMemo(() => {
    if (!aggregatedFilterData?.aggregatedDataList) return [];
    return aggregatedFilterData.aggregatedDataList.map((value, index) => ({
      name: groupLabels[index] || `항목 ${index + 1}`,
      value,
    }));
  }, [aggregatedFilterData, groupLabels]);

  // 항목 변경 시 refetch
  useEffect(() => {
    if (dashboardId && groupItem) refetchGroupFilterData();
  }, [groupItem, dashboardId]);

  useEffect(() => {
    if (dashboardId && aggregatedGroupItem && aggregatedItem) refetchAggregatedFilterData();
  }, [aggregatedGroupItem, aggregatedItem, dashboardId]);

  // 액션 핸들러
  const handleDateChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  const handleRefresh = async () => {
    const promises = [];
    if (dashboardId && groupItem) promises.push(refetchGroupFilterData());
    if (dashboardId && aggregatedGroupItem && aggregatedItem) promises.push(refetchAggregatedFilterData());
    refetchMatrix();
    await Promise.all(promises);
  };

  const handleForceUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return {
    // 상태
    dateRange,
    refreshKey,

    // 그룹 섹션
    groupItem,
    setGroupItem,
    groupItemOptions,
    groupChartData,

    // 집계 섹션
    aggregatedGroupItem,
    setAggregatedGroupItem,
    aggregatedItem,
    setAggregatedItem,
    aggregatedItemOptions,
    aggregatedChartData,

    // 교차 테이블 섹션
    crossTableGroupItem,
    setCrossTableGroupItem,
    groupLabels,
    matrixData,
    isMatrixLoading,

    // 액션
    handleDateChange,
    handleRefresh,
    handleForceUpdate,
  };
};
