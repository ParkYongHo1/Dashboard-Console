import help from "@/assets/dashboard-list/help.svg";

import { useStatsHeader } from "@/feature/stats/hooks/useStatsHeader";
import { AutoRefresh } from "./AutoRefresh";
import { DateSelector } from "./DateSelector";
import { RefreshButton } from "./RefreshButton";

interface StatsHeaderProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
  onRefresh?: () => Promise<void>;
}

export const StatsHeader = ({ startDate, endDate, onDateChange, onRefresh }: StatsHeaderProps) => {
  const { autoRefresh, isCalendarOpen, isRefreshing, remainingTime, setAutoRefresh, setIsCalendarOpen, handleStartDateChange, handleEndDateChange, handleRefreshStats } = useStatsHeader({
    startDate,
    endDate,
    onDateChange,
    onRefresh,
  });

  return (
    <div className="flex justify-between items-center py-4 shadow-md px-6 mb-[20px] border border-gray-200 rounded-[5px]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex gap-[10px] items-center">
          <img src={help} />
          <p className="text-sm text-gray-500">날짜 선택 시 해당 날짜의 데이터가 조회됩니다.</p>
        </div>
      </div>

      <div className="flex gap-[10px] items-center relative">
        <AutoRefresh isEnabled={autoRefresh} onToggle={setAutoRefresh} remainingTime={remainingTime} isRefreshing={isRefreshing} />

        <DateSelector startDate={startDate} endDate={endDate} isOpen={isCalendarOpen} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onToggle={setIsCalendarOpen} />

        <RefreshButton isRefreshing={isRefreshing} onRefresh={handleRefreshStats} />
      </div>
    </div>
  );
};
