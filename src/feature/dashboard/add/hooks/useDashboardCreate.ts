import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDashboard } from "../api/createDashboard";
import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";
import { useNavigate } from "react-router-dom";

export const useDashboardCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: createDashboard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.list({ page: 1, size: 10 }),
      });
      alert("대시보드가 생성되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });
  return { mutate, isPending };
};
