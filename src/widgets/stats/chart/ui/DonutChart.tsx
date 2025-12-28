import { COLORS } from "@/entities/stats/model/constants";
import { JSX, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomLegend } from "../lib/CustomLegend";
import { RenderActiveShape } from "../lib/renderActiveShape";

interface ChartDataItem {
  name: string;
  value: number;
}

export const DonutChart = ({ data }: { data?: ChartDataItem[] }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredData = data?.filter((item) => item.value > 0) ?? [];
  const total = filteredData.reduce((sum, item) => sum + item.value, 0);

  if (filteredData.length === 0 || total === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeShape={RenderActiveShape as unknown as (props: unknown) => JSX.Element}
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={140}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {filteredData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend data={filteredData} total={total} onHover={setActiveIndex} activeIndex={activeIndex} />
    </div>
  );
};
