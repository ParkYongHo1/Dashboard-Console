import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

interface CrossTableProps {
  rowLabels: string[];
  columnLabels: string[];
  matrixData: number[][];
  isLoading?: boolean;
}

export const CrossTable = ({ rowLabels, columnLabels, matrixData, isLoading }: CrossTableProps) => {
  const columnTotals = columnLabels.map((_, colIndex) => matrixData.reduce((sum, row) => sum + (row[colIndex] || 0), 0));

  const rowTotals = matrixData.map((row) => row.reduce((sum, val) => sum + (val || 0), 0));

  const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

  const getColumnPercentage = (value: number, colIndex: number) => {
    const total = columnTotals[colIndex];
    if (total === 0) return "0.0";
    return ((value / total) * 100).toFixed(1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (rowLabels.length === 0 || columnLabels.length === 0) {
    return <div className="text-center p-8 text-gray-500">데이터가 없습니다.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-100 border border-gray-200 min-w-[140px]">그룹 / 집계</th>
            {columnLabels.map((label, index) => (
              <th key={index} className="px-4 py-3 text-center font-semibold text-gray-700 bg-gray-100 border border-gray-200 min-w-[120px]">
                {label}
              </th>
            ))}
            <th className="px-4 py-3 text-center font-semibold text-gray-700 bg-gray-200 border border-gray-200 min-w-[100px]">합계</th>
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-blue-50/50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-200">{rowLabel}</td>
              {columnLabels.map((_, colIndex) => {
                const value = matrixData[rowIndex]?.[colIndex] || 0;
                const percentage = getColumnPercentage(value, colIndex);
                return (
                  <td key={colIndex} className="px-4 py-3 text-center border border-gray-200">
                    <span className="font-medium text-gray-900">{value.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">({percentage}%)</span>
                  </td>
                );
              })}
              <td className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50 border border-gray-200">{rowTotals[rowIndex]}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-200">합계</td>
            {columnTotals.map((total, colIndex) => (
              <td key={colIndex} className="px-4 py-3 text-center border border-gray-200">
                <span className="font-semibold text-gray-900">{total.toLocaleString()}</span>
                <span className="text-xs text-gray-400 ml-1">(100%)</span>
              </td>
            ))}
            <td className="px-4 py-3 text-center font-bold text-gray-900 bg-gray-200 border border-gray-200">{grandTotal.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
