// Reusable Module Page Shell — generates consistent pages for all remaining modules
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface ModulePageProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function ModulePage({ title, subtitle, icon, actions, children }: ModulePageProps) {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
              {icon}
            </div>
            <div>
              <h1 className="page-title">{title}</h1>
              <p className="page-subtitle">{subtitle}</p>
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </motion.div>
      {children}
    </div>
  );
}
