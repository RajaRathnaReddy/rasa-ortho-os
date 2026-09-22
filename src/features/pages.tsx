// All remaining module pages bundled together for efficiency
// Each will be split into individual files as the module matures

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Microscope, Activity, Dumbbell, MessageSquare, Bot, FileBarChart,
  TrendingUp, IndianRupee, Package, UserCog, Settings, Plus,
  MonitorSmartphone, ClipboardList, Search, Sparkles, Send, Clock,
  CheckCircle2, AlertCircle, AlertTriangle, Users, Syringe, CalendarDays, Phone,
  Zap, Brain, Shield, Stethoscope, BedDouble, CheckSquare, FileText,
  Printer, Ticket, UserCheck, RefreshCw, Play, HeartPulse, Bone,
  Eye, Maximize2, ShieldAlert, Flame, ChevronRight, LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/cn';
import { mockDiagnostics, mockPhysiotherapy, mockCommunications, mockDoctors, mockOTs, mockSurgeries, mockAuditLogs, mockInvoices, mockImplants } from '../data/mock';
import { formatDate, formatTime, formatCurrency, formatPhone, getInitials } from '../lib/formatters';
import { DIAGNOSTIC_TYPE_CONFIG } from '../lib/constants';
import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DicomViewerModal, SAMPLE_DICOM_STUDIES } from '../components/ui/DicomViewerModal';
import { INITIAL_OP_TRIAGE_RECORDS, OpTriageData } from '../data/opTriageData';
import { DoctorPreConsultBrief } from '../components/ui/DoctorPreConsultBrief';

// ═══════════════════════════════════════════════════
//  RECEPTION WORKSPACE (FRONT-DESK COMMAND STATION)
// ═══════════════════════════════════════════════════
export function ReceptionPage() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState<OpTriageData[]>(INITIAL_OP_TRIAGE_RECORDS);
  const [selectedTokenForPreview, setSelectedTokenForPreview] = useState<OpTriageData | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'full_board'>('split');

  // Comprehensive Walk-in OP Clinical Intake State
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'M' as 'M' | 'F' | 'Other',
    occupation: 'Self-employed / Desk work',
    doctor: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Knee Joint',
    duration: '6 Months',
    painScore: 7,
    painCharacteristics: ['Sharp on weight-bearing', 'Morning stiffness >30m'] as string[],
    mobilityLimitation: 'Antalgic limp · Difficulty climbing stairs',
    onsetMode: 'Gradual Degenerative' as 'Gradual Degenerative' | 'Acute Trauma / Fall' | 'Sports Injury' | 'Post-Surgical',
    bp: '130/84 mmHg',
    pulse: '76',
    spo2: '98%',
    temp: '98.4°F',
    weightKg: '78',
    heightCm: '168',
    criticalAlerts: ['⚠️ None'] as string[],
    investigations: 'Digital AP Standing X-Ray Shot Today in Hospital (XR-2024-8842)',
    rawScanId: 'xr-knee-01',
    billingStatus: 'paid' as 'paid' | 'pending' | 'tpa',
    billingAmount: '₹1,200 (UPI)',
  });

  const [dispensedToast, setDispensedToast] = useState<string | null>(null);

  // Quick Preset Handlers for 1-click reception testing
  const applyPreset = (type: 'knee_oa' | 'lumbar_disc' | 'hip_oa' | 'shoulder_tear') => {
    if (type === 'knee_oa') {
      setNewPatient({
        name: 'Ramesh Chandra Verma',
        phone: '+91 98765 01050',
        age: '61',
        gender: 'M',
        occupation: 'Retired Public Servant',
        doctor: 'Dr. Anand Krishnamurthy',
        cabin: 'Cabin 101',
        primaryJoint: 'Right Knee Joint',
        duration: '9 Months (Progressive)',
        painScore: 8,
        painCharacteristics: ['Sharp on weight-bearing', 'Morning stiffness 45m', 'Crepitus on bending'],
        mobilityLimitation: 'Severe limp · Unable to climb stairs · Cannot squat · Uses walking stick',
        onsetMode: 'Gradual Degenerative',
        bp: '140/90 mmHg',
        pulse: '78',
        spo2: '98%',
        temp: '98.4°F',
        weightKg: '88',
        heightCm: '166',
        criticalAlerts: ['⚠️ Active Blood Thinners: Tab Ecosprin 75mg daily', '⚠️ Penicillin Allergy', 'Type 2 Diabetes'],
        investigations: 'Hospital Digital Standing X-Ray Ready (XR-2024-8842)',
        rawScanId: 'xr-knee-01',
        billingStatus: 'paid',
        billingAmount: '₹1,200 (UPI)',
      });
    } else if (type === 'lumbar_disc') {
      setNewPatient({
        name: 'Meenakshi Sundaram',
        phone: '+91 98765 01051',
        age: '48',
        gender: 'F',
        occupation: 'IT Consultant (Long Sitting Hours)',
        doctor: 'Dr. Lakshmi Narayana',
        cabin: 'Cabin 102',
        primaryJoint: 'Lumbar Spine (L4-L5)',
        duration: '3 Months (Acute Flare)',
        painScore: 9,
        painCharacteristics: ['Electric shock sciatica down left leg', 'Numbness in foot', 'Severe morning stiffness'],
        mobilityLimitation: 'Neurological claudication < 100m · Unable to sit > 15m · Antalgic posture',
        onsetMode: 'Gradual Degenerative',
        bp: '136/86 mmHg',
        pulse: '84',
        spo2: '99%',
        temp: '98.6°F',
        weightKg: '72',
        heightCm: '162',
        criticalAlerts: ['⚠️ Neurological Red Flag: Left Foot Extensor Weakness (Gr 4/5)'],
        investigations: 'High-Res Lumbar Spine MRI Scan Ready (MR-2024-5119)',
        rawScanId: 'mr-spine-02',
        billingStatus: 'paid',
        billingAmount: '₹1,500 (Cash)',
      });
    } else if (type === 'hip_oa') {
      setNewPatient({
        name: 'K. Narayana Swamy',
        phone: '+91 98765 01052',
        age: '65',
        gender: 'M',
        occupation: 'Farmer (Manual Field Work)',
        doctor: 'Dr. Anand Krishnamurthy',
        cabin: 'Cabin 101',
        primaryJoint: 'Right Hip Joint',
        duration: '1.5 Years',
        painScore: 8,
        painCharacteristics: ['Groin pain on rotation', 'Difficulty cutting toenails', 'Morning stiffness >40m'],
        mobilityLimitation: 'Trendelenburg lurch · Limb shortening 1.5 cm · Requires high chair',
        onsetMode: 'Gradual Degenerative',
        bp: '134/82 mmHg',
        pulse: '72',
        spo2: '98%',
        temp: '98.2°F',
        weightKg: '68',
        heightCm: '165',
        criticalAlerts: ['⚠️ Severe Osteoporosis (T-score -2.8)', 'Hypertension on Amlodipine'],
        investigations: 'Pelvis AP Standing Radiograph Ready (XR-2024-3991)',
        rawScanId: 'xr-pelvis-03',
        billingStatus: 'tpa',
        billingAmount: 'TPA Insured',
      });
    } else if (type === 'shoulder_tear') {
      setNewPatient({
        name: 'Vipin George',
        phone: '+91 98765 01053',
        age: '36',
        gender: 'M',
        occupation: 'Badminton Coach / Athlete',
        doctor: 'Dr. Anand Krishnamurthy',
        cabin: 'Cabin 101',
        primaryJoint: 'Right Shoulder Joint',
        duration: '2 Weeks following smash fall',
        painScore: 7,
        painCharacteristics: ['Severe night pain sleeping on right side', 'Painful arc 60-120°', 'Weakness in overhead lift'],
        mobilityLimitation: 'Active abduction limited to 60° · Cannot reach back pocket',
        onsetMode: 'Sports Injury',
        bp: '122/78 mmHg',
        pulse: '68',
        spo2: '99%',
        temp: '98.4°F',
        weightKg: '74',
        heightCm: '175',
        criticalAlerts: ['⚠️ Sulfa Drug Allergy'],
        investigations: 'Digital Shoulder Radiograph + USG Pending Signoff',
        rawScanId: 'xr-knee-01',
        billingStatus: 'paid',
        billingAmount: '₹800 (Card)',
      });
    }
  };

  // Calculate BMI dynamically
  const weight = parseFloat(newPatient.weightKg) || 70;
  const heightM = (parseFloat(newPatient.heightCm) || 170) / 100;
  const calculatedBmi = (weight / (heightM * heightM)).toFixed(1);
  const isHighBmi = parseFloat(calculatedBmi) >= 30;

  const handleDispenseToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name) return;
    const nextNum = tokens.length + 101;
    const newTokenCode = `T-${nextNum}`;
    const cabin = newPatient.doctor.includes('Anand') ? 'Cabin 101' : newPatient.doctor.includes('Lakshmi') ? 'Cabin 102' : 'Cabin 103';

    const newRecord: OpTriageData = {
      token: newTokenCode,
      patientId: `PT-2024-${nextNum}`,
      patientName: newPatient.name,
      age: parseInt(newPatient.age) || 50,
      gender: newPatient.gender,
      phone: newPatient.phone || '+91 98765 00000',
      occupation: newPatient.occupation,
      doctorAssigned: newPatient.doctor,
      cabin: cabin,
      primaryJoint: newPatient.primaryJoint,
      duration: newPatient.duration,
      painScore: newPatient.painScore,
      painCharacter: newPatient.painCharacteristics,
      onsetMode: newPatient.onsetMode,
      mobilityStatus: newPatient.mobilityLimitation,
      triageVitals: {
        bp: newPatient.bp,
        pulse: parseInt(newPatient.pulse) || 76,
        spo2: newPatient.spo2,
        temp: newPatient.temp,
        weightKg: weight,
        heightCm: parseFloat(newPatient.heightCm) || 170,
        bmi: parseFloat(calculatedBmi),
        bmiCategory: isHighBmi ? 'Obese (Excess Joint Stress)' : 'Normal / Overweight',
      },
      criticalAlerts: newPatient.criticalAlerts.filter(a => a !== '⚠️ None'),
      investigationsStatus: newPatient.investigations,
      rawScanId: newPatient.rawScanId,
      scanThumbnailUrl: newPatient.rawScanId === 'mr-shoulder-02' ? '/images/mri-shoulder-cuff.svg'
        : newPatient.rawScanId === 'xr-tkr-03' ? '/images/xray-tkr-postop.svg'
        : newPatient.rawScanId === 'mr-acl-04' ? '/images/mri-knee-acl.svg'
        : newPatient.rawScanId === 'xr-cervical-05' ? '/images/xray-cervical-spine.svg'
        : newPatient.rawScanId === 'xr-pelvis-06' ? '/images/xray-pelvis-hip.jpg'
        : newPatient.rawScanId === 'xr-ankle-07' ? '/images/xray-ankle-fracture.svg'
        : newPatient.rawScanId === 'mr-spine-08' ? '/images/mri-lumbar-spine.jpg'
        : '/images/xray-knee-standing.jpg',
      billingStatus: newPatient.billingStatus,
      billingAmount: newPatient.billingAmount,
      registeredTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Waiting',
      isNewPatient: true,
      pastVisitsCount: 0,
      pastVisits: [],
    };

    setTokens([newRecord, ...tokens]);
    setSelectedTokenForPreview(newRecord);
    setDispensedToast(`🎫 Token ${newTokenCode} Dispensed! Curated OP Dossier routed to ${cabin} (${newPatient.doctor})`);
    setTimeout(() => setDispensedToast(null), 4000);
  };

  const handleStatusChange = (tokenCode: string, newStatus: 'Waiting' | 'In Cabin' | 'Completed') => {
    setTokens(prev => prev.map(t => t.token === tokenCode ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="page-container">
      {dispensedToast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-primary-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold">
          <Ticket className="w-4 h-4" />
          <span>{dispensedToast}</span>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Reception & Front-Desk Station</h1>
            <p className="page-subtitle">Instant OPD token dispensing · Doctor cabin status · Patient check-in & billing</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle: Split vs Full OPD Board */}
            <div className="p-1 bg-surface-100 rounded-xl border border-surface-200 flex items-center gap-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer',
                  viewMode === 'split' ? 'bg-white text-teal-800 shadow-xs border border-surface-200' : 'text-gray-600 hover:text-gray-900'
                )}
                title="Intake form + live token board"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('full_board')}
                className={cn(
                  'px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer',
                  viewMode === 'full_board' ? 'bg-teal-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                )}
                title="Expand token board to full width"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full OPD Board</span>
              </button>
            </div>

            <button
              onClick={() => navigate('/doctors')}
              className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-3 shadow-xs flex items-center gap-1.5 font-bold"
              title="Open Doctor Consultation Station"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Station</span>
            </button>
            <button onClick={() => navigate('/appointments')} className="btn-secondary !text-xs !py-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar Bookings</span>
            </button>
            <button onClick={() => navigate('/patients')} className="btn-secondary !text-xs !py-2">
              <Users className="w-3.5 h-3.5" />
              <span>Patient Directory</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ DOCTOR CABIN LIVE STATUS DISPLAY ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { cabin: 'Cabin 101', doc: 'Dr. Anand Krishnamurthy', spec: 'Joint Replacement & Arthroscopy', curToken: 'T-101', waitCount: 2, estWait: '12m', status: 'Active (Consulting)' },
          { cabin: 'Cabin 102', doc: 'Dr. Lakshmi Narayana', spec: 'Spine Surgery & Scoliosis', curToken: 'T-201', waitCount: 1, estWait: '8m', status: 'Active (Consulting)' },
          { cabin: 'Cabin 103', doc: 'Dr. K. Rajeshwari', spec: 'Trauma & Fracture Reconstruction', curToken: 'T-301', waitCount: 1, estWait: '5m', status: 'Active (Consulting)' },
        ].map(c => (
          <div key={c.cabin} className="card p-4 border border-surface-200 bg-white hover:border-primary-300 transition-all shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary-50 text-primary-700">{c.cabin}</span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {c.status}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">{c.doc}</p>
            <p className="text-[11px] text-gray-400 mb-3">{c.spec}</p>

            <div className="p-2.5 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block">Current Patient:</span>
                <span className="text-sm font-extrabold text-primary-700 font-mono">{c.curToken}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">Queue / Wait:</span>
                <span className="text-xs font-bold text-gray-800">{c.waitCount} waiting (~{c.estWait})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ 2-COLUMN: COMPREHENSIVE CLINICAL OP INTAKE + TOKEN QUEUE BOARD ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Comprehensive Walk-in Clinical OP Intake Form (Shown in Split View) */}
        {viewMode === 'split' && (
          <div className="lg:col-span-4 xl:col-span-4 card p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-surface-100 pb-3">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary-600" />
              <h3 className="text-sm font-bold text-gray-900">Clinical OP Intake & Triage</h3>
            </div>
            <span className="badge bg-teal-50 text-teal-700 text-[10px] font-bold">Gathers All Info for Doctor</span>
          </div>

          {/* Quick-Fill Preset Buttons */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              ⚡ 1-Click Common Orthopedic Presets:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset('knee_oa')}
                className="px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold border border-teal-200 text-left truncate transition-colors"
              >
                🦴 Knee OA Gr IV (TKR)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('lumbar_disc')}
                className="px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-800 text-[10px] font-bold border border-purple-200 text-left truncate transition-colors"
              >
                🧠 L4-L5 Lumbar Sciatica
              </button>
              <button
                type="button"
                onClick={() => applyPreset('hip_oa')}
                className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200 text-left truncate transition-colors"
              >
                🩻 Hip Osteoarthritis
              </button>
              <button
                type="button"
                onClick={() => applyPreset('shoulder_tear')}
                className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 text-left truncate transition-colors"
              >
                💪 Rotator Cuff Tear
              </button>
            </div>
          </div>

          <form onSubmit={handleDispenseToken} className="space-y-3 pt-1 border-t border-surface-100">
            {/* 1. Demographics */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-800 block">1. Patient Demographics</span>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Patient Full Name *"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="input-base text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newPatient.phone}
                    onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="input-base text-xs"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="input-base text-xs"
                  />
                </div>
                <div>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as any })}
                    className="input-base text-xs"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Occupation (e.g. Heavy Manual Labor, Desk Worker)"
                  value={newPatient.occupation}
                  onChange={e => setNewPatient({ ...newPatient, occupation: e.target.value })}
                  className="input-base text-xs"
                />
              </div>
            </div>

            {/* 2. Doctor & Joint */}
            <div className="space-y-2 pt-2 border-t border-surface-100">
              <span className="text-[11px] font-bold text-gray-800 block">2. Doctor & Clinical Focus</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-500 block mb-0.5">Consulting Specialist</label>
                  <select
                    value={newPatient.doctor}
                    onChange={e => {
                      const doc = e.target.value;
                      const cabin = doc.includes('Anand') ? 'Cabin 101' : doc.includes('Lakshmi') ? 'Cabin 102' : 'Cabin 103';
                      setNewPatient({ ...newPatient, doctor: doc, cabin });
                    }}
                    className="input-base text-xs font-medium"
                  >
                    <option value="Dr. Anand Krishnamurthy">Dr. Anand K. (Joint - Cabin 101)</option>
                    <option value="Dr. Lakshmi Narayana">Dr. Lakshmi N. (Spine - Cabin 102)</option>
                    <option value="Dr. K. Rajeshwari">Dr. K. Rajeshwari (Trauma - Cabin 103)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 block mb-0.5">Primary Affected Joint</label>
                  <select
                    value={newPatient.primaryJoint}
                    onChange={e => setNewPatient({ ...newPatient, primaryJoint: e.target.value })}
                    className="input-base text-xs font-medium"
                  >
                    <option value="Right Knee Joint">Right Knee Joint</option>
                    <option value="Left Knee Joint">Left Knee Joint</option>
                    <option value="Bilateral Knee Joints">Bilateral Knee Joints</option>
                    <option value="Right Hip Joint">Right Hip Joint</option>
                    <option value="Left Hip Joint">Left Hip Joint</option>
                    <option value="Lumbar Spine (L4-L5/S1)">Lumbar Spine (L4-L5/S1)</option>
                    <option value="Cervical Spine (C5-C6)">Cervical Spine (C5-C6)</option>
                    <option value="Right Shoulder Joint">Right Shoulder Joint</option>
                    <option value="Ankle / Subtalar Joint">Ankle / Subtalar Joint</option>
                  </select>
                </div>
              </div>

              {/* Pain Score Slider */}
              <div className="p-2.5 rounded-xl bg-surface-50 border border-surface-200 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-500" /> Pain Severity (VAS):
                  </span>
                  <span className={cn(
                    'font-mono font-extrabold px-2 py-0.5 rounded text-xs',
                    newPatient.painScore >= 8 ? 'bg-rose-500 text-white' :
                    newPatient.painScore >= 5 ? 'bg-amber-500 text-white' :
                    'bg-emerald-500 text-white'
                  )}>
                    {newPatient.painScore} / 10 ({newPatient.painScore >= 8 ? 'Severe' : newPatient.painScore >= 5 ? 'Moderate' : 'Mild'})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newPatient.painScore}
                  onChange={e => setNewPatient({ ...newPatient, painScore: parseInt(e.target.value) })}
                  className="w-full accent-rose-600"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Functional Limitation (e.g. Antalgic limp, Cannot climb stairs)"
                  value={newPatient.mobilityLimitation}
                  onChange={e => setNewPatient({ ...newPatient, mobilityLimitation: e.target.value })}
                  className="input-base text-xs"
                />
              </div>
            </div>

            {/* 3. Triage Vitals & BMI */}
            <div className="space-y-2 pt-2 border-t border-surface-100">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-800">3. Pre-Consult Vitals & BMI</span>
                <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', isHighBmi ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')}>
                  BMI: {calculatedBmi} ({isHighBmi ? 'High Joint Stress' : 'Normal'})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                <div>
                  <label className="text-[9px] text-gray-500 block">BP</label>
                  <input
                    type="text"
                    value={newPatient.bp}
                    onChange={e => setNewPatient({ ...newPatient, bp: e.target.value })}
                    className="input-base text-[11px] py-1 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 block">Pulse (bpm)</label>
                  <input
                    type="number"
                    value={newPatient.pulse}
                    onChange={e => setNewPatient({ ...newPatient, pulse: e.target.value })}
                    className="input-base text-[11px] py-1 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 block">Weight (kg)</label>
                  <input
                    type="number"
                    value={newPatient.weightKg}
                    onChange={e => setNewPatient({ ...newPatient, weightKg: e.target.value })}
                    className="input-base text-[11px] py-1 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-500 block">Height (cm)</label>
                  <input
                    type="number"
                    value={newPatient.heightCm}
                    onChange={e => setNewPatient({ ...newPatient, heightCm: e.target.value })}
                    className="input-base text-[11px] py-1 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 4. Critical Alerts & Billing */}
            <div className="space-y-2 pt-2 border-t border-surface-100">
              <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                4. Red Flags & Medical Warnings
              </span>
              <div className="space-y-1">
                {[
                  '⚠️ Active Blood Thinners (Tab Ecosprin / Warfarin)',
                  '⚠️ Documented Penicillin / NSAID Allergy',
                  'Type 2 Diabetes / Hypertensive',
                  'Prior Cardiac Stent / Pacemaker',
                ].map(alertText => {
                  const checked = newPatient.criticalAlerts.includes(alertText);
                  return (
                    <label key={alertText} className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => {
                          if (e.target.checked) {
                            setNewPatient({ ...newPatient, criticalAlerts: [...newPatient.criticalAlerts, alertText] });
                          } else {
                            setNewPatient({ ...newPatient, criticalAlerts: newPatient.criticalAlerts.filter(a => a !== alertText) });
                          }
                        }}
                        className="rounded text-rose-600 accent-rose-600"
                      />
                      <span className="text-[11px]">{alertText}</span>
                    </label>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[10px] text-gray-500 block mb-0.5">Billing Status</label>
                  <select
                    value={newPatient.billingStatus}
                    onChange={e => setNewPatient({ ...newPatient, billingStatus: e.target.value as any })}
                    className="input-base text-xs"
                  >
                    <option value="paid">Paid (₹1,200 UPI/Cash)</option>
                    <option value="pending">Pending Collection</option>
                    <option value="tpa">TPA Pre-Auth Insured</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block mb-0.5">Digital Radiograph / PACS Study</label>
                  <select
                    value={newPatient.rawScanId}
                    onChange={e => setNewPatient({ ...newPatient, rawScanId: e.target.value })}
                    className="input-base text-xs"
                  >
                    <option value="xr-knee-01">Knee AP Standing (XR-2024-8842)</option>
                    <option value="mr-shoulder-02">Shoulder Rotator Cuff MRI (MR-2024-7712)</option>
                    <option value="xr-tkr-03">Post-Op TKR Radiograph (XR-2024-6019)</option>
                    <option value="mr-acl-04">ACL Knee MRI (MR-2024-9104)</option>
                    <option value="xr-cervical-05">Cervical Spine Radiograph (XR-2024-4421)</option>
                    <option value="xr-pelvis-06">Pelvis Bilateral Hips (XR-2024-3991)</option>
                    <option value="xr-ankle-07">Right Ankle Fracture (XR-2024-1102)</option>
                    <option value="mr-spine-08">Lumbar Spine MRI (MR-2024-5119)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-3 shadow-md flex items-center justify-center gap-2 font-bold"
            >
              <Ticket className="w-4 h-4" />
              <span>Dispense Token & Send Curated Dossier to Doctor</span>
            </button>
          </form>
        </div>
        )}

        {/* Right: Live Queue Board + Doctor Brief Preview */}
        <div className={cn(viewMode === 'split' ? 'lg:col-span-8 xl:col-span-8' : 'col-span-12', 'space-y-4')}>
          {/* Active Doctor Triage Brief Preview (If Selected) */}
          {selectedTokenForPreview && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What the Doctor Sees for Token {selectedTokenForPreview.token} (Important Data Only):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/doctors?token=${selectedTokenForPreview.token}`)}
                    className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-1 !px-2.5 shadow-xs flex items-center gap-1 font-bold"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Open in Doctor Station</span>
                  </button>
                  <button
                    onClick={() => setSelectedTokenForPreview(null)}
                    className="text-xs text-gray-400 hover:text-gray-700 font-medium px-2 py-1 rounded hover:bg-slate-100"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
              <DoctorPreConsultBrief
                triage={selectedTokenForPreview}
                onOpenDicom={() => navigate('/diagnostics')}
              />
            </div>
          )}

          {/* Token Queue Table */}
          <div className="card overflow-hidden border border-surface-200 shadow-sm">
            <div className="p-4 border-b border-surface-100 bg-surface-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-gray-900">Today's Front-Desk OPD Token Board</h3>
                <span className="text-xs text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {tokens.length} Clinical Dossiers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50/80 border border-teal-200 px-2.5 py-1 rounded-lg">
                  💡 Click any patient row to preview brief
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-surface-200 text-xs">
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-14 text-center">Token</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 min-w-[130px]">Patient & Joint</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-28">Doctor / Cabin</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-24">Pain & Red Flags</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-20">Billing</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-20 text-center">Status</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 min-w-[160px] text-right">Doctor & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {tokens.map(t => {
                    const isSelected = selectedTokenForPreview?.token === t.token;
                    return (
                      <tr
                        key={t.token}
                        onClick={() => setSelectedTokenForPreview(isSelected ? null : t)}
                        className={cn(
                          'transition-colors cursor-pointer group',
                          isSelected
                            ? 'bg-teal-50/90 border-l-4 border-teal-600 shadow-2xs'
                            : 'hover:bg-teal-50/30'
                        )}
                      >
                        <td className="px-2.5 py-2.5 font-mono font-black text-xs text-teal-800 text-center">
                          <span className={cn(
                            'px-1.5 py-0.5 rounded-md border text-xs font-bold inline-block',
                            isSelected ? 'bg-teal-600 text-white border-teal-600' : 'bg-teal-50 border-teal-200 text-teal-800'
                          )}>
                            {t.token}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-xs text-gray-900 group-hover:text-teal-700 transition-colors">
                              {t.patientName}
                            </p>
                            {t.isNewPatient ? (
                              <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded-full flex items-center gap-1 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                NEW
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-2xs">
                                📜 {t.pastVisitsCount}V
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-teal-700 font-bold mt-0.5 truncate max-w-44">{t.primaryJoint}</p>
                        </td>
                        <td className="px-2.5 py-2.5">
                          <span className="text-xs font-bold text-gray-800 block">{t.cabin}</span>
                          <span className="text-[10px] text-gray-500 font-medium truncate max-w-32 block">{t.doctorAssigned.split(' ')[1]}</span>
                        </td>
                        <td className="px-2.5 py-2.5">
                          <span className="badge bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                            VAS {t.painScore}/10
                          </span>
                          {t.criticalAlerts && t.criticalAlerts.length > 0 && (
                            <span className="text-[9px] text-rose-600 block mt-0.5 truncate max-w-28 font-semibold">
                              {t.criticalAlerts[0]}
                            </span>
                          )}
                        </td>
                        <td className="px-2.5 py-2.5">
                          <span className={cn(
                            'badge text-[10px] font-bold',
                            t.billingStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                            t.billingStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-purple-800'
                          )}>
                            {t.billingAmount}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5 text-center">
                          <span className={cn(
                            'badge text-[10px] font-bold',
                            t.status === 'In Cabin' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                            t.status === 'Waiting' ? 'bg-amber-100 text-amber-800' :
                            'bg-surface-100 text-gray-700'
                          )}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1 flex-nowrap">
                            <button
                              type="button"
                              onClick={() => navigate(`/doctors?token=${t.token}`)}
                              className="px-2 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1 transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                              title="Open patient directly in Doctor Clinical Pad"
                            >
                              <Stethoscope className="w-3 h-3" />
                              <span>Doctor</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedTokenForPreview(isSelected ? null : t)}
                              className={cn(
                                'px-2 py-1 rounded-lg text-[11px] font-bold border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-2xs',
                                isSelected
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                              )}
                              title="Preview OP Triage Brief right here"
                            >
                              <Eye className="w-3 h-3 text-teal-600" />
                              <span>{isSelected ? 'Close' : 'Brief'}</span>
                            </button>
                            {t.status === 'Waiting' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(t.token, 'In Cabin')}
                                className="px-1.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 transition-all whitespace-nowrap cursor-pointer"
                                title="Mark patient In Cabin"
                              >
                                Call In
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  CONSULTATIONS (ORTHOPEDIC EMR SUITE)
// ═══════════════════════════════════════════════════
export function ConsultationsPage() {
  const navigate = useNavigate();
  const [selectedJoint, setSelectedJoint] = useState('Knee');
  const [romValue, setRomValue] = useState(115);
  const [savedSuccess, setSavedSuccess] = useState(false);

  return (
    <div className="page-container">
      {savedSuccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Clinical consultation notes & e-prescription recorded successfully!</span>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Orthopedic Consultation & EMR Suite</h1>
            <p className="page-subtitle">Patient examination · Goniometer Range of Motion · ICD-10 Coding · Digital Prescription</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/patients')} className="btn-secondary !text-xs !py-2">
              <Users className="w-3.5 h-3.5" />
              <span>Select Patient</span>
            </button>
            <button onClick={() => setSavedSuccess(true)} className="btn-primary !text-xs !py-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finalize & Sign EMR</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Patient Banner */}
      <div className="card p-4 bg-gradient-to-r from-blue-900 to-slate-900 text-white mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white font-bold text-lg">
              RS
            </div>
            <div>
              <h2 className="text-base font-bold">Rajesh Kumar Sharma · 58y / Male</h2>
              <p className="text-xs text-blue-200">UHID: ORTHO-HYD-2024-001 · Primary Consultant: Dr. Anand Krishnamurthy</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge bg-red-500/20 text-red-300 text-[10px] border border-red-500/30">⚠️ Allergy: Penicillin</span>
                <span className="badge bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">Blood: O Positive</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/patients/pat-1')} className="btn-secondary !bg-white/10 !text-white hover:!bg-white/20 !border-white/20 !text-xs !py-1.5 self-start">
            View Patient 360 &rarr;
          </button>
        </div>
      </div>

      {/* Consultation Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Examination & Joint ROM (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Joint Goniometer Visualizer */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-100 pb-3">
              <div className="flex items-center gap-2">
                <Bone className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-bold text-gray-900">Orthopedic Joint Range of Motion (ROM)</h3>
              </div>
              <div className="flex gap-1">
                {['Knee', 'Hip', 'Shoulder', 'Spine'].map(j => (
                  <button
                    key={j}
                    onClick={() => setSelectedJoint(j)}
                    className={cn(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-colors',
                      selectedJoint === j ? 'bg-primary-600 text-white' : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
                    )}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{selectedJoint} Flexion Angle:</span>
                  <span className="text-primary-700 font-bold text-sm">{romValue}° / 135°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="140"
                  value={romValue}
                  onChange={e => setRomValue(Number(e.target.value))}
                  className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0° (Full Extension)</span>
                  <span>90° (Functional Angle)</span>
                  <span>135° (Normal Active)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-surface-50 rounded-xl border border-surface-200">
                  <span className="text-[10px] text-gray-400 block">Joint Line Tenderness</span>
                  <span className="font-semibold text-gray-900">Severe Medial Joint Line (+)</span>
                </div>
                <div className="p-3 bg-surface-50 rounded-xl border border-surface-200">
                  <span className="text-[10px] text-gray-400 block">Ligamentous Stability</span>
                  <span className="font-semibold text-gray-900">Lachman (-), McMurray (+)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Findings & Treatment Plan */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Assessment & Treatment Pathway</h3>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Confirmed Clinical Diagnosis</label>
              <input
                type="text"
                defaultValue="Primary Osteoarthritis Right Knee (Kellgren-Lawrence Grade IV) with secondary Varus Deformity"
                className="input-base text-xs font-medium text-gray-900"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Recommended Surgical Procedure</label>
              <input
                type="text"
                defaultValue="Unilateral Total Knee Replacement (TKR) with Zimmer NexGen Cruciate Retaining (CR) Prosthesis"
                className="input-base text-xs font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Right Column: E-Prescription & Diagnostics Orders (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* E-Prescriptions */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-surface-100 pb-2">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Active E-Prescriptions (Rx)
              </h3>
              <button className="text-xs text-primary-600 font-semibold hover:underline">+ Add Medicine</button>
            </div>

            <div className="space-y-2">
              {[
                { drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', dose: '1-0-1 (After Food)', days: '5 Days', note: 'SOS for acute knee pain' },
                { drug: 'Cap Pantoprazole 40mg', dose: '1-0-0 (Before Food)', days: '5 Days', note: 'Gastroprotection' },
                { drug: 'Tab Calcium Carbonate 500mg + Calcitriol', dose: '0-1-0 (After Food)', days: '30 Days', note: 'Bone density support' },
                { drug: 'Joint Mobility Cryo-Pack Gel', dose: 'TDS Topical', days: '14 Days', note: 'Apply around knee joint' },
              ].map(rx => (
                <div key={rx.drug} className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-xs">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900">{rx.drug}</p>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">Rx</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">{rx.dose} · {rx.days}</p>
                  <p className="text-[10px] text-gray-400 italic mt-0.5">{rx.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Investigation Orders */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Required Pre-Op Investigations</h3>
            <div className="space-y-2">
              {[
                { test: 'Bilateral Knee Digital X-Ray (AP Standing & Lateral)', dept: 'Radiology', status: 'Completed (Reviewed)' },
                { test: 'Complete Blood Count (CBC) + ESR + CRP', dept: 'Pathology', status: 'Pending Collection' },
                { test: 'Pre-Anesthesia Cardiac Clearance (ECG + 2D Echo)', dept: 'Cardiology', status: 'Scheduled 14:00' },
              ].map(t => (
                <div key={t.test} className="p-2.5 bg-surface-50 rounded-xl border border-surface-200 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{t.test}</p>
                    <p className="text-[10px] text-gray-400">{t.dept}</p>
                  </div>
                  <span className="badge bg-blue-50 text-blue-700 text-[9px]">{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  DIAGNOSTICS & RADIOLOGY PACS CENTER
// ═══════════════════════════════════════════════════
export function DiagnosticsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isDicomOpen, setIsDicomOpen] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState('xr-knee-01');

  const openDicomScan = (studyId: string) => {
    setSelectedStudyId(studyId);
    setIsDicomOpen(true);
  };

  // Enriched records with raw radiograph links
  const diagnosticItems = [
    {
      id: 'diag-1',
      testName: 'Digital X-Ray Knee AP/Lateral Standing',
      patientName: 'Rajesh Kumar Sharma',
      uhid: 'PT-2024-00101',
      doctorName: 'Dr. Anand Krishnamurthy',
      type: 'xray',
      date: '2026-09-22',
      status: 'reviewed',
      findings: 'Severe medial joint space obliteration (<1.8mm), subchondral sclerosis',
      hasRawCopy: true,
      studyId: 'xr-knee-01',
      thumbnailUrl: '/images/xray-knee-standing.jpg',
      accession: 'XR-2024-8842',
    },
    {
      id: 'diag-2',
      testName: 'High-Res MRI Lumbar Spine (Sagittal T2 & Axial)',
      patientName: 'Sunita Devi',
      uhid: 'PT-2024-00108',
      doctorName: 'Dr. Lakshmi Narayana',
      type: 'mri',
      date: '2026-09-21',
      status: 'reviewed',
      findings: 'L4-L5 posterior disc herniation with severe central canal stenosis',
      hasRawCopy: true,
      studyId: 'mr-spine-02',
      thumbnailUrl: '/images/mri-lumbar-spine.jpg',
      accession: 'MR-2024-5119',
    },
    {
      id: 'diag-3',
      testName: 'Digital X-Ray Pelvis with Both Hips AP Standing',
      patientName: 'Lakshmi Sundaram',
      uhid: 'PT-2024-00102',
      doctorName: 'Dr. Lakshmi Narayana',
      type: 'xray',
      date: '2026-09-20',
      status: 'reviewed',
      findings: 'Right hip severe joint space loss, acetabular osteophytes & cyst',
      hasRawCopy: true,
      studyId: 'xr-pelvis-03',
      thumbnailUrl: '/images/xray-pelvis-hip.jpg',
      accession: 'XR-2024-3991',
    },
    {
      id: 'diag-4',
      testName: 'CT Scan Knee 3D Reconstruction',
      patientName: 'Mohammed Irfan',
      uhid: 'PT-2024-00115',
      doctorName: 'Dr. Rajesh Reddy',
      type: 'ct',
      date: '2026-09-20',
      status: 'in_progress',
      findings: 'Tibial plateau fracture alignment assessment',
      hasRawCopy: true,
      studyId: 'xr-knee-01',
      thumbnailUrl: '/images/xray-knee-standing.jpg',
      accession: 'CT-2024-1002',
    },
    {
      id: 'diag-5',
      testName: 'High-Resolution USG Right Shoulder',
      patientName: 'Kavitha Ramachandran',
      uhid: 'PT-2024-00102',
      doctorName: 'Dr. Anand Krishnamurthy',
      type: 'ultrasound',
      date: '2026-09-19',
      status: 'completed',
      findings: 'Full thickness tear of supraspinatus tendon (1.2 cm gap)',
      hasRawCopy: false,
    },
    {
      id: 'diag-6',
      testName: 'Glycated Hemoglobin (HbA1c) & Fasting Blood Sugar',
      patientName: 'Padmavathi Naidu',
      uhid: 'PT-2024-00122',
      doctorName: 'Dr. Suresh Babu',
      type: 'blood_test',
      date: '2026-09-19',
      status: 'completed',
      findings: 'HbA1c 7.4% · Pre-operative diabetic optimization required',
      hasRawCopy: false,
    },
    {
      id: 'diag-7',
      testName: 'Dual Energy X-Ray Absorptiometry (DEXA) Hip & Spine',
      patientName: 'Venkatesh Reddy',
      uhid: 'PT-2024-00130',
      doctorName: 'Dr. Meena Kumari',
      type: 'bone_density',
      date: '2026-09-18',
      status: 'reviewed',
      findings: 'T-score -2.8 (Severe Osteoporosis in Femoral Neck)',
      hasRawCopy: true,
      studyId: 'xr-pelvis-03',
      thumbnailUrl: '/images/xray-pelvis-hip.jpg',
      accession: 'DX-2024-7721',
    },
    {
      id: 'diag-8',
      testName: 'NCV / EMG Upper Limb Nerve Conduction',
      patientName: 'Srinivas Murthy',
      uhid: 'PT-2024-00145',
      doctorName: 'Dr. Lakshmi Narayana',
      type: 'emg',
      date: '2026-09-17',
      status: 'scheduled',
      findings: 'C6-C7 radiculopathy vs Carpal Tunnel Syndrome assessment',
      hasRawCopy: false,
    },
  ];

  const filteredItems = selectedType === 'all'
    ? diagnosticItems
    : diagnosticItems.filter(item => item.type === selectedType || (selectedType === 'scans' && (item.type === 'xray' || item.type === 'mri' || item.type === 'ct')));

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="page-title">Diagnostics & PACS Radiology</h1>
              <span className="badge bg-teal-50 text-teal-700 font-bold text-xs">DICOM Server Active</span>
            </div>
            <p className="page-subtitle">Interactive raw radiographs · MRI/CT slice lightbox · Pre-op investigation clearances</p>
          </div>
          <button className="btn-primary" onClick={() => openDicomScan('xr-knee-01')}>
            <Eye className="w-4 h-4" />
            Launch DICOM PACS Viewer
          </button>
        </div>
      </motion.div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Digital Scans Ready</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
          <p className="text-[10px] text-teal-600 mt-0.5">High-Res Raw Copies in PACS</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Pre-Op Clearances</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">18 / 20</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Cardiac PAC & CBC Verified</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Pending Radiologist Signoff</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">2</p>
          <p className="text-[10px] text-amber-500 mt-0.5">MRI Lumbar & Shoulder USG</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Avg Report Turnaround</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">22 min</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Direct to Doctor Cockpit</p>
        </div>
      </div>

      {/* Modality Filter Pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Diagnostics (50)' },
          { id: 'scans', label: '🩻 Raw Diagnostic Scans (X-Ray / MRI / CT)' },
          { id: 'xray', label: 'Digital X-Rays' },
          { id: 'mri', label: 'High-Res MRIs' },
          { id: 'blood_test', label: 'Blood & Pathology' },
          { id: 'bone_density', label: 'DEXA Bone Density' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedType(filter.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all',
              selectedType === filter.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white border border-surface-200 text-gray-600 hover:text-gray-900 hover:bg-surface-50'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Diagnostics List with Raw Radiograph Previews */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="table-cell table-header text-left">Test & Raw Scan</th>
                <th className="table-cell table-header text-left">Patient & UHID</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Doctor</th>
                <th className="table-cell table-header text-left">Clinical Findings</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Date</th>
                <th className="table-cell table-header text-center">Status</th>
                <th className="table-cell table-header text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(diag => (
                <tr key={diag.id} className="table-row hover:bg-surface-50/80 transition-colors">
                  {/* Test & Scan Thumbnail */}
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      {diag.hasRawCopy && diag.thumbnailUrl ? (
                        <div
                          onClick={() => openDicomScan(diag.studyId!)}
                          className="relative w-14 h-14 bg-black rounded-lg overflow-hidden border border-slate-700 shrink-0 cursor-pointer group shadow-sm hover:ring-2 hover:ring-teal-500 transition-all"
                          title="Click to open raw copy in full-res DICOM viewer"
                        >
                          <img
                            src={diag.thumbnailUrl}
                            alt={diag.testName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform filter contrast-125"
                          />
                          <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-4 h-4 text-white" />
                          </span>
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-surface-100 border border-surface-200 flex items-center justify-center text-gray-400 shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <p
                          onClick={() => diag.hasRawCopy && openDicomScan(diag.studyId!)}
                          className={cn(
                            'font-bold text-gray-900 text-xs',
                            diag.hasRawCopy ? 'cursor-pointer hover:text-teal-700 hover:underline' : ''
                          )}
                        >
                          {diag.testName}
                        </p>
                        {diag.accession && (
                          <span className="font-mono text-[10px] text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded mt-0.5 inline-block font-semibold">
                            {diag.accession}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="table-cell">
                    <p className="font-bold text-xs text-gray-900">{diag.patientName}</p>
                    <p className="text-[10px] font-mono text-gray-400">{diag.uhid}</p>
                  </td>

                  {/* Doctor */}
                  <td className="table-cell text-xs text-gray-600 hidden md:table-cell">
                    {diag.doctorName}
                  </td>

                  {/* Findings */}
                  <td className="table-cell text-xs text-gray-700 max-w-xs">
                    <p className="line-clamp-2">{diag.findings}</p>
                  </td>

                  {/* Date */}
                  <td className="table-cell text-xs text-gray-400 hidden md:table-cell font-mono">
                    {formatDate(diag.date)}
                  </td>

                  {/* Status */}
                  <td className="table-cell text-center">
                    <span className={cn(
                      'badge text-[10px] capitalize font-bold',
                      diag.status === 'reviewed' ? 'bg-emerald-100 text-emerald-800' :
                      diag.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      diag.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                      'bg-surface-100 text-gray-600'
                    )}>
                      {diag.status.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Action: Open DICOM / View */}
                  <td className="table-cell text-center">
                    {diag.hasRawCopy ? (
                      <button
                        onClick={() => openDicomScan(diag.studyId!)}
                        className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs !py-1 !px-2.5 shadow-2xs flex items-center gap-1 mx-auto font-semibold whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Raw Scan</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400">Standard Lab</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Res Lightbox DICOM Modal */}
      <DicomViewerModal
        isOpen={isDicomOpen}
        onClose={() => setIsDicomOpen(false)}
        initialStudyId={selectedStudyId}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  OT / THEATRE
// ═══════════════════════════════════════════════════
export function OTTheatrePage() {
  const todaySurgeries = mockSurgeries.slice(0, 6);
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header"><h1 className="page-title">OT / Theatre Management</h1><p className="page-subtitle">{mockOTs.length} operating theatres</p></div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {mockOTs.map(ot => {
          const currentSurgery = todaySurgeries.find(s => s.otId === ot.id);
          return (
            <div key={ot.id} className={cn('card p-5', !ot.isAvailable && 'ring-2 ring-amber-300')}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">{ot.name}</h3>
                <span className={cn('badge', ot.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                  {ot.isAvailable ? 'Available' : 'In Use'}
                </span>
              </div>
              {currentSurgery && !ot.isAvailable && (
                <div className="bg-amber-50 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-amber-800">{currentSurgery.procedure}</p>
                  <p className="text-[10px] text-amber-600">{currentSurgery.patientName} · {currentSurgery.doctorName}</p>
                  <p className="text-[10px] text-amber-500 mt-1">{currentSurgery.startTime && formatTime(currentSurgery.startTime)} · {currentSurgery.expectedDuration}min</p>
                </div>
              )}
              <div className="space-y-1 text-xs text-gray-400">
                <p>Equipment: {ot.equipment.join(', ')}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline placeholder */}
      <div className="card p-5">
        <h3 className="section-title mb-4">Today's Schedule</h3>
        <div className="space-y-2">
          {todaySurgeries.map(surg => (
            <div key={surg.id} className="flex items-center gap-4 py-2 border-b border-surface-100 last:border-0">
              <div className="w-16 text-center"><p className="text-xs font-bold text-gray-700">{surg.startTime && formatTime(surg.startTime)}</p></div>
              <div className={cn('w-2 h-8 rounded-full', surg.status === 'in_surgery' ? 'bg-amber-400 animate-pulse' : surg.status === 'discharged' || surg.status === 'recovery' || surg.status === 'follow_up' ? 'bg-emerald-400' : 'bg-blue-400')} />
              <div className="flex-1"><p className="text-xs font-medium text-gray-900">{surg.procedure}</p><p className="text-[10px] text-gray-400">{surg.patientName} · {surg.otName} · {surg.doctorName}</p></div>
              <span className="text-[10px] text-gray-400">{surg.expectedDuration}min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  PHYSIOTHERAPY & REHAB STATION (ARUN KUMAR PT)
// ═══════════════════════════════════════════════════
export function PhysiotherapyPage() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const [patientsProgress, setPatientsProgress] = useState([
    {
      id: 'pt-1',
      name: 'Rajesh Kumar Sharma',
      age: 58,
      gender: 'M',
      diagnosis: 'Left Total Knee Arthroplasty (POD 7)',
      targetJoint: 'Left Knee Flexion',
      therapist: 'Arun Kumar, BPT, MPT (Ortho)',
      sessionsCompleted: 5,
      totalSessions: 10,
      currentAngle: 88,
      targetAngle: 115,
      maxAngle: 135,
      trend: [
        { session: 'S1 (POD 1)', angle: 45, date: '15 Sep' },
        { session: 'S2 (POD 3)', angle: 60, date: '17 Sep' },
        { session: 'S3 (POD 5)', angle: 72, date: '19 Sep' },
        { session: 'S4 (POD 6)', angle: 80, date: '20 Sep' },
        { session: 'S5 (Today)', angle: 88, date: '22 Sep' },
      ],
      exercises: ['Active-Assisted Heel Slides', 'Straight Leg Raises (SLR)', 'Isometric Quads', 'Continuous Passive Motion (CPM)']
    },
    {
      id: 'pt-2',
      name: 'Lakshmi Sundaram',
      age: 62,
      gender: 'F',
      diagnosis: 'Right Hip Hemiarthroplasty (POD 3)',
      targetJoint: 'Right Hip Flexion',
      therapist: 'Arun Kumar, BPT, MPT (Ortho)',
      sessionsCompleted: 3,
      totalSessions: 12,
      currentAngle: 84,
      targetAngle: 110,
      maxAngle: 135,
      trend: [
        { session: 'S1 (POD 1)', angle: 40, date: '19 Sep' },
        { session: 'S2 (POD 2)', angle: 65, date: '20 Sep' },
        { session: 'S3 (Today)', angle: 84, date: '22 Sep' },
      ],
      exercises: ['Bed-Side Ankle Pumps', 'Assisted Walker Standing', 'Gluteal Sets', 'Terminal Knee Extension']
    },
    {
      id: 'pt-3',
      name: 'Venkat Rao',
      age: 45,
      gender: 'M',
      diagnosis: 'Right Knee Arthroscopic ACL Reconstruction (Week 3)',
      targetJoint: 'Right Knee Flexion',
      therapist: 'Arun Kumar, BPT, MPT (Ortho)',
      sessionsCompleted: 4,
      totalSessions: 12,
      currentAngle: 92,
      targetAngle: 125,
      maxAngle: 140,
      trend: [
        { session: 'S1 (Wk 1)', angle: 30, date: '04 Sep' },
        { session: 'S2 (Wk 2)', angle: 55, date: '11 Sep' },
        { session: 'S3 (Wk 2.5)', angle: 75, date: '16 Sep' },
        { session: 'S4 (Today)', angle: 92, date: '22 Sep' },
      ],
      exercises: ['Patellar Mobilization', 'Hamstring Curls (Band)', 'Prone Hang Extension', 'Balance Board Stance']
    },
  ]);

  const [referrals, setReferrals] = useState([
    { id: 'ref-1', patient: 'K. Subba Reddy (71M)', bed: 'Bed 104-ICU', proc: 'Revision Hip Arthroplasty (POD 0)', doctor: 'Dr. Anand Krishnamurthy', note: 'Commence gentle bedside chest physio & ankle toe movements', urgency: 'Immediate' },
    { id: 'ref-2', patient: 'Deepa Venkat (37F)', bed: 'Day Suite OT-2', proc: 'Arthroscopic Meniscal Repair', doctor: 'Dr. Lakshmi Narayana', note: 'Non-weight bearing crutch ambulation instruction', urgency: 'High' },
  ]);

  const [missedSessions, setMissedSessions] = useState([
    { id: 'ms-1', patient: 'Sunita Devi', phone: '+91 98765 01008', plan: 'L4-L5 Lumbar Decompression Rehab', missedDate: 'Yesterday 16:30 PM', note: 'Complained of travel inconvenience' },
    { id: 'ms-2', patient: 'Chandra Sekhar', phone: '+91 98765 01021', plan: 'Frozen Shoulder Manipulation Rehab', missedDate: '21 Sep 11:00 AM', note: 'Second missed session this week' },
  ]);

  const recordAngle = (patientId: string) => {
    setPatientsProgress(prev => prev.map(p => {
      if (p.id === patientId) {
        const newAngle = Math.min(p.maxAngle, p.currentAngle + 4);
        const nextSessionNum = p.trend.length + 1;
        return {
          ...p,
          currentAngle: newAngle,
          sessionsCompleted: p.sessionsCompleted + 1,
          trend: [...p.trend, { session: `S${nextSessionNum} (Now)`, angle: newAngle, date: 'Just now' }]
        };
      }
      return p;
    }));
    showToast(`📈 Goniometer angle recorded! ROM increased +4°`);
  };

  return (
    <div className="page-container">
      {/* Toast Feedback */}
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-gray-700"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between page-header gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="page-title">Physiotherapy & Rehabilitation Center</h1>
              <span className="badge bg-amber-100 text-amber-800 font-bold text-xs">Arun Kumar, BPT, MPT</span>
            </div>
            <p className="page-subtitle">Multi-session ROM goniometry progression · Inpatient bedside referrals · Recall automation</p>
          </div>
          <button className="btn-primary" onClick={() => showToast('✨ Created New Orthopedic Rehab Protocol')}>
            <Plus className="w-4 h-4" />
            New Rehab Protocol
          </button>
        </div>
      </motion.div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Today's Rehab Sessions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">14</p>
          <p className="text-[10px] text-teal-600 mt-0.5">8 Inpatient · 6 OPD Outpatients</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Avg ROM Improvement</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">+18.4°</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Week-over-week flexion gain</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">New Doctor Referrals</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{referrals.length}</p>
          <p className="text-[10px] text-blue-500 mt-0.5">Awaiting Bedside S1 Assessment</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-gray-500 font-medium">Missed Sessions (Recall)</p>
          <p className="text-2xl font-bold text-rose-600 mt-1">{missedSessions.length}</p>
          <p className="text-[10px] text-rose-500 mt-0.5">Follow-up WhatsApp reminders queued</p>
        </div>
      </div>

      {/* Main Section: Multi-Session Joint ROM Progression Trackers */}
      <div className="card p-5 space-y-4 mb-6">
        <div className="flex items-center justify-between border-b border-surface-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Joint Range of Motion (ROM) Multi-Session Progression Trend</h3>
            <p className="text-xs text-gray-400">Tracks angular recovery from Session 1 (POD 1) up to target discharge angle</p>
          </div>
          <span className="badge bg-emerald-50 text-emerald-700 text-xs font-bold">Live Goniometer Trend</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {patientsProgress.map(pt => (
            <div key={pt.id} className="p-4 rounded-xl border border-surface-200 bg-surface-50 space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{pt.name}</h4>
                    <p className="text-xs text-primary-700 font-semibold">{pt.diagnosis}</p>
                  </div>
                  <span className="badge bg-teal-100 text-teal-800 font-bold text-[10px]">
                    {pt.sessionsCompleted}/{pt.totalSessions} S.
                  </span>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-white border border-surface-200">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-gray-700">{pt.targetJoint}</span>
                    <span className="text-teal-700 text-sm">{pt.currentAngle}° / {pt.targetAngle}° Target</span>
                  </div>

                  {/* Visual Bar Chart of ROM Over Sessions */}
                  <div className="grid grid-cols-5 gap-1.5 mt-2">
                    {pt.trend.slice(-5).map((t, idx) => (
                      <div key={idx} className="text-center">
                        <div className="h-16 bg-surface-100 rounded-md p-1 flex flex-col justify-end items-center relative overflow-hidden">
                          <div
                            className="w-full bg-teal-500 rounded transition-all duration-300"
                            style={{ height: `${(t.angle / pt.maxAngle) * 100}%` }}
                          />
                          <span className="text-[9px] font-bold text-gray-800 mt-1">{t.angle}°</span>
                        </div>
                        <span className="text-[8px] text-gray-400 block mt-1 truncate">{t.session.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescribed Exercises */}
                <div className="mt-3 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Prescribed Rehab Movements:</span>
                  {pt.exercises.map(ex => (
                    <p key={ex} className="text-[11px] text-gray-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {ex}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-surface-200/80 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/patients/${pt.id}`)}
                  className="text-xs text-gray-500 hover:text-gray-800 font-semibold"
                >
                  View Profile &rarr;
                </button>
                <button
                  onClick={() => recordAngle(pt.id)}
                  className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs !py-1 !px-2.5 shadow-2xs"
                >
                  + Record Today's Angle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals & Missed Sessions 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* New Inpatient Referrals */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-surface-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900">New Inpatient Referrals Awaiting Assessment</h3>
              <p className="text-xs text-gray-400">Post-operative mobilization protocols assigned by surgical team</p>
            </div>
            <span className="badge bg-blue-100 text-blue-800 text-xs font-bold">{referrals.length} Orders</span>
          </div>

          <div className="space-y-2.5">
            {referrals.map(r => (
              <div key={r.id} className="p-3.5 rounded-xl border border-surface-200 bg-surface-50 text-xs space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-primary-700 text-xs">{r.bed}</span>
                    <h4 className="font-bold text-gray-900 text-sm mt-0.5">{r.patient}</h4>
                  </div>
                  <span className="badge bg-red-100 text-red-800 font-bold text-[10px]">{r.urgency}</span>
                </div>
                <p className="text-xs text-gray-700 font-medium">{r.proc} · {r.doctor}</p>
                <p className="text-[11px] text-gray-600 italic bg-white p-2 rounded border border-surface-200">
                  Instructions: {r.note}
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setReferrals(prev => prev.filter(x => x.id !== r.id));
                      showToast(`✅ Initiated Bedside Rehab for ${r.patient} at ${r.bed}`);
                    }}
                    className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs !py-1 !px-3 shadow-2xs"
                  >
                    Start Session 1 Bedside
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missed-Session Flags for Automatic WhatsApp Follow-Up */}
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-surface-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Missed Rehab Sessions (Auto-Recall Engine)
              </h3>
              <p className="text-xs text-gray-400">Proactively prevents joint stiffness and non-adherence</p>
            </div>
            <span className="badge bg-amber-100 text-amber-800 text-xs font-bold">Action Required</span>
          </div>

          <div className="space-y-2.5">
            {missedSessions.map(m => (
              <div key={m.id} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{m.patient}</h4>
                    <p className="text-xs text-gray-600">{m.plan}</p>
                  </div>
                  <span className="badge bg-amber-200 text-amber-900 font-bold text-[10px]">{m.missedDate}</span>
                </div>
                <p className="text-[11px] text-gray-500">Reason / Note: {m.note}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => showToast(`📲 WhatsApp recovery reminder dispatched to ${m.patient} (${m.phone})`)}
                    className="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-xs !py-1 !px-3 shadow-2xs flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Send WhatsApp Recall Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  COMMUNICATION CENTER
// ═══════════════════════════════════════════════════
export function CommunicationPage() {
  const channelIcons: Record<string, string> = { whatsapp: '💬', sms: '📱', email: '📧', voice: '📞', phone: '☎️' };
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between page-header">
          <div><h1 className="page-title">Communication Center</h1><p className="page-subtitle">{mockCommunications.length} messages sent</p></div>
          <button className="btn-primary"><Send className="w-4 h-4" />Send Message</button>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {['whatsapp', 'sms', 'email', 'voice', 'phone'].map(ch => (
          <div key={ch} className="card p-4 text-center">
            <span className="text-2xl">{channelIcons[ch]}</span>
            <p className="text-lg font-bold text-gray-900 mt-1">{mockCommunications.filter(c => c.channel === ch).length}</p>
            <p className="text-[10px] text-gray-400 capitalize">{ch}</p>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-surface-50 border-b border-surface-200">
            <th className="table-cell table-header text-left">Patient</th>
            <th className="table-cell table-header text-left">Channel</th>
            <th className="table-cell table-header text-left hidden md:table-cell">Template</th>
            <th className="table-cell table-header text-left hidden lg:table-cell">Message</th>
            <th className="table-cell table-header text-left">Status</th>
            <th className="table-cell table-header text-left hidden md:table-cell">Date</th>
          </tr></thead>
          <tbody>
            {mockCommunications.map(comm => (
              <tr key={comm.id} className="table-row">
                <td className="table-cell text-sm font-medium text-gray-900">{comm.patientName}</td>
                <td className="table-cell text-xs capitalize">{channelIcons[comm.channel]} {comm.channel}</td>
                <td className="table-cell text-xs text-gray-500 hidden md:table-cell">{comm.template}</td>
                <td className="table-cell text-xs text-gray-400 hidden lg:table-cell max-w-xs truncate">{comm.message}</td>
                <td className="table-cell"><span className={cn('badge text-[10px]', comm.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700')}>{comm.status}</span></td>
                <td className="table-cell text-xs text-gray-400 hidden md:table-cell">{formatDate(comm.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  AI ASSISTANT
// ═══════════════════════════════════════════════════
export function AIAssistantPage() {
  const [query, setQuery] = useState('');
  const insights = [
    { icon: AlertCircle, color: 'text-red-500 bg-red-50', title: '12 post-operative patients are overdue for follow-up', desc: 'Average delay: 5 days. Priority: High. Click to view list.', tag: 'AI Follow-Up Agent' },
    { icon: Dumbbell, color: 'text-amber-500 bg-amber-50', title: '3 patients missed physiotherapy this week', desc: 'Patients: Rajesh Kumar, Lakshmi Devi, Chandra Sekhar. Adherence rate: 72%.', tag: 'AI Recovery Monitor' },
    { icon: Package, color: 'text-purple-500 bg-purple-50', title: 'Implant stock for NexGen Medium may require replenishment', desc: 'Current stock: 0. Upcoming surgeries requiring this implant: 2 in next 7 days.', tag: 'AI Inventory Intelligence' },
    { icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50', title: 'Surgery volume up 15% this month', desc: 'Total knee replacements increased by 23%. OT utilization at peak on Wednesdays.', tag: 'AI Analytics' },
  ];

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div><h1 className="page-title">AI Command Center</h1><p className="page-subtitle">Intelligent operational insights and automation</p></div>
          </div>
        </div>
      </motion.div>

      {/* AI Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'AI Receptionist', icon: MonitorSmartphone, color: 'bg-blue-500' },
          { label: 'Follow-Up Agent', icon: CalendarDays, color: 'bg-rose-500' },
          { label: 'Patient Summary', icon: Users, color: 'bg-teal-500' },
          { label: 'Voice Booking', icon: Phone, color: 'bg-amber-500' },
          { label: 'Comm Assistant', icon: MessageSquare, color: 'bg-indigo-500' },
          { label: 'Insights Engine', icon: Brain, color: 'bg-purple-500' },
        ].map(cap => (
          <div key={cap.label} className="card p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className={cn('w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-white', cap.color)}>
              <cap.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-gray-700">{cap.label}</p>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="space-y-3 mb-6">
        <h3 className="section-title">Operational Insights</h3>
        {insights.map((insight, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="card-hover p-4 flex items-start gap-4 cursor-pointer">
            <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', insight.color)}>
              <insight.icon className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{insight.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{insight.desc}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge bg-violet-50 text-violet-600 text-[9px]"><Sparkles className="w-2.5 h-2.5" /> {insight.tag}</span>
                <span className="text-[9px] text-gray-400 italic">AI-generated insight</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Chat */}
      <div className="card">
        <div className="p-4 border-b border-surface-100">
          <h3 className="text-sm font-semibold text-gray-900">Ask AI Assistant</h3>
          <p className="text-[10px] text-gray-400">⚠️ AI-generated content — always verify before clinical decisions</p>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask about patients, operations, analytics..." className="input-base flex-1" />
            <button className="btn-primary"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  ANALYTICS
// ═══════════════════════════════════════════════════
const analyticsData = [
  { month: 'Apr', patients: 180, surgeries: 12, revenue: 82 },
  { month: 'May', patients: 210, surgeries: 15, revenue: 91 },
  { month: 'Jun', patients: 195, surgeries: 18, revenue: 105 },
  { month: 'Jul', patients: 230, surgeries: 14, revenue: 98 },
  { month: 'Aug', patients: 250, surgeries: 20, revenue: 112 },
  { month: 'Sep', patients: 268, surgeries: 22, revenue: 128 },
];

const pieData = [
  { name: 'Consultation', value: 35, color: '#818cf8' },
  { name: 'Surgery', value: 40, color: '#f59e0b' },
  { name: 'Diagnostics', value: 10, color: '#10b981' },
  { name: 'Physiotherapy', value: 8, color: '#ec4899' },
  { name: 'Others', value: 7, color: '#94a3b8' },
];

export function AnalyticsPage() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header"><h1 className="page-title">Analytics</h1><p className="page-subtitle">Hospital performance metrics and trends</p></div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Patient Volume & Surgery Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
                <Bar dataKey="patients" fill="#818cf8" radius={[4, 4, 0, 0]} name="Patients" />
                <Bar dataKey="surgeries" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Surgeries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map(d => (
              <span key={d.name} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />{d.name} {d.value}%
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Patient Volume', value: '268', trend: '+7.2%', up: true },
          { label: 'No-Show Rate', value: '4.2%', trend: '-1.1%', up: false },
          { label: 'Follow-Up Compliance', value: '78%', trend: '+3%', up: true },
          { label: 'OT Utilization', value: '72%', trend: '+5%', up: true },
        ].map(m => (
          <div key={m.label} className="card p-4">
            <p className="stat-label">{m.label}</p>
            <p className="stat-value mt-1">{m.value}</p>
            <p className={cn('text-xs font-medium mt-1', m.up ? 'text-emerald-600' : 'text-red-500')}>{m.trend}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  REPORTS
// ═══════════════════════════════════════════════════
export function ReportsPage() {
  const reports = [
    { title: 'Monthly Operations Report', desc: 'Patient volume, surgery stats, OT utilization', date: 'Sep 2024', status: 'Ready' },
    { title: 'Doctor Performance Report', desc: 'Consultation counts, surgery outcomes, patient ratings', date: 'Sep 2024', status: 'Ready' },
    { title: 'Financial Summary', desc: 'Revenue, collections, outstanding payments', date: 'Sep 2024', status: 'Ready' },
    { title: 'Follow-Up Compliance Report', desc: 'Compliance rates, missed follow-ups, outcomes', date: 'Sep 2024', status: 'Generating' },
    { title: 'Implant Usage Report', desc: 'Implant consumption, supplier analysis, cost trends', date: 'Sep 2024', status: 'Ready' },
    { title: 'Physiotherapy Outcomes', desc: 'Recovery rates, adherence, patient progress', date: 'Sep 2024', status: 'Ready' },
  ];
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header"><h1 className="page-title">Reports</h1><p className="page-subtitle">Operational and clinical reports</p></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <motion.div key={report.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-hover p-5 cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <FileBarChart className="w-8 h-8 text-primary-500 p-1.5 bg-primary-50 rounded-lg" />
              <span className={cn('badge text-[10px]', report.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{report.status}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mt-3">{report.title}</h4>
            <p className="text-xs text-gray-400 mt-1">{report.desc}</p>
            <p className="text-[10px] text-gray-300 mt-2">{report.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  FINANCE
// ═══════════════════════════════════════════════════
export function FinancePage() {
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header"><h1 className="page-title">Finance</h1><p className="page-subtitle">Revenue, billing, and payment management</p></div>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Monthly Revenue', value: formatCurrency(12850000), color: 'text-emerald-600' },
          { label: 'Collected', value: formatCurrency(11200000), color: 'text-blue-600' },
          { label: 'Pending', value: formatCurrency(1650000), color: 'text-amber-600' },
          { label: 'Overdue', value: formatCurrency(450000), color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="stat-label">{s.label}</p>
            <p className={cn('text-xl font-bold mt-1', s.color)}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-surface-50 border-b border-surface-200">
            <th className="table-cell table-header text-left">Invoice</th>
            <th className="table-cell table-header text-left">Patient</th>
            <th className="table-cell table-header text-right">Total</th>
            <th className="table-cell table-header text-right hidden md:table-cell">Paid</th>
            <th className="table-cell table-header text-right hidden md:table-cell">Balance</th>
            <th className="table-cell table-header text-left">Status</th>
          </tr></thead>
          <tbody>
            {mockInvoices.map(inv => (
              <tr key={inv.id} className="table-row">
                <td className="table-cell font-mono text-xs text-gray-700">{inv.invoiceNumber}</td>
                <td className="table-cell text-sm font-medium text-gray-900">{inv.patientName}</td>
                <td className="table-cell text-right text-sm font-medium text-gray-900">{formatCurrency(inv.total)}</td>
                <td className="table-cell text-right text-xs text-gray-600 hidden md:table-cell">{formatCurrency(inv.paid)}</td>
                <td className="table-cell text-right text-xs hidden md:table-cell"><span className={cn(inv.balance > 0 ? 'text-red-600 font-medium' : 'text-gray-400')}>{formatCurrency(inv.balance)}</span></td>
                <td className="table-cell"><span className={cn('badge text-[10px]',
                  inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                  inv.status === 'overdue' ? 'bg-red-100 text-red-700' :
                  inv.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                )}>{inv.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  INVENTORY
// ═══════════════════════════════════════════════════
export function InventoryPage() {
  const [items, setItems] = useState([
    { id: 'inv-1', name: 'Zimmer NexGen CR Femoral Component', cat: 'Joint Implants', stock: 1, min: 3, unit: 'pcs', cost: 185000, supplier: 'Zimmer Biomet India', urgency: 'critical' },
    { id: 'inv-2', name: 'Stryker Triathlon Tibial Baseplate Sz 4', cat: 'Joint Implants', stock: 2, min: 3, unit: 'pcs', cost: 95000, supplier: 'Stryker India', urgency: 'warning' },
    { id: 'inv-3', name: 'DePuy Synthes Distal Radius Volar Plate', cat: 'Trauma Fixation', stock: 1, min: 4, unit: 'pcs', cost: 28000, supplier: 'Johnson & Johnson MedTech', urgency: 'critical' },
    { id: 'inv-4', name: 'Titanium Pedicle Screws 6.5x45mm', cat: 'Spine Hardware', stock: 4, min: 10, unit: 'pcs', cost: 14500, supplier: 'Medtronic Spinal', urgency: 'warning' },
    { id: 'inv-5', name: 'Arthroscopic Shaver Blades 4.0mm', cat: 'Arthroscopy', stock: 3, min: 8, unit: 'boxes', cost: 18500, supplier: 'Smith & Nephew', urgency: 'warning' },
    { id: 'inv-6', name: 'Bone Cement with Gentamicin 40g', cat: 'Consumables', stock: 12, min: 6, unit: 'packs', cost: 8500, supplier: 'Heraeus Medical', urgency: 'optimal' },
    { id: 'inv-7', name: 'Ethicon Vicryl 1-0 Heavy Sutures', cat: 'Consumables', stock: 24, min: 10, unit: 'boxes', cost: 4200, supplier: 'Johnson & Johnson', urgency: 'optimal' },
    { id: 'inv-8', name: 'Smith & Nephew PEEK Suture Anchors', cat: 'Arthroscopy', stock: 2, min: 5, unit: 'pcs', cost: 22000, supplier: 'Smith & Nephew', urgency: 'warning' },
  ]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [toast, setToast] = useState<string | null>(null);

  const handleRestock = (id: string, name: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + 5, urgency: 'optimal' };
      }
      return item;
    }));
    setToast(`⚡ Reorder PO submitted for ${name} (+5 units)!`);
    setTimeout(() => setToast(null), 3000);
  };

  const categories = ['All', 'Joint Implants', 'Trauma Fixation', 'Spine Hardware', 'Arthroscopy', 'Consumables'];
  const filtered = selectedCat === 'All' ? items : items.filter(i => i.cat === selectedCat);

  const criticalCount = items.filter(i => i.urgency === 'critical').length;
  const warningCount = items.filter(i => i.urgency === 'warning').length;
  const optimalCount = items.filter(i => i.urgency === 'optimal').length;

  return (
    <div className="page-container">
      {toast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Surgical & Implant Inventory</h1>
            <p className="page-subtitle">Hospital consumable stocks · Prosthetics reorder pipeline · Supplier PO tracker</p>
          </div>
          <button className="btn-primary !text-xs !py-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Reorder PO</span>
          </button>
        </div>
      </motion.div>

      {/* Gamified Stock Health Radar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4 border-2 border-red-300 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold text-red-700 uppercase tracking-wide">🚨 Level 1 · Emergency Low</span>
            </div>
            <span className="badge bg-red-600 text-white text-[10px] font-bold">{criticalCount} Items Depleted</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Stock below critical OT emergency buffer (&le; 1 unit).</p>
          <div className="flex gap-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 rounded-full w-[25%]" />
          </div>
        </div>

        <div className="card p-4 border-2 border-amber-300 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">⚠️ Level 2 · Buffer Warning</span>
            </div>
            <span className="badge bg-amber-500 text-white text-[10px] font-bold">{warningCount} Below Threshold</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Replenish within 48 hours to avoid OT scheduling delays.</p>
          <div className="flex gap-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[50%]" />
          </div>
        </div>

        <div className="card p-4 border-2 border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">✅ Level 3 · Optimal Reserves</span>
            </div>
            <span className="badge bg-emerald-600 text-white text-[10px] font-bold">{optimalCount} In Safe Stock</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Consumables and surgical sutures fully stocked for 30 days.</p>
          <div className="flex gap-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              selectedCat === c ? 'bg-primary-600 text-white shadow-xs' : 'bg-white hover:bg-surface-50 text-gray-600 border border-surface-200'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-200">
                <th className="table-cell table-header text-left">Item Name</th>
                <th className="table-cell table-header text-left">Category</th>
                <th className="table-cell table-header text-left">Stock Level & Meter</th>
                <th className="table-cell table-header text-right">Unit Price</th>
                <th className="table-cell table-header text-left hidden md:table-cell">Supplier</th>
                <th className="table-cell table-header text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const isCrit = item.urgency === 'critical';
                const isWarn = item.urgency === 'warning';
                return (
                  <tr key={item.id} className={cn('table-row transition-colors', isCrit ? 'bg-red-50/40' : isWarn ? 'bg-amber-50/30' : '')}>
                    <td className="table-cell font-semibold text-xs text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-6 h-6 rounded-md flex items-center justify-center shrink-0',
                          isCrit ? 'bg-red-100 text-red-700' : isWarn ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        )}>
                          <Package className="w-3 h-3" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="table-cell text-xs text-gray-500">{item.cat}</td>
                    <td className="table-cell">
                      <div className="space-y-1 min-w-[130px]">
                        <div className="flex justify-between items-center">
                          <span className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs',
                            isCrit ? 'bg-red-600 text-white animate-pulse' :
                            isWarn ? 'bg-amber-500 text-white' :
                            'bg-emerald-100 text-emerald-800'
                          )}>
                            {isCrit && '🚨'}
                            {isWarn && '⚠️'}
                            {!isCrit && !isWarn && '✅'}
                            {item.stock} {item.unit}
                          </span>
                          <span className="text-[10px] text-gray-400">Min: {item.min}</span>
                        </div>
                        <div className="flex gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={cn('h-full flex-1 rounded-full', item.stock >= 1 ? (isCrit ? 'bg-red-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-200')} />
                          <div className={cn('h-full flex-1 rounded-full', item.stock >= item.min ? (isWarn ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-gray-200')} />
                          <div className={cn('h-full flex-1 rounded-full', item.stock > item.min ? 'bg-emerald-500' : 'bg-gray-200')} />
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-right text-xs font-semibold text-gray-800">{formatCurrency(item.cost)}</td>
                    <td className="table-cell text-xs text-gray-600 hidden md:table-cell">{item.supplier}</td>
                    <td className="table-cell text-center">
                      <button
                        onClick={() => handleRestock(item.id, item.name)}
                        className={cn(
                          'text-xs font-semibold px-2.5 py-1 rounded-lg transition-all shadow-2xs inline-flex items-center gap-1',
                          isCrit ? 'bg-red-600 hover:bg-red-700 text-white' :
                          isWarn ? 'bg-amber-600 hover:bg-amber-700 text-white' :
                          'bg-surface-100 hover:bg-surface-200 text-gray-700'
                        )}
                      >
                        <Zap className="w-3 h-3" />
                        Reorder +5
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  STAFF
// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════
//  STAFF & INPATIENT NURSING STATION
// ═══════════════════════════════════════════════════
export function StaffPage() {
  const [activeTab, setActiveTab] = useState<'ward_beds' | 'preop_checklist' | 'shift_handover'>('ward_beds');
  const [vitalsToast, setVitalsToast] = useState<string | null>(null);

  // Inpatient beds state
  const [beds, setBeds] = useState([
    { bed: 'Bed 101-A', patient: 'Rajesh Kumar Sharma', age: 58, gender: 'M', proc: 'Total Knee Replacement (L)', pod: 'POD 2', bp: '120/80', spo2: '98%', hr: 74, pain: 3, iv: 'NS 50ml/hr', drain: '30ml (Serous)', dressing: 'Dry & Intact', status: 'stable' },
    { bed: 'Bed 101-B', patient: 'Lakshmi Sundaram', age: 62, gender: 'F', proc: 'Hip Hemiarthroplasty (R)', pod: 'POD 1', bp: '138/88', spo2: '97%', hr: 84, pain: 5, iv: 'Cefuroxime IV', drain: '65ml (Hemo-serous)', dressing: 'Review Due', status: 'attention' },
    { bed: 'Bed 102-A', patient: 'Venkat Rao', age: 45, gender: 'M', proc: 'ACL Reconstruction (R)', pod: 'POD 1', bp: '118/76', spo2: '99%', hr: 68, pain: 2, iv: 'Saline Lock', drain: 'No drain', dressing: 'Clean Bandage', status: 'stable' },
    { bed: 'Bed 102-B', patient: 'Sunita Devi', age: 51, gender: 'F', proc: 'Lumbar Spine Decompression', pod: 'POD 3', bp: '124/82', spo2: '98%', hr: 76, pain: 2, iv: 'D/C Saline Lock', drain: 'Removed', dressing: 'Suture Inspection', status: 'ready_discharge' },
    { bed: 'Bed 103-A', patient: 'Mohammed Farooq', age: 39, gender: 'M', proc: 'Bimalleolar Ankle ORIF', pod: 'POD 1', bp: '128/80', spo2: '98%', hr: 80, pain: 4, iv: 'Active IV Analgesic', drain: 'No drain', dressing: 'Plaster Backslab', status: 'stable' },
    { bed: 'Bed 104-ICU', patient: 'K. Subba Reddy', age: 71, gender: 'M', proc: 'Revision Total Hip Arthroplasty', pod: 'POD 0', bp: '112/70', spo2: '96%', hr: 92, pain: 6, iv: 'Central Line + PCA', drain: '110ml (Active)', dressing: 'Pressure Dressing', status: 'critical' },
  ]);

  // Pre-op surgical checklist state
  const [preopCases, setPreopCases] = useState([
    { id: 'pre-1', patient: 'Rajesh Kumar Sharma', surgery: 'Total Knee Replacement', ot: 'OT 1 (14:30)', npo: true, pac: true, consent: true, blood: true, skin: true, surgeonSign: true },
    { id: 'pre-2', patient: 'Deepa Venkat', surgery: 'Knee Arthroscopy & Meniscectomy', ot: 'OT 2 (17:00)', npo: true, pac: true, consent: true, blood: false, skin: true, surgeonSign: false },
    { id: 'pre-3', patient: 'Harish Babu', surgery: 'Femur Intramedullary Nailing', ot: 'OT 3 (18:30)', npo: false, pac: true, consent: false, blood: true, skin: false, surgeonSign: false },
  ]);

  const toggleCheck = (caseId: string, field: 'npo' | 'pac' | 'consent' | 'blood' | 'skin' | 'surgeonSign') => {
    setPreopCases(prev => prev.map(c => c.id === caseId ? { ...c, [field]: !c[field] } : c));
  };

  const handleUpdateVitals = (bedNum: string, patientName: string) => {
    setBeds(prev => prev.map(b => {
      if (b.bed === bedNum) {
        return { ...b, bp: '120/80', hr: 72, spo2: '99%', pain: Math.max(1, b.pain - 1), status: 'stable' };
      }
      return b;
    }));
    setVitalsToast(`✅ New telemetry vitals logged for ${patientName} (${bedNum})`);
    setTimeout(() => setVitalsToast(null), 3000);
  };

  return (
    <div className="page-container">
      {vitalsToast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{vitalsToast}</span>
        </motion.div>
      )}

      {/* Header with Sub-tabs */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title">Staff & Nursing Ward Station</h1>
            <p className="page-subtitle">Inpatient bed telemetry · Pre-op surgical clearance checklist · Shift handover</p>
          </div>

          <div className="flex items-center p-1 bg-white border border-surface-200 rounded-xl shadow-xs self-start">
            <button
              onClick={() => setActiveTab('ward_beds')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'ward_beds' ? 'bg-pink-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900 hover:bg-surface-50'
              )}
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Inpatient Beds (6 Active)</span>
            </button>
            <button
              onClick={() => setActiveTab('preop_checklist')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'preop_checklist' ? 'bg-purple-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900 hover:bg-surface-50'
              )}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Pre-Op Clearance ({preopCases.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('shift_handover')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'shift_handover' ? 'bg-blue-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900 hover:bg-surface-50'
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Shift Handover</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══ TAB 1: INPATIENT TELEMETRY BEDS ═══ */}
      {activeTab === 'ward_beds' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beds.map(b => (
              <div
                key={b.bed}
                className={cn(
                  'card p-4.5 border-2 transition-all shadow-xs',
                  b.status === 'critical' ? 'border-red-300 bg-red-50/20' :
                  b.status === 'attention' ? 'border-amber-300 bg-amber-50/20' :
                  b.status === 'ready_discharge' ? 'border-emerald-300 bg-emerald-50/20' :
                  'border-surface-200 hover:border-primary-300'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-surface-100 text-gray-800">
                    {b.bed}
                  </span>
                  <span className={cn(
                    'badge text-[10px] font-bold',
                    b.status === 'critical' ? 'bg-red-500 text-white animate-pulse' :
                    b.status === 'attention' ? 'bg-amber-500 text-white' :
                    b.status === 'ready_discharge' ? 'bg-emerald-600 text-white' :
                    'bg-emerald-100 text-emerald-800'
                  )}>
                    {b.pod}
                  </span>
                </div>

                <p className="font-bold text-sm text-gray-900">{b.patient}</p>
                <p className="text-xs text-primary-700 font-medium mb-3">{b.proc}</p>

                {/* Telemetry Vitals Grid */}
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-white border border-surface-200 text-center mb-3">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-semibold">BP</span>
                    <span className="text-xs font-bold text-gray-800">{b.bp}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-semibold">SpO2</span>
                    <span className="text-xs font-bold text-emerald-600">{b.spo2}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-semibold">HR</span>
                    <span className="text-xs font-bold text-gray-800">{b.hr}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-semibold">Pain (1-10)</span>
                    <span className={cn('text-xs font-bold', b.pain >= 5 ? 'text-red-600' : 'text-amber-600')}>{b.pain}/10</span>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-gray-600 mb-3.5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">IV Line:</span>
                    <span className="font-medium text-gray-800">{b.iv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Drain Output:</span>
                    <span className="font-medium text-gray-800">{b.drain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dressing:</span>
                    <span className={cn('font-semibold', b.dressing.includes('Due') ? 'text-amber-700' : 'text-emerald-700')}>{b.dressing}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleUpdateVitals(b.bed, b.patient)}
                  className="w-full btn-secondary !text-xs !py-1.5 justify-center shadow-2xs"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-pink-600" />
                  <span>Log Live Vitals Check</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══ TAB 2: PRE-OP SURGICAL CHECKLIST ═══ */}
      {activeTab === 'preop_checklist' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
          <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Pre-Operative Readiness Verification Board</h3>
              <p className="text-xs text-gray-400">Verify mandatory surgical safety parameters prior to OT transfer</p>
            </div>
            <span className="badge bg-purple-100 text-purple-800 font-bold text-xs">WHO Surgical Checklist Standard</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-surface-200">
                  <th className="table-cell table-header text-left">Patient & Procedure</th>
                  <th className="table-cell table-header text-left">Target OT Slot</th>
                  <th className="table-cell table-header text-center">NPO Fasting (6h)</th>
                  <th className="table-cell table-header text-center">PAC Anesthesia</th>
                  <th className="table-cell table-header text-center">Informed Consent</th>
                  <th className="table-cell table-header text-center">Blood Reserved</th>
                  <th className="table-cell table-header text-center">Skin Prep Wash</th>
                  <th className="table-cell table-header text-center">Surgeon Signoff</th>
                  <th className="table-cell table-header text-center">Readiness Status</th>
                </tr>
              </thead>
              <tbody>
                {preopCases.map(c => {
                  const allDone = c.npo && c.pac && c.consent && c.blood && c.skin && c.surgeonSign;
                  return (
                    <tr key={c.id} className="table-row">
                      <td className="table-cell">
                        <p className="font-bold text-xs text-gray-900">{c.patient}</p>
                        <p className="text-[10px] text-primary-700">{c.surgery}</p>
                      </td>
                      <td className="table-cell text-xs font-bold text-gray-800">{c.ot}</td>

                      {/* Checkbox 1: NPO */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'npo')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.npo ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.npo ? '✓' : '—'}
                        </button>
                      </td>

                      {/* Checkbox 2: PAC */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'pac')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.pac ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.pac ? '✓' : '—'}
                        </button>
                      </td>

                      {/* Checkbox 3: Consent */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'consent')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.consent ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.consent ? '✓' : '—'}
                        </button>
                      </td>

                      {/* Checkbox 4: Blood */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'blood')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.blood ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.blood ? '✓' : '—'}
                        </button>
                      </td>

                      {/* Checkbox 5: Skin */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'skin')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.skin ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.skin ? '✓' : '—'}
                        </button>
                      </td>

                      {/* Checkbox 6: Signoff */}
                      <td className="table-cell text-center">
                        <button
                          onClick={() => toggleCheck(c.id, 'surgeonSign')}
                          className={cn('w-6 h-6 rounded-md inline-flex items-center justify-center text-xs font-bold transition-colors', c.surgeonSign ? 'bg-emerald-600 text-white' : 'bg-surface-200 text-gray-400')}
                        >
                          {c.surgeonSign ? '✓' : '—'}
                        </button>
                      </td>

                      <td className="table-cell text-center">
                        <span className={cn(
                          'badge text-[10px] font-bold px-2.5 py-1',
                          allDone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        )}>
                          {allDone ? '✅ OT Ready' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ═══ TAB 3: SHIFT HANDOVER & MEDICATION ROUNDS ═══ */}
      {activeTab === 'shift_handover' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Active Shift Staff */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Current Nursing & Ward Shift (07:00 - 15:00)</h3>
            <div className="space-y-2">
              {[
                { name: 'Nurse Ramya (RN, B.Sc Nursing)', role: 'Shift Lead / Ward Incharge', area: 'Ward 101-104', status: 'On Duty' },
                { name: 'Suresh OT Tech (DOTT)', role: 'Surgical Theatre Attendant', area: 'OT 1 & OT 2', status: 'In Prep' },
                { name: 'Arun Kumar PT (MPT Ortho)', role: 'Inpatient Rehab Physiotherapist', area: 'Post-Op Mobilization', status: 'In Round' },
                { name: 'Anand Kumar', role: 'Ward Orderly / Stretcher Support', area: 'All Floors', status: 'Available' },
              ].map(s => (
                <div key={s.name} className="p-3 bg-surface-50 rounded-xl border border-surface-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-[10px] text-gray-400">{s.role} · {s.area}</p>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-700 text-[10px] font-bold">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Medication Rounds */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">14:00 PM Ward Medication & IV Rounds</h3>
            <div className="space-y-2">
              {[
                { bed: 'Bed 101-A', patient: 'Rajesh Kumar Sharma', drug: 'Inj Cefuroxime 1.5g IV + Paracetamol 1g Infusion', status: 'Given (14:05)' },
                { bed: 'Bed 101-B', patient: 'Lakshmi Sundaram', drug: 'Inj Enoxaparin 40mg SC (Anticoagulant)', status: 'Due Now' },
                { bed: 'Bed 103-A', patient: 'Mohammed Farooq', drug: 'Tab Tramadol 50mg + Paracetamol 325mg', status: 'Due Now' },
                { bed: 'Bed 104-ICU', patient: 'K. Subba Reddy', drug: 'Inj Fentanyl Infusion PCA + IV Antibiotic', status: 'Continuous IV' },
              ].map(m => (
                <div key={m.bed} className="p-3 bg-surface-50 rounded-xl border border-surface-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary-700">{m.bed} · {m.patient}</span>
                    <p className="text-xs font-semibold text-gray-800">{m.drug}</p>
                  </div>
                  <span className={cn('badge text-[10px] font-bold', m.status.includes('Due') ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-emerald-100 text-emerald-800')}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════════════
export function SettingsPage() {
  const sections = [
    { title: 'Hospital Configuration', desc: 'Branch settings, departments, operating hours', icon: Settings },
    { title: 'Roles & Permissions', desc: 'User roles, access control, permission matrix', icon: Shield },
    { title: 'Notification Preferences', desc: 'Alert settings, channels, escalation rules', icon: MessageSquare },
    { title: 'Template Management', desc: 'Consultation, prescription, and communication templates', icon: FileBarChart },
    { title: 'Integration Settings', desc: 'API keys, third-party integrations, webhooks', icon: Zap },
    { title: 'Audit Configuration', desc: 'Audit log retention, compliance settings', icon: Clock },
  ];
  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header"><h1 className="page-title">Settings</h1><p className="page-subtitle">System configuration and preferences</p></div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, i) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card-hover p-5 cursor-pointer">
            <section.icon className="w-8 h-8 text-primary-500 p-1.5 bg-primary-50 rounded-lg mb-3" />
            <h4 className="text-sm font-semibold text-gray-900">{section.title}</h4>
            <p className="text-xs text-gray-400 mt-1">{section.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
