import DonutChartComponent from "@/components/stats/chart/DonutChartComponent";
import StatsHeader from "@/components/stats/stats-item/stats-header/StatsHeader";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { dashboardService } from "@/services/dashboard-list/api";
import { statsService } from "@/services/stats/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import Select from "@/shared/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

type ChartType = "donut" | "bar" | "line" | "area";

const chartTypeOptions = [
  { value: "donut", label: "도넛 차트" },
  { value: "bar", label: "막대 차트" },
  { value: "line", label: "라인 차트" },
  { value: "area", label: "영역 차트" },
];

const getInitialDateRange = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 30);

  return {
    startDate,
    endDate: today,
  };
};

const StatsItemPage = () => {
  const [groupChartType, setGroupChartType] = useState<ChartType>("donut");
  const [aggregatedChartType, setAggregatedChartType] =
    useState<ChartType>("donut");
  const [groupItem, setGroupItem] = useState<string>("");
  const [aggregatedGroupItem, setAggregatedGroupItem] = useState<string>("");
  const [aggregatedItem, setAggregatedItem] = useState<string>("");
  const [dateRange, setDateRange] = useState(getInitialDateRange());

  const { dashboardId } = useParams<{ dashboardId: string }>();

  const { data: dashboardData } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.READ({
      dashboardId: decodeURIComponent(dashboardId!),
      status: "COMPLETED",
    }),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({
        dashboardId: decodeURIComponent(dashboardId!),
        status: "COMPLETED",
      }),
    enabled: Boolean(dashboardId),
  });

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
    if (!Array.isArray(dashboardData?.dashboardDetailInfo.aggregatedData))
      return [];

    const seen = new Set<string>();
    return dashboardData.dashboardDetailInfo.aggregatedData
      .filter((item) => {
        if (seen.has(item.aggregatedDatabaseColumn)) return false;
        seen.add(item.aggregatedDatabaseColumn);
        return true;
      })
      .map((item) => ({
        value: item.databaseColumnAlias,
        label: item.databaseColumnAlias,
      }));
  }, [dashboardData?.dashboardDetailInfo.aggregatedData]);

  useEffect(() => {
    if (groupItemOptions && groupItemOptions.length > 0) {
      setGroupItem(groupItemOptions[0].value);
      setAggregatedGroupItem(groupItemOptions[0].value);
    }
  }, [groupItemOptions]);

  useEffect(() => {
    if (aggregatedItemOptions && aggregatedItemOptions.length > 0) {
      setAggregatedItem(aggregatedItemOptions[0].label);
    }
  }, [aggregatedItemOptions]);

  type FilterData = {
    groupDataList: number[];
    aggregatedDataList?: number[];
  };

  const { data: groupFilterData, refetch: refetchGroupFilterData } =
    useQuery<FilterData | null>({
      queryKey: QUERY_KEYS.STATISTICS.GROUP({
        dashboardId: decodeURIComponent(dashboardId!),
        selectGroupData: groupItem,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      queryFn: async (): Promise<FilterData | null> => {
        if (!dashboardId || !groupItem) return null;

        return (await statsService.getGroupDataStatistics({
          dashboardId: decodeURIComponent(dashboardId),
          selectGroupData: groupItem,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })) as FilterData | null;
      },
      enabled: Boolean(dashboardId && groupItem),
    });

  const { data: aggregatedFilterData, refetch: refetchAggregatedFilterData } =
    useQuery<FilterData | null>({
      queryKey: QUERY_KEYS.STATISTICS.AGGREGATE({
        dashboardId: decodeURIComponent(dashboardId!),
        selectGroupData: aggregatedGroupItem,
        selectAggregatedData: aggregatedItem,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      queryFn: async (): Promise<FilterData | null> => {
        if (!dashboardId || !aggregatedGroupItem || !aggregatedItem)
          return null;

        return (await statsService.getAggregatedDataStatistics({
          dashboardId: decodeURIComponent(dashboardId),
          selectGroupData: aggregatedGroupItem,
          selectAggregatedData: aggregatedItem,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })) as FilterData | null;
      },
      enabled: Boolean(dashboardId && aggregatedGroupItem && aggregatedItem),
    });

  const groupChartData = useMemo(() => {
    if (!groupFilterData?.groupDataList) return [];

    const columnAliases = Array.isArray(
      dashboardData?.dashboardDetailInfo.groupData
    )
      ? dashboardData.dashboardDetailInfo.groupData.map(
          (item) => item.databaseColumnAlias
        )
      : [];

    return groupFilterData.groupDataList.map(
      (value: number, index: number) => ({
        name: columnAliases[index] || `항목 ${index + 1}`,
        value: value,
      })
    );
  }, [groupFilterData, dashboardData?.dashboardDetailInfo.groupData]);

  // 집계항목 차트 데이터 (수정: aggregatedDataList 사용)
  const aggregatedChartData = useMemo(() => {
    if (!aggregatedFilterData?.aggregatedDataList) return [];

    const columnAliases = Array.isArray(
      dashboardData?.dashboardDetailInfo.groupData
    )
      ? dashboardData.dashboardDetailInfo.groupData.map(
          (item) => item.databaseColumnAlias
        )
      : [];

    return aggregatedFilterData.aggregatedDataList.map(
      (value: number, index: number) => ({
        name: columnAliases[index] || `항목 ${index + 1}`,
        value: value,
      })
    );
  }, [aggregatedFilterData, dashboardData?.dashboardDetailInfo.groupData]);

  // StatsHeader에서 새로고침 기능을 처리하므로 여기서는 항목 변경시에만 API 호출
  useEffect(() => {
    if (dashboardId && groupItem) {
      refetchGroupFilterData();
    }
  }, [groupItem, dashboardId]);

  useEffect(() => {
    if (dashboardId && aggregatedGroupItem && aggregatedItem) {
      refetchAggregatedFilterData();
    }
  }, [aggregatedGroupItem, aggregatedItem, dashboardId]);

  const handleGroupItemChange = (newGroupItem: string) => {
    setGroupItem(newGroupItem);
  };

  const handleAggregatedGroupItemChange = (newAggregatedGroupItem: string) => {
    setAggregatedGroupItem(newAggregatedGroupItem);
  };

  const handleAggregatedItemChange = (newAggregatedItem: string) => {
    setAggregatedItem(newAggregatedItem);
  };

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  const renderGroupChart = () => {
    if (!groupFilterData) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <LoadingSpinner
            size="xl"
            color="blue"
            text="통계 데이터를 불러오는 중입니다..."
          />
        </div>
      );
    }

    switch (groupChartType) {
      case "donut":
        return <DonutChartComponent data={groupChartData} />;
      case "bar":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">막대 차트 (개발 예정)</p>
          </div>
        );
      case "line":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">라인 차트 (개발 예정)</p>
          </div>
        );
      case "area":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">영역 차트 (개발 예정)</p>
          </div>
        );
      default:
        return <DonutChartComponent data={groupChartData} />;
    }
  };

  const renderAggregatedChart = () => {
    if (!aggregatedFilterData) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <LoadingSpinner
            size="xl"
            color="blue"
            text="통계 데이터를 불러오는 중입니다..."
          />
        </div>
      );
    }

    switch (aggregatedChartType) {
      case "donut":
        return <DonutChartComponent data={aggregatedChartData} />;
      case "bar":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">막대 차트 (개발 예정)</p>
          </div>
        );
      case "line":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">라인 차트 (개발 예정)</p>
          </div>
        );
      case "area":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">영역 차트 (개발 예정)</p>
          </div>
        );
      default:
        return <DonutChartComponent data={aggregatedChartData} />;
    }
  };

  return (
    <div className="min-h-[85vh] bg-white mb-[20px]">
      <div className="px-6 mt-[20px]">
        <StatsHeader
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
          onRefresh={async () => {
            await Promise.all([
              refetchGroupFilterData(),
              refetchAggregatedFilterData(),
            ]);
          }}
        />
      </div>

      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                그룹항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">{groupItem.toUpperCase()}</span>
                &nbsp;에 대한 데이터 통계
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
            <div className="flex justify-around items-center mb-4">
              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">차트유형 : </span>
                <Select
                  value={groupChartType}
                  onChange={(value) => setGroupChartType(value as ChartType)}
                  options={chartTypeOptions}
                  width="w-[200px]"
                />
              </div>

              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">그룹항목 : </span>
                <Select
                  value={groupItem}
                  onChange={handleGroupItemChange}
                  options={groupItemOptions || []}
                  width="w-[200px]"
                />
              </div>
            </div>

            {renderGroupChart()}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                집계항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">
                  {aggregatedItem.toUpperCase()}
                </span>
                &nbsp;에 대한 데이터 통계
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
            <div className="flex justify-around items-center mb-4">
              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">차트유형 : </span>
                <Select
                  value={aggregatedChartType}
                  onChange={(value) =>
                    setAggregatedChartType(value as ChartType)
                  }
                  options={chartTypeOptions}
                  width="w-[200px]"
                />
              </div>

              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">그룹항목 : </span>
                <Select
                  value={aggregatedGroupItem}
                  onChange={handleAggregatedGroupItemChange}
                  options={groupItemOptions || []}
                  width="w-[200px]"
                />
              </div>
              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">집계항목 : </span>
                <Select
                  value={aggregatedItem}
                  onChange={handleAggregatedItemChange}
                  options={aggregatedItemOptions || []}
                  width="w-[200px]"
                />
              </div>
            </div>

            {renderAggregatedChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsItemPage;
