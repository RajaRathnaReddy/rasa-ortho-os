import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Filter,
  Search, User, Stethoscope, Phone, AlertCircle, CheckCircle2,
  Activity, ArrowRight, MessageSquare, ShieldAlert, Sparkles,
  Check, X, Eye, FileText, ChevronDown, RefreshCw
} from 'lucide-react';
import { mockAppointments, mockDoctors, mockPatients } from '../../data/mock';
import { APPOINTMENT_STATUS_CONFIG } from '../../lib/constants';
import { formatTime, formatDate } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import type { Appointment, AppointmentStatus } from '../../types';

type ViewMode = 'list' | 'queue' | 'day';

export function AppointmentsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(mockAppointments);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // New Booking State
  const [newPatientName, setNewPatientName] = useState('');
  const [newDoctorId, setNewDoctorId] = useState(mockDoctors[0]?.id || '');
  const [newTime, setNewTime] = useState('10:00');
  const [newType, setNewType] = useState('new_consultation');
  const [newReason, setNewReason] = useState('Right Knee Pain & Stiffness');

  const today = new Date().toISOString().split('T')[0];
  const isToday = selectedDate === today;

  const todayAppts = useMemo(() => {
    return appointmentsList.filter(a => a.date === selectedDate);
  }, [appointmentsList, selectedDate]);

  // Status Counts for current date
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    todayAppts.forEach(a => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  }, [todayAppts]);

  // KPI Metrics
  const kpis = useMemo(() => {
    const total = todayAppts.length;
    const arrived = todayAppts.filter(a => a.status === 'arrived' || a.status === 'waiting').length;
    const inConsult = todayAppts.filter(a => a.status === 'in_consultation').length;
    const completed = todayAppts.filter(a => a.status === 'completed').length;
    const delayed = todayAppts.filter(a => (a.waitingDuration || 0) > 30).length;
    const avgWait = todayAppts.filter(a => a.waitingDuration).reduce((acc, a) => acc + (a.waitingDuration || 0), 0);
    const avgWaitMins = arrived > 0 ? Math.round(avgWait / Math.max(1, todayAppts.filter(a => a.waitingDuration).length)) : 14;

    return { total, arrived, inConsult, completed, delayed, avgWaitMins };
  }, [todayAppts]);

  // Filtered Appointments
  const filtered = useMemo(() => {
    return todayAppts.filter(a => {
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchDoctor = doctorFilter === 'all' || a.doctorId === doctorFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        a.patientName.toLowerCase().includes(query) ||
        a.doctorName.toLowerCase().includes(query) ||
        a.reason.toLowerCase().includes(query) ||
        (a.tokenNumber && `tk-${a.tokenNumber}`.includes(query));
      return matchStatus && matchDoctor && matchSearch;
    });
  }, [todayAppts, statusFilter, doctorFilter, searchQuery]);

  // Quick Action Handler
  const handleUpdateStatus = (id: string, newStatus: AppointmentStatus, patientName: string) => {
    setAppointmentsList(prev =>
      prev.map(a => (a.id === id ? { ...a, status: newStatus, waitingDuration: newStatus === 'in_consultation' ? 0 : a.waitingDuration } : a))
    );
    setActionToast(`Updated ${patientName}'s status to: ${newStatus.replace('_', ' ').toUpperCase()}`);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const doc = mockDoctors.find(d => d.id === newDoctorId) || mockDoctors[0];
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: `pat-${Date.now()}`,
      patientName: newPatientName,
      doctorId: doc.id,
      doctorName: doc.name,
      date: selectedDate,
      startTime: newTime,
      endTime: `${parseInt(newTime.split(':')[0]) + 1}:00`,
      type: newType as any,
      status: 'confirmed',
      reason: newReason,
      branchId: 'branch-1',
      tokenNumber: todayAppts.length + 1,
      waitingDuration: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAppointmentsList(prev => [newApt, ...prev]);
    setIsBookModalOpen(false);
    setNewPatientName('');
    setActionToast(`Booked appointment for ${newPatientName} with ${doc.name}!`);
    setTimeout(() => setActionToast(null), 3500);
  };

  return (
    <div className="page-container space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white border border-teal-500/40 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>{actionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Controls */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="page-title">OPD Appointments & Queue</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">
                {kpis.total} Scheduled Today
              </span>
            </div>
            <p className="page-subtitle">
              Live outpatient reception queue · Token dispatching · Surgeon consultation slots
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-2xs">
              {(['list', 'queue', 'day'] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer',
                    view === v
                      ? 'bg-white text-teal-900 shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  )}
                >
                  {v === 'list' ? 'List View' : v === 'queue' ? 'Cabin Queue' : 'Hourly Day'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-3.5 shadow-sm flex items-center gap-1.5 font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ EXECUTIVE OPERATIONAL KPI BAR ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="card p-3.5 border-l-4 border-l-teal-600 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today's Appointments</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{kpis.total}</p>
            <span className="text-[10px] text-teal-700 font-semibold">{todayAppts.length} slots active</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <CalendarDays className="w-4 h-4" />
          </div>
        </div>

        <div className="card p-3.5 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Arrived / In Waiting</span>
            <p className="text-xl font-black text-amber-700 mt-0.5 flex items-center gap-1.5">
              <span>{kpis.arrived}</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
            </p>
            <span className="text-[10px] text-slate-500 font-medium">Waiting for doctor</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="card p-3.5 border-l-4 border-l-violet-600 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">In Consultation</span>
            <p className="text-xl font-black text-violet-800 mt-0.5">{kpis.inConsult}</p>
            <span className="text-[10px] text-violet-600 font-semibold">Across active cabins</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700">
            <Stethoscope className="w-4 h-4" />
          </div>
        </div>

        <div className="card p-3.5 border-l-4 border-l-emerald-600 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed OPD</span>
            <p className="text-xl font-black text-emerald-700 mt-0.5">{kpis.completed}</p>
            <span className="text-[10px] text-emerald-700 font-semibold">Prescriptions issued</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="card p-3.5 border-l-4 border-l-cyan-600 flex items-center justify-between col-span-2 md:col-span-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Patient Wait</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{kpis.avgWaitMins}m</p>
            <span className="text-[10px] text-slate-500">Benchmark: &lt;20m</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
            <Activity className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ═══ ADVANCED CLINICAL SEARCH & DOCTOR FILTER TOOLBAR ═══ */}
      <div className="card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Live Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Patient name, Token (#TK-04), Doctor, or Joint concern..."
              className="w-full text-xs py-2 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Doctor Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden lg:inline">Doctor:</span>
            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500 w-full sm:w-auto"
            >
              <option value="all">All Specialists & Doctors</option>
              {mockDoctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.specialization.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Pills with Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 border-t border-slate-100">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            )}
          >
            All Appointments ({todayAppts.length})
          </button>

          {Object.entries(APPOINTMENT_STATUS_CONFIG).map(([key, cfg]) => {
            const count = statusCounts[key] || 0;
            const isSelected = statusFilter === key;
            return (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5',
                  isSelected
                    ? cn(cfg.color, 'font-bold ring-2 ring-teal-500/30 shadow-2xs')
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                )}
              >
                <span>{cfg.label}</span>
                <span className={cn('text-[10px] px-1.5 py-0.2 rounded-full font-bold', isSelected ? 'bg-white/80' : 'bg-slate-200 text-slate-700')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ VIEW 1: RICH PROFESSIONAL CLINICAL APPOINTMENT TABLE ═══ */}
      {view === 'list' && (
        <div className="card overflow-hidden border border-slate-200 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Time & Token</th>
                  <th className="py-3 px-4">Patient Profile</th>
                  <th className="py-3 px-4">Attending Doctor</th>
                  <th className="py-3 px-4 hidden md:table-cell">Visit Category</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Clinical Complaint</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Wait Time</th>
                  <th className="py-3 px-4 text-right">Clinical Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((apt, idx) => {
                  const cfg = APPOINTMENT_STATUS_CONFIG[apt.status] || APPOINTMENT_STATUS_CONFIG.booked;
                  const patient = mockPatients.find(p => p.id === apt.patientId) || mockPatients[idx % mockPatients.length];
                  const tokenStr = apt.tokenNumber ? `#TK-${apt.tokenNumber.toString().padStart(2, '0')}` : `#TK-${idx + 1}`;

                  return (
                    <tr
                      key={apt.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Time & Token */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {tokenStr}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{formatTime(apt.startTime)}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{formatDate(apt.date)}</p>
                          </div>
                        </div>
                      </td>

                      {/* Patient Details */}
                      <td className="py-3.5 px-4">
                        <div
                          onClick={() => navigate(`/patients/${apt.patientId}`)}
                          className="flex items-center gap-2.5 cursor-pointer group-hover:text-teal-700"
                        >
                          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold flex items-center justify-center text-xs shrink-0">
                            {apt.patientName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                              {apt.patientName}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {patient.age}y / {patient.gender} · <span className="font-mono text-[10px] text-slate-400">{patient.phone}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Attending Doctor */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-800">{apt.doctorName}</p>
                        <p className="text-[10px] text-slate-400">Cabin {101 + (idx % 4)}</p>
                      </td>

                      {/* Visit Category */}
                      <td className="py-3.5 px-4 hidden md:table-cell whitespace-nowrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                          {apt.type.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Clinical Reason */}
                      <td className="py-3.5 px-4 hidden lg:table-cell max-w-xs truncate text-slate-600 font-medium">
                        {apt.reason}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={cn('badge text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit', cfg.color)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot, apt.status === 'in_consultation' || apt.status === 'arrived' ? 'animate-pulse' : '')} />
                          <span>{cfg.label}</span>
                        </span>
                      </td>

                      {/* Wait Time */}
                      <td className="py-3.5 px-4 hidden sm:table-cell whitespace-nowrap">
                        {apt.waitingDuration ? (
                          <span className={cn(
                            'text-xs font-mono font-bold px-2 py-0.5 rounded border',
                            apt.waitingDuration > 30
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : apt.waitingDuration > 15
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          )}>
                            {apt.waitingDuration}m
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {apt.status === 'booked' || apt.status === 'confirmed' ? (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'arrived', apt.patientName)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-lg border border-emerald-200 transition-all cursor-pointer"
                              title="Mark Patient as Arrived at Clinic"
                            >
                              Check In
                            </button>
                          ) : apt.status === 'arrived' || apt.status === 'waiting' ? (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'in_consultation', apt.patientName)}
                              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] rounded-lg shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                              title="Call Patient into Doctor's Cabin"
                            >
                              <Stethoscope className="w-3 h-3" />
                              <span>Call In</span>
                            </button>
                          ) : apt.status === 'in_consultation' ? (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'completed', apt.patientName)}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg transition-all cursor-pointer flex items-center gap-1"
                              title="Complete Consultation"
                            >
                              <Check className="w-3 h-3" />
                              <span>Complete</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate(`/patients/${apt.patientId}`)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg border border-slate-200 transition-all cursor-pointer"
                            >
                              View EMR
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <CalendarDays className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm font-semibold text-slate-600">No appointments found matching current filters.</p>
                      <button
                        onClick={() => { setStatusFilter('all'); setDoctorFilter('all'); setSearchQuery(''); }}
                        className="text-xs text-teal-600 font-bold hover:underline mt-1 cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ VIEW 2: CABIN QUEUE BOARD (Live Reception Desk View) ═══ */}
      {view === 'queue' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockDoctors.slice(0, 3).map((doc, di) => {
            const cabinNum = 101 + di;
            const docAppts = todayAppts.filter(a => a.doctorId === doc.id || a.doctorName === doc.name);
            const inCabin = docAppts.find(a => a.status === 'in_consultation');
            const waitingQueue = docAppts.filter(a => a.status === 'arrived' || a.status === 'waiting');

            return (
              <div key={doc.id} className="card p-4 space-y-4 border-t-4 border-t-teal-600">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{doc.name}</h3>
                    <p className="text-[11px] text-teal-700 font-bold">Cabin {cabinNum} · {doc.specialization.split(' ')[0]}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono font-bold">
                    {waitingQueue.length} in queue
                  </span>
                </div>

                {/* Currently in Cabin */}
                <div className="p-3 rounded-xl bg-violet-50/70 border border-violet-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-violet-800 uppercase tracking-wider">
                    <span>Inside Cabin Now</span>
                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                  {inCabin ? (
                    <div>
                      <p className="text-xs font-bold text-slate-900">{inCabin.patientName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{inCabin.reason}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No patient currently inside.</p>
                  )}
                </div>

                {/* Waiting Queue for this Cabin */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Next in Waiting Line
                  </span>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {waitingQueue.map((w, wi) => (
                      <div
                        key={w.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-white transition-all"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[10px] text-teal-700">#{wi + 1}</span>
                            <p className="font-bold text-slate-900 truncate">{w.patientName}</p>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate">{w.reason}</p>
                        </div>
                        <button
                          onClick={() => handleUpdateStatus(w.id, 'in_consultation', w.patientName)}
                          className="px-2 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] rounded-lg shrink-0 cursor-pointer"
                        >
                          Call
                        </button>
                      </div>
                    ))}
                    {waitingQueue.length === 0 && (
                      <p className="text-xs text-slate-400 py-3 text-center">Queue is currently clear.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ VIEW 3: HOURLY DAY VIEW ═══ */}
      {view === 'day' && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Hourly Outpatient Schedule</h3>
            <span className="text-xs text-slate-500">{todayAppts.length} appointments scheduled</span>
          </div>
          <div className="space-y-2">
            {[9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => {
              const hourStr = hour.toString().padStart(2, '0');
              const apptsInHour = todayAppts.filter(a => a.startTime.startsWith(hourStr));

              return (
                <div key={hour} className="flex gap-4 border-b border-slate-100 pb-2">
                  <div className="w-16 pt-1 text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-400">{hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}</span>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {apptsInHour.map(a => (
                      <div
                        key={a.id}
                        onClick={() => navigate(`/patients/${a.patientId}`)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 transition-all cursor-pointer text-xs min-w-48 flex-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-slate-900">{a.patientName}</span>
                          <span className="text-[10px] font-mono text-teal-700 font-bold">{formatTime(a.startTime)}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{a.doctorName} · {a.reason}</p>
                      </div>
                    ))}
                    {apptsInHour.length === 0 && (
                      <span className="text-xs text-slate-300 italic pt-1">No appointments booked in this slot</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ INTERACTIVE BOOK APPOINTMENT MODAL ═══ */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Book OPD Appointment</h3>
                    <p className="text-[11px] text-slate-500">Register patient into today's clinic schedule</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBookModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAppointment} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatientName}
                    onChange={e => setNewPatientName(e.target.value)}
                    placeholder="e.g. Smt. Kamala Devi"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Attending Doctor
                    </label>
                    <select
                      value={newDoctorId}
                      onChange={e => setNewDoctorId(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 outline-none"
                    >
                      {mockDoctors.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.specialization.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Slot Time
                    </label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={e => setNewTime(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Appointment Type
                    </label>
                    <select
                      value={newType}
                      onChange={e => setNewType(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 outline-none"
                    >
                      <option value="new_consultation">New Consultation</option>
                      <option value="follow_up">Follow Up</option>
                      <option value="pre_op">Pre-Op Evaluation</option>
                      <option value="post_op">Post-Op Suture/Review</option>
                      <option value="emergency">Emergency Trauma</option>
                      <option value="physiotherapy">Physiotherapy ROM</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Joint Complaint / Reason
                    </label>
                    <input
                      type="text"
                      value={newReason}
                      onChange={e => setNewReason(e.target.value)}
                      placeholder="e.g. Severe Knee OA (Grade IV)"
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="py-2 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer shadow-xs"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
