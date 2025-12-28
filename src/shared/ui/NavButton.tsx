import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  end?: boolean;
}

export const NavButton = ({ to, children, end = false }: NavButtonProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn("px-3 py-2 text-[14px] font-medium rounded-lg transition-colors", isActive ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")
      }
    >
      {children}
    </NavLink>
  );
};
