export default function AlertBadge({ count = 0, size = 'md' }) {

  if (count === 0) return null;

  const sizeClass = {
    sm: 'w-4 h-4 text-[9px]',
    md: 'w-5 h-5 text-[10px]',
    lg: 'w-6 h-6 text-xs',
  }[size];

  return (
    <span className={`absolute -top-1 -right-1 ${sizeClass}
                      bg-red-500 text-white font-bold rounded-full
                      flex items-center justify-center
                      ring-2 ring-[#0f172a] animate-pulse`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}