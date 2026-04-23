export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
}) {
  const baseStyles =
    'font-medium transition-all duration-200 rounded-lg inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white focus:ring-blue-400',
    secondary:
      'border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 focus:ring-slate-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
