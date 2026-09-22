import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, CalendarDays, MonitorSmartphone, Stethoscope,
  ClipboardList, Microscope, Syringe, Activity, Bone, HeartPulse,
  Dumbbell, CalendarCheck, MessageSquare, Bot, FileBarChart, TrendingUp,
  IndianRupee, Package, UserCog, Settings, ChevronLeft, ChevronRight, X,
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { useUIStore } from '../../stores/uiStore';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, CalendarDays, MonitorSmartphone, Stethoscope,
  ClipboardList, Microscope, Syringe, Activity, Bone, HeartPulse,
  Dumbbell, CalendarCheck, MessageSquare, Bot, FileBarChart, TrendingUp,
  IndianRupee, Package, UserCog, Settings,
};

const navGroups = [
  { group: 'Overview', items: [
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  ]},
  { group: 'Patient Management', items: [
    { key: 'patients', label: 'Patients', path: '/patients', icon: 'Users' },
    { key: 'appointments', label: 'Appointments', path: '/appointments', icon: 'CalendarDays' },
    { key: 'reception', label: 'Reception', path: '/reception', icon: 'MonitorSmartphone' },
  ]},
  { group: 'Clinical', items: [
    { key: 'doctors', label: 'Doctors', path: '/doctors', icon: 'Stethoscope' },
    { key: 'consultations', label: 'Consultations', path: '/consultations', icon: 'ClipboardList' },
    { key: 'diagnostics', label: 'Diagnostics', path: '/diagnostics', icon: 'Microscope' },
  ]},
  { group: 'Surgical', items: [
    { key: 'surgeries', label: 'Surgeries', path: '/surgeries', icon: 'Syringe' },
    { key: 'ot-theatre', label: 'OT / Theatre', path: '/ot-theatre', icon: 'Activity' },
    { key: 'implants', label: 'Implants', path: '/implants', icon: 'Bone' },
  ]},
  { group: 'Recovery', items: [
    { key: 'recovery', label: 'Recovery', path: '/recovery', icon: 'HeartPulse' },
    { key: 'physiotherapy', label: 'Physiotherapy', path: '/physiotherapy', icon: 'Dumbbell' },
    { key: 'follow-ups', label: 'Follow-Ups', path: '/follow-ups', icon: 'CalendarCheck' },
  ]},
  { group: 'Operations', items: [
    { key: 'communication', label: 'Communication', path: '/communication', icon: 'MessageSquare' },
    { key: 'ai-assistant', label: 'AI Assistant', path: '/ai-assistant', icon: 'Bot' },
  ]},
  { group: 'Intelligence', items: [
    { key: 'reports', label: 'Reports', path: '/reports', icon: 'FileBarChart' },
    { key: 'analytics', label: 'Analytics', path: '/analytics', icon: 'TrendingUp' },
  ]},
  { group: 'Administration', items: [
    { key: 'finance', label: 'Finance', path: '/finance', icon: 'IndianRupee' },
    { key: 'inventory', label: 'Inventory', path: '/inventory', icon: 'Package' },
    { key: 'staff', label: 'Staff', path: '/staff', icon: 'UserCog' },
    { key: 'settings', label: 'Settings', path: '/settings', icon: 'Settings' },
  ]},
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, sidebarMobileOpen, setSidebarMobileOpen } = useUIStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-surface-200 z-50 flex flex-col transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-[72px]' : 'w-[260px]',
          'max-lg:w-[280px]',
          sidebarMobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 border-b border-surface-200 px-4 shrink-0',
          sidebarCollapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <h1 className="text-sm font-bold text-gray-900 tracking-tight whitespace-nowrap">RASA ORTHO OS</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wider whitespace-nowrap">INTELLIGENT HOSPITAL OS</p>
            </motion.div>
          )}

          {/* Mobile close */}
          <button
            className="lg:hidden ml-auto p-1 hover:bg-surface-100 rounded-lg"
            onClick={() => setSidebarMobileOpen(false)}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navGroups.map((group) => (
            <div key={group.group} className="mb-1">
              {!sidebarCollapsed && (
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 pt-3 pb-1.5">
                  {group.group}
                </p>
              )}
              {sidebarCollapsed && <div className="pt-2" />}
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    onClick={() => setSidebarMobileOpen(false)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center rounded-lg transition-all duration-150 group relative',
                      sidebarCollapsed ? 'justify-center p-2.5 mx-auto' : 'gap-3 px-3 py-2',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-500 hover:bg-surface-50 hover:text-gray-800'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-600 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {Icon && (
                      <Icon className={cn('w-[18px] h-[18px] shrink-0', isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600')} />
                    )}
                    {!sidebarCollapsed && (
                      <span className="text-[13px] font-medium whitespace-nowrap">{item.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse Toggle — Desktop */}
        <div className="hidden lg:flex items-center justify-center border-t border-surface-200 p-3">
          <button
            onClick={toggleSidebar}
            className="btn-icon w-full justify-center"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
