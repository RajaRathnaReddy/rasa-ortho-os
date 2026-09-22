import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockSurgeries } from '../../data/mock';
import { SURGERY_STATUS_CONFIG } from '../../lib/constants';
import { formatDate, formatTime } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { Syringe, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const pipelineStages: Array<keyof typeof SURGERY_STATUS_CONFIG> = ['recommended', 'approved', 'pre_op', 'scheduled', 'ready', 'in_surgery', 'recovery', 'discharged', 'follow_up'];

export function SurgeriesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const grouped = pipelineStages.reduce((acc, stage) => {
    acc[stage] = mockSurgeries.filter(s => s.status === stage);
    return acc;
  }, {} as Record<string, typeof mockSurgeries>);

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Surgery Pipeline</h1>
            <p className="page-subtitle">{mockSurgeries.length} surgeries across all stages</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-surface-100 rounded-lg p-0.5">
              {(['kanban', 'list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} className={cn('px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize', view === v ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500')}>
                  {v}
                </button>
              ))}
            </div>
            <button className="btn-primary"><Plus className="w-4 h-4" />Schedule Surgery</button>
          </div>
        </div>
      </motion.div>

      {view === 'kanban' && (
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map(stage => {
              const cfg = SURGERY_STATUS_CONFIG[stage];
              const items = grouped[stage] || [];
              return (
                <div key={stage} className="w-72 shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn('w-2 h-2 rounded-full', cfg.dot)} />
                    <h3 className="text-xs font-semibold text-gray-700">{cfg.label}</h3>
                    <span className="badge bg-surface-100 text-gray-500 text-[10px]">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(surg => (
                      <motion.div
                        key={surg.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-hover p-3 cursor-pointer"
                        onClick={() => navigate(`/patients/${surg.patientId}`)}
                      >
                        <p className="text-xs font-semibold text-gray-900 mb-1">{surg.procedure}</p>
                        <p className="text-[11px] text-gray-500">{surg.patientName}</p>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
                          <span>{surg.doctorName}</span>
                          <span>{formatDate(surg.date)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1.5 text-[10px]">
                          <span className="text-gray-400">{surg.otName} · {surg.expectedDuration}min</span>
                          {surg.preOpChecklist && (
                            <span className="text-gray-500">
                              ✓ {surg.preOpChecklist.filter(c => c.status === 'completed').length}/{surg.preOpChecklist.length}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {items.length === 0 && (
                      <div className="border-2 border-dashed border-surface-200 rounded-xl p-6 text-center">
                        <p className="text-[10px] text-gray-400">No surgeries</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead><tr className="bg-surface-50 border-b border-surface-200">
              <th className="table-cell table-header text-left">Procedure</th>
              <th className="table-cell table-header text-left">Patient</th>
              <th className="table-cell table-header text-left">Surgeon</th>
              <th className="table-cell table-header text-left hidden md:table-cell">Date</th>
              <th className="table-cell table-header text-left hidden lg:table-cell">OT</th>
              <th className="table-cell table-header text-left">Status</th>
            </tr></thead>
            <tbody>
              {mockSurgeries.map(surg => {
                const cfg = SURGERY_STATUS_CONFIG[surg.status];
                return (
                  <tr key={surg.id} className="table-row cursor-pointer" onClick={() => navigate(`/patients/${surg.patientId}`)}>
                    <td className="table-cell font-medium text-gray-900 text-sm">{surg.procedure}</td>
                    <td className="table-cell text-xs text-gray-600">{surg.patientName}</td>
                    <td className="table-cell text-xs text-gray-600">{surg.doctorName}</td>
                    <td className="table-cell text-xs text-gray-500 hidden md:table-cell">{formatDate(surg.date)}</td>
                    <td className="table-cell text-xs text-gray-500 hidden lg:table-cell">{surg.otName}</td>
                    <td className="table-cell"><span className={cn('badge text-[10px]', cfg.color)}>{cfg.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
