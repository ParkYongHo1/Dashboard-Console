interface StatsTableProps {
  data: { name: string; value: number }[];
  title: string;
  isLoading?: boolean;
}

export const StatsTable = ({ data, title, isLoading }: StatsTableProps) => {
  if (isLoading) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-600 mb-3">{title}</h4>
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
        </div>
      </div>
    );
  }
  const total = data?.reduce((sum, item) => sum + item.value, 0) ?? 0;

  if (!data || data.length === 0 || total === 0) {
    return (
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-600 mb-3">{title}</h4>
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-600 mb-3">{title}</h4>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">항목</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">값</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">비율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{item.value.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">{total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-sm text-gray-900">합계</td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">{total.toLocaleString()}</td>
              <td className="px-4 py-3 text-sm text-gray-900 text-right">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
