import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ZoomIn, ZoomOut, RotateCcw, Sliders, Eye, Maximize2,
  Download, Printer, Ruler, Sun, Compass, Activity, ShieldCheck,
  ChevronLeft, ChevronRight, FileText, CheckCircle2, Bone
} from 'lucide-react';
import { cn } from '../../lib/cn';

export interface DicomStudy {
  id: string;
  title: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  modality: 'XR' | 'MR' | 'CT';
  bodyPart: string;
  date: string;
  accessionNumber: string;
  imageUrl: string;
  findings: string;
  radiologist: string;
  kvp?: string;
  mas?: string;
  matrix?: string;
  sliceThickness?: string;
}

export const SAMPLE_DICOM_STUDIES: DicomStudy[] = [
  {
    id: 'xr-knee-01',
    title: 'Right Knee AP Standing Weight-Bearing Radiograph',
    patientName: 'Rajesh Kumar Sharma',
    patientId: 'PT-2024-00101',
    age: 58,
    gender: 'Male',
    modality: 'XR',
    bodyPart: 'Right Knee Joint',
    date: '22 Sep 2026, 09:15 AM',
    accessionNumber: 'XR-2024-8842',
    imageUrl: '/images/xray-knee-standing.jpg',
    findings: 'Severe medial compartment joint space obliteration (< 1.8mm). Prominent subchondral sclerosis and medial tibial plateau osteophytosis. Varus mechanical alignment (7.2°). Consistent with Kellgren-Lawrence Grade IV Osteoarthritis.',
    radiologist: 'Dr. Suresh V., MD (Musculoskeletal Radiology)',
    kvp: '75 kVp',
    mas: '14.5 mAs',
    matrix: '2048 x 2560 (16-bit Grayscale)',
  },
  {
    id: 'mr-shoulder-02',
    title: 'Right Shoulder MRI — Coronal T2 Fat-Suppressed FSE',
    patientName: 'Kavitha Ramachandran',
    patientId: 'PT-2024-00102',
    age: 44,
    gender: 'Female',
    modality: 'MR',
    bodyPart: 'Right Shoulder (Rotator Cuff)',
    date: '22 Sep 2026, 08:30 AM',
    accessionNumber: 'MR-2024-7712',
    imageUrl: '/images/mri-shoulder-cuff.svg',
    findings: 'Full-thickness tear of the supraspinatus tendon at footprint with 1.2 cm retraction gap. High-signal fluid within subacromial-subdeltoid bursa. Glenohumeral cartilage intact.',
    radiologist: 'Dr. A. Meenakshi, MD, DMRD (MSK Radiology)',
    sliceThickness: '2.5 mm',
    matrix: '512 x 512 T2 FSE',
  },
  {
    id: 'xr-tkr-03',
    title: 'Left Total Knee Arthroplasty (TKA) Post-Op Follow-Up Radiograph',
    patientName: 'Suresh Babu Naidu',
    patientId: 'PT-2024-00103',
    age: 62,
    gender: 'Male',
    modality: 'XR',
    bodyPart: 'Left Knee (Post-Surgical)',
    date: '22 Sep 2026, 09:45 AM',
    accessionNumber: 'XR-2024-6019',
    imageUrl: '/images/xray-tkr-postop.svg',
    findings: 'POD 45 check. Well-seated Zimmer NexGen CR femoral and tibial prostheses with continuous radiopaque bone cement mantle. Neutral anatomical alignment (179.8°). No periprosthetic osteolysis or loosening.',
    radiologist: 'Dr. Suresh V., MD (Musculoskeletal Radiology)',
    kvp: '78 kVp',
    mas: '16.0 mAs',
    matrix: '2048 x 2560 (16-bit Grayscale)',
  },
  {
    id: 'mr-acl-04',
    title: 'Right Knee MRI — Sagittal T2 Fat-Suppressed Fast Spin Echo',
    patientName: 'Deepa Venkat',
    patientId: 'PT-2024-00104',
    age: 37,
    gender: 'Female',
    modality: 'MR',
    bodyPart: 'Right Knee Joint',
    date: '22 Sep 2026, 10:10 AM',
    accessionNumber: 'MR-2024-9104',
    imageUrl: '/images/mri-knee-acl.svg',
    findings: 'Complete acute rupture of Anterior Cruciate Ligament (ACL) at mid-substance with wavy discontinuous fibers and fluid bright edema. Characteristic lateral femoral condyle contusion/bone bruise from pivot-shift mechanism. PCL is intact.',
    radiologist: 'Dr. A. Meenakshi, MD, DMRD (Sports MRI Specialist)',
    sliceThickness: '3.0 mm',
    matrix: '512 x 512 T2 Sagittal',
  },
  {
    id: 'xr-cervical-05',
    title: 'Cervical Spine Lateral Weight-Bearing Radiograph',
    patientName: 'Anil Kumar Reddy',
    patientId: 'PT-2024-00105',
    age: 52,
    gender: 'Male',
    modality: 'XR',
    bodyPart: 'Cervical Spine (C1-C7)',
    date: '22 Sep 2026, 10:40 AM',
    accessionNumber: 'XR-2024-4421',
    imageUrl: '/images/xray-cervical-spine.svg',
    findings: 'Straightening of normal cervical lordosis with muscle spasm. Marked C5-C6 intervertebral disc height reduction and prominent anterior & posterior osteophyte formation causing neural exit foraminal encroachment.',
    radiologist: 'Dr. Suresh V., MD (Musculoskeletal Radiology)',
    kvp: '65 kVp',
    mas: '10.0 mAs',
    matrix: '2048 x 2560 (16-bit Grayscale)',
  },
  {
    id: 'xr-pelvis-06',
    title: 'Pelvis with Both Hips AP Standing Weight-Bearing Radiograph',
    patientName: 'Padmavathi R.',
    patientId: 'PT-2024-00106',
    age: 67,
    gender: 'Female',
    modality: 'XR',
    bodyPart: 'Pelvis & Bilateral Hips',
    date: '22 Sep 2026, 11:00 AM',
    accessionNumber: 'XR-2024-3991',
    imageUrl: '/images/xray-pelvis-hip.jpg',
    findings: 'Advanced osteoarthritis of the right hip joint with complete superior-lateral joint space loss, femoral head flattening, subchondral cyst formation and acetabular margin osteophytes. Left hip joint shows mild joint space preservation.',
    radiologist: 'Dr. Suresh V., MD (Musculoskeletal Radiology)',
    kvp: '82 kVp',
    mas: '22.0 mAs',
    matrix: '2400 x 3000 (16-bit Grayscale)',
  },
  {
    id: 'xr-ankle-07',
    title: 'Right Ankle Mortise & Lateral Trauma Radiographs',
    patientName: 'Mohammed Farooq',
    patientId: 'PT-2024-00107',
    age: 39,
    gender: 'Male',
    modality: 'XR',
    bodyPart: 'Right Ankle Mortise',
    date: '22 Sep 2026, 11:20 AM',
    accessionNumber: 'XR-2024-1102',
    imageUrl: '/images/xray-ankle-fracture.svg',
    findings: 'Unstable bimalleolar ankle fracture. Oblique spiral fracture of distal fibular shaft (Weber Type B) with 4mm lateral displacement, combined with transverse avulsion fracture of medial malleolus. Ankle mortise widening of 6.2mm with talar shift.',
    radiologist: 'Dr. Suresh V., MD (Trauma & Musculoskeletal Radiology)',
    kvp: '68 kVp',
    mas: '12.0 mAs',
    matrix: '2048 x 2560 (16-bit Grayscale)',
  },
  {
    id: 'mr-spine-08',
    title: 'Lumbar Spine MRI — Sagittal T2-Weighted Fast Spin Echo',
    patientName: 'Sunita Devi',
    patientId: 'PT-2024-00201',
    age: 51,
    gender: 'Female',
    modality: 'MR',
    bodyPart: 'Lumbar Spine (L1-S1)',
    date: '21 Sep 2026, 14:40 PM',
    accessionNumber: 'MR-2024-5119',
    imageUrl: '/images/mri-lumbar-spine.jpg',
    findings: 'Prominent posterior disc herniation/extrusion at L4-L5 level causing severe central spinal canal stenosis and bilateral traversing L5 nerve root impingement. Modic type-II endplate degenerative changes noted at L4 and L5.',
    radiologist: 'Dr. A. Meenakshi, MD, DMRD (Neuro-Radiology)',
    sliceThickness: '3.0 mm (0.5 mm gap)',
    matrix: '512 x 512 T2 FSE',
  },
];

interface DicomViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStudyId?: string;
}

export function DicomViewerModal({ isOpen, onClose, initialStudyId = 'xr-knee-01' }: DicomViewerModalProps) {
  const [selectedStudyId, setSelectedStudyId] = useState(initialStudyId);
  const [zoom, setZoom] = useState(1);
  const [invert, setInvert] = useState(false);
  const [filterPreset, setFilterPreset] = useState<'normal' | 'bone' | 'high_contrast' | 'soft_tissue'>('normal');
  const [showRuler, setShowRuler] = useState(false);
  const [showAngleTool, setShowAngleTool] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  // Sync initial study
  React.useEffect(() => {
    if (initialStudyId) {
      setSelectedStudyId(initialStudyId);
    }
  }, [initialStudyId]);

  if (!isOpen) return null;

  const currentStudy = SAMPLE_DICOM_STUDIES.find(s => s.id === selectedStudyId) || SAMPLE_DICOM_STUDIES[0];

  const resetAdjustments = () => {
    setZoom(1);
    setInvert(false);
    setFilterPreset('normal');
    setShowRuler(false);
    setShowAngleTool(false);
    setBrightness(100);
    setContrast(100);
  };

  // Image filter styling based on presets and adjustments
  const getImageFilterStyle = () => {
    let base = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (invert) base += ' invert(100%)';
    if (filterPreset === 'bone') base += ' contrast(140%) brightness(110%)';
    else if (filterPreset === 'high_contrast') base += ' contrast(180%) brightness(95%)';
    else if (filterPreset === 'soft_tissue') base += ' contrast(90%) brightness(125%)';
    return base;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-7xl h-[95vh] bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
        >
          {/* Header Bar */}
          <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white tracking-wide">
                    RASA PACS — High-Resolution Radiograph Lightbox Viewer
                  </h2>
                  <span className="badge bg-teal-900/60 text-teal-300 border border-teal-700/60 text-[10px] font-mono font-bold">
                    DICOM v3.0 Certified
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {currentStudy.patientName} ({currentStudy.age}y / {currentStudy.gender}) · UHID: {currentStudy.patientId} · Accession: {currentStudy.accessionNumber}
                </p>
              </div>
            </div>

            {/* Study Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto">
              {SAMPLE_DICOM_STUDIES.map(study => (
                <button
                  key={study.id}
                  onClick={() => {
                    setSelectedStudyId(study.id);
                    resetAdjustments();
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5',
                    selectedStudyId === study.id
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                  )}
                >
                  <span className="font-mono text-[10px] px-1 bg-black/40 rounded">{study.modality}</span>
                  <span>{study.bodyPart}</span>
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Viewer Toolbar */}
          <div className="px-5 py-2 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
            {/* Zoom & Pan Tools */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 mr-1 font-semibold">Magnification:</span>
              <button
                onClick={() => setZoom(z => Math.max(0.6, z - 0.2))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] text-teal-400 font-bold min-w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(3, z + 0.2))}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-semibold"
              >
                Fit 1:1
              </button>
            </div>

            {/* Window Level Presets & Invert */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 mr-1 font-semibold">Filter:</span>
              {(['normal', 'bone', 'high_contrast', 'soft_tissue'] as const).map(preset => (
                <button
                  key={preset}
                  onClick={() => setFilterPreset(preset)}
                  className={cn(
                    'px-2 py-1 rounded text-[11px] font-semibold transition-all capitalize',
                    filterPreset === preset ? 'bg-teal-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  )}
                >
                  {preset.replace('_', ' ')}
                </button>
              ))}

              <button
                onClick={() => setInvert(!invert)}
                className={cn(
                  'ml-2 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border',
                  invert ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
                title="Invert film negative/positive polarity"
              >
                <Sun className="w-3 h-3" />
                {invert ? 'Inverted' : 'Invert Film'}
              </button>
            </div>

            {/* Orthopedic Measurement Tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowRuler(!showRuler)}
                className={cn(
                  'px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border transition-all',
                  showRuler ? 'bg-teal-500 text-slate-950 font-bold border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                <Ruler className="w-3 h-3" />
                <span>Joint Caliper</span>
              </button>

              <button
                onClick={() => setShowAngleTool(!showAngleTool)}
                className={cn(
                  'px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border transition-all',
                  showAngleTool ? 'bg-teal-500 text-slate-950 font-bold border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                <Compass className="w-3 h-3" />
                <span>Varus / Cobb Angle</span>
              </button>

              <button
                onClick={resetAdjustments}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white ml-1"
                title="Reset All Adjustments"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Viewport & Clinical Findings Panel */}
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
            {/* The Image Canvas Area */}
            <div className="flex-1 bg-black flex items-center justify-center p-4 relative overflow-hidden select-none">
              {/* Overlay Diagnostic DICOM Header in 4 Corners */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-teal-400/90 leading-tight pointer-events-none drop-shadow-md">
                <p className="font-bold text-white text-xs">{currentStudy.patientName}</p>
                <p>{currentStudy.patientId} · {currentStudy.gender} {currentStudy.age}y</p>
                <p>Study: {currentStudy.date}</p>
              </div>

              <div className="absolute top-4 right-4 z-20 font-mono text-[11px] text-teal-400/90 leading-tight text-right pointer-events-none drop-shadow-md">
                <p className="font-bold text-white text-xs">RASA ORTHOPEDIC HOSPITAL</p>
                <p>Acc: {currentStudy.accessionNumber}</p>
                <p>{currentStudy.kvp ? `${currentStudy.kvp} · ${currentStudy.mas}` : currentStudy.sliceThickness}</p>
              </div>

              <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-slate-400 leading-tight pointer-events-none drop-shadow-md">
                <p>Zoom: {Math.round(zoom * 100)}% · Preset: {filterPreset}</p>
                <p>Modality: {currentStudy.modality} · Matrix: {currentStudy.matrix}</p>
              </div>

              <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-slate-400 leading-tight text-right pointer-events-none drop-shadow-md">
                <p>Lossless 16-Bit Raw Radiograph</p>
                <p>PACS Node: RASA-DICOM-01</p>
              </div>

              {/* Measurement Overlays (Interactive Annotations) */}
              {showRuler && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="border-t-2 border-b-2 border-teal-400 w-36 h-8 flex items-center justify-between px-2 bg-teal-500/10 backdrop-blur-2xs rounded">
                    <span className="text-[10px] font-mono text-teal-300 font-bold">Medial: 1.6 mm</span>
                    <span className="text-[10px] font-mono text-teal-300 font-bold">Lateral: 5.4 mm</span>
                  </div>
                  <p className="text-[9px] font-mono text-amber-300 text-center mt-1 bg-black/60 px-1 rounded">
                    ⚠️ 70% Joint Space Loss in Medial Compartment
                  </p>
                </div>
              )}

              {showAngleTool && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="p-2 rounded bg-black/70 border border-teal-500/60 text-center font-mono">
                    <span className="text-xs font-bold text-teal-300">Mechanical Axis Deviation:</span>
                    <p className="text-sm font-extrabold text-amber-400 mt-0.5">7.4° Varus Deformity</p>
                    <span className="text-[9px] text-slate-400">Tibia-Femoral Angle (TFA)</span>
                  </div>
                </div>
              )}

              {/* The Raw Medical Image */}
              <div
                className="transition-transform duration-150 ease-out flex items-center justify-center max-h-full"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={currentStudy.imageUrl}
                  alt={currentStudy.title}
                  className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl transition-all"
                  style={{ filter: getImageFilterStyle() }}
                />
              </div>
            </div>

            {/* Right-Hand Clinical Findings & Radiologist Report Drawer */}
            <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto shrink-0">
              <div className="space-y-4">
                <div>
                  <span className="badge bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                    Official Diagnostic Report
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
                    {currentStudy.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modality: <strong className="text-slate-200">{currentStudy.modality}</strong> · Anatomy: <strong className="text-slate-200">{currentStudy.bodyPart}</strong>
                  </p>
                </div>

                {/* Radiologist Formal Findings */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Radiological Impression</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentStudy.findings}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Verified by: {currentStudy.radiologist}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Signed
                    </span>
                  </div>
                </div>

                {/* Clinical Implications for Surgeon / Doctor */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                  <span className="font-bold text-amber-300 text-[11px] block">
                    ⚡ Surgical Decision Support Note:
                  </span>
                  <p className="text-[11px] text-slate-300">
                    {currentStudy.modality === 'XR' && currentStudy.bodyPart.includes('Knee') && (
                      'Medial bone-on-bone contact with full thickness cartilage erosion. Conservative injection failure likely. Patient qualifies for Total Knee Arthroplasty (TKR).'
                    )}
                    {currentStudy.modality === 'MR' && (
                      'Significant neural compromise at L4-L5. Correlate clinically with radiculopathy and dermatomal sensory deficits before scheduling microdiscectomy / fusion.'
                    )}
                    {currentStudy.modality === 'XR' && currentStudy.bodyPart.includes('Hip') && (
                      'Severe acetabular remodeling and osteophyte formation. Total Hip Replacement (THR) indicated if pain refractory to analgesia.'
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <a
                  href={currentStudy.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary !bg-teal-600 hover:!bg-teal-500 !text-white !text-xs !py-2.5 w-full flex items-center justify-center gap-2 font-bold shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Full-Res Raw Copy in New Window</span>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => window.print()}
                    className="btn-secondary !bg-slate-800 !text-slate-200 hover:!bg-slate-700 !border-slate-700 !text-xs !py-2 flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Film</span>
                  </button>
                  <a
                    href={currentStudy.imageUrl}
                    download={`${currentStudy.accessionNumber}-raw-radiograph.jpg`}
                    className="btn-secondary !bg-slate-800 !text-slate-200 hover:!bg-slate-700 !border-slate-700 !text-xs !py-2 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export DICOM</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
