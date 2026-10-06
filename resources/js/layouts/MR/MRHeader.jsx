import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Bell, User, LogOut, ExternalLink, ChevronDown } from 'lucide-react';

export default function MRHeader({ onToggleSidebar, title = 'MR Dashboard' }) {
  const { props } = usePage();
  const authUser = props.auth?.user || {};
  const userName = authUser.name || 'Medical Representative';
  const userEmail = authUser.email || 'mr@ciplon.com';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Public Site Link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {/* Notifications Icon */}
        <button
          type="button"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-teal-600 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative pl-2 border-l border-slate-200" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block leading-tight">
              <span className="block text-xs font-semibold text-slate-900 truncate max-w-[130px]">{userName}</span>
              <span className="inline-block text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded mt-0.5">
                Medical Representative
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200/80 shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2.5 border-b border-slate-100">
                <span className="block font-bold text-slate-900 truncate">{userName}</span>
                <span className="block text-[11px] text-slate-400 truncate">{userEmail}</span>
                <span className="inline-block text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full mt-1.5">
                  Medical Representative (MR)
                </span>
              </div>

              <div className="py-1">
                <div className="px-3.5 py-2 text-slate-400 font-medium flex items-center gap-2 cursor-not-allowed">
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                  <span className="ml-auto text-[9px] bg-slate-100 px-1 rounded">Soon</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="w-full px-3.5 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
