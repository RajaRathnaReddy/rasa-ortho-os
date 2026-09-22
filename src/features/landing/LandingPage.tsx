import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity, Shield, Stethoscope, Syringe, Sparkles, ArrowRight,
  CheckCircle2, Lock, Eye, Zap, Layers, Cpu, HeartPulse, Bone,
  Clock, Award, BarChart3, Database, FileText, ChevronRight,
  ShieldCheck, Dumbbell, IndianRupee, Scan, MonitorSmartphone,
  Brain, UserCheck, HeartHandshake
} from 'lucide-react';
import type { UserRole } from '../../types';
import { cn } from '../../lib/cn';

interface StationPreview {
  id: string;
  name: string;
  category: string;
  icon: any;
  summary: string;
  highlights: string[];
  sampleStats: { label: string; value: string }[];
  targetRole: UserRole;
  badge: string;
}

const TOOL_STATIONS: StationPreview[] = [
  {
    id: 'doctor',
    name: 'Doctor OPD Clinical Station',
    category: 'Consultation & Goniometry',
    icon: Stethoscope,
    badge: 'Real-time Queue',
    summary: 'Clinical consultation pad with integrated pre-consult briefs, Kellgren-Lawrence grading, past visit history, and instant digital E-Prescriptions.',
    highlights: [
      '1-Click Clinical Archetype Presets (Knee OA, Lumbar Sciatica, Rotator Cuff)',
      'Pre-Consult Triage Dossier with VAS Pain Trajectory (1-10)',
      'Direct 1-Click Launch into Zero-Footprint PACS DICOM Viewer',
      'Instant WHO Investigation Requisitions & Surgery Booking'
    ],
    sampleStats: [
      { label: 'OPD Queue Avg Wait', value: '11 mins' },
      { label: 'Documentation Time', value: '-65% faster' },
      { label: 'Diagnostic Speed', value: '< 1 sec' },
    ],
    targetRole: 'doctor',
  },
  {
    id: 'pacs',
    name: 'Zero-Footprint PACS DICOM Node',
    category: 'Radiology & Imaging',
    icon: Activity,
    badge: '3.0T MRI & Digital X-Ray',
    summary: 'Browser-native high-resolution DICOM radiograph and MRI viewer. Allows orthopedic surgeons to inspect standing knee radiographs and spine scans without installing local thick clients.',
    highlights: [
      'Interactive Windowing (Bone vs Soft Tissue presets)',
      'Cobb Angle Scoliosis & Knee Varus/Valgus Alignment Tools',
      'Full Viewport Pan, Smooth Zoom & Invert Contrasting',
      'Cloud PACS Sync with hospital DICOM Archive (C-STORE / WADO)'
    ],
    sampleStats: [
      { label: 'DICOM Load Speed', value: '0.4s' },
      { label: 'Resolution Support', value: 'Up to 4K' },
      { label: 'Diagnostic Accuracy', value: '100% Native' },
    ],
    targetRole: 'doctor',
  },
  {
    id: 'ot_implants',
    name: 'OT Suite & Surgical Implant Bank',
    category: 'Surgery & Sterilization',
    icon: Bone,
    badge: 'GS1 Barcode Traceability',
    summary: 'End-to-end operation theatre block manager and sterile implant reserve bank. Tracks Zimmer Biomet NexGen, DePuy Synthes Attune, and Stryker components with batch and lot serial traceability.',
    highlights: [
      'Real-Time Implant Sterility & Shelf-Life Barcode Audits',
      'Pre-Op PAC Anesthesia Checklist & 2D-ECHO Clearances',
      'Automated Restock Purchase Orders upon OT Consumption',
      'Laminar Airflow Positive Pressure & Autoclave Log Verification'
    ],
    sampleStats: [
      { label: 'Implant Traceability', value: '100% GS1' },
      { label: 'Room Turnover', value: '18.4 mins' },
      { label: 'SSI Infection Rate', value: '0.00%' },
    ],
    targetRole: 'surgeon',
  },
  {
    id: 'ai_sentinel',
    name: 'Autonomous AI Command Center',
    category: 'Predictive Intelligence',
    icon: Brain,
    badge: '6 Specialized Agents',
    summary: 'Multi-agent clinical intelligence network monitoring hospital operations. Features autonomous front-desk token triage, post-op POD-14 suture sentinels, multilingual voice IVR, and implant depletion forecasters.',
    highlights: [
      'Post-Op POD-14 Suture Removal & Erythema Sentinel',
      'Autonomous Cabin Queue Balancing across Rooms 101-103',
      'Multilingual IVR Tele-Nurse (Telugu, Tamil, Kannada, Hindi)',
      'Clinical Copilot Grounded in EMR & Orthopedic Protocols'
    ],
    sampleStats: [
      { label: 'Active AI Models', value: '6 Agents' },
      { label: 'Inference Latency', value: '<240ms' },
      { label: 'Suture Alert Catch', value: '99.8%' },
    ],
    targetRole: 'super_admin',
  },
  {
    id: 'rehab',
    name: 'Physiotherapy & ROM Tracker',
    category: 'Rehab & Goniometry',
    icon: Dumbbell,
    badge: 'Flexion/Extension Milestones',
    summary: 'Multi-session joint angle rehabilitation tracking. Visualizes flexion and extension degree progressions from Post-Op Day 1 walker mobilization to full active recovery.',
    highlights: [
      'Multi-Session Joint Goniometry Degree Curves',
      'Quadriceps Lag & Antalgic Gait Anomaly Detection',
      'Automated WhatsApp Video Exercise Reminders',
      'Patient Adherence Scoring & Inpatient Bed Referral Link'
    ],
    sampleStats: [
      { label: 'Mean TKR ROM', value: '118° Active' },
      { label: 'Adherence Rate', value: '94.2%' },
      { label: 'Recovery Period', value: '42 Days' },
    ],
    targetRole: 'physiotherapist',
  },
  {
    id: 'executive',
    name: 'Hospital Executive Command Center',
    category: 'Enterprise Analytics',
    icon: Shield,
    badge: 'Super Admin "God View"',
    summary: 'Hospital-wide operational cockpit monitoring today\'s consults, OT occupancy rates, follow-ups due, daily revenue collections, and orthopedic patient conversion funnels.',
    highlights: [
      'Real-Time 8-Metric Hospital Pulse (Queue, OTs, Census, Revenue)',
      'Hospital-Wide Patient Flow with Doctor Status Telemetry',
      'Orthopedic Funnel Tracking Inquiry-to-Recovery Conversion',
      'Role Switcher to Inspect Any Staff Station in 1-Click'
    ],
    sampleStats: [
      { label: 'OT Utilization', value: '91.4%' },
      { label: 'Daily Collection', value: '₹4.85L+' },
      { label: 'Active Pipeline', value: '₹24.8 Lakh' },
    ],
    targetRole: 'super_admin',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState<StationPreview>(TOOL_STATIONS[0]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-500 selection:text-white relative overflow-x-hidden font-sans">
      {/* Background Soft Ambience Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-teal-200/25 blur-[140px]" />
        <div className="absolute top-[35%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-200/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[650px] h-[650px] rounded-full bg-emerald-200/20 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* ═══ CLEAN MODERN TOP NAVIGATION HEADER ═══ */}
      <header className="relative z-30 border-b border-surface-200 bg-white/90 backdrop-blur-md sticky top-0 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Product Badge */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-md text-white font-black text-xl border border-teal-500/30 shrink-0">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  RASA ORTHO OS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold">
                  v2.4 ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                Intelligent Hospital Operating System
              </p>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#tool-architecture" className="hover:text-teal-700 transition-colors">Tool Architecture</a>
            <a href="#interactive-stations" className="hover:text-teal-700 transition-colors">Clinical Stations</a>
            <a href="#core-capabilities" className="hover:text-teal-700 transition-colors">Core Modules</a>
            <a href="#security-standards" className="hover:text-teal-700 transition-colors">Compliance & Security</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/login')}
              className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !font-bold !text-xs !py-2 !px-4 shadow-sm rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authorized Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT CONTAINER ═══ */}
      <main className="relative z-10 space-y-20 pb-20">
        {/* HERO SECTION */}
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Built Exclusively for Orthopedic Hospitals, Joint Centers & Trauma Suites</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto"
          >
            The Specialized Operating System for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
              Modern Orthopedic Care.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal"
          >
            A unified clinical operating system eliminating disjointed paper charts and generic EMRs. Seamlessly combines 
            <strong> Clinical OPD Triage</strong>, <strong>Zero-Footprint Web PACS Imaging</strong>, 
            <strong> Laminar Airflow OT Scheduling</strong>, <strong>GS1 Implant Traceability</strong>, 
            <strong> Multi-Session Goniometry</strong>, and <strong>Autonomous Clinical AI Sentinels</strong>.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => navigate('/login')}
              className="py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md shadow-teal-600/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Hospital Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#interactive-stations"
              className="py-3.5 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border border-slate-200 shadow-xs flex items-center gap-2 cursor-pointer transition-all hover:border-slate-300"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Explore Clinical Modules</span>
            </a>
          </motion.div>

          {/* ═══ TOOL ARCHITECTURE CORE METRICS (NO 4 BRANCHES!) ═══ */}
          <motion.div
            id="tool-architecture"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6 max-w-5xl mx-auto text-left"
          >
            {[
              { value: '0.4s', label: 'DICOM PACS Latency', desc: 'Zero-footprint 3.0T MRI & standing X-ray render', color: 'text-teal-700' },
              { value: '100%', label: 'GS1 Implant Traceability', desc: 'Zimmer NexGen & DePuy batch/lot tracking', color: 'text-emerald-700' },
              { value: '6 Agents', label: 'Autonomous AI Sentinels', desc: 'POD-14 suture tracking & cabin balancing', color: 'text-violet-700' },
              { value: '0.00%', label: 'Target Surgical Site Sepsis', desc: 'Sterility & laminar positive pressure audit', color: 'text-blue-700' },
              { value: '14-Day', label: 'Automated Recovery Loop', desc: 'WhatsApp tele-rehab & ROM angle curve', color: 'text-amber-700' },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 transition-all">
                <p className={cn('text-2xl font-black font-mono', kpi.color)}>{kpi.value}</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{kpi.label}</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-snug">{kpi.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══ INTERACTIVE TOOL STATION WORKBENCH SHOWCASE ═══ */}
        <section id="interactive-stations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              INTERACTIVE TOOL STATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              A Purpose-Built Station for Every Clinical Role
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select any station below to explore its live clinical architecture, specialized tooling, and diagnostic metrics.
            </p>
          </div>

          {/* Station Switcher Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TOOL_STATIONS.map(st => {
              const Icon = st.icon;
              const isSelected = selectedStation.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border shadow-2xs shrink-0',
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-slate-500')} />
                  <span>{st.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Station Display Card */}
          <motion.div
            key={selectedStation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold">
                  {selectedStation.category}
                </span>
                <span className="badge bg-slate-100 text-slate-700 text-[10px] font-bold">
                  ● {selectedStation.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedStation.name}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedStation.summary}
                </p>
              </div>

              {/* Station Highlights */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Core Tool Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedStation.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !font-bold !text-xs !py-3 !px-5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign In to Access {selectedStation.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Station Telemetry Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-slate-800 space-y-5 text-left shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                    <selectedStation.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">Station Architecture</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OPERATIONAL
                </span>
              </div>

              <div className="space-y-3">
                {selectedStation.sampleStats.map((st, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-slate-300 font-medium">{st.label}</span>
                    <span className="text-sm font-mono font-bold text-teal-300">{st.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero-Loss Clinical Audit Trail Enabled</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Role-Based Access Control (RBAC) Enforced</span>
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ THE 6 PILLARS OF ORTHOPEDIC CARE ═══ */}
        <section id="core-capabilities" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              TOOL MODULES & CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Six Integrated Pillars of Orthopedic Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              RASA ORTHO OS replaces fragmented point-solutions with an interoperable hospital operating suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {[
              {
                icon: UserCheck,
                color: 'text-teal-600 bg-teal-50 border-teal-200',
                title: 'Clinical OP Intake & Triage',
                desc: 'Digital walk-in token dispensing with automated Kellgren-Lawrence grade tags, pain VAS 1-10 slider, mobility impairment notes, and red-flag allergies.',
                features: ['1-Click Ortho Presets', 'Doctor Cabin Wait Estimator', 'Pre-Consult Dossier Generator']
              },
              {
                icon: Activity,
                color: 'text-blue-600 bg-blue-50 border-blue-200',
                title: 'Integrated PACS DICOM Viewer',
                desc: 'Zero-footprint web medical viewer. Windowing presets, Cobb angle spine calculation, joint space measurement, and digital standing radiographs.',
                features: ['Bone vs Soft Tissue Presets', 'Cobb Angle Scoliosis', 'Lossless In-Browser Zoom']
              },
              {
                icon: Bone,
                color: 'text-purple-600 bg-purple-50 border-purple-200',
                title: 'OT & Implant Sterile Bank',
                desc: 'Full GS1 barcode traceability for Zimmer NexGen, DePuy Attune, and Corail implants. Autoclave cycle records and surgical safety checklists.',
                features: ['Batch & Lot Serial Barcodes', 'Turnaround Optimization', 'Auto-Reserve for OTs']
              },
              {
                icon: Brain,
                color: 'text-violet-600 bg-violet-50 border-violet-200',
                title: 'Autonomous AI Sentinels',
                desc: 'Six specialized clinical AI agents detecting overdue POD-14 suture removals, delayed recovery trajectories, implant stockouts, and multilingual voice bookings.',
                features: ['POD-14 Suture Sentinel', 'Indic Tele-Nurse IVR', 'Clinical Copilot Chat']
              },
              {
                icon: Dumbbell,
                color: 'text-amber-600 bg-amber-50 border-amber-200',
                title: 'Goniometry & Tele-Rehab',
                desc: 'Multi-session joint angle rehabilitation tracking. Visualizes flexion and extension degree progressions from Day 1 post-op walker to full recovery.',
                features: ['Flexion/Extension Progress', 'Quadriceps Lag Detector', 'WhatsApp Video Exercise Nudges']
              },
              {
                icon: HeartHandshake,
                color: 'text-rose-600 bg-rose-50 border-rose-200',
                title: 'TPA Cashless Pre-Auth & Billing',
                desc: 'Instant pre-authorization tracking with Star Health, HDFC ERGO, and MediAssist. Automated surgical package tariff breakdowns and GST invoicing.',
                features: ['TPA Cashless Approval Pipeline', 'Implant Itemized GST Invoice', 'Audit Log Trail']
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all space-y-4 text-left group"
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border shadow-2xs', pillar.color)}>
                  <pillar.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-medium">
                  {pillar.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ INSTITUTIONAL COMPLIANCE & SECURITY BANNER ═══ */}
        <section id="security-standards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 text-left relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">
                  HEALTHCARE ENTERPRISE SECURITY
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Engineered for Strict Clinical Hospital Compliance
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  RASA ORTHO OS enforces zero-trust architecture, encrypted medical image streaming, and immutable institutional audit trails.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary !bg-teal-500 hover:!bg-teal-600 !text-slate-950 !font-black !text-xs !py-3 !px-5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-950" />
                  <span>Access Secure Portal</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'NABH Digital Standards', desc: 'Hospital accreditation compliant medical records' },
                { title: 'HIPAA 256-Bit AES', desc: 'Encrypted patient health data at rest & transit' },
                { title: 'HL7 FHIR v4 Node', desc: 'Interoperable hospital diagnostic data exchange' },
                { title: 'DISHA Health Guidelines', desc: 'Data privacy and patient consent frameworks' },
              ].map((cert, ci) => (
                <div key={ci} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-teal-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold text-white">{cert.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ CLEAN ENTERPRISE FOOTER ═══ */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-left">
            <div className="w-6 h-6 rounded-lg bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
              R
            </div>
            <p className="font-semibold text-slate-700">
              © 2026 RASA ORTHO OS — Intelligent Hospital Operating System.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>PACS DICOM v3.0</span>
            <span>•</span>
            <span>HL7 FHIR Certified</span>
            <span>•</span>
            <span>GS1 Healthcare Barcoding</span>
            <span>•</span>
            <button
              onClick={() => navigate('/login')}
              className="text-teal-700 font-bold hover:underline cursor-pointer"
            >
              Sign In to Hospital Portal →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
