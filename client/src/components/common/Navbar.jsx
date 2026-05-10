import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  Shield,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import api from "../../api/axiosInstance";
import AlertBadge from "./AlertBadge";

export default function Navbar({ onMenuClick }) {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const dropdownRef = useRef(null);

  // 🔥 Fetch Alerts
  useEffect(() => {

    const fetchAlerts = async () => {

      try {

        const { data } =
          await api.get("/alerts");

        setUnreadCount(
          data.unreadCount || 0
        );

      } catch (err) {

        console.error(err);
      }
    };

    fetchAlerts();

    // Optional auto refresh
    const interval =
      setInterval(fetchAlerts, 15000);

    return () =>
      clearInterval(interval);

  }, []);

  // 🔒 Close dropdown outside click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // 🔎 Search submit
  const handleSearch = (e) => {

    if (e.key === "Enter") {

      if (!searchQuery.trim()) return;

      navigate(
        `/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
    }
  };

  // 🚪 Logout
  const handleLogout = () => {

    logout?.();

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <header
      className="
        h-16
        sticky top-0 z-40
        border-b border-slate-800
        bg-[#0b1120]/80
        backdrop-blur-xl
      "
    >

      <div className="h-full px-4 lg:px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              p-2 rounded-xl
              text-slate-400
              hover:bg-slate-800
              hover:text-white
              transition
            "
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="
              flex items-center gap-3
              cursor-pointer
              group
            "
          >

            <div
              className="
                h-10 w-10 rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                flex items-center justify-center
                shadow-lg shadow-indigo-900/40
              "
            >
              <Shield
                size={20}
                className="text-white"
              />
            </div>

            <div className="hidden sm:block">

              <h1
                className="
                  text-sm font-bold text-white
                  group-hover:text-cyan-400
                  transition
                "
              >
                AI Phishing Shield
              </h1>

              <p className="text-[11px] text-slate-500">
                Threat Intelligence System
              </p>

            </div>

          </div>

        </div>

        {/* CENTER SEARCH */}
        <div
          className={`
            hidden md:flex
            items-center
            transition-all duration-300
            ${showSearch
              ? "w-[400px]"
              : "w-12"
            }
          `}
        >

          <div
            className="
              flex items-center gap-2
              w-full
            "
          >

            {showSearch && (

              <div className="relative w-full">

                <Search
                  size={16}
                  className="
                    absolute left-4 top-3
                    text-slate-500
                  "
                />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search scans, threats, reports..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  onKeyDown={handleSearch}
                  className="
                    w-full
                    pl-11 pr-4 py-2.5
                    rounded-2xl
                    bg-slate-900/70
                    border border-slate-700
                    text-sm text-white
                    placeholder:text-slate-500
                    outline-none
                    focus:border-cyan-500
                    transition
                  "
                />

              </div>
            )}

            <button
              onClick={() =>
                setShowSearch(
                  !showSearch
                )
              }
              className="
                p-2.5 rounded-xl
                text-slate-400
                hover:text-white
                hover:bg-slate-800
                transition
              "
            >
              {showSearch
                ? <X size={18} />
                : <Search size={18} />
              }
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Alerts */}
          <div className="relative">

            <button
              onClick={() =>
                navigate("/alerts")
              }
              className="
                relative
                p-2.5 rounded-xl
                text-slate-400
                hover:bg-slate-800
                hover:text-white
                transition
              "
            >

              <Bell size={20} />

              {unreadCount > 0 && (
                <AlertBadge
                  count={unreadCount}
                />
              )}

            </button>

          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-800" />

          {/* USER */}
          <div
            ref={dropdownRef}
            className="relative"
          >

            <button
              onClick={() =>
                setShowProfileMenu(
                  !showProfileMenu
                )
              }
              className="
                flex items-center gap-3
                p-1.5 pr-3
                rounded-2xl
                hover:bg-slate-800
                transition
              "
            >

              {/* Avatar */}
              <div
                className="
                  h-10 w-10 rounded-xl
                  bg-gradient-to-br
                  from-indigo-500
                  to-cyan-500
                  flex items-center justify-center
                  text-white font-bold
                  shadow-lg
                "
              >
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              {/* User Info */}
              <div className="hidden sm:block text-left">

                <p className="text-sm font-semibold text-white leading-none">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-slate-400 mt-1 capitalize">
                  {user?.role || "user"}
                </p>

              </div>

              <ChevronDown
                size={16}
                className={`
                  text-slate-500 transition
                  ${showProfileMenu
                    ? "rotate-180"
                    : ""
                  }
                `}
              />

            </button>

            {/* Dropdown */}
            {showProfileMenu && (

              <div
                className="
                  absolute right-0 mt-3
                  w-64
                  rounded-2xl
                  border border-slate-800
                  bg-[#111827]/95
                  backdrop-blur-xl
                  shadow-2xl
                  overflow-hidden
                  animate-in fade-in zoom-in-95
                "
              >

                {/* Top */}
                <div className="p-4 border-b border-slate-800">

                  <p className="font-semibold text-white">
                    {user?.name}
                  </p>

                  <p className="text-sm text-slate-400 mt-1 break-all">
                    {user?.email}
                  </p>

                </div>

                {/* Menu */}
                <div className="p-2">

                  <button
                    onClick={() =>
                      navigate("/profile")
                    }
                    className="
                      w-full flex items-center gap-3
                      px-3 py-2.5
                      rounded-xl
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                      transition
                    "
                  >
                    <User size={17} />
                    Profile
                  </button>

                  <button
                    onClick={() =>
                      navigate("/settings")
                    }
                    className="
                      w-full flex items-center gap-3
                      px-3 py-2.5
                      rounded-xl
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                      transition
                    "
                  >
                    <Settings size={17} />
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center gap-3
                      px-3 py-2.5
                      rounded-xl
                      text-red-400
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}