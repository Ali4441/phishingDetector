import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ScanLine, FileText,
  Bell, Settings, LogOut, Shield,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/scanner', icon: ScanLine, label: 'Scanner' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`relative flex flex-col bg-[#0f172a]
                       border-r border-slate-700/50 transition-all
                       duration-300 z-40
                       ${collapsed ? 'w-16' : 'w-64'}`}>

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16
                       border-b border-slate-700/50`}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex
                        items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm leading-none">
              PhishGuard
            </p>
            <p className="text-indigo-400 text-xs mt-0.5">
              AI Protection
            </p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700
                   border border-slate-600 rounded-full flex items-center
                   justify-center text-slate-400 hover:text-white
                   hover:bg-indigo-600 transition z-50"
      >
        {collapsed
          ? <ChevronRight size={12} />
          : <ChevronLeft size={12} />
        }
      </button>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-hidden">
        {!collapsed && (
          <p className="text-xs text-slate-500 uppercase tracking-widest
                        px-3 mb-3 font-medium">
            Main Menu
          </p>
        )}

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl
               transition-all duration-200 group
               ${isActive
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5
                     rounded-xl text-slate-400 hover:text-red-400
                     hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}