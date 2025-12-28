import { useState, ReactNode } from "react";
import { HelpCircle } from "lucide-react";

interface TooltipProps {
  children: ReactNode;
  position?: "top" | "bottom";
}

export const Tooltip = ({ children, position = "top" }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const positionClass = position === "top" ? "bottom-8" : "top-8";

  return (
    <div className="relative inline-flex">
      <div className="cursor-pointer" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
      </div>
      {visible && <div className={`absolute left-1/2 -translate-x-1/2 ${positionClass} w-48 bg-card border border-border text-[11px] rounded-lg p-3 shadow-lg z-20`}>{children}</div>}
    </div>
  );
};
