import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Phone, Mail, MapPin, AlertTriangle, Heart, Calendar,
  Stethoscope, Syringe, Bone, Dumbbell, CalendarCheck, FileText,
  MessageSquare, IndianRupee, Clock, Activity, User, Shield,
  ChevronRight, Edit,
} from 'lucide-react';
import { mockPatients, mockDoctors, mockAppointments, mockSurgeries, mockDiagnostics, mockFollowUps, mockPhysiotherapy } from '../../data/mock';
import { PATIENT_STATUS_CONFIG, APPOINTMENT_STATUS_CONFIG, SURGERY_STATUS_CONFIG } from '../../lib/constants';
import { formatPhone, formatDate, formatTime, getInitials, formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/cn';
import { useState } from 'react';
import { getPatientInvoices, getPatientTimeline } from '../../data/patientBillingAndTimeline';

const tabs = [
  { key: 'overview', label: 'Overview', icon: Activity },
  { key: 'clinical', label: 'Clinical', icon: Stethoscope },
  { key: 'surgeries', label: 'Surgeries', icon: Syringe },
  { key: 'diagnostics', label: 'Diagnostics', icon: FileText },
  { key: 'physiotherapy', label: 'Physiotherapy', icon: Dumbbell },
  { key: 'follow-ups', label: 'Follow-Ups', icon: CalendarCheck },
  { key: 'billing', label: 'Billing', icon: IndianRupee },
  { key: 'timeline', label: 'Timeline', icon: Clock },
];

export function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const patient = mockPatients.find(p => p.id === id);
  if (!patient) return (
    <div className="page-container">
      <div className="card p-12 text-center">
        <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-500">Patient not found</p>
        <button onClick={() => navigate('/patients')} className="btn-primary mt-4 !text-xs">Back to Patients</button>
      </div>
    </div>
  );

  const doctor = mockDoctors.find(d => d.id === patient.assignedDoctorId);
  const statusCfg = PATIENT_STATUS_CONFIG[patient.status];
  const patientAppointments = mockAppointments.filter(a => a.patientId === patient.id);
  const patientSurgeries = mockSurgeries.filter(s => s.patientId === patient.id);
  const patientDiagnostics = mockDiagnostics.filter(d => d.patientId === patient.id);
  const patientFollowUps = mockFollowUps.filter(f => f.patientId === patient.id);
  const patientPhysio = mockPhysiotherapy.filter(p => p.patientId === patient.id);

  const patientQueryStr = `${patient.id} ${patient.firstName} ${patient.lastName} ${patient.patientId}`;
  const milestoneEvents = getPatientTimeline(patientQueryStr);

  // Build timeline events from all sources, falling back to clinical milestones
  const rawTimelineEvents = [
    ...patientAppointments.map(a => ({ date: a.date, type: 'Appointment', title: `${a.type.replace('_', ' ')} — ${a.doctorName}`, status: a.status, icon: Calendar })),
    ...patientSurgeries.map(s => ({ date: s.date, type: 'Surgery', title: s.procedure, status: s.status, icon: Syringe })),
    ...patientDiagnostics.map(d => ({ date: d.date, type: 'Diagnostic', title: d.testName, status: d.status, icon: FileText })),
    ...patientFollowUps.map(f => ({ date: f.date, type: 'Follow-Up', title: f.reason, status: f.status, icon: CalendarCheck })),
  ];

  const timelineEvents = (rawTimelineEvents.length > 0 ? rawTimelineEvents : milestoneEvents.map(m => ({
    date: m.date,
    type: m.category,
    title: m.title,
    status: m.status,
    icon: m.category === 'Surgery' ? Syringe : m.category === 'Diagnostics' ? FileText : m.category === 'Physiotherapy' ? Dumbbell : Activity,
  }))).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 15);

  return (
    <div className="page-container">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <button onClick={() => navigate('/patients')} className="btn-ghost !px-2 mb-4 text-gray-500">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs">Back to Patients</span>
        </button>
      </motion.div>

      {/* Patient Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-5"
      >
        <div className="p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-5">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4 flex-1">
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold shrink-0',
                patient.gender === 'male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
              )}>
                {getInitials(`${patient.firstName} ${patient.lastName}`)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900">{patient.firstName} {patient.lastName}</h2>
                  <span className={cn('badge', statusCfg.color)}>{statusCfg.label}</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{patient.patientId}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                  <span>{patient.age} yrs · {patient.gender === 'male' ? 'Male' : 'Female'}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400" />{patient.bloodGroup}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{formatPhone(patient.phone)}</span>
                  {patient.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{patient.email}</span>}
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{patient.city}</span>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="flex items-center gap-3 flex-wrap">
              {doctor && (
                <div className="bg-surface-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-gray-400 font-medium">Assigned Doctor</p>
                  <p className="text-xs font-semibold text-gray-800">{doctor.name}</p>
                  <p className="text-[10px] text-gray-400">{doctor.specialization}</p>
                </div>
              )}
              {patient.allergies.length > 0 && (
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-red-500 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Allergies</p>
                  <p className="text-xs font-semibold text-red-700">{patient.allergies.join(', ')}</p>
                </div>
              )}
              <div className="bg-surface-50 rounded-lg px-3 py-2">
                <p className="text-[10px] text-gray-400 font-medium">Emergency Contact</p>
                <p className="text-xs font-semibold text-gray-800">{patient.emergencyContact.name}</p>
                <p className="text-[10px] text-gray-400">{patient.emergencyContact.relation} · {formatPhone(patient.emergencyContact.phone)}</p>
              </div>
              <button className="btn-secondary !py-2"><Edit className="w-3.5 h-3.5" /> Edit</button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="card mb-5">
        <div className="flex items-center gap-1 px-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-3 text-xs font-medium border-b-2 transition-all whitespace-nowrap',
                activeTab === tab.key
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Medical History */}
            <div className="card">
              <div className="px-5 py-3 border-b border-surface-100">
                <h4 className="text-sm font-semibold text-gray-900">Medical History</h4>
              </div>
              <div className="p-5 space-y-2">
                {patient.medicalHistory.length > 0 ? patient.medicalHistory.map(h => (
                  <div key={h} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {h}
                  </div>
                )) : (
                  <p className="text-xs text-gray-400">No significant medical history</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <div className="px-5 py-3 border-b border-surface-100">
                <h4 className="text-sm font-semibold text-gray-900">Summary</h4>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {[
                  { label: 'Appointments', value: patientAppointments.length, color: 'text-blue-600' },
                  { label: 'Surgeries', value: patientSurgeries.length, color: 'text-purple-600' },
                  { label: 'Diagnostics', value: patientDiagnostics.length, color: 'text-amber-600' },
                  { label: 'Follow-Ups', value: patientFollowUps.length, color: 'text-rose-600' },
                ].map(s => (
                  <div key={s.label}>
                    <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="px-5 py-3 border-b border-surface-100">
                <h4 className="text-sm font-semibold text-gray-900">Recent Activity</h4>
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {timelineEvents.slice(0, 5).map((event, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 mt-0.5">
                        <event.icon className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">{event.title}</p>
                        <p className="text-[10px] text-gray-400">{event.type} · {formatDate(event.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card lg:col-span-3">
              <div className="px-5 py-3 border-b border-surface-100">
                <h4 className="text-sm font-semibold text-gray-900">Patient Journey Timeline</h4>
              </div>
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-surface-200" />
                  <div className="space-y-4">
                    {timelineEvents.map((event, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white',
                          event.type === 'Surgery' ? 'bg-purple-100 text-purple-600' :
                          event.type === 'Diagnostic' ? 'bg-amber-100 text-amber-600' :
                          event.type === 'Follow-Up' ? 'bg-rose-100 text-rose-600' :
                          'bg-blue-100 text-blue-600'
                        )}>
                          <event.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{event.title}</p>
                            <span className="text-[10px] text-gray-400">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{event.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'surgeries' && (
          <div className="space-y-4">
            {patientSurgeries.length > 0 ? patientSurgeries.map(surg => {
              const sCfg = SURGERY_STATUS_CONFIG[surg.status];
              return (
                <div key={surg.id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{surg.procedure}</h4>
                      <p className="text-xs text-gray-500">{surg.diagnosis}</p>
                    </div>
                    <span className={cn('badge', sCfg.color)}>{sCfg.label}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><p className="text-gray-400">Date</p><p className="font-medium text-gray-800">{formatDate(surg.date)}</p></div>
                    <div><p className="text-gray-400">Surgeon</p><p className="font-medium text-gray-800">{surg.doctorName}</p></div>
                    <div><p className="text-gray-400">OT</p><p className="font-medium text-gray-800">{surg.otName}</p></div>
                    <div><p className="text-gray-400">Duration</p><p className="font-medium text-gray-800">{surg.expectedDuration} min</p></div>
                  </div>
                  {/* Pre-Op Progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Pre-Op Checklist</p>
                      <p className="text-[10px] text-gray-400">{surg.preOpChecklist.filter(c => c.status === 'completed').length}/{surg.preOpChecklist.length}</p>
                    </div>
                    <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(surg.preOpChecklist.filter(c => c.status === 'completed').length / surg.preOpChecklist.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="card p-12 text-center">
                <Syringe className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No surgeries recorded</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-surface-50 border-b border-surface-200">
                <th className="table-cell table-header text-left">Test</th>
                <th className="table-cell table-header text-left">Type</th>
                <th className="table-cell table-header text-left">Date</th>
                <th className="table-cell table-header text-left">Doctor</th>
                <th className="table-cell table-header text-left">Status</th>
              </tr></thead>
              <tbody>
                {patientDiagnostics.length > 0 ? patientDiagnostics.map(diag => (
                  <tr key={diag.id} className="table-row">
                    <td className="table-cell font-medium text-gray-900">{diag.testName}</td>
                    <td className="table-cell text-gray-500 capitalize">{diag.type.replace('_', ' ')}</td>
                    <td className="table-cell text-gray-500">{formatDate(diag.date)}</td>
                    <td className="table-cell text-gray-500">{diag.doctorName}</td>
                    <td className="table-cell"><span className="badge bg-surface-100 text-gray-600 capitalize">{diag.status}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="p-8 text-center text-sm text-gray-400">No diagnostic records</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'follow-ups' && (
          <div className="space-y-3">
            {patientFollowUps.length > 0 ? patientFollowUps.map(fu => (
              <div key={fu.id} className="card p-4 flex items-center gap-4">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                  fu.status === 'overdue' ? 'bg-red-50' : fu.status === 'completed' ? 'bg-emerald-50' : 'bg-blue-50'
                )}>
                  <CalendarCheck className={cn('w-5 h-5',
                    fu.status === 'overdue' ? 'text-red-500' : fu.status === 'completed' ? 'text-emerald-500' : 'text-blue-500'
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{fu.reason}</p>
                  <p className="text-xs text-gray-500">{formatDate(fu.date)} · {fu.doctorName} · Day {fu.daysSinceSurgery}</p>
                </div>
                <span className={cn('badge text-[10px]',
                  fu.status === 'overdue' ? 'bg-red-100 text-red-700' :
                  fu.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  fu.status === 'due_today' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                )}>
                  {fu.status.replace('_', ' ')}
                </span>
              </div>
            )) : (
              <div className="card p-12 text-center">
                <CalendarCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No follow-ups scheduled</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'physiotherapy' && (
          <div className="space-y-4">
            {patientPhysio.length > 0 ? patientPhysio.map(p => (
              <div key={p.id} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">{p.diagnosis}</h4>
                  <span className={cn('badge', p.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700')}>{p.status}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(p.completedSessions / p.totalSessions) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{p.completedSessions}/{p.totalSessions} sessions</span>
                </div>
                <p className="text-xs text-gray-500">Therapist: {p.therapistName}</p>
              </div>
            )) : (
              <div className="card p-12 text-center">
                <Dumbbell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No physiotherapy plans</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: Clinical */}
        {activeTab === 'clinical' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Clinical Assessment & Diagnosis */}
              <div className="card p-5 lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-teal-600" />
                    <h4 className="text-sm font-bold text-gray-900">Clinical Evaluation & Orthopedic Exam</h4>
                  </div>
                  <span className="badge bg-teal-50 text-teal-700 text-xs font-bold">
                    ICD-10 M17.1 Verified
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Diagnosis</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{patient.medicalHistory?.[0] || 'Primary Osteoarthritis with Joint Degeneration'}</p>
                </div>

                {/* Goniometry & ROM Tracking */}
                <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <Bone className="w-3.5 h-3.5 text-teal-600" /> Goniometry & Range of Motion History
                    </span>
                    <span className="text-[10px] text-teal-700 font-semibold">Weight-Bearing Measurement</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 bg-white rounded-lg border border-surface-200">
                      <span className="text-[10px] text-gray-400 block">Active Flexion</span>
                      <p className="text-sm font-bold text-gray-900">95° - 110°</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-surface-200">
                      <span className="text-[10px] text-gray-400 block">Extension Lag</span>
                      <p className="text-sm font-bold text-gray-900">0° - 5°</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-surface-200">
                      <span className="text-[10px] text-gray-400 block">Alignment</span>
                      <p className="text-sm font-bold text-gray-900">Neutral Axis</p>
                    </div>
                  </div>
                </div>

                {/* Active Prescriptions Table */}
                <div>
                  <h5 className="text-xs font-bold text-gray-800 mb-2">Active Orthopedic Prescription Chart</h5>
                  <div className="divide-y divide-surface-100 border border-surface-200 rounded-xl overflow-hidden bg-white text-xs">
                    <div className="p-2.5 bg-surface-50 grid grid-cols-12 text-[10px] font-bold text-gray-500 uppercase">
                      <span className="col-span-5">Medication & Strength</span>
                      <span className="col-span-3">Dosage</span>
                      <span className="col-span-2">Duration</span>
                      <span className="col-span-2 text-right">Purpose</span>
                    </div>
                    {[
                      { drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', dosage: '1-0-1 after food', duration: '5 days', purpose: 'Joint Analgesia' },
                      { drug: 'Tab Pantoprazole 40mg', dosage: '1-0-0 before food', duration: '5 days', purpose: 'GI Protection' },
                      { drug: 'Cap Diacerein 50mg', dosage: '0-0-1 after dinner', duration: '60 days', purpose: 'Cartilage Support' },
                      { drug: 'Tab Calcium Carbonate 500mg + Vit D3', dosage: '0-1-0 after lunch', duration: '90 days', purpose: 'Bone Density' },
                    ].map((med, idx) => (
                      <div key={idx} className="p-2.5 grid grid-cols-12 items-center">
                        <span className="col-span-5 font-semibold text-gray-900">{med.drug}</span>
                        <span className="col-span-3 text-gray-600">{med.dosage}</span>
                        <span className="col-span-2 text-gray-500">{med.duration}</span>
                        <span className="col-span-2 text-right text-[10px] text-teal-700 font-medium">{med.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergies & Comorbidities Sidebar */}
              <div className="space-y-4">
                <div className="card p-4 space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    Documented Drug Allergies
                  </h4>
                  <div className="space-y-1.5">
                    {patient.allergies.length > 0 ? patient.allergies.map((allergy, i) => (
                      <div key={i} className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs flex items-center justify-between">
                        <span className="font-bold text-rose-800">{allergy}</span>
                        <span className="text-[10px] font-black text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">Severe Rash</span>
                      </div>
                    )) : (
                      <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">No known drug allergies (NKDA)</p>
                    )}
                  </div>
                </div>

                <div className="card p-4 space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-amber-500" />
                    Comorbidities & Risk Profiling
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {patient.medicalHistory.map((h, i) => (
                      <div key={i} className="p-2 rounded-lg bg-amber-50/50 border border-amber-200 text-gray-800 flex items-center justify-between">
                        <span>{h}</span>
                        <span className="text-[10px] font-semibold text-amber-800">Monitored</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Billing & Invoices (Comprehensive Financial Ledger) */}
        {activeTab === 'billing' && (() => {
          const invoices = getPatientInvoices(patientQueryStr);
          const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
          const totalPaid = invoices.reduce((acc, inv) => acc + inv.patientPaid + inv.tpaCovered, 0);
          const totalBalance = invoices.reduce((acc, inv) => acc + inv.balance, 0);
          const activeInsurance = invoices.find(inv => inv.insuranceDetails)?.insuranceDetails;

          return (
            <div className="space-y-4">
              {/* Financial KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="card p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Billed</p>
                  <p className="text-xl font-black text-gray-900 mt-1">{formatCurrency(totalBilled)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{invoices.length} Invoices On Record</p>
                </div>

                <div className="card p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Insurance / TPA Covered</p>
                  <p className="text-xl font-black text-blue-600 mt-1">
                    {formatCurrency(invoices.reduce((acc, inv) => acc + inv.tpaCovered, 0))}
                  </p>
                  <p className="text-[10px] text-blue-500 mt-0.5">Cashless Hospital Network</p>
                </div>

                <div className="card p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Patient Paid</p>
                  <p className="text-xl font-black text-emerald-600 mt-1">
                    {formatCurrency(invoices.reduce((acc, inv) => acc + inv.patientPaid, 0))}
                  </p>
                  <p className="text-[10px] text-emerald-500 mt-0.5">UPI, Card & NetBanking</p>
                </div>

                <div className="card p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Out-Of-Pocket Balance</p>
                  <p className={cn('text-xl font-black mt-1', totalBalance > 0 ? 'text-rose-600' : 'text-gray-400')}>
                    {formatCurrency(totalBalance)}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{totalBalance > 0 ? 'Pending Settlement' : 'Nil Dues Cleared'}</p>
                </div>
              </div>

              {/* TPA Cashless Pre-Auth Banner (If Available) */}
              {activeInsurance && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-md border border-blue-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-500/30 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <div>
                        <h4 className="text-sm font-bold text-white">TPA Cashless Mediclaim Desk</h4>
                        <p className="text-[11px] text-blue-200">{activeInsurance.provider}</p>
                      </div>
                    </div>
                    <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs font-bold">
                      {activeInsurance.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mt-3">
                    <div>
                      <span className="text-[10px] text-blue-300 block">Policy Number</span>
                      <p className="font-mono font-bold text-white mt-0.5">{activeInsurance.policyNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 block">TPA Claim ID</span>
                      <p className="font-mono font-bold text-white mt-0.5">{activeInsurance.claimNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 block">Pre-Auth Approved Sum</span>
                      <p className="font-bold text-emerald-300 mt-0.5">{formatCurrency(activeInsurance.preAuthApprovedAmount)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-300 block">Co-Payment Share</span>
                      <p className="font-bold text-white mt-0.5">{activeInsurance.coPayPercentage}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Itemized Invoices Table */}
              <div className="card overflow-hidden">
                <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-sm font-bold text-gray-900">Hospital Billing Statements & Tax Invoices</h4>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">GST Compliant Healthcare Records</span>
                </div>

                <div className="divide-y divide-surface-100">
                  {invoices.map(inv => (
                    <div key={inv.id} className="p-4 hover:bg-surface-50/50 transition-colors space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                            {inv.invoiceNumber}
                          </span>
                          <span className="text-xs text-gray-500">Dated: {inv.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'badge text-[10px] font-bold',
                            inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                            inv.status === 'tpa_approved' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          )}>
                            {inv.status === 'paid' ? 'Paid In Full' : inv.status === 'tpa_approved' ? 'TPA Pre-Authorized' : 'Pending Payment'}
                          </span>
                          <span className="text-sm font-black text-gray-900">{formatCurrency(inv.total)}</span>
                        </div>
                      </div>

                      {/* Items breakdown */}
                      <div className="bg-surface-50 rounded-lg p-2.5 space-y-1.5 text-xs">
                        {inv.items.map((item, ii) => (
                          <div key={ii} className="flex items-center justify-between text-gray-700">
                            <span className="font-medium text-[11px] truncate max-w-md">
                              • {item.description}
                            </span>
                            <span className="font-mono text-gray-900 shrink-0">{formatCurrency(item.total)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-surface-100">
                        <span className="text-[10px] text-gray-400">
                          Payment Mode: <strong className="text-gray-700">{inv.paymentMode || 'Cashless Settlement'}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Invoice ${inv.invoiceNumber} downloaded as PDF!`)}
                            className="text-[11px] font-bold text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            Download PDF Receipt
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => window.print()}
                            className="text-[11px] font-bold text-gray-600 hover:text-gray-800 hover:underline"
                          >
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB: Patient Journey Timeline (Full Screen Longitudinal Experience) */}
        {activeTab === 'timeline' && (() => {
          const events = getPatientTimeline(patientQueryStr);
          return (
            <div className="card p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-surface-100 pb-4">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Complete Orthopedic Patient Journey</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Chronological end-to-end clinical timeline from first consultation to recovery</p>
                </div>
                <span className="badge bg-teal-100 text-teal-800 font-bold text-xs">
                  {events.length} Milestones Logged
                </span>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-6">
                {/* Vertical Timeline Thread */}
                <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-4 w-0.5 bg-gradient-to-b from-teal-500 via-primary-400 to-surface-200" />

                {events.map((event, index) => (
                  <div key={event.id} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-teal-600 shadow-xs flex items-center justify-center text-[10px] font-bold text-teal-700">
                      {index + 1}
                    </div>

                    <div className="p-4 rounded-xl border border-surface-200 bg-surface-50/70 hover:bg-surface-50 hover:shadow-xs transition-all space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900">{event.title}</span>
                          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', event.badgeColor)}>
                            {event.badgeText}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {event.date} {event.time && `· ${event.time}`}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-100 text-xs">
                        <span className="text-gray-500 text-[11px]">
                          Attending Clinician: <strong className="text-gray-800">{event.clinician}</strong> ({event.department})
                        </span>

                        {event.scanId && (
                          <button
                            onClick={() => navigate('/diagnostics')}
                            className="btn-primary !py-1 !px-2.5 !text-[11px] !bg-teal-600 hover:!bg-teal-700 shadow-2xs flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Associated Study ({event.scanId})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </motion.div>
    </div>
  );
}

