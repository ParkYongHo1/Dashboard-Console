import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { DonutChart } from "./DonutChart";

interface StatsChartProps {
  data: { name: string; value: number }[];
  chartKey: string;
  isLoading?: boolean;
}

export const StatsChart = ({ data, chartKey, isLoading }: StatsChartProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const total = data?.reduce((sum, item) => sum + item.value, 0) ?? 0;

  if (!data || data.length === 0 || total === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  return <DonutChart key={chartKey} data={data} />;
};
