import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface UseStatsRefreshOptions {
  dashboardId: string;
  startDate: Date;
  endDate: Date;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  minRefreshTime?: number;
}

export const useStatsRefresh = ({
  onSuccess,
  onError,
  minRefreshTime = 1200,
}: UseStatsRefreshOptions) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const queryClient = useQueryClient();

  const resetTimers = () => {
    setRemainingTime(60);
  };

  const refreshStats = async (autoRefreshActive = false) => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    if (autoRefreshActive) {
      setIsLoading(true);
      setRemainingTime(60);
    }

    const start = Date.now();

    try {
      await queryClient.invalidateQueries({
        queryKey: ["STATISTICS"],
      });

      await queryClient.refetchQueries({
        queryKey: ["STATISTICS"],
        type: "active",
      });

      const elapsed = Date.now() - start;
      const remaining = minRefreshTime - elapsed;
      if (remaining > 0) {
        await new Promise((res) => setTimeout(res, remaining));
      }

      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      onError?.(error);
    } finally {
      if (autoRefreshActive) {
        setIsLoading(false);
        resetTimers();
      }

      setIsRefreshing(false);
    }
  };

  const startAutoRefreshTimer = (intervalSeconds = 60) => {
    setRemainingTime(intervalSeconds);
  };

  return {
    isRefreshing,
    isLoading,
    remainingTime,
    refreshStats,
    setRemainingTime,
    isError: false,
    error: null,
    startAutoRefreshTimer,
  };
};
