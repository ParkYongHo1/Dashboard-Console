import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAutoRefreshTimer } from "./useAutoRefreshTimer";
import { useStatsRefresh } from "./useStatsRefresh";
import { toast } from "sonner";

interface UseStatsHeaderParams {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
  onRefresh?: () => Promise<void>;
}

export const useStatsHeader = ({ startDate, endDate, onDateChange, onRefresh }: UseStatsHeaderParams) => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { isRefreshing, refreshStats, remainingTime, setRemainingTime } = useStatsRefresh({
    dashboardId: dashboardId || "",
    startDate,
    endDate,
    onError: () => {
      toast.error("새로고침에 실패했습니다.");
    },
  });

  useEffect(() => {
    if (dashboardId && onRefresh) {
      onRefresh();
    }
  }, [startDate, endDate, dashboardId, onRefresh]);

  useAutoRefreshTimer({
    autoRefresh,
    refreshStats: async () => {
      if (onRefresh) {
        await onRefresh();
      }
    },
    setRemainingTime,
  });

  const handleStartDateChange = (newStartDate: Date) => {
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (newEndDate: Date) => {
    onDateChange(startDate, newEndDate);
  };

  const handleRefreshStats = async (autoRefreshActive?: boolean) => {
    if (onRefresh) {
      await onRefresh();
    }
    await refreshStats(autoRefreshActive);
  };

  return {
    autoRefresh,
    isCalendarOpen,
    isRefreshing,
    remainingTime,
    setAutoRefresh,
    setIsCalendarOpen,
    setRemainingTime,
    handleStartDateChange,
    handleEndDateChange,
    handleRefreshStats,
  };
};
