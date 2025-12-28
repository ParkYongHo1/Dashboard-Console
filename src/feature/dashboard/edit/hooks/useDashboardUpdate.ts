import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateDashboard } from "../api/updateDashboard";

interface DashboardEditRequest {
  dashboardId: string;
  dashboardDetailInfo: {
    groupData: {
      groupId: number;
      databaseColumn: string;
      databaseColumnAlias: string;
      data: string;
    }[];
    aggregatedData: {
      aggregatedId: number;
      aggregatedDatabaseColumn: string;
      dataType: string;
      databaseColumnAlias: string;
      dashboardCondition: string;
      conditionValue: string;
      statMethod: string;
    }[];
  };
}

export const useDashboardUpdate = (dashboardId: string, status: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DashboardEditRequest) => updateDashboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.read({ dashboardId, status }),
      });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.list({ page: 1, size: 10 }),
      });
      alert("대시보드가 수정되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });
};
