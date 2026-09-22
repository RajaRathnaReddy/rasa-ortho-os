import React from 'react';
import {
  AlertTriangle, HeartPulse, Stethoscope, Activity, Eye,
  Ruler, User, FileText, CheckCircle2, ChevronRight, ShieldAlert,
  Flame, ShieldCheck, Clock, ArrowRight, Zap
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
    <div className="rounded-2xl border-2 border-teal-600/20 bg-gradient-to-b from-teal-50/40 via-white to-slate-50/80 p-4 sm:p-5 text-slate-800 shadow-sm space-y-3.5">
      {/* Top Header: OP Triage Highlights Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-500/15 pb-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex flex-col items-center justify-center font-mono font-black text-xs shadow-xs shrink-0">
            <span className="text-[9px] uppercase tracking-wider text-teal-200">Token</span>
            <span>{triage.token}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                OP Triage Brief: Important Clinical Highlights
              </h3>
              {triage.isNewPatient ? (
                <span className="badge bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  🟢 NEW PATIENT (FIRST OP TODAY)
                </span>
              ) : (
                <span className="badge bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black tracking-wide px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <span>📜</span>
                  <span>RETURNING PATIENT — {triage.pastVisitsCount} PRIOR VISITS</span>
                </span>
              )}
              <span className="badge bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                Triage @ {triage.registeredTime}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              <strong className="text-slate-900">{triage.patientName}</strong> ({triage.age}y / {triage.gender}) · <span className="text-slate-500">{triage.occupation}</span>
            </p>
          </div>
        </div>

        {/* Imaging Quick-Action Button */}
        {triage.rawScanId && onOpenDicom && (
          <button
            onClick={() => onOpenDicom(triage.rawScanId)}
            className="btn-primary !bg-teal-600 hover:!bg-teal-700 !text-white !text-xs !py-2 !px-3.5 shadow-sm flex items-center justify-center gap-2 font-bold shrink-0 rounded-xl transition-all hover:shadow"
          >
            <Eye className="w-4 h-4 text-teal-200" />
            <span>View Raw Film / DICOM</span>
          </button>
        )}
      </div>

      {/* Critical Red Flags & Medical Warnings (High Visibility) */}
      {triage.criticalAlerts && triage.criticalAlerts.length > 0 && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center gap-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs shrink-0 tracking-wide uppercase">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Critical Doctor Alerts:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {triage.criticalAlerts.map((alert, i) => (
              <span
                key={i}
                className="text-xs font-bold text-rose-950 bg-white px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                {alert}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Returning Patient Clinical History Summary */}
      {!triage.isNewPatient && triage.pastVisits && triage.pastVisits.length > 0 ? (
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs min-w-0">
              <span className="text-base shrink-0">📜</span>
              <span className="font-extrabold uppercase tracking-wider text-amber-900 shrink-0">Prior Visit Record:</span>
              <span className="text-slate-800 font-semibold truncate">
                {triage.pastVisits[0].date} · {triage.pastVisits[0].doctor} ({triage.pastVisits[0].department})
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 border border-amber-300 shrink-0 uppercase tracking-wide">
              {triage.pastVisits[0].visitType}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs">
            <div className="sm:col-span-5 bg-white p-2.5 rounded-lg border border-amber-200 shadow-2xs">
              <span className="text-[10px] text-amber-900 uppercase font-black tracking-wider block">Past Diagnosis:</span>
              <p className="font-bold text-slate-900 mt-1 text-xs leading-snug">{triage.pastVisits[0].clinicalDiagnosis}</p>
            </div>
            <div className="sm:col-span-7 bg-white p-2.5 rounded-lg border border-amber-200 shadow-2xs">
              <span className="text-[10px] text-amber-900 uppercase font-black tracking-wider block">Intervention / Procedure:</span>
              <p className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">{triage.pastVisits[0].interventions}</p>
            </div>
          </div>
        </div>
      ) : triage.isNewPatient ? (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center gap-2 text-xs text-emerald-950 shadow-2xs">
          <span className="text-emerald-800 font-black shrink-0 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> NEW PATIENT INTAKE:
          </span>
          <span className="text-emerald-900 text-xs font-medium leading-relaxed">
            First hospital consultation. Baseline clinical history, functional score, and initial radiological investigations initiated today.
          </span>
        </div>
      ) : null}

      {/* 4 Essential Curated Data Columns: High-Contrast Clinical Readability */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Primary Joint & Pain Score */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-[10px] text-teal-800 font-bold uppercase tracking-wider">
            <span>Primary Focus Joint</span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-bold">
              <Flame className="w-3 h-3 text-amber-600" /> VAS {triage.painScore}/10
            </span>
          </div>
          <p className="text-sm font-black text-slate-900">{triage.primaryJoint}</p>
          <p className="text-xs text-slate-600 font-medium">
            <span className="text-slate-400">Duration:</span> {triage.duration}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {triage.painCharacter.slice(0, 2).map((char, i) => (
              <span key={i} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200/80">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Mobility & Functional Disability */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block">
            Functional & Gait Limitation
          </span>
          <p className="text-xs text-slate-700 font-semibold leading-snug">
            {triage.mobilityStatus}
          </p>
          <p className="text-[11px] text-slate-500 pt-0.5">
            <strong className="text-slate-700">Onset:</strong> {triage.onsetMode}
          </p>
          {triage.priorSurgeries && (
            <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium mt-1">
              <strong>Prior Surgery:</strong> {triage.priorSurgeries}
            </p>
          )}
        </div>

        {/* 3. Triage Vitals & BMI */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider block">
            OP Triage Vitals & BMI
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <span className="text-slate-500">BP: <strong className="text-slate-900 font-mono">{triage.triageVitals.bp}</strong></span>
            <span className="text-slate-500">Pulse: <strong className="text-slate-900 font-mono">{triage.triageVitals.pulse} bpm</strong></span>
            <span className="text-slate-500">SpO2: <strong className="text-emerald-700 font-bold font-mono">{triage.triageVitals.spo2}</strong></span>
            <span className="text-slate-500">Temp: <strong className="text-slate-900 font-mono">{triage.triageVitals.temp}</strong></span>
          </div>
          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
            <span className="text-slate-500">BMI: <strong className="text-amber-800 font-mono font-bold">{triage.triageVitals.bmi}</strong></span>
            <span className="text-[10px] text-amber-900 font-bold px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200">
              {triage.triageVitals.bmiCategory.split(' (')[0]}
            </span>
          </div>
        </div>

        {/* 4. Pre-Op Radiographs & Diagnostics Status */}
        <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 shadow-2xs space-y-1.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-teal-900 font-black uppercase tracking-wider block">
              Imaging / Labs Ready
            </span>
            <p className="text-xs text-teal-950 font-bold mt-1 leading-snug">
              {triage.investigationsStatus}
            </p>
          </div>
          {triage.rawScanId && onOpenDicom && (
            <button
              onClick={() => onOpenDicom(triage.rawScanId)}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center justify-between pt-2 border-t border-teal-200/80 transition-colors group"
            >
              <span className="group-hover:underline">Inspect Raw Radiograph</span>
              <ChevronRight className="w-4 h-4 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
