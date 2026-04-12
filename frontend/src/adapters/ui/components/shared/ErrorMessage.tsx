interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-xl flex items-center gap-3">
    <span className="text-xl">⚠️</span>
    <span className="text-sm font-medium">{message}</span>
  </div>
);