import { RefreshCw } from "lucide-react";

interface RefreshIconProps {
  isSpinning?: boolean;
  className?: string;
}

export const RefreshIcon = ({ isSpinning, className = "" }: RefreshIconProps) => <RefreshCw className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""} ${className}`} />;
