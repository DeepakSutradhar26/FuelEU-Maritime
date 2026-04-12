interface PoolSumIndicatorProps {
  sum: number;
}

export const PoolSumIndicator = ({ sum }: PoolSumIndicatorProps) => (
  <div className={`rounded-lg p-4 text-sm font-semibold ${sum >= 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
    Pool CB Sum: {sum.toLocaleString()} gCO₂e — {sum >= 0 ? '✅ Valid Pool' : '❌ Invalid Pool (sum must be ≥ 0)'}
  </div>
);