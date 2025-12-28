import { RefreshIcon } from "@/shared/ui/RefreshIcon";

interface AutoRefreshProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  remainingTime: number;
  isRefreshing: boolean;
}

export const AutoRefresh = ({ isEnabled, onToggle, remainingTime, isRefreshing }: AutoRefreshProps) => {
  const statusText = isRefreshing ? "데이터 로딩중" : "자동 새로고침";

  const renderTimeDisplay = () => {
    if (!isEnabled) return "OFF";
    <RefreshIcon isSpinning={isRefreshing} />;
    return `${remainingTime}s`;
  };

  return (
    <div className="flex gap-[10px] relative group">
      <p className="text-sm text-gray-400 w-[90px]">{statusText}</p>

      <span className={`w-[20px] text-sm ${isEnabled ? "text-blue-500" : "text-gray-400"}`}>{renderTimeDisplay()}</span>

      <label className="flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={isEnabled} onChange={() => onToggle(!isEnabled)} />
        <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isEnabled ? "bg-blue-500" : "bg-gray-300"}`}>
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isEnabled ? "translate-x-6" : ""}`} />
        </div>
      </label>

      <div className="absolute top-full mt-2 hidden group-hover:block w-56 text-xs bg-gray-700 text-white rounded-md p-2 shadow-md z-10">
        자동 새로고침 활성화 시 1분 간격으로 데이터가 업데이트 됩니다.
      </div>
    </div>
  );
};
