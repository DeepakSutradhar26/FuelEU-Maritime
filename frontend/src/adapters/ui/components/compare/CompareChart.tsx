import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend, ResponsiveContainer } from 'recharts';
import type { ComparisonResult } from '../../../../shared/types';
import { TARGET_INTENSITY } from '../../../../shared/constants';

interface CompareChartProps {
  data: ComparisonResult[];
}

export const CompareChart = ({ data }: CompareChartProps) => {
  const chartData = data.map((d) => ({
    name: d.routeId,
    'GHG Intensity': d.comparisonGhg,
    Baseline: d.baselineGhg,
  }));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">GHG Intensity Comparison (gCO₂e/MJ)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[80, 100]} />
          <Tooltip />
          <Legend />
          <ReferenceLine y={TARGET_INTENSITY} stroke="red" strokeDasharray="5 5" label={{ value: `Target: ${TARGET_INTENSITY}`, fill: 'red', fontSize: 11 }} />
          <Bar dataKey="Baseline" fill="#93c5fd" />
          <Bar dataKey="GHG Intensity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};