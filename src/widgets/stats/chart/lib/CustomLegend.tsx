import { COLORS } from "@/entities/stats/model/constants";
import { useState } from "react";

interface ChartDataItem {
  name: string;
  value: number;
}

interface CustomLegendProps {
  data: ChartDataItem[];
  total: number;
  onHover: (index: number | null) => void;
  activeIndex: number | null;
}

export const CustomLegend = ({ data, total, onHover, activeIndex }: CustomLegendProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onHover(null);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5">
      {data.map((item, index) => {
        const percent = ((item.value / total) * 100).toFixed(1);
        const isActive = activeIndex === index;

        return (
          <div key={item.name} className="relative flex items-center gap-2 cursor-pointer group" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
            <span className={`w-3 h-3 rounded-full transition-transform ${isActive ? "scale-125" : ""}`} style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className={`text-sm transition-colors ${isActive ? "font-semibold text-gray-900" : "text-gray-600"}`}>{item.name}</span>

            {hoveredIndex === index && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                <div className="font-semibold mb-1">{item.name}</div>
                <div>건수: {item.value.toLocaleString()}건</div>
                <div>비율: {percent}%</div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
