import type { ComparisonResult } from '../../../../shared/types';
import { Badge } from '../shared/Badge';

interface CompareTableProps {
  data: ComparisonResult[];
}

export const CompareTable = ({ data }: CompareTableProps) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          {['Route ID', 'Vessel', 'Fuel', 'Year', 'Baseline GHG', 'Comparison GHG', '% Diff', 'Status'].map(h => (
            <th key={h} className="px-4 py-3 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((row) => (
          <tr key={row.routeId} className="hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">{row.routeId}</td>
            <td className="px-4 py-3">{row.vesselType}</td>
            <td className="px-4 py-3">{row.fuelType}</td>
            <td className="px-4 py-3">{row.year}</td>
            <td className="px-4 py-3">{row.baselineGhg} gCO₂e/MJ</td>
            <td className="px-4 py-3">{row.comparisonGhg} gCO₂e/MJ</td>
            <td className={`px-4 py-3 font-semibold ${row.percentDiff < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {row.percentDiff > 0 ? '+' : ''}{row.percentDiff.toFixed(2)}%
            </td>
            <td className="px-4 py-3">
              <Badge value={row.compliant} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);