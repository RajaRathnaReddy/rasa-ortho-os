// ============================================================
// RASA ORTHO OS — Realistic Mock Data
// 50 Patients, 20 Doctors, 100 Appointments, 20 Surgeries,
// 30 Follow-ups, 20 Physiotherapy plans, 50 Diagnostics, 30 Implants
// ============================================================

import type {
  Patient, Doctor, Appointment, Surgery, FollowUp, DiagnosticRecord,
  Implant, PhysiotherapyPlan, RecoveryPlan, Consultation, Communication,
  Invoice, Notification, AuditLog, CriticalAlert, DashboardStats,
  PatientFlowFunnel, OperatingTheatre, PreOpItem,
} from '../../types';

// ─── Helper ───
const today = new Date();
const d = (daysOffset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};
const dt = (daysOffset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
};

// ═══════════════════════════════════════════════════
//  DOCTORS (20)
// ═══════════════════════════════════════════════════
export const mockDoctors: Doctor[] = [
  { id: 'doc-1', userId: 'user-doc-1', name: 'Dr. Anand Krishnamurthy', specialization: 'Joint Replacement', qualification: 'MS Ortho, DNB, Fellowship (UK)', experience: 22, phone: '+919845012301', email: 'anand.k@rasaortho.com', consultationFee: 1500, branchIds: ['branch-1'], isAvailable: true, bio: 'Senior Joint Replacement Surgeon with over 3000+ successful knee and hip replacements.', registrationNumber: 'TSMC-12345', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-2', userId: 'user-doc-2', name: 'Dr. Priya Sharma', specialization: 'Spine Surgery', qualification: 'MS Ortho, MCh Spine', experience: 18, phone: '+919845012302', email: 'priya.s@rasaortho.com', consultationFee: 1800, branchIds: ['branch-1', 'branch-3'], isAvailable: true, bio: 'Fellowship trained spine surgeon specializing in minimally invasive spine procedures.', registrationNumber: 'TSMC-12346', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-3', userId: 'user-doc-3', name: 'Dr. Rajesh Reddy', specialization: 'Sports Medicine', qualification: 'MS Ortho, Fellowship Sports Medicine (Australia)', experience: 15, phone: '+919845012303', email: 'rajesh.r@rasaortho.com', consultationFee: 1200, branchIds: ['branch-1'], isAvailable: true, bio: 'Sports medicine specialist treating athletes and sports-related injuries.', registrationNumber: 'TSMC-12347', createdAt: dt(-300), updatedAt: dt(0) },
  { id: 'doc-4', userId: 'user-doc-4', name: 'Dr. Suresh Babu', specialization: 'Trauma & Fracture', qualification: 'MS Ortho, MRCS', experience: 20, phone: '+919845012304', email: 'suresh.b@rasaortho.com', consultationFee: 1000, branchIds: ['branch-1', 'branch-2'], isAvailable: true, bio: 'Expert in complex fracture management and polytrauma care.', registrationNumber: 'TSMC-12348', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-5', userId: 'user-doc-5', name: 'Dr. Meena Kumari', specialization: 'Pediatric Orthopedics', qualification: 'MS Ortho, Fellowship Pediatric Ortho', experience: 12, phone: '+919845012305', email: 'meena.k@rasaortho.com', consultationFee: 1000, branchIds: ['branch-1'], isAvailable: false, bio: 'Pediatric orthopedic surgeon specializing in congenital deformities and growth disorders.', registrationNumber: 'TSMC-12349', createdAt: dt(-280), updatedAt: dt(0) },
  { id: 'doc-6', userId: 'user-doc-6', name: 'Dr. Vikram Singh', specialization: 'Hand & Microsurgery', qualification: 'MS Ortho, MCh Hand Surgery', experience: 16, phone: '+919845012306', email: 'vikram.s@rasaortho.com', consultationFee: 1500, branchIds: ['branch-1'], isAvailable: true, bio: 'Reconstructive hand surgeon with expertise in microsurgery and replantation.', registrationNumber: 'TSMC-12350', createdAt: dt(-350), updatedAt: dt(0) },
  { id: 'doc-7', userId: 'user-doc-7', name: 'Dr. Lakshmi Narayana', specialization: 'Joint Replacement', qualification: 'MS Ortho, Fellowship Arthroplasty (Germany)', experience: 25, phone: '+919845012307', email: 'lakshmi.n@rasaortho.com', consultationFee: 2000, branchIds: ['branch-1', 'branch-4'], isAvailable: true, bio: 'Pioneer in robotic-assisted joint replacement surgery in the region.', registrationNumber: 'TSMC-12351', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-8', userId: 'user-doc-8', name: 'Dr. Arjun Patel', specialization: 'Sports Medicine', qualification: 'MS Ortho, FISM', experience: 10, phone: '+919845012308', email: 'arjun.p@rasaortho.com', consultationFee: 1000, branchIds: ['branch-2'], isAvailable: true, bio: 'Young sports medicine specialist focusing on arthroscopic surgeries.', registrationNumber: 'APMC-22345', createdAt: dt(-200), updatedAt: dt(0) },
  { id: 'doc-9', userId: 'user-doc-9', name: 'Dr. Kavitha Rao', specialization: 'Foot & Ankle', qualification: 'MS Ortho, Fellowship Foot & Ankle (USA)', experience: 14, phone: '+919845012309', email: 'kavitha.r@rasaortho.com', consultationFee: 1200, branchIds: ['branch-1', 'branch-3'], isAvailable: true, bio: 'Foot and ankle specialist with extensive training in complex reconstructive procedures.', registrationNumber: 'TSMC-12352', createdAt: dt(-250), updatedAt: dt(0) },
  { id: 'doc-10', userId: 'user-doc-10', name: 'Dr. Ramesh Chandra', specialization: 'Spine Surgery', qualification: 'MS Ortho, DNB, Fellowship Spine (Singapore)', experience: 19, phone: '+919845012310', email: 'ramesh.c@rasaortho.com', consultationFee: 1800, branchIds: ['branch-3'], isAvailable: true, bio: 'Advanced spine surgeon performing complex deformity corrections and disc replacements.', registrationNumber: 'APMC-22346', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-11', userId: 'user-doc-11', name: 'Dr. Sanjay Gupta', specialization: 'Trauma & Fracture', qualification: 'MS Ortho', experience: 8, phone: '+919845012311', email: 'sanjay.g@rasaortho.com', consultationFee: 800, branchIds: ['branch-2'], isAvailable: true, bio: 'Trauma surgeon specializing in emergency fracture care and management.', registrationNumber: 'APMC-22347', createdAt: dt(-180), updatedAt: dt(0) },
  { id: 'doc-12', userId: 'user-doc-12', name: 'Dr. Deepika Venkatesh', specialization: 'General Orthopedics', qualification: 'MS Ortho, DNB', experience: 11, phone: '+919845012312', email: 'deepika.v@rasaortho.com', consultationFee: 900, branchIds: ['branch-4'], isAvailable: true, bio: 'General orthopedic surgeon with special interest in osteoporosis management.', registrationNumber: 'APMC-22348', createdAt: dt(-220), updatedAt: dt(0) },
  { id: 'doc-13', userId: 'user-doc-13', name: 'Dr. Harish Kumar', specialization: 'Joint Replacement', qualification: 'MS Ortho, Fellowship (Japan)', experience: 17, phone: '+919845012313', email: 'harish.k@rasaortho.com', consultationFee: 1500, branchIds: ['branch-3'], isAvailable: true, bio: 'Joint replacement surgeon with expertise in revision arthroplasty.', registrationNumber: 'APMC-22349', createdAt: dt(-300), updatedAt: dt(0) },
  { id: 'doc-14', userId: 'user-doc-14', name: 'Dr. Nandini Iyer', specialization: 'Pediatric Orthopedics', qualification: 'MS Ortho, Fellowship Pediatric', experience: 9, phone: '+919845012314', email: 'nandini.i@rasaortho.com', consultationFee: 1000, branchIds: ['branch-4'], isAvailable: true, bio: 'Pediatric orthopedic specialist treating clubfoot and developmental dysplasia.', registrationNumber: 'APMC-22350', createdAt: dt(-150), updatedAt: dt(0) },
  { id: 'doc-15', userId: 'user-doc-15', name: 'Dr. Mohan Das', specialization: 'Orthopedic Oncology', qualification: 'MS Ortho, MCh Onco Surgery', experience: 21, phone: '+919845012315', email: 'mohan.d@rasaortho.com', consultationFee: 2000, branchIds: ['branch-1'], isAvailable: true, bio: 'Orthopedic oncologist specializing in bone tumors and limb salvage surgery.', registrationNumber: 'TSMC-12353', createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'doc-16', userId: 'user-doc-16', name: 'Dr. Aisha Begum', specialization: 'General Orthopedics', qualification: 'MS Ortho', experience: 7, phone: '+919845012316', email: 'aisha.b@rasaortho.com', consultationFee: 800, branchIds: ['branch-2'], isAvailable: true, bio: 'General orthopedic specialist with focus on arthritis management.', registrationNumber: 'APMC-22351', createdAt: dt(-120), updatedAt: dt(0) },
  { id: 'doc-17', userId: 'user-doc-17', name: 'Dr. Karthik Narayan', specialization: 'Trauma & Fracture', qualification: 'MS Ortho, MRCS (Edinburgh)', experience: 13, phone: '+919845012317', email: 'karthik.n@rasaortho.com', consultationFee: 1200, branchIds: ['branch-1', 'branch-4'], isAvailable: true, bio: 'Trauma specialist with expertise in pelvic and acetabular fractures.', registrationNumber: 'TSMC-12354', createdAt: dt(-260), updatedAt: dt(0) },
  { id: 'doc-18', userId: 'user-doc-18', name: 'Dr. Sunitha Reddy', specialization: 'Hand & Microsurgery', qualification: 'MS Ortho, MCh Plastic Surgery', experience: 15, phone: '+919845012318', email: 'sunitha.r@rasaortho.com', consultationFee: 1500, branchIds: ['branch-3'], isAvailable: false, bio: 'Hand surgeon and microsurgery expert handling complex upper limb reconstructions.', registrationNumber: 'APMC-22352', createdAt: dt(-300), updatedAt: dt(0) },
  { id: 'doc-19', userId: 'user-doc-19', name: 'Dr. Venkat Rao', specialization: 'Spine Surgery', qualification: 'MS Ortho, Fellowship Spine', experience: 16, phone: '+919845012319', email: 'venkat.r@rasaortho.com', consultationFee: 1600, branchIds: ['branch-4'], isAvailable: true, bio: 'Spine surgeon specializing in cervical spine pathologies and disc replacements.', registrationNumber: 'APMC-22353', createdAt: dt(-280), updatedAt: dt(0) },
  { id: 'doc-20', userId: 'user-doc-20', name: 'Dr. Padma Lakshmi', specialization: 'Sports Medicine', qualification: 'MS Ortho, FISM, Sports Fellowship (UK)', experience: 11, phone: '+919845012320', email: 'padma.l@rasaortho.com', consultationFee: 1200, branchIds: ['branch-1'], isAvailable: true, bio: 'Sports medicine physician and arthroscopy specialist for professional athletes.', registrationNumber: 'TSMC-12355', createdAt: dt(-200), updatedAt: dt(0) },
];

// ═══════════════════════════════════════════════════
//  PATIENTS (50)
// ═══════════════════════════════════════════════════
export const mockPatients: Patient[] = [
  // Demo Journey Patient — Rajesh Kumar Sharma
  { id: 'pat-1', patientId: 'RASA-2024-0001', firstName: 'Rajesh', lastName: 'Kumar Sharma', dateOfBirth: '1968-03-15', age: 58, gender: 'male', phone: '+919876501001', email: 'rajesh.sharma@gmail.com', address: '12-3-456, Banjara Hills', city: 'Hyderabad', bloodGroup: 'B+', allergies: ['Penicillin'], emergencyContact: { name: 'Sunita Sharma', phone: '+919876501002', relation: 'Wife' }, assignedDoctorId: 'doc-1', status: 'recovering', branchId: 'branch-1', medicalHistory: ['Hypertension', 'Type 2 Diabetes'], createdAt: dt(-45), updatedAt: dt(-2) },
  { id: 'pat-2', patientId: 'RASA-2024-0002', firstName: 'Lakshmi', lastName: 'Devi', dateOfBirth: '1955-07-22', age: 71, gender: 'female', phone: '+919876501003', email: '', address: '8-9-12, Kukatpally', city: 'Hyderabad', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Ravi Kumar', phone: '+919876501004', relation: 'Son' }, assignedDoctorId: 'doc-1', status: 'follow_up', branchId: 'branch-1', medicalHistory: ['Osteoarthritis', 'Hypothyroidism'], createdAt: dt(-90), updatedAt: dt(-5) },
  { id: 'pat-3', patientId: 'RASA-2024-0003', firstName: 'Mohammed', lastName: 'Irfan', dateOfBirth: '1985-11-08', age: 40, gender: 'male', phone: '+919876501005', email: 'irfan.m@yahoo.com', address: '3-4-567, Secunderabad', city: 'Hyderabad', bloodGroup: 'A+', allergies: ['Sulfa drugs'], emergencyContact: { name: 'Fatima Begum', phone: '+919876501006', relation: 'Wife' }, assignedDoctorId: 'doc-3', status: 'in_consultation', branchId: 'branch-1', medicalHistory: ['ACL tear history'], createdAt: dt(-30), updatedAt: dt(0) },
  { id: 'pat-4', patientId: 'RASA-2024-0004', firstName: 'Padmavathi', lastName: 'Naidu', dateOfBirth: '1960-01-30', age: 66, gender: 'female', phone: '+919876501007', email: '', address: '15-6-89, Ameerpet', city: 'Hyderabad', bloodGroup: 'AB+', allergies: [], emergencyContact: { name: 'Suresh Naidu', phone: '+919876501008', relation: 'Husband' }, assignedDoctorId: 'doc-7', status: 'surgery_scheduled', branchId: 'branch-1', medicalHistory: ['Osteoporosis', 'Vitamin D deficiency'], createdAt: dt(-20), updatedAt: dt(-1) },
  { id: 'pat-5', patientId: 'RASA-2024-0005', firstName: 'Venkatesh', lastName: 'Reddy', dateOfBirth: '1975-05-18', age: 51, gender: 'male', phone: '+919876501009', email: 'venkatesh.r@gmail.com', address: '22-4-56, Madhapur', city: 'Hyderabad', bloodGroup: 'B-', allergies: ['Aspirin'], emergencyContact: { name: 'Sarala Reddy', phone: '+919876501010', relation: 'Wife' }, assignedDoctorId: 'doc-2', status: 'under_investigation', branchId: 'branch-1', medicalHistory: ['Lumbar disc herniation'], createdAt: dt(-15), updatedAt: dt(-3) },
  { id: 'pat-6', patientId: 'RASA-2024-0006', firstName: 'Annapurna', lastName: 'Raju', dateOfBirth: '1948-12-05', age: 77, gender: 'female', phone: '+919876501011', email: '', address: '5-7-89, Dilsukhnagar', city: 'Hyderabad', bloodGroup: 'O-', allergies: ['Ibuprofen'], emergencyContact: { name: 'Ramesh Raju', phone: '+919876501012', relation: 'Son' }, assignedDoctorId: 'doc-1', status: 'post_op', branchId: 'branch-1', medicalHistory: ['Rheumatoid Arthritis', 'COPD'], createdAt: dt(-60), updatedAt: dt(-1) },
  { id: 'pat-7', patientId: 'RASA-2024-0007', firstName: 'Srinivas', lastName: 'Murthy', dateOfBirth: '1990-08-25', age: 36, gender: 'male', phone: '+919876501013', email: 'srini.m@outlook.com', address: '10-2-345, HITEC City', city: 'Hyderabad', bloodGroup: 'A-', allergies: [], emergencyContact: { name: 'Divya Murthy', phone: '+919876501014', relation: 'Wife' }, assignedDoctorId: 'doc-3', status: 'treatment_planned', branchId: 'branch-1', medicalHistory: ['Meniscus tear'], createdAt: dt(-10), updatedAt: dt(-2) },
  { id: 'pat-8', patientId: 'RASA-2024-0008', firstName: 'Bhagya', lastName: 'Lakshmi', dateOfBirth: '1972-04-12', age: 54, gender: 'female', phone: '+919876501015', email: 'bhagya.l@gmail.com', address: '7-3-201, Mehdipatnam', city: 'Hyderabad', bloodGroup: 'B+', allergies: ['Codeine'], emergencyContact: { name: 'Krishna Rao', phone: '+919876501016', relation: 'Husband' }, assignedDoctorId: 'doc-9', status: 'registered', branchId: 'branch-1', medicalHistory: ['Plantar fasciitis'], createdAt: dt(-5), updatedAt: dt(-1) },
  { id: 'pat-9', patientId: 'RASA-2024-0009', firstName: 'Ravi', lastName: 'Teja', dateOfBirth: '1995-06-30', age: 31, gender: 'male', phone: '+919876501017', email: 'ravi.teja@gmail.com', address: '18-4-56, Gachibowli', city: 'Hyderabad', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Suresh Teja', phone: '+919876501018', relation: 'Father' }, assignedDoctorId: 'doc-3', status: 'appointment_booked', branchId: 'branch-1', medicalHistory: ['Sports injury - shoulder'], createdAt: dt(-3), updatedAt: dt(0) },
  { id: 'pat-10', patientId: 'RASA-2024-0010', firstName: 'Saraswathi', lastName: 'Devi', dateOfBirth: '1952-09-14', age: 74, gender: 'female', phone: '+919876501019', email: '', address: '3-8-90, Tarnaka', city: 'Hyderabad', bloodGroup: 'A+', allergies: ['NSAIDs'], emergencyContact: { name: 'Prakash Kumar', phone: '+919876501020', relation: 'Son' }, assignedDoctorId: 'doc-7', status: 'discharged', branchId: 'branch-1', medicalHistory: ['Bilateral knee OA', 'Hypertension', 'Diabetes'], createdAt: dt(-120), updatedAt: dt(-15) },
  // 11-20: Nandyal branch patients
  { id: 'pat-11', patientId: 'RASA-2024-0011', firstName: 'Chandra', lastName: 'Sekhar', dateOfBirth: '1980-02-28', age: 46, gender: 'male', phone: '+919876501021', email: '', address: 'Gandhi Nagar', city: 'Nandyal', bloodGroup: 'B+', allergies: [], emergencyContact: { name: 'Radha Sekhar', phone: '+919876501022', relation: 'Wife' }, assignedDoctorId: 'doc-4', status: 'in_consultation', branchId: 'branch-2', medicalHistory: ['Femur fracture'], createdAt: dt(-8), updatedAt: dt(0) },
  { id: 'pat-12', patientId: 'RASA-2024-0012', firstName: 'Nagamani', lastName: 'Kumari', dateOfBirth: '1965-06-10', age: 61, gender: 'female', phone: '+919876501023', email: '', address: 'Srinivasa Nagar', city: 'Nandyal', bloodGroup: 'O+', allergies: ['Tramadol'], emergencyContact: { name: 'Venkat Rao', phone: '+919876501024', relation: 'Husband' }, assignedDoctorId: 'doc-8', status: 'follow_up', branchId: 'branch-2', medicalHistory: ['Rotator cuff tear', 'Hypertension'], createdAt: dt(-45), updatedAt: dt(-3) },
  { id: 'pat-13', patientId: 'RASA-2024-0013', firstName: 'Bhaskar', lastName: 'Reddy', dateOfBirth: '1958-11-22', age: 67, gender: 'male', phone: '+919876501025', email: 'bhaskar.r@gmail.com', address: 'Station Road', city: 'Nandyal', bloodGroup: 'A+', allergies: [], emergencyContact: { name: 'Kumari Reddy', phone: '+919876501026', relation: 'Wife' }, assignedDoctorId: 'doc-11', status: 'recovering', branchId: 'branch-2', medicalHistory: ['Hip fracture', 'Osteoporosis'], createdAt: dt(-35), updatedAt: dt(-5) },
  { id: 'pat-14', patientId: 'RASA-2024-0014', firstName: 'Jyothi', lastName: 'Prakash', dateOfBirth: '1988-03-05', age: 38, gender: 'female', phone: '+919876501027', email: 'jyothi.p@yahoo.com', address: 'Nehru Nagar', city: 'Nandyal', bloodGroup: 'AB+', allergies: [], emergencyContact: { name: 'Prakash Kumar', phone: '+919876501028', relation: 'Husband' }, assignedDoctorId: 'doc-16', status: 'appointment_booked', branchId: 'branch-2', medicalHistory: [], createdAt: dt(-2), updatedAt: dt(0) },
  { id: 'pat-15', patientId: 'RASA-2024-0015', firstName: 'Ramaiah', lastName: 'Goud', dateOfBirth: '1970-08-15', age: 56, gender: 'male', phone: '+919876501029', email: '', address: 'Bypass Road', city: 'Nandyal', bloodGroup: 'B-', allergies: ['Cephalosporins'], emergencyContact: { name: 'Lakshmi Goud', phone: '+919876501030', relation: 'Wife' }, assignedDoctorId: 'doc-4', status: 'pre_op', branchId: 'branch-2', medicalHistory: ['Degenerative disc disease'], createdAt: dt(-18), updatedAt: dt(-1) },
  { id: 'pat-16', patientId: 'RASA-2024-0016', firstName: 'Tulasi', lastName: 'Devi', dateOfBirth: '1945-04-20', age: 81, gender: 'female', phone: '+919876501031', email: '', address: 'Old Town', city: 'Nandyal', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Narasimha Rao', phone: '+919876501032', relation: 'Son' }, assignedDoctorId: 'doc-11', status: 'enquiry', branchId: 'branch-2', medicalHistory: ['Severe Osteoarthritis', 'Heart condition'], createdAt: dt(-1), updatedAt: dt(0) },
  { id: 'pat-17', patientId: 'RASA-2024-0017', firstName: 'Suresh', lastName: 'Kumar', dateOfBirth: '1992-12-10', age: 33, gender: 'male', phone: '+919876501033', email: 'suresh.k@gmail.com', address: 'Market Road', city: 'Nandyal', bloodGroup: 'A-', allergies: [], emergencyContact: { name: 'Ramesh Kumar', phone: '+919876501034', relation: 'Brother' }, assignedDoctorId: 'doc-8', status: 'completed', branchId: 'branch-2', medicalHistory: ['Ankle sprain recovery'], createdAt: dt(-60), updatedAt: dt(-20) },
  { id: 'pat-18', patientId: 'RASA-2024-0018', firstName: 'Parvathi', lastName: 'Amma', dateOfBirth: '1950-10-08', age: 75, gender: 'female', phone: '+919876501035', email: '', address: 'Temple Street', city: 'Nandyal', bloodGroup: 'B+', allergies: ['Morphine'], emergencyContact: { name: 'Shiva Rao', phone: '+919876501036', relation: 'Son' }, assignedDoctorId: 'doc-4', status: 'surgery_scheduled', branchId: 'branch-2', medicalHistory: ['Hip avascular necrosis', 'Diabetes'], createdAt: dt(-25), updatedAt: dt(-2) },
  { id: 'pat-19', patientId: 'RASA-2024-0019', firstName: 'Mahesh', lastName: 'Babu', dateOfBirth: '1978-07-04', age: 48, gender: 'male', phone: '+919876501037', email: 'mahesh.b@outlook.com', address: 'Ring Road', city: 'Nandyal', bloodGroup: 'O-', allergies: [], emergencyContact: { name: 'Anjali Babu', phone: '+919876501038', relation: 'Wife' }, assignedDoctorId: 'doc-8', status: 'under_investigation', branchId: 'branch-2', medicalHistory: ['Chronic shoulder instability'], createdAt: dt(-12), updatedAt: dt(-4) },
  { id: 'pat-20', patientId: 'RASA-2024-0020', firstName: 'Savithri', lastName: 'Kumari', dateOfBirth: '1963-05-25', age: 63, gender: 'female', phone: '+919876501039', email: '', address: 'Bus Stand Road', city: 'Nandyal', bloodGroup: 'AB-', allergies: [], emergencyContact: { name: 'Ravi Kumari', phone: '+919876501040', relation: 'Son' }, assignedDoctorId: 'doc-16', status: 'treatment_planned', branchId: 'branch-2', medicalHistory: ['Carpal tunnel syndrome'], createdAt: dt(-14), updatedAt: dt(-3) },
  // 21-35: Kurnool branch
  { id: 'pat-21', patientId: 'RASA-2024-0021', firstName: 'Nagarjuna', lastName: 'Rao', dateOfBirth: '1973-09-18', age: 53, gender: 'male', phone: '+919876501041', email: 'nagarjuna.r@gmail.com', address: 'Bellary Road', city: 'Kurnool', bloodGroup: 'A+', allergies: [], emergencyContact: { name: 'Vijaya Rao', phone: '+919876501042', relation: 'Wife' }, assignedDoctorId: 'doc-10', status: 'in_consultation', branchId: 'branch-3', medicalHistory: ['Cervical spondylosis'], createdAt: dt(-10), updatedAt: dt(0) },
  { id: 'pat-22', patientId: 'RASA-2024-0022', firstName: 'Kalyani', lastName: 'Sundaram', dateOfBirth: '1960-02-14', age: 66, gender: 'female', phone: '+919876501043', email: '', address: 'MG Road', city: 'Kurnool', bloodGroup: 'B+', allergies: ['Latex'], emergencyContact: { name: 'Sundaram Iyer', phone: '+919876501044', relation: 'Husband' }, assignedDoctorId: 'doc-13', status: 'recovering', branchId: 'branch-3', medicalHistory: ['Total hip replacement', 'Hypertension'], createdAt: dt(-50), updatedAt: dt(-4) },
  { id: 'pat-23', patientId: 'RASA-2024-0023', firstName: 'Srikanth', lastName: 'Reddy', dateOfBirth: '1982-06-30', age: 44, gender: 'male', phone: '+919876501045', email: 'srikanth.r@gmail.com', address: 'Ashok Nagar', city: 'Kurnool', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Madhavi Reddy', phone: '+919876501046', relation: 'Wife' }, assignedDoctorId: 'doc-2', status: 'treatment_planned', branchId: 'branch-3', medicalHistory: ['Lumbar spinal stenosis'], createdAt: dt(-16), updatedAt: dt(-2) },
  { id: 'pat-24', patientId: 'RASA-2024-0024', firstName: 'Pushpa', lastName: 'Kumari', dateOfBirth: '1956-11-05', age: 69, gender: 'female', phone: '+919876501047', email: '', address: 'SBI Colony', city: 'Kurnool', bloodGroup: 'A-', allergies: [], emergencyContact: { name: 'Raju Kumar', phone: '+919876501048', relation: 'Son' }, assignedDoctorId: 'doc-9', status: 'follow_up', branchId: 'branch-3', medicalHistory: ['Ankle reconstruction', 'Osteoporosis'], createdAt: dt(-80), updatedAt: dt(-7) },
  { id: 'pat-25', patientId: 'RASA-2024-0025', firstName: 'Gopal', lastName: 'Krishna', dateOfBirth: '1987-01-20', age: 39, gender: 'male', phone: '+919876501049', email: 'gopal.k@yahoo.com', address: 'Railway Station Area', city: 'Kurnool', bloodGroup: 'B-', allergies: ['Diclofenac'], emergencyContact: { name: 'Leela Krishna', phone: '+919876501050', relation: 'Wife' }, assignedDoctorId: 'doc-10', status: 'appointment_booked', branchId: 'branch-3', medicalHistory: [], createdAt: dt(-4), updatedAt: dt(0) },
  { id: 'pat-26', patientId: 'RASA-2024-0026', firstName: 'Rani', lastName: 'Devi', dateOfBirth: '1944-08-12', age: 82, gender: 'female', phone: '+919876501051', email: '', address: 'Gandhi Chowk', city: 'Kurnool', bloodGroup: 'O+', allergies: ['Naproxen'], emergencyContact: { name: 'Srinivas Rao', phone: '+919876501052', relation: 'Son' }, assignedDoctorId: 'doc-13', status: 'pre_op', branchId: 'branch-3', medicalHistory: ['Severe knee OA', 'Cardiac arrhythmia', 'Diabetes'], createdAt: dt(-22), updatedAt: dt(-1) },
  { id: 'pat-27', patientId: 'RASA-2024-0027', firstName: 'Anil', lastName: 'Kumar', dateOfBirth: '1996-04-08', age: 30, gender: 'male', phone: '+919876501053', email: 'anil.k@gmail.com', address: 'University Road', city: 'Kurnool', bloodGroup: 'AB+', allergies: [], emergencyContact: { name: 'Kumari Devi', phone: '+919876501054', relation: 'Mother' }, assignedDoctorId: 'doc-18', status: 'registered', branchId: 'branch-3', medicalHistory: ['Wrist fracture'], createdAt: dt(-6), updatedAt: dt(-2) },
  { id: 'pat-28', patientId: 'RASA-2024-0028', firstName: 'Savitha', lastName: 'Rao', dateOfBirth: '1970-10-30', age: 55, gender: 'female', phone: '+919876501055', email: 'savitha.r@gmail.com', address: 'Collector Office Road', city: 'Kurnool', bloodGroup: 'B+', allergies: [], emergencyContact: { name: 'Prasad Rao', phone: '+919876501056', relation: 'Husband' }, assignedDoctorId: 'doc-2', status: 'discharged', branchId: 'branch-3', medicalHistory: ['Spinal fusion', 'Hypothyroidism'], createdAt: dt(-70), updatedAt: dt(-20) },
  { id: 'pat-29', patientId: 'RASA-2024-0029', firstName: 'Prasanna', lastName: 'Kumar', dateOfBirth: '1968-03-22', age: 58, gender: 'male', phone: '+919876501057', email: '', address: 'Market Area', city: 'Kurnool', bloodGroup: 'A+', allergies: [], emergencyContact: { name: 'Gayathri Kumar', phone: '+919876501058', relation: 'Wife' }, assignedDoctorId: 'doc-13', status: 'in_surgery', branchId: 'branch-3', medicalHistory: ['Avascular necrosis hip'], createdAt: dt(-28), updatedAt: dt(0) },
  { id: 'pat-30', patientId: 'RASA-2024-0030', firstName: 'Manjula', lastName: 'Devi', dateOfBirth: '1958-07-15', age: 68, gender: 'female', phone: '+919876501059', email: '', address: 'Old Bus Stand', city: 'Kurnool', bloodGroup: 'O-', allergies: ['Metformin'], emergencyContact: { name: 'Srihari Rao', phone: '+919876501060', relation: 'Son' }, assignedDoctorId: 'doc-10', status: 'follow_up', branchId: 'branch-3', medicalHistory: ['Cervical disc replacement', 'Hypertension'], createdAt: dt(-90), updatedAt: dt(-5) },
  { id: 'pat-31', patientId: 'RASA-2024-0031', firstName: 'Ranga', lastName: 'Rao', dateOfBirth: '1950-05-10', age: 76, gender: 'male', phone: '+919876501061', email: '', address: 'Hospital Road', city: 'Kurnool', bloodGroup: 'B+', allergies: [], emergencyContact: { name: 'Kamala Rao', phone: '+919876501062', relation: 'Wife' }, assignedDoctorId: 'doc-9', status: 'completed', branchId: 'branch-3', medicalHistory: ['Achilles tendon repair'], createdAt: dt(-100), updatedAt: dt(-30) },
  { id: 'pat-32', patientId: 'RASA-2024-0032', firstName: 'Swathi', lastName: 'Reddy', dateOfBirth: '1993-12-18', age: 32, gender: 'female', phone: '+919876501063', email: 'swathi.r@outlook.com', address: 'IT Park Road', city: 'Kurnool', bloodGroup: 'A+', allergies: [], emergencyContact: { name: 'Praveen Reddy', phone: '+919876501064', relation: 'Husband' }, assignedDoctorId: 'doc-10', status: 'enquiry', branchId: 'branch-3', medicalHistory: [], createdAt: dt(-1), updatedAt: dt(0) },
  { id: 'pat-33', patientId: 'RASA-2024-0033', firstName: 'Venu', lastName: 'Gopal', dateOfBirth: '1976-08-25', age: 50, gender: 'male', phone: '+919876501065', email: 'venu.g@gmail.com', address: 'Judicial Colony', city: 'Kurnool', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Padma Gopal', phone: '+919876501066', relation: 'Wife' }, assignedDoctorId: 'doc-13', status: 'post_op', branchId: 'branch-3', medicalHistory: ['Knee replacement'], createdAt: dt(-40), updatedAt: dt(-2) },
  { id: 'pat-34', patientId: 'RASA-2024-0034', firstName: 'Usha', lastName: 'Rani', dateOfBirth: '1962-04-08', age: 64, gender: 'female', phone: '+919876501067', email: '', address: 'Teachers Colony', city: 'Kurnool', bloodGroup: 'AB+', allergies: ['Tetracycline'], emergencyContact: { name: 'Mohan Rao', phone: '+919876501068', relation: 'Husband' }, assignedDoctorId: 'doc-18', status: 'treatment_planned', branchId: 'branch-3', medicalHistory: ['Trigger finger', 'Carpal tunnel'], createdAt: dt(-13), updatedAt: dt(-3) },
  { id: 'pat-35', patientId: 'RASA-2024-0035', firstName: 'Kishore', lastName: 'Babu', dateOfBirth: '1984-11-02', age: 41, gender: 'male', phone: '+919876501069', email: 'kishore.b@gmail.com', address: 'Industrial Area', city: 'Kurnool', bloodGroup: 'B-', allergies: [], emergencyContact: { name: 'Suneetha Babu', phone: '+919876501070', relation: 'Wife' }, assignedDoctorId: 'doc-10', status: 'under_investigation', branchId: 'branch-3', medicalHistory: ['Chronic back pain'], createdAt: dt(-9), updatedAt: dt(-2) },
  // 36-50: Vijayawada branch
  { id: 'pat-36', patientId: 'RASA-2024-0036', firstName: 'Siva', lastName: 'Prasad', dateOfBirth: '1971-06-14', age: 55, gender: 'male', phone: '+919876501071', email: 'siva.p@gmail.com', address: 'Bandar Road', city: 'Vijayawada', bloodGroup: 'A+', allergies: [], emergencyContact: { name: 'Lakshmi Prasad', phone: '+919876501072', relation: 'Wife' }, assignedDoctorId: 'doc-7', status: 'surgery_scheduled', branchId: 'branch-4', medicalHistory: ['Bilateral knee OA'], createdAt: dt(-18), updatedAt: dt(-1) },
  { id: 'pat-37', patientId: 'RASA-2024-0037', firstName: 'Revathi', lastName: 'Krishna', dateOfBirth: '1959-03-28', age: 67, gender: 'female', phone: '+919876501073', email: '', address: 'Eluru Road', city: 'Vijayawada', bloodGroup: 'O+', allergies: ['Erythromycin'], emergencyContact: { name: 'Krishna Murthy', phone: '+919876501074', relation: 'Husband' }, assignedDoctorId: 'doc-12', status: 'follow_up', branchId: 'branch-4', medicalHistory: ['Hip replacement', 'Asthma'], createdAt: dt(-55), updatedAt: dt(-6) },
  { id: 'pat-38', patientId: 'RASA-2024-0038', firstName: 'Satish', lastName: 'Chandra', dateOfBirth: '1986-09-20', age: 40, gender: 'male', phone: '+919876501075', email: 'satish.c@yahoo.com', address: 'MG Road', city: 'Vijayawada', bloodGroup: 'B+', allergies: [], emergencyContact: { name: 'Radha Chandra', phone: '+919876501076', relation: 'Wife' }, assignedDoctorId: 'doc-17', status: 'in_consultation', branchId: 'branch-4', medicalHistory: ['Tibial plateau fracture'], createdAt: dt(-7), updatedAt: dt(0) },
  { id: 'pat-39', patientId: 'RASA-2024-0039', firstName: 'Kamala', lastName: 'Devi', dateOfBirth: '1953-12-01', age: 72, gender: 'female', phone: '+919876501077', email: '', address: 'Governorpet', city: 'Vijayawada', bloodGroup: 'A-', allergies: [], emergencyContact: { name: 'Ravi Kumar', phone: '+919876501078', relation: 'Son' }, assignedDoctorId: 'doc-19', status: 'recovering', branchId: 'branch-4', medicalHistory: ['Cervical fusion', 'Diabetes'], createdAt: dt(-40), updatedAt: dt(-3) },
  { id: 'pat-40', patientId: 'RASA-2024-0040', firstName: 'Pavan', lastName: 'Kumar', dateOfBirth: '1998-02-10', age: 28, gender: 'male', phone: '+919876501079', email: 'pavan.k@gmail.com', address: 'Benz Circle', city: 'Vijayawada', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Sudheer Kumar', phone: '+919876501080', relation: 'Father' }, assignedDoctorId: 'doc-17', status: 'appointment_booked', branchId: 'branch-4', medicalHistory: ['Cricket injury - shoulder'], createdAt: dt(-3), updatedAt: dt(0) },
  { id: 'pat-41', patientId: 'RASA-2024-0041', firstName: 'Anuradha', lastName: 'Sharma', dateOfBirth: '1966-07-22', age: 60, gender: 'female', phone: '+919876501081', email: 'anuradha.s@gmail.com', address: 'Labbipet', city: 'Vijayawada', bloodGroup: 'B+', allergies: ['Amoxicillin'], emergencyContact: { name: 'Vikram Sharma', phone: '+919876501082', relation: 'Husband' }, assignedDoctorId: 'doc-7', status: 'pre_op', branchId: 'branch-4', medicalHistory: ['Knee OA Grade 3', 'Hypertension'], createdAt: dt(-20), updatedAt: dt(-1) },
  { id: 'pat-42', patientId: 'RASA-2024-0042', firstName: 'Ramana', lastName: 'Murthy', dateOfBirth: '1955-01-18', age: 71, gender: 'male', phone: '+919876501083', email: '', address: 'One Town', city: 'Vijayawada', bloodGroup: 'AB+', allergies: [], emergencyContact: { name: 'Padma Murthy', phone: '+919876501084', relation: 'Wife' }, assignedDoctorId: 'doc-12', status: 'discharged', branchId: 'branch-4', medicalHistory: ['Spinal decompression', 'COPD'], createdAt: dt(-65), updatedAt: dt(-18) },
  { id: 'pat-43', patientId: 'RASA-2024-0043', firstName: 'Divya', lastName: 'Sri', dateOfBirth: '1991-05-05', age: 35, gender: 'female', phone: '+919876501085', email: 'divya.s@outlook.com', address: 'Auto Nagar', city: 'Vijayawada', bloodGroup: 'O-', allergies: [], emergencyContact: { name: 'Surya Prakash', phone: '+919876501086', relation: 'Husband' }, assignedDoctorId: 'doc-14', status: 'registered', branchId: 'branch-4', medicalHistory: ['Congenital hip dysplasia - childhood surgery'], createdAt: dt(-5), updatedAt: dt(-1) },
  { id: 'pat-44', patientId: 'RASA-2024-0044', firstName: 'Narasimha', lastName: 'Rao', dateOfBirth: '1962-10-15', age: 63, gender: 'male', phone: '+919876501087', email: 'narasimha.r@gmail.com', address: 'Patamata', city: 'Vijayawada', bloodGroup: 'A+', allergies: ['Sulfonamides'], emergencyContact: { name: 'Sarada Rao', phone: '+919876501088', relation: 'Wife' }, assignedDoctorId: 'doc-19', status: 'post_op', branchId: 'branch-4', medicalHistory: ['Lumbar disc replacement'], createdAt: dt(-32), updatedAt: dt(-2) },
  { id: 'pat-45', patientId: 'RASA-2024-0045', firstName: 'Vijaya', lastName: 'Lakshmi', dateOfBirth: '1974-08-30', age: 52, gender: 'female', phone: '+919876501089', email: '', address: 'Moghalrajpuram', city: 'Vijayawada', bloodGroup: 'B-', allergies: [], emergencyContact: { name: 'Subrahmanyam', phone: '+919876501090', relation: 'Husband' }, assignedDoctorId: 'doc-7', status: 'treatment_planned', branchId: 'branch-4', medicalHistory: ['ACL reconstruction'], createdAt: dt(-11), updatedAt: dt(-3) },
  { id: 'pat-46', patientId: 'RASA-2024-0046', firstName: 'Harsha', lastName: 'Vardhan', dateOfBirth: '1994-04-12', age: 32, gender: 'male', phone: '+919876501091', email: 'harsha.v@gmail.com', address: 'Gannavaram', city: 'Vijayawada', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Lavanya Vardhan', phone: '+919876501092', relation: 'Wife' }, assignedDoctorId: 'doc-17', status: 'enquiry', branchId: 'branch-4', medicalHistory: [], createdAt: dt(-2), updatedAt: dt(0) },
  { id: 'pat-47', patientId: 'RASA-2024-0047', firstName: 'Sarojini', lastName: 'Naidu', dateOfBirth: '1949-06-08', age: 77, gender: 'female', phone: '+919876501093', email: '', address: 'Kanuru', city: 'Vijayawada', bloodGroup: 'A+', allergies: ['Ciprofloxacin'], emergencyContact: { name: 'Vivek Naidu', phone: '+919876501094', relation: 'Son' }, assignedDoctorId: 'doc-12', status: 'in_surgery', branchId: 'branch-4', medicalHistory: ['Hip fracture', 'Osteoporosis', 'Anemia'], createdAt: dt(-15), updatedAt: dt(0) },
  { id: 'pat-48', patientId: 'RASA-2024-0048', firstName: 'Chakradhar', lastName: 'Singh', dateOfBirth: '1980-11-28', age: 45, gender: 'male', phone: '+919876501095', email: 'chakradhar.s@gmail.com', address: 'Tadepalli', city: 'Vijayawada', bloodGroup: 'B+', allergies: [], emergencyContact: { name: 'Priya Singh', phone: '+919876501096', relation: 'Wife' }, assignedDoctorId: 'doc-19', status: 'under_investigation', branchId: 'branch-4', medicalHistory: ['Cervical radiculopathy'], createdAt: dt(-8), updatedAt: dt(-2) },
  { id: 'pat-49', patientId: 'RASA-2024-0049', firstName: 'Madhavi', lastName: 'Latha', dateOfBirth: '1967-02-14', age: 59, gender: 'female', phone: '+919876501097', email: 'madhavi.l@yahoo.com', address: 'Machavaram', city: 'Vijayawada', bloodGroup: 'O+', allergies: [], emergencyContact: { name: 'Sambasiva Rao', phone: '+919876501098', relation: 'Husband' }, assignedDoctorId: 'doc-7', status: 'follow_up', branchId: 'branch-4', medicalHistory: ['Knee replacement', 'Hypertension', 'Diabetes'], createdAt: dt(-75), updatedAt: dt(-4) },
  { id: 'pat-50', patientId: 'RASA-2024-0050', firstName: 'Tirumala', lastName: 'Rao', dateOfBirth: '1957-09-03', age: 69, gender: 'male', phone: '+919876501099', email: '', address: 'Gunadala', city: 'Vijayawada', bloodGroup: 'A-', allergies: ['Gabapentin'], emergencyContact: { name: 'Sita Rao', phone: '+919876501100', relation: 'Wife' }, assignedDoctorId: 'doc-12', status: 'completed', branchId: 'branch-4', medicalHistory: ['Shoulder replacement', 'Gout'], createdAt: dt(-110), updatedAt: dt(-25) },
];

// ═══════════════════════════════════════════════════
//  APPOINTMENTS (100) - Generate programmatically
// ═══════════════════════════════════════════════════
const appointmentTypes: Array<import('../../types').AppointmentType> = ['new_consultation', 'follow_up', 'emergency', 'pre_op', 'post_op', 'physiotherapy', 'review', 'walk_in'];
const appointmentStatuses: Array<import('../../types').AppointmentStatus> = ['booked', 'confirmed', 'arrived', 'waiting', 'in_consultation', 'completed', 'cancelled', 'no_show', 'rescheduled'];
const reasons = [
  'Knee pain and swelling', 'Back pain radiating to legs', 'Shoulder injury', 'Hip replacement consultation',
  'Post-operative follow-up', 'Fracture review', 'Physiotherapy assessment', 'Joint replacement evaluation',
  'Sports injury', 'Chronic arthritis', 'Pre-operative assessment', 'Implant review',
  'Wrist pain', 'Ankle sprain', 'Neck pain', 'Spine consultation', 'Hand numbness',
  'Post-surgery wound review', 'X-ray review', 'MRI consultation',
];

export const mockAppointments: Appointment[] = Array.from({ length: 100 }, (_, i) => {
  const dayOffset = i < 20 ? 0 : i < 40 ? Math.floor(Math.random() * 7) : -(Math.floor(Math.random() * 30));
  const patientIdx = i % 50;
  const doctorIdx = i % 20;
  const patient = mockPatients[patientIdx];
  const doctor = mockDoctors[doctorIdx];
  const hour = 9 + (i % 9);
  const statusIdx = i < 20 ? i % 5 : i < 40 ? Math.min(5, i % 9) : 5 + (i % 4);

  return {
    id: `apt-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    date: d(dayOffset),
    startTime: `${hour.toString().padStart(2, '0')}:${(i % 2 === 0 ? '00' : '30')}`,
    endTime: `${hour.toString().padStart(2, '0')}:${(i % 2 === 0 ? '30' : '59')}`,
    type: appointmentTypes[i % appointmentTypes.length],
    status: appointmentStatuses[Math.min(statusIdx, appointmentStatuses.length - 1)],
    reason: reasons[i % reasons.length],
    notes: i % 3 === 0 ? 'Patient requested early morning slot' : undefined,
    branchId: patient.branchId,
    waitingDuration: i < 20 ? Math.floor(Math.random() * 45) + 5 : undefined,
    tokenNumber: i < 30 ? i + 1 : undefined,
    createdAt: dt(dayOffset - 3),
    updatedAt: dt(dayOffset),
  };
});

// ═══════════════════════════════════════════════════
//  SURGERIES (20)
// ═══════════════════════════════════════════════════
const surgeryStatuses: Array<import('../../types').SurgeryStatus> = ['recommended', 'approved', 'pre_op', 'scheduled', 'ready', 'in_surgery', 'recovery', 'discharged', 'follow_up'];
const procedures = [
  'Total Knee Replacement', 'Total Hip Replacement', 'ACL Reconstruction', 'Spinal Fusion',
  'Arthroscopic Meniscectomy', 'Rotator Cuff Repair', 'Cervical Disc Replacement',
  'Hip Hemiarthroplasty', 'ORIF Femur', 'Carpal Tunnel Release',
  'Achilles Tendon Repair', 'Lumbar Discectomy', 'Shoulder Arthroplasty',
  'Ankle Arthrodesis', 'Tibial Nailing', 'Spinal Decompression',
  'Unicompartmental Knee Replacement', 'Revision Hip Replacement', 'Wrist ORIF', 'Elbow Replacement'
];

const defaultPreOpChecklist: PreOpItem[] = [
  { id: 'pre-1', label: 'Patient Identity Verification', status: 'completed', completedBy: 'Nurse Ramya', completedAt: dt(-2) },
  { id: 'pre-2', label: 'Informed Consent Signed', status: 'completed', completedBy: 'Dr. Anand Krishnamurthy', completedAt: dt(-2) },
  { id: 'pre-3', label: 'Blood Tests (CBC, BMP, Coagulation)', status: 'completed', completedBy: 'Lab Tech Suresh', completedAt: dt(-3) },
  { id: 'pre-4', label: 'Pre-Op Imaging (X-Ray/MRI)', status: 'completed', completedBy: 'Radiology', completedAt: dt(-3) },
  { id: 'pre-5', label: 'Anaesthesia Assessment', status: 'completed', completedBy: 'Dr. Ramya Anaesthesia', completedAt: dt(-1) },
  { id: 'pre-6', label: 'Medication Review & NPO Status', status: 'completed', completedBy: 'Nurse Priya', completedAt: dt(-1) },
  { id: 'pre-7', label: 'Cardiac Fitness Clearance', status: 'completed', completedBy: 'Dr. Cardiac Consult', completedAt: dt(-2) },
  { id: 'pre-8', label: 'Implant Availability Confirmed', status: 'completed', completedBy: 'Inventory Mgr', completedAt: dt(-1) },
  { id: 'pre-9', label: 'OT Booking Confirmed', status: 'completed', completedBy: 'OT Manager', completedAt: dt(-1) },
  { id: 'pre-10', label: 'Payment / Insurance Confirmation', status: 'completed', completedBy: 'Finance Dept', completedAt: dt(-1) },
];

export const mockSurgeries: Surgery[] = Array.from({ length: 20 }, (_, i) => {
  const patient = mockPatients[i % 15]; // use first 15 surgical patients
  const doctor = mockDoctors[i % 8]; // first 8 surgeons
  const dayOffset = i < 3 ? 0 : i < 8 ? Math.floor(Math.random() * 7) + 1 : -(Math.floor(Math.random() * 30) + 1);
  return {
    id: `surg-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    procedure: procedures[i],
    diagnosis: patient.medicalHistory[0] || 'Orthopedic condition requiring surgery',
    date: d(dayOffset),
    startTime: `${(8 + Math.floor(i / 3)).toString().padStart(2, '0')}:00`,
    endTime: `${(10 + Math.floor(i / 3)).toString().padStart(2, '0')}:00`,
    expectedDuration: [90, 120, 60, 180, 45, 90, 120, 90, 120, 30, 60, 90, 120, 90, 120, 150, 90, 180, 60, 120][i],
    otId: `ot-${(i % 3) + 1}`,
    otName: `OT ${(i % 3) + 1}`,
    anaesthesiaType: i % 3 === 0 ? 'General' : i % 3 === 1 ? 'Spinal' : 'Regional Block',
    anaesthetistName: 'Dr. Ramya Srinivasan',
    status: surgeryStatuses[Math.min(i % surgeryStatuses.length, surgeryStatuses.length - 1)],
    team: [
      { name: doctor.name, role: 'Lead Surgeon' },
      { name: 'Dr. Ramya Srinivasan', role: 'Anaesthetist' },
      { name: 'Nurse Priya Rao', role: 'Scrub Nurse' },
      { name: 'Nurse Kamal Singh', role: 'Circulating Nurse' },
    ],
    implants: i < 10 ? [`imp-${i + 1}`] : [],
    documents: ['consent.pdf', 'pre-op-report.pdf'],
    consentSigned: true,
    branchId: patient.branchId,
    preOpChecklist: defaultPreOpChecklist.map((item, idx) => ({
      ...item,
      status: i >= 5 ? 'completed' as const : idx < (i + 3) ? 'completed' as const : idx === (i + 3) ? 'blocked' as const : 'pending' as const
    })),
    createdAt: dt(dayOffset - 10),
    updatedAt: dt(dayOffset),
  };
});

// ═══════════════════════════════════════════════════
//  OPERATING THEATRES
// ═══════════════════════════════════════════════════
export const mockOTs: OperatingTheatre[] = [
  { id: 'ot-1', name: 'OT 1 — Major Theatre', branchId: 'branch-1', isAvailable: false, currentSurgeryId: 'surg-1', equipment: ['C-Arm', 'Arthroscopy Tower', 'Navigation System'], createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'ot-2', name: 'OT 2 — Arthroscopy Suite', branchId: 'branch-1', isAvailable: true, equipment: ['Arthroscopy Tower', 'HD Camera System'], createdAt: dt(-365), updatedAt: dt(0) },
  { id: 'ot-3', name: 'OT 3 — Trauma Theatre', branchId: 'branch-1', isAvailable: true, equipment: ['C-Arm', 'Fracture Table', 'Power Tools'], createdAt: dt(-365), updatedAt: dt(0) },
];

// ═══════════════════════════════════════════════════
//  DIAGNOSTICS (50)
// ═══════════════════════════════════════════════════
const diagnosticTypes: Array<import('../../types').DiagnosticType> = ['x_ray', 'mri', 'ct_scan', 'blood_test', 'bone_density', 'ultrasound', 'emg'];
const diagnosticStatuses: Array<import('../../types').DiagnosticStatus> = ['ordered', 'scheduled', 'in_progress', 'completed', 'reviewed'];
const testNames: Record<string, string[]> = {
  x_ray: ['X-Ray Knee AP/Lateral', 'X-Ray Spine AP/Lateral', 'X-Ray Hip', 'X-Ray Shoulder', 'X-Ray Ankle', 'X-Ray Wrist'],
  mri: ['MRI Knee', 'MRI Lumbar Spine', 'MRI Cervical Spine', 'MRI Shoulder', 'MRI Hip'],
  ct_scan: ['CT Scan Spine', 'CT Scan Pelvis', 'CT Scan Knee'],
  blood_test: ['CBC', 'BMP', 'Coagulation Panel', 'HbA1c', 'Vitamin D', 'CRP', 'ESR'],
  bone_density: ['DEXA Scan Hip', 'DEXA Scan Spine'],
  ultrasound: ['USG Knee Joint', 'USG Shoulder'],
  emg: ['NCV/EMG Upper Limb', 'NCV/EMG Lower Limb'],
};

export const mockDiagnostics: DiagnosticRecord[] = Array.from({ length: 50 }, (_, i) => {
  const patient = mockPatients[i % 50];
  const doctor = mockDoctors[i % 20];
  const type = diagnosticTypes[i % diagnosticTypes.length];
  const names = testNames[type] || ['General Test'];
  const dayOffset = -(Math.floor(Math.random() * 30));
  return {
    id: `diag-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    type,
    testName: names[i % names.length],
    date: d(dayOffset),
    status: diagnosticStatuses[Math.min(i % diagnosticStatuses.length, diagnosticStatuses.length - 1)],
    findings: i % 3 === 0 ? 'Grade 4 osteoarthritis with significant joint space narrowing and osteophyte formation.' : undefined,
    notes: i % 4 === 0 ? 'Urgent priority' : undefined,
    branchId: patient.branchId,
    createdAt: dt(dayOffset - 1),
    updatedAt: dt(dayOffset),
  };
});

// ═══════════════════════════════════════════════════
//  IMPLANTS (30)
// ═══════════════════════════════════════════════════
const manufacturers = ['Zimmer Biomet', 'DePuy Synthes', 'Stryker', 'Smith & Nephew', 'Medtronic'];
const implantModels = [
  { model: 'NexGen LPS-Flex', type: 'Knee System', brand: 'Zimmer Biomet' },
  { model: 'Attune Knee System', type: 'Knee System', brand: 'DePuy Synthes' },
  { model: 'Triathlon Knee System', type: 'Knee System', brand: 'Stryker' },
  { model: 'Journey II', type: 'Knee System', brand: 'Smith & Nephew' },
  { model: 'Taperloc Hip Stem', type: 'Hip System', brand: 'Zimmer Biomet' },
  { model: 'Corail Hip Stem', type: 'Hip System', brand: 'DePuy Synthes' },
  { model: 'Accolade II', type: 'Hip System', brand: 'Stryker' },
  { model: 'Anthology Hip', type: 'Hip System', brand: 'Smith & Nephew' },
  { model: 'Prestige LP', type: 'Cervical Disc', brand: 'Medtronic' },
  { model: 'Mobi-C', type: 'Cervical Disc', brand: 'Zimmer Biomet' },
];

export const mockImplants: Implant[] = Array.from({ length: 30 }, (_, i) => {
  const impl = implantModels[i % implantModels.length];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const isUsed = i < 10;
  return {
    id: `imp-${i + 1}`,
    manufacturer: impl.brand,
    brand: impl.brand,
    model: impl.model,
    size: sizes[i % sizes.length],
    type: impl.type,
    batchNumber: `BATCH-${2024}-${(i + 1).toString().padStart(4, '0')}`,
    lotNumber: `LOT-${(i * 7 + 100).toString()}`,
    serialNumber: `SN-${impl.brand.replace(/\s/g, '').toUpperCase()}-${(10000 + i * 37).toString()}`,
    supplier: `${impl.brand} India Pvt Ltd`,
    purchaseDate: d(-(180 + i * 5)),
    expiryDate: d(365 * 3 - i * 10),
    cost: [185000, 195000, 210000, 175000, 165000, 200000, 220000, 180000, 350000, 280000][i % 10],
    stock: isUsed ? 0 : Math.floor(Math.random() * 5) + 1,
    minStock: 2,
    patientId: isUsed ? mockPatients[i].id : undefined,
    surgeryId: isUsed ? `surg-${i + 1}` : undefined,
    branchId: i < 15 ? 'branch-1' : i < 22 ? 'branch-2' : i < 27 ? 'branch-3' : 'branch-4',
    status: isUsed ? 'used' : i === 28 ? 'expired' : 'available',
    createdAt: dt(-(180 + i * 5)),
    updatedAt: dt(isUsed ? -(Math.floor(Math.random() * 30)) : -(180 + i * 5)),
  };
});

// ═══════════════════════════════════════════════════
//  FOLLOW-UPS (30)
// ═══════════════════════════════════════════════════
const followUpStatuses: Array<import('../../types').FollowUpStatus> = ['upcoming', 'due_today', 'overdue', 'missed', 'completed'];

export const mockFollowUps: FollowUp[] = Array.from({ length: 30 }, (_, i) => {
  const patient = mockPatients[i % 20]; // first 20 surgical patients
  const doctor = mockDoctors[i % 10];
  const dayOffset = i < 5 ? 0 : i < 10 ? Math.floor(Math.random() * 7) + 1 : i < 15 ? -(Math.floor(Math.random() * 7) + 1) : -(Math.floor(Math.random() * 30) + 1);
  const status: import('../../types').FollowUpStatus = i < 5 ? 'due_today' : i < 10 ? 'upcoming' : i < 15 ? 'overdue' : i < 20 ? 'missed' : 'completed';

  return {
    id: `fu-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    surgeryId: i < 15 ? `surg-${(i % 10) + 1}` : undefined,
    date: d(dayOffset),
    type: i < 10 ? 'Post-Operative' : 'Routine',
    reason: ['Post-surgery wound check', 'Physiotherapy progress', 'X-ray review', 'Implant assessment', 'Recovery milestone'][i % 5],
    status,
    daysSinceSurgery: [7, 14, 30, 60, 90][i % 5],
    reminderSent: i < 20,
    createdAt: dt(dayOffset - 7),
    updatedAt: dt(dayOffset),
  };
});

// ═══════════════════════════════════════════════════
//  PHYSIOTHERAPY PLANS (20)
// ═══════════════════════════════════════════════════
export const mockPhysiotherapy: PhysiotherapyPlan[] = Array.from({ length: 20 }, (_, i) => {
  const patient = mockPatients[i % 15];
  return {
    id: `physio-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    doctorId: mockDoctors[i % 5].id,
    therapistName: ['Arun Kumar PT', 'Kavitha Rani PT', 'Mohan PT', 'Divya PT'][i % 4],
    diagnosis: patient.medicalHistory[0] || 'Post-operative rehabilitation',
    startDate: d(-(30 - i * 2)),
    totalSessions: [8, 10, 12, 6, 15][i % 5],
    completedSessions: Math.min([6, 7, 10, 4, 12][i % 5], [8, 10, 12, 6, 15][i % 5]),
    exercises: [
      { name: 'Quadriceps Strengthening', description: 'Seated leg extensions', sets: 3, reps: 15, frequency: 'Daily' },
      { name: 'Range of Motion', description: 'Gentle knee flexion and extension', sets: 3, reps: 10, frequency: 'Twice daily' },
      { name: 'Ankle Pumps', description: 'Ankle dorsiflexion and plantarflexion', sets: 3, reps: 20, frequency: 'Every 2 hours' },
      { name: 'Straight Leg Raise', description: 'Supine straight leg raises', sets: 3, reps: 10, frequency: 'Daily' },
    ],
    sessions: [],
    status: i < 12 ? 'active' : i < 16 ? 'completed' : 'paused',
    createdAt: dt(-(30 - i * 2)),
    updatedAt: dt(-i),
  };
});

// ═══════════════════════════════════════════════════
//  RECOVERY PLANS
// ═══════════════════════════════════════════════════
export const mockRecoveryPlans: RecoveryPlan[] = Array.from({ length: 10 }, (_, i) => {
  const patient = mockPatients[i];
  return {
    id: `recovery-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    surgeryId: `surg-${i + 1}`,
    doctorId: mockDoctors[i % 5].id,
    doctorName: mockDoctors[i % 5].name,
    startDate: d(-(30 - i * 3)),
    expectedEndDate: d(60 + i * 5),
    progress: [80, 65, 90, 45, 70, 55, 85, 40, 75, 95][i],
    milestones: [
      { id: `rm-${i}-1`, label: 'Surgery Completed', targetDate: d(-(30 - i * 3)), completedDate: d(-(30 - i * 3)), status: 'completed', type: 'milestone' },
      { id: `rm-${i}-2`, label: 'Discharge', targetDate: d(-(26 - i * 3)), completedDate: d(-(26 - i * 3)), status: 'completed', type: 'milestone' },
      { id: `rm-${i}-3`, label: 'Wound Review', targetDate: d(-(23 - i * 3)), status: i < 5 ? 'completed' : 'pending', type: 'wound_review', completedDate: i < 5 ? d(-(23 - i * 3)) : undefined },
      { id: `rm-${i}-4`, label: 'Physiotherapy Start', targetDate: d(-(20 - i * 3)), status: i < 7 ? 'completed' : 'pending', type: 'physiotherapy', completedDate: i < 7 ? d(-(20 - i * 3)) : undefined },
      { id: `rm-${i}-5`, label: 'Follow-up X-Ray', targetDate: d(-(10 - i * 3)), status: i < 3 ? 'completed' : i < 6 ? 'pending' : 'overdue', type: 'xray' },
      { id: `rm-${i}-6`, label: '30-Day Review', targetDate: d(i * 3), status: 'pending', type: 'follow_up' },
      { id: `rm-${i}-7`, label: '90-Day Review', targetDate: d(60 + i * 3), status: 'pending', type: 'follow_up' },
    ],
    status: i < 8 ? 'active' : 'completed',
    createdAt: dt(-(30 - i * 3)),
    updatedAt: dt(-i),
  };
});

// ═══════════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════════
export const mockNotifications: Notification[] = [
  { id: 'notif-1', type: 'critical', title: 'Implant Unavailable', message: 'Patient Padmavathi Naidu surgery tomorrow but Zimmer NexGen Medium size implant stock is 0.', timestamp: dt(0), read: false, actionUrl: '/implants' },
  { id: 'notif-2', type: 'critical', title: 'Emergency Admission', message: 'Trauma patient Chandra Sekhar admitted with compound femur fracture. Requires immediate surgical consult.', timestamp: dt(0), read: false, actionUrl: '/patients/pat-11' },
  { id: 'notif-3', type: 'important', title: 'Overdue Follow-Ups', message: '12 post-operative patients are overdue for follow-up appointments.', timestamp: dt(0), read: false, actionUrl: '/follow-ups' },
  { id: 'notif-4', type: 'important', title: 'Pending Reports', message: 'Dr. Rajesh Reddy has 5 pending diagnostic reports to review.', timestamp: dt(0), read: false, actionUrl: '/diagnostics' },
  { id: 'notif-5', type: 'important', title: 'Missed Physiotherapy', message: '3 patients missed their physiotherapy sessions this week.', timestamp: dt(0), read: true },
  { id: 'notif-6', type: 'reminder', title: 'Surgery Tomorrow', message: 'Padmavathi Naidu — Total Knee Replacement scheduled for tomorrow at 8:00 AM in OT 1.', timestamp: dt(0), read: false, actionUrl: '/surgeries/surg-4' },
  { id: 'notif-7', type: 'reminder', title: 'Pre-Op Incomplete', message: 'Rani Devi pre-operative checklist is 70% complete. Cardiac clearance pending.', timestamp: dt(0), read: false, actionUrl: '/surgeries/surg-6' },
  { id: 'notif-8', type: 'informational', title: 'Monthly Report Ready', message: 'September 2024 operational report is ready for review.', timestamp: dt(-1), read: true, actionUrl: '/reports' },
  { id: 'notif-9', type: 'informational', title: 'Staff Schedule Updated', message: 'Next week OT schedule has been updated by Dr. Anand Krishnamurthy.', timestamp: dt(-1), read: true },
  { id: 'notif-10', type: 'reminder', title: 'Inventory Reorder', message: 'DePuy Attune Knee System stock below minimum level. Current: 1, Minimum: 2.', timestamp: dt(0), read: false, actionUrl: '/implants' },
];

// ═══════════════════════════════════════════════════
//  CRITICAL ALERTS (Dashboard)
// ═══════════════════════════════════════════════════
export const mockCriticalAlerts: CriticalAlert[] = [
  { id: 'alert-1', type: 'critical', category: 'Implant', title: 'Implant Stock Critical', description: 'Zimmer NexGen Medium — 0 units remaining. Surgery scheduled tomorrow.', timestamp: dt(0), actionLabel: 'View Inventory', actionUrl: '/implants' },
  { id: 'alert-2', type: 'critical', category: 'Surgery', title: 'Pre-Op Incomplete', description: 'Rani Devi — Cardiac clearance pending for hip replacement surgery.', timestamp: dt(0), actionLabel: 'View Checklist', actionUrl: '/surgeries' },
  { id: 'alert-3', type: 'important', category: 'Follow-Up', title: '12 Overdue Follow-Ups', description: '12 post-operative patients have missed their scheduled follow-up appointments.', timestamp: dt(0), actionLabel: 'View Follow-Ups', actionUrl: '/follow-ups' },
  { id: 'alert-4', type: 'important', category: 'Diagnostics', title: '5 Unreviewed Reports', description: 'Dr. Rajesh Reddy has 5 diagnostic reports pending review for more than 48 hours.', timestamp: dt(0), actionLabel: 'View Reports', actionUrl: '/diagnostics' },
  { id: 'alert-5', type: 'important', category: 'Discharge', title: '2 Pending Discharges', description: 'Annapurna Raju and Venu Gopal are awaiting discharge clearance.', timestamp: dt(0), actionLabel: 'Process', actionUrl: '/patients' },
  { id: 'alert-6', type: 'reminder', category: 'Physiotherapy', title: 'Missed Sessions', description: '3 patients missed physiotherapy sessions this week. Adherence below target.', timestamp: dt(0), actionLabel: 'View Details', actionUrl: '/physiotherapy' },
  { id: 'alert-7', type: 'important', category: 'Recovery', title: 'Overdue X-Rays', description: '4 recovering patients are overdue for follow-up X-ray imaging.', timestamp: dt(0), actionLabel: 'Schedule', actionUrl: '/recovery' },
];

// ═══════════════════════════════════════════════════
//  DASHBOARD STATS
// ═══════════════════════════════════════════════════
export const mockDashboardStats: DashboardStats = {
  todayAppointments: 24,
  waitingPatients: 7,
  availableDoctors: 12,
  todaySurgeries: 3,
  pendingConsultations: 5,
  pendingDischarge: 2,
  followUpsDueToday: 5,
  dailyRevenue: 485000,
  monthlyRevenue: 12850000,
  otUtilization: 72,
  bedOccupancy: 68,
  criticalAlerts: 7,
};

export const mockPatientFlowFunnel: PatientFlowFunnel = {
  enquiry: 45,
  appointment: 38,
  consultation: 32,
  investigation: 24,
  treatment: 18,
  surgery: 12,
  recovery: 8,
};

// ═══════════════════════════════════════════════════
//  COMMUNICATIONS
// ═══════════════════════════════════════════════════
export const mockCommunications: Communication[] = Array.from({ length: 20 }, (_, i) => {
  const patient = mockPatients[i % 20];
  const channels: Array<import('../../types').CommunicationChannel> = ['whatsapp', 'sms', 'email', 'voice', 'phone'];
  const templates = [
    'Appointment Reminder', 'Surgery Reminder', 'Discharge Instructions',
    'Follow-Up Reminder', 'Physiotherapy Reminder', 'Payment Reminder',
  ];
  return {
    id: `comm-${i + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    channel: channels[i % channels.length],
    direction: i % 3 === 0 ? 'inbound' as const : 'outbound' as const,
    subject: templates[i % templates.length],
    message: `Dear ${patient.firstName}, your ${templates[i % templates.length].toLowerCase()} has been sent. Please contact us for any queries.`,
    status: i < 15 ? 'delivered' as const : 'sent' as const,
    template: templates[i % templates.length],
    sentBy: 'System',
    createdAt: dt(-(i * 2)),
    updatedAt: dt(-(i * 2)),
  };
});

// ═══════════════════════════════════════════════════
//  AUDIT LOGS
// ═══════════════════════════════════════════════════
export const mockAuditLogs: AuditLog[] = [
  { id: 'audit-1', userId: 'user-doc-1', userName: 'Dr. Anand Krishnamurthy', userRole: 'doctor', action: 'Updated diagnosis', entity: 'Consultation', entityId: 'cons-1', details: 'Updated diagnosis to Grade 4 Osteoarthritis for patient Rajesh Kumar Sharma', branchId: 'branch-1', createdAt: dt(0), updatedAt: dt(0) },
  { id: 'audit-2', userId: 'user-rec-1', userName: 'Priya Receptionist', userRole: 'receptionist', action: 'Created appointment', entity: 'Appointment', entityId: 'apt-1', details: 'Booked appointment for Rajesh Kumar Sharma with Dr. Anand Krishnamurthy', branchId: 'branch-1', createdAt: dt(0), updatedAt: dt(0) },
  { id: 'audit-3', userId: 'user-inv-1', userName: 'Ramesh Inventory', userRole: 'inventory_manager', action: 'Issued implant', entity: 'Implant', entityId: 'imp-1', details: 'Issued Zimmer NexGen LPS-Flex Medium to Surgery surg-1 for patient Rajesh Kumar Sharma', branchId: 'branch-1', createdAt: dt(0), updatedAt: dt(0) },
  { id: 'audit-4', userId: 'user-doc-2', userName: 'Dr. Priya Sharma', userRole: 'surgeon', action: 'Completed surgery', entity: 'Surgery', entityId: 'surg-5', details: 'Completed Arthroscopic Meniscectomy for Venkatesh Reddy', branchId: 'branch-1', createdAt: dt(-1), updatedAt: dt(-1) },
  { id: 'audit-5', userId: 'user-nurse-1', userName: 'Nurse Ramya', userRole: 'nurse', action: 'Updated pre-op checklist', entity: 'Surgery', entityId: 'surg-4', details: 'Marked "Patient Identity Verification" as completed for Padmavathi Naidu', branchId: 'branch-1', createdAt: dt(-1), updatedAt: dt(-1) },
];

// ═══════════════════════════════════════════════════
//  INVOICES
// ═══════════════════════════════════════════════════
export const mockInvoices: Invoice[] = Array.from({ length: 15 }, (_, i) => {
  const patient = mockPatients[i];
  const categories = ['Consultation', 'Surgery', 'Implant', 'Diagnostics', 'Physiotherapy', 'Room Charges'];
  const amounts = [1500, 250000, 185000, 8500, 15000, 25000];
  return {
    id: `inv-${i + 1}`,
    invoiceNumber: `RASA-INV-${(2024000 + i + 1).toString()}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    items: [
      { description: categories[i % categories.length], category: categories[i % categories.length], quantity: 1, unitPrice: amounts[i % amounts.length], total: amounts[i % amounts.length] },
    ],
    subtotal: amounts[i % amounts.length],
    tax: Math.round(amounts[i % amounts.length] * 0.05),
    discount: i % 3 === 0 ? Math.round(amounts[i % amounts.length] * 0.1) : 0,
    total: Math.round(amounts[i % amounts.length] * (i % 3 === 0 ? 0.945 : 1.05)),
    paid: i < 10 ? Math.round(amounts[i % amounts.length] * (i % 3 === 0 ? 0.945 : 1.05)) : 0,
    balance: i < 10 ? 0 : Math.round(amounts[i % amounts.length] * (i % 3 === 0 ? 0.945 : 1.05)),
    status: i < 8 ? 'paid' : i < 10 ? 'partial' : i < 13 ? 'sent' : 'overdue',
    dueDate: d(i < 10 ? -(i * 3) : 7),
    branchId: patient.branchId,
    createdAt: dt(-(i * 5)),
    updatedAt: dt(-(i * 2)),
  };
});
