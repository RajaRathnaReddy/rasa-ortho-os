import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, AlertTriangle, AlertCircle, Clock, Info, CheckCheck, Filter } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import { NOTIFICATION_TYPE_CONFIG } from '../../lib/constants';
import { formatRelativeDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { useState, useMemo } from 'react';

const typeIcons = {
  critical: AlertTriangle,
  important: AlertCircle,
  reminder: Clock,
  informational: Info,
};

export function NotificationPanel() {
  const { notificationPanelOpen, toggleNotificationPanel, notifications, markNotificationRead, markAllRead } = useUIStore();
  const { user } = useAuthStore();
  const [showAllFilter, setShowAllFilter] = useState(false);

  // Role-based notification filtering
  const filteredNotifications = useMemo(() => {
    if (!user || user.role === 'super_admin' || user.role === 'hospital_admin' || showAllFilter) {
      return notifications;
    }

    return notifications.filter(n => {
      const text = (n.title + ' ' + n.message).toLowerCase();
      if (user.role === 'doctor' || user.role === 'surgeon') {
        return text.includes('report') || text.includes('lab') || text.includes('surgery') || text.includes('ot') || text.includes('patient') || text.includes('consultation') || text.includes('fever') || text.includes('pre-op');
      }
      if (user.role === 'nurse') {
        return text.includes('vitals') || text.includes('ward') || text.includes('bed') || text.includes('pre-op') || text.includes('dressing') || text.includes('medication') || text.includes('fever');
      }
      if (user.role === 'physiotherapist') {
        return text.includes('rehab') || text.includes('physio') || text.includes('rom') || text.includes('exercise') || text.includes('recovery');
      }
      if (user.role === 'receptionist') {
        return text.includes('appointment') || text.includes('booking') || text.includes('queue') || text.includes('walk-in') || text.includes('reschedule') || text.includes('patient');
      }
      if (user.role === 'inventory_manager') {
        return text.includes('implant') || text.includes('stock') || text.includes('inventory') || text.includes('reorder') || text.includes('po');
      }
      if (user.role === 'finance_manager') {
        return text.includes('billing') || text.includes('invoice') || text.includes('payment') || text.includes('tpa') || text.includes('claim');
      }
      return true;
    });
  }, [notifications, user, showAllFilter]);

  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            onClick={toggleNotificationPanel}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-[61] flex flex-col border-l border-surface-200"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-surface-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="badge bg-red-100 text-red-700">{unreadCount} new</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                  <button onClick={toggleNotificationPanel} className="btn-icon">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Role filter notice */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>Filtered for: <strong className="text-gray-800 capitalize">{user?.role?.replace('_', ' ') || 'User'}</strong></span>
                <button
                  onClick={() => setShowAllFilter(!showAllFilter)}
                  className="text-[11px] text-primary-600 hover:underline flex items-center gap-1"
                >
                  <Filter className="w-3 h-3" />
                  {showAllFilter ? 'Role filtered' : 'Show all'}
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                  <Bell className="w-10 h-10 mb-3 text-gray-300" />
                  <p className="text-sm font-medium text-gray-600">No active alerts for your role</p>
                  <p className="text-xs text-gray-400 mt-1">Role-based security filters alerts specific to your duties</p>
                </div>
              ) : (
                <div className="divide-y divide-surface-100">
                  {filteredNotifications.map(notification => {
                    const config = NOTIFICATION_TYPE_CONFIG[notification.type];
                    const Icon = typeIcons[notification.type];
                    return (
                      <button
                        key={notification.id}
                        onClick={() => markNotificationRead(notification.id)}
                        className={cn(
                          'w-full text-left px-5 py-3.5 transition-colors hover:bg-surface-50 flex gap-3',
                          !notification.read && 'bg-blue-50/30'
                        )}
                      >
                        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5', config.bgLight)}>
                          <Icon className={cn('w-4 h-4', config.textColor)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn('text-sm font-medium', !notification.read ? 'text-gray-900' : 'text-gray-600')}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notification.message}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{formatRelativeDate(notification.timestamp)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
