import { LinkedButton } from "@/shared/ui/LinkedButton";
import { BarChart3, CircleCheck, Pencil, XCircle } from "lucide-react";
import { DashboardItem as DashboardItemType } from "../model/type";
import { cn, formatDate } from "@/shared/lib/utils";
import { DashboardType } from "@/widgets/dashboard-list/model/type";

interface DashboardItemProps {
  item: DashboardItemType;
  type: DashboardType;
}

const StatusBadge = ({ status }: { status: string }) => {
  const isCompleted = status === "COMPLETED";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 w-16 px-2 py-1 rounded-md text-[11px] font-semibold",
        isCompleted ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
      )}
    >
      {isCompleted ? <CircleCheck className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {isCompleted ? "완료" : "대기"}
    </span>
  );
};

export const DashboardItem = ({ item, type }: DashboardItemProps) => {
  const hasDescription = item.dashboardDescription !== "-";
  const base64Id = encodeURIComponent(item.dashboardId);
  const isStats = type === "stats";

  const path = isStats ? `/stats/${base64Id}` : `/edit-dashboard/${base64Id}`;

  return (
    <tr className="group border-b last:border-0 hover:bg-muted/50">
      <td className="px-5 py-4 text-left">
        <span className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">{item.dashboardName}</span>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="text-[13px] line-clamp-2">{hasDescription ? item.dashboardDescription : "-"}</span>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="text-[13px] text-muted-foreground">{formatDate(item.createdAt)}</span>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="text-[13px] text-muted-foreground">{formatDate(item.updatedAt)}</span>
      </td>
      <td className="px-5 py-4 text-center">
        <StatusBadge status={item.dashboardStatus} />
      </td>
      <td className="px-5 py-4 text-center">
        <LinkedButton to={path} variant="ghost" icon={isStats ? BarChart3 : Pencil} iconOnly state={{ status: item.dashboardStatus }} className="opacity-0 group-hover:opacity-100" />
      </td>
    </tr>
  );
};
