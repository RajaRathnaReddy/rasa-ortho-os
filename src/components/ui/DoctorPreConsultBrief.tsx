import React from 'react';
import {
  AlertTriangle, HeartPulse, Stethoscope, Activity, Eye,
  Ruler, User, FileText, CheckCircle2, ChevronRight, ShieldAlert,
  Flame, ShieldCheck, Clock, ArrowRight, Zap, AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { OpTriageData } from '../../data/opTriageData';

interface DoctorPreConsultBriefProps {
  triage: OpTriageData;
  onOpenDicom?: (studyId?: string) => void;
  compact?: boolean;
}

export function DoctorPreConsultBrief({ triage, onOpenDicom, compact = false }: DoctorPreConsultBriefProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 text-slate-800 shadow-xs space-y-4">
      {/* Top Header: OP Triage Highlights Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs shrink-0 border border-slate-800">
            <span className="text-[8.5px] uppercase tracking-wider text-slate-400">Token</span>
            <span>{triage.token}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Pre-Consultation Triage Brief
              </h3>
              {triage.isNewPatient ? (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  New Patient
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>Record:</span>
                  <span>{triage.pastVisitsCount} Prior Visits</span>
                </span>
              )}
              <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {triage.registeredTime}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              <strong className="text-slate-900 font-bold">{triage.patientName}</strong> ({triage.age}y / {triage.gender}) · <span className="text-slate-500">{triage.occupation}</span>
            </p>
          </div>
        </div>

        {/* Imaging Quick-Action Button */}
        {triage.rawScanId && onOpenDicom && (
          <button
            onClick={() => onOpenDicom(triage.rawScanId)}
            className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-3.5 shadow-xs flex items-center justify-center gap-2 font-bold shrink-0 rounded-xl transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-teal-200" />
            <span>View DICOM Radiograph</span>
          </button>
        )}
      </div>

      {/* Critical Red Flags & Medical Warnings: Clean High-Visibility Clinical Banner */}
      {triage.criticalAlerts && triage.criticalAlerts.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center gap-2.5 shadow-sm border border-slate-800">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs shrink-0 tracking-wide uppercase">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Critical Doctor Alerts:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {triage.criticalAlerts.map((alert, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-slate-100 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                {alert.replace('⚠️ ', '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Returning Patient Clinical History Summary */}
      {!triage.isNewPatient && triage.pastVisits && triage.pastVisits.length > 0 ? (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs min-w-0">
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Prior Record
              </span>
              <span className="text-slate-800 font-semibold truncate">
                {triage.pastVisits[0].date} · {triage.pastVisits[0].doctor} ({triage.pastVisits[0].department})
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase tracking-wide">
              {triage.pastVisits[0].visitType}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
            <div className="sm:col-span-5 bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Past Diagnosis:</span>
              <p className="font-bold text-slate-900 mt-0.5 text-xs leading-snug">{triage.pastVisits[0].clinicalDiagnosis}</p>
            </div>
            <div className="sm:col-span-7 bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Intervention / Procedure:</span>
              <p className="text-xs font-medium text-slate-700 mt-0.5 leading-relaxed">{triage.pastVisits[0].interventions}</p>
            </div>
          </div>
        </div>
      ) : triage.isNewPatient ? (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2 text-xs text-slate-800">
          <span className="text-teal-700 font-bold shrink-0 flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> New Intake:
          </span>
          <span className="text-slate-600 text-xs font-medium">
            First hospital consultation. Baseline clinical history, functional mobility score, and preliminary imaging initiated today.
          </span>
        </div>
      ) : null}

      {/* 4 Essential Curated Data Columns: Modern Medical Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Primary Joint & Pain Score */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
              <span>Primary Focus Joint</span>
              <span className={cn(
                'px-2 py-0.5 rounded-full font-bold text-[10px] border',
                triage.painScore >= 7
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              )}>
                VAS {triage.painScore}/10
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">{triage.primaryJoint}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              <span>Duration:</span> <strong className="text-slate-700">{triage.duration}</strong>
            </p>
          </div>
          <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-200/60">
            {triage.painCharacter.slice(0, 2).map((char, i) => (
              <span key={i} className="text-[10px] bg-white text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Mobility & Functional Disability */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
              Functional & Gait Limitation
            </span>
            <p className="text-xs text-slate-700 font-semibold leading-snug">
              {triage.mobilityStatus}
            </p>
          </div>
          <div className="space-y-1 pt-1.5 border-t border-slate-200/60 text-[11px]">
            <p className="text-slate-500">
              <span className="text-slate-400">Onset:</span> <strong className="text-slate-700">{triage.onsetMode}</strong>
            </p>
            {triage.priorSurgeries && (
              <p className="text-slate-600 truncate" title={triage.priorSurgeries}>
                <span className="text-slate-400">Prior:</span> {triage.priorSurgeries}
              </p>
            )}
          </div>
        </div>

        {/* 3. Triage Vitals & BMI */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
              OP Triage Vitals & BMI
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <span className="text-slate-500">BP: <strong className="text-slate-900 font-mono font-bold">{triage.triageVitals.bp}</strong></span>
              <span className="text-slate-500">Pulse: <strong className="text-slate-900 font-mono font-bold">{triage.triageVitals.pulse}</strong></span>
              <span className="text-slate-500">SpO2: <strong className="text-emerald-700 font-mono font-bold">{triage.triageVitals.spo2}</strong></span>
              <span className="text-slate-500">Temp: <strong className="text-slate-900 font-mono font-bold">{triage.triageVitals.temp}</strong></span>
            </div>
          </div>
          <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between gap-1 text-[11px]">
            <span className="text-slate-500">BMI: <strong className="text-slate-800 font-mono font-bold">{triage.triageVitals.bmi}</strong></span>
            <span className="text-[10px] text-slate-600 font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">
              {triage.triageVitals.bmiCategory.split(' (')[0]}
            </span>
          </div>
        </div>

        {/* 4. Pre-Op Radiographs & Diagnostics Status */}
        <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-200/80 space-y-1.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block mb-1">
              Imaging / Labs Ready
            </span>
            <p className="text-xs text-slate-800 font-bold leading-snug">
              {triage.investigationsStatus}
            </p>
          </div>
          {triage.rawScanId && onOpenDicom && (
            <button
              onClick={() => onOpenDicom(triage.rawScanId)}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center justify-between pt-1.5 border-t border-teal-200/60 transition-colors cursor-pointer group"
            >
              <span className="group-hover:underline">Inspect Film / DICOM</span>
              <ChevronRight className="w-3.5 h-3.5 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
