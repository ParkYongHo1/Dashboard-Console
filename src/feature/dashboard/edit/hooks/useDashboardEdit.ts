import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/entities/dashboard/model/constants";
import { useDashboardStore } from "@/stores/dashboardStore";
import { isAllFieldsFilled, createDashboardDetailInfo } from "../lib/validation";
import { useDashboardUpdate } from "./useDashboardUpdate";
import { useDashboardDelete } from "./useDashboardDelete";
import { getDashboardDefaultInfo } from "../api/getDashboardDefaultInfo";

export const useDashboardEdit = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const decodedId = decodeURIComponent(dashboardId!);
  const status = useLocation().state?.status ?? "";

  const { setCurrentDashboard, clearCurrentDashboard, setLoading, currentDashboard, isLoading, groupItems, aggregatedItems } = useDashboardStore();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: dashboardQueryKeys.read({ dashboardId: decodedId, status }),
    queryFn: () => getDashboardDefaultInfo({ dashboardId: decodedId, status }),
    enabled: Boolean(dashboardId),
  });

  const { mutate: updateMutate, isPending } = useDashboardUpdate(decodedId, status);
  const { mutate: deleteMutate, isPending: isDeletePending } = useDashboardDelete();

  useEffect(() => {
    if (data) setCurrentDashboard(data);
    return () => clearCurrentDashboard();
  }, [data, setCurrentDashboard, clearCurrentDashboard]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  const handleSave = () => {
    const dashboardDetailInfo = createDashboardDetailInfo(groupItems, aggregatedItems);
    updateMutate({ dashboardId: decodedId, dashboardDetailInfo });
  };

  const handleDelete = () => setShowDeleteConfirm(true);

  const confirmDelete = () => {
    deleteMutate({ dashboardId: decodedId });
  };

  return {
    isLoading,
    currentDashboard,
    isPending,
    isDeletePending,
    isValid: isAllFieldsFilled(groupItems, aggregatedItems),
    handleSave,
    handleDelete,
    showDeleteConfirm,
    setShowDeleteConfirm,
    confirmDelete,
  };
};
