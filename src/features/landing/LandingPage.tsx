import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Shield, Activity, Syringe, Bone, Dumbbell, IndianRupee, Clock,
  CheckCircle2, Sparkles, Lock, ArrowRight, UserCheck, Flame, FileText,
  ShieldCheck, Award, HeartHandshake, Laptop, Database, ChevronRight,
  Microscope, Building2, Users, FileCheck, Layers, Cpu, Eye, Check,
  ExternalLink, BarChart3, TrendingUp, PhoneCall, HelpCircle, ArrowUpRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../../lib/cn';

interface ModulePreview {
  id: string;
  name: string;
  badge: string;
  icon: any;
  headline: string;
  description: string;
  kpis: { label: string; value: string }[];
  highlights: string[];
}

const CLINICAL_MODULES: ModulePreview[] = [
  {
    id: 'triage',
    name: 'OPD Queue & Goniometry',
    badge: 'Front-Desk & Clinical Triage',
    icon: Stethoscope,
    headline: 'High-Throughput Orthopedic Triage & Digital Goniometry',
    description: 'Eliminates paper tokens and clipboard chaos. Captures joint range of motion (ROM), pain VAS scores, walking mobility limp analysis, and pre-consult doctor briefs within 90 seconds of patient arrival.',
    kpis: [
      { label: 'Avg Triage Time', value: '85 sec' },
      { label: 'OPD Wait Reduction', value: '-42%' },
      { label: 'Daily Outpatients', value: '260+' },
    ],
    highlights: [
      'Digital radial arc goniometer recording passive/active joint flexion',
      'Instant clinical summary brief delivered to consulting doctor cabin',
      'Walk-in triage token generation with SMS queue notification',
      'Emergency red flag triage: acute locked knee, suspected compartment syndrome',
    ],
  },
  {
    id: 'pacs',
    name: 'PACS DICOM Imaging',
    badge: 'Zero-Latency WebGL PACS',
    icon: Activity,
    headline: 'Zero-Footprint WebGL Orthopedic Radiograph & MRI Suite',
    description: 'Instant cloud PACS rendering of standing knee radiographs, spine Cobb angle alignments, and 3.0T MRI DICOM slices directly in the browser without third-party workstation delays.',
    kpis: [
      { label: 'Render Latency', value: '<250 ms' },
      { label: 'DICOM Resolution', value: '4K Lossless' },
      { label: 'Templates Available', value: '180+ Prostheses' },
    ],
    highlights: [
      'Interactive digital caliper, Cobb angle, and joint space ratio measurement',
      'Pre-op digital templating for Zimmer NexGen, Stryker Triathlon & DePuy stems',
      'Windowing presets: Bone window, Soft tissue window, High-contrast radiograph',
      'Multi-planar reconstruction (MPR) and side-by-side post-op comparison',
    ],
  },
  {
    id: 'ot',
    name: 'OT & Implant Registry',
    badge: 'Laminar Airflow Theatre',
    icon: Syringe,
    headline: 'Laminar Airflow OT Scheduling & GS1 Implant Barcode Verification',
    description: 'Complete operational mastery over surgical theatres. Enforces WHO surgical safety verification, pre-op PAC clearance, anesthesia checks, and point-of-care implant lot tracking.',
    kpis: [
      { label: 'SSI Infection Rate', value: '0.00%' },
      { label: 'OT Turnaround', value: '28 min' },
      { label: 'Implant Accuracy', value: '100% Barcoded' },
    ],
    highlights: [
      'Point-of-incision GS1 barcode scanning for femoral, tibial, and poly inserts',
      'Real-time laminar air HEPA filter pressure and sterility monitoring',
      'Automated implant consumption decrement from hospital central stores',
      'Integrated surgeon operative note generator with implant sticker logs',
    ],
  },
  {
    id: 'rehab',
    name: 'Physiotherapy & Rehab',
    badge: 'Continuous Recovery Tracking',
    icon: Dumbbell,
    headline: 'Protocolized Post-Op Recovery & Knee Society Score Progression',
    description: 'Tracks day-by-day mobilization from Post-Op Day 1 walker gait training to 120° active knee flexion. Generates objective rehabilitation milestones and alerts surgeons to flexion delays.',
    kpis: [
      { label: 'Mean Flexion at W6', value: '118.5°' },
      { label: 'Adherence Rate', value: '94.2%' },
      { label: 'Protocol Library', value: '24 Joint Pathways' },
    ],
    highlights: [
      'Visual flexion progression charts compared against standard arthroplasty curves',
      'Knee Society Score (KSS) and Oxford Knee Score (OKS) digital assessments',
      'Automated patient exercise reminders delivered via WhatsApp in regional languages',
      'Direct physiotherapist-to-surgeon flag for suspected arthrofibrosis',
    ],
  },
  {
    id: 'finance',
    name: 'Finance & TPA Cashless',
    badge: 'Revenue Cycle Engine',
    icon: IndianRupee,
    headline: 'Real-Time TPA Cashless Insurance & Itemized Tax Invoicing',
    description: 'Empowers billing departments with instant pre-auth submission, IRDAI ROHINI code verification, cashless claim packet bundling, and automated patient co-pay calculations.',
    kpis: [
      { label: 'First-Pass Approval', value: '98.7%' },
      { label: 'Claims Realized', value: '₹18.4 Cr' },
      { label: 'TPA Settlement Time', value: '4.2 Days' },
    ],
    highlights: [
      'Pre-configured packages for Bilateral TKR, Unilateral THR, and Arthroscopy',
      'Seamless claim packets with attached OT notes, implant invoice, and pre/post X-rays',
      'Live claim status tracking across Star Health, HDFC ERGO, ICICI Lombard & CGHS',
      'Compliant GST tax invoices with itemized implant, bed, OT, and pharmacy split',
    ],
  },
];

const SPECIALTIES = [
  {
    title: 'Joint Replacement & Arthroplasty',
    subtitle: 'Primary & Complex Revision TKR / THR',
    desc: 'Comprehensive digital clinical workflows for cruciate-retaining (CR), posterior-stabilized (PS), and dual-mobility hip implants with pre-op templating.',
    icon: Bone,
    stats: '1,420+ Surgeries',
    features: ['Robotic surgical alignment', 'Zimmer & Stryker digital templates', '6-week flexion recovery protocol'],
  },
  {
    title: 'Arthroscopy & Sports Medicine',
    subtitle: 'Knee, Shoulder & Ankle Sports Reconstruction',
    desc: 'High-definition video-assisted arthroscopy workflows for ACL/PCL hamstring graft reconstructions, meniscal repair, and rotator cuff repairs.',
    icon: Activity,
    stats: '680+ Procedures',
    features: ['Graft tensioning log', 'Daycare discharge protocol', 'Accelerated return-to-sport testing'],
  },
  {
    title: 'Spine Surgery & Deformity',
    subtitle: 'Minimally Invasive Spine & Scoliosis Correction',
    desc: 'Precision navigation tracking for pedicle screw placement, lumbar microdiscectomies, TLIF procedures, and multi-level scoliosis Cobb angle correction.',
    icon: Stethoscope,
    stats: '340+ Cases',
    features: ['Cobb angle analytics', 'Neuromonitoring logs', 'Zero-footprint bone graft tracking'],
  },
  {
    title: 'Complex Orthopedic Trauma',
    subtitle: 'High-Velocity Fractures & Ilizarov Fixation',
    desc: 'Emergency polytrauma intake, open fracture Gustilo-Anderson classification, locked intramedullary nailing, and circular hexapod ring fixation tracking.',
    icon: Syringe,
    stats: '890+ Trauma Cases',
    features: ['Red flag vascular screening', 'Implant tray traceability', 'Union progress scoring'],
  },
  {
    title: 'Pediatric Orthopedics',
    subtitle: 'Congenital Deformities & Growth Disorders',
    desc: 'Specialized Ponseti clubfoot casting management, developmental dysplasia of the hip (DDH) monitoring, and guided growth epiphyseodesis tracking.',
    icon: HeartHandshake,
    stats: '210+ Children Treated',
    features: ['Pirani score charting', 'Growth plate preservation logs', 'Parent counseling portal'],
  },
  {
    title: 'Ortho-Oncology & Limb Salvage',
    subtitle: 'Bone & Soft Tissue Tumor Reconstruction',
    desc: 'Multidisciplinary tumor board reviews, custom mega-prosthesis sizing, surgical margin verification, and long-term functional surveillance.',
    icon: ShieldCheck,
    stats: '65+ Salvage Surgeries',
    features: ['Tumor board documentation', 'Custom implant engineering', 'Functional MSTS score tracking'],
  },
];

const ADVANTAGES = [
  {
    icon: Cpu,
    title: 'Zero-Latency WebGL PACS',
    desc: 'Eliminates costly third-party DICOM viewers. Instant 60 FPS zoom, pan, and Cobb angle measurements directly on modern web browsers.',
  },
  {
    icon: Layers,
    title: 'GS1 Implant Barcode Anti-Counterfeit',
    desc: 'Point-of-care barcode verification prevents counterfeit prosthetic components and automatically associates batch lot numbers with the patient record.',
  },
  {
    icon: Flame,
    title: 'Zero SSI Infection Protocol',
    desc: 'Enforces laminar air velocity checks, surgical antibiotic prophylaxis timing, and wound closure audit checklists for pristine clinical outcomes.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Recovery Trajectories',
    desc: 'Machine-learning models benchmark postoperative joint flexion against historical cohorts, alerting clinicians to stiffness before adhesions form.',
  },
  {
    icon: IndianRupee,
    title: 'Cashless TPA Fast-Track',
    desc: 'Bundles pre-auth approval letters, implant tax invoices, and pre/post radiograph evidence into one-click digital packets for insurance clearance.',
  },
  {
    icon: Shield,
    title: 'NABH 5th Edition Digital Ready',
    desc: 'Built from the ground up according to National Accreditation Board for Hospitals guidelines with immutable 7-year audit logs and RBAC matrices.',
  },
];

const CAMPUSES = [
  {
    name: 'Hyderabad Central Hub',
    address: 'Road No. 2, Banjara Hills, Hyderabad',
    beds: '120 Inpatient Beds · 6 Ultra-Clean Modular OTs',
    lead: 'Dr. Anand Krishnamurthy (Chief of Arthroplasty)',
    tag: 'Joint Reconstruction & Robotic Surgery',
  },
  {
    name: 'Nandyal Hospital',
    address: 'Station Road, Near RTC Complex, Nandyal',
    beds: '60 Inpatient Beds · 3 Modular OTs',
    lead: 'Dr. Suresh Babu (Trauma & Extremities Lead)',
    tag: 'Trauma & Emergency Fractures',
  },
  {
    name: 'Kurnool Institute',
    address: 'Bellary Road, Kurnool City',
    beds: '75 Inpatient Beds · 4 Specialized OTs',
    lead: 'Dr. Ramesh Chandra (Spine & Deformity Surgeon)',
    tag: 'Spine Surgery & Scoliosis Center',
  },
  {
    name: 'Vijayawada Hub',
    address: 'MG Road, Near Benz Circle, Vijayawada',
    beds: '90 Inpatient Beds · 5 Modular OTs',
    lead: 'Dr. Karthik Narayan (Sports Med & Arthroscopy)',
    tag: 'Sports Medicine & Joint Preservation',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [activeModuleTab, setActiveModuleTab] = useState<string>('triage');

  const selectedModule = CLINICAL_MODULES.find(m => m.id === activeModuleTab) || CLINICAL_MODULES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-[150px]" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-blue-100/35 blur-[160px]" />
        <div className="absolute -bottom-32 left-1/6 w-[650px] h-[650px] rounded-full bg-emerald-100/30 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-30 sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-md text-white font-black text-xl border border-teal-500/30">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">RASA ORTHO OS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold hidden sm:inline-block">
                  v2.4 ENTERPRISE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Intelligent Hospital Operating System
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#specialties" className="hover:text-teal-700 transition-colors">Specialties</a>
            <a href="#clinical-modules" className="hover:text-teal-700 transition-colors">Clinical Modules</a>
            <a href="#advantages" className="hover:text-teal-700 transition-colors">Core Advantages</a>
            <a href="#campuses" className="hover:text-teal-700 transition-colors">Regional Campuses</a>
            <a href="#security" className="hover:text-teal-700 transition-colors">NABH & Security</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Hospital Campuses Live</span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary !bg-teal-700 hover:!bg-teal-800 !text-white !font-bold !text-xs !py-2.5 !px-5 shadow-sm rounded-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Enter Hospital Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !font-bold !text-xs !py-2.5 !px-5 shadow-sm rounded-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="pt-16 pb-20 lg:pt-20 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-bold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
            <span>Built Specifically for High-Volume Orthopedic & Joint Centers</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              The Intelligent Operating System for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                Orthopedic Excellence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              A unified clinical intelligence platform unifying <strong>OPD Triage & Goniometry</strong>,{' '}
              <strong>Zero-Latency PACS DICOM Imaging</strong>, <strong>Laminar Airflow OT Scheduling</strong>,{' '}
              <strong>GS1 Implant Barcode Traceability</strong>, <strong>Physiotherapy ROM Analytics</strong>, and{' '}
              <strong>Real-Time TPA Cashless Settlements</strong>.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => navigate('/login')}
              className="px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-lg shadow-teal-600/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Authorized Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#clinical-modules"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Explore Interactive Modules</span>
            </a>
          </motion.div>

          {/* Live Performance KPI Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto pt-6"
          >
            {[
              { value: '4 Campuses', label: 'Hyderabad, Nandyal, Kurnool, VJA', sub: 'Synchronized Network', color: 'text-teal-700' },
              { value: '2,400+', label: 'Joint & Trauma Surgeries', sub: 'Logged & Audited', color: 'text-emerald-700' },
              { value: '99.4%', label: 'PAC Pre-Op Accuracy', sub: 'Zero Last-Minute Cancels', color: 'text-blue-700' },
              { value: '0.00%', label: 'Surgical Site Infection (SSI)', sub: 'Zero Deep Joint Sepsis', color: 'text-indigo-700' },
              { value: '₹18.4 Cr', label: 'TPA Claims Realized', sub: 'Star Health, HDFC, CGHS', color: 'text-purple-700' },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-left">
                <p className={cn('text-xl sm:text-2xl font-black', kpi.color)}>{kpi.value}</p>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">{kpi.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 2: INTERACTIVE CLINICAL MODULES COCKPIT */}
        <section id="clinical-modules" className="py-20 bg-white border-y border-slate-200/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black uppercase tracking-wider">
                INTERACTIVE CLINICAL COCKPIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Six Deep Clinical Stations. One Seamless Patient Dossier.
              </h2>
              <p className="text-sm text-slate-600">
                Explore how RASA ORTHO OS connects each department into an uninterrupted continuum of care.
              </p>
            </div>

            {/* Module Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-4xl mx-auto border border-slate-200">
              {CLINICAL_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleTab(mod.id)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer',
                    activeModuleTab === mod.id
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  )}
                >
                  <mod.icon className="w-3.5 h-3.5" />
                  <span>{mod.name}</span>
                </button>
              ))}
            </div>

            {/* Active Module Showcase Card */}
            <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-teal-500/20 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 text-left">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-100/70 text-teal-900 text-[10px] font-black uppercase tracking-wider">
                    {selectedModule.badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    {selectedModule.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                    {selectedModule.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start md:self-auto"
                >
                  <span>Launch in Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Module KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedModule.kpis.map((k, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 text-left">
                    <p className="text-2xl font-black text-teal-800">{k.value}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{k.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-left">
                {selectedModule.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ORTHOPEDIC SPECIALTIES */}
        <section id="specialties" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                CLINICAL DEPTH & SUBSPECIALTY MASTERY
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                Engineered for Every Orthopedic Subspecialty
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Configured out of the box with anatomy-specific goniometry arcs, prosthesis barcode databases, and clinical outcome scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {SPECIALTIES.map((sp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400 hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <sp.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {sp.stats}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                    {sp.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">{sp.subtitle}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{sp.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {sp.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE ADVANTAGES & TECHNOLOGICAL DIFFERENTIATORS */}
        <section id="advantages" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 text-left">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                ARCHITECTURAL SUPERIORITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Why Top Orthopedic Surgeons Choose RASA ORTHO OS
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Generic hospital EHRs fail in orthopedics because they lack joint-specific goniometry, PACS integration, and implant serial barcoding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVANTAGES.map((adv, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-teal-500/60 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <adv.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{adv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: 4 REGIONAL CAMPUSES */}
        <section id="campuses" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                MULTI-CAMPUS SYNCHRONIZED NETWORK
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                4 Specialized Regional Orthopedic Campuses
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Centralized patient record synchronization with localized OT pipelines, implant inventory reserves, and regional language support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAMPUSES.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                    CAMPUS ACTIVE
                  </span>
                  <span className="font-mono text-teal-700 font-bold">NODE 0{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{c.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{c.address}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
                  {c.tag}
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <p>Capacity: <strong className="text-slate-900">{c.beds}</strong></p>
                  <p>Clinical Head: <strong className="text-slate-900">{c.lead}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: NABH & SECURITY */}
        <section id="security" className="py-16 bg-white border-t border-slate-200 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                SECURITY & ACCREDITATION COMPLIANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Institutional Trust & Digital Governance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'NABH 5th Edition Ready', desc: 'Pre-configured clinical audit matrices, antibiotic stewardship, and surgical safety checks.', icon: ShieldCheck },
                { title: 'HIPAA & Data Privacy', desc: 'Patient health information (PHI) masked with 256-bit AES encryption at rest and in transit.', icon: Lock },
                { title: 'HL7 FHIR & DICOM 3.0', desc: 'Standardized imaging and lab interoperability with hospital PACS nodes and analyzer machines.', icon: Database },
                { title: 'Immutable Audit Logs', desc: '7-year tamper-evident log preserving every prescription edit, surgery reschedule, and payment.', icon: FileCheck },
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <s.icon className="w-6 h-6 text-teal-700" />
                  <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CALL TO ACTION */}
        <section className="py-16 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Experience RASA ORTHO OS in Real-Time
              </h3>
              <p className="text-xs sm:text-sm text-teal-100">
                Authorized clinicians, surgeons, and administrative staff can sign in to the live hospital operating system.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 font-black text-xs shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-teal-600" />
                <span>Launch Authorized Hospital Portal</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 RASA Orthopedic Hospitals & Healthcare Operating Systems. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <span>NABH Digital Health Compliant</span>
            <span>•</span>
            <span>HIPAA Patient Data Privacy</span>
            <span>•</span>
            <span>PACS DICOM Node v3.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
