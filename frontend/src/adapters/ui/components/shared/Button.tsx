interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'success' | 'secondary';
  loading?: boolean;
}

export const Button = ({ label, onClick, disabled, variant = 'primary', loading }: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50',
    secondary: 'bg-slate-600 hover:bg-slate-500 text-white shadow-slate-900/50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg
        ${variants[variant]}
        ${disabled || loading ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading...
        </span>
      ) : label}
    </button>
  );
};