import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Shield, Eye, EyeOff, ChevronRight, Building2,
  Activity, Syringe, Bone, Dumbbell, IndianRupee, Clock,
  CheckCircle2, Sparkles, Lock, ArrowRight, UserCheck, Flame,
  FileText, ShieldCheck, Award, HeartHandshake, Laptop, Database,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import type { UserRole } from '../../types';
import { cn } from '../../lib/cn';

const roleProfiles: { role: UserRole; title: string; badge: string; desc: string; icon: any }[] = [
  { role: 'super_admin', title: 'Super Admin', badge: 'Full Access', desc: 'All 4 branches, executive analytics & system controls', icon: Shield },
  { role: 'doctor', title: 'Dr. Anand Krishnamurthy', badge: 'Joint Specialist', desc: 'OPD Queue, triage brief, PACS DICOM & consult pad', icon: Stethoscope },
  { role: 'surgeon', title: 'Dr. Lakshmi Narayana', badge: 'Lead Surgeon', desc: 'OT pipeline, pre-op safety checks & implant clearance', icon: Syringe },
  { role: 'nurse', title: 'Ward Staff Nurse', badge: 'Inpatient Care', desc: 'Bed vitals, Rx administration schedule & wound reviews', icon: HeartHandshake },
  { role: 'physiotherapist', title: 'Arun Kumar PT', badge: 'Rehab Specialist', desc: 'Goniometry, ROM tracking & postoperative recovery', icon: Dumbbell },
  { role: 'hospital_admin', title: 'Hospital Administrator', badge: 'Operations', desc: 'OT slot allocations, staff shifts & inventory audits', icon: Building2 },
];

const patientJourneyStages = [
  { step: '01', title: 'Front Desk & Triage', desc: 'Walk-in token, instant vitals, pain VAS score & red flag screening', icon: UserCheck, color: 'text-teal-700 bg-teal-50 border-teal-200' },
  { step: '02', title: 'Doctor Clinical Station', desc: 'Pre-consult brief, past visit history, joint goniometry & e-prescriptions', icon: Stethoscope, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { step: '03', title: 'DICOM PACS Imaging', desc: 'High-res standing radiographs & 3.0T MRI viewer with raw PACS copies', icon: Activity, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { step: '04', title: 'Pre-Op & PAC Clearance', desc: 'WHO surgical safety checklist, 2D-ECHO clearance & surgical planning', icon: CheckCircle2, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  { step: '05', title: 'OT & Implant Registry', desc: 'Zimmer NexGen & DePuy Corail barcoding, batch serials & sterilisation', icon: Bone, color: 'text-purple-700 bg-purple-50 border-purple-200' },
  { step: '06', title: 'Physiotherapy & Rehab', desc: 'Post-op Day 1 walker mobilization to full active flexion milestones', icon: Dumbbell, color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { step: '07', title: 'TPA Cashless Pre-Auth', desc: 'Instant Star Health & HDFC ERGO claim approvals & GST invoicing', icon: IndianRupee, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  { step: '08', title: 'Remote Patient Follow-Up', desc: 'Automated SMS/WhatsApp reminders, suture reviews & outcome tracking', icon: Clock, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { validateAndLogin, login } = useAuthStore();
  
  // Credentials state — prefilled with Rasa and rasatech007 as requested
  const [username, setUsername] = useState('Rasa');
  const [password, setPassword] = useState('rasatech007');
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = validateAndLogin(username, password, selectedRole);
      if (result.success) {
        navigate('/');
      } else {
        setErrorMessage(result.message || 'Invalid credentials');
        setIsSubmitting(false);
      }
    }, 350);
  };

  const handleInstantDemoLogin = (role: UserRole = 'super_admin') => {
    setUsername('Rasa');
    setPassword('rasatech007');
    setSelectedRole(role);
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-blue-50/25 text-slate-800 selection:bg-teal-500 selection:text-white relative overflow-x-hidden font-sans">
      {/* Background Soft Ambience Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-teal-200/30 blur-[130px]" />
        <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-200/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-emerald-200/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header / Navigation Bar */}
      <header className="relative z-20 border-b border-surface-200 bg-white/85 backdrop-blur-md sticky top-0 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-md text-white font-black text-xl border border-teal-500/30">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span>RASA ORTHO OS</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold">
                    v2.4 ENTERPRISE
                  </span>
                </h1>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Intelligent Hospital Operating System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">4 Hospital Campuses Live</span>
            </div>

            <a
              href="#login-portal"
              className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !font-bold !text-xs !py-2 !px-4 shadow-sm rounded-xl flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Sign In</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Hero Description */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                <span>One OS for the Complete Orthopedic Patient Journey</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
              >
                The Intelligent Operating System for <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                  Orthopedic Excellence.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal"
              >
                Engineered specifically for premium multi-specialty orthopedic hospitals. Seamlessly unifies 
                <strong> OPD Queue Triage</strong>, <strong>PACS DICOM Radiographs</strong>, <strong>Pre-Op Surgical Planning</strong>, 
                <strong> Implant Barcoding</strong>, <strong>Physiotherapy Rehabilitation</strong>, and <strong>TPA Cashless Pre-Auth</strong> into a unified clinical cockpit.
              </motion.p>

              {/* Live Metric Statistics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              >
                {[
                  { value: '4 Campuses', label: 'Hyderabad, Nandyal, Kurnool, VJA', color: 'text-teal-700' },
                  { value: '2,400+', label: 'Joint & Trauma Surgeries', color: 'text-emerald-700' },
                  { value: '99.4%', label: 'PAC Pre-Op Accuracy', color: 'text-blue-700' },
                  { value: '₹18.4 Cr', label: 'TPA Claims Tracked', color: 'text-purple-700' },
                ].map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                    <p className={cn('text-lg sm:text-xl font-black', stat.color)}>{stat.value}</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Quick Feature Badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600"
              >
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Real-time Knee, Spine & Shoulder PACS
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Zimmer NexGen & DePuy Barcode Registry
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> NABH & HIPAA Compliance
                </span>
              </motion.div>
            </div>

            {/* Right Column: Portal Login Card */}
            <div className="lg:col-span-5" id="login-portal">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-teal-500/30 shadow-xl shadow-teal-900/5 space-y-5 relative text-slate-800"
              >
                {/* Card Header */}
                <div className="space-y-1.5 text-left border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                      <Lock className="w-3 h-3 text-teal-600" /> SECURE HOSPITAL PORTAL
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">256-BIT ENCRYPTION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
                    Sign In to RASA ORTHO OS
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enter authorized credentials to unlock the hospital operating system.
                  </p>
                </div>

                {/* Pre-configured Credentials Banner */}
                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-left space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-teal-900 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-teal-600" /> Authorized System Credentials:
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      ACTIVE DEMO
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-white p-2.5 rounded-lg border border-teal-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 block">User ID:</span>
                      <strong className="font-mono text-teal-950 text-sm">Rasa</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-teal-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 block">Password:</span>
                      <strong className="font-mono text-teal-950 text-sm">rasatech007</strong>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 text-left shadow-2xs"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      User ID / Hospital Email
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter user id (Rasa)"
                      required
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono placeholder:text-slate-400 outline-hidden transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <span className="text-[10px] text-teal-700 font-mono font-bold">Preset: rasatech007</span>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password (rasatech007)"
                        required
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono placeholder:text-slate-400 outline-hidden transition-all pr-10 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Role Selection Dropdown / Buttons */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Select Clinical Dashboard Role
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {roleProfiles.slice(0, 4).map((r) => (
                        <button
                          key={r.role}
                          type="button"
                          onClick={() => setSelectedRole(r.role)}
                          className={cn(
                            'p-2 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer',
                            selectedRole === r.role
                              ? 'bg-teal-600 text-white font-bold shadow-xs border-teal-600'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          )}
                        >
                          <r.icon className={cn('w-3.5 h-3.5', selectedRole === r.role ? 'text-white' : 'text-slate-500')} />
                          <span className="truncate">{r.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Hospital Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock RASA ORTHO OS Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* 1-Click Instant Demo Button */}
                  <button
                    type="button"
                    onClick={() => handleInstantDemoLogin('super_admin')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Instant 1-Click Access as Super Admin</span>
                  </button>
                </form>

                <div className="pt-2 text-center text-[11px] text-slate-400">
                  Protected by Healthcare Grade Two-Factor Biometric & RSA Token Architecture
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE COMPLETE PATIENT JOURNEY */}
        <section className="py-16 bg-white border-y border-slate-200/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black uppercase tracking-wider">
                END-TO-END PATIENT LIFECYCLE
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Designed Around The Complete Orthopedic Journey
              </h3>
              <p className="text-sm text-slate-600">
                Not a fragmented CRM or disjointed hospital billing app. RASA ORTHO OS tracks every micro-milestone from the initial slip-and-fall intake to 120° active knee flexion recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {patientJourneyStages.map((st) => (
                <div
                  key={st.step}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-teal-300 hover:shadow-md transition-all hover:-translate-y-0.5 text-left space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      STAGE {st.step}
                    </span>
                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center border', st.color)}>
                      <st.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: 4 CONNECTED REGIONAL BRANCHES */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                MULTI-BRANCH ENTERPRISE NETWORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                4 Specialized Regional Orthopedic Hubs
              </h3>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Centralized patient record synchronization with localized OT pipelines, implant inventory reserves, and regional language support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {[
              { name: 'Hyderabad Central', spec: 'Joint Reconstruction & Arthroplasty', beds: '120 Beds · 6 OTs', doc: 'Dr. Anand Krishnamurthy', city: 'Banjara Hills' },
              { name: 'Nandyal Hospital', spec: 'Trauma & Extremities Center', beds: '60 Beds · 3 OTs', doc: 'Dr. Suresh Babu', city: 'Station Road' },
              { name: 'Kurnool Institute', spec: 'Spine & Deformity Correction', beds: '75 Beds · 4 OTs', doc: 'Dr. Ramesh Chandra', city: 'Bellary Road' },
              { name: 'Vijayawada Hub', spec: 'Sports Medicine & Arthroscopy', beds: '90 Beds · 5 OTs', doc: 'Dr. Karthik Narayan', city: 'Benz Circle' },
            ].map((br, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-700 font-bold">{br.city}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                    ACTIVE HUB
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">{br.name}</h4>
                  <p className="text-xs text-teal-700 font-medium mt-0.5">{br.spec}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                  <p>Capacity: <strong className="text-slate-800">{br.beds}</strong></p>
                  <p>Clinical Lead: <strong className="text-slate-800">{br.doc}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION FOOTER STRIP */}
        <section className="py-12 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white border-t border-teal-600/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="text-xl font-black text-white">Ready to explore RASA ORTHO OS?</h4>
              <p className="text-xs text-teal-100">
                Log in with credentials <strong className="text-white underline">Rasa</strong> / <strong className="text-white underline">rasatech007</strong> or click 1-Click Access above.
              </p>
            </div>
            <button
              onClick={() => handleInstantDemoLogin('super_admin')}
              className="btn-primary !bg-white hover:!bg-teal-50 !text-teal-900 !font-black !text-xs !py-3 !px-6 rounded-xl shadow-lg shrink-0 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Launch Live OS Environment</span>
            </button>
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
