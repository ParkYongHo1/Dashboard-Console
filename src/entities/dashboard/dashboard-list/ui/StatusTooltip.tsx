import { CircleCheck, XCircle } from "lucide-react";
import { Tooltip } from "@/shared/ui/Tooltip";

export const StatusTooltip = () => {
  return (
    <Tooltip position="top">
      <div className="space-y-2">
        <p className="flex items-center gap-2">
          <XCircle className="w-3 h-3 text-red-500" />
          <span className="text-muted-foreground">
            <span className="text-red-500 font-medium">대기</span> 설정 미완료
          </span>
        </p>
        <p className="flex items-center gap-2">
          <CircleCheck className="w-3 h-3 text-emerald-500" />
          <span className="text-muted-foreground">
            <span className="text-emerald-500 font-medium">완료</span> 설정 완료
          </span>
        </p>
      </div>
    </Tooltip>
  );
};
