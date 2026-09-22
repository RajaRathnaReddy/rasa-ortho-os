import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Filter } from 'lucide-react';
import { mockAppointments, mockDoctors } from '../../data/mock';
import { APPOINTMENT_STATUS_CONFIG } from '../../lib/constants';
import { formatTime, formatDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';

type ViewMode = 'day' | 'week' | 'list';

export function AppointmentsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = mockAppointments.filter(a => a.date === today);

  const filtered = useMemo(() => {
    const base = view === 'day' ? todayAppts : mockAppointments;
    if (statusFilter === 'all') return base;
    return base.filter(a => a.status === statusFilter);
  }, [view, statusFilter, todayAppts]);

  // Group by time slots for day view
  const timeSlots = useMemo(() => {
    if (view !== 'day') return {};
    const slots: Record<string, typeof filtered> = {};
    filtered.forEach(a => {
      const hour = a.startTime.split(':')[0];
      if (!slots[hour]) slots[hour] = [];
      slots[hour].push(a);
    });
    return slots;
  }, [filtered, view]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockAppointments.forEach(a => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Appointments</h1>
            <p className="page-subtitle">{todayAppts.length} appointments today · {mockAppointments.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-surface-100 rounded-lg p-0.5">
              {(['day', 'week', 'list'] as ViewMode[]).map(v => (
                <button key={v} onClick={() => setView(v)} className={cn('px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize', view === v ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700')}>
                  {v}
                </button>
              ))}
            </div>
            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status Filter Pills */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        <button onClick={() => setStatusFilter('all')} className={cn('badge cursor-pointer whitespace-nowrap', statusFilter === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-gray-500')}>
          All ({mockAppointments.length})
        </button>
        {Object.entries(APPOINTMENT_STATUS_CONFIG).map(([key, cfg]) => (
          <button key={key} onClick={() => setStatusFilter(key)} className={cn('badge cursor-pointer whitespace-nowrap', statusFilter === key ? cfg.color : 'bg-surface-100 text-gray-500')}>
            {cfg.label} ({statusCounts[key] || 0})
          </button>
        ))}
      </div>

      {/* Day View */}
      {view === 'day' && (
        <div className="space-y-2">
          {Object.entries(timeSlots).sort(([a], [b]) => parseInt(a) - parseInt(b)).map(([hour, appts]) => (
            <div key={hour} className="flex gap-4">
              <div className="w-16 pt-3 text-right">
                <p className="text-xs font-semibold text-gray-400">{formatTime(`${hour}:00`)}</p>
              </div>
              <div className="flex-1 space-y-2">
                {appts.map(apt => {
                  const cfg = APPOINTMENT_STATUS_CONFIG[apt.status];
                  return (
                    <div key={apt.id} className="card-hover p-3 cursor-pointer" onClick={() => navigate(`/patients/${apt.patientId}`)}>
                      <div className="flex items-center gap-3">
                        <div className={cn('w-1 h-10 rounded-full', cfg.dot)} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{apt.patientName}</p>
                            <span className={cn('badge text-[10px]', cfg.color)}>{cfg.label}</span>
                          </div>
                          <p className="text-xs text-gray-500">{formatTime(apt.startTime)} - {formatTime(apt.endTime)} · {apt.doctorName}</p>
                          <p className="text-[10px] text-gray-400">{apt.reason}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {Object.keys(timeSlots).length === 0 && (
            <div className="card p-12 text-center">
              <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No appointments for today</p>
              <button className="btn-primary mt-3 !text-xs">Book Appointment</button>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {(view === 'list' || view === 'week') && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-surface-50 border-b border-surface-200">
                <th className="table-cell table-header text-left">Time</th>
                <th className="table-cell table-header text-left">Patient</th>
                <th className="table-cell table-header text-left">Doctor</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Type</th>
                <th className="table-cell table-header text-left hidden lg:table-cell">Reason</th>
                <th className="table-cell table-header text-left">Status</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Wait</th>
              </tr></thead>
              <tbody>
                {filtered.slice(0, 50).map(apt => {
                  const cfg = APPOINTMENT_STATUS_CONFIG[apt.status];
                  return (
                    <tr key={apt.id} className="table-row cursor-pointer" onClick={() => navigate(`/patients/${apt.patientId}`)}>
                      <td className="table-cell">
                        <p className="text-xs font-medium text-gray-900">{formatTime(apt.startTime)}</p>
                        <p className="text-[10px] text-gray-400">{formatDate(apt.date)}</p>
                      </td>
                      <td className="table-cell">
                        <p className="text-sm font-medium text-gray-900">{apt.patientName}</p>
                      </td>
                      <td className="table-cell text-xs text-gray-600">{apt.doctorName}</td>
                      <td className="table-cell text-xs text-gray-500 capitalize hidden md:table-cell">{apt.type.replace('_', ' ')}</td>
                      <td className="table-cell text-xs text-gray-500 hidden lg:table-cell max-w-48 truncate">{apt.reason}</td>
                      <td className="table-cell"><span className={cn('badge text-[10px]', cfg.color)}>{cfg.label}</span></td>
                      <td className="table-cell text-xs text-gray-500 hidden md:table-cell">
                        {apt.waitingDuration ? <span className="text-amber-600 font-medium">{apt.waitingDuration}m</span> : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
