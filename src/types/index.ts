// ============================================================
// RASA ORTHO OS — Core Type Definitions
// ============================================================

// --- Common ---
export type ID = string;
export type DateString = string; // ISO 8601
export type PhoneNumber = string;

export interface BaseEntity {
  id: ID;
  createdAt: DateString;
  updatedAt: DateString;
}

// --- Auth & RBAC ---
export type UserRole =
  | 'super_admin'
  | 'hospital_admin'
  | 'doctor'
  | 'surgeon'
  | 'nurse'
  | 'receptionist'
  | 'physiotherapist'
  | 'ot_manager'
  | 'inventory_manager'
  | 'finance_manager'
  | 'patient';

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone: PhoneNumber;
  role: UserRole;
  avatar?: string;
  branchIds: ID[];
  isActive: boolean;
}

export interface Branch {
  id: ID;
  name: string;
  city: string;
  address: string;
  phone: PhoneNumber;
  isActive: boolean;
}

// --- Patient ---
export type Gender = 'male' | 'female' | 'other';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type PatientStatus =
  | 'enquiry'
  | 'registered'
  | 'appointment_booked'
  | 'in_consultation'
  | 'under_investigation'
  | 'treatment_planned'
  | 'surgery_scheduled'
  | 'pre_op'
  | 'in_surgery'
  | 'post_op'
  | 'recovering'
  | 'discharged'
  | 'follow_up'
  | 'completed';

export interface Patient extends BaseEntity {
  patientId: string; // e.g., "RASA-2024-0001"
  firstName: string;
  lastName: string;
  dateOfBirth: DateString;
  age: number;
  gender: Gender;
  phone: PhoneNumber;
  email?: string;
  address: string;
  city: string;
  bloodGroup: BloodGroup;
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: PhoneNumber;
    relation: string;
  };
  assignedDoctorId?: ID;
  status: PatientStatus;
  branchId: ID;
  avatar?: string;
  medicalHistory: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
}

// --- Doctor ---
export type DoctorSpecialization =
  | 'Joint Replacement'
  | 'Spine Surgery'
  | 'Sports Medicine'
  | 'Trauma & Fracture'
  | 'Pediatric Orthopedics'
  | 'Hand & Microsurgery'
  | 'Foot & Ankle'
  | 'Orthopedic Oncology'
  | 'General Orthopedics';

export interface Doctor extends BaseEntity {
  userId: ID;
  name: string;
  specialization: DoctorSpecialization;
  qualification: string;
  experience: number; // years
  phone: PhoneNumber;
  email: string;
  avatar?: string;
  consultationFee: number;
  branchIds: ID[];
  isAvailable: boolean;
  bio: string;
  registrationNumber: string;
}

// --- Appointment ---
export type AppointmentStatus =
  | 'booked'
  | 'confirmed'
  | 'arrived'
  | 'waiting'
  | 'in_consultation'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'rescheduled';

export type AppointmentType =
  | 'new_consultation'
  | 'follow_up'
  | 'emergency'
  | 'pre_op'
  | 'post_op'
  | 'physiotherapy'
  | 'review'
  | 'walk_in';

export interface Appointment extends BaseEntity {
  patientId: ID;
  patientName: string;
  doctorId: ID;
  doctorName: string;
  date: DateString;
  startTime: string; // HH:mm
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  branchId: ID;
  waitingDuration?: number; // minutes
  tokenNumber?: number;
}

// --- Consultation ---
export interface Consultation extends BaseEntity {
  patientId: ID;
  doctorId: ID;
  appointmentId: ID;
  chiefComplaint: string;
  history: string;
  examination: string;
  diagnosis: string;
  diagnosisCode?: string; // ICD-10
  treatmentPlan: string;
  prescription: Prescription[];
  followUpDate?: DateString;
  followUpNotes?: string;
  attachments: string[];
  notes: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// --- Diagnostics ---
export type DiagnosticType = 'x_ray' | 'mri' | 'ct_scan' | 'blood_test' | 'ultrasound' | 'bone_density' | 'emg' | 'other';
export type DiagnosticStatus = 'ordered' | 'scheduled' | 'in_progress' | 'completed' | 'reviewed';

export interface DiagnosticRecord extends BaseEntity {
  patientId: ID;
  patientName: string;
  doctorId: ID;
  doctorName: string;
  type: DiagnosticType;
  testName: string;
  date: DateString;
  status: DiagnosticStatus;
  report?: string;
  images?: string[];
  findings?: string;
  notes?: string;
  branchId: ID;
}

// --- Surgery ---
export type SurgeryStatus =
  | 'recommended'
  | 'approved'
  | 'pre_op'
  | 'scheduled'
  | 'ready'
  | 'in_surgery'
  | 'recovery'
  | 'discharged'
  | 'follow_up';

export interface Surgery extends BaseEntity {
  patientId: ID;
  patientName: string;
  doctorId: ID;
  doctorName: string;
  procedure: string;
  procedureCode?: string;
  diagnosis: string;
  date: DateString;
  startTime?: string;
  endTime?: string;
  expectedDuration: number; // minutes
  otId: ID;
  otName: string;
  anaesthesiaType: string;
  anaesthetistId?: ID;
  anaesthetistName?: string;
  status: SurgeryStatus;
  team: { name: string; role: string }[];
  implants: ID[];
  documents: string[];
  consentSigned: boolean;
  notes?: string;
  branchId: ID;
  preOpChecklist: PreOpItem[];
}

export interface PreOpItem {
  id: ID;
  label: string;
  status: 'pending' | 'completed' | 'blocked';
  completedBy?: string;
  completedAt?: DateString;
  notes?: string;
}

// --- OT / Theatre ---
export interface OperatingTheatre extends BaseEntity {
  name: string;
  branchId: ID;
  isAvailable: boolean;
  currentSurgeryId?: ID;
  equipment: string[];
}

// --- Implant ---
export interface Implant extends BaseEntity {
  manufacturer: string;
  brand: string;
  model: string;
  size: string;
  type: string;
  batchNumber: string;
  lotNumber: string;
  serialNumber: string;
  supplier: string;
  purchaseDate: DateString;
  expiryDate: DateString;
  cost: number;
  stock: number;
  minStock: number;
  patientId?: ID;
  surgeryId?: ID;
  branchId: ID;
  status: 'available' | 'allocated' | 'used' | 'expired' | 'recalled';
}

// --- Recovery ---
export interface RecoveryPlan extends BaseEntity {
  patientId: ID;
  patientName: string;
  surgeryId: ID;
  doctorId: ID;
  doctorName: string;
  startDate: DateString;
  expectedEndDate: DateString;
  progress: number; // 0-100
  milestones: RecoveryMilestone[];
  status: 'active' | 'completed' | 'delayed' | 'paused';
}

export interface RecoveryMilestone {
  id: ID;
  label: string;
  targetDate: DateString;
  completedDate?: DateString;
  status: 'pending' | 'completed' | 'overdue' | 'skipped';
  type: 'medication' | 'physiotherapy' | 'wound_review' | 'xray' | 'follow_up' | 'milestone';
  notes?: string;
}

// --- Physiotherapy ---
export interface PhysiotherapyPlan extends BaseEntity {
  patientId: ID;
  patientName: string;
  doctorId: ID;
  therapistId?: ID;
  therapistName?: string;
  diagnosis: string;
  startDate: DateString;
  totalSessions: number;
  completedSessions: number;
  exercises: Exercise[];
  sessions: PhysiotherapySession[];
  status: 'active' | 'completed' | 'paused' | 'cancelled';
}

export interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  frequency: string;
}

export interface PhysiotherapySession extends BaseEntity {
  date: DateString;
  therapistName: string;
  painScore: number; // 0-10
  mobility: string;
  rom: string; // Range of Motion
  exercises: string[];
  notes: string;
  adherence: 'full' | 'partial' | 'missed';
}

// --- Follow-Up ---
export type FollowUpStatus = 'upcoming' | 'due_today' | 'overdue' | 'missed' | 'completed' | 'cancelled';

export interface FollowUp extends BaseEntity {
  patientId: ID;
  patientName: string;
  doctorId: ID;
  doctorName: string;
  surgeryId?: ID;
  date: DateString;
  type: string;
  reason: string;
  status: FollowUpStatus;
  notes?: string;
  daysSinceSurgery?: number;
  appointmentId?: ID;
  reminderSent: boolean;
}

// --- Communication ---
export type CommunicationChannel = 'whatsapp' | 'sms' | 'email' | 'voice' | 'phone';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'pending';

export interface Communication extends BaseEntity {
  patientId: ID;
  patientName: string;
  channel: CommunicationChannel;
  direction: 'inbound' | 'outbound';
  subject?: string;
  message: string;
  status: MessageStatus;
  template?: string;
  sentBy?: string;
}

// --- Finance ---
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  patientId: ID;
  patientName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
  status: InvoiceStatus;
  dueDate: DateString;
  branchId: ID;
}

export interface InvoiceItem {
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// --- Notification ---
export type NotificationType = 'critical' | 'important' | 'reminder' | 'informational';

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: DateString;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

// --- Audit Log ---
export interface AuditLog extends BaseEntity {
  userId: ID;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  entityId: ID;
  details: string;
  branchId: ID;
  ipAddress?: string;
}

// --- AI Task ---
export interface AITask extends BaseEntity {
  type: 'patient_summary' | 'follow_up_analysis' | 'operational_insight' | 'receptionist' | 'communication';
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  confidence?: number;
  isApproved?: boolean;
  approvedBy?: string;
}

// --- Dashboard ---
export interface DashboardStats {
  todayAppointments: number;
  waitingPatients: number;
  availableDoctors: number;
  todaySurgeries: number;
  pendingConsultations: number;
  pendingDischarge: number;
  followUpsDueToday: number;
  dailyRevenue: number;
  monthlyRevenue: number;
  otUtilization: number;
  bedOccupancy: number;
  criticalAlerts: number;
}

export interface PatientFlowFunnel {
  enquiry: number;
  appointment: number;
  consultation: number;
  investigation: number;
  treatment: number;
  surgery: number;
  recovery: number;
}

export interface CriticalAlert {
  id: ID;
  type: NotificationType;
  category: string;
  title: string;
  description: string;
  timestamp: DateString;
  actionLabel?: string;
  actionUrl?: string;
}
