import Select from "@/shared/ui/Select";
import { StatsChart } from "@/widgets/stats/chart/ui/StatsChart";
import { StatsTable } from "@/widgets/stats/table/ui/StatsTable";

interface SelectOption {
  value: string;
  label: string;
}

interface ChartDataItem {
  name: string;
  value: number;
}

interface AggregatedStatsSectionProps {
  groupItem: string;
  onGroupItemChange: (value: string) => void;
  groupItemOptions: SelectOption[];
  aggregatedItem: string;
  onAggregatedItemChange: (value: string) => void;
  aggregatedItemOptions: SelectOption[];
  chartData: ChartDataItem[];
  chartKey: string;
}

export const AggregatedStatsSection = ({
  groupItem,
  onGroupItemChange,
  groupItemOptions,
  aggregatedItem,
  onAggregatedItemChange,
  aggregatedItemOptions,
  chartData,
  chartKey,
}: AggregatedStatsSectionProps) => {
  return (
    <section className="bg-card rounded-2xl shadow-md border border-border/50 p-6">
      <div className="mb-6">
        <h2 className="text-[16px] font-semibold text-foreground">집계항목 통계</h2>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="text-blue-500 font-medium">{aggregatedItem.toUpperCase()}</span> 기준 데이터
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">그룹항목</span>
          <Select value={groupItem} onChange={onGroupItemChange} options={groupItemOptions} width="w-[140px]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">집계항목</span>
          <Select value={aggregatedItem} onChange={onAggregatedItemChange} options={aggregatedItemOptions} width="w-[140px]" />
        </div>
      </div>

      <StatsChart data={chartData} chartKey={chartKey} />
      <StatsTable data={chartData} title="상세 데이터" />
    </section>
  );
};
