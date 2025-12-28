import { useRef } from "react";
import DatePicker from "react-datepicker";
import dateIcon from "@/assets/stats/date.svg";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "@/shared/lib/utils";

interface DateSelectorProps {
  startDate: Date;
  endDate: Date;
  isOpen: boolean;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onToggle: (isOpen: boolean) => void;
}

export const DateSelector = ({ startDate, endDate, isOpen, onStartDateChange, onEndDateChange, onToggle }: DateSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartDateChange = (date: Date | null) => {
    if (!date) return;

    onStartDateChange(date);

    // 시작일이 종료일보다 뒤면 종료일도 변경
    if (date > endDate) {
      onEndDateChange(date);
    }

    onToggle(false);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;

    onEndDateChange(date);
    onToggle(false);
  };

  return (
    <>
      <div className="flex items-center border px-4 py-2 rounded-md border-gray-300 bg-white text-gray-700">
        <span>
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </span>
        <img src={dateIcon} onClick={() => onToggle(!isOpen)} className="cursor-pointer ml-3 w-5 h-5 object-contain" alt="날짜 선택" />
      </div>

      {isOpen && (
        <div ref={containerRef} className="flex gap-2 absolute top-full mt-2 z-20 bg-white shadow-lg rounded-md p-2">
          <DatePicker selected={startDate} onChange={handleStartDateChange} maxDate={new Date()} dateFormat="yyyy-MM-dd" selectsStart startDate={startDate} endDate={endDate} inline />
          <DatePicker selected={endDate} onChange={handleEndDateChange} minDate={startDate} maxDate={new Date()} dateFormat="yyyy-MM-dd" selectsEnd startDate={startDate} endDate={endDate} inline />
        </div>
      )}
    </>
  );
};
