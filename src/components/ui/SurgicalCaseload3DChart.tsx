import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from '../../lib/cn';
import { Sparkles, Layers, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

export interface OrthoSpecialtyMonthData {
  month: string;
  knee: number;
  hip: number;
  spine: number;
  arthroscopy: number;
  trauma: number;
  total: number;
  revenueLakh: number;
  implantMargin: number;
}

interface SurgicalCaseload3DChartProps {
  data: OrthoSpecialtyMonthData[];
}

type ViewMode = '3d-stack' | '3d-waves' | '3d-grouped';

const SPECIALTY_CONFIG = {
  knee: {
    label: 'Knee Arthroplasty (TKR)',
    shortLabel: 'Knee TKR',
    frontGrad: ['#0d9488', '#14b8a6'],
    sideGrad: ['#0f766e', '#042f2e'],
    topGrad: ['#2dd4bf', '#5eead4'],
    color: '#0d9488',
    glow: 'rgba(13, 148, 136, 0.4)',
  },
  hip: {
    label: 'Hip Replacement (THR)',
    shortLabel: 'Hip THR',
    frontGrad: ['#0284c7', '#38bdf8'],
    sideGrad: ['#0369a1', '#075985'],
    topGrad: ['#7dd3fc', '#bae6fd'],
    color: '#0284c7',
    glow: 'rgba(2, 132, 199, 0.4)',
  },
  spine: {
    label: 'Spine Decompression',
    shortLabel: 'Spine',
    frontGrad: ['#d97706', '#fbbf24'],
    sideGrad: ['#b45309', '#78350f'],
    topGrad: ['#fcd34d', '#fef08a'],
    color: '#d97706',
    glow: 'rgba(217, 119, 6, 0.4)',
  },
  arthroscopy: {
    label: 'Sports Arthroscopy',
    shortLabel: 'Arthroscopy',
    frontGrad: ['#7c3aed', '#a855f7'],
    sideGrad: ['#6d28d9', '#4c1d95'],
    topGrad: ['#c084fc', '#e9d5ff'],
    color: '#7c3aed',
    glow: 'rgba(124, 58, 237, 0.4)',
  },
  trauma: {
    label: 'Trauma Fixation',
    shortLabel: 'Trauma',
    frontGrad: ['#e11d48', '#fb7185'],
    sideGrad: ['#be123c', '#881337'],
    topGrad: ['#fda4af', '#ffe4e6'],
    color: '#e11d48',
    glow: 'rgba(225, 29, 72, 0.4)',
  },
};

// ═══ CUSTOM 3D ISOMETRIC STACKED BAR SHAPE ═══
function Custom3DStackedBar(props: any) {
  const { x, y, width, height, dataKey, hoveredSpecialty } = props;
  if (!height || height <= 0 || isNaN(y) || isNaN(x)) return null;

  const depthX = 9;
  const depthY = -6;
  const isTop = dataKey === 'trauma';
  const isBottom = dataKey === 'knee';
  const isDimmed = hoveredSpecialty && hoveredSpecialty !== dataKey;
  const isHighlighted = hoveredSpecialty === dataKey;

  const cfg = SPECIALTY_CONFIG[dataKey as keyof typeof SPECIALTY_CONFIG] || SPECIALTY_CONFIG.knee;

  // Front face coordinates
  const fx = x;
  const fy = y;
  const fw = width;
  const fh = height;

  // Right side 3D extrusion coordinates
  const sidePoints = `${fx + fw},${fy} ${fx + fw + depthX},${fy + depthY} ${fx + fw + depthX},${fy + fh + depthY} ${fx + fw},${fy + fh}`;

  // Top 3D cap coordinates (visible for top-most segment or beveled rim)
  const topPoints = `${fx},${fy} ${fx + depthX},${fy + depthY} ${fx + fw + depthX},${fy + depthY} ${fx + fw},${fy}`;

  return (
    <g
      className="transition-all duration-200"
      style={{
        opacity: isDimmed ? 0.35 : 1,
        filter: isHighlighted ? 'drop-shadow(0px 0px 8px rgba(99, 102, 241, 0.6))' : undefined,
      }}
    >
      {/* 3D Base Floor Shadow (only rendered once by bottom-most segment) */}
      {isBottom && (
        <ellipse
          cx={fx + fw / 2 + depthX / 2}
          cy={fy + fh + 4}
          rx={fw / 2 + 5}
          ry={4}
          fill="#0f172a"
          opacity={0.16}
        />
      )}

      {/* Front Face with 3D gradient */}
      <rect
        x={fx}
        y={fy}
        width={fw}
        height={fh}
        fill={`url(#front-grad-${dataKey})`}
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth={0.75}
      />

      {/* Right Side 3D Facet (gives solid perspective depth) */}
      <polygon
        points={sidePoints}
        fill={`url(#side-grad-${dataKey})`}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={0.5}
      />

      {/* Top 3D Cap (specular bevel highlight) */}
      {isTop && (
        <polygon
          points={topPoints}
          fill={`url(#top-grad-${dataKey})`}
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth={0.75}
        />
      )}

      {/* Crisp Bevel Line Divider between stacked layers */}
      <line
        x1={fx}
        y1={fy}
        x2={fx + fw}
        y2={fy}
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth={1}
      />
      <line
        x1={fx + fw}
        y1={fy}
        x2={fx + fw + depthX}
        y2={fy + depthY}
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth={1}
      />
    </g>
  );
}

// ═══ CUSTOM 3D GROUPED COLUMN SHAPE ═══
function Custom3DGroupedBar(props: any) {
  const { x, y, width, height, dataKey, hoveredSpecialty } = props;
  if (!height || height <= 0 || isNaN(y) || isNaN(x)) return null;

  const depthX = 5;
  const depthY = -4;
  const isDimmed = hoveredSpecialty && hoveredSpecialty !== dataKey;

  const sidePoints = `${x + width},${y} ${x + width + depthX},${y + depthY} ${x + width + depthX},${y + height + depthY} ${x + width},${y + height}`;
  const topPoints = `${x},${y} ${x + depthX},${y + depthY} ${x + width + depthX},${y + depthY} ${x + width},${y}`;

  return (
    <g style={{ opacity: isDimmed ? 0.35 : 1 }}>
      {/* Base shadow */}
      <ellipse
        cx={x + width / 2 + depthX / 2}
        cy={y + height + 3}
        rx={width / 2 + 2}
        ry={3}
        fill="#0f172a"
        opacity={0.14}
      />
      {/* Front */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#front-grad-${dataKey})`}
        rx={1}
      />
      {/* Side */}
      <polygon points={sidePoints} fill={`url(#side-grad-${dataKey})`} />
      {/* Top */}
      <polygon points={topPoints} fill={`url(#top-grad-${dataKey})`} />
    </g>
  );
}

// ═══ CUSTOM 3D DEPTH TOOLTIP ═══
function Custom3DTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  const dataRow: OrthoSpecialtyMonthData = payload[0]?.payload;
  if (!dataRow) return null;

  const totalCases = dataRow.total || 0;

  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/80 min-w-[240px] text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div>
          <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">
            Orthopedic Caseload Audit
          </span>
          <h4 className="font-extrabold text-sm text-white">{label} 2026</h4>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-400">
            {totalCases} Surgeries
          </span>
          <span className="block text-[10px] text-slate-400 font-mono">
            ₹{dataRow.revenueLakh}L Revenue
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        {(['trauma', 'arthroscopy', 'spine', 'hip', 'knee'] as const).map((key) => {
          const val = dataRow[key] || 0;
          const pct = totalCases > 0 ? ((val / totalCases) * 100).toFixed(1) : '0';
          const cfg = SPECIALTY_CONFIG[key];

          return (
            <div key={key} className="flex items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0 shadow-xs"
                  style={{ backgroundColor: cfg.color }}
                />
                <span className="text-slate-300 truncate">{cfg.shortLabel}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono">
                <span className="font-bold text-white">{val} cases</span>
                <span className="text-slate-400 text-[10px] w-9 text-right">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <ShieldCheck className="w-3 h-3" /> Zero Clean SSI
        </span>
        <span className="font-mono">Margin: {dataRow.implantMargin}%</span>
      </div>
    </div>
  );
}

export function SurgicalCaseload3DChart({ data }: SurgicalCaseload3DChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('3d-stack');
  const [hoveredSpecialty, setHoveredSpecialty] = useState<string | null>(null);

  const totalSepCases = data.find(d => d.month === 'Sep')?.total || 80;
  const totalAprCases = data.find(d => d.month === 'Apr')?.total || 42;
  const growthPct = (((totalSepCases - totalAprCases) / totalAprCases) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* ═══ HEADER WITH 3D DEPTH CONTROLS ═══ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              Surgical Caseload Growth by Sub-Specialty
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-mono font-bold border border-teal-200">
              {totalSepCases} Cases / Sep 2026 Peak (+{growthPct}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Volumetric 3D procedural breakdown across Joint Arthroplasty, Spine, Arthroscopy & Trauma
          </p>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center gap-1 bg-surface-100 p-1 rounded-xl border border-surface-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('3d-stack')}
            className={cn(
              'px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === '3d-stack'
                ? 'bg-white text-slate-900 shadow-xs border border-surface-200'
                : 'text-slate-500 hover:text-slate-800'
            )}
            title="3D Isometric Stacked Pillars"
          >
            <Layers className="w-3.5 h-3.5 text-violet-600" />
            <span>3D Isometric</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('3d-waves')}
            className={cn(
              'px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === '3d-waves'
                ? 'bg-white text-slate-900 shadow-xs border border-surface-200'
                : 'text-slate-500 hover:text-slate-800'
            )}
            title="3D Layered Depth Flow"
          >
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>3D Depth Waves</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('3d-grouped')}
            className={cn(
              'px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer',
              viewMode === '3d-grouped'
                ? 'bg-white text-slate-900 shadow-xs border border-surface-200'
                : 'text-slate-500 hover:text-slate-800'
            )}
            title="3D Side-by-side Columns"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
            <span>3D Grouped</span>
          </button>
        </div>
      </div>

      {/* ═══ 3D CHART CANVAS CONTAINER ═══ */}
      <div className="relative h-76 w-full pt-2">
        {/* Subtle 3D Perspective Platform Floor Shadow */}
        <div className="absolute bottom-6 left-12 right-6 h-6 bg-gradient-to-t from-slate-200/50 via-slate-100/30 to-transparent rounded-full pointer-events-none -z-0" />

        <ResponsiveContainer width="100%" height="100%">
          {viewMode === '3d-waves' ? (
            <AreaChart data={data} margin={{ top: 15, right: 25, left: -10, bottom: 5 }}>
              <defs>
                {/* 3D Wave Gradients */}
                {Object.entries(SPECIALTY_CONFIG).map(([key, cfg]) => (
                  <linearGradient key={key} id={`wave-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cfg.color} stopOpacity={0.75} />
                    <stop offset="95%" stopColor={cfg.color} stopOpacity={0.08} />
                  </linearGradient>
                ))}
                <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.15" />
                </filter>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip content={<Custom3DTooltip />} />

              <Area
                type="monotone"
                dataKey="knee"
                stackId="1"
                stroke={SPECIALTY_CONFIG.knee.color}
                strokeWidth={2.5}
                fill="url(#wave-grad-knee)"
                name={SPECIALTY_CONFIG.knee.label}
              />
              <Area
                type="monotone"
                dataKey="hip"
                stackId="1"
                stroke={SPECIALTY_CONFIG.hip.color}
                strokeWidth={2.5}
                fill="url(#wave-grad-hip)"
                name={SPECIALTY_CONFIG.hip.label}
              />
              <Area
                type="monotone"
                dataKey="spine"
                stackId="1"
                stroke={SPECIALTY_CONFIG.spine.color}
                strokeWidth={2.5}
                fill="url(#wave-grad-spine)"
                name={SPECIALTY_CONFIG.spine.label}
              />
              <Area
                type="monotone"
                dataKey="arthroscopy"
                stackId="1"
                stroke={SPECIALTY_CONFIG.arthroscopy.color}
                strokeWidth={2.5}
                fill="url(#wave-grad-arthroscopy)"
                name={SPECIALTY_CONFIG.arthroscopy.label}
              />
              <Area
                type="monotone"
                dataKey="trauma"
                stackId="1"
                stroke={SPECIALTY_CONFIG.trauma.color}
                strokeWidth={2.5}
                fill="url(#wave-grad-trauma)"
                name={SPECIALTY_CONFIG.trauma.label}
              />
            </AreaChart>
          ) : viewMode === '3d-grouped' ? (
            <BarChart data={data} margin={{ top: 20, right: 25, left: -10, bottom: 5 }} barCategoryGap="20%">
              <defs>
                {Object.entries(SPECIALTY_CONFIG).map(([key, cfg]) => (
                  <React.Fragment key={key}>
                    <linearGradient id={`front-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.frontGrad[1]} />
                      <stop offset="100%" stopColor={cfg.frontGrad[0]} />
                    </linearGradient>
                    <linearGradient id={`side-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.sideGrad[0]} />
                      <stop offset="100%" stopColor={cfg.sideGrad[1]} />
                    </linearGradient>
                    <linearGradient id={`top-grad-${key}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={cfg.topGrad[0]} />
                      <stop offset="100%" stopColor={cfg.topGrad[1]} />
                    </linearGradient>
                  </React.Fragment>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip content={<Custom3DTooltip />} />

              <Bar
                dataKey="knee"
                shape={(p: any) => <Custom3DGroupedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.knee.label}
              />
              <Bar
                dataKey="hip"
                shape={(p: any) => <Custom3DGroupedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.hip.label}
              />
              <Bar
                dataKey="spine"
                shape={(p: any) => <Custom3DGroupedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.spine.label}
              />
              <Bar
                dataKey="arthroscopy"
                shape={(p: any) => <Custom3DGroupedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.arthroscopy.label}
              />
              <Bar
                dataKey="trauma"
                shape={(p: any) => <Custom3DGroupedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.trauma.label}
              />
            </BarChart>
          ) : (
            // 3D Isometric Stacked Pillars (Default)
            <BarChart
              data={data}
              margin={{ top: 25, right: 35, left: -10, bottom: 5 }}
              barSize={40}
            >
              <defs>
                {/* 3D Directional Lighting Gradients */}
                {Object.entries(SPECIALTY_CONFIG).map(([key, cfg]) => (
                  <React.Fragment key={key}>
                    {/* Front Face: Vertical sheen with directional light from top */}
                    <linearGradient id={`front-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.frontGrad[1]} />
                      <stop offset="100%" stopColor={cfg.frontGrad[0]} />
                    </linearGradient>

                    {/* Right Side Face: Deep shadow tone simulating isometric extrusion */}
                    <linearGradient id={`side-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.sideGrad[0]} />
                      <stop offset="100%" stopColor={cfg.sideGrad[1]} />
                    </linearGradient>

                    {/* Top Cap Face: High specular reflection */}
                    <linearGradient id={`top-grad-${key}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={cfg.topGrad[0]} />
                      <stop offset="100%" stopColor={cfg.topGrad[1]} />
                    </linearGradient>
                  </React.Fragment>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip content={<Custom3DTooltip />} />

              <Bar
                dataKey="knee"
                stackId="a"
                shape={(p: any) => <Custom3DStackedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.knee.label}
              />
              <Bar
                dataKey="hip"
                stackId="a"
                shape={(p: any) => <Custom3DStackedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.hip.label}
              />
              <Bar
                dataKey="spine"
                stackId="a"
                shape={(p: any) => <Custom3DStackedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.spine.label}
              />
              <Bar
                dataKey="arthroscopy"
                stackId="a"
                shape={(p: any) => <Custom3DStackedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.arthroscopy.label}
              />
              <Bar
                dataKey="trauma"
                stackId="a"
                shape={(p: any) => <Custom3DStackedBar {...p} hoveredSpecialty={hoveredSpecialty} />}
                name={SPECIALTY_CONFIG.trauma.label}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* ═══ INTERACTIVE 3D LEGEND WITH HOVER FOCUS ═══ */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-600 pt-3 border-t border-slate-100">
        {(Object.entries(SPECIALTY_CONFIG) as [keyof typeof SPECIALTY_CONFIG, typeof SPECIALTY_CONFIG['knee']][]).map(([key, cfg]) => {
          const isHovered = hoveredSpecialty === key;
          const isOtherHovered = hoveredSpecialty && hoveredSpecialty !== key;

          return (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setHoveredSpecialty(key)}
              onMouseLeave={() => setHoveredSpecialty(null)}
              className={cn(
                'flex items-center gap-2 px-2 py-1 rounded-lg transition-all cursor-pointer',
                isHovered && 'bg-slate-100 font-bold scale-105 shadow-2xs',
                isOtherHovered && 'opacity-40'
              )}
            >
              {/* 3D Mini Cube Icon */}
              <div
                className="w-3.5 h-3.5 rounded-sm relative shadow-xs"
                style={{
                  background: `linear-gradient(135deg, ${cfg.topGrad[0]} 0%, ${cfg.color} 50%, ${cfg.sideGrad[1]} 100%)`,
                  boxShadow: `0 2px 4px ${cfg.glow}`,
                }}
              />
              <span className="text-slate-800">{cfg.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
