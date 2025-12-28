import { useDashboardEdit } from "@/feature/dashboard/edit/hooks/useDashboardEdit";
import { useDevice } from "@/shared/hooks/useDevice";
import { DashboardEditMobile } from "./ui/DashboardEdit.mobile";
import { DashboardEditDesktop } from "./ui/DashboardEdit.desktop";

export const DashboardEdit = () => {
  const { isMobile } = useDevice();
  const { isLoading, currentDashboard, isPending, isDeletePending, isValid, handleSave, handleDelete, showDeleteConfirm, setShowDeleteConfirm, confirmDelete } = useDashboardEdit();

  const props = {
    currentDashboard,
    isLoading,
    isPending,
    isDeletePending,
    isValid,
    handleSave,
    handleDelete,
    showDeleteConfirm,
    setShowDeleteConfirm,
    confirmDelete,
  };

  return isMobile ? <DashboardEditMobile /> : <DashboardEditDesktop {...props} />;
};
