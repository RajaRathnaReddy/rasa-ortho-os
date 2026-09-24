import { Search, Bell, Plus, Menu, Building2, ChevronDown, LogOut, User, Shield, Stethoscope, Syringe, HeartPulse, Dumbbell, MonitorSmartphone, Package, IndianRupee } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { BRANCHES } from '../../lib/constants';
import { getInitials } from '../../lib/formatters';
import type { UserRole } from '../../types';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const roleOptions: { role: UserRole; label: string; name: string; icon: React.ComponentType<{ className?: string }>; color: string; badge: string }[] = [
  { role: 'super_admin', label: 'Super Admin', name: 'Raja Rathna Reddy', icon: Shield, color: 'text-indigo-600 bg-indigo-50', badge: 'Platform Owner' },
  { role: 'doctor', label: 'Doctor OPD', name: 'Dr. Anand K.', icon: Stethoscope, color: 'text-teal-600 bg-teal-50', badge: 'Joint Specialist' },
  { role: 'surgeon', label: 'Surgeon OT', name: 'Dr. Lakshmi N.', icon: Syringe, color: 'text-purple-600 bg-purple-50', badge: 'Spine & OT Lead' },
  { role: 'nurse', label: 'Staff Nurse', name: 'Nurse Ramya', icon: HeartPulse, color: 'text-pink-600 bg-pink-50', badge: 'Ward & Pre-Op' },
  { role: 'physiotherapist', label: 'Physiotherapist', name: 'Arun Kumar PT', icon: Dumbbell, color: 'text-amber-600 bg-amber-50', badge: 'Rehab Lead' },
  { role: 'receptionist', label: 'Receptionist', name: 'Priya Rec.', icon: MonitorSmartphone, color: 'text-blue-600 bg-blue-50', badge: 'Front Desk' },
  { role: 'inventory_manager', label: 'Inventory & OT', name: 'Ramesh Inv.', icon: Package, color: 'text-emerald-600 bg-emerald-50', badge: 'Implants & Stock' },
  { role: 'finance_manager', label: 'Finance Manager', name: 'Kiran Finance', icon: IndianRupee, color: 'text-cyan-600 bg-cyan-50', badge: 'Billing & TPA' },
];

export function TopNav() {
  const navigate = useNavigate();
  const { toggleCommandPalette, toggleNotificationPanel, toggleQuickCreate, unreadCount, setSidebarMobileOpen } = useUIStore();
  const { user, currentBranch, setBranch, logout, login } = useAuthStore();
  const [branchOpen, setBranchOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const branchRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (branchRef.current && !branchRef.current.contains(e.target as Node)) setBranchOpen(false);
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleCommandPalette]);

  const currentRoleConfig = roleOptions.find(r => r.role === user?.role) || roleOptions[0];
  const CurrentIcon = currentRoleConfig.icon;

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-surface-200 flex items-center justify-between px-3 lg:px-6 sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-2 lg:gap-3">
        <button
          className="lg:hidden btn-icon"
          onClick={() => setSidebarMobileOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Trigger */}
        <button
          onClick={toggleCommandPalette}
          className="hidden sm:flex items-center gap-2 bg-surface-50 hover:bg-surface-100 border border-surface-200 rounded-lg px-3 py-1.5 text-sm text-gray-400 transition-all w-56 lg:w-72"
        >
          <Search className="w-4 h-4" />
          <span>Search patients, records...</span>
          <kbd className="ml-auto hidden lg:inline-flex items-center gap-1 rounded border border-surface-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={toggleCommandPalette}
          className="sm:hidden btn-icon"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Actions & Role Switcher */}
      <div className="flex items-center gap-1.5 lg:gap-2.5">
        {/* Quick Create */}
        <button
          onClick={toggleQuickCreate}
          className="btn-primary hidden md:inline-flex !py-1.5 !px-3 !text-xs !rounded-lg shadow-xs hover:shadow-sm active:scale-95 transition-all"
          title="Quick Action Hub — Register patient, book consultation, schedule OT"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Quick Create</span>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-primary-200 bg-primary-50/70 hover:bg-primary-50 text-xs font-semibold text-primary-900 transition-all shadow-xs"
            title="Switch User Role / Dashboard Perspective"
          >
            <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-primary-600 shadow-2xs">
              <CurrentIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[11px] font-bold text-primary-900 block leading-tight">{currentRoleConfig.label}</span>
              <span className="text-[9px] text-primary-700 block font-normal leading-tight">{user?.name?.split(' ')[0]}</span>
            </div>
            <span className="sm:hidden text-xs">{currentRoleConfig.label.split(' ')[0]}</span>
            <ChevronDown className={cn('w-3 h-3 text-primary-600 transition-transform ml-0.5', roleOpen && 'rotate-180')} />
          </button>

          {roleOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-xl border border-surface-200 shadow-xl animate-scale-in p-1.5 z-50">
              <div className="px-3 py-2 border-b border-surface-100 mb-1">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Switch Role Perspective</p>
                <p className="text-xs text-gray-500">Instantly experience role-specific dashboards</p>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-0.5">
                {roleOptions.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = user?.role === opt.role;
                  return (
                    <button
                      key={opt.role}
                      onClick={() => {
                        login(opt.role);
                        setRoleOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-all',
                        isSelected ? 'bg-primary-50 text-primary-800 font-semibold ring-1 ring-primary-200' : 'hover:bg-surface-50 text-gray-700'
                      )}
                    >
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', opt.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs text-gray-900">{opt.label}</p>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface-100 text-gray-500">{opt.badge}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 truncate">{opt.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Branch Selector */}
        <div className="relative hidden lg:block" ref={branchRef}>
          <button
            onClick={() => setBranchOpen(!branchOpen)}
            className="btn-ghost !px-2.5 !py-1.5 !text-xs !gap-1.5 border border-surface-200"
          >
            <Building2 className="w-3.5 h-3.5 text-primary-500" />
            <span className="max-w-20 truncate">{currentBranch.city}</span>
            <ChevronDown className={cn('w-3 h-3 text-gray-400 transition-transform', branchOpen && 'rotate-180')} />
          </button>
          {branchOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl border border-surface-200 shadow-xl animate-scale-in p-1 z-50">
              {BRANCHES.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => { setBranch(branch.id); setBranchOpen(false); }}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-xs transition-colors',
                    currentBranch.id === branch.id ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-surface-50'
                  )}
                >
                  <p className="font-medium text-xs">{branch.name}</p>
                  <p className="text-[10px] text-gray-400">{branch.city}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          onClick={toggleNotificationPanel}
          className="btn-icon relative"
          aria-label="Open notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              {user ? getInitials(user.name) : 'U'}
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl border border-surface-200 shadow-xl animate-scale-in p-1 z-50">
              <div className="px-3 py-2.5 border-b border-surface-100 mb-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                  {(user?.email?.toLowerCase() === 'a.rajarathnareddychenni@gmail.com' || user?.id === 'user-raja-007' || user?.name?.toLowerCase().trim() === 'raja rathna reddy') && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                      Owner
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full capitalize">
                  {user?.role?.replace('_', ' ')}
                </span>
              </div>
              {(user?.email?.toLowerCase() === 'a.rajarathnareddychenni@gmail.com' || user?.id === 'user-raja-007' || user?.name?.toLowerCase().trim() === 'raja rathna reddy') && (
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate('/admin/users');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-indigo-50 text-indigo-700 flex items-center gap-2 font-medium"
                >
                  <Shield className="w-4 h-4 text-indigo-600" />
                  User Access Control
                </button>
              )}
              <button
                onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Switch User
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
