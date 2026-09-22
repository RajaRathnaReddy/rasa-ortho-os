import { motion } from 'framer-motion';
import {
  CalendarDays, Users, Stethoscope, Syringe, Clock, HeartPulse,
  AlertTriangle, TrendingUp, IndianRupee, Activity, ArrowUpRight,
  ArrowDownRight, CalendarCheck, Dumbbell, ClipboardList, ChevronRight,
  AlertCircle, CheckCircle2, XCircle, Timer, Zap, Bone, Package,
  BedDouble, FileText, CheckSquare, Sparkles, Shield, UserCheck, Plus,
  Search, RefreshCw, Send, Phone, MessageSquare, ShieldCheck, Check, Eye
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '../../lib/cn';
import { formatCurrency, formatTime, formatDate } from '../../lib/formatters';
import {
  mockDashboardStats, mockPatientFlowFunnel, mockCriticalAlerts,
  mockAppointments, mockSurgeries, mockFollowUps, mockDoctors, mockImplants
} from '../../data/mock';
import { APPOINTMENT_STATUS_CONFIG } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { DicomViewerModal } from '../../components/ui/DicomViewerModal';

// ─── Revenue Chart Data (God View) ───
const revenueData = [
  { month: 'Apr', revenue: 8200000 }, { month: 'May', revenue: 9100000 },
  { month: 'Jun', revenue: 10500000 }, { month: 'Jul', revenue: 9800000 },
  { month: 'Aug', revenue: 11200000 }, { month: 'Sep', revenue: 12850000 },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export type RolePerspective =
  | 'super_admin'
  | 'doctor'
  | 'surgeon'
  | 'nurse'
  | 'physiotherapist'
  | 'receptionist'
  | 'inventory_manager';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [perspective, setPerspective] = useState<RolePerspective>('super_admin');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isDicomOpen, setIsDicomOpen] = useState(false);
  const [selectedDicomStudyId, setSelectedDicomStudyId] = useState('xr-knee-01');

  // Auto-switch perspective whenever the user switches role from TopNav
  useEffect(() => {
    if (user?.role === 'doctor') setPerspective('doctor');
    else if (user?.role === 'surgeon') setPerspective('surgeon');
    else if (user?.role === 'nurse') setPerspective('nurse');
    else if (user?.role === 'physiotherapist') setPerspective('physiotherapist');
    else if (user?.role === 'receptionist') setPerspective('receptionist');
    else if (user?.role === 'inventory_manager' || user?.role === 'ot_manager') setPerspective('inventory_manager');
    else setPerspective('super_admin');
  }, [user?.role]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const stats = mockDashboardStats;
  const funnel = mockPatientFlowFunnel;
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = mockAppointments.filter(a => a.date === today).slice(0, 8);

  // ══════════════════════════════════════════════════════════════════
  // ROLE 1: DOCTOR OPD STATE (Dr. Anand K.)
  // ══════════════════════════════════════════════════════════════════
  const [opdQueue, setOpdQueue] = useState([
    { token: 'T-101', name: 'Rajesh Kumar Sharma', age: 58, gender: 'M', complaint: 'Bilateral Knee Pain (OA Gr IV)', waitTime: 'In Cabin', status: 'in_cabin', phone: '+91 98765 01001', lastVisit: '12 Aug 2024: Corticosteroid Inj Right Knee, ROM 95°' },
    { token: 'T-102', name: 'Kavitha Ramachandran', age: 44, gender: 'F', complaint: 'Right Shoulder Rotator Cuff Tear', waitTime: '12m waiting', status: 'waiting', phone: '+91 98765 01002', lastVisit: '04 Sep 2024: USG Shoulder showing Supraspinatus tear' },
    { token: 'T-103', name: 'Suresh Babu Naidu', age: 62, gender: 'M', complaint: 'Post-TKR 6-Wk Recovery Review', waitTime: '25m waiting', status: 'waiting', phone: '+91 98765 01003', lastVisit: '08 Aug 2024: Discharged POD 4, wound healed' },
    { token: 'T-104', name: 'Deepa Venkat', age: 37, gender: 'F', complaint: 'ACL Tear Right Knee', waitTime: 'Arrived', status: 'arrived', phone: '+91 98765 01004', lastVisit: 'New Referral from Sports Physio' },
    { token: 'T-105', name: 'Anil Kumar Reddy', age: 52, gender: 'M', complaint: 'Cervical Radiculopathy', waitTime: 'Arrived', status: 'arrived', phone: '+91 98765 01005', lastVisit: '22 Jul 2024: MRI Cervical spine recommended' },
  ]);
  const [patientSearch, setPatientSearch] = useState('');
  const [pendingReports, setPendingReports] = useState([
    { id: 'rep-1', patient: 'Rajesh Kumar Sharma', test: 'Digital X-Ray Bilateral Knee (AP Standing)', status: 'Pending Review', result: 'Severe medial joint space loss, subchondral sclerosis', priority: 'high' },
    { id: 'rep-2', patient: 'Kavitha Ramachandran', test: 'MRI Right Shoulder High-Res', status: 'Pending Review', result: 'Full thickness supraspinatus tendon tear (1.2cm)', priority: 'high' },
    { id: 'rep-3', patient: 'Suresh Babu Naidu', test: 'Complete Blood Count (CBC) + ESR', status: 'Normal', result: 'WBC 7,400 · ESR 14mm/hr (No infection)', priority: 'normal' },
  ]);

  const callNextPatient = () => {
    const nextWait = opdQueue.find(p => p.status === 'waiting' || p.status === 'arrived');
    if (nextWait) {
      setOpdQueue(prev => prev.map(p => {
        if (p.token === nextWait.token) return { ...p, status: 'in_cabin', waitTime: 'In Cabin' };
        if (p.status === 'in_cabin') return { ...p, status: 'completed', waitTime: 'Completed' };
        return p;
      }));
      showToast(`🔔 Token ${nextWait.token} (${nextWait.name}) called into Cabin 101!`);
    } else {
      showToast('All queued OPD patients have been examined!');
    }
  };

  // ══════════════════════════════════════════════════════════════════
  // ROLE 2: SURGEON OT STATE (Dr. Lakshmi N.)
  // ══════════════════════════════════════════════════════════════════
  const [surgeonCases, setSurgeonCases] = useState([
    {
      id: 'ot-case-1',
      patient: 'Rajesh Kumar Sharma',
      age: 58,
      proc: 'Total Knee Replacement (Left)',
      otRoom: 'OT 1 (Major Joint Suite)',
      slot: '14:30 - 16:30 PM',
      consentSigned: true,
      requiredImplant: 'Zimmer NexGen CR (Sz 4 Femoral / Sz 3 Tibial)',
      implantStockAvailable: true,
      implantReservedLot: 'LOT-ZIM-107 (SN-10042)',
      checklist: { xray: 'done', cbc: 'pending', cardiac: 'scheduled_14:00' }
    },
    {
      id: 'ot-case-2',
      patient: 'Sunita Devi',
      age: 51,
      proc: 'L4-L5 Posterior Lumbar Decompression & Fusion',
      otRoom: 'OT 1 (Spine & Joint)',
      slot: '17:00 - 19:30 PM',
      consentSigned: true,
      requiredImplant: 'Medtronic 6.5x45mm Pedicle Screws (4x) + PEEK Cage',
      implantStockAvailable: true,
      implantReservedLot: 'LOT-SPINE-441 (4 Units Reserved)',
      checklist: { xray: 'done', cbc: 'done', cardiac: 'cleared' }
    },
    {
      id: 'ot-case-3',
      patient: 'Deepa Venkat',
      age: 37,
      proc: 'Diagnostic Knee Arthroscopy & Meniscal Repair',
      otRoom: 'OT 2 (Day Suite)',
      slot: '18:00 - 19:15 PM',
      consentSigned: false,
      requiredImplant: 'Smith & Nephew Fast-Fix 360 Suture Kit',
      implantStockAvailable: true,
      implantReservedLot: 'LOT-SN-882 (Reserved)',
      checklist: { xray: 'done', cbc: 'pending', cardiac: 'cleared' }
    }
  ]);

  // ══════════════════════════════════════════════════════════════════
  // ROLE 3: STAFF NURSE STATE (Nurse Ramya)
  // ══════════════════════════════════════════════════════════════════
  const [wardNurseBeds, setWardNurseBeds] = useState([
    { bed: 'Bed 101-A', patient: 'Rajesh Kumar Sharma', age: 58, proc: 'TKR (POD 2)', bp: '120/80', hr: 74, spo2: '98%', pain: 3, vitalsStatus: 'green', lastLogged: '12:30 PM', dressing: 'Clean', iv: 'NS 50ml/h' },
    { bed: 'Bed 101-B', patient: 'Lakshmi Sundaram', age: 62, proc: 'Hip Hemiarthroplasty (POD 1)', bp: '144/92', hr: 88, spo2: '96%', pain: 6, vitalsStatus: 'amber', lastLogged: '11:15 AM (Due)', dressing: 'Review Due', iv: 'Cefuroxime IV' },
    { bed: 'Bed 102-A', patient: 'Venkat Rao', age: 45, proc: 'ACL Reconstruction (POD 1)', bp: '118/76', hr: 70, spo2: '99%', pain: 2, vitalsStatus: 'green', lastLogged: '13:00 PM', dressing: 'Dry POP', iv: 'Saline Lock' },
    { bed: 'Bed 104-ICU', patient: 'K. Subba Reddy', age: 71, proc: 'Revision Hip (POD 0)', bp: '108/66', hr: 96, spo2: '95%', pain: 7, vitalsStatus: 'red', lastLogged: '13:40 PM (Overdue)', dressing: 'Drain 90ml active', iv: 'Central Line' },
  ]);

  const [nurseMeds, setNurseMeds] = useState([
    { id: 'med-1', bed: 'Bed 101-A', patient: 'Rajesh Kumar Sharma', drug: 'Tab Aceclofenac 100mg + Paracetamol 325mg', time: '14:00 PM', given: false },
    { id: 'med-2', bed: 'Bed 101-A', patient: 'Rajesh Kumar Sharma', drug: 'Cap Pantoprazole 40mg', time: '14:00 PM', given: true },
    { id: 'med-3', bed: 'Bed 101-B', patient: 'Lakshmi Sundaram', drug: 'Inj Enoxaparin 40mg SC (Anticoagulant)', time: '14:00 PM', given: false },
    { id: 'med-4', bed: 'Bed 104-ICU', patient: 'K. Subba Reddy', drug: 'Inj Cefuroxime 1.5g IV Infusion', time: '14:00 PM', given: false },
  ]);

  const administerMed = (id: string, drug: string, patient: string) => {
    setNurseMeds(prev => prev.map(m => m.id === id ? { ...m, given: true } : m));
    showToast(`💉 Administered: ${drug} to ${patient}`);
  };

  // ══════════════════════════════════════════════════════════════════
  // ROLE 4: PHYSIOTHERAPIST STATE (Arun Kumar PT)
  // ══════════════════════════════════════════════════════════════════
  const [physioPatients, setPhysioPatients] = useState([
    {
      id: 'pt-1',
      name: 'Rajesh Kumar Sharma (58M)',
      proc: 'Total Knee Replacement (POD 7)',
      sessionsCompleted: 5,
      totalSessions: 10,
      romGoal: 115,
      maxRom: 135,
      // Trend over sessions requested by user:
      trend: [
        { session: 'S1 (POD 1)', angle: 45 },
        { session: 'S2 (POD 3)', angle: 60 },
        { session: 'S3 (POD 5)', angle: 72 },
        { session: 'S4 (POD 6)', angle: 80 },
        { session: 'S5 (Today)', angle: 88 },
      ],
      currentAngle: 88,
      status: 'on_track'
    },
    {
      id: 'pt-2',
      name: 'Venkat Rao (45M)',
      proc: 'ACL Reconstruction (Week 3)',
      sessionsCompleted: 4,
      totalSessions: 12,
      romGoal: 125,
      maxRom: 140,
      trend: [
        { session: 'S1', angle: 30 },
        { session: 'S2', angle: 55 },
        { session: 'S3', angle: 75 },
        { session: 'S4 (Today)', angle: 92 },
      ],
      currentAngle: 92,
      status: 'on_track'
    },
  ]);

  const [physioReferrals, setPhysioReferrals] = useState([
    { id: 'ref-1', patient: 'Lakshmi Sundaram (62F)', proc: 'Hip Hemiarthroplasty (POD 1)', doctor: 'Dr. Anand K.', note: 'Initiate bed-side ankle pumps, quad sets & assisted walker standing', urgency: 'High' },
    { id: 'ref-2', patient: 'Mohammed Farooq (39M)', proc: 'Ankle Fracture ORIF (POD 1)', doctor: 'Dr. Rajeshwari', note: 'Non-weight bearing crutch training', urgency: 'Normal' },
  ]);

  const [missedSessions, setMissedSessions] = useState([
    { id: 'ms-1', patient: 'Sunita Devi', session: 'Day 14 Post-Spine Rehab', phone: '+91 98765 01008', date: 'Yesterday' }
  ]);

  // ══════════════════════════════════════════════════════════════════
  // ROLE 5: RECEPTIONIST STATE (Priya Rec.)
  // ══════════════════════════════════════════════════════════════════
  const [receptionQueue, setReceptionQueue] = useState([
    { token: 'T-101', patient: 'Rajesh Kumar Sharma', doc: 'Dr. Anand K. (Joint)', time: '09:30 AM', billing: 'Paid (₹1,200 UPI)', billingStatus: 'paid', status: 'In Cabin' },
    { token: 'T-102', patient: 'Kavitha Ramachandran', doc: 'Dr. Anand K. (Joint)', time: '09:45 AM', billing: 'Pending (₹800)', billingStatus: 'pending', status: 'Waiting' },
    { token: 'T-201', patient: 'Sunita Devi', doc: 'Dr. Lakshmi N. (Spine)', time: '09:50 AM', billing: 'Paid (₹1,500 Cash)', billingStatus: 'paid', status: 'In Cabin' },
    { token: 'T-202', patient: 'Anil Kumar Reddy', doc: 'Dr. Lakshmi N. (Spine)', time: '10:15 AM', billing: 'TPA Pre-Auth Approved', billingStatus: 'tpa', status: 'Waiting' },
    { token: 'T-301', patient: 'Mohammed Farooq', doc: 'Dr. K. Rajeshwari (Trauma)', time: '10:30 AM', billing: 'Paid (₹800 Card)', billingStatus: 'paid', status: 'Waiting' },
  ]);

  const collectPayment = (token: string, name: string) => {
    setReceptionQueue(prev => prev.map(q => q.token === token ? { ...q, billing: 'Paid (₹800 Cash)', billingStatus: 'paid' } : q));
    showToast(`💰 Payment collected & receipt generated for ${name} (${token})`);
  };

  // ══════════════════════════════════════════════════════════════════
  // ROLE 6: INVENTORY & OT STATE (Ramesh Inv.)
  // ══════════════════════════════════════════════════════════════════
  const [inventoryStock, setInventoryStock] = useState(mockImplants.slice(0, 8));
  const [reservedImplants, setReservedImplants] = useState([
    { surgery: 'TKR Left (14:30 OT-1)', patient: 'Rajesh Kumar Sharma', doctor: 'Dr. Anand K.', implant: 'Zimmer NexGen CR Femoral Sz 4 + Tibial Sz 3', lot: 'LOT-ZIM-107', status: 'auto_reserved', availableQty: 1 },
    { surgery: 'L4-L5 Lumbar Fusion (17:00 OT-1)', patient: 'Sunita Devi', doctor: 'Dr. Lakshmi N.', implant: 'Medtronic Titanium Pedicle Screws 6.5x45 (4x)', lot: 'LOT-SPINE-441', status: 'auto_reserved', availableQty: 4 },
    { surgery: 'Meniscal Repair (18:00 OT-2)', patient: 'Deepa Venkat', doctor: 'Dr. Lakshmi N.', implant: 'Smith & Nephew Fast-Fix 360 Suture Anchor', lot: 'LOT-SN-882', status: 'auto_reserved', availableQty: 2 },
  ]);

  return (
    <div className="page-container">
      {/* Dynamic Toast Feedback */}
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-gray-700"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </motion.div>
      )}

      {/* Header with All 7 Perspective Selectors */}
      <motion.div className="page-header" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1 flex-wrap">
              <h1 className="page-title text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {perspective === 'super_admin' && 'Hospital Executive Command Center'}
                {perspective === 'doctor' && 'Doctor OPD Clinical Cockpit'}
                {perspective === 'surgeon' && 'Surgeon OT & Pre-Op Command'}
                {perspective === 'nurse' && 'Staff Nurse Ward Station'}
                {perspective === 'physiotherapist' && 'Physiotherapy & ROM Rehab Station'}
                {perspective === 'receptionist' && 'Reception & Unified OPD Queue'}
                {perspective === 'inventory_manager' && 'Implant Stock & Surgical Auto-Reserve'}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/90 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Today
              </span>
            </div>
            <p className="page-subtitle text-xs sm:text-sm text-slate-500">
              {perspective === 'super_admin' && 'Enterprise multi-specialty overview · Hospital-wide KPIs, OT occupancy & revenue'}
              {perspective === 'doctor' && "Today's OPD queue · Patient last-visit summaries · Pending lab/X-ray signoffs · Fast E-Prescriptions"}
              {perspective === 'surgeon' && "Today's scheduled surgeries · Real-time implant stock checks · Pre-op investigation clearances"}
              {perspective === 'nurse' && 'Inpatient bed telemetry · Vitals due flags (Red/Amber/Green) · Scheduled medication rounds'}
              {perspective === 'physiotherapist' && 'Rehab sessions · Multi-session ROM angle progression trends · New inpatient referrals'}
              {perspective === 'receptionist' && "Unified doctor queue · Walk-in token generator · Patient payment/TPA status collection"}
              {perspective === 'inventory_manager' && 'Auto-reserved implants for today OT cases · Batch/Lot traceability · 1-click PO restock'}
            </p>
          </div>

          {/* Quick Perspective Selector Tabs */}
          <div className="flex items-center p-1 bg-slate-100/90 border border-slate-200/80 rounded-xl shadow-xs overflow-x-auto max-w-full gap-0.5 scrollbar-none">
            {[
              { id: 'super_admin', label: 'Executive', icon: Shield },
              { id: 'doctor', label: 'Doctor OPD', icon: Stethoscope },
              { id: 'surgeon', label: 'Surgeon OT', icon: Syringe },
              { id: 'nurse', label: 'Ward Nurse', icon: HeartPulse },
              { id: 'physiotherapist', label: 'Physiotherapist', icon: Dumbbell },
              { id: 'receptionist', label: 'Receptionist', icon: CalendarDays },
              { id: 'inventory_manager', label: 'Inventory & OT', icon: Package },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = perspective === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPerspective(tab.id as RolePerspective)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0',
                    isActive
                      ? 'bg-teal-600 text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  )}
                >
                  <Icon className={cn('w-3 h-3 shrink-0', isActive ? 'text-white' : 'text-slate-500')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 1: SUPER ADMIN ("GOD VIEW")
         ══════════════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 1: SUPER ADMIN ("GOD VIEW")
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'super_admin' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          {/* Executive Top 8 KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            {[
              {
                label: "Today's Appts",
                value: stats.todayAppointments,
                subtext: '18 In-Clinic · 6 Tele',
                icon: CalendarDays,
                color: 'text-blue-600 bg-blue-50',
                borderAccent: 'border-t-blue-500',
                trend: '+12%',
                up: true
              },
              {
                label: 'Waiting Queue',
                value: stats.waitingPatients,
                subtext: 'Avg wait ~11 mins',
                icon: Timer,
                color: 'text-amber-600 bg-amber-50',
                borderAccent: 'border-t-amber-500',
                trend: 'In Cabin',
                up: true
              },
              {
                label: 'Doctors Active',
                value: stats.availableDoctors,
                subtext: '3 Cabins Consulting',
                icon: Stethoscope,
                color: 'text-teal-600 bg-teal-50',
                borderAccent: 'border-t-teal-500',
                trend: '100%',
                up: true
              },
              {
                label: 'Surgeries Today',
                value: stats.todaySurgeries,
                subtext: 'OT 1 & OT 2 Booked',
                icon: Syringe,
                color: 'text-purple-600 bg-purple-50',
                borderAccent: 'border-t-purple-500',
                trend: 'On Track',
                up: true
              },
              {
                label: 'Pending Consult',
                value: stats.pendingConsultations,
                subtext: 'Triage Dossiers Ready',
                icon: ClipboardList,
                color: 'text-indigo-600 bg-indigo-50',
                borderAccent: 'border-t-indigo-500',
                trend: '',
                up: false
              },
              {
                label: 'Follow-Ups Due',
                value: stats.followUpsDueToday,
                subtext: '3 POD-14 Suture',
                icon: CalendarCheck,
                color: 'text-rose-600 bg-rose-50',
                borderAccent: 'border-t-rose-500',
                trend: 'Alert',
                up: false
              },
              {
                label: 'OT Utilization',
                value: `${stats.otUtilization}%`,
                subtext: 'Turnaround: 18m',
                icon: Activity,
                color: 'text-cyan-600 bg-cyan-50',
                borderAccent: 'border-t-cyan-500',
                trend: '+5%',
                up: true
              },
              {
                label: 'Daily Revenue',
                value: formatCurrency(stats.dailyRevenue),
                subtext: '92% Digital UPI/TPA',
                icon: IndianRupee,
                color: 'text-emerald-600 bg-emerald-50',
                borderAccent: 'border-t-emerald-500',
                trend: '+8%',
                up: true
              },
            ].map((kpi) => (
              <motion.div
                key={kpi.label}
                variants={item}
                className={cn(
                  'card p-3.5 border-t-2 bg-white hover:shadow-md transition-all relative group',
                  kpi.borderAccent
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs', kpi.color)}>
                    <kpi.icon className="w-4 h-4" />
                  </div>
                  {kpi.trend && (
                    <span className={cn(
                      'flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                      kpi.up ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    )}>
                      {kpi.trend.includes('%') && (kpi.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />)}
                      {kpi.trend}
                    </span>
                  )}
                </div>
                <p className="text-xl font-extrabold text-slate-900 leading-tight tracking-tight">{kpi.value}</p>
                <p className="text-[11px] font-bold text-slate-700 mt-0.5 truncate">{kpi.label}</p>
                <p className="text-[9.5px] text-slate-400 font-medium truncate mt-0.5">{kpi.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Patient Flow Today + Conversion Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Hospital-Wide Patient Flow Today */}
            <motion.div variants={item} className="card lg:col-span-7 xl:col-span-8 border border-surface-200 overflow-hidden shadow-xs bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-surface-100 bg-slate-50/70 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Hospital-Wide Patient Flow Today</h3>
                    <p className="text-[11px] text-slate-500">Live consult queue, specialist assignments and visit states</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge bg-teal-100/80 text-teal-800 text-xs font-bold border border-teal-200">
                    {todayAppointments.length} Active Consults
                  </span>
                  <button
                    onClick={() => navigate('/appointments')}
                    className="text-xs text-teal-700 font-bold hover:text-teal-900 flex items-center gap-1 cursor-pointer ml-1"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-surface-100 max-h-[380px] overflow-y-auto">
                {todayAppointments.map(apt => {
                  const statusCfg = APPOINTMENT_STATUS_CONFIG[apt.status];
                  const initials = apt.patientName.split(' ').map(n => n[0]).slice(0, 2).join('');
                  return (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/patients/${apt.patientId}`)}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Time Column */}
                        <div className="text-center w-16 shrink-0 bg-slate-100/80 border border-slate-200 px-2 py-1 rounded-lg">
                          <p className="text-xs font-mono font-bold text-slate-800">{formatTime(apt.startTime)}</p>
                        </div>

                        {/* Patient Avatar & Details */}
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                            {apt.patientName}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate font-medium">
                            <span className="text-teal-700 font-semibold">{apt.doctorName}</span> · {apt.reason}
                          </p>
                        </div>
                      </div>

                      {/* Status & Action */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn('badge text-[10px] font-bold px-2 py-0.5 border shadow-2xs', statusCfg.color)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', statusCfg.dot)} />
                          {statusCfg.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Orthopedic Patient Funnel with Conversion Metrics */}
            <motion.div variants={item} className="card lg:col-span-5 xl:col-span-4 p-5 border border-surface-200 shadow-xs bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-teal-600" />
                      Orthopedic Care Funnel
                    </h3>
                    <p className="text-[11px] text-slate-500">Stage conversion rate & leakage tracking</p>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    ₹24.8L Active Pipeline
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {[
                    { label: 'Leads & Enquiries', value: funnel.enquiry, pct: '100%', grad: 'from-blue-500 to-sky-500', barBg: 'bg-blue-500' },
                    { label: 'Appointments Booked', value: funnel.appointment, pct: `${Math.round((funnel.appointment / (funnel.enquiry || 1)) * 100)}% Conv`, grad: 'from-indigo-500 to-blue-600', barBg: 'bg-indigo-500' },
                    { label: 'OPD Consultations', value: funnel.consultation, pct: `${Math.round((funnel.consultation / (funnel.appointment || 1)) * 100)}% Attended`, grad: 'from-purple-500 to-indigo-600', barBg: 'bg-purple-500' },
                    { label: 'Investigations Ordered', value: funnel.investigation, pct: `${Math.round((funnel.investigation / (funnel.consultation || 1)) * 100)}% Scans`, grad: 'from-teal-500 to-emerald-600', barBg: 'bg-teal-500' },
                    { label: 'Treatment Plans Formulated', value: funnel.treatment, pct: `${Math.round((funnel.treatment / (funnel.investigation || 1)) * 100)}% Planned`, grad: 'from-amber-500 to-orange-600', barBg: 'bg-amber-500' },
                    { label: 'Surgeries Performed', value: funnel.surgery, pct: `${Math.round((funnel.surgery / (funnel.treatment || 1)) * 100)}% Operated`, grad: 'from-orange-500 to-rose-600', barBg: 'bg-orange-500' },
                    { label: 'Fully Recovered (POD-90)', value: funnel.recovery, pct: `${Math.round((funnel.recovery / (funnel.surgery || 1)) * 100)}% Success`, grad: 'from-emerald-500 to-teal-600', barBg: 'bg-emerald-600' },
                  ].map((f) => {
                    const widthPct = Math.min(100, Math.round((f.value / (funnel.enquiry || 1)) * 100));
                    return (
                      <div key={f.label} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700 truncate">{f.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-slate-400 font-medium">{f.pct}</span>
                            <span className="font-bold text-slate-900 font-mono w-7 text-right">{f.value}</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                          <div
                            className={cn('h-full rounded-full transition-all duration-500 bg-gradient-to-r', f.grad)}
                            style={{ width: `${Math.max(8, widthPct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Mean Care Cycle: <strong>42 Days</strong></span>
                <span className="text-emerald-700 font-bold">Zero Sepsis / SSI Target Met</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 2: DOCTOR OPD (Dr. Anand K Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'doctor' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* Quick Doctor Banner with Next Token Caller */}
          <div className="card p-4.5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-extrabold text-lg shrink-0">
                AK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">Dr. Anand Krishnamurthy's OPD Cabin 101</h2>
                  <span className="badge bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30 font-bold">Consulting Active</span>
                </div>
                <p className="text-xs text-teal-200">Joint Arthroplasty Lead · 5 Patients in Queue Today</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={callNextPatient}
                className="btn-primary !bg-emerald-500 hover:!bg-emerald-600 !text-white !text-xs !py-2 !px-3.5 shadow-md flex items-center gap-1.5 font-bold"
              >
                <span>🔔 Call Next Token</span>
              </button>
              <button onClick={() => navigate('/consultations')} className="btn-secondary !bg-white/10 !text-white hover:!bg-white/20 !border-white/20 !text-xs !py-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Open Prescription Pad</span>
              </button>
            </div>
          </div>

          {/* 3-Column Doctor Layout: OPD Queue + Last Visit Brief + Pending Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 1. Today's OPD Queue with Wait Times & Pre-Walking Summary (7 cols) */}
            <div className="lg:col-span-7 card overflow-hidden">
              <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-900">Today's OPD Queue (Who's Next)</h3>
                </div>
                <div className="relative w-48">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patient..."
                    value={patientSearch}
                    onChange={e => setPatientSearch(e.target.value)}
                    className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-surface-200 bg-white"
                  />
                </div>
              </div>

              <div className="divide-y divide-surface-100 max-h-[500px] overflow-y-auto">
                {opdQueue
                  .filter(p => !patientSearch || p.name.toLowerCase().includes(patientSearch.toLowerCase()))
                  .map(p => (
                    <div key={p.token} className={cn('p-4 transition-colors', p.status === 'in_cabin' ? 'bg-teal-50/60 border-l-4 border-teal-600' : 'hover:bg-surface-50')}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'font-mono font-bold text-xs px-2 py-0.5 rounded',
                            p.status === 'in_cabin' ? 'bg-teal-600 text-white' : 'bg-surface-200 text-gray-800'
                          )}>
                            {p.token}
                          </span>
                          <span className="font-bold text-sm text-gray-900">{p.name}</span>
                          <span className="text-xs text-gray-400">({p.age}y / {p.gender})</span>
                        </div>

                        <span className={cn(
                          'badge text-[10px] font-bold',
                          p.status === 'in_cabin' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                          p.status === 'waiting' ? 'bg-amber-100 text-amber-800' :
                          p.status === 'completed' ? 'bg-surface-200 text-gray-500' :
                          'bg-blue-100 text-blue-800'
                        )}>
                          {p.waitTime}
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 font-medium mb-1.5">Chief Complaint: {p.complaint}</p>

                      {/* Last Visit Summary Brief */}
                      <div className="p-2.5 rounded-lg bg-surface-100/80 border border-surface-200 text-xs text-gray-600 flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-800 block text-[11px]">Last Visit Summary:</span>
                          <span className="text-[11px] text-gray-600">{p.lastVisit}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs pt-1">
                        <span className="text-[10px] text-gray-400">{p.phone}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate('/consultations')}
                            className="btn-primary !text-xs !py-1 !px-2.5 shadow-2xs"
                          >
                            Examine & Prescribe
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 2. Pending Lab/Imaging Reports + Follow-ups Due (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Pending Lab & Radiology Review Card */}
              <div className="card p-4.5 space-y-3">
                <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-gray-900">Pending Lab & Imaging Review</h3>
                  </div>
                  <span className="badge bg-amber-100 text-amber-800 text-[10px] font-bold">2 Awaiting Signoff</span>
                </div>

                <div className="space-y-2.5">
                  {pendingReports.map(r => (
                    <div key={r.id} className="p-3 rounded-xl border border-surface-200 bg-surface-50 text-xs space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-gray-900">{r.patient}</p>
                        <span className={cn('text-[9px] font-bold px-1.5 py-0.2 rounded', r.status.includes('Pending') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-primary-700">{r.test}</p>
                      <p className="text-[11px] text-gray-600 italic">{r.result}</p>
                      <div className="pt-1 flex items-center justify-between">
                        {r.test.includes('X-Ray') || r.test.includes('MRI') ? (
                          <button
                            onClick={() => {
                              setSelectedDicomStudyId(r.test.includes('MRI') ? 'mr-spine-02' : 'xr-knee-01');
                              setIsDicomOpen(true);
                            }}
                            className="text-[10px] font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Raw Film</span>
                          </button>
                        ) : <span />}
                        <button
                          onClick={() => {
                            setPendingReports(prev => prev.map(item => item.id === r.id ? { ...item, status: 'Reviewed & Signed' } : item));
                            showToast(`✅ Signed off: ${r.test} for ${r.patient}`);
                          }}
                          className="text-[10px] font-bold text-teal-700 hover:underline"
                        >
                          Sign Off & File &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow-ups Due Today */}
              <div className="card p-4.5 space-y-3">
                <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-rose-600" />
                    <h3 className="text-sm font-bold text-gray-900">Follow-Ups Due Today</h3>
                  </div>
                  <span className="badge bg-rose-50 text-rose-700 text-[10px] font-bold">3 Scheduled</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-surface-200 bg-surface-50 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">Suresh Babu Naidu</p>
                      <p className="text-[10px] text-gray-400">Day 45 TKR Review · Check ROM & Wound</p>
                    </div>
                    <button onClick={() => navigate('/consultations')} className="btn-secondary !text-xs !py-1 !px-2">Review</button>
                  </div>
                  <div className="p-2.5 rounded-lg border border-surface-200 bg-surface-50 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">Venkat Rao</p>
                      <p className="text-[10px] text-gray-400">Day 14 Post-ACL · Suture Removal Due</p>
                    </div>
                    <button onClick={() => navigate('/consultations')} className="btn-secondary !text-xs !py-1 !px-2">Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 3: SURGEON OT (Dr. Lakshmi N Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'surgeon' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* OT Theatre Status & Availability Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="card p-4 border-2 border-purple-200 bg-purple-50/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-bold text-xs text-purple-900">OT 1 — Major Joint & Spine Suite</span>
                <span className="badge bg-purple-600 text-white text-[10px] font-bold">Ready 14:30</span>
              </div>
              <p className="text-xs text-gray-600">Current: Finishing Morning Trauma Case · 25m turnaround</p>
            </div>

            <div className="card p-4 border-2 border-emerald-200 bg-emerald-50/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-bold text-xs text-emerald-900">OT 2 — Arthroscopy & Day Care</span>
                <span className="badge bg-emerald-600 text-white text-[10px] font-bold">Available Now</span>
              </div>
              <p className="text-xs text-gray-600">Equipment sterile · HD Tower & Shaver verified</p>
            </div>

            <div className="card p-4 border-2 border-blue-200 bg-blue-50/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono font-bold text-xs text-blue-900">OT 3 — Emergency Trauma</span>
                <span className="badge bg-blue-600 text-white text-[10px] font-bold">Standby</span>
              </div>
              <p className="text-xs text-gray-600">C-Arm ready · Fracture table positioned</p>
            </div>
          </div>

          {/* Detailed Surgeon OT Cases with Pre-Op Investigation & Implant Stock Checks */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Dr. Lakshmi's Surgical Roster Today</h3>
                <p className="text-xs text-gray-400">Pre-op investigation clearances · Consent status · Auto-checked implant reserves</p>
              </div>
              <button onClick={() => navigate('/surgeries')} className="btn-secondary !text-xs !py-1.5">
                Open Kanban Pipeline
              </button>
            </div>

            <div className="divide-y divide-surface-100">
              {surgeonCases.map(s => (
                <div key={s.id} className="p-5 space-y-3.5 hover:bg-surface-50/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-gray-900">{s.proc}</h4>
                        <span className="badge bg-purple-100 text-purple-800 font-bold text-[10px]">{s.slot}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Patient: <strong>{s.patient}</strong> ({s.age}y) · {s.otRoom}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'badge text-xs font-bold px-2.5 py-1',
                        s.consentSigned ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800 animate-pulse'
                      )}>
                        {s.consentSigned ? '✅ Consent Form Signed' : '⚠️ Consent Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Pre-Op Investigation Checks (Requested in user screenshot) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-white border border-surface-200 space-y-1.5">
                      <span className="text-[11px] font-bold text-gray-800 block">Required Pre-Op Investigations</span>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Digital X-Ray / MRI Standing</span>
                          <span className="badge bg-emerald-50 text-emerald-700 text-[10px] font-bold">Completed (Reviewed)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">CBC + Coagulation Profile (PT/INR)</span>
                          <span className={cn('badge text-[10px] font-bold', s.checklist.cbc === 'done' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')}>
                            {s.checklist.cbc === 'done' ? 'Completed' : 'Pending Lab Collection'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Cardiac PAC (ECG + 2D Echo)</span>
                          <span className="badge bg-blue-50 text-blue-700 text-[10px] font-bold">
                            {s.checklist.cardiac === 'cleared' ? 'Cleared by Cardiologist' : 'Scheduled 14:00'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Crucial Orthopedic Implant Stock Verification */}
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Implant Stock Verification (Avoids Mid-Planning Shortage)
                      </span>
                      <p className="text-xs font-semibold text-gray-900">{s.requiredImplant}</p>
                      <div className="p-2 rounded-lg bg-white border border-emerald-200 flex items-center justify-between text-xs">
                        <span className="text-emerald-800 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Physically Present in OT Vault
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">{s.implantReservedLot}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 4: STAFF NURSE (Nurse Ramya Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'nurse' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* Ward Patient List with Vitals Due Flags (Red/Amber/Green) */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Assigned Ward Inpatients (Vitals Due Tracker)</h3>
                <p className="text-xs text-gray-400">Color flags: 🟢 Stable & Up to date · 🟡 Vitals Due · 🔴 Abnormal / Overdue</p>
              </div>
              <span className="badge bg-pink-100 text-pink-800 font-bold text-xs">Shift Nurse: Ramya (Duty 07:00 - 15:00)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-surface-200">
                    <th className="table-cell table-header text-left">Bed</th>
                    <th className="table-cell table-header text-left">Patient</th>
                    <th className="table-cell table-header text-left">Procedure / POD</th>
                    <th className="table-cell table-header text-left">Latest Vitals</th>
                    <th className="table-cell table-header text-left">IV Infusion</th>
                    <th className="table-cell table-header text-left">Wound Dressing</th>
                    <th className="table-cell table-header text-center">Status Flag</th>
                    <th className="table-cell table-header text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wardNurseBeds.map(b => (
                    <tr key={b.bed} className="table-row">
                      <td className="table-cell font-mono font-bold text-xs text-gray-800">{b.bed}</td>
                      <td className="table-cell">
                        <p className="font-bold text-xs text-gray-900">{b.patient}</p>
                        <p className="text-[10px] text-gray-400">{b.age}y</p>
                      </td>
                      <td className="table-cell text-xs font-medium text-gray-800">{b.proc}</td>
                      <td className="table-cell text-xs font-mono text-gray-700">
                        BP {b.bp} · SpO2 {b.spo2} · HR {b.hr}
                      </td>
                      <td className="table-cell text-xs text-gray-600">{b.iv}</td>
                      <td className="table-cell text-xs font-semibold text-gray-700">{b.dressing}</td>
                      <td className="table-cell text-center">
                        <span className={cn(
                          'badge text-[10px] font-bold px-2 py-0.5',
                          b.vitalsStatus === 'green' ? 'bg-emerald-100 text-emerald-800' :
                          b.vitalsStatus === 'amber' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                          'bg-red-500 text-white animate-pulse'
                        )}>
                          {b.vitalsStatus === 'green' ? '🟢 Normal' : b.vitalsStatus === 'amber' ? '🟡 Due Now' : '🔴 Overdue'}
                        </span>
                      </td>
                      <td className="table-cell text-center">
                        <button
                          onClick={() => {
                            setWardNurseBeds(prev => prev.map(item => item.bed === b.bed ? { ...item, vitalsStatus: 'green', lastLogged: 'Just now' } : item));
                            showToast(`✅ Vitals logged for ${b.patient} (${b.bed})`);
                          }}
                          className="btn-secondary !text-xs !py-1 !px-2"
                        >
                          Log Vitals
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Medication Administration Schedule (Matching Rx items from consultation pad) */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-surface-100 pb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">14:00 PM Medication Administration Schedule</h3>
                <p className="text-xs text-gray-400">Matches active doctor E-Prescriptions</p>
              </div>
              <span className="badge bg-emerald-50 text-emerald-700 text-xs font-bold">e-MAR Integrated</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {nurseMeds.map(m => (
                <div key={m.id} className="p-3.5 rounded-xl border border-surface-200 bg-surface-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-primary-700 block">{m.bed} · {m.patient}</span>
                    <p className="font-bold text-gray-900 text-xs mt-0.5">{m.drug}</p>
                    <span className="text-[10px] text-gray-400">{m.time} Scheduled Dose</span>
                  </div>

                  {m.given ? (
                    <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      <Check className="w-3.5 h-3.5" /> Given
                    </span>
                  ) : (
                    <button
                      onClick={() => administerMed(m.id, m.drug, m.patient)}
                      className="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-xs !py-1 !px-2.5 shadow-xs"
                    >
                      Administer Dose
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 5: PHYSIOTHERAPIST (Arun Kumar PT Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'physiotherapist' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* Recovery Progress Tracker with ROM Angle Progression Over Sessions */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Joint Range of Motion (ROM) Multi-Session Progression Trend</h3>
                <p className="text-xs text-gray-400">Tracks angular improvement from Day 1 through rehabilitation completion</p>
              </div>
              <span className="badge bg-amber-100 text-amber-800 text-xs font-bold">Goniometer Tracking Active</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {physioPatients.map(pt => (
                <div key={pt.id} className="p-4 rounded-xl border border-surface-200 bg-surface-50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{pt.name}</h4>
                      <p className="text-xs text-primary-700 font-medium">{pt.proc}</p>
                    </div>
                    <span className="badge bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {pt.sessionsCompleted}/{pt.totalSessions} Sessions Done
                    </span>
                  </div>

                  {/* Multi-Session Trend Bars */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span>Flexion Trend:</span>
                      <span className="text-teal-700 font-bold">{pt.currentAngle}° achieved (Target: {pt.romGoal}°)</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 mb-1.5">
                      {pt.trend.map(t => (
                        <div key={t.session} className="text-center">
                          <div className="h-16 bg-white rounded-lg border border-surface-200 p-1 flex flex-col justify-end items-center relative overflow-hidden">
                            <div
                              className="w-full bg-teal-500 rounded-md transition-all"
                              style={{ height: `${(t.angle / pt.maxRom) * 100}%` }}
                            />
                            <span className="text-[10px] font-bold text-gray-800 mt-1">{t.angle}°</span>
                          </div>
                          <span className="text-[9px] text-gray-400 block mt-1">{t.session.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setPhysioPatients(prev => prev.map(item => item.id === pt.id ? { ...item, currentAngle: item.currentAngle + 4 } : item));
                        showToast(`📈 Logged +4° ROM progress for ${pt.name}!`);
                      }}
                      className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs !py-1 !px-2.5 shadow-2xs"
                    >
                      + Record Today's Angle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Referrals + Missed Session Flags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* New Referrals awaiting First Session */}
            <div className="card p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                <h3 className="text-sm font-bold text-gray-900">New Inpatient Referrals (Awaiting S1)</h3>
                <span className="badge bg-blue-100 text-blue-800 text-[10px] font-bold">2 Referrals</span>
              </div>
              <div className="space-y-2">
                {physioReferrals.map(r => (
                  <div key={r.id} className="p-3 rounded-xl border border-surface-200 bg-surface-50 text-xs space-y-1">
                    <div className="flex justify-between">
                      <p className="font-bold text-gray-900">{r.patient}</p>
                      <span className="badge bg-red-100 text-red-800 text-[9px] font-bold">{r.urgency} Urgency</span>
                    </div>
                    <p className="text-xs text-gray-600">{r.proc} · Ref by {r.doctor}</p>
                    <p className="text-[10px] text-gray-400 italic">{r.note}</p>
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          setPhysioReferrals(prev => prev.filter(x => x.id !== r.id));
                          showToast(`✅ Started Initial Bedside Session for ${r.patient}`);
                        }}
                        className="btn-secondary !text-xs !py-1 !px-2"
                      >
                        Start Session 1
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missed-Session Flags for Automatic Follow-Up */}
            <div className="card p-4.5 space-y-3">
              <div className="flex items-center justify-between border-b border-surface-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-gray-900">Missed Rehab Sessions (Auto-Recall)</h3>
                </div>
                <span className="badge bg-amber-100 text-amber-800 text-[10px] font-bold">Follow-Up Required</span>
              </div>
              <div className="space-y-2">
                {missedSessions.map(m => (
                  <div key={m.id} className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 text-xs space-y-1.5">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900">{m.patient}</p>
                      <span className="badge bg-amber-200 text-amber-900 text-[9px] font-bold">Missed {m.date}</span>
                    </div>
                    <p className="text-xs text-gray-600">{m.session}</p>
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => showToast(`📲 WhatsApp recovery reminder sent to ${m.patient} (${m.phone})`)}
                        className="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-xs !py-1 !px-2.5 shadow-2xs flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Send WhatsApp Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 6: RECEPTIONIST (Front Desk Priya Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'receptionist' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-surface-100 bg-surface-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Unified Today's Queue (All Specialists)</h3>
                <p className="text-xs text-gray-400">Real-time payment collection · Check-ins · Rescheduling</p>
              </div>
              <button onClick={() => navigate('/reception')} className="btn-primary !text-xs !py-1.5 self-start">
                + Walk-In Registration
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-surface-200">
                    <th className="table-cell table-header text-left">Token</th>
                    <th className="table-cell table-header text-left">Patient Name</th>
                    <th className="table-cell table-header text-left">Doctor & Specialization</th>
                    <th className="table-cell table-header text-left">Slot</th>
                    <th className="table-cell table-header text-left">Payment / TPA Status</th>
                    <th className="table-cell table-header text-center">Status</th>
                    <th className="table-cell table-header text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receptionQueue.map(q => (
                    <tr key={q.token} className="table-row">
                      <td className="table-cell font-mono font-bold text-xs text-primary-700">{q.token}</td>
                      <td className="table-cell font-bold text-xs text-gray-900">{q.patient}</td>
                      <td className="table-cell text-xs text-gray-700">{q.doc}</td>
                      <td className="table-cell text-xs font-bold text-gray-600">{q.time}</td>
                      <td className="table-cell">
                        <span className={cn(
                          'badge text-[10px] font-bold',
                          q.billingStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                          q.billingStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-purple-100 text-purple-800'
                        )}>
                          {q.billing}
                        </span>
                      </td>
                      <td className="table-cell text-center">
                        <span className={cn('badge text-[10px] font-semibold', q.status === 'In Cabin' ? 'bg-emerald-50 text-emerald-700' : 'bg-surface-100 text-gray-600')}>
                          {q.status}
                        </span>
                      </td>
                      <td className="table-cell text-center">
                        {q.billingStatus === 'pending' ? (
                          <button
                            onClick={() => collectPayment(q.token, q.patient)}
                            className="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-xs !py-1 !px-2 shadow-2xs"
                          >
                            Collect ₹800
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400">Receipt Issued</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PERSPECTIVE 7: INVENTORY & OT (Ramesh Inv. Style)
         ══════════════════════════════════════════════════════════════════ */}
      {perspective === 'inventory_manager' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
          {/* Upcoming Surgeries with Auto-Reserved Implant Vault */}
          <div className="card p-5 space-y-4 border-2 border-emerald-300 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
            <div className="flex items-center justify-between border-b border-surface-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Auto-Reserved Implants for Scheduled OT Surgeries
                </h3>
                <p className="text-xs text-gray-500">Auto-allocated stock guarantees implants are physically ready before patient wheels in</p>
              </div>
              <span className="badge bg-emerald-600 text-white font-bold text-xs">100% Stock Allocated</span>
            </div>

            <div className="space-y-2.5">
              {reservedImplants.map(r => (
                <div key={r.surgery} className="p-3.5 rounded-xl bg-white border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{r.surgery} · {r.patient}</span>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">{r.implant}</p>
                    <p className="text-[10px] text-gray-400">Surgeon: {r.doctor} · Batch/Lot: {r.lot}</p>
                  </div>
                  <span className="badge bg-emerald-100 text-emerald-800 font-bold text-xs whitespace-nowrap self-start md:self-auto">
                    ✅ 1 Unit Auto-Reserved in OT-1 Safe
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Stock Levels with Lot Tracking & 1-Click PO Restock */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-surface-100 bg-surface-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Current Orthopedic Prosthesis & Hardware Vault</h3>
              <button onClick={() => navigate('/implants')} className="btn-secondary !text-xs !py-1.5">
                Full Implants Vault
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-surface-200">
                    <th className="table-cell table-header text-left">Implant & Model</th>
                    <th className="table-cell table-header text-left">Manufacturer</th>
                    <th className="table-cell table-header text-left">Batch / Lot</th>
                    <th className="table-cell table-header text-left">Stock Level</th>
                    <th className="table-cell table-header text-right">Cost</th>
                    <th className="table-cell table-header text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryStock.map(item => {
                    const isLow = item.stock <= item.minStock;
                    return (
                      <tr key={item.id} className="table-row">
                        <td className="table-cell font-bold text-xs text-gray-900">{item.model}</td>
                        <td className="table-cell text-xs text-gray-600">{item.manufacturer}</td>
                        <td className="table-cell text-xs font-mono text-gray-500">{item.lotNumber}</td>
                        <td className="table-cell">
                          <span className={cn(
                            'badge text-xs font-bold px-2 py-0.5',
                            isLow ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800'
                          )}>
                            {isLow ? `🚨 ${item.stock} left (Critical)` : `✅ ${item.stock} in stock`}
                          </span>
                        </td>
                        <td className="table-cell text-right text-xs font-semibold text-gray-800">{formatCurrency(item.cost)}</td>
                        <td className="table-cell text-center">
                          <button
                            onClick={() => {
                              setInventoryStock(prev => prev.map(i => i.id === item.id ? { ...i, stock: i.stock + 4 } : i));
                              showToast(`⚡ Generated Reorder PO (+4 units) for ${item.model}`);
                            }}
                            className="btn-secondary !text-xs !py-1 !px-2.5 shadow-2xs"
                          >
                            + Reorder PO
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Full-Res Lightbox DICOM Modal */}
      <DicomViewerModal
        isOpen={isDicomOpen}
        onClose={() => setIsDicomOpen(false)}
        initialStudyId={selectedDicomStudyId}
      />
    </div>
  );
}
