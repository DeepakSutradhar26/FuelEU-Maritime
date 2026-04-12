interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'green' | 'red' | 'blue' | 'gray' | 'yellow';
  icon?: string;
}

export const KpiCard = ({ title, value, subtitle, color = 'blue', icon }: KpiCardProps) => {
  const colors = {
    green: 'border-green-500 bg-gradient-to-br from-green-900/40 to-green-800/20 text-green-400',
    red: 'border-red-500 bg-gradient-to-br from-red-900/40 to-red-800/20 text-red-400',
    blue: 'border-blue-500 bg-gradient-to-br from-blue-900/40 to-blue-800/20 text-blue-400',
    gray: 'border-slate-500 bg-gradient-to-br from-slate-800/40 to-slate-700/20 text-slate-400',
    yellow: 'border-yellow-500 bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 text-yellow-400',
  };

  return (
    <div className={`border-l-4 rounded-xl p-5 shadow-lg backdrop-blur-sm ${colors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-xs mt-2 opacity-60">{subtitle}</p>}
    </div>
  );
};