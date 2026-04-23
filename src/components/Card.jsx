export default function Card({ children, className = '', hoverable = false }) {
  return (
    <div
      className={`bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm ${
        hoverable
          ? 'hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-soft-lg transition-all duration-300'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
