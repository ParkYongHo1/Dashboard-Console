import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { type LucideIcon } from "lucide-react";

const linkButtonVariants = {
  variant: {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    ghostPrimary: "text-primary hover:bg-muted",
    danger: "text-muted-foreground hover:bg-red-50 hover:text-red-500",
    outline: "border border-border text-foreground hover:bg-muted",
  },
  size: {
    sm: "px-3 py-1.5 text-[13px]",
    md: "px-4 py-2 text-[14px]",
    lg: "px-5 py-2.5 text-[15px]",
  },
  iconSize: {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  },
};

interface LinkButtonProps {
  to: string;
  variant?: keyof typeof linkButtonVariants.variant;
  size?: keyof typeof linkButtonVariants.size;
  icon?: LucideIcon;
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
  state?: unknown;
}

export const LinkedButton = ({ to, variant = "primary", size = "md", icon: Icon, iconOnly = false, className, children, state }: LinkButtonProps) => {
  const iconSizeMap = { sm: 14, md: 16, lg: 18 };

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-colors",
        linkButtonVariants.variant[variant],
        iconOnly ? linkButtonVariants.iconSize[size] : linkButtonVariants.size[size],
        className
      )}
      state={state}
    >
      {Icon && <Icon style={{ width: iconSizeMap[size], height: iconSizeMap[size] }} />}
      {!iconOnly && children}
    </Link>
  );
};
