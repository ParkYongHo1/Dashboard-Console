import { RefreshIcon } from "@/shared/ui/RefreshIcon";

interface RefreshButtonProps {
  isRefreshing: boolean;
  onRefresh: () => Promise<void>;
}

export const RefreshButton = ({ isRefreshing, onRefresh }: RefreshButtonProps) => {
  const handleClick = async () => {
    try {
      await onRefresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      alert(`새로고침에 실패했습니다.\n${message}`);
    }
  };

  return (
    <button onClick={handleClick} disabled={isRefreshing} className="relative group bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded cursor-pointer h-[40px]">
      <RefreshIcon isSpinning={isRefreshing} />
    </button>
  );
};
