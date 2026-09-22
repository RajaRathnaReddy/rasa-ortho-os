import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Download, Users, ChevronRight, Phone, Calendar } from 'lucide-react';
import { mockPatients, mockDoctors } from '../../data/mock';
import { PATIENT_STATUS_CONFIG } from '../../lib/constants';
import { formatPhone, getInitials, formatDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';

export function PatientsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return mockPatients.filter(p => {
      const matchSearch = search === '' ||
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        p.patientId.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const statuses = Object.entries(PATIENT_STATUS_CONFIG);

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Patients</h1>
            <p className="page-subtitle">{mockPatients.length} patients registered across all branches</p>
          </div>
          <button className="btn-primary self-start">
            <Plus className="w-4 h-4" />
            New Patient
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="card mb-5">
        <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID, or phone..."
              className="input-base pl-9"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={cn('badge cursor-pointer whitespace-nowrap', statusFilter === 'all' ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-gray-500 hover:bg-surface-200')}
            >
              All ({mockPatients.length})
            </button>
            {['registered', 'in_consultation', 'surgery_scheduled', 'recovering', 'follow_up'].map(s => {
              const cfg = PATIENT_STATUS_CONFIG[s as keyof typeof PATIENT_STATUS_CONFIG];
              const count = mockPatients.filter(p => p.status === s).length;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn('badge cursor-pointer whitespace-nowrap', statusFilter === s ? cfg.color : 'bg-surface-100 text-gray-500 hover:bg-surface-200')}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>
          <button className="btn-secondary !py-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((patient, i) => {
          const statusCfg = PATIENT_STATUS_CONFIG[patient.status];
          const doctor = mockDoctors.find(d => d.id === patient.assignedDoctorId);
          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="card-hover cursor-pointer"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                      patient.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                    )}>
                      {getInitials(`${patient.firstName} ${patient.lastName}`)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{patient.firstName} {patient.lastName}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{patient.patientId} · {patient.age}yr · {patient.gender === 'male' ? 'M' : 'F'} · {patient.bloodGroup}</p>
                    </div>
                  </div>
                  <span className={cn('badge text-[10px]', statusCfg.color)}>{statusCfg.label}</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {formatPhone(patient.phone)}
                  </div>
                  {doctor && (
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-gray-400" />
                      {doctor.name}
                    </div>
                  )}
                  {patient.medicalHistory.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{patient.medicalHistory.slice(0, 2).join(', ')}</span>
                    </div>
                  )}
                </div>
                {patient.allergies.length > 0 && (
                  <div className="mt-2 flex items-center gap-1 flex-wrap">
                    {patient.allergies.map(a => (
                      <span key={a} className="badge bg-red-50 text-red-600 text-[9px]">⚠ {a}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">No patients found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
