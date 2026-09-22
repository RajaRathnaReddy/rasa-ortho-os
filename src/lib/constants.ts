import type { Branch } from '../types';

export const APP_NAME = 'RASA ORTHO OS';
export const APP_TAGLINE = 'One Intelligent Operating System for the Complete Orthopedic Patient Journey';

export const BRANCHES: Branch[] = [
  { id: 'branch-1', name: 'RASA Orthopedic Hospital', city: 'Hyderabad', address: '12-3-456, Banjara Hills, Hyderabad, Telangana 500034', phone: '+919876543210', isActive: true },
  { id: 'branch-2', name: 'RASA Orthopedic Clinic', city: 'Nandyal', address: '4-5-67, Gandhi Nagar, Nandyal, Andhra Pradesh 518501', phone: '+919876543211', isActive: true },
  { id: 'branch-3', name: 'RASA Orthopedic Center', city: 'Kurnool', address: '8-9-123, Bellary Road, Kurnool, Andhra Pradesh 518001', phone: '+919876543212', isActive: true },
  { id: 'branch-4', name: 'RASA Orthopedic Hospital', city: 'Vijayawada', address: '15-6-789, MG Road, Vijayawada, Andhra Pradesh 520010', phone: '+919876543213', isActive: true },
];

export const APPOINTMENT_STATUS_CONFIG = {
  booked: { label: 'Booked', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  confirmed: { label: 'Confirmed', color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  arrived: { label: 'Arrived', color: 'bg-teal-100 text-teal-700', dot: 'bg-teal-500' },
  waiting: { label: 'Waiting', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  in_consultation: { label: 'In Consultation', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
  no_show: { label: 'No Show', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  rescheduled: { label: 'Rescheduled', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
} as const;

export const SURGERY_STATUS_CONFIG = {
  recommended: { label: 'Recommended', color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-500' },
  approved: { label: 'Approved', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  pre_op: { label: 'Pre-Op', color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
  scheduled: { label: 'Scheduled', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  ready: { label: 'Ready', color: 'bg-teal-100 text-teal-700', dot: 'bg-teal-500' },
  in_surgery: { label: 'In Surgery', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  recovery: { label: 'Recovery', color: 'bg-cyan-100 text-cyan-700', dot: 'bg-cyan-500' },
  discharged: { label: 'Discharged', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  follow_up: { label: 'Follow Up', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
} as const;

export const PATIENT_STATUS_CONFIG = {
  enquiry: { label: 'Enquiry', color: 'bg-slate-100 text-slate-700' },
  registered: { label: 'Registered', color: 'bg-blue-100 text-blue-700' },
  appointment_booked: { label: 'Appointment Booked', color: 'bg-indigo-100 text-indigo-700' },
  in_consultation: { label: 'In Consultation', color: 'bg-purple-100 text-purple-700' },
  under_investigation: { label: 'Under Investigation', color: 'bg-amber-100 text-amber-700' },
  treatment_planned: { label: 'Treatment Planned', color: 'bg-teal-100 text-teal-700' },
  surgery_scheduled: { label: 'Surgery Scheduled', color: 'bg-orange-100 text-orange-700' },
  pre_op: { label: 'Pre-Op', color: 'bg-yellow-100 text-yellow-700' },
  in_surgery: { label: 'In Surgery', color: 'bg-red-100 text-red-700' },
  post_op: { label: 'Post-Op', color: 'bg-pink-100 text-pink-700' },
  recovering: { label: 'Recovering', color: 'bg-cyan-100 text-cyan-700' },
  discharged: { label: 'Discharged', color: 'bg-emerald-100 text-emerald-700' },
  follow_up: { label: 'Follow Up', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-600' },
} as const;

export const DIAGNOSTIC_TYPE_CONFIG = {
  x_ray: { label: 'X-Ray', icon: '📋' },
  mri: { label: 'MRI', icon: '🧲' },
  ct_scan: { label: 'CT Scan', icon: '🔬' },
  blood_test: { label: 'Blood Test', icon: '🩸' },
  ultrasound: { label: 'Ultrasound', icon: '📡' },
  bone_density: { label: 'Bone Density', icon: '🦴' },
  emg: { label: 'EMG', icon: '⚡' },
  other: { label: 'Other', icon: '📄' },
} as const;

export const FOLLOW_UP_STATUS_CONFIG = {
  upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  due_today: { label: 'Due Today', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  missed: { label: 'Missed', color: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
} as const;

export const NOTIFICATION_TYPE_CONFIG = {
  critical: { label: 'Critical', color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' },
  important: { label: 'Important', color: 'bg-amber-500', textColor: 'text-amber-600', bgLight: 'bg-amber-50' },
  reminder: { label: 'Reminder', color: 'bg-blue-500', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
  informational: { label: 'Info', color: 'bg-slate-400', textColor: 'text-slate-600', bgLight: 'bg-slate-50' },
} as const;

export const NAV_ITEMS = [
  { group: 'Overview', items: [
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  ]},
  { group: 'Patient Management', items: [
    { key: 'patients', label: 'Patients', path: '/patients', icon: 'Users' },
    { key: 'appointments', label: 'Appointments', path: '/appointments', icon: 'CalendarDays' },
    { key: 'reception', label: 'Reception', path: '/reception', icon: 'MonitorSmartphone' },
  ]},
  { group: 'Clinical', items: [
    { key: 'doctors', label: 'Doctors', path: '/doctors', icon: 'Stethoscope' },
    { key: 'consultations', label: 'Consultations', path: '/consultations', icon: 'ClipboardList' },
    { key: 'diagnostics', label: 'Diagnostics', path: '/diagnostics', icon: 'Microscope' },
  ]},
  { group: 'Surgical', items: [
    { key: 'surgeries', label: 'Surgeries', path: '/surgeries', icon: 'Syringe' },
    { key: 'ot-theatre', label: 'OT / Theatre', path: '/ot-theatre', icon: 'Activity' },
    { key: 'implants', label: 'Implants', path: '/implants', icon: 'Bone' },
  ]},
  { group: 'Recovery', items: [
    { key: 'recovery', label: 'Recovery', path: '/recovery', icon: 'HeartPulse' },
    { key: 'physiotherapy', label: 'Physiotherapy', path: '/physiotherapy', icon: 'Dumbbell' },
    { key: 'follow-ups', label: 'Follow-Ups', path: '/follow-ups', icon: 'CalendarCheck' },
  ]},
  { group: 'Operations', items: [
    { key: 'communication', label: 'Communication', path: '/communication', icon: 'MessageSquare' },
    { key: 'ai-assistant', label: 'AI Assistant', path: '/ai-assistant', icon: 'Bot' },
  ]},
  { group: 'Intelligence', items: [
    { key: 'reports', label: 'Reports', path: '/reports', icon: 'FileBarChart' },
    { key: 'analytics', label: 'Analytics', path: '/analytics', icon: 'TrendingUp' },
  ]},
  { group: 'Administration', items: [
    { key: 'finance', label: 'Finance', path: '/finance', icon: 'IndianRupee' },
    { key: 'inventory', label: 'Inventory', path: '/inventory', icon: 'Package' },
    { key: 'staff', label: 'Staff', path: '/staff', icon: 'UserCog' },
    { key: 'settings', label: 'Settings', path: '/settings', icon: 'Settings' },
  ]},
] as const;
