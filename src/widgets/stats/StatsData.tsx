import { useStatsPageData } from "@/feature/stats/hooks/useStatsPageData";
import Select from "@/shared/ui/Select";
import { StatsHeader } from "@/widgets/stats/header/ui/StatsHeader";
import { CrossTable } from "@/widgets/stats/table/ui/CrossTable";
import { GroupStatsSection } from "./ui/GroupStatsSection";
import { AggregatedStatsSection } from "./ui/AggregatedStatsSection";

export const StatsData = () => {
  const {
    dateRange,
    refreshKey,
    groupItem,
    setGroupItem,
    groupItemOptions,
    groupChartData,
    aggregatedGroupItem,
    setAggregatedGroupItem,
    aggregatedItem,
    setAggregatedItem,
    aggregatedItemOptions,
    aggregatedChartData,
    crossTableGroupItem,
    setCrossTableGroupItem,
    groupLabels,
    matrixData,
    isMatrixLoading,
    handleDateChange,
    handleRefresh,
  } = useStatsPageData();

  return (
    <div className="max-w-9xl mx-auto px-6 py-10 flex flex-col gap-8">
      <StatsHeader startDate={dateRange.startDate} endDate={dateRange.endDate} onDateChange={handleDateChange} onRefresh={handleRefresh} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GroupStatsSection groupItem={groupItem} onGroupItemChange={setGroupItem} groupItemOptions={groupItemOptions} chartData={groupChartData} chartKey={`group-${refreshKey}`} />

        <AggregatedStatsSection
          groupItem={aggregatedGroupItem}
          onGroupItemChange={setAggregatedGroupItem}
          groupItemOptions={groupItemOptions}
          aggregatedItem={aggregatedItem}
          onAggregatedItemChange={setAggregatedItem}
          aggregatedItemOptions={aggregatedItemOptions}
          chartData={aggregatedChartData}
          chartKey={`aggregated-${refreshKey}`}
        />
      </div>

      <section className="bg-card rounded-2xl shadow-md border border-border/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[16px] font-semibold text-foreground">교차 분석표</h2>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-blue-500 font-medium">{crossTableGroupItem.toUpperCase()}</span> 기준 × 모든 집계항목
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">그룹항목</span>
            <Select value={crossTableGroupItem} onChange={setCrossTableGroupItem} options={groupItemOptions} width="w-[160px]" />
          </div>
        </div>

        <CrossTable rowLabels={groupLabels} columnLabels={aggregatedItemOptions.map((item) => item.label)} matrixData={matrixData} isLoading={isMatrixLoading} />
      </section>
    </div>
  );
};
