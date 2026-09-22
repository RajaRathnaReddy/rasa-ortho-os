import { motion } from 'framer-motion';
import { HeartPulse, Dumbbell, Calendar, TrendingUp } from 'lucide-react';
import { mockRecoveryPlans } from '../../data/mock';
import { formatDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { useNavigate } from 'react-router-dom';

export function RecoveryPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1 className="page-title">Recovery Management</h1>
          <p className="page-subtitle">{mockRecoveryPlans.filter(r => r.status === 'active').length} active recovery plans</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockRecoveryPlans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card-hover cursor-pointer" onClick={() => navigate(`/patients/${plan.patientId}`)}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{plan.patientName}</p>
                  <p className="text-xs text-gray-400">{plan.doctorName}</p>
                </div>
                <span className={cn('badge', plan.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700')}>
                  {plan.status}
                </span>
              </div>

              {/* Progress Ring */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={plan.progress >= 80 ? '#10b981' : plan.progress >= 50 ? '#3b82f6' : '#f59e0b'}
                      strokeWidth="5" strokeDasharray={`${plan.progress * 1.76} 176`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">{plan.progress}%</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Milestones</span>
                    <span className="font-medium text-gray-700">{plan.milestones.filter(m => m.status === 'completed').length}/{plan.milestones.length}</span>
                  </div>
                  <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(plan.milestones.filter(m => m.status === 'completed').length / plan.milestones.length) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Recent Milestones */}
              <div className="space-y-1.5">
                {plan.milestones.slice(0, 4).map(m => (
                  <div key={m.id} className="flex items-center gap-2 text-xs">
                    <span className={cn('w-1.5 h-1.5 rounded-full shrink-0',
                      m.status === 'completed' ? 'bg-emerald-400' : m.status === 'overdue' ? 'bg-red-400' : 'bg-gray-300'
                    )} />
                    <span className={cn('flex-1', m.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-600')}>{m.label}</span>
                    <span className="text-[10px] text-gray-400">{formatDate(m.targetDate)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
