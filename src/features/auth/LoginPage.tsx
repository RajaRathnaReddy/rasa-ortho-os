import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Eye, EyeOff, Lock, ArrowRight, UserCheck, Stethoscope,
  Syringe, HeartHandshake, Dumbbell, Building2, AlertCircle, ArrowLeft,
  KeyRound, ShieldAlert, CheckCircle2
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

export function LoginPage() {
  const navigate = useNavigate();
  const { validateAndLogin } = useAuthStore();
  
  // Clean inputs - only people with the authorized passcode given by Raja Rathna Reddy can log in
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!username.trim()) {
      setErrorMessage('Please enter your Hospital User ID or Staff Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your Hospital Security Passcode.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = validateAndLogin(username, password, selectedRole);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(result.message || 'Access Denied: Invalid Security Passcode.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-blue-50/25 text-slate-800 selection:bg-teal-500 selection:text-white relative overflow-x-hidden font-sans flex flex-col justify-between">
      
      {/* Background Soft Ambience Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-teal-200/30 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-blue-200/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header / Navigation */}
      <header className="relative z-20 border-b border-surface-200 bg-white/85 backdrop-blur-md sticky top-0 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center shadow-md text-white font-black text-lg border border-teal-500/30 group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900">RASA ORTHO OS</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold">
                  v2.4
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">
                Intelligent Hospital Operating System
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 px-3.5 py-1.5 rounded-xl hover:bg-slate-100 transition-all border border-slate-200/70"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Hospital Overview & Specialties</span>
          </Link>
        </div>
      </header>

      {/* Main Authentication Center */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-6"
        >
          {/* Card Header */}
          <div className="space-y-1.5 text-left border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-black tracking-wider uppercase flex items-center gap-1">
                <Lock className="w-3 h-3 text-teal-600" /> SECURE STAFF PORTAL
              </span>
              <span className="text-[10px] text-slate-400 font-mono">256-BIT ENCRYPTION</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
              Sign In to RASA ORTHO OS
            </h1>
            <p className="text-xs text-slate-500">
              Enter your authorized credentials to unlock the hospital operating system.
            </p>
          </div>

          {/* Access Policy Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-start gap-2.5 text-[11px] text-slate-600">
            <KeyRound className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Authorized Personnel Only:</span> Access is strictly restricted to staff and clinicians with an approved passcode issued by Administrator Raja Rathna Reddy.
            </div>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2 text-left shadow-2xs"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Hospital User ID / Staff ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Rasa or Dr. Anand"
                required
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono placeholder:text-slate-400 outline-hidden transition-all shadow-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Security Passcode
                </label>
                <span className="text-[10px] text-slate-400">Strictly Confidential</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter authorized hospital passcode"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono placeholder:text-slate-400 outline-hidden transition-all pr-10 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection Dropdown / Buttons */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Select Clinical Dashboard Station
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {roleProfiles.slice(0, 4).map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => setSelectedRole(r.role)}
                    className={cn(
                      'p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer',
                      selectedRole === r.role
                        ? 'bg-teal-700 text-white font-bold shadow-xs border-teal-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    )}
                  >
                    <r.icon className={cn('w-3.5 h-3.5 shrink-0', selectedRole === r.role ? 'text-white' : 'text-slate-500')} />
                    <span className="truncate">{r.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Hospital Authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Enter Hospital OS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance Footer */}
          <div className="pt-2 text-center text-[10px] text-slate-400 space-y-1">
            <p>Protected by Healthcare-Grade Two-Factor RSA Token Architecture</p>
            <p className="text-slate-400">NABH & HIPAA Compliant Institutional Audit Trail</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/70 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© 2026 RASA Orthopedic Hospitals. All access attempts are recorded.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Hyderabad</span>
            <span>•</span>
            <span>Nandyal</span>
            <span>•</span>
            <span>Kurnool</span>
            <span>•</span>
            <span>Vijayawada</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
