import { useState, useEffect } from 'react';
import type { Route } from '../../../../shared/types';
import { fetchRoutes, setBaseline } from '../../../infrastructure/api/routeApi';
import { RouteTable } from './RouteTable';
import { RouteFilters } from './RouteFilters';
import { ErrorMessage } from '../shared/ErrorMessage';

export const RoutesTab = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filters, setFilters] = useState({ vesselType: '', fuelType: '', year: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const data = await fetchRoutes();
      setRoutes(data);
    } catch {
      setError('Failed to load routes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRoutes(); }, []);

  const handleSetBaseline = async (routeId: string) => {
    try {
      setLoading(true);
      await setBaseline(routeId);
      await loadRoutes();
    } catch {
      setError('Failed to set baseline');
    } finally {
      setLoading(false);
    }
  };

  const filtered = routes.filter((r) => (
    (!filters.vesselType || r.vesselType === filters.vesselType) &&
    (!filters.fuelType || r.fuelType === filters.fuelType) &&
    (!filters.year || r.year === parseInt(filters.year))
  ));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Routes</h2>
          <p className="text-slate-400 text-sm mt-1">Manage and monitor all maritime routes</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg">
          <span className="text-slate-400 text-xs">Total Routes</span>
          <p className="text-white font-bold text-lg">{filtered.length}</p>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <RouteFilters
        vesselType={filters.vesselType}
        fuelType={filters.fuelType}
        year={filters.year}
        onChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
      />
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
        </div>
      ) : (
        <RouteTable routes={filtered} onSetBaseline={handleSetBaseline} loading={loading} />
      )}
    </div>
  );
};