import { useAuth } from "@/feature/auth/hooks/useAuth";
import { Button } from "@/shared/ui/Button";
import { NavButton } from "@/shared/ui/NavButton";
import { useCompanyStore } from "@/stores/companyStore";

export const Header = () => {
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);
  const { handleLogout, company } = useAuth();
  return (
    <div className="w-full border-b border-gray-200 flex flex-col h-[8vh] bg-background">
      <div className="flex items-center justify-between px-6 py-5 h-[10vh]">
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl text-black">DASHBOARD</div>
          <div className="flex items-center space-x-5 ">
            {isAuthenticated && (
              <>
                <NavButton to="/" end>
                  HOME
                </NavButton>
                <NavButton to="/stats-list">STATS</NavButton>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <Button onClick={handleLogout} variant="ghost" size="sm">
                LOGOUT
              </Button>
              <span className="text-[14px] font-semibold text-foreground">{company?.company}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
