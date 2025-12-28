import { type ButtonHTMLAttributes, forwardRef } from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = {
  variant: {
    primary: "bg-primary text-primary-foreground hover:opacity-90 bg-blue-500",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    ghost: "text-muted-foreground  hover:bg-muted/50",
    danger: "bg-transparent text-red-500 border border-red-500/30 hover:bg-red-500/10 dark:hover:bg-red-500/20",
    outline: "border border-border text-foreground hover:bg-muted",
    link: "text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
  },
  size: {
    sm: "px-3 py-2 text-[13px]",
    md: "px-4 py-2 text-[14px]",
    lg: "px-5 py-2.5 text-[15px]",
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  icon?: LucideIcon;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", icon: Icon, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-colors cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";
