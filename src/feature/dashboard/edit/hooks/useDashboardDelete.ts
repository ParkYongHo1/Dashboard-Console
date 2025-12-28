import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteDashboard } from "../api/deleteDashboard";
import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";

export const useDashboardDelete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { dashboardId: string }) => deleteDashboard(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.list({ page: 1, size: 10 }),
      });
      alert("대시보드가 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("삭제 중 문제가 발생했습니다.");
      console.error(error);
    },
  });
};
