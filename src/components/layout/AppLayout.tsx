import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { CommandPalette } from '../ui/CommandPalette';
import { NotificationPanel } from '../ui/NotificationPanel';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../lib/cn';

export function AppLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        )}
      >
        <TopNav />
        <main className="min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
      <NotificationPanel />
    </div>
  );
}
