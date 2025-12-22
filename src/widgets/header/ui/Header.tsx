import { useAuth } from "@/feature/auth/hooks/useAuth";
import { LinkButton } from "@/shared/ui/LinkButton";
import { useCompanyStore } from "@/stores/companyStore";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);
  const location = useLocation();
  const currentPath = location.pathname;
  const { handleLogout, company } = useAuth();
  return (
    <div className="w-full border-b border-gray-200 flex flex-col h-[8vh] bg-white">
      <div className="flex items-center justify-between px-6 py-5 h-[10vh]">
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl text-black">DASHBOARD</div>
          <div className="flex items-center space-x-5 ">
            {isAuthenticated && (
              <>
                <LinkButton name="HOME" path="/" type="default" isActive={currentPath === "/"} />
                <LinkButton name="STATS" path="/stats-list" type="default" isActive={currentPath.startsWith("/stats")} />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <LinkButton name="SETTING" path="/setting" type="default" isActive={currentPath === "/setting"} />
            </>
          )}
          {isAuthenticated && (
            <>
              <button onClick={handleLogout} className="px-4 py-2 text-gray-400 hover:text-black hover:cursor-pointer">
                LOGOUT
              </button>
              <div className="font-bold">{company?.company}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
