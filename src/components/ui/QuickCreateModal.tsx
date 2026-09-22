import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, UserPlus, Calendar, Scissors, Pill, Scan,
  CheckCircle2, ArrowRight, User, Phone, MapPin,
  Clock, AlertCircle, Sparkles, Building2, Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../lib/cn';
import { mockDoctors, mockPatients } from '../../data/mock';

type CreateTab = 'patient' | 'appointment' | 'surgery' | 'prescription' | 'radiology';

export function QuickCreateModal() {
  const { quickCreateOpen, setQuickCreateOpen } = useUIStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<CreateTab>('patient');
  const [submittedResult, setSubmittedResult] = useState<{
    type: string;
    title: string;
    refId: string;
    detail: string;
    destination: string;
  } | null>(null);

  // Form states
  const [patientForm, setPatientForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    complaint: 'Severe Knee Joint Pain (Bilateral)',
    doctor: mockDoctors[0]?.id || 'doc-1',
    branch: 'Hyderabad - Banjara Hills',
  });

  const [appointmentForm, setAppointmentForm] = useState({
    patientId: mockPatients[0]?.id || 'p-1',
    doctorId: mockDoctors[0]?.id || 'doc-1',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    type: 'In-Person Consultation',
    notes: 'Primary Evaluation & X-Ray Review',
  });

  const [surgeryForm, setSurgeryForm] = useState({
    patientId: mockPatients[0]?.id || 'p-1',
    surgeonId: mockDoctors[0]?.id || 'doc-1',
    procedure: 'Unilateral Total Knee Replacement (TKR)',
    theatre: 'OT-1 (Ultra-Clean Laminar Flow)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    priority: 'Elective (Planned)',
  });

  const [rxForm, setRxForm] = useState({
    patientId: mockPatients[0]?.id || 'p-1',
    drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg',
    dosage: '1 - 0 - 1',
    duration: '5 Days',
    instructions: 'Take after meals for post-exertional knee swelling',
  });

  const [radForm, setRadForm] = useState({
    patientId: mockPatients[0]?.id || 'p-1',
    modality: 'Digital Radiography (X-Ray)',
    anatomy: 'Bilateral Knee AP & Lateral Standing Views',
    urgency: 'Routine (Within 2 Hours)',
    indication: 'Evaluate Kellgren-Lawrence Grade & Joint Space Narrowing',
  });

  if (!quickCreateOpen) return null;

  const handleClose = () => {
    setQuickCreateOpen(false);
    setSubmittedResult(null);
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `ORTHO-REG-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedResult({
      type: 'Patient Registration',
      title: patientForm.name || 'New Ortho Patient',
      refId,
      detail: `Assigned to ${mockDoctors.find(d => d.id === patientForm.doctor)?.name} · ${patientForm.complaint}`,
      destination: '/patients',
    });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;
    const patient = mockPatients.find(p => p.id === appointmentForm.patientId);
    const doctor = mockDoctors.find(d => d.id === appointmentForm.doctorId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Patient';
    setSubmittedResult({
      type: 'Consultation Scheduled',
      title: `${patientName} with ${doctor?.name || 'Doctor'}`,
      refId,
      detail: `${appointmentForm.date} at ${appointmentForm.time} · ${appointmentForm.type}`,
      destination: '/appointments',
    });
  };

  const handleSurgerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `OT-BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
    const patient = mockPatients.find(p => p.id === surgeryForm.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Patient';
    setSubmittedResult({
      type: 'OT Surgery Slot Booked',
      title: `${surgeryForm.procedure}`,
      refId,
      detail: `Patient: ${patientName} · ${surgeryForm.theatre} · ${surgeryForm.date}`,
      destination: '/ot-theatre',
    });
  };

  const handleRxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `E-RX-${Math.floor(1000 + Math.random() * 9000)}`;
    const patient = mockPatients.find(p => p.id === rxForm.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Patient';
    setSubmittedResult({
      type: 'E-Prescription Generated & Signed',
      title: `${rxForm.drug}`,
      refId,
      detail: `Prescribed to ${patientName} · Schedule: ${rxForm.dosage} for ${rxForm.duration}`,
      destination: '/consultations',
    });
  };

  const handleRadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `PACS-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const patient = mockPatients.find(p => p.id === radForm.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Patient';
    setSubmittedResult({
      type: 'PACS Investigation Order Requisitioned',
      title: `${radForm.modality} - ${radForm.anatomy}`,
      refId,
      detail: `Patient: ${patientName} · Urgency: ${radForm.urgency}`,
      destination: '/diagnostics',
    });
  };

  const tabs: { id: CreateTab; label: string; icon: typeof UserPlus; color: string }[] = [
    { id: 'patient', label: 'New Patient', icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
    { id: 'appointment', label: 'Book Appointment', icon: Calendar, color: 'text-teal-600 bg-teal-50' },
    { id: 'surgery', label: 'Schedule OT Surgery', icon: Scissors, color: 'text-purple-600 bg-purple-50' },
    { id: 'prescription', label: 'Write Digital Rx', icon: Pill, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'radiology', label: 'Order PACS X-Ray', icon: Scan, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">Hospital Quick Action Hub</h3>
                <p className="text-xs text-slate-500">Create records, book slots, and issue orders instantly</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-200/70 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* If successfully created, show confirmation */}
          {submittedResult ? (
            <div className="p-8 text-center space-y-5 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2 uppercase tracking-wide">
                  {submittedResult.type}
                </span>
                <h4 className="text-xl font-bold text-slate-900">{submittedResult.title}</h4>
                <p className="text-xs font-mono font-semibold text-primary-600 mt-1">Reference ID: {submittedResult.refId}</p>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">{submittedResult.detail}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSubmittedResult(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Create Another Record
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    navigate(submittedResult.destination);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open in {submittedResult.destination.replace('/', '').toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs Navigation */}
              <div className="flex border-b border-slate-100 px-6 bg-slate-50/30 overflow-x-auto gap-2 py-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                        isActive
                          ? 'bg-white shadow-xs border border-slate-200 text-slate-900 ring-1 ring-slate-200/50'
                          : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                      )}
                    >
                      <div className={cn('w-5 h-5 rounded-md flex items-center justify-center shrink-0', tab.color)}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Form Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {activeTab === 'patient' && (
                  <form onSubmit={handlePatientSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={patientForm.name}
                          onChange={e => setPatientForm({ ...patientForm, name: e.target.value })}
                          placeholder="e.g. Vikramaditya Rao"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={patientForm.phone}
                          onChange={e => setPatientForm({ ...patientForm, phone: e.target.value })}
                          placeholder="+91 98490 XXXXX"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Age *</label>
                        <input
                          type="number"
                          required
                          value={patientForm.age}
                          onChange={e => setPatientForm({ ...patientForm, age: e.target.value })}
                          placeholder="e.g. 56"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                        <select
                          value={patientForm.gender}
                          onChange={e => setPatientForm({ ...patientForm, gender: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                        <select
                          value={patientForm.branch}
                          onChange={e => setPatientForm({ ...patientForm, branch: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Hyderabad - Banjara Hills">Banjara Hills</option>
                          <option value="Hyderabad - Jubilee Hills">Jubilee Hills</option>
                          <option value="Hyderabad - Gachibowli">Gachibowli</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Orthopedic Chief Complaint</label>
                      <input
                        type="text"
                        value={patientForm.complaint}
                        onChange={e => setPatientForm({ ...patientForm, complaint: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Consultant Orthopedic Surgeon</label>
                      <select
                        value={patientForm.doctor}
                        onChange={e => setPatientForm({ ...patientForm, doctor: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        {mockDoctors.map(doc => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} · {doc.specialization} ({doc.qualification})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-xs"
                      >
                        Register Patient & Open Intake
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'appointment' && (
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Select Patient</label>
                        <select
                          value={appointmentForm.patientId}
                          onChange={e => setAppointmentForm({ ...appointmentForm, patientId: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          {mockPatients.map(p => (
                            <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.patientId})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Consultant Specialist</label>
                        <select
                          value={appointmentForm.doctorId}
                          onChange={e => setAppointmentForm({ ...appointmentForm, doctorId: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          {mockDoctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={appointmentForm.date}
                          onChange={e => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                        <select
                          value={appointmentForm.time}
                          onChange={e => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:30 AM">10:30 AM</option>
                          <option value="11:45 AM">11:45 AM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="04:30 PM">04:30 PM</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Consultation Mode</label>
                        <select
                          value={appointmentForm.type}
                          onChange={e => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="In-Person Consultation">In-Person OPD</option>
                          <option value="Pre-Op Clearance Review">Pre-Op Clearance</option>
                          <option value="Post-Op Follow-Up">Post-Op Follow-Up</option>
                          <option value="Tele-Consultation">Tele-Rehab Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Notes & Reason</label>
                      <input
                        type="text"
                        value={appointmentForm.notes}
                        onChange={e => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
                      >
                        Confirm Appointment Booking
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'surgery' && (
                  <form onSubmit={handleSurgerySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Patient</label>
                        <select
                          value={surgeryForm.patientId}
                          onChange={e => setSurgeryForm({ ...surgeryForm, patientId: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          {mockPatients.map(p => (
                            <option key={p.id} value={p.id}>{p.firstName} {p.lastName} · {p.medicalHistory?.[0] || 'Orthopedic Evaluation'}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Orthopedic Surgeon</label>
                        <select
                          value={surgeryForm.surgeonId}
                          onChange={e => setSurgeryForm({ ...surgeryForm, surgeonId: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          {mockDoctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Surgical Procedure</label>
                      <select
                        value={surgeryForm.procedure}
                        onChange={e => setSurgeryForm({ ...surgeryForm, procedure: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        <option value="Unilateral Total Knee Replacement (TKR)">Unilateral Total Knee Replacement (TKR)</option>
                        <option value="Bilateral Total Knee Replacement (Simultaneous)">Bilateral Total Knee Replacement (Simultaneous)</option>
                        <option value="Total Hip Arthroplasty (THA) Anterior Approach">Total Hip Arthroplasty (THA) Anterior Approach</option>
                        <option value="Arthroscopic ACL Reconstruction + Meniscal Repair">Arthroscopic ACL Reconstruction + Meniscal Repair</option>
                        <option value="Spine Lumbar Microdiscectomy (L4-L5)">Spine Lumbar Microdiscectomy (L4-L5)</option>
                        <option value="DHS Internal Fixation Femoral Neck Fracture">DHS Internal Fixation Femoral Neck Fracture</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Operation Theatre</label>
                        <select
                          value={surgeryForm.theatre}
                          onChange={e => setSurgeryForm({ ...surgeryForm, theatre: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="OT-1 (Ultra-Clean Laminar Flow)">OT-1 (Laminar Flow)</option>
                          <option value="OT-2 (Robotic Navigation Suite)">OT-2 (Robotic Suite)</option>
                          <option value="OT-3 (Spine & Trauma Suite)">OT-3 (Spine/Trauma)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Scheduled Date</label>
                        <input
                          type="date"
                          value={surgeryForm.date}
                          onChange={e => setSurgeryForm({ ...surgeryForm, date: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Priority</label>
                        <select
                          value={surgeryForm.priority}
                          onChange={e => setSurgeryForm({ ...surgeryForm, priority: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Elective (Planned)">Elective (Planned)</option>
                          <option value="Urgent (Within 48h)">Urgent (Within 48h)</option>
                          <option value="Emergency Trauma">Emergency Trauma</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                      >
                        Book OT Suite & Requisition Implants
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'prescription' && (
                  <form onSubmit={handleRxSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Patient</label>
                      <select
                        value={rxForm.patientId}
                        onChange={e => setRxForm({ ...rxForm, patientId: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        {mockPatients.map(p => (
                          <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.patientId})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Medication Selection</label>
                      <select
                        value={rxForm.drug}
                        onChange={e => setRxForm({ ...rxForm, drug: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        <option value="Tab Aceclofenac 100mg + Paracetamol 325mg">Tab Aceclofenac 100mg + Paracetamol 325mg (NSAID)</option>
                        <option value="Cap Pantoprazole 40mg">Cap Pantoprazole 40mg (Gastroprotective PPI)</option>
                        <option value="Tab Calcium Carbonate 500mg + Calcitriol">Tab Calcium Carbonate 500mg + Calcitriol (Bone Mineral)</option>
                        <option value="Joint Mobility Cryo-Pack Gel (Topical)">Joint Mobility Cryo-Pack Gel (Topical Anti-Inflammatory)</option>
                        <option value="Inj Enoxaparin 40mg SC">Inj Enoxaparin 40mg SC (Post-Op DVT Prophylaxis)</option>
                        <option value="Tab Tramadol 50mg + Paracetamol 325mg">Tab Tramadol 50mg + Paracetamol 325mg (Moderate Analgesic)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Dosage Frequency</label>
                        <select
                          value={rxForm.dosage}
                          onChange={e => setRxForm({ ...rxForm, dosage: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="1 - 0 - 1 (Morning & Night)">1 - 0 - 1 (Morning & Night)</option>
                          <option value="1 - 0 - 0 (Morning Only - Before Food)">1 - 0 - 0 (Morning Only - Before Food)</option>
                          <option value="0 - 1 - 0 (After Lunch)">0 - 1 - 0 (After Lunch)</option>
                          <option value="1 - 1 - 1 (TDS - Thrice Daily)">1 - 1 - 1 (TDS - Thrice Daily)</option>
                          <option value="SOS (Only during severe pain)">SOS (As Needed)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Course Duration</label>
                        <select
                          value={rxForm.duration}
                          onChange={e => setRxForm({ ...rxForm, duration: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="5 Days">5 Days</option>
                          <option value="10 Days">10 Days</option>
                          <option value="14 Days">14 Days</option>
                          <option value="30 Days">30 Days (Chronic Protocol)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Special Patient Instructions</label>
                      <input
                        type="text"
                        value={rxForm.instructions}
                        onChange={e => setRxForm({ ...rxForm, instructions: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                      >
                        Generate & Digitally Sign Rx
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === 'radiology' && (
                  <form onSubmit={handleRadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Patient</label>
                      <select
                        value={radForm.patientId}
                        onChange={e => setRadForm({ ...radForm, patientId: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        {mockPatients.map(p => (
                          <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.patientId})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Imaging Modality</label>
                        <select
                          value={radForm.modality}
                          onChange={e => setRadForm({ ...radForm, modality: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Digital Radiography (X-Ray)">Digital Radiography (X-Ray)</option>
                          <option value="Magnetic Resonance Imaging (MRI 1.5T)">Magnetic Resonance Imaging (MRI 1.5T)</option>
                          <option value="High-Res CT Scan (3D Reconstruction)">High-Res CT Scan (3D Reconstruction)</option>
                          <option value="DEXA Bone Mineral Density (BMD)">DEXA Bone Mineral Density (BMD)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Anatomical Region / Views</label>
                        <select
                          value={radForm.anatomy}
                          onChange={e => setRadForm({ ...radForm, anatomy: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Bilateral Knee AP & Lateral Standing Views">Bilateral Knee AP & Lateral Standing Views</option>
                          <option value="Pelvis with Both Hips AP & Frog-leg Lateral">Pelvis with Both Hips AP & Frog-leg Lateral</option>
                          <option value="Lumbosacral Spine AP & Lateral Flexion/Extension">Lumbosacral Spine AP & Lateral</option>
                          <option value="Right Shoulder True AP & Axillary View">Right Shoulder True AP & Axillary View</option>
                          <option value="Right Knee High-Field MRI (ACL/Meniscus Protocol)">Right Knee High-Field MRI</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency Protocol</label>
                        <select
                          value={radForm.urgency}
                          onChange={e => setRadForm({ ...radForm, urgency: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                        >
                          <option value="Routine (Within 2 Hours)">Routine (Within 2 Hours)</option>
                          <option value="Stat / Pre-Op Immediate">Stat / Pre-Op Immediate</option>
                          <option value="Emergency Trauma Fast-Track">Emergency Trauma Fast-Track</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Indication</label>
                        <input
                          type="text"
                          value={radForm.indication}
                          onChange={e => setRadForm({ ...radForm, indication: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                      >
                        Dispatch PACS Radiography Order
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
