import { useEffect, useState } from 'react';
import {
  ShieldCheck, ShieldAlert, AlertTriangle,
  Activity, TrendingUp, TrendingDown
} from 'lucide-react';

const config = {
  primary: {
    icon: Activity,
    gradient: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/30',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
    textColor: 'text-indigo-400',
    glow: 'shadow-indigo-500/10',
  },
  danger: {
    icon: ShieldAlert,
    gradient: 'from-red-500/20 to-red-600/5',
    border: 'border-red-500/30',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    textColor: 'text-red-400',
    glow: 'shadow-red-500/10',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    textColor: 'text-amber-400',
    glow: 'shadow-amber-500/10',
  },
  success: {
    icon: ShieldCheck,
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
};

// ── Animated Counter Hook ─────────────────────────────
function useCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function StatsCard({ label, value = 0, color = 'primary', trend }) {
  const c = config[color] || config.primary;
  const Icon = c.icon;
  const animatedVal = useCounter(value);

  return (
    <div className={`relative overflow-hidden rounded-2xl
                     bg-gradient-to-br ${c.gradient}
                     border ${c.border}
                     shadow-xl ${c.glow}
                     p-5 group hover:scale-[1.02]
                     transition-all duration-300`}>

      {/* Background Orb */}
      <div className={`absolute -top-6 -right-6 w-24 h-24
                       ${c.iconBg} rounded-full blur-2xl
                       opacity-60 group-hover:opacity-100
                       transition-opacity duration-300`} />

      {/* Top Row */}
      <div className="flex items-start justify-between relative z-10">
        <div className={`w-10 h-10 rounded-xl ${c.iconBg}
                         flex items-center justify-center
                         border ${c.border}`}>
          <Icon size={20} className={c.iconColor} />
        </div>

        {/* Trend Badge */}
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs px-2 py-1
                           rounded-full font-medium
                           ${trend >= 0
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0
              ? <TrendingUp size={12} />
              : <TrendingDown size={12} />
            }
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-4 relative z-10">
        <p className={`text-4xl font-black tracking-tight ${c.textColor}`}>
          {animatedVal.toLocaleString()}
        </p>
        <p className="text-slate-400 text-sm font-medium mt-1">
          {label}
        </p>
      </div>

      {/* Bottom Bar */}
      <div className={`mt-4 h-1 w-full rounded-full bg-slate-700/50`}>
        <div
          className={`h-1 rounded-full ${c.iconBg} border ${c.border}
                      transition-all duration-1000`}
          style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}