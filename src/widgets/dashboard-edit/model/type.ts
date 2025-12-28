import { DashboardData } from "@/stores/dashboardStore";

export interface DashboardEditProps {
  currentDashboard: DashboardData | null;
  isLoading: boolean;
  isPending: boolean;
  isDeletePending: boolean;
  isValid: boolean;
  handleSave: () => void;
  handleDelete: () => void;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (open: boolean) => void;
  confirmDelete: () => void;
}
