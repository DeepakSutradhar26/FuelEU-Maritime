interface RouteFiltersProps {
  vesselType: string;
  fuelType: string;
  year: string;
  onChange: (key: string, value: string) => void;
}

export const RouteFilters = ({ vesselType, fuelType, year, onChange }: RouteFiltersProps) => (
  <div className="flex gap-3 flex-wrap">
    {[
      { key: 'vesselType', value: vesselType, options: ['Container', 'BulkCarrier', 'Tanker', 'RoRo'], label: 'Vessel Type' },
      { key: 'fuelType', value: fuelType, options: ['HFO', 'LNG', 'MGO'], label: 'Fuel Type' },
      { key: 'year', value: year, options: ['2024', '2025'], label: 'Year' },
    ].map(({ key, value, options, label }) => (
      <select
        key={key}
        value={value}
        onChange={(e) => onChange(key, e.target.value)}
        className="bg-slate-800 border border-slate-600 text-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="">All {label}s</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ))}
  </div>
);