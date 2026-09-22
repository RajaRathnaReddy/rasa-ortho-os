import { create } from 'zustand';
import type { Notification } from '../types';
import { mockNotifications } from '../data/mock';

interface UIState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  commandPaletteOpen: boolean;
  notificationPanelOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  toggleNotificationPanel: () => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  commandPaletteOpen: false,
  notificationPanelOpen: false,
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
  toggleCommandPalette: () => set(s => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  toggleNotificationPanel: () => set(s => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  markNotificationRead: (id) => set(s => {
    const notifications = s.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications, unreadCount: notifications.filter(n => !n.read).length };
  }),
  markAllRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
}));
