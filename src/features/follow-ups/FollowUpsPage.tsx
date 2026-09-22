import { motion } from 'framer-motion';
import { CalendarCheck, Plus } from 'lucide-react';
import { mockFollowUps } from '../../data/mock';
import { FOLLOW_UP_STATUS_CONFIG } from '../../lib/constants';
import { formatDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function FollowUpsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? mockFollowUps : mockFollowUps.filter(f => f.status === filter);
  const counts = { due_today: mockFollowUps.filter(f => f.status === 'due_today').length, overdue: mockFollowUps.filter(f => f.status === 'overdue').length, upcoming: mockFollowUps.filter(f => f.status === 'upcoming').length, completed: mockFollowUps.filter(f => f.status === 'completed').length, missed: mockFollowUps.filter(f => f.status === 'missed').length };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between page-header">
          <div><h1 className="page-title">Follow-Up Engine</h1><p className="page-subtitle">{counts.due_today} due today · {counts.overdue} overdue · {mockFollowUps.length} total</p></div>
          <button className="btn-primary"><Plus className="w-4 h-4" />Schedule Follow-Up</button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {Object.entries(FOLLOW_UP_STATUS_CONFIG).map(([key, cfg]) => (
          <button key={key} onClick={() => setFilter(key)} className={cn('card p-4 text-center cursor-pointer transition-all', filter === key && 'ring-2 ring-primary-400')}>
            <p className="text-2xl font-bold text-gray-900">{counts[key as keyof typeof counts] || 0}</p>
            <span className={cn('badge text-[10px] mt-1', cfg.color)}>{cfg.label}</span>
          </button>
        ))}
      </div>

      <button onClick={() => setFilter('all')} className={cn('mb-4 badge cursor-pointer', filter === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-gray-500')}>Show All ({mockFollowUps.length})</button>

      <div className="space-y-2">
        {filtered.map(fu => {
          const cfg = FOLLOW_UP_STATUS_CONFIG[fu.status];
          return (
            <div key={fu.id} className="card-hover p-4 flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/patients/${fu.patientId}`)}>
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', cfg.color.split(' ')[0])}>
                <CalendarCheck className={cn('w-5 h-5', cfg.color.split(' ')[1])} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{fu.patientName}</p>
                <p className="text-xs text-gray-500">{fu.reason} · Day {fu.daysSinceSurgery} · {fu.doctorName}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={cn('badge text-[10px]', cfg.color)}>{cfg.label}</span>
                <p className="text-[10px] text-gray-400 mt-1">{formatDate(fu.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
