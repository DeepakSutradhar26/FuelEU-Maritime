import type { Route } from '../../../../shared/types';
import { Button } from '../shared/Button';

interface RouteTableProps {
  routes: Route[];
  onSetBaseline: (routeId: string) => void;
  loading: boolean;
}

export const RouteTable = ({ routes, onSetBaseline, loading }: RouteTableProps) => (
  <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-xl">
    <table className="w-full text-sm">
      <thead className="bg-slate-800 text-slate-400 uppercase text-xs tracking-wider">
        <tr>
          {['Route ID', 'Vessel Type', 'Fuel Type', 'Year', 'GHG Intensity', 'Fuel Consumption', 'Distance', 'Total Emissions', 'Baseline', 'Action'].map(h => (
            <th key={h} className="px-4 py-4 text-left border-b border-slate-700">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700/50">
        {routes.map((route) => (
          <tr key={route.routeId} className={`transition-colors ${route.isBaseline ? 'bg-blue-900/20' : 'bg-slate-800/40 hover:bg-slate-700/40'}`}>
            <td className="px-4 py-3 font-bold text-white">{route.routeId}</td>
            <td className="px-4 py-3 text-slate-300">{route.vesselType}</td>
            <td className="px-4 py-3">
              <span className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-xs font-medium">{route.fuelType}</span>
            </td>
            <td className="px-4 py-3 text-slate-300">{route.year}</td>
            <td className={`px-4 py-3 font-semibold ${route.ghgIntensity <= 89.3368 ? 'text-emerald-400' : 'text-red-400'}`}>
              {route.ghgIntensity}
            </td>
            <td className="px-4 py-3 text-slate-300">{route.fuelConsumption} t</td>
            <td className="px-4 py-3 text-slate-300">{route.distance} km</td>
            <td className="px-4 py-3 text-slate-300">{route.totalEmissions} t</td>
            <td className="px-4 py-3">
              {route.isBaseline ? (
                <span className="bg-blue-800 text-blue-300 border border-blue-600 px-2 py-1 rounded-full text-xs font-bold">⭐ Baseline</span>
              ) : '—'}
            </td>
            <td className="px-4 py-3">
              <Button
                label="Set Baseline"
                onClick={() => onSetBaseline(route.routeId)}
                disabled={route.isBaseline || loading}
                variant="primary"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);