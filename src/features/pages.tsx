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
  Eye, Maximize2, ShieldAlert, Flame, ChevronRight, LayoutGrid,
  Download, Save, Filter, ArrowUpRight, Lock, BellRing, Server, HardDrive, FileSpreadsheet, Check, ExternalLink, ChevronLeft, HelpCircle, Building, X,
  PhoneCall, Mail, MessageCircle, CheckCheck, Star, SlidersHorizontal, ArrowDownRight, CreditCard, Receipt, Smartphone, ArrowRight, ShieldCheck
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
          <div className="lg:col-span-5 xl:col-span-4 card p-4 sm:p-5 space-y-4">
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
        <div className={cn(viewMode === 'split' ? 'lg:col-span-7 xl:col-span-8' : 'col-span-12', 'space-y-4')}>
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
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-surface-200 text-xs">
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-16 text-center">Token</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 min-w-[130px]">Patient & Joint</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-28">Doctor / Cabin</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-32">Pain & Red Flags</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-24">Billing</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 w-24 text-center">Status</th>
                    <th className="px-2.5 py-2.5 font-bold text-slate-700 min-w-[175px] text-right">Doctor & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 bg-white">
                  {tokens.map(t => {
                    const isSelected = selectedTokenForPreview?.token === t.token;
                    // Clean extraction of billing amount and mode
                    const amountMatch = t.billingAmount.match(/(₹[\d,]+(?:\.\d+L)?)/);
                    const billingAmountClean = amountMatch ? amountMatch[1] : t.billingAmount;
                    const modeMatch = t.billingAmount.match(/\(([^)]+)\)/);
                    const billingModeClean = modeMatch
                      ? modeMatch[1]
                      : t.billingStatus === 'paid' ? 'Paid' : t.billingStatus === 'tpa' ? 'TPA Cashless' : 'Pending';

                    return (
                      <tr
                        key={t.token}
                        onClick={() => setSelectedTokenForPreview(isSelected ? null : t)}
                        className={cn(
                          'transition-colors cursor-pointer group',
                          isSelected
                            ? 'bg-teal-50/90 border-l-4 border-teal-600 shadow-2xs'
                            : 'hover:bg-slate-50/80'
                        )}
                      >
                        <td className="px-2.5 py-2.5 align-middle text-center">
                          <span className={cn(
                            'inline-flex items-center justify-center font-mono font-bold text-xs px-2 py-0.5 rounded-md border tracking-wide min-w-[50px]',
                            isSelected ? 'bg-teal-700 text-white border-teal-700 shadow-2xs' : 'bg-slate-100 text-slate-800 border-slate-200'
                          )}>
                            {t.token}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5 align-middle">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors">
                              {t.patientName}
                            </span>
                            {t.isNewPatient ? (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                New
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded-full">
                                {t.pastVisitsCount}V
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-teal-700 font-semibold mt-0.5 truncate max-w-40">{t.primaryJoint}</p>
                        </td>
                        <td className="px-2.5 py-2.5 align-middle">
                          <span className="text-xs font-bold text-slate-800 block">{t.cabin}</span>
                          <span className="text-[11px] text-slate-500 font-medium truncate max-w-28 block">
                            {t.doctorAssigned.split(' ')[0]} {t.doctorAssigned.split(' ')[1]}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5 align-middle">
                          <span className={cn(
                            'inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded border',
                            t.painScore >= 8 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            t.painScore >= 5 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          )}>
                            VAS {t.painScore}/10
                          </span>
                          {t.criticalAlerts && t.criticalAlerts.length > 0 ? (
                            <span className="text-[10px] text-rose-600 block mt-0.5 truncate max-w-32 font-medium" title={t.criticalAlerts[0]}>
                              {t.criticalAlerts[0].replace('⚠️ ', '')}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 block mt-0.5 font-normal">None flagged</span>
                          )}
                        </td>
                        <td className="px-2.5 py-2.5 align-middle">
                          <div className="flex flex-col">
                            <span className="font-bold text-xs text-slate-900 tracking-tight">{billingAmountClean}</span>
                            <span className={cn(
                              'text-[9px] font-semibold px-1.5 py-0.2 rounded border w-fit mt-0.5 whitespace-nowrap',
                              t.billingStatus === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              t.billingStatus === 'tpa' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              'bg-amber-50 text-amber-700 border-amber-200'
                            )}>
                              {billingModeClean}
                            </span>
                          </div>
                        </td>
                        <td className="px-2.5 py-2.5 align-middle text-center">
                          <span className={cn(
                            'inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold border min-w-[70px]',
                            t.status === 'In Cabin' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs' :
                            t.status === 'Waiting' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            t.status === 'Arrived' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          )}>
                            {t.status === 'In Cabin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />}
                            {t.status}
                          </span>
                        </td>
                        <td className="px-2.5 py-2.5 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            {t.status === 'Waiting' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(t.token, 'In Cabin')}
                                className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10.5px] font-bold border border-emerald-200 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                                title="Call patient In Cabin"
                              >
                                Call In
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedTokenForPreview(isSelected ? null : t)}
                              className={cn(
                                'px-2 py-1 rounded-md text-[10.5px] font-bold border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-2xs',
                                isSelected
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                              )}
                              title="Preview OP Triage Brief right here"
                            >
                              <Eye className="w-3 h-3 text-slate-500" />
                              <span>{isSelected ? 'Close' : 'Brief'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate(`/doctors?token=${t.token}`)}
                              className="px-2 py-1 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-[10.5px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                              title="Open patient directly in Doctor Clinical Pad"
                            >
                              <Stethoscope className="w-3 h-3" />
                              <span>Doctor</span>
                            </button>
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

  // Goniometer Arc calculation (0 to 140 degrees)
  const maxAngle = 140;
  const percentage = Math.min(100, Math.max(0, (romValue / maxAngle) * 100));

  return (
    <div className="page-container space-y-5">
      {savedSuccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Clinical consultation notes & e-prescription finalized and signed!</span>
        </motion.div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="page-title text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Orthopedic Consultation & EMR Suite</h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full font-bold border border-teal-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Active Consultation Dossier
              </span>
            </div>
            <p className="page-subtitle text-xs sm:text-sm text-slate-500">
              Orthopedic physical examination · Digital Goniometer ROM · ICD-10 Coding · Digital Prescription & Pre-Op Clearance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/patients')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Patient</span>
            </button>
            <button
              type="button"
              onClick={() => setSavedSuccess(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Finalize & Sign EMR</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Clinical Patient Identity Dossier Banner */}
      <div className="card p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900">Rajesh Kumar Sharma</h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  58 yrs · Male
                </span>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  UHID: ORTHO-HYD-2024-001
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Primary Consultant: <strong className="text-slate-800 font-semibold">Dr. Anand Krishnamurthy, MS (Ortho), MCh</strong> · Joint Reconstruction OPD
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                  ⚠️ Penicillin Allergy (Severe Exanthema)
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  🩸 Blood Group: O Positive
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                  ❤️ Cardiac Stent (2021) · On Ecosprin
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  BMI: 30.5 (Obese Class I)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              type="button"
              onClick={() => navigate('/diagnostics')}
              className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              <span>Open PACS X-Ray</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/patients')}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Patient 360</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Examination & Pathway Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Physical Exam & Goniometer (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Digital Joint Goniometer Visualizer Card */}
          <div className="card p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bone className="w-4 h-4 text-teal-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Digital Joint Goniometer & Range of Motion (ROM)</h3>
                  <p className="text-[11px] text-slate-400">Clinical measurement of active & passive joint articulation</p>
                </div>
              </div>
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 self-start">
                {['Knee', 'Hip', 'Shoulder', 'Spine'].map(j => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setSelectedJoint(j)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                      selectedJoint === j ? 'bg-teal-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Goniometer Arc Gauge */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Radial Arc Visualizer */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    className="text-slate-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    className="text-teal-600 transition-all duration-300 ease-out"
                    strokeWidth="10"
                    strokeDasharray={301.59}
                    strokeDashoffset={301.59 - (301.59 * percentage) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black font-mono text-slate-900 tracking-tight">{romValue}°</span>
                  <span className="text-[10px] font-bold text-teal-700 uppercase">Flexion</span>
                  <span className="text-[9px] text-slate-400">Target 135°</span>
                </div>
              </div>

              {/* Angle Metrics & Clinical Interpretation */}
              <div className="flex-1 space-y-3 w-full">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{selectedJoint} Active Flexion Angle:</span>
                  <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {romValue}° / 135°
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="140"
                  value={romValue}
                  onChange={e => setRomValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0° (Full Ext)</span>
                  <span>45° (Mid Arc)</span>
                  <span>90° (Chair Seating)</span>
                  <span>135° (Normal)</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80 text-[11px]">
                  <span className="text-slate-500 font-medium">Flexion Deficit:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {Math.max(0, 135 - romValue)}° Limitation
                  </span>
                  <span className="text-slate-400 text-[10px]">· Loss of deep squatting capability</span>
                </div>
              </div>
            </div>

            {/* 4 Orthopedic Physical Examination Test Findings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Joint Line Palpation</span>
                <p className="font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 w-fit">
                  Medial Joint Line: Severe (+ + +)
                </p>
                <p className="text-[10px] text-slate-500">Lateral line tender: Mild (±) · No patellar facet grind</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Ligamentous Stability</span>
                <p className="font-bold text-slate-800">
                  Lachman: <strong className="text-emerald-700">Negative</strong> · McMurray: <strong className="text-rose-700">Positive (+)</strong>
                </p>
                <p className="text-[10px] text-slate-500">Anterior drawer stable · Medial meniscus click elicited</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Coronal Deformity</span>
                <p className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-fit">
                  8° Genu Varum (Bow-legged)
                </p>
                <p className="text-[10px] text-slate-500">Fixed flexion contracture: 5° · Compensatory gait noted</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Crepitus & Effusion</span>
                <p className="font-bold text-slate-800">
                  Coarse Crepitus <strong className="text-rose-700">(Grade III)</strong>
                </p>
                <p className="text-[10px] text-slate-500">Suprapatellar pouch effusion: Moderate (Grade 2 fluid tap)</p>
              </div>
            </div>
          </div>

          {/* Assessment & Surgical Treatment Pathway */}
          <div className="card p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-teal-600" />
                Assessment, ICD-10 Coding & Surgical Pathway
              </h3>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Surgical Candidate
              </span>
            </div>

            {/* Confirmed Diagnosis */}
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confirmed Clinical Diagnosis</span>
                <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.2 rounded">
                  ICD-10: M17.11
                </span>
              </div>
              <p className="font-bold text-sm text-slate-900">
                Primary Osteoarthritis Right Knee (Kellgren-Lawrence Grade IV) with secondary Varus Deformity
              </p>
              <p className="text-[11px] text-slate-500">
                Complete tricompartmental cartilage denudation with subchondral sclerosis and medial osteophytes
              </p>
            </div>

            {/* Recommended Procedure & Implant Spec */}
            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Recommended Surgical Pathway</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                  Elective · Within 14 Days
                </span>
              </div>
              <p className="font-bold text-sm text-teal-950">
                Right Total Knee Arthroplasty (TKR) with Zimmer NexGen® Cruciate Retaining (CR) Prosthesis
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-teal-800">
                <span>Approach: <strong>Medial Parapatellar</strong></span>
                <span>Femur: <strong>Size 4 CR</strong></span>
                <span>Tibia: <strong>10mm Insert</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: E-Prescription & Diagnostics Orders (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active E-Prescriptions Module */}
          <div className="card p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Digital E-Prescriptions (Rx)</h3>
              </div>
              <button
                type="button"
                className="text-xs text-teal-700 hover:text-teal-900 font-bold hover:underline cursor-pointer"
              >
                + Add Medicine
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  drug: 'Tab. Aceclofenac 100mg + Paracetamol 325mg',
                  category: 'NSAID / Analgesic',
                  schedule: '1 - 0 - 1',
                  timing: 'After Meals',
                  duration: '5 Days',
                  note: 'Take SOS for acute knee pain exacerbation'
                },
                {
                  drug: 'Cap. Pantoprazole 40mg',
                  category: 'Gastroprotective PPI',
                  schedule: '1 - 0 - 0',
                  timing: 'Before Breakfast',
                  duration: '5 Days',
                  note: 'Empty stomach 30m prior to food'
                },
                {
                  drug: 'Tab. Calcium Carbonate 500mg + Calcitriol',
                  category: 'Bone Mineral Supplement',
                  schedule: '0 - 1 - 0',
                  timing: 'After Lunch',
                  duration: '30 Days',
                  note: 'Bone density support & osteopenia management'
                },
                {
                  drug: 'Joint Mobility Cryo-Pack Gel (Topical)',
                  category: 'Topical Anti-Inflammatory',
                  schedule: 'TDS (3x / Day)',
                  timing: 'External Use',
                  duration: '14 Days',
                  note: 'Gently apply around knee joint, do not massage'
                },
              ].map(rx => (
                <div key={rx.drug} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs space-y-1.5 transition-all hover:border-slate-300">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-bold text-slate-900">{rx.drug}</p>
                      <span className="text-[10px] text-slate-400 font-medium">{rx.category}</span>
                    </div>
                    <span className="text-[10px] text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded font-bold shrink-0">
                      Rx
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="font-mono font-bold text-[11px] text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {rx.schedule}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {rx.timing}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {rx.duration}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 italic pt-0.5">{rx.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Pre-Op Diagnostic Clearances */}
          <div className="card p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-teal-600" />
                Required Pre-Op Investigations
              </h3>
              <span className="text-[10px] font-bold text-slate-500">PAC Protocol</span>
            </div>

            <div className="space-y-2">
              {[
                {
                  test: 'Bilateral Knee Digital X-Ray (AP Standing & Lateral)',
                  dept: 'Radiology / PACS',
                  status: 'Completed (Reviewed)',
                  badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                },
                {
                  test: 'Complete Blood Count (CBC) + ESR + CRP + Coagulation',
                  dept: 'Pathology Lab',
                  status: 'Sample Drawn · Pending',
                  badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
                },
                {
                  test: 'Pre-Anesthesia Cardiac Clearance (ECG + 2D Echo)',
                  dept: 'Cardiology Clinic',
                  status: 'Scheduled 14:00 Today',
                  badgeClass: 'bg-blue-50 text-blue-800 border-blue-200'
                },
              ].map(t => (
                <div key={t.test} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 text-xs flex justify-between items-center gap-2">
                  <div>
                    <p className="font-bold text-slate-900">{t.test}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t.dept}</p>
                  </div>
                  <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap shrink-0', t.badgeClass)}>
                    {t.status}
                  </span>
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
  const [viewMode, setViewMode] = useState<'by_theatre' | 'timeline'>('by_theatre');
  const [selectedOtFilter, setSelectedOtFilter] = useState<string>('all');

  // Realistic today surgeries across all 3 OTs (9 cases)
  const todaySurgeries = mockSurgeries.slice(0, 9).sort((a, b) => {
    return (a.startTime || '').localeCompare(b.startTime || '');
  });

  const filteredSurgeries = selectedOtFilter === 'all'
    ? todaySurgeries
    : todaySurgeries.filter(s => s.otId === selectedOtFilter);

  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="page-title text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Operating Theatre & Surgical Command
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live OT Status
              </span>
            </div>
            <p className="page-subtitle text-xs sm:text-sm text-slate-500">
              3 Ultra-Clean Laminar Flow Theatres · Turnaround management & implant reservation tracking
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('by_theatre')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                  viewMode === 'by_theatre' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>By Theatre</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                  viewMode === 'timeline' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                )}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Staggered Timeline</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3 Active Operating Suites Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {mockOTs.map(ot => {
          const otSurgeries = todaySurgeries.filter(s => s.otId === ot.id);
          const activeSurgery = otSurgeries.find(s => s.status === 'in_surgery') || otSurgeries[0];
          const isOccupied = !ot.isAvailable || (activeSurgery && activeSurgery.status === 'in_surgery');

          return (
            <div
              key={ot.id}
              className={cn(
                'card p-5 border transition-all',
                isOccupied ? 'border-amber-300/80 bg-amber-50/20 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ot.name}</h3>
                  <p className="text-[11px] text-slate-500">
                    {ot.id === 'ot-1' && 'Major Arthroplasty Suite'}
                    {ot.id === 'ot-2' && 'Arthroscopy & Sports Suite'}
                    {ot.id === 'ot-3' && 'Trauma & Spine Reconstruction'}
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border',
                    isOccupied
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full', isOccupied ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500')} />
                  {isOccupied ? 'Case In Progress' : 'Ready / Turnaround'}
                </span>
              </div>

              {activeSurgery && (
                <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs mb-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{activeSurgery.procedure}</p>
                      <p className="text-[11px] text-slate-600 font-medium">
                        {activeSurgery.patientName} · <span className="text-teal-700 font-semibold">{activeSurgery.doctorName}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {activeSurgery.startTime} – {activeSurgery.endTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Duration: <strong className="text-slate-700">{activeSurgery.expectedDuration} mins</strong></span>
                    <span>Anaesthesia: <strong className="text-slate-700">{activeSurgery.anaesthesiaType}</strong></span>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-600">Today's Cases:</span>
                  <span className="font-bold text-slate-800">{otSurgeries.length} scheduled</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  Equipment: {ot.equipment.join(' · ')}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule Board */}
      <div className="card p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Today's Surgical Schedule & Case Turnover</h3>
            <p className="text-xs text-slate-500">Chronologically staggered slots per operating theatre suite</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Filter OT:</span>
            {['all', 'ot-1', 'ot-2', 'ot-3'].map(otKey => (
              <button
                key={otKey}
                type="button"
                onClick={() => setSelectedOtFilter(otKey)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  selectedOtFilter === otKey
                    ? 'bg-teal-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {otKey === 'all' ? 'All Theatres' : otKey.toUpperCase().replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: By Theatre Lanes */}
        {viewMode === 'by_theatre' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {mockOTs
              .filter(ot => selectedOtFilter === 'all' || ot.id === selectedOtFilter)
              .map(ot => {
                const otCases = todaySurgeries.filter(s => s.otId === ot.id);
                return (
                  <div key={ot.id} className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{ot.name}</h4>
                        <span className="text-[11px] text-teal-700 font-semibold">{otCases.length} Cases Scheduled</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {ot.id.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      {otCases.map((surg, idx) => (
                        <div
                          key={surg.id}
                          className={cn(
                            'p-3.5 rounded-xl border bg-white shadow-2xs transition-all hover:border-teal-300 relative',
                            surg.status === 'in_surgery' ? 'border-amber-300 ring-1 ring-amber-300/50' : 'border-slate-200'
                          )}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              <Clock className="w-3 h-3 text-teal-600" />
                              {surg.startTime} – {surg.endTime}
                            </span>
                            <span
                              className={cn(
                                'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                                surg.status === 'in_surgery' ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' :
                                surg.status === 'recovery' || surg.status === 'discharged' || surg.status === 'follow_up' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                'bg-sky-50 text-sky-700 border-sky-200'
                              )}
                            >
                              {surg.status === 'in_surgery' ? 'In Surgery' :
                               surg.status === 'recovery' ? 'In Recovery' :
                               surg.status === 'discharged' ? 'Completed' : 'Pre-Op Ready'}
                            </span>
                          </div>

                          <h5 className="text-xs font-bold text-slate-900 mb-1">{surg.procedure}</h5>
                          <p className="text-[11px] text-slate-600 mb-2 font-medium">
                            {surg.patientName} · <span className="text-slate-800 font-semibold">{surg.doctorName}</span>
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                            <span>Duration: <strong className="text-slate-700">{surg.expectedDuration} mins</strong></span>
                            <span>Case #{idx + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* View Mode 2: Master Chronological Staggered Timeline */}
        {viewMode === 'timeline' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-surface-200 text-xs">
                  <th className="px-3.5 py-3 font-bold text-slate-700 w-36">Time Slot</th>
                  <th className="px-3.5 py-3 font-bold text-slate-700 w-28">Theatre</th>
                  <th className="px-3.5 py-3 font-bold text-slate-700 min-w-[200px]">Procedure & Patient</th>
                  <th className="px-3.5 py-3 font-bold text-slate-700 w-44">Lead Surgeon</th>
                  <th className="px-3.5 py-3 font-bold text-slate-700 w-28">Duration</th>
                  <th className="px-3.5 py-3 font-bold text-slate-700 w-32 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 bg-white text-xs">
                {filteredSurgeries.map(surg => (
                  <tr key={surg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-3.5 py-3 align-middle font-mono font-bold text-slate-800">
                      <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{surg.startTime} – {surg.endTime}</span>
                      </div>
                    </td>
                    <td className="px-3.5 py-3 align-middle">
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border',
                        surg.otId === 'ot-1' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                        surg.otId === 'ot-2' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                        'bg-purple-50 text-purple-800 border-purple-200'
                      )}>
                        {surg.otName}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 align-middle">
                      <p className="font-bold text-slate-900">{surg.procedure}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{surg.patientName} · {surg.diagnosis}</p>
                    </td>
                    <td className="px-3.5 py-3 align-middle font-medium text-slate-800">
                      {surg.doctorName}
                    </td>
                    <td className="px-3.5 py-3 align-middle text-slate-600 font-medium">
                      {surg.expectedDuration} mins
                    </td>
                    <td className="px-3.5 py-3 align-middle text-center">
                      <span
                        className={cn(
                          'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border min-w-[85px]',
                          surg.status === 'in_surgery' ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' :
                          surg.status === 'recovery' || surg.status === 'discharged' || surg.status === 'follow_up' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-sky-50 text-sky-700 border-sky-200'
                        )}
                      >
                        {surg.status === 'in_surgery' ? 'In Surgery' :
                         surg.status === 'recovery' ? 'In Recovery' :
                         surg.status === 'discharged' ? 'Completed' : 'Pre-Op Ready'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
//  COMMUNICATION CENTER (OMNICHANNEL PATIENT ENGAGEMENT)
// ═══════════════════════════════════════════════════
export function CommunicationPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState<{
    patientName: string;
    phone: string;
    uhid: string;
    channel: string;
    procedure: string;
    messages: { sender: 'patient' | 'hospital'; text: string; time: string; status?: string }[];
  } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newMessageModalOpen, setNewMessageModalOpen] = useState(false);
  const [sendSuccessToast, setSendSuccessToast] = useState('');

  // Rich clinical communications
  const [communicationsList, setCommunicationsList] = useState([
    {
      id: 'comm-1',
      patientName: 'Rajesh Kumar Sharma',
      uhid: 'UHID-2024-8842',
      phone: '+91 98450 12345',
      channel: 'whatsapp',
      category: 'post_op',
      template: 'Day 3 Post-TKR Flexion Protocol',
      message: 'Dear Rajesh-ji, Dr. Anand Krishnamurthy recommends continuing 30° to 90° passive continuous motion exercises today. Please remember to ice the knee for 15 mins after each session.',
      status: 'read',
      createdAt: '2026-09-22T09:30:00Z',
      procedure: 'Bilateral TKR (Zimmer NexGen CR)',
      conversation: [
        { sender: 'hospital' as const, text: 'Hello Rajesh-ji, this is RASA Ortho Care team. How is your right knee pain level this morning on a scale of 1 to 10?', time: '08:45 AM', status: 'read' },
        { sender: 'patient' as const, text: 'Namaste doctor, pain is around 3 now after taking morning medication. Able to walk to bathroom with walker.', time: '09:12 AM' },
        { sender: 'hospital' as const, text: 'Excellent progress! Please continue 30° to 90° passive continuous motion exercises today. Remember to ice the knee for 15 mins after each session.', time: '09:30 AM', status: 'read' },
      ]
    },
    {
      id: 'comm-2',
      patientName: 'Lakshmi Devi',
      uhid: 'UHID-2024-8843',
      phone: '+91 94401 55678',
      channel: 'whatsapp',
      category: 'pre_op',
      template: 'Surgical Fasting Protocol (NPO)',
      message: 'REMINDER: Your Total Hip Replacement surgery is scheduled for tomorrow at 08:30 AM in OT-2. Maintain strict fasting (no solids or liquids) starting tonight from 12:00 Midnight.',
      status: 'delivered',
      createdAt: '2026-09-22T08:15:00Z',
      procedure: 'Left Total Hip Replacement (DePuy Corail)',
      conversation: [
        { sender: 'hospital' as const, text: 'Dear Lakshmi Devi garu, your pre-anesthesia (PAC) clearance is complete. OT-2 is prepared for tomorrow 08:30 AM.', time: 'Yesterday 04:00 PM', status: 'read' },
        { sender: 'hospital' as const, text: 'REMINDER: Maintain strict fasting (no water, tea or solids) starting tonight from 12:00 Midnight.', time: '08:15 AM', status: 'delivered' },
      ]
    },
    {
      id: 'comm-3',
      patientName: 'Mohammed Irfan',
      uhid: 'UHID-2024-8844',
      phone: '+91 97000 88991',
      channel: 'sms',
      category: 'rehab',
      template: 'ACL Rehab Milestone Check',
      message: 'Day 14 Post-ACL Reconstruction: Please upload your knee flexion photo or report to Physiotherapist Arun Kumar for active extension verification.',
      status: 'delivered',
      createdAt: '2026-09-21T16:00:00Z',
      procedure: 'Arthroscopic ACL Reconstruction + Meniscal Repair',
      conversation: [
        { sender: 'hospital' as const, text: 'Day 14 Post-ACL Reconstruction: Please report to PT Arun Kumar at 11 AM tomorrow for suture inspection and brace adjustment.', time: 'Yesterday 04:00 PM', status: 'delivered' },
      ]
    },
    {
      id: 'comm-4',
      patientName: 'Padmavathi Naidu',
      uhid: 'UHID-2024-8845',
      phone: '+91 98888 12121',
      channel: 'voice',
      category: 'appointment',
      template: 'Automated IVR Consultation Confirmation',
      message: 'Voice Bot Call Completed (Duration 42s): Patient confirmed OP consultation with Dr. Anand Krishnamurthy at Banjara Hills Cabin 101 for 10:15 AM.',
      status: 'completed',
      createdAt: '2026-09-21T11:20:00Z',
      procedure: 'Grade III Knee Osteoarthritis Review',
      conversation: [
        { sender: 'hospital' as const, text: 'Automated IVR call triggered to +91 98888 12121. Patient pressed 1 to confirm OP appointment.', time: '11:20 AM', status: 'completed' },
      ]
    },
    {
      id: 'comm-5',
      patientName: 'Venkatesh Reddy',
      uhid: 'UHID-2024-8846',
      phone: '+91 96666 43210',
      channel: 'email',
      category: 'billing',
      template: 'TPA Cashless Pre-Auth Approval Packet',
      message: 'Star Health Insurance cashless pre-authorization approval letter of ₹2,10,000 for upcoming spine surgery attached with tax invoice estimate.',
      status: 'delivered',
      createdAt: '2026-09-20T14:45:00Z',
      procedure: 'L4-L5 Lumbar Microdiscectomy',
      conversation: [
        { sender: 'hospital' as const, text: 'Email sent with Star Health Pre-Auth Approval letter (Ref: SH-2024-7712). Hospital billing desk is available for queries.', time: '20 Sep 02:45 PM', status: 'delivered' },
      ]
    },
    {
      id: 'comm-6',
      patientName: 'Chandra Sekhar',
      uhid: 'UHID-2024-8847',
      phone: '+91 99123 45678',
      channel: 'whatsapp',
      category: 'rehab',
      template: 'Physio Missed Appointment Alert',
      message: 'Dear Chandra Sekhar garu, you missed your scheduled physiotherapy session today at 02:00 PM. Consistent knee mobilization is essential to prevent stiffness.',
      status: 'delivered',
      createdAt: '2026-09-20T15:30:00Z',
      procedure: 'Unilateral TKR (Stryker Triathlon)',
      conversation: [
        { sender: 'hospital' as const, text: 'You missed your scheduled physiotherapy session today at 02:00 PM. Please reschedule or do home knee extension exercises.', time: '20 Sep 03:30 PM', status: 'delivered' },
      ]
    },
  ]);

  const channelIcons: Record<string, any> = {
    whatsapp: MessageCircle,
    sms: Smartphone,
    email: Mail,
    voice: PhoneCall,
  };

  const channelColors: Record<string, string> = {
    whatsapp: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    sms: 'text-blue-700 bg-blue-50 border-blue-200',
    email: 'text-purple-700 bg-purple-50 border-purple-200',
    voice: 'text-amber-700 bg-amber-50 border-amber-200',
  };

  const filteredCommunications = communicationsList.filter(c => {
    const matchesChannel = selectedChannel === 'all' || c.channel === selectedChannel;
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesCategory && matchesSearch;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    const newMsg = {
      sender: 'hospital' as const,
      text: replyText.trim(),
      time: 'Just now',
      status: 'delivered',
    };

    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
    });

    setCommunicationsList(prev => prev.map(c => {
      if (c.patientName === activeChat.patientName) {
        return {
          ...c,
          conversation: [...(c.conversation || []), newMsg],
          message: replyText.trim(),
        };
      }
      return c;
    }));

    setReplyText('');
    setSendSuccessToast(`Message dispatched to ${activeChat.patientName}`);
    setTimeout(() => setSendSuccessToast(''), 3000);
  };

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title flex items-center gap-2.5">
              <span>Patient Communication Center</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold">
                Omnichannel Active
              </span>
            </h1>
            <p className="page-subtitle">
              Automated Pre-Op Fasting Protocols, WhatsApp Recovery Check-Ins & DLT SMS Gateways
            </p>
          </div>
          <button 
            onClick={() => setNewMessageModalOpen(true)}
            className="btn-primary !bg-teal-700 hover:!bg-teal-800 !text-white !font-bold !text-xs !py-2.5 !px-4 shadow-sm rounded-xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Patient Alert</span>
          </button>
        </div>
      </motion.div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { channel: 'whatsapp', label: 'WhatsApp Cloud API', active: '1,420 Sent', uptime: '99.8% Delivered', icon: MessageCircle, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
          { channel: 'sms', label: 'SMS Kaleyra (DLT)', active: '840 Sent', uptime: '100% Verified', icon: Smartphone, color: 'text-blue-700 bg-blue-50 border-blue-200' },
          { channel: 'voice', label: 'Voice IVR (Exotel)', active: '310 Calls', uptime: '94% Completed', icon: PhoneCall, color: 'text-amber-700 bg-amber-50 border-amber-200' },
          { channel: 'email', label: 'Hospital SMTP Mail', active: '480 Sent', uptime: '99.1% Inbox Rate', icon: Mail, color: 'text-purple-700 bg-purple-50 border-purple-200' },
        ].map((gw) => (
          <div 
            key={gw.channel} 
            onClick={() => setSelectedChannel(selectedChannel === gw.channel ? 'all' : gw.channel)}
            className={cn(
              'p-4 rounded-2xl border transition-all cursor-pointer text-left',
              selectedChannel === gw.channel 
                ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20' 
                : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
            )}
          >
            <div className="flex items-center justify-between">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', gw.color)}>
                <gw.icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {gw.active}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 mt-2.5">{gw.label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>{gw.uptime}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Messages' },
            { id: 'post_op', label: 'Post-Op Recovery' },
            { id: 'pre_op', label: 'Pre-Op Fasting' },
            { id: 'rehab', label: 'Rehab Adherence' },
            { id: 'appointment', label: 'OP Appointments' },
            { id: 'billing', label: 'Insurance & TPA' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
                selectedCategory === tab.id
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search patient, UHID, or text..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Toast */}
      {sendSuccessToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{sendSuccessToast}</span>
        </div>
      )}

      {/* Communications Table */}
      <div className="card overflow-hidden border border-slate-200/90 shadow-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/90 text-xs font-bold text-slate-600">
              <th className="py-3 px-4">Patient & UHID</th>
              <th className="py-3 px-3">Gateway</th>
              <th className="py-3 px-3 hidden md:table-cell">Protocol Template</th>
              <th className="py-3 px-3">Message Preview</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredCommunications.map((comm) => {
              const Icon = channelIcons[comm.channel] || MessageSquare;
              return (
                <tr 
                  key={comm.id} 
                  onClick={() => setActiveChat({
                    patientName: comm.patientName,
                    phone: comm.phone,
                    uhid: comm.uhid,
                    channel: comm.channel,
                    procedure: comm.procedure,
                    messages: comm.conversation || [
                      { sender: 'hospital', text: comm.message, time: '10:00 AM', status: 'delivered' }
                    ]
                  })}
                  className="hover:bg-teal-50/30 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{comm.patientName}</p>
                    <p className="text-[11px] font-mono text-slate-400">{comm.uhid} · {comm.phone}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase', channelColors[comm.channel])}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{comm.channel}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 hidden md:table-cell text-slate-600 font-medium">
                    <p className="truncate max-w-[180px]">{comm.template}</p>
                    <p className="text-[10px] text-teal-700 font-semibold">{comm.procedure}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 max-w-xs truncate">
                    {comm.message}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 capitalize',
                      comm.status === 'read' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      comm.status === 'delivered' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700'
                    )}>
                      {comm.status === 'read' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                      <span>{comm.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-colors cursor-pointer">
                      Open Chat
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interactive Chat Drawer Modal */}
      {activeChat && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-end">
          <div className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 text-left">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {getInitials(activeChat.patientName)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{activeChat.patientName}</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{activeChat.uhid} · {activeChat.phone}</p>
                  <p className="text-[10px] text-teal-700 font-semibold">{activeChat.procedure}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveChat(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Thread Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/60">
              <div className="text-center my-2">
                <span className="text-[10px] font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                  Encrypted Patient Communications Channel
                </span>
              </div>

              {activeChat.messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn('flex flex-col', m.sender === 'hospital' ? 'items-end' : 'items-start')}
                >
                  <div className={cn(
                    'p-3.5 rounded-2xl max-w-[85%] text-xs shadow-2xs space-y-1',
                    m.sender === 'hospital' 
                      ? 'bg-teal-700 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  )}>
                    <p className="leading-relaxed">{m.text}</p>
                    <div className={cn('flex items-center justify-end gap-1 text-[10px]', m.sender === 'hospital' ? 'text-teal-200' : 'text-slate-400')}>
                      <span>{m.time}</span>
                      {m.sender === 'hospital' && <CheckCheck className="w-3 h-3 text-teal-200" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Reply Input */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type clinical message or prescription advice..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 focus:bg-white transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold transition-all disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Messages sent via hospital verified WhatsApp Gateway (+91 80 4000 5000)
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Message Modal */}
      {newMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Broadcast Clinical Alert</h3>
              <button onClick={() => setNewMessageModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Patient Cohort</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                  <option>All Inpatient Joint Surgeries Tomorrow (Fasting Protocol)</option>
                  <option>Post-Op Day 3 Follow-Up Cohort</option>
                  <option>Physiotherapy Adherence Reminder</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Channel</label>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold">WhatsApp + SMS</span>
                  <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">IVR Voice Call</span>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Message Content</label>
                <textarea 
                  rows={3} 
                  defaultValue="Reminder: Please adhere to NPO fasting guidelines starting 12:00 Midnight. RASA Ortho Care team is prepared for your morning procedure."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setNewMessageModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setNewMessageModalOpen(false);
                  setSendSuccessToast('Broadcast delivered to 14 scheduled surgical patients.');
                  setTimeout(() => setSendSuccessToast(''), 3000);
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-sm hover:bg-teal-800"
              >
                Send Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  AI ASSISTANT (ORTHOPEDIC CLINICAL DECISION SUPPORT)
// ═══════════════════════════════════════════════════
export function AIAssistantPage() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeReport, setActiveReport] = useState<{
    queryTitle: string;
    summary: string;
    urgency: 'high' | 'medium' | 'low';
    dataItems: { name: string; detail: string; action: string }[];
    recommendations: string[];
  } | null>(null);

  const aiAgents = [
    { label: 'Pre-Op Risk Agent', icon: ShieldAlert, color: 'bg-rose-500', status: 'Online · Continuous', desc: 'ASA grade & anticoagulant clearance monitoring' },
    { label: 'Implant Forecaster', icon: Bone, color: 'bg-purple-500', status: 'Online · Auto-Replenish', desc: 'Predicts Zimmer/Stryker sizing from PACS scans' },
    { label: 'WOMAC & ROM Monitor', icon: Dumbbell, color: 'bg-teal-500', status: 'Online · 94% Adherence', desc: 'Knee flexion curve progression vs historical benchmark' },
    { label: 'OT Sterility Optimizer', icon: Flame, color: 'bg-amber-500', status: 'Online · Laminar Verified', desc: 'Laminar airflow changeovers & cabin turnaround times' },
    { label: 'TPA Pre-Auth Bot', icon: IndianRupee, color: 'bg-indigo-500', status: 'Online · IRDAI Code Valid', desc: 'Prepares cashless bundles with zero deduction flags' },
    { label: 'Bilingual Voice/SMS', icon: MessageSquare, color: 'bg-blue-500', status: 'Online · Telugu/English', desc: 'Translates recovery advice into regional dialects' },
  ];

  const operationalInsights = [
    {
      icon: AlertCircle,
      color: 'text-red-700 bg-red-50 border-red-200',
      title: '12 Post-Operative Patients Overdue for 6-Week Goniometry Review',
      desc: 'Mean delay: 5.4 days. 3 patients have recorded <85° flexion in app telemetry. Risk of arthrofibrosis requires immediate clinical check.',
      tag: 'AI Recovery Monitor',
      actionText: 'Trigger WhatsApp Suture/ROM Reminder',
    },
    {
      icon: Package,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      title: 'Implant Stock Alert: Zimmer NexGen CR Size 3 Femoral Component',
      desc: 'Current Central Stores Stock: 1 unit. Upcoming TKR surgeries scheduled for next 7 days requiring this size: 3 cases.',
      tag: 'AI Implant Intelligence',
      actionText: 'Raise Purchase Indent to Zimmer Biomet',
    },
    {
      icon: Dumbbell,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      title: '3 Patients Missed Inpatient Daycare Physiotherapy Sessions',
      desc: 'Patients: Rajesh Kumar (UHID-8842), Lakshmi Devi (UHID-8843), Chandra Sekhar (UHID-8847). Compliance rate dropped to 74%.',
      tag: 'AI Rehab Adherence',
      actionText: 'Assign PT Arun Kumar for Ward Visit',
    },
    {
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      title: 'OT Turnaround Time Improved by 18% Across Theatres 1-4',
      desc: 'Mean cabin changeover reduced from 34 minutes to 28 minutes. Instrument tray pre-sterilisation synchronization active.',
      tag: 'AI Operational Analytics',
      actionText: 'View Theatre Efficiency Breakdown',
    },
  ];

  const quickPrompts = [
    'Identify high-risk TKR patients scheduled this week',
    'Implant stock forecast for Zimmer NexGen vs OT list',
    'List patients overdue for 6-week goniometry review',
    'Analyze OT laminar airflow and turnaround times',
  ];

  const handleRunQuery = (q: string) => {
    setQuery(q);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (q.toLowerCase().includes('high-risk') || q.toLowerCase().includes('tkr')) {
        setActiveReport({
          queryTitle: 'Pre-Op Surgical Risk Stratification (Upcoming 7 Days)',
          summary: 'Scanned 14 scheduled arthroplasty patients. Identified 2 patients with critical anticoagulation clearance flags requiring cardiologist sign-off.',
          urgency: 'high',
          dataItems: [
            { name: 'Lakshmi Devi (62F)', detail: 'On Ecosprin 75mg · Last dose 2 days ago · Target: 5 days stop', action: 'Hold Aspirin & Reschedule OT to Friday' },
            { name: 'Srinivas Murthy (68M)', detail: 'HbA1c 8.4% · SSI risk elevated · Requires endocrinologist sliding scale', action: 'Initiate Pre-Op Glycemic Protocol' },
          ],
          recommendations: [
            'Obtain 2D-ECHO clearance for Lakshmi Devi prior to spinal anesthesia',
            'Verify cross-matched 2 units PRBC reservation in hospital blood bank',
            'Enforce Chlorhexidine antiseptic shower 12 hours pre-incision',
          ],
        });
      } else if (q.toLowerCase().includes('implant') || q.toLowerCase().includes('stock')) {
        setActiveReport({
          queryTitle: 'Prosthetic Implant Reserve vs Surgical Indent Forecast',
          summary: 'Matched upcoming surgical OT cases with GS1 barcoded inventory. 2 critical implants need emergency courier from regional warehouse.',
          urgency: 'medium',
          dataItems: [
            { name: 'Zimmer NexGen CR Size 3 Femoral', detail: 'Stock: 1 | Demand: 3 cases | Gap: -2 units', action: 'Expedite Zimmer Biomet India Indent' },
            { name: 'Stryker Triathlon Tibial Insert 11mm', detail: 'Stock: 0 | Demand: 1 case | Gap: -1 unit', action: 'Order from Stryker Hyderabad Hub' },
          ],
          recommendations: [
            'Confirm sterile tray arrival by 6:00 PM today for tomorrow morning OT-1',
            'Double-check trial sizer box completeness in autoclave room',
          ],
        });
      } else {
        setActiveReport({
          queryTitle: 'Orthopedic Follow-Up & Rehabilitation Compliance Audit',
          summary: 'Audited 42 post-op patients across Hyderabad and Nandyal campuses. Overall 6-week flexion compliance is at 88.2%.',
          urgency: 'low',
          dataItems: [
            { name: 'Rajesh Kumar Sharma', detail: 'Post-Op Day 3 · Flexion 75° · Walker gait active', action: 'Continue home cryotherapy protocol' },
            { name: 'Chandra Sekhar', detail: 'Post-Op Day 14 · Flexion 65° (lagging by 20°)', action: 'Schedule clinical evaluation for stiffness' },
          ],
          recommendations: [
            'Send automated bilingual Telugu/English flexion exercise video via WhatsApp',
            'Assign dedicated home PT visit for patients falling behind curve',
          ],
        });
      }
    }, 600);
  };

  return (
    <div className="page-container space-y-6 text-left">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md text-white border border-purple-400/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="page-title flex items-center gap-2">
                <span>AI Clinical Command Center</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono font-bold">
                  Clinical Intelligence Core
                </span>
              </h1>
              <p className="page-subtitle">Real-time surgical risk analysis, implant forecasting, and recovery monitoring</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6 AI Agents Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {aiAgents.map((ag) => (
          <div 
            key={ag.label} 
            onClick={() => handleRunQuery(`Run diagnostics for ${ag.label}`)}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white mb-2 shadow-xs', ag.color)}>
              <ag.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">{ag.label}</p>
            <p className="text-[10px] font-semibold text-emerald-600 mt-1">{ag.status}</p>
          </div>
        ))}
      </div>

      {/* AI Interactive Query Console */}
      <div className="card p-5 border border-purple-200/80 bg-gradient-to-br from-purple-50/40 via-white to-slate-50 shadow-sm space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              <span>Ask Orthopedic Intelligence Console</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">MODEL: ORTHO-CLINICAL-V2.4</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Query patients, surgical schedules, implant availability, or clinical recovery trajectories.
          </p>
        </div>

        {/* Quick Prompt Pills */}
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleRunQuery(p)}
              className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-purple-900 hover:bg-purple-50 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>{p}</span>
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRunQuery(query)}
            placeholder="e.g. Which patients have delayed knee flexion at 6-week review?"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 shadow-2xs font-mono"
          />
          <button
            onClick={() => handleRunQuery(query || quickPrompts[0])}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Execute Query</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated AI Clinical Report (when query is run) */}
      {activeReport && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white border-2 border-purple-400/40 shadow-lg space-y-4"
        >
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <span className={cn(
                'px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider',
                activeReport.urgency === 'high' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                activeReport.urgency === 'medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-emerald-50 text-emerald-700 border border-emerald-200'
              )}>
                {activeReport.urgency.toUpperCase()} PRIORITY AUDIT
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">{activeReport.queryTitle}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{activeReport.summary}</p>
            </div>
            <button 
              onClick={() => setActiveReport(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Data Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Identified Clinical Records</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeReport.dataItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-slate-600 text-[11px]">{item.detail}</p>
                  <button className="mt-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold hover:bg-purple-100 transition-colors">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1.5 text-xs">
            <h4 className="font-bold text-purple-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>Recommended Clinical Protocol Actions</span>
            </h4>
            <ul className="space-y-1 text-slate-700 text-[11px] list-disc list-inside">
              {activeReport.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Operational Insights Feed */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live Orthopedic Operational Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {operationalInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border', insight.color)}>
                  <insight.icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{insight.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  {insight.tag}
                </span>
                <button 
                  onClick={() => handleRunQuery(insight.title)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{insight.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  ANALYTICS (CLINICAL & SURGICAL PERFORMANCE)
// ═══════════════════════════════════════════════════
export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<string>('Sep 2024');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');

  const surgicalTrajectoryData = [
    { month: 'Apr', totalSurgeries: 112, jointReplacements: 48, arthroscopies: 28, traumaCases: 24, spineCases: 12, revenueLakhs: 82 },
    { month: 'May', totalSurgeries: 125, jointReplacements: 54, arthroscopies: 32, traumaCases: 25, spineCases: 14, revenueLakhs: 91 },
    { month: 'Jun', totalSurgeries: 118, jointReplacements: 50, arthroscopies: 30, traumaCases: 22, spineCases: 16, revenueLakhs: 105 },
    { month: 'Jul', totalSurgeries: 132, jointReplacements: 58, arthroscopies: 34, traumaCases: 26, spineCases: 14, revenueLakhs: 98 },
    { month: 'Aug', totalSurgeries: 138, jointReplacements: 62, arthroscopies: 36, traumaCases: 24, spineCases: 16, revenueLakhs: 112 },
    { month: 'Sep', totalSurgeries: 142, jointReplacements: 66, arthroscopies: 38, traumaCases: 22, spineCases: 16, revenueLakhs: 128 },
  ];

  const specialtyRevenueData = [
    { name: 'Joint Arthroplasty (TKR/THR)', value: 42, color: '#0f766e', amount: '₹53.9 Lakhs' },
    { name: 'Arthroscopy & Sports Med', value: 24, color: '#0284c7', amount: '₹30.8 Lakhs' },
    { name: 'Spine & Deformity', value: 16, color: '#7c3aed', amount: '₹20.5 Lakhs' },
    { name: 'Complex Trauma & Ilizarov', value: 12, color: '#d97706', amount: '₹15.4 Lakhs' },
    { name: 'OPD, Daycare & Diagnostics', value: 6, color: '#64748b', amount: '₹7.9 Lakhs' },
  ];

  const implantBrandShare = [
    { brand: 'Zimmer Biomet (NexGen/Persona)', share: 48, units: 68, color: '#0f766e' },
    { brand: 'Stryker (Triathlon/Accolade)', share: 26, units: 37, color: '#0284c7' },
    { brand: 'DePuy Synthes (Attune/Corail)', share: 18, units: 25, color: '#8b5cf6' },
    { brand: 'Smith & Nephew (Journey II)', share: 8, units: 12, color: '#f59e0b' },
  ];

  const flexionRecoveryCurve = [
    { milestone: 'Pre-Op', meanFlexion: 62, targetFlexion: 60 },
    { milestone: 'Day 2', meanFlexion: 78, targetFlexion: 75 },
    { milestone: 'Day 7', meanFlexion: 94, targetFlexion: 90 },
    { milestone: 'Week 2', meanFlexion: 106, targetFlexion: 100 },
    { milestone: 'Week 6', meanFlexion: 122, targetFlexion: 115 },
    { milestone: 'Month 3', meanFlexion: 130, targetFlexion: 125 },
  ];

  const surgeonLeaderboard = [
    { name: 'Dr. Anand Krishnamurthy', role: 'Chief of Arthroplasty', surgeries: 48, avgOTTime: '49 min', ssiRate: '0.00%', satisfaction: 4.9, activeCases: 'TKR, THR, Unicondylar' },
    { name: 'Dr. Lakshmi Narayana', role: 'Spine & OT Lead', surgeries: 36, avgOTTime: '78 min', ssiRate: '0.00%', satisfaction: 4.9, activeCases: 'Microdiscectomy, TLIF, Cervical' },
    { name: 'Dr. Suresh Babu', role: 'Trauma & Extremities', surgeries: 32, avgOTTime: '62 min', ssiRate: '0.00%', satisfaction: 4.8, activeCases: 'Intramedullary Nailing, Ilizarov' },
    { name: 'Dr. Karthik Narayan', role: 'Sports Med & Arthroscopy', surgeries: 26, avgOTTime: '44 min', ssiRate: '0.00%', satisfaction: 4.9, activeCases: 'ACL Reconstruction, Rotator Cuff' },
  ];

  return (
    <div className="page-container space-y-6 text-left">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title flex items-center gap-2.5">
              <span>Hospital Analytics & Clinical Intelligence</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                NABH Benchmark
              </span>
            </h1>
            <p className="page-subtitle">Surgical volume trajectories, clinical flexion outcomes, and revenue distribution</p>
          </div>

          {/* Time & Specialty Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={timeframe}
              onChange={e => setTimeframe(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs focus:outline-hidden"
            >
              <option>Sep 2024</option>
              <option>Q2 FY24</option>
              <option>Year to Date (YTD)</option>
            </select>
            <select
              value={specialtyFilter}
              onChange={e => setSpecialtyFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs focus:outline-hidden"
            >
              <option value="all">All Specialties</option>
              <option value="arthroplasty">Arthroplasty (TKR/THR)</option>
              <option value="spine">Spine Surgery</option>
              <option value="sports">Arthroscopy & Sports</option>
              <option value="trauma">Trauma & Fractures</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Surgeries', value: '142', trend: '+18.4% MoM', desc: '94% OT Capacity Utilization', up: true, color: 'text-teal-700' },
          { label: 'Mean Inpatient LOS', value: '2.4 Days', trend: '-0.7d vs Benchmark', desc: 'Target: <3.0 Days', up: true, color: 'text-blue-700' },
          { label: 'SSI Infection Rate', value: '0.00%', trend: 'Zero Sepsis Cases', desc: 'Across 450+ Consecutive Surgeries', up: true, color: 'text-emerald-700' },
          { label: 'Mean Flexion Gain', value: '+38.4°', trend: '122° at W6', desc: 'WOMAC Score Improved 58 → 18', up: true, color: 'text-purple-700' },
        ].map((kpi, i) => (
          <div key={i} className="card p-4 text-left border border-slate-200/90 shadow-2xs">
            <p className="stat-label text-slate-500">{kpi.label}</p>
            <p className={cn('text-2xl font-black mt-1', kpi.color)}>{kpi.value}</p>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{kpi.trend}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1: Surgical Trajectory & Revenue Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Trajectory */}
        <div className="card p-5 lg:col-span-7 border border-slate-200/90 shadow-2xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Surgical Procedure Trajectory by Specialty</h3>
              <p className="text-xs text-slate-400">Monthly case volume breakdown across 4 hospital campuses</p>
            </div>
            <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              142 Surgeries (Sep)
            </span>
          </div>

          <div className="h-68">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={surgicalTrajectoryData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 11, padding: 10 }} 
                />
                <Bar dataKey="jointReplacements" name="Joint Replacement (TKR/THR)" fill="#0f766e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="arthroscopies" name="Arthroscopy & Sports" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="traumaCases" name="Trauma Fixations" fill="#d97706" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spineCases" name="Spine & Deformity" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600 justify-center">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0f766e]" /> Joint Arthroplasty</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" /> Arthroscopy</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" /> Trauma</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" /> Spine</span>
          </div>
        </div>

        {/* Revenue Distribution Donut */}
        <div className="card p-5 lg:col-span-5 border border-slate-200/90 shadow-2xs text-left flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Revenue Contribution by Clinical Vertical</h3>
            <p className="text-xs text-slate-400">Total Billed: ₹1,28,50,000 for Sep 2024</p>
          </div>

          <div className="h-56 relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={specialtyRevenueData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={65} 
                  outerRadius={95} 
                  paddingAngle={3} 
                  dataKey="value"
                >
                  {specialtyRevenueData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 11 }} 
                  formatter={(val: any, name: any) => [`${val}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-slate-900">₹1.28 Cr</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Revenue</span>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs">
            {specialtyRevenueData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="truncate max-w-[190px]">{d.name}</span>
                </span>
                <span className="font-mono font-bold text-slate-900">{d.amount} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2: Implant Brands & Post-Op Recovery Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Implant Brands */}
        <div className="card p-5 lg:col-span-6 border border-slate-200/90 shadow-2xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Implant Brand Consumption & Market Share</h3>
              <p className="text-xs text-slate-400">142 Total Prosthetic Sets Implantation Audit</p>
            </div>
            <Bone className="w-4 h-4 text-teal-600" />
          </div>

          <div className="space-y-3 pt-2">
            {implantBrandShare.map(b => (
              <div key={b.brand} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{b.brand}</span>
                  <span className="font-mono text-slate-600">{b.units} units ({b.share}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${b.share}%`, backgroundColor: b.color }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-center justify-between">
            <span>GS1 Barcode Traceability Compliance:</span>
            <strong className="font-mono font-black text-emerald-800">100% Verified</strong>
          </div>
        </div>

        {/* Knee Flexion Recovery Curve */}
        <div className="card p-5 lg:col-span-6 border border-slate-200/90 shadow-2xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Post-Op Knee Flexion Recovery Curve (TKR)</h3>
              <p className="text-xs text-slate-400">Actual patient flexion vs national clinical standard</p>
            </div>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flexionRecoveryCurve}>
                <XAxis dataKey="milestone" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis unit="°" domain={[40, 140]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 11 }} />
                <Area type="monotone" dataKey="meanFlexion" name="RASA Mean ROM" stroke="#0f766e" fill="#ccfbf1" strokeWidth={2.5} />
                <Area type="monotone" dataKey="targetFlexion" name="Clinical Target" stroke="#94a3b8" fill="transparent" strokeDasharray="3 3" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">Outcome: Patients exceed national ROM targets by an avg of +7.0°</span>
            <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              KSS Score: 92/100
            </span>
          </div>
        </div>
      </div>

      {/* Surgeon Performance Leaderboard */}
      <div className="card p-5 border border-slate-200/90 shadow-2xs text-left space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Lead Surgeon Performance & Case Volume Leaderboard</h3>
          <p className="text-xs text-slate-400">Monthly audit of operative duration, complications, and patient satisfaction ratings</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                <th className="py-2.5 px-3">Surgeon & Specialization</th>
                <th className="py-2.5 px-3">Cases (Sep)</th>
                <th className="py-2.5 px-3">Avg OT Duration</th>
                <th className="py-2.5 px-3">SSI Complications</th>
                <th className="py-2.5 px-3">Patient Rating</th>
                <th className="py-2.5 px-3">Active Procedures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {surgeonLeaderboard.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-[11px] text-teal-700 font-semibold">{s.role}</p>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{s.surgeries} surgeries</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{s.avgOTTime}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {s.ssiRate} Zero
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{s.satisfaction} / 5.0</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-medium">{s.activeCases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  REPORTS
// ═══════════════════════════════════════════════════
export function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Sep 2024');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<{
    id: string;
    title: string;
    category: string;
    desc: string;
    date: string;
    status: 'Ready' | 'Generating';
    kpis: { label: string; value: string; change: string; positive: boolean }[];
    tableHeaders: string[];
    tableRows: (string | number)[][];
    signoff: string;
  } | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const reportData = [
    {
      id: 'RPT-OPS-2024-09',
      title: 'Monthly Operations & OT Utilization Report',
      category: 'Clinical & OT',
      desc: 'Surgical caseload volume, elective vs emergency breakdown, OT occupancy and room turnover intervals',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: 'Total Surgeries Performed', value: '142 Cases', change: '+12.5% vs Aug', positive: true },
        { label: 'OT Room Utilization', value: '91.4%', change: 'Target: >85%', positive: true },
        { label: 'Mean Room Turnover', value: '18.4 mins', change: '-3.2 mins faster', positive: true },
        { label: 'Surgical Site Infection (SSI)', value: '0.00%', change: 'Zero SSI Achieved', positive: true },
      ],
      tableHeaders: ['Operation Theatre', 'Primary Surgeon', 'Procedures Done', 'Mean Duration', 'Occupancy Rate', 'Sterility Audit'],
      tableRows: [
        ['OT-1 (Laminar Flow)', 'Dr. Anand Krishnamurthy', '58 Cases (TKR/THR)', '84 mins', '94.2%', 'Class 100 Passed'],
        ['OT-2 (Robotic Suite)', 'Dr. Rajesh Rao', '42 Cases (Robotic TKR)', '96 mins', '89.5%', 'Class 100 Passed'],
        ['OT-3 (Spine & Trauma)', 'Dr. Lakshmi Narasimhan', '28 Cases (Spine/PFN)', '112 mins', '91.0%', 'Class 100 Passed'],
        ['OT-4 (Daycare Arthroscopy)', 'Dr. Arun Varma', '14 Cases (ACL/Meniscus)', '45 mins', '88.6%', 'Class 100 Passed'],
      ],
      signoff: 'Dr. Anand Krishnamurthy, MS (Ortho), MCh — Chief of Orthopedics & OT Director',
    },
    {
      id: 'RPT-DOC-2024-09',
      title: 'Doctor Surgical & Clinical Performance Report',
      category: 'Clinical & OT',
      desc: 'Consultation volumes, surgical conversion ratios, complication rates, and patient satisfaction CSAT scores',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: 'Active Surgeons', value: '6 Consultants', change: '100% On-Duty', positive: true },
        { label: 'Total OPD Consults', value: '1,280 Visits', change: '+8.4% MoM', positive: true },
        { label: 'OPD to Surgery Ratio', value: '24.6%', change: 'Elective Candidate', positive: true },
        { label: 'Mean Patient CSAT', value: '4.92 / 5.0', change: 'Top 1% Benchmark', positive: true },
      ],
      tableHeaders: ['Consultant Name', 'Sub-Specialty', 'OPD Volume', 'Surgeries Done', 'Complication Rate', 'Patient Rating'],
      tableRows: [
        ['Dr. Anand Krishnamurthy', 'Joint Reconstruction (Knee/Hip)', '380 Patients', '54 Surgeries', '0.0%', '4.96 ★★★★★'],
        ['Dr. Lakshmi Narasimhan', 'Spine & Scoliosis Surgery', '240 Patients', '26 Surgeries', '0.0%', '4.91 ★★★★★'],
        ['Dr. Rajesh Rao', 'Robotic Joint Arthroplasty', '310 Patients', '38 Surgeries', '0.0%', '4.94 ★★★★★'],
        ['Dr. Arun Varma', 'Arthroscopy & Sports Medicine', '210 Patients', '18 Surgeries', '0.0%', '4.89 ★★★★★'],
        ['Dr. Sunita Deshmukh', 'Pediatric Orthopedics', '140 Patients', '6 Surgeries', '0.0%', '4.90 ★★★★★'],
      ],
      signoff: 'Dr. K. Srinivas Reddy, MD, Medical Superintendent',
    },
    {
      id: 'RPT-FIN-2024-09',
      title: 'Hospital Financial & TPA Insurance Summary',
      category: 'Financial',
      desc: 'Net revenue realization, cashless insurance settlement turnaround, out-of-pocket collections and overdue claims',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: 'Gross Billed Revenue', value: '₹1,28,50,000', change: '+14.2% vs target', positive: true },
        { label: 'Net Realized Collections', value: '₹1,12,00,000', change: '87.2% Collection Rate', positive: true },
        { label: 'Pending TPA Claims', value: '₹16,50,000', change: 'Avg Settlement 8.4 Days', positive: true },
        { label: 'Aging Overdue (>60d)', value: '₹4,50,000', change: 'Reduced by 35%', positive: true },
      ],
      tableHeaders: ['Revenue Stream', 'Billed Amount', 'Collected', 'TPA Cashless Share', 'Outstanding', 'Realization %'],
      tableRows: [
        ['Inpatient Arthroplasty (TKR/THR)', '₹74,20,000', '₹66,40,000', '₹52,00,000 (Star/HDFC/ICICI)', '₹7,80,000', '89.5%'],
        ['Spine & Trauma Inpatient', '₹32,80,000', '₹28,10,000', '₹21,50,000 (MediAssist/Bajaj)', '₹4,70,000', '85.7%'],
        ['Outpatient OPD & Consultations', '₹9,50,000', '₹9,50,000', '₹0 (Direct Digital Payment)', '₹0', '100%'],
        ['Diagnostics & High-Field MRI', '₹8,20,000', '₹7,60,000', '₹2,40,000', '₹60,000', '92.7%'],
        ['Physiotherapy & Tele-Rehab', '₹3,80,000', '₹3,60,000', '₹0 (Self-Pay)', '₹20,000', '94.7%'],
      ],
      signoff: 'Kiran Sharma, Chief Financial Officer & Head of TPA Operations',
    },
    {
      id: 'RPT-FOL-2024-09',
      title: 'Post-Op Follow-Up & Clinical Compliance Audit',
      category: 'Quality & Rehab',
      desc: '30-day readmission monitoring, wound healing check compliance, automated WhatsApp reminder reach',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: '30-Day Follow-Up Rate', value: '94.8%', change: '+3.1% National Avg', positive: true },
        { label: '30-Day Readmission Rate', value: '0.00%', change: 'Zero Unplanned Readmit', positive: true },
        { label: 'Rehab Tele-Check Adherence', value: '91.2%', change: '138 of 142 Patients', positive: true },
        { label: 'Auto-Reminders Delivered', value: '412 Messages', change: '99.4% Delivery via WhatsApp', positive: true },
      ],
      tableHeaders: ['Surgical Cohort', 'Total Discharges', 'Day 7 Wound Check', 'Day 14 Suture Removal', 'Day 30 ROM Audit', 'Compliance Status'],
      tableRows: [
        ['TKR Joint Reconstruction', '58 Patients', '58 / 58 (100%)', '57 / 58 (98%)', '56 / 58 (96.5%)', 'Exemplary Compliant'],
        ['THR Hip Replacement', '26 Patients', '26 / 26 (100%)', '26 / 26 (100%)', '25 / 26 (96.1%)', 'Exemplary Compliant'],
        ['Spine Decompression & Fusion', '22 Patients', '22 / 22 (100%)', '21 / 22 (95.4%)', '20 / 22 (90.9%)', 'Compliant'],
        ['ACL & Sports Reconstruction', '18 Patients', '18 / 18 (100%)', '18 / 18 (100%)', '17 / 18 (94.4%)', 'Compliant'],
        ['Trauma DHS / PFN Fixation', '18 Patients', '18 / 18 (100%)', '17 / 18 (94.4%)', '16 / 18 (88.8%)', 'Compliant'],
      ],
      signoff: 'Sister Ramya, Ward & Discharge Quality Supervisor',
    },
    {
      id: 'RPT-IMP-2024-09',
      title: 'Orthopedic Implant Utilization & Consignment Audit',
      category: 'Clinical & OT',
      desc: 'Implant consumption, vendor barcode traceability, expiry tracking, consignment stock reconciliation',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: 'Total Implants Placed', value: '86 Units', change: '100% Barcode Scanned', positive: true },
        { label: 'Consignment Stock Value', value: '₹42,80,000', change: 'Zero Capital Lockup', positive: true },
        { label: 'Implant Wastage / Drop', value: '0 Units', change: 'Zero Loss Record', positive: true },
        { label: 'Manufacturer Recalls', value: '0 Alerts', change: '100% Verified Lots', positive: true },
      ],
      tableHeaders: ['Implant System', 'Manufacturer', 'Units Implanted', 'Average Cost / Unit', 'Stock Left', 'Traceability Status'],
      tableRows: [
        ['NexGen Cruciate Retaining (CR)', 'Zimmer Biomet', '34 Knees', '₹88,000', '16 Units', '100% Barcode Logged'],
        ['Persona Personalized Knee', 'Zimmer Biomet', '14 Knees', '₹1,15,000', '8 Units', '100% Barcode Logged'],
        ['Triathlon Knee System', 'Stryker Orthopaedics', '22 Knees', '₹92,000', '12 Units', '100% Barcode Logged'],
        ['Accolade II Femoral Stem + Trident Acetabular', 'Stryker', '16 Hips', '₹1,45,000', '6 Units', '100% Barcode Logged'],
      ],
      signoff: 'Ramesh V., OT Implant Logistics & Central Consignment Manager',
    },
    {
      id: 'RPT-PT-2024-09',
      title: 'Physiotherapy Functional Mobility & WOMAC Outcomes',
      category: 'Quality & Rehab',
      desc: 'Post-op knee flexion ROM milestones, independent gait milestone days, WOMAC pain & functional recovery indices',
      date: 'Sep 2024',
      status: 'Ready' as const,
      kpis: [
        { label: 'POD-1 Mobilization Rate', value: '96.2%', change: 'Walked within 24h', positive: true },
        { label: 'Mean Flexion Gain (Wk 6)', value: '+38.4°', change: 'Mean Achieved: 118°', positive: true },
        { label: 'WOMAC Score Improvement', value: '68.4%', change: 'Marked Pain Relief', positive: true },
        { label: 'Arthrofibrosis / MUA Rate', value: '0.00%', change: 'Zero Manipulation Needed', positive: true },
      ],
      tableHeaders: ['Rehab Cohort', 'Active Patients', 'Day 1 Walker Ambulation', 'Day 14 Extension Deficit', 'Week 4 Flexion >110°', 'Home Adherence'],
      tableRows: [
        ['Fast-Track TKR Cohort', '58 Patients', '56 / 58 (96.5%)', '0° (100% full extension)', '54 / 58 (93.1%)', '92.4% App Logged'],
        ['Anterior Approach THR', '26 Patients', '26 / 26 (100%)', 'N/A (Full Hip Stability)', '26 / 26 (100%)', '95.0% App Logged'],
        ['ACL Reconstruction', '18 Patients', '18 / 18 (100%)', 'Full terminal ext.', '16 / 18 (88.8%)', '88.6% App Logged'],
        ['Spine Rehab Protocol', '22 Patients', '21 / 22 (95.4%)', 'Core Stability Stage 2', '20 / 22 (90.9%)', '89.2% App Logged'],
      ],
      signoff: 'Arun Kumar, Chief Physiotherapist & Head of Orthopedic Rehabilitation',
    },
  ];

  const filteredReports = reportData.filter(r => {
    const matchCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchSearch = searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleExport = (format: string, title: string) => {
    setExportNotice(`Exported "${title}" as ${format.toUpperCase()} successfully.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="page-container space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 page-header">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="page-title">Reports & Clinical Analytics</h1>
              <span className="badge bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                NABH / JCI Audit Ready
              </span>
            </div>
            <p className="page-subtitle">Verified surgical caseload statistics, financial audits, and rehabilitation outcomes</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-surface-200 bg-white shadow-xs focus:ring-2 focus:ring-primary-500"
            >
              <option value="Sep 2024">Sep 2024 (Current)</option>
              <option value="Aug 2024">August 2024</option>
              <option value="July 2024">July 2024</option>
              <option value="Q2 FY 2024-25">Q2 FY 2024-25</option>
            </select>

            <button
              onClick={() => handleExport('ZIP Archive', 'All Clinical & Financial Reports')}
              className="btn-primary !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All (ZIP)</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Export Notification Toast */}
      {exportNotice && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportNotice}</span>
        </motion.div>
      )}

      {/* Filter & Search Bar */}
      <div className="card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: `All Reports (${reportData.length})` },
            { id: 'Clinical & OT', label: 'Clinical & OT' },
            { id: 'Financial', label: 'Financial' },
            { id: 'Quality & Rehab', label: 'Quality & Rehab' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all',
                selectedCategory === tab.id
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-surface-100'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search report title, code, keyword..."
            className="input-base !pl-8 !py-1.5 !text-xs w-full"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredReports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card-hover p-5 flex flex-col justify-between group border border-surface-200 hover:border-primary-400 transition-all cursor-pointer"
            onClick={() => setSelectedReport(report)}
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-2xs group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <FileBarChart className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary-700 block">{report.id}</span>
                    <span className="text-[10px] font-semibold text-gray-400">{report.category}</span>
                  </div>
                </div>
                <span className="badge text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                  {report.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">
                {report.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {report.desc}
              </p>

              {/* Highlight KPI Pills */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-surface-100">
                {report.kpis.slice(0, 2).map(kpi => (
                  <div key={kpi.label} className="p-2 rounded-lg bg-surface-50 border border-surface-200">
                    <span className="text-[10px] text-gray-500 block truncate">{kpi.label}</span>
                    <span className="text-xs font-bold text-gray-900 block mt-0.5">{kpi.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-gray-400">{report.date} · Verified</span>
              <button
                type="button"
                className="px-3 py-1 rounded-lg bg-primary-50 text-primary-700 font-bold text-xs flex items-center gap-1 hover:bg-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-2xs"
              >
                <span>Open Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comprehensive Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-xs">
                  <FileBarChart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary-700">{selectedReport.id}</span>
                    <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">Official Hospital Audit</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedReport.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('PDF', selectedReport.title)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => handleExport('CSV', selectedReport.title)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <p className="text-xs text-slate-600 leading-relaxed">{selectedReport.desc}</p>

              {/* 4 Core KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedReport.kpis.map(kpi => (
                  <div key={kpi.label} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 block leading-tight">{kpi.label}</span>
                    <span className="text-xl font-extrabold text-slate-900 block mt-1.5">{kpi.value}</span>
                    <span className={cn('text-[11px] font-semibold mt-1 inline-block', kpi.positive ? 'text-emerald-700' : 'text-slate-500')}>
                      {kpi.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Table Breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Detailed Clinical Breakdown</span>
                  <span className="text-[11px] font-semibold text-slate-400">Period: {selectedPeriod}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/40 text-slate-500">
                        {selectedReport.tableHeaders.map((head, idx) => (
                          <th key={idx} className="py-2.5 px-4 font-semibold text-[11px]">{head}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedReport.tableRows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-50/60 transition-colors">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={cn('py-3 px-4 font-medium', cellIdx === 0 && 'font-bold text-slate-900')}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Signoff Stamp */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950 block">NABH Medical Compliance Attestation</span>
                    <span className="text-[11px] text-emerald-800">{selectedReport.signoff}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-emerald-700 block">SHA-256 DIGITAL SIGNATURE VERIFIED</span>
                  <span className="text-[10px] text-emerald-600">Timestamp: 2024-09-22 09:30:14 IST</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  FINANCE (REVENUE CYCLE, BILLING & TPA CASHLESS)
// ═══════════════════════════════════════════════════
export function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Sep 2024');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string>('');
  
  // Interactive invoice selection for the Official Tax Invoice Modal
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<any | null>(null);

  // Initial rich clinical invoice registry
  const [invoicesList, setInvoicesList] = useState([
    {
      id: 'inv-1',
      invoiceNumber: 'RASA-INV-2024001',
      uhid: 'UHID-2024-8842',
      patientName: 'Rajesh Kumar Sharma',
      procedure: 'Bilateral TKR (Zimmer NexGen CR)',
      category: 'joint',
      payorType: 'Star Health Insurance (Cashless TPA)',
      claimId: 'SH-2024-7712',
      date: '20 Sep 2024',
      subtotal: 250000,
      tax: 12500,
      discount: 0,
      total: 262500,
      paid: 262500,
      balance: 0,
      status: 'paid' as const,
      tpaApproved: 220000,
      coPayPaid: 42500,
      doctor: 'Dr. Anand Krishnamurthy',
      admissionDate: '17 Sep 2024',
      dischargeDate: '21 Sep 2024',
      roomType: 'Deluxe Private Suite (Bed 204)',
      items: [
        { desc: 'Zimmer Biomet NexGen CR Femoral & Tibial Component (Lot #ZM-8842)', cat: 'Implant', qty: 2, rate: 88000, amount: 176000 },
        { desc: 'Laminar Airflow Modular OT Surgical Facility & Consumables', cat: 'OT Charges', qty: 1, rate: 35000, amount: 35000 },
        { desc: 'Lead Surgeon Fee & Assistant Operative Charge', cat: 'Professional', qty: 1, rate: 45000, amount: 45000 },
        { desc: 'Anesthesia Induction, PAC & Epidural Analgesia Monitoring', cat: 'Anesthesia', qty: 1, rate: 16500, amount: 16500 },
        { desc: 'Inpatient Nursing Care & Sterile Surgical Dressings (4 Days)', cat: 'Nursing', qty: 4, rate: 2500, amount: 10000 },
        { desc: 'Inpatient Pharmacy, IV Antibiotics & Clexane DVT Prophylaxis', cat: 'Pharmacy', qty: 1, rate: 17500, amount: 17500 },
      ]
    },
    {
      id: 'inv-2',
      invoiceNumber: 'RASA-INV-2024002',
      uhid: 'UHID-2024-8843',
      patientName: 'Lakshmi Devi',
      procedure: 'Left Total Hip Replacement (DePuy Corail)',
      category: 'joint',
      payorType: 'HDFC ERGO Health (Pre-Auth Approved)',
      claimId: 'HE-2024-9931',
      date: '21 Sep 2024',
      subtotal: 250000,
      tax: 12500,
      discount: 0,
      total: 262500,
      paid: 262500,
      balance: 0,
      status: 'paid' as const,
      tpaApproved: 235000,
      coPayPaid: 27500,
      doctor: 'Dr. Anand Krishnamurthy',
      admissionDate: '19 Sep 2024',
      dischargeDate: '22 Sep 2024',
      roomType: 'Private Room (Bed 108)',
      items: [
        { desc: 'DePuy Synthes Corail AMT Hip Stem & Pinnacle Acetabular Cup', cat: 'Implant', qty: 1, rate: 145000, amount: 145000 },
        { desc: 'Modular OT Facility & Fluoroscopic Image Intensifier', cat: 'OT Charges', qty: 1, rate: 32000, amount: 32000 },
        { desc: 'Primary Arthroplasty Surgeon Operative Fee', cat: 'Professional', qty: 1, rate: 40000, amount: 40000 },
        { desc: 'Spinal Anesthesia & PAC Critical Care Supervision', cat: 'Anesthesia', qty: 1, rate: 15000, amount: 15000 },
        { desc: 'Nursing Station Monitoring & Inpatient Bed Charges', cat: 'Room/Bed', qty: 3, rate: 4500, amount: 13500 },
        { desc: 'Surgical Disposables & Cryotherapy Kit', cat: 'Consumables', qty: 1, rate: 17000, amount: 17000 },
      ]
    },
    {
      id: 'inv-3',
      invoiceNumber: 'RASA-INV-2024003',
      uhid: 'UHID-2024-8844',
      patientName: 'Mohammed Irfan',
      procedure: 'Arthroscopic ACL Reconstruction + Meniscal Repair',
      category: 'daycare',
      payorType: 'Self-Pay / UPI NetBanking',
      claimId: 'DIRECT-UPI-9901',
      date: '19 Sep 2024',
      subtotal: 185000,
      tax: 9250,
      discount: 0,
      total: 194250,
      paid: 194250,
      balance: 0,
      status: 'paid' as const,
      tpaApproved: 0,
      coPayPaid: 194250,
      doctor: 'Dr. Karthik Narayan',
      admissionDate: '19 Sep 2024',
      dischargeDate: '20 Sep 2024',
      roomType: 'Daycare Surgical Suite',
      items: [
        { desc: 'Arthrex FiberWire & Biosure Suture Anchors', cat: 'Implant', qty: 1, rate: 68000, amount: 68000 },
        { desc: 'HD 4K Arthroscopy Video Tower & Shaver Console', cat: 'OT Charges', qty: 1, rate: 28000, amount: 28000 },
        { desc: 'Sports Medicine Arthroscopic Surgeon Fee', cat: 'Professional', qty: 1, rate: 38000, amount: 38000 },
        { desc: 'Daycare Inpatient Bed, Nursing & Physiotherapy Initiation', cat: 'Care', qty: 1, rate: 12000, amount: 12000 },
        { desc: 'Knee Immobilizer Brace & Cold Therapy Pack', cat: 'Rehab', qty: 1, rate: 14000, amount: 14000 },
        { desc: 'General Anesthesia & LMA Airway Management', cat: 'Anesthesia', qty: 1, rate: 34250, amount: 34250 },
      ]
    },
    {
      id: 'inv-4',
      invoiceNumber: 'RASA-INV-2024004',
      uhid: 'UHID-2024-8845',
      patientName: 'Padmavathi Naidu',
      procedure: 'OP Consultation & Bilateral Standing Radiographs',
      category: 'opd',
      payorType: 'Direct Cash / Card',
      claimId: 'POS-REC-4412',
      date: '21 Sep 2024',
      subtotal: 7650,
      tax: 383,
      discount: 0,
      total: 8033,
      paid: 8033,
      balance: 0,
      status: 'paid' as const,
      tpaApproved: 0,
      coPayPaid: 8033,
      doctor: 'Dr. Anand Krishnamurthy',
      admissionDate: '21 Sep 2024',
      dischargeDate: '21 Sep 2024',
      roomType: 'Outpatient Cabin 101',
      items: [
        { desc: 'Senior Orthopedic Consultant OPD Examination & Evaluation', cat: 'Consultation', qty: 1, rate: 1200, amount: 1200 },
        { desc: 'Digital Standing Both Knees AP & Lateral Views (XR-8845)', cat: 'Diagnostics', qty: 2, rate: 950, amount: 1900 },
        { desc: 'Computerized Digital Goniometry & ROM Analysis', cat: 'Clinical', qty: 1, rate: 850, amount: 850 },
        { desc: 'Intra-articular Corticosteroid & Local Anesthetic Injection', cat: 'Procedure', qty: 1, rate: 2500, amount: 2500 },
        { desc: 'Surgical Consumables & Sterile Aspiration Pack', cat: 'Consumables', qty: 1, rate: 1583, amount: 1583 },
      ]
    },
    {
      id: 'inv-5',
      invoiceNumber: 'RASA-INV-2024005',
      uhid: 'UHID-2024-8846',
      patientName: 'Venkatesh Reddy',
      procedure: 'L4-L5 Lumbar Microdiscectomy',
      category: 'spine',
      payorType: 'ICICI Lombard (Pre-Auth in Process)',
      claimId: 'ICICI-2024-6621',
      date: '20 Sep 2024',
      subtotal: 150000,
      tax: 7500,
      discount: 0,
      total: 157500,
      paid: 157500,
      balance: 0,
      status: 'paid' as const,
      tpaApproved: 140000,
      coPayPaid: 17500,
      doctor: 'Dr. Lakshmi Narayana',
      admissionDate: '18 Sep 2024',
      dischargeDate: '21 Sep 2024',
      roomType: 'Twin Sharing Room 302',
      items: [
        { desc: 'Operative Spine Microscope & High-Speed Drill Facility', cat: 'OT Charges', qty: 1, rate: 42000, amount: 42000 },
        { desc: 'Lead Spine Surgeon Microdiscectomy Professional Fee', cat: 'Professional', qty: 1, rate: 48000, amount: 48000 },
        { desc: 'General Endotracheal Anesthesia & Intraoperative Monitoring', cat: 'Anesthesia', qty: 1, rate: 18000, amount: 18000 },
        { desc: 'Inpatient Bed Charges (3 Days Twin Sharing)', cat: 'Room/Bed', qty: 3, rate: 3000, amount: 9000 },
        { desc: 'Lumbar Corset Brace & Physiotherapy Spine Rehabilitation', cat: 'Rehab', qty: 1, rate: 12500, amount: 12500 },
        { desc: 'Sterile Spine Drape Kit & Hemostatic Matrix Agents', cat: 'Consumables', qty: 1, rate: 28000, amount: 28000 },
      ]
    },
    {
      id: 'inv-6',
      invoiceNumber: 'RASA-INV-2024009',
      uhid: 'UHID-2024-8850',
      patientName: 'Ravi Teja',
      procedure: 'Right Femur Shaft Fracture Intramedullary Nailing',
      category: 'trauma',
      payorType: 'CGHS Govt Scheme (Co-Pay Pending)',
      claimId: 'CGHS-AP-2024-0012',
      date: '18 Sep 2024',
      subtotal: 185000,
      tax: 9250,
      discount: 0,
      total: 194250,
      paid: 150000,
      balance: 44250,
      status: 'partial' as const,
      tpaApproved: 150000,
      coPayPaid: 0,
      doctor: 'Dr. Suresh Babu',
      admissionDate: '16 Sep 2024',
      dischargeDate: '20 Sep 2024',
      roomType: 'Special Ward (Bed 112)',
      items: [
        { desc: 'Titanium Antegrade Interlocking Femoral Nail & Proximal Screws', cat: 'Implant', qty: 1, rate: 58000, amount: 58000 },
        { desc: 'Trauma Fracture Table & High-Output C-Arm Fluoroscopy', cat: 'OT Charges', qty: 1, rate: 34000, amount: 34000 },
        { desc: 'Trauma Consultant Surgical Fixation Fee', cat: 'Professional', qty: 1, rate: 38000, amount: 38000 },
        { desc: 'Regional Spinal Anesthesia & Fluid Resuscitation', cat: 'Anesthesia', qty: 1, rate: 14500, amount: 14500 },
        { desc: 'Inpatient Room, Nursing, and Daily Wound Dressing', cat: 'Care', qty: 4, rate: 3500, amount: 14000 },
        { desc: 'IV Ceftriaxone, Enoxaparin DVT Prophylaxis & Blood Consumables', cat: 'Pharmacy', qty: 1, rate: 35750, amount: 35750 },
      ]
    },
    {
      id: 'inv-7',
      invoiceNumber: 'RASA-INV-2024011',
      uhid: 'UHID-2024-8852',
      patientName: 'Chandra Sekhar',
      procedure: 'Post-Op Physical Therapy Package (10 Sessions)',
      category: 'daycare',
      payorType: 'Patient Direct Bill (Payment Due)',
      claimId: 'CO-PAY-DUE',
      date: '15 Sep 2024',
      subtotal: 15000,
      tax: 750,
      discount: 0,
      total: 15750,
      paid: 0,
      balance: 15750,
      status: 'overdue' as const,
      tpaApproved: 0,
      coPayPaid: 0,
      doctor: 'Arun Kumar PT',
      admissionDate: '15 Sep 2024',
      dischargeDate: '15 Sep 2024',
      roomType: 'Rehab Center Suite',
      items: [
        { desc: 'Advanced Continuous Passive Motion (CPM) Machine Sessions (10 Days)', cat: 'Physio', qty: 10, rate: 650, amount: 6500 },
        { desc: 'Gait Training with Bilateral Forearm Support & Stairs Training', cat: 'Physio', qty: 10, rate: 450, amount: 4500 },
        { desc: 'Therapeutic Ultrasound & Cryo-compression Therapy', cat: 'Modalities', qty: 10, rate: 400, amount: 4000 },
        { desc: 'Clinical Goniometric Outcome Documentation & Progress Charting', cat: 'Consult', qty: 1, rate: 750, amount: 750 },
      ]
    },
  ]);

  const filteredInvoices = invoicesList.filter(inv => {
    const matchesCat = selectedCategory === 'all' || 
      (selectedCategory === 'joint' && inv.category === 'joint') ||
      (selectedCategory === 'spine' && inv.category === 'spine') ||
      (selectedCategory === 'trauma' && inv.category === 'trauma') ||
      (selectedCategory === 'daycare' && (inv.category === 'daycare' || inv.category === 'opd')) ||
      (selectedCategory === 'pending' && (inv.status === 'partial' || inv.status === 'overdue'));

    const matchesSearch = searchQuery === '' || 
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.procedure.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleRecordPayment = (invId: string) => {
    setInvoicesList(prev => prev.map(inv => {
      if (inv.id === invId) {
        return {
          ...inv,
          paid: inv.total,
          balance: 0,
          status: 'paid' as const,
        };
      }
      return inv;
    }));

    if (selectedInvoiceForModal && selectedInvoiceForModal.id === invId) {
      setSelectedInvoiceForModal({
        ...selectedInvoiceForModal,
        paid: selectedInvoiceForModal.total,
        balance: 0,
        status: 'paid',
      });
    }

    setPaymentSuccessToast(`Payment reconciled for Invoice ${selectedInvoiceForModal?.invoiceNumber || invId}. Receipt updated.`);
    setTimeout(() => setPaymentSuccessToast(''), 3500);
  };

  return (
    <div className="page-container space-y-6 text-left">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 page-header">
          <div>
            <h1 className="page-title flex items-center gap-2.5">
              <span>Hospital Finance & Revenue Cycle</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                IRDAI & GST Compliant
              </span>
            </h1>
            <p className="page-subtitle">Itemized tax invoices, cashless TPA insurance processing, and realization tracking</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select 
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs focus:outline-hidden"
            >
              <option>Sep 2024</option>
              <option>Q2 FY24</option>
              <option>Fiscal Year 2024-25</option>
            </select>
            <button 
              onClick={() => {
                setPaymentSuccessToast('Exporting GST B2B & B2C Tax Schedule (GSTR-1 format)...');
                setTimeout(() => setPaymentSuccessToast(''), 3000);
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Tally / GST</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4 Executive Financial KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Gross Billed Revenue', value: formatCurrency(12850000), trend: '+14.2% MoM', sub: '₹4.28 Lakhs daily average', color: 'text-emerald-700' },
          { label: 'Realized Collections', value: formatCurrency(11200000), trend: '87.2% Realization', sub: 'Direct Bank, POS & UPI', color: 'text-blue-700' },
          { label: 'TPA Cashless in Pipeline', value: formatCurrency(1650000), trend: '14 Active Claims', sub: 'Star Health, HDFC, ICICI, CGHS', color: 'text-amber-700' },
          { label: 'Overdue Co-Pay Balance', value: formatCurrency(450000), trend: '4 Action Accounts', sub: 'Patient Co-Pay Recovery Alert', color: 'text-rose-700' },
        ].map((s, i) => (
          <div key={i} className="card p-4 text-left border border-slate-200/90 shadow-2xs">
            <p className="stat-label text-slate-500">{s.label}</p>
            <p className={cn('text-2xl font-black mt-1', s.color)}>{s.value}</p>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{s.trend}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* TPA Cashless Settlement Pipeline Ribbon */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              TPA Cashless Insurance Processing Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            IRDAI ROHINI Code: 89004412
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-semibold">1. Pre-Auth Cleared</span>
            <span className="font-bold text-slate-900 text-sm">₹7,20,000</span>
            <span className="text-[10px] text-teal-700 block">6 Upcoming Surgeries</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-semibold">2. Operative Docs Submitted</span>
            <span className="font-bold text-slate-900 text-sm">₹5,50,000</span>
            <span className="text-[10px] text-amber-700 block">5 Claims Under Review</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-semibold">3. Final Settlement Audit</span>
            <span className="font-bold text-slate-900 text-sm">₹3,80,000</span>
            <span className="text-[10px] text-blue-700 block">3 Accounts Discharged</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] text-emerald-800 block font-semibold">4. Settled & Reconciled</span>
            <span className="font-bold text-emerald-950 text-sm">₹1,12,00,000</span>
            <span className="text-[10px] text-emerald-700 block">98.7% First-Pass Approval</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Invoices' },
            { id: 'joint', label: 'Arthroplasty (TKR/THR)' },
            { id: 'spine', label: 'Spine Surgeries' },
            { id: 'trauma', label: 'Trauma & Fractures' },
            { id: 'daycare', label: 'Daycare & OPD' },
            { id: 'pending', label: 'Pending Co-Pay' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer',
                selectedCategory === tab.id
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search patient, invoice #, or procedure..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-teal-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Toast */}
      {paymentSuccessToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{paymentSuccessToast}</span>
        </div>
      )}

      {/* Financial Table */}
      <div className="card overflow-hidden border border-slate-200/90 shadow-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/90 text-xs font-bold text-slate-600">
              <th className="py-3 px-4">Invoice # & Date</th>
              <th className="py-3 px-3">Patient & Procedure</th>
              <th className="py-3 px-3">Payor / TPA</th>
              <th className="py-3 px-3 text-right">Total</th>
              <th className="py-3 px-3 text-right">Paid</th>
              <th className="py-3 px-3 text-right">Balance</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredInvoices.map((inv) => (
              <tr 
                key={inv.id}
                onClick={() => setSelectedInvoiceForModal(inv)}
                className="hover:bg-teal-50/30 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4">
                  <p className="font-mono font-bold text-slate-900">{inv.invoiceNumber}</p>
                  <p className="text-[11px] text-slate-400">{inv.date}</p>
                </td>
                <td className="py-3 px-3">
                  <p className="font-bold text-slate-900">{inv.patientName}</p>
                  <p className="text-[11px] font-semibold text-teal-700">{inv.procedure}</p>
                  <p className="text-[10px] font-mono text-slate-400">{inv.uhid}</p>
                </td>
                <td className="py-3 px-3">
                  <span className="text-slate-800 font-medium block">{inv.payorType}</span>
                  <span className="text-[10px] font-mono text-slate-400">{inv.claimId}</span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 text-sm">
                  {formatCurrency(inv.total)}
                </td>
                <td className="py-3 px-3 text-right font-mono text-slate-600">
                  {formatCurrency(inv.paid)}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  <span className={cn(inv.balance > 0 ? 'text-rose-600 font-black' : 'text-slate-400')}>
                    {formatCurrency(inv.balance)}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={cn(
                    'px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 uppercase tracking-wider',
                    inv.status === 'paid' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    inv.status === 'partial' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-rose-50 text-rose-800 border border-rose-200'
                  )}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInvoiceForModal(inv);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-colors cursor-pointer"
                  >
                    View Tax Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Tax Invoice Lightbox Modal */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left border border-slate-200 my-8">
            
            {/* Modal Actions Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                OFFICIAL HOSPITAL TAX INVOICE
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    setPaymentSuccessToast(`WhatsApp Tax Invoice PDF dispatched to ${selectedInvoiceForModal.patientName}`);
                    setTimeout(() => setPaymentSuccessToast(''), 3000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceForModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hospital Official Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-teal-800/20 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-black flex items-center justify-center text-sm">
                    R
                  </div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    RASA INSTITUTE OF ORTHOPAEDICS & TRAUMA
                  </h2>
                </div>
                <p className="text-[11px] text-slate-500">
                  Campus: Road No. 2, Banjara Hills, Hyderabad - 500034 · Tel: +91 40 6800 2000
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  GSTIN: <strong>36AAACR9982Q1Z5</strong> · NABH Reg: <strong>NABH-2024-ORTHO-0912</strong>
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-mono">TAX INVOICE NO</span>
                <span className="font-mono font-black text-teal-900 text-sm">{selectedInvoiceForModal.invoiceNumber}</span>
                <span className="text-[11px] text-slate-500 block">Date: {selectedInvoiceForModal.date}</span>
              </div>
            </div>

            {/* Patient Demographics & Admission Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Patient Name:</span>
                <strong className="text-slate-900 block">{selectedInvoiceForModal.patientName}</strong>
                <span className="text-[10px] font-mono text-slate-500">{selectedInvoiceForModal.uhid}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Primary Surgeon:</span>
                <strong className="text-slate-900 block">{selectedInvoiceForModal.doctor}</strong>
                <span className="text-[10px] text-teal-700">{selectedInvoiceForModal.roomType}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Procedure Performed:</span>
                <strong className="text-slate-900 block truncate">{selectedInvoiceForModal.procedure}</strong>
                <span className="text-[10px] text-slate-500">Admit: {selectedInvoiceForModal.admissionDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Payor / Claim ID:</span>
                <strong className="text-slate-900 block truncate">{selectedInvoiceForModal.payorType}</strong>
                <span className="text-[10px] font-mono text-teal-800">{selectedInvoiceForModal.claimId}</span>
              </div>
            </div>

            {/* Itemized Clinical Billing Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Itemized Line-Item Breakdown</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                      <th className="py-2 px-3">Service / Implant Description</th>
                      <th className="py-2 px-2">Category</th>
                      <th className="py-2 px-2 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Unit Rate</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoiceForModal.items?.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="py-2 px-3 text-slate-900 font-medium">{item.desc}</td>
                        <td className="py-2 px-2 text-slate-500 text-[11px]">{item.cat}</td>
                        <td className="py-2 px-2 text-center font-mono">{item.qty}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">{formatCurrency(item.rate)}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals & Tax Calculation */}
            <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-2 border-t border-slate-200">
              <div className="space-y-1 text-xs text-slate-500">
                <p>Tax Exemption: Healthcare services exempted under GST notification 12/2017.</p>
                <p>Implant GST (5% / 12%): Included in prosthetic component pricing.</p>
                {selectedInvoiceForModal.tpaApproved > 0 && (
                  <p className="text-emerald-700 font-bold">
                    TPA Pre-Auth Deducted: {formatCurrency(selectedInvoiceForModal.tpaApproved)}
                  </p>
                )}
              </div>

              <div className="w-full sm:w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatCurrency(selectedInvoiceForModal.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hospital Tax (GST 5%):</span>
                  <span className="font-mono">{formatCurrency(selectedInvoiceForModal.tax)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1.5 text-sm">
                  <span>Total Tax Invoice:</span>
                  <span className="font-mono font-black text-teal-900">{formatCurrency(selectedInvoiceForModal.total)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Amount Paid:</span>
                  <span className="font-mono">{formatCurrency(selectedInvoiceForModal.paid)}</span>
                </div>
                <div className="flex justify-between text-rose-700 font-black border-t border-slate-100 pt-1">
                  <span>Patient Co-Pay Balance:</span>
                  <span className="font-mono">{formatCurrency(selectedInvoiceForModal.balance)}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">
                Authorized Signature: Hospital Accounts & Billing Desk
              </span>
              {selectedInvoiceForModal.balance > 0 ? (
                <button
                  onClick={() => handleRecordPayment(selectedInvoiceForModal.id)}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Collect Co-Pay ({formatCurrency(selectedInvoiceForModal.balance)})</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-700 font-black text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Invoice Fully Paid & Settled</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="page-title text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Staff & Nursing Ward Station</h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Ward Telemetry
              </span>
            </div>
            <p className="page-subtitle text-xs sm:text-sm text-slate-500">
              Continuous inpatient telemetry · Surgical wound & drain monitoring · Pre-op surgical clearance checklist
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-xs self-start gap-1">
            <button
              onClick={() => setActiveTab('ward_beds')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'ward_beds' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Inpatient Beds (6 Active)</span>
            </button>
            <button
              onClick={() => setActiveTab('preop_checklist')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'preop_checklist' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Pre-Op Clearance ({preopCases.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('shift_handover')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer',
                activeTab === 'shift_handover' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* High-Level Ward Telemetry Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                <BedDouble className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Admitted Beds</span>
                <span className="text-sm font-bold text-slate-900">6 / 6 Occupied</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Stable Telemetry</span>
                <span className="text-sm font-bold text-emerald-700">4 Patients</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Dressing Review Due</span>
                <span className="text-sm font-bold text-amber-700">1 Patient (101-B)</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">ICU Post-Op Care</span>
                <span className="text-sm font-bold text-rose-700">1 Patient (104-ICU)</span>
              </div>
            </div>
          </div>

          {/* 6 High-Clarity Bed Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {beds.map(b => (
              <div
                key={b.bed}
                className={cn(
                  'card p-4.5 border transition-all shadow-xs rounded-2xl space-y-3.5',
                  b.status === 'critical' ? 'border-rose-300 bg-rose-50/15 shadow-sm' :
                  b.status === 'attention' ? 'border-amber-300 bg-amber-50/15 shadow-sm' :
                  b.status === 'ready_discharge' ? 'border-blue-300 bg-blue-50/15' :
                  'border-slate-200 hover:border-teal-300 bg-white'
                )}
              >
                {/* Header: Bed Number & Post-Op Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-slate-900 text-white tracking-wide shadow-2xs">
                      {b.bed}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {b.age}y · {b.gender === 'M' ? 'Male' : 'Female'}
                    </span>
                  </div>
                  <span className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs',
                    b.pod === 'POD 0' ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' :
                    b.pod === 'POD 1' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                    b.pod === 'POD 2' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                    'bg-blue-50 text-blue-800 border-blue-300'
                  )}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', b.pod === 'POD 0' ? 'bg-rose-600 animate-ping' : b.pod === 'POD 1' ? 'bg-amber-500' : b.pod === 'POD 2' ? 'bg-emerald-500' : 'bg-blue-500')} />
                    {b.pod === 'POD 0' && 'Day 0 · ICU Post-Op'}
                    {b.pod === 'POD 1' && 'Day 1 · Close Observation'}
                    {b.pod === 'POD 2' && 'Day 2 · Mobilizing'}
                    {b.pod === 'POD 3' && 'Day 3 · Discharge Ready'}
                  </span>
                </div>

                {/* Patient Identity & Surgical Procedure */}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{b.patient}</h4>
                  <p className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/80 inline-block mt-1">
                    {b.proc}
                  </p>
                </div>

                {/* Clinical Patient Monitor Telemetry Box */}
                <div className="rounded-xl bg-slate-900 text-white p-2.5 shadow-sm">
                  <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800 text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Activity className="w-3 h-3 animate-pulse" /> Live Telemetry Vitals
                    </span>
                    <span className="font-mono text-slate-400">Stream Online</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    {/* BP */}
                    <div className="bg-slate-800/80 rounded-lg p-1.5 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">BP (mmHg)</span>
                      <span className="text-xs font-mono font-bold text-white block mt-0.5">{b.bp}</span>
                      <span className="text-[8.5px] text-slate-400 font-medium block">Systolic/Dia</span>
                    </div>
                    {/* SpO2 */}
                    <div className="bg-slate-800/80 rounded-lg p-1.5 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">SpO2 (%)</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">{b.spo2}</span>
                      <span className="text-[8.5px] text-emerald-400/80 font-medium block">Room Air</span>
                    </div>
                    {/* HR */}
                    <div className="bg-slate-800/80 rounded-lg p-1.5 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">Pulse (BPM)</span>
                      <span className="text-xs font-mono font-bold text-sky-400 block mt-0.5">{b.hr}</span>
                      <span className="text-[8.5px] text-slate-400 font-medium block">Regular Sinus</span>
                    </div>
                    {/* Pain */}
                    <div className="bg-slate-800/80 rounded-lg p-1.5 border border-slate-700/60">
                      <span className="text-[9px] text-slate-400 block font-semibold uppercase">Pain (VAS)</span>
                      <span className={cn(
                        'text-xs font-mono font-bold block mt-0.5',
                        b.pain >= 6 ? 'text-rose-400' : b.pain >= 4 ? 'text-amber-400' : 'text-emerald-400'
                      )}>
                        {b.pain}/10
                      </span>
                      <span className="text-[8.5px] text-slate-400 font-medium block">
                        {b.pain >= 6 ? 'Severe' : b.pain >= 4 ? 'Moderate' : 'Mild'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Structured Clinical Lines & Wound Care */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Syringe className="w-3 h-3 text-teal-600" /> IV Infusion:
                    </span>
                    <span className="font-bold text-slate-800">{b.iv}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Activity className="w-3 h-3 text-rose-500" /> Surgical Drain:
                    </span>
                    <span className="font-bold text-slate-800">{b.drain}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3 text-amber-500" /> Surgical Dressing:
                    </span>
                    <span className={cn(
                      'font-bold px-1.5 py-0.2 rounded text-[11px] border',
                      b.dressing.includes('Due') ? 'bg-amber-100 text-amber-900 border-amber-300' :
                      b.dressing.includes('Pressure') ? 'bg-rose-50 text-rose-800 border-rose-200' :
                      'bg-emerald-50 text-emerald-800 border-emerald-200'
                    )}>
                      {b.dressing}
                    </span>
                  </div>
                </div>

                {/* Clinical Action Button */}
                <button
                  type="button"
                  onClick={() => handleUpdateVitals(b.bed, b.patient)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer active:scale-98"
                >
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Record Live Vitals Check</span>
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
  const [activeTab, setActiveTab] = useState<string>('all');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Hospital Configuration Form State
  const [hospitalConfig, setHospitalConfig] = useState({
    name: 'RASA ORTHO OS — Center for Advanced Orthopedics & Joint Replacement',
    regNumber: 'NABH-TEL-HYD-2023-0891',
    emergencyHotline: '+91 (040) 2360-9999',
    traumaAmbulance: '+91 (040) 2360-108',
    opdStartTime: '08:00 AM',
    opdEndTime: '08:00 PM',
    otStartTime: '07:30 AM',
    emergency24x7: true,
    activeBranch: 'Hyderabad - Banjara Hills (Flagship Center)',
  });

  // Roles & Permissions State
  const [rolePermissions, setRolePermissions] = useState<{
    [role: string]: { [perm: string]: boolean };
  }>({
    'Chief Orthopedic Surgeon': { viewEMR: true, signRx: true, bookOT: true, reqImplants: true, discharge: true, viewFinance: true },
    'Consultant Orthopedic': { viewEMR: true, signRx: true, bookOT: true, reqImplants: true, discharge: true, viewFinance: false },
    'OT Nurse Supervisor': { viewEMR: true, signRx: false, bookOT: true, reqImplants: true, discharge: false, viewFinance: false },
    'Ward Duty Nurse': { viewEMR: true, signRx: false, bookOT: false, reqImplants: false, discharge: false, viewFinance: false },
    'Front Desk Reception': { viewEMR: false, signRx: false, bookOT: false, reqImplants: false, discharge: false, viewFinance: false },
    'Finance & TPA Manager': { viewEMR: false, signRx: false, bookOT: false, reqImplants: true, discharge: false, viewFinance: true },
  });

  // Notification Triggers State
  const [notificationConfig, setNotificationConfig] = useState({
    smsEnabled: true,
    whatsappEnabled: true,
    beeperSoundEnabled: true,
    emailAlertsEnabled: true,
    criticalLabAlert: true,
    emergencyOTCodeRed: true,
    postOpVitalsAlert: true,
    implantStockLowAlert: true,
    patient24hReminder: true,
  });

  // Integration test state
  const [pacsStatus, setPacsStatus] = useState<'idle' | 'testing' | 'connected'>('connected');
  const [pacsPing, setPacsPing] = useState('12ms');

  // Preview template modal
  const [previewTemplate, setPreviewTemplate] = useState<{
    title: string;
    specialty: string;
    sections: { heading: string; body: string }[];
  } | null>(null);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleTogglePermission = (role: string, perm: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
  };

  const testPacsConnection = () => {
    setPacsStatus('testing');
    setTimeout(() => {
      setPacsStatus('connected');
      setPacsPing(`${Math.floor(10 + Math.random() * 8)}ms`);
      showNotification('PACS/DICOM Server Ping verified: C-ECHO Echo SCU Response OK (0x0000)');
    }, 900);
  };

  const sections = [
    { id: 'hospital', title: 'Hospital Configuration', desc: 'Branch settings, departments, operating hours, NABH registry', icon: Settings, stats: '3 Branches · 5 Ortho Depts' },
    { id: 'roles', title: 'Roles & Permissions', desc: 'Clinical access control, surgeon signoff rights, permission matrix', icon: Shield, stats: '6 Roles · 36 Rules' },
    { id: 'notifications', title: 'Notification Preferences', desc: 'Critical lab alerts, OT emergency beepers, WhatsApp reminders', icon: MessageSquare, stats: '4 Channels · 5 Triggers Active' },
    { id: 'templates', title: 'Template Management', desc: 'Orthopedic consultation, TKR/THR operative & post-op protocols', icon: FileBarChart, stats: '5 Ortho Clinical Protocols' },
    { id: 'integrations', title: 'Integration Settings', desc: 'PACS / DICOM port 104, ABDM Ayushman Bharat, WhatsApp Business', icon: Zap, stats: '4 Systems Online · Ping 12ms' },
    { id: 'audit', title: 'Audit Configuration', desc: 'NABH 7-year audit log retention, 2FA enforcement, SHA-256 hashes', icon: Clock, stats: 'Compliant · 7-Year Retention' },
  ];

  return (
    <div className="page-container space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 page-header">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="page-title">Hospital Settings & System Configuration</h1>
              <span className="badge bg-primary-100 text-primary-800 text-[11px] font-bold">
                Admin Station
              </span>
            </div>
            <p className="page-subtitle">Configure branch parameters, access control matrix, emergency alerts and health integrations</p>
          </div>

          {activeTab !== 'all' && (
            <button
              onClick={() => setActiveTab('all')}
              className="px-3 py-1.5 rounded-lg border border-surface-200 bg-white hover:bg-surface-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Settings Hub</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Save Notification Toast */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveToast}</span>
        </motion.div>
      )}

      {/* Tab Selector Bar if inside a specific section */}
      {activeTab !== 'all' && (
        <div className="card p-2 flex items-center gap-1.5 overflow-x-auto">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5',
                activeTab === sec.id
                  ? 'bg-primary-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-surface-100'
              )}
            >
              <sec.icon className="w-3.5 h-3.5" />
              <span>{sec.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* 1. OVERVIEW HUB */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card-hover p-5 cursor-pointer border border-surface-200 hover:border-primary-400 group transition-all flex flex-col justify-between"
                onClick={() => setActiveTab(section.id)}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="badge text-[10px] bg-surface-100 text-gray-700 font-semibold">
                      {section.stats}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {section.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {section.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-gray-400">Click to configure</span>
                  <span className="font-bold text-primary-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Manage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 2. HOSPITAL CONFIGURATION */}
      {activeTab === 'hospital' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Hospital Legal Identity & Accreditation</h3>
                <p className="text-xs text-gray-500">Official institution credentials printed on discharge summaries and billing receipts</p>
              </div>
              <span className="badge bg-emerald-100 text-emerald-800 text-xs font-bold">NABH Accredited</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Institution Legal Name</label>
                <input
                  type="text"
                  value={hospitalConfig.name}
                  onChange={e => setHospitalConfig({ ...hospitalConfig, name: e.target.value })}
                  className="input-base text-xs w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">NABH / Quality Accreditation Code</label>
                <input
                  type="text"
                  value={hospitalConfig.regNumber}
                  onChange={e => setHospitalConfig({ ...hospitalConfig, regNumber: e.target.value })}
                  className="input-base text-xs w-full font-mono font-bold text-primary-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Emergency Ortho Trauma Hotline</label>
                <input
                  type="text"
                  value={hospitalConfig.emergencyHotline}
                  onChange={e => setHospitalConfig({ ...hospitalConfig, emergencyHotline: e.target.value })}
                  className="input-base text-xs w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Critical Care Ambulance Beeper</label>
                <input
                  type="text"
                  value={hospitalConfig.traumaAmbulance}
                  onChange={e => setHospitalConfig({ ...hospitalConfig, traumaAmbulance: e.target.value })}
                  className="input-base text-xs w-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-surface-100">
              <h4 className="text-xs font-bold text-gray-900 mb-3">Operating Shifts & Hours</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">OPD Outpatient Hours</label>
                  <input
                    type="text"
                    value={`${hospitalConfig.opdStartTime} - ${hospitalConfig.opdEndTime}`}
                    onChange={() => {}}
                    className="input-base text-xs w-full"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">First OT Case Scheduled</label>
                  <input
                    type="text"
                    value={hospitalConfig.otStartTime}
                    onChange={e => setHospitalConfig({ ...hospitalConfig, otStartTime: e.target.value })}
                    className="input-base text-xs w-full"
                  />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="emergencyToggle"
                    checked={hospitalConfig.emergency24x7}
                    onChange={e => setHospitalConfig({ ...hospitalConfig, emergency24x7: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="emergencyToggle" className="text-xs font-bold text-gray-800 cursor-pointer">
                    24/7 Trauma Emergency Open
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-100">
              <button
                onClick={() => showNotification('Hospital configuration saved successfully to central database.')}
                className="btn-primary !py-2 !px-4 !text-xs !rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Hospital Configuration</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. ROLES & PERMISSIONS */}
      {activeTab === 'roles' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Hospital Role-Based Access Control (RBAC)</h3>
                <p className="text-xs text-gray-500">Define clinical authority, digital signature privileges, and financial access per staff tier</p>
              </div>
              <button
                onClick={() => showNotification('Permission matrix saved and synchronized across all logged-in terminals.')}
                className="btn-primary !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-surface-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200 text-gray-600 font-semibold">
                    <th className="py-3 px-4">Hospital Role</th>
                    <th className="py-3 px-3 text-center">View Full EMR</th>
                    <th className="py-3 px-3 text-center">Sign Rx</th>
                    <th className="py-3 px-3 text-center">Book OT</th>
                    <th className="py-3 px-3 text-center">Req Implants</th>
                    <th className="py-3 px-3 text-center">Discharge</th>
                    <th className="py-3 px-3 text-center">View Finance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {Object.entries(rolePermissions).map(([role, perms]) => (
                    <tr key={role} className="hover:bg-surface-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {role}
                      </td>
                      {(['viewEMR', 'signRx', 'bookOT', 'reqImplants', 'discharge', 'viewFinance'] as const).map(perm => {
                        const isGranted = perms[perm];
                        return (
                          <td key={perm} className="py-3 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleTogglePermission(role, perm)}
                              className={cn(
                                'w-6 h-6 rounded-md mx-auto flex items-center justify-center transition-all shadow-2xs',
                                isGranted
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-surface-200 text-gray-400 hover:bg-surface-300'
                              )}
                              title={`${isGranted ? 'Revoke' : 'Grant'} ${perm} for ${role}`}
                            >
                              {isGranted ? <Check className="w-3.5 h-3.5" /> : <X className="w-3 h-3" />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 italic">
              * Note: Surgeons and medical directors retain immutable emergency override rights per hospital bylaws.
            </p>
          </div>
        </motion.div>
      )}

      {/* 4. NOTIFICATION PREFERENCES */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Emergency & Clinical Alert Escalations</h3>
                <p className="text-xs text-gray-500">Configure instant channels for surgical code reds, panic lab values, and patient communications</p>
              </div>
              <button
                onClick={() => showNotification('Test Emergency Beeper triggered: simulated broadcast sent to OT-1 & Duty Station.')}
                className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                <BellRing className="w-3.5 h-3.5 text-red-600" />
                <span>Test Alert Beeper</span>
              </button>
            </div>

            {/* Channels */}
            <div>
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Active Dispatch Channels</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'whatsappEnabled', label: 'WhatsApp Business API', desc: 'Patient reminders & discharge summaries' },
                  { key: 'smsEnabled', label: 'SMS Gateway (Kaleyra)', desc: 'OTP & critical panic alerts' },
                  { key: 'beeperSoundEnabled', label: 'In-App Audio Beeper', desc: 'OT Code Blue & Crash Cart alerts' },
                  { key: 'emailAlertsEnabled', label: 'Hospital Secure SMTP', desc: 'Daily operational & financial audits' },
                ].map(item => {
                  const isChecked = notificationConfig[item.key as keyof typeof notificationConfig];
                  return (
                    <div
                      key={item.key}
                      onClick={() => setNotificationConfig({ ...notificationConfig, [item.key]: !isChecked })}
                      className={cn(
                        'p-3.5 rounded-xl border cursor-pointer transition-all',
                        isChecked ? 'bg-primary-50/50 border-primary-300 ring-1 ring-primary-300' : 'bg-surface-50 border-surface-200 opacity-60'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-900">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-primary-600 rounded"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Triggers */}
            <div className="pt-4 border-t border-surface-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Clinical Trigger Rules</h4>
              {[
                { key: 'criticalLabAlert', title: 'Critical Panic Lab Values', detail: 'Instant alert when Hb < 8.0 g/dL, INR > 3.0, or Platelets < 50,000' },
                { key: 'emergencyOTCodeRed', title: 'OT Emergency Code Red / Code Blue', detail: 'Triggers loud browser beeper sound and alerts all active scrub nurses' },
                { key: 'postOpVitalsAlert', title: 'Post-Op Ward Vitals Deterioration', detail: 'Triggers push notification to Duty Orthopedic Registrar when SpO2 < 92% or BP < 90/60' },
                { key: 'implantStockLowAlert', title: 'Consignment Implant Low Stock (< 2 Units)', detail: 'Alerts Central Sterile Supply and Medical Procurement' },
                { key: 'patient24hReminder', title: '24-Hour Patient Appointment WhatsApp Ping', detail: 'Sends automated directions, appointment slot, and fasting advice to patient' },
              ].map(trig => {
                const isChecked = notificationConfig[trig.key as keyof typeof notificationConfig];
                return (
                  <div key={trig.key} className="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-200">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{trig.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{trig.detail}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationConfig({ ...notificationConfig, [trig.key]: !isChecked })}
                      className={cn(
                        'w-10 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-4',
                        isChecked ? 'bg-primary-600' : 'bg-gray-300'
                      )}
                    >
                      <div className={cn('w-5 h-5 rounded-full bg-white transition-transform', isChecked && 'translate-x-4')} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-3 border-t border-surface-100">
              <button
                onClick={() => showNotification('Notification triggers updated successfully.')}
                className="btn-primary !py-2 !px-4 !text-xs !rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notification Rules</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. TEMPLATE MANAGEMENT */}
      {activeTab === 'templates' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Standardized Orthopedic EMR Protocols</h3>
                <p className="text-xs text-gray-500">Fast clinical documentation templates used during OPD examinations and surgical briefings</p>
              </div>
              <button
                onClick={() => showNotification('Clinical template cloned as draft.')}
                className="btn-primary !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Primary Total Knee Arthroplasty (TKR) Protocol',
                  specialty: 'Adult Reconstruction',
                  uses: '840 Consults',
                  sections: [
                    { heading: 'Physical Exam', body: 'Goniometer ROM Flexion, Medial Joint Line Tenderness, Coronal Deformity (Varus/Valgus), Lachman stability' },
                    { heading: 'Radiographic Criteria', body: 'Kellgren-Lawrence Grade III/IV, Medial joint space collapse, Subchondral sclerosis, Osteophytes' },
                    { heading: 'Surgical Pathway', body: 'Cruciate Retaining (CR) or Posterior Stabilized (PS) implant sizing, Medial parapatellar arthrotomy' },
                  ],
                },
                {
                  title: 'Arthroscopic ACL Reconstruction + Meniscus Protocol',
                  specialty: 'Sports Medicine',
                  uses: '412 Consults',
                  sections: [
                    { heading: 'Physical Exam', body: 'Lachman Test (Grade 1/2/3), Pivot Shift test, McMurray medial/lateral click, Joint effusion fluid tap' },
                    { heading: 'Imaging Criteria', body: 'High-field MRI 1.5T: Complete fiber discontinuity, Bone contusion lateral femoral condyle' },
                    { heading: 'Surgical Pathway', body: 'Quad / Hamstring autograft harvest, Endobutton femoral fixation, Bio-composite tibial interference screw' },
                  ],
                },
                {
                  title: 'Primary Total Hip Arthroplasty (Anterior Approach)',
                  specialty: 'Hip & Pelvis',
                  uses: '320 Consults',
                  sections: [
                    { heading: 'Physical Exam', body: 'Trendelenburg sign, Internal rotation painful restriction, Thomas test for flexion contracture' },
                    { heading: 'Radiographic Criteria', body: 'Tönnis Grade 3, Femoral head collapse, Acetabular subchondral cyst formation' },
                    { heading: 'Surgical Pathway', body: 'Hueter interval direct anterior approach, Hydroxyapatite porous coated femoral stem' },
                  ],
                },
                {
                  title: 'Lumbar Spine Microdiscectomy Protocol',
                  specialty: 'Spine Surgery',
                  uses: '280 Consults',
                  sections: [
                    { heading: 'Physical Exam', body: 'Straight Leg Raise (SLR) positive at 40°, L5/S1 dermatome hypoesthesia, EHL motor weakness' },
                    { heading: 'Imaging Criteria', body: 'MRI Lumbar: Paracentral disc extrusion compressing traversing S1 nerve root' },
                    { heading: 'Surgical Pathway', body: 'Targeted interlaminar flavectomy, microscope-assisted nerve root decompression' },
                  ],
                },
              ].map(tmpl => (
                <div key={tmpl.title} className="p-4 rounded-xl border border-surface-200 bg-surface-50/50 hover:bg-white transition-all space-y-3 shadow-2xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="badge bg-primary-100 text-primary-800 text-[10px] font-bold">{tmpl.specialty}</span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1">{tmpl.title}</h4>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold">{tmpl.uses}</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-600 bg-white p-3 rounded-lg border border-surface-200">
                    {tmpl.sections.slice(0, 2).map((s, idx) => (
                      <div key={idx}>
                        <span className="font-bold text-gray-800">{s.heading}: </span>
                        <span className="text-gray-500 line-clamp-1">{s.body}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-emerald-700 font-semibold">● Active Default</span>
                    <button
                      onClick={() => setPreviewTemplate(tmpl)}
                      className="px-3 py-1 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold flex items-center gap-1 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Protocol</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Modal */}
          {previewTemplate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="badge bg-primary-100 text-primary-800 text-[10px] font-bold">{previewTemplate.specialty}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{previewTemplate.title}</h3>
                  </div>
                  <button onClick={() => setPreviewTemplate(null)} className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs max-h-96 overflow-y-auto">
                  {previewTemplate.sections.map((sec, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <h5 className="font-bold text-slate-900 mb-1">{sec.heading}</h5>
                      <p className="text-slate-600 leading-relaxed">{sec.body}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      showNotification(`Template "${previewTemplate.title}" selected as default.`);
                      setPreviewTemplate(null);
                    }}
                    className="btn-primary !py-1.5 !px-4 !text-xs !rounded-lg"
                  >
                    Set as Primary EMR Default
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* 6. INTEGRATION SETTINGS */}
      {activeTab === 'integrations' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Hospital Medical System Integrations</h3>
                <p className="text-xs text-gray-500">Real-time status of PACS imaging servers, government ABDM health IDs, and laboratory feeds</p>
              </div>
              <span className="badge bg-emerald-100 text-emerald-800 text-xs font-bold">4 Systems Online</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PACS / DICOM */}
              <div className="p-4 rounded-xl border border-surface-200 bg-surface-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">PACS / DICOM Imaging Server</h4>
                      <p className="text-[10px] text-gray-400">Endpoint: pacs.ortho.internal:104 · AE: RASA_ORTHO_PACS</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {pacsStatus === 'testing' ? 'Pinging...' : `Online · ${pacsPing}`}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-surface-200 text-xs">
                  <span className="text-[11px] text-gray-500">Supports Orthanc & DCM4CHEE DICOMweb</span>
                  <button
                    onClick={testPacsConnection}
                    disabled={pacsStatus === 'testing'}
                    className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <RefreshCw className={cn('w-3 h-3', pacsStatus === 'testing' && 'animate-spin')} />
                    <span>{pacsStatus === 'testing' ? 'Testing...' : 'Test Ping'}</span>
                  </button>
                </div>
              </div>

              {/* ABDM */}
              <div className="p-4 rounded-xl border border-surface-200 bg-surface-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Ayushman Bharat Digital Mission (ABDM)</h4>
                      <p className="text-[10px] text-gray-400">ABHA Sandbox Gateway M1, M2, M3 Milestones</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified Active</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-surface-200 text-xs">
                  <span className="text-[11px] text-gray-500">Facility ID: IN3610008491 (Govt. Registry)</span>
                  <span className="text-[10px] text-indigo-700 font-bold">HIP/HIU Active</span>
                </div>
              </div>

              {/* WhatsApp Business API */}
              <div className="p-4 rounded-xl border border-surface-200 bg-surface-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">WhatsApp Business Cloud API</h4>
                      <p className="text-[10px] text-gray-400">Meta Verified Cloud Webhook: 99.98% delivery rate</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-surface-200 text-xs">
                  <span className="text-[11px] text-gray-500">Template Sync: 14 Ortho Notifications Verified</span>
                  <button
                    onClick={() => showNotification('WhatsApp Business Cloud webhook pinged: HTTP 200 OK')}
                    className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs"
                  >
                    Ping Webhook
                  </button>
                </div>
              </div>

              {/* LIS HL7 / FHIR */}
              <div className="p-4 rounded-xl border border-surface-200 bg-surface-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Laboratory Information System (LIS)</h4>
                      <p className="text-[10px] text-gray-400">HL7 v2.5 / FHIR JSON Pathology auto-feed</p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">Streaming Active</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-surface-200 text-xs">
                  <span className="text-[11px] text-gray-500">Auto-links CBC, CRP, Synovial Fluid to EMR</span>
                  <span className="text-[10px] text-amber-700 font-bold">Port 2575 Open</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 7. AUDIT CONFIGURATION */}
      {activeTab === 'audit' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">NABH & HIPAA Medical Legal Security</h3>
                <p className="text-xs text-gray-500">Audit trail preservation, tamper-proof EMR cryptographic logging, and session policies</p>
              </div>
              <button
                onClick={() => showNotification('Exported 1,482 audit events as CSV file (audit_trail_2024_09.csv).')}
                className="btn-primary !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit Trail (CSV)</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Statutory 7-Year Audit Log Retention', desc: 'Mandatory clinical data preservation under Medical Council & NABH regulations', state: 'Enabled (Permanent)', active: true },
                { title: 'Mandatory Two-Factor Authentication (2FA)', desc: 'Surgeons and OT charge nurses must verify biometric/OTP before finalizing surgical operative notes', state: 'Enforced for Clinical Staff', active: true },
                { title: 'Cryptographic SHA-256 Digital Signature Hashing', desc: 'Prevents retroactive modification of prescription orders or goniometer measurements', state: 'Active & Hashing', active: true },
              ].map(sec => (
                <div key={sec.title} className="p-4 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{sec.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{sec.desc}</p>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {sec.state}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-amber-900 font-semibold">Automatic Inactivity Session Lockout Period:</span>
              </div>
              <select className="text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-amber-950 focus:ring-2 focus:ring-primary-500">
                <option value="15">15 Minutes (High Security OPD / OT)</option>
                <option value="30" selected>30 Minutes (Recommended)</option>
                <option value="60">60 Minutes (Administrative)</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
