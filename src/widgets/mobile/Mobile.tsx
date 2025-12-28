import { Monitor } from "lucide-react";

export const Mobile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Monitor className="w-10 h-10 text-gray-400" />
      </div>

      <h1 className="text-[22px] font-bold text-gray-900 mb-2">PC에서 이용해주세요</h1>
      <p className="text-[15px] text-gray-500 leading-relaxed text-center">
        더 나은 경험을 위해
        <br />
        데스크탑 환경을 권장드려요
      </p>

      <div className="absolute bottom-8 text-[13px] text-gray-400">1024px 이상 화면에서 이용 가능</div>
    </div>
  );
};
