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
  quickCreateOpen: boolean;
  toggleQuickCreate: () => void;
  setQuickCreateOpen: (open: boolean) => void;
  copilotOpen: boolean;
  toggleCopilot: () => void;
  setCopilotOpen: (open: boolean) => void;
  copilotInitialQuery?: string;
  setCopilotInitialQuery: (q?: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  commandPaletteOpen: false,
  notificationPanelOpen: false,
  quickCreateOpen: false,
  copilotOpen: false,
  copilotInitialQuery: undefined,
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
  toggleCommandPalette: () => set(s => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  toggleNotificationPanel: () => set(s => ({ notificationPanelOpen: !s.notificationPanelOpen })),
  toggleQuickCreate: () => set(s => ({ quickCreateOpen: !s.quickCreateOpen })),
  setQuickCreateOpen: (open) => set({ quickCreateOpen: open }),
  toggleCopilot: () => set(s => ({ copilotOpen: !s.copilotOpen })),
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  setCopilotInitialQuery: (q) => set({ copilotInitialQuery: q, copilotOpen: true }),
  markNotificationRead: (id) => set(s => {
    const notifications = s.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications, unreadCount: notifications.filter(n => !n.read).length };
  }),
  markAllRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
}));
