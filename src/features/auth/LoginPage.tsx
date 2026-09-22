import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Eye, EyeOff, Lock, ArrowRight, ShieldCheck,
  AlertCircle, User, Activity, ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { validateAndLogin } = useAuthStore();

  // Pristine empty state - zero auto-fill, zero auto-login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both your Hospital User ID and Security Passcode.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = validateAndLogin(username, password);
      if (result.success) {
        navigate('/');
      } else {
        setErrorMessage(
          result.message ||
            'Access Denied: Invalid Hospital ID or Passcode. Access is strictly restricted to staff authorized by Administrator Raja Rathna Reddy.'
        );
        setIsSubmitting(false);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white flex flex-col justify-between font-sans relative overflow-x-hidden">
      {/* Background Soft Medical Ambience Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[20%] w-[700px] h-[700px] rounded-full bg-teal-600/10 blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[15%] w-[700px] h-[700px] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg text-white font-black text-lg border border-teal-400/30">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white">
                  RASA ORTHO OS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono font-bold">
                  v2.4 ENTERPRISE
                </span>
              </div>
              <p className="text-[9.5px] text-slate-400 font-semibold tracking-wider uppercase">
                Intelligent Hospital Operating System
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/overview')}
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">System Overview & Architecture</span>
            <span className="sm:hidden">Overview</span>
          </button>
        </div>
      </header>

      {/* ═══ CENTERED ELEGANT CLINICAL LOGIN WORKSPACE ═══ */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 text-left"
        >
          {/* Workstation Header */}
          <div className="text-center space-y-2 border-b border-slate-800/80 pb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 mb-1 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Clinical Workstation Sign In
            </h1>
            <p className="text-xs text-slate-400">
              Institutional staff authentication gateway.
            </p>
          </div>

          {/* Security Notice Callout */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Restricted Access Gateway</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
              Access is strictly restricted to clinical staff with active credentials issued by Administrator Raja Rathna Reddy. All sign-in attempts are logged.
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-start gap-2.5 text-left"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Hospital Staff ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your authorized Hospital ID"
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full text-xs py-3 pl-10 pr-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Security Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security passcode"
                  required
                  autoComplete="current-password"
                  className="w-full text-xs py-3 pl-10 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Hospital Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Enter Hospital OS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link to Tool Overview */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center gap-2 text-center">
            <button
              type="button"
              onClick={() => navigate('/overview')}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore System Architecture & Capabilities</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <p className="text-[10px] text-slate-500">
              Need access? Contact Administrator Raja Rathna Reddy
            </p>
          </div>
        </motion.div>
      </main>

      {/* Institutional Security Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-3 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 RASA Orthopedic Hospitals. All access attempts are recorded under institutional audit logs.</p>
          <div className="flex items-center gap-3 text-slate-400 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PACS DICOM Node Online
            </span>
            <span>•</span>
            <span>256-Bit SSL Enforced</span>
            <span>•</span>
            <span>NABH & HIPAA Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
