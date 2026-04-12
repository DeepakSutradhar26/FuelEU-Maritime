interface BadgeProps {
  value: boolean;
}

export const Badge = ({ value }: BadgeProps) => (
  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
    value
      ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-700'
      : 'bg-red-900/60 text-red-400 border border-red-700'
  }`}>
    {value ? '✅ Compliant' : '❌ Non-Compliant'}
  </span>
);