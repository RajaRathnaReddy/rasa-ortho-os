import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Phone, Mail, Star, CalendarDays, Clock, Users,
  Syringe, ClipboardList, CheckCircle2, ChevronRight, Search,
  Activity, ArrowRight, UserCheck, AlertCircle, FileText, Plus,
  Sparkles, Bone, ShieldCheck, HeartPulse, Eye, Maximize2, IndianRupee, Shield
} from 'lucide-react';
import { mockDoctors, mockAppointments, mockSurgeries, mockPatients } from '../../data/mock';
import { cn } from '../../lib/cn';
import { formatPhone, formatTime, formatCurrency } from '../../lib/formatters';
import { DicomViewerModal, SAMPLE_DICOM_STUDIES } from '../../components/ui/DicomViewerModal';
import { INITIAL_OP_TRIAGE_RECORDS, OpTriageData } from '../../data/opTriageData';
import { DoctorPreConsultBrief } from '../../components/ui/DoctorPreConsultBrief';
import { getPatientInvoices } from '../../data/patientBillingAndTimeline';

export function DoctorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const [activeTab, setActiveTab] = useState<'clinical_station' | 'directory'>('clinical_station');
  const [selectedDoctorId, setSelectedDoctorId] = useState(mockDoctors[0].id); // Default: Dr. Anand Krishnamurthy
  const [search, setSearch] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');

  // DICOM Viewer modal state
  const [isDicomOpen, setIsDicomOpen] = useState(false);
  const [selectedDicomStudyId, setSelectedDicomStudyId] = useState('xr-knee-01');

  // Consultation state in clinical station
  const [activeToken, setActiveToken] = useState(urlToken || 'T-101');

  useEffect(() => {
    if (urlToken) {
      setActiveToken(urlToken);
    }
  }, [urlToken]);
  const [opTriageList, setOpTriageList] = useState<OpTriageData[]>(INITIAL_OP_TRIAGE_RECORDS);
  const [consultNote, setConsultNote] = useState({
    complaint: 'Severe pain in right knee joint, worsening over past 6 months. Difficulty bearing weight and climbing stairs.',
    romFlexion: '90',
    romExtension: '0',
    deformity: 'Varus Alignment (Moderate)',
    diagnosis: 'Severe Primary Osteoarthritis Right Knee (Kellgren-Lawrence Grade IV)',
    plan: 'surgical',
    notes: 'Patient failed conservative analgesics and intra-articular steroid injections. Total Knee Arthroplasty (TKA) recommended. Zimmer NexGen CR planned.',
    prescriptions: [
      { drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', dosage: '1-0-1 after food', duration: '5 days' },
      { drug: 'Tab Pantoprazole 40mg', dosage: '1-0-0 before food', duration: '5 days' },
      { drug: 'Tab Calcium Carbonate 500mg + Vit D3', dosage: '0-1-0 after food', duration: '30 days' },
    ]
  });
  const [consultSavedToast, setConsultSavedToast] = useState(false);

  const selectedDoctor = mockDoctors.find(d => d.id === selectedDoctorId) || mockDoctors[0];

  const [consultSubTab, setConsultSubTab] = useState<'consult' | 'history' | 'billing'>('consult');

  // Appointments for this doctor based on opTriageList
  const doctorAppointments = opTriageList.filter(t => t.doctorAssigned.includes(selectedDoctor.name.split(' ')[1]) || selectedDoctorId === 'doc-1');

  // Dynamic consult note based on selected patient
  const activeTriage = opTriageList.find(t => t.token === activeToken) || opTriageList[0];

  const getDynamicConsultNote = (t: OpTriageData) => {
    if (t.token === 'T-102') {
      return {
        complaint: 'Right shoulder pain and weakness, especially during night sleep and overhead movements for 3 months.',
        romFlexion: '70° Abduction',
        romExtension: 'Internal rotation to L3 only',
        deformity: 'Drop arm test positive · Supraspinatus muscle wasting',
        diagnosis: 'Full-Thickness Supraspinatus Tendon Tear Right Shoulder (1.2cm)',
        plan: 'surgical',
        notes: 'Failed conservative steroid infiltration. Arthroscopic Rotator Cuff Repair recommended.',
        prescriptions: [
          { drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', dosage: '1-0-1 after food', duration: '5 days' },
          { drug: 'Tab Pantoprazole 40mg', dosage: '1-0-0 before food', duration: '5 days' },
          { drug: 'Shoulder Immobilizer Sling', dosage: 'Wear during sleep/travel', duration: '2 weeks' },
        ]
      };
    } else if (t.token === 'T-103') {
      return {
        complaint: 'Post-Op Day 45 routine checkup following Left Total Knee Arthroplasty. Walking comfortably without stick.',
        romFlexion: '110° Active Flexion',
        romExtension: '0° Full Extension (No lag)',
        deformity: 'Well healed surgical scar · Joint stable in AP and varus/valgus stress',
        diagnosis: 'Left Total Knee Arthroplasty (Zimmer NexGen CR) — POD 45 Excellent Recovery',
        plan: 'conservative',
        notes: 'Radiograph shows stable cement mantle and neutral alignment. Continue advanced quadriceps and hamstring closed-chain rehab.',
        prescriptions: [
          { drug: 'Tab Calcium Carbonate 500mg + Vit D3', dosage: '0-1-0 after food', duration: '60 days' },
          { drug: 'Tab Paracetamol 650mg', dosage: 'SOS for exertion ache', duration: '15 days' },
        ]
      };
    } else if (t.token === 'T-104') {
      return {
        complaint: 'Acute sports injury during football yesterday. Heard audible "pop" followed by rapid swelling and instability.',
        romFlexion: '85° (Limited by tense hemarthrosis)',
        romExtension: '10° Extension lag due to effusion',
        deformity: 'Lachman Test Grade 3+ positive with soft end-point · Pivot Shift positive',
        diagnosis: 'Acute Complete Rupture of Anterior Cruciate Ligament (ACL) Right Knee',
        plan: 'surgical',
        notes: 'MRI confirms complete mid-substance ACL tear and lateral condyle bone contusion. Arthroscopic ACL Reconstruction with Hamstring Autograft advised once acute swelling subsides.',
        prescriptions: [
          { drug: 'Tab Etoricoxib 90mg', dosage: '1-0-0 after food', duration: '7 days' },
          { drug: 'Tab Pantoprazole 40mg', dosage: '1-0-0 before food', duration: '7 days' },
          { drug: 'Hinged Knee Brace locked at 0-30°', dosage: 'Continuous with crutches', duration: '3 weeks' },
        ]
      };
    } else if (t.token === 'T-105') {
      return {
        complaint: 'Shooting electrical pain into right neck, shoulder and thumb/index fingers for 5 months. Worse on sitting at computer.',
        romFlexion: 'Neck rotation limited right 25°',
        romExtension: 'Extension reproduces right C6 radicular pain',
        deformity: 'Spurling sign positive on right · Biceps reflex diminished (1+)',
        diagnosis: 'Cervical Spondylotic Radiculopathy at C5-C6 with Foraminal Stenosis',
        plan: 'conservative',
        notes: 'Trial of cervical traction and neuropathic pain modulation. If motor deficit worsens, anterior cervical discectomy and fusion (ACDF) to be considered.',
        prescriptions: [
          { drug: 'Tab Pregabalin 75mg + Methylcobalamin 750mcg', dosage: '0-0-1 at bedtime', duration: '21 days' },
          { drug: 'Tab Naproxen 500mg', dosage: '1-0-1 after food', duration: '7 days' },
          { drug: 'Contoured Cervical Memory Foam Pillow', dosage: 'Nocturnal use', duration: 'Ongoing' },
        ]
      };
    } else if (t.token === 'T-107') {
      return {
        complaint: 'Emergency trauma intake: Road traffic two-wheeler skid 2 hours ago. Severe right ankle pain and deformity.',
        romFlexion: 'Ankle movement locked due to pain',
        romExtension: 'Non-weight bearing',
        deformity: 'Gross lateral displacement of foot · Skin intact without open wound · Distal pulses palpable',
        diagnosis: 'Acute Unstable Bimalleolar Right Ankle Fracture (Weber B) with Syndesmotic Widening',
        plan: 'surgical',
        notes: 'Stat emergency ORIF indicated. Distal fibula plate fixation + medial malleolus cannulated screws planned in Trauma OT today. Patient is NPO.',
        prescriptions: [
          { drug: 'Inj Tramadol 50mg IV STAT', dosage: 'STAT in casualty', duration: 'Single dose' },
          { drug: 'Inj Cefuroxime 1.5g IV STAT', dosage: 'Pre-op prophylactic antibiotic', duration: 'Single dose' },
          { drug: 'Below Knee Posterior Plaster Splint with limb elevation', dosage: 'Strict elevation on Bohler-Braun frame', duration: 'Pre-op' },
        ]
      };
    }
    return {
      complaint: 'Severe pain in right knee joint, worsening over past 8 months. Difficulty bearing weight and climbing stairs.',
      romFlexion: '90° Flexion',
      romExtension: '5° Extension lag',
      deformity: 'Varus Deformity (7.2°) · Medial joint line tenderness',
      diagnosis: 'Severe Primary Osteoarthritis Right Knee (Kellgren-Lawrence Grade IV)',
      plan: 'surgical',
      notes: 'Patient failed conservative analgesics and intra-articular Hyaluronic Acid. Total Knee Arthroplasty (TKA) recommended. Zimmer NexGen CR planned.',
      prescriptions: [
        { drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', dosage: '1-0-1 after food', duration: '5 days' },
        { drug: 'Tab Pantoprazole 40mg', dosage: '1-0-0 before food', duration: '5 days' },
        { drug: 'Tab Calcium Carbonate 500mg + Vit D3', dosage: '0-1-0 after food', duration: '30 days' },
      ]
    };
  };

  const currentNote = getDynamicConsultNote(activeTriage);

  // Surgeries scheduled for this doctor
  const doctorSurgeries = mockSurgeries.filter(s => s.doctorId === selectedDoctor.id || s.doctorName.includes(selectedDoctor.name.split(' ')[1])).slice(0, 3);

  const specializations = ['All', 'Joint Replacement', 'Spine Surgery', 'Sports Medicine & Arthroscopy', 'Trauma & Fracture', 'Pediatric Orthopedics'];

  const filteredDoctors = mockDoctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialization.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specializationFilter === 'All' || doc.specialization.toLowerCase().includes(specializationFilter.toLowerCase());
    return matchSearch && matchSpec;
  });

  const handleSaveConsultation = () => {
    setConsultSavedToast(true);
    setTimeout(() => setConsultSavedToast(false), 3000);
  };

  return (
    <div className="page-container">
      {consultSavedToast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Consultation note & e-prescription saved to patient record!</span>
        </motion.div>
      )}

      {/* Header with Mode Toggle */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Doctor's Clinical Station & Directory</h1>
            <p className="page-subtitle">Real-time OPD consultation cockpit · Orthopedic examination · Surgeon schedules</p>
          </div>
          {/* Dual Mode Switcher */}
          <div className="flex items-center p-1 bg-white border border-surface-200 rounded-xl shadow-xs self-start">
            <button
              onClick={() => setActiveTab('clinical_station')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'clinical_station' ? 'bg-teal-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900 hover:bg-surface-50'
              )}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Clinical Consultation Station</span>
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'directory' ? 'bg-primary-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900 hover:bg-surface-50'
              )}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Specialist Directory ({mockDoctors.length})</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          MODE 1: DOCTOR'S ACTIVE CLINICAL STATION
         ═══════════════════════════════════════════════════ */}
      {activeTab === 'clinical_station' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Doctor Switcher Bar */}
          <div className="card p-4 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-extrabold text-xl shrink-0">
                  {selectedDoctor.name.split(' ').slice(1, 3).map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{selectedDoctor.name}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                      OPD Cabin Active
                    </span>
                  </div>
                  <p className="text-xs text-teal-200 mt-0.5">{selectedDoctor.specialization} · {selectedDoctor.qualification} · {selectedDoctor.experience}y Exp</p>
                  <div className="flex items-center gap-3 text-[11px] text-teal-100 mt-1.5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-teal-300" /> OPD Shift: 09:00 - 14:00</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3 text-teal-300" /> 16 Tokens Today</span>
                    <span className="flex items-center gap-1"><Syringe className="w-3 h-3 text-teal-300" /> OT Slot: 14:30 PM (OT-1)</span>
                  </div>
                </div>
              </div>

              {/* Selector to test other doctors */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-teal-200 whitespace-nowrap">View As Doctor:</span>
                <select
                  value={selectedDoctorId}
                  onChange={e => setSelectedDoctorId(e.target.value)}
                  className="bg-white/10 text-white text-xs border border-white/20 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {mockDoctors.slice(0, 8).map(d => (
                    <option key={d.id} value={d.id} className="text-gray-900">
                      {d.name} ({d.specialization.split(' ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3-Column Custom Clinical Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Column 1: Live Patient Queue (3.5 cols) */}
            <div className="lg:col-span-4 card flex flex-col overflow-hidden">
              <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Live OPD Queue</h3>
                  <p className="text-[10px] text-gray-400">Click to load patient into consultation pad</p>
                </div>
                <span className="badge bg-teal-100 text-teal-800 text-xs font-bold">6 Tokens</span>
              </div>

              <div className="divide-y divide-surface-100 overflow-y-auto max-h-[640px]">
                {doctorAppointments.map(patient => {
                  const isCurrent = activeToken === patient.token;
                  return (
                    <div
                      key={patient.token}
                      onClick={() => setActiveToken(patient.token)}
                      className={cn(
                        'p-3.5 cursor-pointer transition-all',
                        isCurrent ? 'bg-teal-50/80 border-l-4 border-teal-600 shadow-2xs' : 'hover:bg-surface-50'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            'font-mono font-bold text-xs px-2 py-0.5 rounded',
                            isCurrent ? 'bg-teal-600 text-white' : 'bg-surface-100 text-gray-700'
                          )}>
                            {patient.token}
                          </span>
                          {patient.isNewPatient ? (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              NEW
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                              <span>📜</span>
                              <span>{patient.pastVisitsCount} Visits</span>
                            </span>
                          )}
                        </div>
                        <span className={cn(
                          'badge text-[10px]',
                          patient.status === 'In Cabin' ? 'bg-emerald-100 text-emerald-800 font-bold animate-pulse' :
                          patient.status.includes('Waiting') ? 'bg-amber-100 text-amber-800 font-semibold' :
                          'bg-surface-100 text-gray-600'
                        )}>
                          {patient.status}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-gray-900 truncate">
                        {patient.patientName} <span className="text-[11px] font-normal text-gray-500">({patient.age}y/{patient.gender})</span>
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{patient.primaryJoint} · {patient.duration}</p>
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center justify-between">
                        <span>🕒 {patient.registeredTime}</span>
                        <span className="text-teal-700 font-semibold">{patient.cabin}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Orthopedic EMR Consultation & Exam Pad + Highlighted History Tab (5 cols) */}
            <div className="lg:col-span-5 card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-900">Consultation Station</h3>
                </div>
                <div className="flex items-center gap-2">
                  {activeTriage.isNewPatient ? (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      🟢 New Patient
                    </span>
                  ) : (
                    <button
                      onClick={() => setConsultSubTab('history')}
                      className="text-[11px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1 shadow-2xs transition-all"
                      title="Click to view patient longitudinal history"
                    >
                      <span>📜</span>
                      <span>{activeTriage.pastVisitsCount} Past Visits</span>
                    </button>
                  )}
                  <span className="text-xs font-mono font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 shadow-2xs">
                    {activeTriage.token}
                  </span>
                </div>
              </div>

              {/* OP Triage Clinical Brief: Gathered at Reception Intake — Curated for Doctor */}
              <DoctorPreConsultBrief
                triage={activeTriage}
                onOpenDicom={(studyId) => {
                  setSelectedDicomStudyId(studyId || activeTriage.rawScanId);
                  setIsDicomOpen(true);
                }}
              />

              {/* Consultation Pad vs Highlighted History Sub-Tabs */}
              <div className="flex items-center gap-2 p-1 bg-surface-100 rounded-xl border border-surface-200">
                <button
                  onClick={() => setConsultSubTab('consult')}
                  className={cn(
                    'flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
                    consultSubTab === 'consult'
                      ? 'bg-white text-teal-800 shadow-xs border border-surface-200'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ortho Examination Pad</span>
                </button>

                <button
                  onClick={() => setConsultSubTab('history')}
                  className={cn(
                    'flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
                    consultSubTab === 'history'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : !activeTriage.isNewPatient
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <span>📜</span>
                  <span>
                    History {activeTriage.isNewPatient ? '(New)' : `(${activeTriage.pastVisitsCount})`}
                  </span>
                </button>

                <button
                  onClick={() => setConsultSubTab('billing')}
                  className={cn(
                    'py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
                    consultSubTab === 'billing'
                      ? 'bg-emerald-600 text-white shadow-md font-black'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>Billing & TPA</span>
                </button>
              </div>

              {/* TAB 1: Orthopedic Consultation & Exam Pad */}
              {consultSubTab === 'consult' && (
                <div className="space-y-4">
                  {/* Chief Complaint */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Chief Complaint & Present Illness</label>
                    <textarea
                      rows={2}
                      value={currentNote.complaint}
                      readOnly
                      className="input-base text-xs font-normal bg-surface-50"
                    />
                  </div>

                  {/* Orthopedic Examination Gauges */}
                  <div className="bg-surface-50 p-3.5 rounded-xl border border-surface-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Bone className="w-3.5 h-3.5 text-teal-600" /> Physical Joint Examination
                      </span>
                      <span className="text-[10px] text-teal-700 font-semibold">{activeTriage.primaryJoint} Goniometry</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-gray-500 block mb-0.5">Flexion / Abduction Range</label>
                        <input
                          type="text"
                          value={currentNote.romFlexion}
                          readOnly
                          className="input-base text-xs py-1 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 block mb-0.5">Extension / Lag</label>
                        <input
                          type="text"
                          value={currentNote.romExtension}
                          readOnly
                          className="input-base text-xs py-1 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-0.5">Alignment & Physical Signs</label>
                      <input
                        type="text"
                        value={currentNote.deformity}
                        readOnly
                        className="input-base text-xs py-1 bg-white"
                      />
                    </div>
                  </div>

                  {/* Clinical Diagnosis */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Clinical Diagnosis & Staging</label>
                    <input
                      type="text"
                      value={currentNote.diagnosis}
                      readOnly
                      className="input-base text-xs font-bold text-teal-900 bg-teal-50/50 border-teal-300"
                    />
                  </div>

                  {/* Treatment Decision Toggle */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Recommended Pathway</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={cn(
                          'p-2 rounded-lg text-xs font-bold text-center border transition-all',
                          currentNote.plan === 'surgical' ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-surface-50 text-gray-400 border-surface-200'
                        )}
                      >
                        🔪 Surgical / OT Intervention
                      </div>
                      <div
                        className={cn(
                          'p-2 rounded-lg text-xs font-bold text-center border transition-all',
                          currentNote.plan === 'conservative' ? 'bg-teal-600 text-white border-teal-600 shadow-xs' : 'bg-surface-50 text-gray-400 border-surface-200'
                        )}
                      >
                        💊 Conservative & Rehab
                      </div>
                    </div>
                  </div>

                  {/* E-Prescription Preview */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">E-Prescription Pad</label>
                    <div className="space-y-1.5">
                      {currentNote.prescriptions.map((rx, idx) => (
                        <div key={idx} className="p-2 bg-surface-50 rounded-lg border border-surface-200 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{rx.drug}</p>
                            <p className="text-[10px] text-gray-500">{rx.dosage} · {rx.duration}</p>
                          </div>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Rx</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-surface-100">
                    <button
                      onClick={handleSaveConsultation}
                      className="flex-1 btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs !py-2.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Save Note & Sign E-Prescription</span>
                    </button>
                    <button
                      onClick={() => navigate('/surgeries')}
                      className="btn-secondary !text-xs !py-2.5"
                      title="Schedule in Surgery Pipeline"
                    >
                      <Syringe className="w-3.5 h-3.5 text-purple-600" />
                      <span>Book OT</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Dedicated Highlighted Clinical History & Past Visits Timeline */}
              {consultSubTab === 'history' && (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {activeTriage.isNewPatient ? (
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md text-xl">
                        🟢
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-950">New Patient Registration</h4>
                        <p className="text-xs text-emerald-700 font-medium mt-1">
                          First Consultation Today at RASA Ortho OS
                        </p>
                      </div>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        No previous medical records or surgeries exist in the hospital database for <strong>{activeTriage.patientName}</strong>. 
                        Today's baseline triage vitals, symptoms, and radiograph (<strong>{activeTriage.rawScanId}</strong>) will establish their initial clinical profile.
                      </p>
                      <div className="p-3 bg-white rounded-xl border border-emerald-200 text-left text-xs space-y-1">
                        <p className="font-bold text-emerald-900">Baseline Triage Registered:</p>
                        <p className="text-gray-600">Primary Joint: {activeTriage.primaryJoint}</p>
                        <p className="text-gray-600">VAS Score: {activeTriage.painScore}/10 ({activeTriage.onsetMode})</p>
                        <p className="text-gray-600">Mobility: {activeTriage.mobilityStatus}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📜</span>
                          <div>
                            <h4 className="text-xs font-bold text-amber-950">
                              Patient Longitudinal Record
                            </h4>
                            <p className="text-[11px] text-amber-800">
                              {activeTriage.pastVisitsCount} documented clinical encounters on file
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black">
                          VERIFIED EMR
                        </span>
                      </div>

                      {activeTriage.pastVisits.map((visit, index) => (
                        <div
                          key={visit.id}
                          className="p-3.5 rounded-xl border-2 border-amber-200 bg-amber-50/40 hover:bg-amber-50/80 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                                #{index + 1}
                              </span>
                              <span className="text-xs font-bold text-gray-900">{visit.date}</span>
                              <span className="text-[10px] font-mono text-gray-500">({visit.id})</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                              {visit.visitType}
                            </span>
                          </div>

                          <div className="text-xs space-y-1">
                            <p className="text-gray-500 text-[11px]">
                              Consultant: <strong className="text-gray-800">{visit.doctor}</strong> · {visit.department}
                            </p>
                            <p className="text-gray-700">
                              <strong>Diagnosis:</strong> <span className="font-semibold text-teal-900">{visit.clinicalDiagnosis}</span>
                            </p>
                            <p className="text-gray-600 text-[11px]">
                              <strong>Interventions:</strong> {visit.interventions}
                            </p>
                          </div>

                          {/* Prescribed medications */}
                          <div className="p-2 bg-white rounded-lg border border-amber-200/80 text-[11px] space-y-0.5">
                            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Prescribed at Visit:</span>
                            {visit.prescriptions.map((p, pi) => (
                              <p key={pi} className="text-gray-700 flex items-center gap-1.5">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{p}</span>
                              </p>
                            ))}
                          </div>

                          {/* Prior imaging button */}
                          {visit.scanStudyId && (
                            <button
                              onClick={() => {
                                setSelectedDicomStudyId(visit.scanStudyId!);
                                setIsDicomOpen(true);
                              }}
                              className="w-full text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 border border-teal-200 py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal-600" />
                              <span>View Prior Study Radiograph ({visit.scanStudyId})</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Patient Billing & TPA Insurance Ledger */}
              {consultSubTab === 'billing' && (() => {
                const invoices = getPatientInvoices(activeTriage.patientName);
                const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
                const totalPaid = invoices.reduce((acc, inv) => acc + inv.patientPaid + inv.tpaCovered, 0);
                const activeInsurance = invoices.find(inv => inv.insuranceDetails)?.insuranceDetails;

                return (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-xs">
                    {/* Summary Strip */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 bg-surface-50 rounded-xl border border-surface-200">
                        <span className="text-[10px] text-gray-400 block font-bold">Total Billed</span>
                        <p className="text-sm font-black text-gray-900">{formatCurrency(totalBilled)}</p>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                        <span className="text-[10px] text-emerald-700 block font-bold">Settled / Paid</span>
                        <p className="text-sm font-black text-emerald-800">{formatCurrency(totalPaid)}</p>
                      </div>
                      <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
                        <span className="text-[10px] text-blue-700 block font-bold">Billing Status</span>
                        <p className="text-xs font-bold text-blue-800 capitalize mt-0.5">{activeTriage.billingStatus}</p>
                      </div>
                    </div>

                    {/* Active TPA Pre-Auth */}
                    {activeInsurance && (
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-1.5 shadow-xs">
                        <div className="flex items-center justify-between border-b border-blue-500/30 pb-1">
                          <span className="font-bold text-[11px] text-blue-200 flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5 text-blue-400" />
                            <span>{activeInsurance.provider}</span>
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                            {activeInsurance.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-blue-300 block">Claim ID:</span>
                            <span className="font-mono text-white">{activeInsurance.claimNumber}</span>
                          </div>
                          <div>
                            <span className="text-blue-300 block">Approved Sum:</span>
                            <span className="font-bold text-emerald-300">{formatCurrency(activeInsurance.preAuthApprovedAmount)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Invoices List */}
                    <div className="space-y-2">
                      <p className="font-bold text-gray-700 text-xs">Documented Invoices & Hospital Charges:</p>
                      {invoices.map(inv => (
                        <div key={inv.id} className="p-3 bg-white rounded-xl border border-surface-200 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-teal-700">{inv.invoiceNumber}</span>
                            <span className={cn(
                              'badge text-[9px] font-bold',
                              inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              inv.status === 'tpa_approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            )}>
                              {inv.status === 'paid' ? 'Paid' : inv.status === 'tpa_approved' ? 'TPA Settled' : 'Pending'}
                            </span>
                          </div>
                          <div className="space-y-1 text-[11px] text-gray-600 bg-surface-50 p-2 rounded-lg">
                            {inv.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="truncate max-w-xs">• {it.description}</span>
                                <span className="font-mono">{formatCurrency(it.total)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[10px] pt-1 border-t border-surface-100">
                            <span className="text-gray-400">{inv.date} · Mode: {inv.paymentMode || 'TPA'}</span>
                            <span className="font-bold text-gray-900 text-xs">{formatCurrency(inv.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Column 3: Individual Distinct Medical Radiograph Lightbox (3.5 cols) */}
            <div className="lg:col-span-3 space-y-4">
              {/* Imaging Review Box with Real Medical Scan & 1-Click DICOM Lightbox */}
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3 border-b border-surface-100 pb-2">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-teal-600" />
                    Patient Radiograph Lightbox
                  </h4>
                  <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">
                    Raw PACS Ready
                  </span>
                </div>

                {/* Interactive Real Medical Radiograph Image (Exact matching scan per patient!) */}
                <div
                  onClick={() => {
                    setSelectedDicomStudyId(activeTriage.rawScanId);
                    setIsDicomOpen(true);
                  }}
                  className="group relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-slate-700 shadow-md cursor-pointer hover:border-teal-500 transition-all"
                  title="Click to open raw copy in full-res DICOM viewer"
                >
                  <img
                    src={activeTriage.scanThumbnailUrl}
                    alt={activeTriage.investigationsStatus}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 filter contrast-125"
                  />

                  {/* Dark overlay on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 text-white pointer-events-none">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-teal-300 flex items-center gap-1">
                          <Eye className="w-3 h-3 text-teal-400" />
                          <span>Click to Inspect Raw Copy</span>
                        </p>
                        <p className="text-[10px] text-slate-300 truncate max-w-44">
                          {activeTriage.primaryJoint}
                        </p>
                      </div>
                      <span className="p-1.5 rounded-lg bg-teal-600/90 text-white group-hover:scale-110 group-hover:bg-teal-500 transition-all shadow-md">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <span className="absolute top-2 left-2 text-[9px] font-mono text-teal-300 bg-black/75 px-1.5 py-0.5 rounded border border-teal-500/40">
                    {activeTriage.rawScanId}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-gray-600 bg-surface-50 p-2 rounded-lg border border-surface-200">
                  <p className="font-semibold text-gray-800 truncate">{activeTriage.investigationsStatus}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Click scan above or button below for PACS lightbox tools (Ruler, Caliper, Invert).</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedDicomStudyId(activeTriage.rawScanId);
                    setIsDicomOpen(true);
                  }}
                  className="w-full mt-2.5 text-xs text-teal-700 font-bold hover:text-teal-800 hover:underline text-center flex items-center justify-center gap-1 py-1.5 bg-teal-50 rounded-lg border border-teal-200 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-600" />
                  <span>Open Full DICOM PACS Viewer &rarr;</span>
                </button>
              </div>

              {/* Surgeon's Scheduled OT Cases Today */}
              <div className="card p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Syringe className="w-3.5 h-3.5 text-purple-600" />
                    Today's OT Schedule
                  </h4>
                  <span className="badge bg-purple-100 text-purple-800 text-[10px] font-bold">2 Cases</span>
                </div>

                <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-purple-950">
                    <span>OT 1 · 14:30 PM</span>
                    <span className="badge bg-purple-200 text-purple-900 text-[9px]">Pre-Op Ready</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900">Total Knee Replacement (Left)</p>
                  <p className="text-[11px] text-gray-600">Patient: Rajesh Kumar Sharma (58M)</p>
                  <p className="text-[10px] text-purple-800 font-medium">Implant: Zimmer NexGen CR · PAC Cleared</p>
                </div>

                <div className="p-3 rounded-xl border border-surface-200 bg-surface-50 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                    <span>OT 2 · 17:00 PM</span>
                    <span className="badge bg-blue-100 text-blue-800 text-[9px]">Scheduled</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900">Diagnostic Knee Arthroscopy</p>
                  <p className="text-[11px] text-gray-600">Patient: Deepa Venkat (37F)</p>
                  <p className="text-[10px] text-gray-500 font-medium">Anesthesia: Spinal · Shaver Kits Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════
          MODE 2: SPECIALIST DIRECTORY & ROSTER
         ═══════════════════════════════════════════════════ */}
      {activeTab === 'directory' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Filters and Search */}
          <div className="card p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search doctors by name or specialization..."
                className="input-base pl-9 text-xs"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              {specializations.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSpecializationFilter(spec)}
                  className={cn(
                    'badge cursor-pointer px-3 py-1 font-semibold text-xs transition-colors',
                    specializationFilter === spec ? 'bg-primary-600 text-white' : 'bg-surface-100 hover:bg-surface-200 text-gray-600'
                  )}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid with Instant "Open Station" button */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredDoctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="card-hover p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-xs">
                      {doc.name.split(' ').slice(1, 3).map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{doc.name}</p>
                      <p className="text-xs text-primary-600 font-semibold">{doc.specialization}</p>
                      <p className="text-[10px] text-gray-400 truncate">{doc.qualification}</p>
                    </div>
                    <span
                      className={cn('w-2.5 h-2.5 rounded-full mt-1 shrink-0', doc.isAvailable ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-gray-300')}
                      title={doc.isAvailable ? 'Available' : 'Unavailable'}
                    />
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-500" /><span className="font-semibold text-gray-800">{doc.experience}y</span> clinical experience</div>
                    <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" />{formatPhone(doc.phone)}</div>
                    <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" />{doc.email}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">OPD Fee</span>
                    <span className="font-bold text-xs text-gray-900">{formatCurrency(doc.consultationFee)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctorId(doc.id);
                      setActiveTab('clinical_station');
                    }}
                    className="btn-primary !text-xs !py-1.5 !px-3 shadow-2xs"
                  >
                    <span>Open Station</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Interactive Full-Res DICOM & Raw Radiograph Lightbox Modal */}
      <DicomViewerModal
        isOpen={isDicomOpen}
        onClose={() => setIsDicomOpen(false)}
        initialStudyId={selectedDicomStudyId}
      />
    </div>
  );
}
