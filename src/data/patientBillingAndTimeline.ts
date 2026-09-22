export interface PatientInvoiceItem {
  description: string;
  category: 'Consultation' | 'Surgery' | 'Implant' | 'Diagnostics' | 'Pharmacy' | 'Physiotherapy' | 'Consumables';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PatientInvoiceRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: PatientInvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  tpaCovered: number;
  patientPaid: number;
  balance: number;
  status: 'paid' | 'pending' | 'tpa_approved' | 'partially_paid' | 'overdue';
  paymentMode?: 'UPI' | 'Credit Card' | 'Cash' | 'TPA Cashless Settlement' | 'Net Banking';
  insuranceDetails?: {
    provider: string;
    policyNumber: string;
    claimNumber: string;
    preAuthApprovedAmount: number;
    coPayPercentage: number;
    status: 'Pre-Auth Approved' | 'Settlement Completed' | 'Documentation Under Review' | 'Emergency Cashless Initiated';
  };
}

export interface PatientJourneyTimelineEvent {
  id: string;
  date: string;
  time?: string;
  category: 'Consultation' | 'Surgery' | 'Diagnostics' | 'Physiotherapy' | 'Follow-Up' | 'Billing' | 'Emergency Intake';
  title: string;
  clinician: string;
  department: string;
  status: 'completed' | 'in_progress' | 'scheduled' | 'action_required';
  description: string;
  clinicalMetrics?: {
    painVAS?: number;
    romFlexion?: string;
    implantSerial?: string;
    investigationAcc?: string;
    tpaAmount?: string;
  };
  scanId?: string;
  badgeText: string;
  badgeColor: string;
}

export interface PatientClinicalSummary {
  primaryDiagnosis: string;
  icdCode: string;
  historyOfPresentIllness: string;
  allergies: Array<{ allergen: string; severity: 'High' | 'Moderate' | 'Mild'; reaction: string }>;
  comorbidities: Array<{ condition: string; duration: string; currentStatus: string }>;
  goniometryHistory: Array<{ date: string; joint: string; flexion: string; extensionLag: string; deformity: string }>;
  activePrescriptions: Array<{ drug: string; dosage: string; frequency: string; duration: string; purpose: string }>;
  priorSurgicalInterventions: string[];
}

// ══════════════════════════════════════════════════════════════════
// DATA REPOSITORY PER PATIENT NAME / ID KEY
// ══════════════════════════════════════════════════════════════════

export const PATIENT_BILLING_REGISTRY: Record<string, PatientInvoiceRecord[]> = {
  // 1. Rajesh Kumar Sharma
  rajesh: [
    {
      id: 'inv-rajesh-01',
      invoiceNumber: 'RASA-INV-2026-8812',
      date: '10 Aug 2026',
      dueDate: '10 Aug 2026',
      items: [
        { description: 'Synvisc-One (Hylan G-F 20) 6ml Intra-articular Prefilled Syringe', category: 'Pharmacy', quantity: 1, unitPrice: 18500, total: 18500 },
        { description: 'Aspiration of Synovial Fluid & Ultrasound Guided Injection Procedure', category: 'Consultation', quantity: 1, unitPrice: 2500, total: 2500 },
        { description: 'Aseptic Joint Prep Kit & Disposable Surgical Consumables', category: 'Consumables', quantity: 1, unitPrice: 950, total: 950 },
      ],
      subtotal: 21950,
      discount: 1000,
      tax: 1047,
      total: 21997,
      tpaCovered: 0,
      patientPaid: 21997,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    },
    {
      id: 'inv-rajesh-02',
      invoiceNumber: 'RASA-INV-2026-7210',
      date: '22 May 2026',
      dueDate: '22 May 2026',
      items: [
        { description: 'Senior Orthopedic Consultant OPD Examination & Goniometry', category: 'Consultation', quantity: 1, unitPrice: 1200, total: 1200 },
        { description: 'Digital Standing AP & Lateral Weight-Bearing Knee Radiographs', category: 'Diagnostics', quantity: 2, unitPrice: 900, total: 1800 },
      ],
      subtotal: 3000,
      discount: 0,
      tax: 150,
      total: 3150,
      tpaCovered: 0,
      patientPaid: 3150,
      balance: 0,
      status: 'paid',
      paymentMode: 'Cash',
    },
    {
      id: 'inv-rajesh-03',
      invoiceNumber: 'RASA-INV-2026-9901',
      date: '22 Sep 2026',
      dueDate: '25 Sep 2026',
      items: [
        { description: 'Unilateral Total Knee Replacement (TKR) Comprehensive Package', category: 'Surgery', quantity: 1, unitPrice: 165000, total: 165000 },
        { description: 'Zimmer NexGen Complete Knee Solution CR Cruciate Retaining Prosthesis', category: 'Implant', quantity: 1, unitPrice: 85000, total: 85000 },
        { description: 'OT High-Dependency Consumables, Shaver & Antibiotic Bone Cement (40g)', category: 'Consumables', quantity: 1, unitPrice: 18000, total: 18000 },
        { description: 'Super Deluxe AC Inpatient Suite (4 Days)', category: 'Consultation', quantity: 4, unitPrice: 6500, total: 26000 },
      ],
      subtotal: 294000,
      discount: 14000,
      tax: 0, // Package exempted
      total: 280000,
      tpaCovered: 250000,
      patientPaid: 30000,
      balance: 0,
      status: 'tpa_approved',
      paymentMode: 'TPA Cashless Settlement',
      insuranceDetails: {
        provider: 'Star Health & Allied Insurance',
        policyNumber: 'P/161114/01/2026/004912',
        claimNumber: 'CIR/2026/161114/082199',
        preAuthApprovedAmount: 250000,
        coPayPercentage: 10,
        status: 'Pre-Auth Approved',
      }
    }
  ],

  // 2. Kavitha Ramachandran
  kavitha: [
    {
      id: 'inv-kavitha-01',
      invoiceNumber: 'RASA-INV-2026-7712',
      date: '22 Sep 2026',
      dueDate: '22 Sep 2026',
      items: [
        { description: 'High-Resolution 3.0T MRI Right Shoulder (Coronal/Sagittal/Axial T2 FSE)', category: 'Diagnostics', quantity: 1, unitPrice: 8500, total: 8500 },
        { description: 'Senior Consultant Shoulder Specialist Clinical Evaluation', category: 'Consultation', quantity: 1, unitPrice: 1200, total: 1200 },
      ],
      subtotal: 9700,
      discount: 500,
      tax: 460,
      total: 9660,
      tpaCovered: 0,
      patientPaid: 9660,
      balance: 0,
      status: 'paid',
      paymentMode: 'Credit Card',
    },
    {
      id: 'inv-kavitha-02',
      invoiceNumber: 'RASA-INV-2026-6901',
      date: '28 Jul 2026',
      dueDate: '28 Jul 2026',
      items: [
        { description: 'Diagnostic Subacromial Infiltration with Kenacort 40mg + Sensorcaine', category: 'Consultation', quantity: 1, unitPrice: 3200, total: 3200 },
        { description: 'Shoulder Arm Pouch Sling & Rehabilitation Resistance Band', category: 'Consumables', quantity: 1, unitPrice: 1100, total: 1100 },
      ],
      subtotal: 4300,
      discount: 0,
      tax: 215,
      total: 4515,
      tpaCovered: 0,
      patientPaid: 4515,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    },
    {
      id: 'inv-kavitha-03',
      invoiceNumber: 'RASA-INV-2026-8802',
      date: '22 Sep 2026',
      dueDate: '02 Oct 2026',
      items: [
        { description: 'Arthroscopic Rotator Cuff Repair Surgical Package (Proposed)', category: 'Surgery', quantity: 1, unitPrice: 145000, total: 145000 },
        { description: 'Smith & Nephew Healicoil PEEK Suture Anchors (2 Units)', category: 'Implant', quantity: 2, unitPrice: 22000, total: 44000 },
      ],
      subtotal: 189000,
      discount: 9000,
      tax: 0,
      total: 180000,
      tpaCovered: 165000,
      patientPaid: 0,
      balance: 15000,
      status: 'pending',
      insuranceDetails: {
        provider: 'HDFC ERGO General Insurance',
        policyNumber: 'HDFC-HEALTH-99210-2025',
        claimNumber: 'CLM-HDFC-882194',
        preAuthApprovedAmount: 165000,
        coPayPercentage: 8,
        status: 'Documentation Under Review',
      }
    }
  ],

  // 3. Suresh Babu Naidu
  suresh: [
    {
      id: 'inv-suresh-01',
      invoiceNumber: 'RASA-INV-2026-9750',
      date: '08 Aug 2026',
      dueDate: '12 Aug 2026',
      items: [
        { description: 'Cemented Left Total Knee Arthroplasty Surgical Suite Package', category: 'Surgery', quantity: 1, unitPrice: 175000, total: 175000 },
        { description: 'Zimmer NexGen CR Modular Knee System Components', category: 'Implant', quantity: 1, unitPrice: 92000, total: 92000 },
        { description: 'Post-Op ICU & Step-Down Room Care (5 Days)', category: 'Consultation', quantity: 5, unitPrice: 5500, total: 27500 },
        { description: 'Subcutaneous DVT Anticoagulant Prophylaxis Course (Enoxaparin + Apixaban)', category: 'Pharmacy', quantity: 1, unitPrice: 8500, total: 8500 },
      ],
      subtotal: 303000,
      discount: 13000,
      tax: 0,
      total: 290000,
      tpaCovered: 270000,
      patientPaid: 20000,
      balance: 0,
      status: 'paid',
      paymentMode: 'TPA Cashless Settlement',
      insuranceDetails: {
        provider: 'Care Health Insurance (Religare)',
        policyNumber: 'CARE-EXP-7721094',
        claimNumber: 'CARE-MED-994102',
        preAuthApprovedAmount: 270000,
        coPayPercentage: 7,
        status: 'Settlement Completed',
      }
    },
    {
      id: 'inv-suresh-02',
      invoiceNumber: 'RASA-INV-2026-9811',
      date: '22 Aug 2026',
      dueDate: '22 Aug 2026',
      items: [
        { description: 'POD 14 Surgical Staple Removal & Sterile Silver Dressing Kit', category: 'Consultation', quantity: 1, unitPrice: 1500, total: 1500 },
        { description: 'Post-Op Knee Recovery Mobilization Follow-Up Fee', category: 'Consultation', quantity: 1, unitPrice: 800, total: 800 },
      ],
      subtotal: 2300,
      discount: 0,
      tax: 115,
      total: 2415,
      tpaCovered: 0,
      patientPaid: 2415,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    },
    {
      id: 'inv-suresh-03',
      invoiceNumber: 'RASA-INV-2026-6019',
      date: '22 Sep 2026',
      dueDate: '22 Sep 2026',
      items: [
        { description: 'POD 45 Long-Leg Mechanical Axis Standing Radiographs (XR-2024-6019)', category: 'Diagnostics', quantity: 1, unitPrice: 1800, total: 1800 },
        { description: 'Senior Consultant Post-Op Arthroplasty Review', category: 'Consultation', quantity: 1, unitPrice: 600, total: 600 },
      ],
      subtotal: 2400,
      discount: 0,
      tax: 120,
      total: 2520,
      tpaCovered: 0,
      patientPaid: 2520,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    }
  ],

  // 4. Deepa Venkat (New Patient)
  deepa: [
    {
      id: 'inv-deepa-01',
      invoiceNumber: 'RASA-INV-2026-9104',
      date: '22 Sep 2026',
      dueDate: '22 Sep 2026',
      items: [
        { description: 'STAT Emergency 3T Knee MRI Sagittal/Coronal T2 Fat-Sat (MR-2024-9104)', category: 'Diagnostics', quantity: 1, unitPrice: 8500, total: 8500 },
        { description: 'Sports Medicine Emergency Joint Aspiration & Assessment', category: 'Consultation', quantity: 1, unitPrice: 2000, total: 2000 },
        { description: 'Hinged Functional Knee Orthosis (Range-of-Motion 0-30° Lockable)', category: 'Consumables', quantity: 1, unitPrice: 4200, total: 4200 },
        { description: 'Pair of Aluminum Ergonomic Elbow Crutches', category: 'Consumables', quantity: 1, unitPrice: 1200, total: 1200 },
      ],
      subtotal: 15900,
      discount: 900,
      tax: 750,
      total: 15750,
      tpaCovered: 0,
      patientPaid: 15750,
      balance: 0,
      status: 'paid',
      paymentMode: 'Credit Card',
    },
    {
      id: 'inv-deepa-02',
      invoiceNumber: 'RASA-INV-2026-9150',
      date: '22 Sep 2026',
      dueDate: '05 Oct 2026',
      items: [
        { description: 'Arthroscopic ACL Reconstruction with Hamstring Autograft (Pre-Booking)', category: 'Surgery', quantity: 1, unitPrice: 135000, total: 135000 },
        { description: 'Endobutton CL Ultra & Bioabsorbable Interference Screws (Implant Set)', category: 'Implant', quantity: 1, unitPrice: 32000, total: 32000 },
      ],
      subtotal: 167000,
      discount: 7000,
      tax: 0,
      total: 160000,
      tpaCovered: 150000,
      patientPaid: 0,
      balance: 10000,
      status: 'pending',
      insuranceDetails: {
        provider: 'ICICI Lombard General Insurance',
        policyNumber: 'ICICI-GIC-401928-2026',
        claimNumber: 'CLM-ICICI-ACL-99120',
        preAuthApprovedAmount: 150000,
        coPayPercentage: 5,
        status: 'Pre-Auth Approved',
      }
    }
  ],

  // 5. Anil Kumar Reddy
  anil: [
    {
      id: 'inv-anil-01',
      invoiceNumber: 'RASA-INV-2026-9430',
      date: '02 Aug 2026',
      dueDate: '02 Aug 2026',
      items: [
        { description: 'Cervical Spine Flexion-Extension Dynamic Radiographs', category: 'Diagnostics', quantity: 2, unitPrice: 1200, total: 2400 },
        { description: 'Spine Specialist Consultation & Radiculopathy Evaluation', category: 'Consultation', quantity: 1, unitPrice: 1200, total: 1200 },
        { description: 'Contoured Memory Foam Cervical Support Collar (Firm)', category: 'Consumables', quantity: 1, unitPrice: 1400, total: 1400 },
      ],
      subtotal: 5000,
      discount: 0,
      tax: 250,
      total: 5250,
      tpaCovered: 0,
      patientPaid: 5250,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    },
    {
      id: 'inv-anil-02',
      invoiceNumber: 'RASA-INV-2026-4421',
      date: '22 Sep 2026',
      dueDate: '22 Sep 2026',
      items: [
        { description: 'Digital Lateral Cervical Spine High-Contrast Radiographs (XR-2024-4421)', category: 'Diagnostics', quantity: 1, unitPrice: 1100, total: 1100 },
        { description: 'Neuropathic Pain Nerve Conduction Study (NCV Both Upper Limbs)', category: 'Diagnostics', quantity: 1, unitPrice: 3500, total: 3500 },
      ],
      subtotal: 4600,
      discount: 200,
      tax: 220,
      total: 4620,
      tpaCovered: 0,
      patientPaid: 4620,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    }
  ],

  // 6. Padmavathi R.
  padmavathi: [
    {
      id: 'inv-padma-01',
      invoiceNumber: 'RASA-INV-2026-9310',
      date: '14 Jun 2026',
      dueDate: '14 Jun 2026',
      items: [
        { description: 'Pelvis with Both Hips AP Standing Radiograph & True Leg Length Meter', category: 'Diagnostics', quantity: 1, unitPrice: 1600, total: 1600 },
        { description: 'DEXA Bone Mineral Density Whole Body & Hip Scan', category: 'Diagnostics', quantity: 1, unitPrice: 3800, total: 3800 },
        { description: 'Zoledronic Acid (Reclast 5mg) Anti-Resorptive IV Infusion Therapy', category: 'Pharmacy', quantity: 1, unitPrice: 14500, total: 14500 },
        { description: 'Daycare Infusion Monitoring & Nursing Care', category: 'Consultation', quantity: 1, unitPrice: 1500, total: 1500 },
      ],
      subtotal: 21400,
      discount: 1000,
      tax: 1020,
      total: 21420,
      tpaCovered: 0,
      patientPaid: 21420,
      balance: 0,
      status: 'paid',
      paymentMode: 'Net Banking',
    },
    {
      id: 'inv-padma-02',
      invoiceNumber: 'RASA-INV-2026-3991',
      date: '22 Sep 2026',
      dueDate: '30 Sep 2026',
      items: [
        { description: 'Cementless Total Hip Arthroplasty (THA) Package (Pre-Auth in progress)', category: 'Surgery', quantity: 1, unitPrice: 195000, total: 195000 },
        { description: 'DePuy Pinnacle Acetabular Cup + Corail Hydroxyapatite Stem (Implant Set)', category: 'Implant', quantity: 1, unitPrice: 95000, total: 95000 },
      ],
      subtotal: 290000,
      discount: 10000,
      tax: 0,
      total: 280000,
      tpaCovered: 260000,
      patientPaid: 0,
      balance: 20000,
      status: 'tpa_approved',
      insuranceDetails: {
        provider: 'New India Assurance Senior Citizen Health Plan',
        policyNumber: 'NIA-SNR-4401920-2026',
        claimNumber: 'CLM-NIA-HIP-88102',
        preAuthApprovedAmount: 260000,
        coPayPercentage: 10,
        status: 'Pre-Auth Approved',
      }
    }
  ],

  // 7. Mohammed Farooq (New Patient - Emergency Trauma)
  farooq: [
    {
      id: 'inv-farooq-01',
      invoiceNumber: 'RASA-INV-2026-1102',
      date: '22 Sep 2026',
      dueDate: '22 Sep 2026',
      items: [
        { description: 'Emergency Trauma Care Resuscitation & Orthopedic Assessment', category: 'Consultation', quantity: 1, unitPrice: 2500, total: 2500 },
        { description: 'STAT Right Ankle Mortise & Lower Leg Full-Length Radiographs', category: 'Diagnostics', quantity: 2, unitPrice: 900, total: 1800 },
        { description: 'Below-Knee Posterior Fiberglass Plaster Immobilization Splint', category: 'Consumables', quantity: 1, unitPrice: 3200, total: 3200 },
        { description: 'Emergency Analgesic & Antibiotic IV Administration', category: 'Pharmacy', quantity: 1, unitPrice: 1200, total: 1200 },
      ],
      subtotal: 8700,
      discount: 0,
      tax: 435,
      total: 9135,
      tpaCovered: 9135,
      patientPaid: 0,
      balance: 0,
      status: 'tpa_approved',
      paymentMode: 'TPA Cashless Settlement',
      insuranceDetails: {
        provider: 'National Insurance Company (Road Accident Cashless)',
        policyNumber: 'NIC-MOTOR-MED-771029',
        claimNumber: 'EMERG-NIC-2026-1102',
        preAuthApprovedAmount: 180000,
        coPayPercentage: 0,
        status: 'Emergency Cashless Initiated',
      }
    },
    {
      id: 'inv-farooq-02',
      invoiceNumber: 'RASA-INV-2026-1105',
      date: '22 Sep 2026',
      dueDate: '23 Sep 2026',
      items: [
        { description: 'Emergency Open Reduction & Internal Fixation (ORIF) Ankle Package', category: 'Surgery', quantity: 1, unitPrice: 110000, total: 110000 },
        { description: 'Anatomical Distal Fibula Locking Plate & Medial Malleolus 4.0mm Screws', category: 'Implant', quantity: 1, unitPrice: 42000, total: 42000 },
      ],
      subtotal: 152000,
      discount: 0,
      tax: 0,
      total: 152000,
      tpaCovered: 152000,
      patientPaid: 0,
      balance: 0,
      status: 'tpa_approved',
      insuranceDetails: {
        provider: 'National Insurance Company',
        policyNumber: 'NIC-MOTOR-MED-771029',
        claimNumber: 'EMERG-NIC-2026-1102',
        preAuthApprovedAmount: 180000,
        coPayPercentage: 0,
        status: 'Pre-Auth Approved',
      }
    }
  ],

  // 8. Sunita Devi
  sunita: [
    {
      id: 'inv-sunita-01',
      invoiceNumber: 'RASA-INV-2026-5119',
      date: '21 Sep 2026',
      dueDate: '21 Sep 2026',
      items: [
        { description: 'MRI Lumbar Spine (L1-S1) Sagittal & Axial T2 High-Res (MR-2024-5119)', category: 'Diagnostics', quantity: 1, unitPrice: 8500, total: 8500 },
        { description: 'Senior Spine Surgeon Consultation & Neurological Mapping', category: 'Consultation', quantity: 1, unitPrice: 1500, total: 1500 },
      ],
      subtotal: 10000,
      discount: 500,
      tax: 475,
      total: 9975,
      tpaCovered: 0,
      patientPaid: 9975,
      balance: 0,
      status: 'paid',
      paymentMode: 'Cash',
    },
    {
      id: 'inv-sunita-02',
      invoiceNumber: 'RASA-INV-2026-9501',
      date: '04 Sep 2026',
      dueDate: '04 Sep 2026',
      items: [
        { description: 'Rigid Lumbosacral Orthotic Support Belt with Lumbar Pad', category: 'Consumables', quantity: 1, unitPrice: 2200, total: 2200 },
        { description: 'Conservative Sciatica Medication Pack (Pregabalin + Steroid Tapering)', category: 'Pharmacy', quantity: 1, unitPrice: 2400, total: 2400 },
      ],
      subtotal: 4600,
      discount: 0,
      tax: 230,
      total: 4830,
      tpaCovered: 0,
      patientPaid: 4830,
      balance: 0,
      status: 'paid',
      paymentMode: 'UPI',
    }
  ]
};

// ══════════════════════════════════════════════════════════════════
// JOURNEY TIMELINE EVENTS REPOSITORY PER PATIENT
// ══════════════════════════════════════════════════════════════════

export const PATIENT_TIMELINE_REGISTRY: Record<string, PatientJourneyTimelineEvent[]> = {
  // 1. Rajesh Kumar Sharma
  rajesh: [
    {
      id: 'tl-rajesh-01',
      date: '22 Sep 2026',
      time: '09:15 AM',
      category: 'Consultation',
      title: 'OP Consultation & Surgical Decision: Total Knee Replacement',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Joint Reconstruction & Arthroplasty',
      status: 'in_progress',
      description: 'Physical exam confirms End-Stage Osteoarthritis (Kellgren-Lawrence Grade IV) with 7.2° Varus deformity. Conservative options exhausted. Patient approved for Cemented TKR with Zimmer NexGen CR.',
      clinicalMetrics: { painVAS: 8, romFlexion: '90°', investigationAcc: 'XR-2024-8842' },
      scanId: 'xr-knee-01',
      badgeText: 'TODAY: IN CABIN',
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'tl-rajesh-02',
      date: '22 Sep 2026',
      time: '08:45 AM',
      category: 'Diagnostics',
      title: 'Digital Standing AP/Lateral Weight-Bearing Knee Radiographs',
      clinician: 'Dr. Suresh V., MD',
      department: 'Musculoskeletal Radiology',
      status: 'completed',
      description: 'Digital X-rays completed on Philips DigitalDiagnost. Demonstrated bone-on-bone medial contact with tibial plateau osteophytes. Full PACS raw copy available.',
      clinicalMetrics: { investigationAcc: 'XR-2024-8842' },
      scanId: 'xr-knee-01',
      badgeText: 'IMAGING COMPLETE',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-rajesh-03',
      date: '10 Aug 2026',
      time: '11:30 AM',
      category: 'Consultation',
      title: 'Synvisc-One Viscosupplementation & Aspiration Procedure',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Joint Clinic Cabin 101',
      status: 'completed',
      description: 'Under strict aseptic prep, 18ml of inflammatory joint effusion was evacuated, followed by intra-articular injection of 6ml High MW Hyaluronic Acid gel.',
      clinicalMetrics: { painVAS: 7, romFlexion: '95°' },
      badgeText: 'PROCEDURE COMPLETED',
      badgeColor: 'bg-purple-100 text-purple-800 border border-purple-300',
    },
    {
      id: 'tl-rajesh-04',
      date: '22 May 2026',
      time: '10:00 AM',
      category: 'Physiotherapy',
      title: 'Physiotherapy Assessment & Quadriceps Muscle Rehabilitation',
      clinician: 'Arun Kumar, MPT',
      department: 'Sports & Ortho Rehab Center',
      status: 'completed',
      description: 'Prescribed isometric VMO strengthening, hamstring flexibility drills, and stationary cycling. Patient completed 8 guided physical therapy sessions.',
      clinicalMetrics: { painVAS: 6, romFlexion: '100°' },
      badgeText: 'REHAB COMPLETED',
      badgeColor: 'bg-blue-100 text-blue-800 border border-blue-300',
    },
    {
      id: 'tl-rajesh-05',
      date: '14 Jan 2026',
      time: '09:00 AM',
      category: 'Consultation',
      title: 'Initial Outpatient Consultation & Baseline EMR Entry',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Orthopedic OPD',
      status: 'completed',
      description: 'First presentation for bilateral knee aching on walking > 1km. Advised lifestyle modifications, weight reduction program (-8kg target), and knee unloading brace.',
      clinicalMetrics: { painVAS: 5, romFlexion: '105°' },
      badgeText: 'INITIAL OP ENCOUNTER',
      badgeColor: 'bg-surface-200 text-gray-700',
    }
  ],

  // 2. Kavitha Ramachandran
  kavitha: [
    {
      id: 'tl-kavitha-01',
      date: '22 Sep 2026',
      time: '09:30 AM',
      category: 'Consultation',
      title: 'Rotator Cuff Tear Surgical Planning & Pre-Op Review',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Shoulder & Sports Medicine Cabin 101',
      status: 'in_progress',
      description: 'Patient reports severe night pain and inability to write on blackboard. Coronal T2 MRI confirms 1.2cm full-thickness supraspinatus rupture. Scheduled for Arthroscopic Anchor Repair.',
      clinicalMetrics: { painVAS: 7, romFlexion: '70° Abduction', investigationAcc: 'MR-2024-7712' },
      scanId: 'mr-shoulder-02',
      badgeText: 'WAITING IN OPD',
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'tl-kavitha-02',
      date: '22 Sep 2026',
      time: '08:30 AM',
      category: 'Diagnostics',
      title: 'High-Resolution 3.0T MRI Right Shoulder (MR-2024-7712)',
      clinician: 'Dr. A. Meenakshi, MD',
      department: 'Advanced MRI Imaging Suite',
      status: 'completed',
      description: 'MRI revealed full-thickness detachment of supraspinatus tendon at humeral footprint with 1.2 cm tendon retraction. Subacromial-subdeltoid bursal effusion present.',
      clinicalMetrics: { investigationAcc: 'MR-2024-7712' },
      scanId: 'mr-shoulder-02',
      badgeText: 'PACS READY',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-kavitha-03',
      date: '28 Jul 2026',
      time: '11:00 AM',
      category: 'Consultation',
      title: 'Diagnostic Subacromial Injection Trial (Triamcinolone 40mg)',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Orthopedic OPD',
      status: 'completed',
      description: 'Local steroid injection provided transient relief for 2 weeks followed by recurrence of night aching and functional weakness. Indicated need for operative repair.',
      clinicalMetrics: { painVAS: 6 },
      badgeText: 'PROCEDURE',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'tl-kavitha-04',
      date: '12 Jun 2026',
      time: '10:15 AM',
      category: 'Consultation',
      title: 'Acute Shoulder Trauma Assessment (Overhead Strain)',
      clinician: 'Dr. K. Senthil Nathan',
      department: 'Orthopedic Emergency Care',
      status: 'completed',
      description: 'Presented after jerking right arm while catching falling file box at school. Rest, anti-inflammatory medications, and arm sling advised.',
      clinicalMetrics: { painVAS: 7 },
      badgeText: 'INITIAL OP',
      badgeColor: 'bg-surface-200 text-gray-700',
    }
  ],

  // 3. Suresh Babu Naidu
  suresh: [
    {
      id: 'tl-suresh-01',
      date: '22 Sep 2026',
      time: '10:15 AM',
      category: 'Follow-Up',
      title: 'Post-Op Day 45 Arthroplasty Review & Long-Leg Mechanical Alignment',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Joint Reconstruction Cabin 101',
      status: 'completed',
      description: 'Excellent recovery! Walking independently without stick or antalgic limp. Radiograph XR-2024-6019 confirms neutral mechanical axis (179.8°) and solid implant seating.',
      clinicalMetrics: { painVAS: 2, romFlexion: '110° Active', investigationAcc: 'XR-2024-6019' },
      scanId: 'xr-tkr-03',
      badgeText: 'EXCELLENT PROGRESS',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'tl-suresh-02',
      date: '22 Aug 2026',
      time: '11:00 AM',
      category: 'Follow-Up',
      title: 'Post-Op Day 14 Surgical Staple Removal & Wound Inspection',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Arthroplasty Post-Op Suite',
      status: 'completed',
      description: '28 surgical staples removed under sterile technique. Incision well-healed by primary intention. No erythema, warmth, or drainage.',
      clinicalMetrics: { painVAS: 3, romFlexion: '95°' },
      badgeText: 'STAPLES REMOVED',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-suresh-03',
      date: '08 Aug 2026',
      time: '08:30 AM',
      category: 'Surgery',
      title: 'Cemented Left Total Knee Arthroplasty (TKR)',
      clinician: 'Dr. Anand Krishnamurthy (Lead Surgeon)',
      department: 'Operation Theatre 1 (Modular Laminar Flow)',
      status: 'completed',
      description: 'Left TKR with Zimmer NexGen Cruciate Retaining (CR) System (Femur Size 4, Tibia Size 4, 10mm Polyethylene Insert). Tourniquet time 58 mins. Blood loss 180ml.',
      clinicalMetrics: { implantSerial: 'ZIM-CR-441092-2026' },
      scanId: 'xr-tkr-03',
      badgeText: 'SURGERY SUCCESSFUL',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'tl-suresh-04',
      date: '24 Jul 2026',
      time: '02:00 PM',
      category: 'Diagnostics',
      title: 'Pre-Anesthetic Clearance (PAC) & 2D-ECHO Cardiac Evaluation',
      clinician: 'Dr. R. Venugopal (Cardiologist)',
      department: 'Cardiology & PAC Clinic',
      status: 'completed',
      description: 'ECHO showed LVEF 60%, normal wall motion. Cleared under ASA Grade II for spinal anesthesia with adductor canal block.',
      badgeText: 'FIT FOR SURGERY',
      badgeColor: 'bg-blue-100 text-blue-800',
    }
  ],

  // 4. Deepa Venkat (New Patient)
  deepa: [
    {
      id: 'tl-deepa-01',
      date: '22 Sep 2026',
      time: '10:45 AM',
      category: 'Consultation',
      title: 'Fresh OP Intake: Acute Right Knee ACL Rupture & Hemarthrosis',
      clinician: 'Dr. Anand Krishnamurthy',
      department: 'Sports Medicine Cabin 101',
      status: 'in_progress',
      description: 'Audible pop during football pivot twist yesterday. Massive joint effusion. High-res MRI confirms complete mid-substance ACL tear with lateral condyle bone contusion. Hinged brace fitted.',
      clinicalMetrics: { painVAS: 9, romFlexion: '85° (Locked)', investigationAcc: 'MR-2024-9104' },
      scanId: 'mr-acl-04',
      badgeText: 'NEW PATIENT TODAY',
      badgeColor: 'bg-emerald-600 text-white shadow-sm',
    },
    {
      id: 'tl-deepa-02',
      date: '22 Sep 2026',
      time: '10:10 AM',
      category: 'Diagnostics',
      title: 'Emergency 3T Sagittal T2 MRI Right Knee (MR-2024-9104)',
      clinician: 'Dr. A. Meenakshi, MD',
      department: 'Sports MRI Center',
      status: 'completed',
      description: 'Complete discontinuity of anterior cruciate ligament fibers with fluid-bright hemorrhage. Lateral femoral condyle bone bruise. Posterior cruciate ligament (PCL) intact.',
      clinicalMetrics: { investigationAcc: 'MR-2024-9104' },
      scanId: 'mr-acl-04',
      badgeText: 'STAT RADIOLOGY',
      badgeColor: 'bg-rose-100 text-rose-800 border border-rose-300',
    },
    {
      id: 'tl-deepa-03',
      date: '22 Sep 2026',
      time: '09:45 AM',
      category: 'Emergency Intake',
      title: 'Front-Desk Hospital Registration & Triage Token Dispensed',
      clinician: 'Sister Mary Teresa (Triage RN)',
      department: 'Reception & Clinical Triage',
      status: 'completed',
      description: 'First hospital encounter at RASA Ortho OS. Vitals recorded (BP 128/82, Pulse 88, BMI 21.3). Transported via wheelchair to Sports Medicine cabin.',
      clinicalMetrics: { painVAS: 9 },
      badgeText: 'FIRST REGISTRATION',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    }
  ],

  // 5. Anil Deshmukh / Spine Radiculopathy
  anil: [
    {
      id: 'tl-anil-01',
      date: '22 Sep 2026',
      time: '11:15 AM',
      category: 'Consultation',
      title: 'Spine OPD Consultation: C5-C6 Cervical Disc Herniation & Radiculopathy',
      clinician: 'Dr. Priya Sharma',
      department: 'Spine Surgery Cabin 104',
      status: 'in_progress',
      description: 'Progressive tingling in left thumb and index finger (C6 distribution). Positive Spurling test. Digital X-ray XR-2024-5501 shows severe C5-C6 disc height loss with neural exit foramen narrowing. Prescribed conservative traction trial & Miami-J collar.',
      clinicalMetrics: { painVAS: 7, investigationAcc: 'XR-2024-5501' },
      scanId: 'xr-spine-05',
      badgeText: 'TODAY: IN CONSULTATION',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'tl-anil-02',
      date: '22 Sep 2026',
      time: '10:30 AM',
      category: 'Diagnostics',
      title: 'Digital Standing Cervical Spine AP & Neutral Lateral Radiographs',
      clinician: 'Dr. Suresh V., MD',
      department: 'Musculoskeletal Radiology',
      status: 'completed',
      description: 'Demonstrated severe C5-C6 disc space thinning, prominent anterior and posterior osteophytes, and loss of physiological cervical lordosis.',
      clinicalMetrics: { investigationAcc: 'XR-2024-5501' },
      scanId: 'xr-spine-05',
      badgeText: 'IMAGING COMPLETED',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-anil-03',
      date: '15 Aug 2026',
      time: '03:00 PM',
      category: 'Physiotherapy',
      title: 'Cervical Mechanical Intermittent Traction & Ergonomic Education',
      clinician: 'Deepak Joshi, MPT',
      department: 'Spine Physiotherapy & Rehab Suite',
      status: 'completed',
      description: 'Prescribed 15-minute intermittent computerized cervical traction (7kg tension), isometric deep neck flexor stabilization, and fitted rigid Miami-J cervical orthosis.',
      clinicalMetrics: { painVAS: 6 },
      badgeText: 'PHYSIO SESSION',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'tl-anil-04',
      date: '02 Jul 2026',
      time: '11:30 AM',
      category: 'Consultation',
      title: 'Initial Spine Clinic Evaluation for Left Arm Pain & Paresthesia',
      clinician: 'Dr. Priya Sharma',
      department: 'Spine Surgery Clinic',
      status: 'completed',
      description: 'Initial intake for shooting electrical shocks down left arm while working at computer desk. Prescribed neuropathic analgesics (Pregabalin 75mg) and ordered radiology.',
      clinicalMetrics: { painVAS: 8 },
      badgeText: 'INITIAL OP',
      badgeColor: 'bg-surface-200 text-gray-700',
    }
  ],

  // 6. Padmavathi Amma / Hip Fracture Hemiarthroplasty
  padmavathi: [
    {
      id: 'tl-padma-01',
      date: '22 Sep 2026',
      time: '11:45 AM',
      category: 'Follow-Up',
      title: 'Post-Op Day 30 Left Bipolar Hemiarthroplasty Clinical & Radiographic Review',
      clinician: 'Dr. Lakshmi Narayana',
      department: 'Joint Replacement & Trauma Cabin 102',
      status: 'in_progress',
      description: 'Patient walking stably with 4-prong reciprocal walker. Pelvis AP radiograph XR-2024-3310 confirms excellent vertical seating of DePuy Corail femoral stem and concentric bipolar cup positioning. Surgical incision fully re-epithelialized.',
      clinicalMetrics: { painVAS: 2, romFlexion: '85° Flexion', investigationAcc: 'XR-2024-3310' },
      scanId: 'xr-pelvis-06',
      badgeText: 'POST-OP REVIEW',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'tl-padma-02',
      date: '05 Sep 2026',
      time: '10:00 AM',
      category: 'Follow-Up',
      title: 'Suture Line Inspection & Complete Surgical Staple Removal',
      clinician: 'Sister Mary Teresa (Arthroplasty RN)',
      department: 'Post-Op Wound Dressing Clinic',
      status: 'completed',
      description: 'All 24 surgical skin staples extracted under aseptic conditions. Clean wound line, no erythema or exudate. Cleared for showering with waterproof dressing.',
      clinicalMetrics: { painVAS: 3 },
      badgeText: 'STAPLES REMOVED',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-padma-03',
      date: '22 Aug 2026',
      time: '09:00 AM',
      category: 'Surgery',
      title: 'Left Hip Cemented Bipolar Hemiarthroplasty (Synthes Corail + Self-Centering Head)',
      clinician: 'Dr. Lakshmi Narayana (Lead Surgeon)',
      department: 'Operation Theatre 2 (Arthroplasty Suite)',
      status: 'completed',
      description: 'Posterolateral approach to left hip. Displaced subcapital femoral neck fracture excised. DePuy Synthes Corail Size 2 stem cemented with Palacos antibiotic bone cement and fitted with 44mm Bipolar outer head.',
      clinicalMetrics: { implantSerial: 'DEP-BIP-992014-2026' },
      scanId: 'xr-pelvis-06',
      badgeText: 'SURGERY COMPLETED',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'tl-padma-04',
      date: '21 Aug 2026',
      time: '04:30 PM',
      category: 'Emergency Intake',
      title: 'Emergency Trauma Triage: Domestic Slip & Fall in Bathroom',
      clinician: 'Dr. Sanjay Gupta, MS Ortho',
      department: 'Emergency & Trauma Department',
      status: 'completed',
      description: '72-year-old female brought on stretcher with acute inability to bear weight on left limb following wet floor fall. Left leg shortened and externally rotated. Radiographs confirmed displaced Garden Type III femoral neck fracture. Emergency TPA cashless pre-auth initiated.',
      clinicalMetrics: { painVAS: 9, tpaAmount: '₹1,95,000' },
      badgeText: 'EMERGENCY INTAKE',
      badgeColor: 'bg-rose-100 text-rose-800 border border-rose-300',
    }
  ],

  // 7. Farooq Abdullah / Ankle Fracture ORIF
  farooq: [
    {
      id: 'tl-farooq-01',
      date: '22 Sep 2026',
      time: '12:15 PM',
      category: 'Follow-Up',
      title: 'Post-Op Day 21 Ankle ORIF Suture Removal & Air-Cast Walking Boot Transition',
      clinician: 'Dr. Kavitha Rao',
      department: 'Foot & Ankle Reconstruction Cabin 105',
      status: 'in_progress',
      description: 'Plaster backslab removed. Surgical sutures removed. Radiographs XR-2024-4419 show anatomic restoration of fibula length and congruent ankle mortise with 1/3 tubular plate in place. Fitted with pneumatic Air-Cast boot for partial (15kg) weight-bearing.',
      clinicalMetrics: { painVAS: 3, romFlexion: '10° Dorsiflexion', investigationAcc: 'XR-2024-4419' },
      scanId: 'xr-ankle-07',
      badgeText: 'CAST REMOVAL TODAY',
      badgeColor: 'bg-teal-600 text-white',
    },
    {
      id: 'tl-farooq-02',
      date: '01 Sep 2026',
      time: '11:30 AM',
      category: 'Surgery',
      title: 'Open Reduction & Internal Fixation (ORIF) Right Bimalleolar Ankle Fracture',
      clinician: 'Dr. Kavitha Rao (Surgeon)',
      department: 'Operation Theatre 3 (Trauma & Extremities)',
      status: 'completed',
      description: 'Lateral approach to fibula with Synthes 1/3 tubular plate and 6 cortical screws. Medial malleolus stabilized with two 4.0mm partially threaded cancellous lag screws. Stable mortise under dynamic stress test.',
      clinicalMetrics: { implantSerial: 'SYN-TUB-554109-2026' },
      scanId: 'xr-ankle-07',
      badgeText: 'ORIF SURGERY',
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'tl-farooq-03',
      date: '30 Aug 2026',
      time: '08:45 PM',
      category: 'Emergency Intake',
      title: 'Emergency Closed Reduction & Below-Knee Plaster Backslab Application',
      clinician: 'Dr. Suresh Babu, MRCS',
      department: 'Trauma Bay 2',
      status: 'completed',
      description: 'Presented after twisting right ankle while disembarking auto-rickshaw. Severe swelling and lateral subluxation. Emergent closed reduction performed under sedation and immobilised in below-knee backslab.',
      clinicalMetrics: { painVAS: 9 },
      badgeText: 'REDUCTION PERFORMED',
      badgeColor: 'bg-rose-100 text-rose-800 border border-rose-300',
    }
  ],

  // 8. Sunita Sharma / Lumbar Canal Stenosis
  sunita: [
    {
      id: 'tl-sunita-01',
      date: '22 Sep 2026',
      time: '12:45 PM',
      category: 'Consultation',
      title: 'Spine Review: L4-L5 Lumbar Canal Stenosis & Epidural Steroid Protocol',
      clinician: 'Dr. Priya Sharma',
      department: 'Spine Surgery Cabin 104',
      status: 'in_progress',
      description: 'Neurogenic claudication distance decreased to 120 meters. High-resolution 3.0T MRI MR-2024-6628 reveals severe thecal sac compression (AP diameter 6.2mm) from ligamentum flavum hypertrophy. Scheduled for fluoroscopy-guided transforaminal epidural injection trial.',
      clinicalMetrics: { painVAS: 7, investigationAcc: 'MR-2024-6628' },
      scanId: 'mr-lumbar-08',
      badgeText: 'TODAY: IN CLINIC',
      badgeColor: 'bg-indigo-600 text-white',
    },
    {
      id: 'tl-sunita-02',
      date: '18 Sep 2026',
      time: '02:00 PM',
      category: 'Diagnostics',
      title: 'Multi-Sequence 3.0T MRI Lumbar Spine with Axial T2 Cross-Sections',
      clinician: 'Dr. A. Meenakshi, MD',
      department: '3T Neuro-Spine MRI Suite',
      status: 'completed',
      description: 'Demonstrates circumferential disc bulge and facet hypertrophy at L4-L5 causing marked spinal stenosis and bilateral lateral recess narrowing.',
      clinicalMetrics: { investigationAcc: 'MR-2024-6628' },
      scanId: 'mr-lumbar-08',
      badgeText: '3T MRI REPORT',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-300',
    },
    {
      id: 'tl-sunita-03',
      date: '04 Sep 2026',
      time: '10:30 AM',
      category: 'Physiotherapy',
      title: 'Rigid Lumbosacral Orthotic Support Belt Fitting & Core Stabilization Drills',
      clinician: 'Arun Kumar, MPT',
      department: 'Spine Rehabilitation Center',
      status: 'completed',
      description: 'Fitted with custom rigid LS corset with anterior lumbar pad. Educated on pelvic tilt exercises, avoiding hyperextension, and flexion-based walking strategies.',
      clinicalMetrics: { painVAS: 6 },
      badgeText: 'ORTHOSIS FITTED',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'tl-sunita-04',
      date: '18 Aug 2026',
      time: '11:00 AM',
      category: 'Consultation',
      title: 'Initial Outpatient Spine Encounter for Bilateral Calf Aching & Heaviness',
      clinician: 'Dr. Priya Sharma',
      department: 'Spine Surgery OPD',
      status: 'completed',
      description: '64-year-old female presenting with dull aching in bilateral calves and buttocks relieved by bending forward or sitting down. Prescribed NSAIDs and ordered MRI.',
      clinicalMetrics: { painVAS: 7 },
      badgeText: 'INITIAL OP',
      badgeColor: 'bg-surface-200 text-gray-700',
    }
  ]
};

// ══════════════════════════════════════════════════════════════════
// HELPER LOOKUP FUNCTIONS (Comprehensive matching for all patients)
// ══════════════════════════════════════════════════════════════════

export function getPatientInvoices(query: string): PatientInvoiceRecord[] {
  const q = query.toLowerCase();
  if (q.includes('rajesh') || q.includes('00101') || q.includes('pat-1') || q.includes('0001')) return PATIENT_BILLING_REGISTRY.rajesh;
  if (q.includes('kavitha') || q.includes('lakshmi') || q.includes('00102') || q.includes('pat-2') || q.includes('0002')) return PATIENT_BILLING_REGISTRY.kavitha;
  if (q.includes('suresh') || q.includes('irfan') || q.includes('mohammed') || q.includes('00103') || q.includes('pat-3') || q.includes('0003')) return PATIENT_BILLING_REGISTRY.suresh;
  if (q.includes('deepa') || q.includes('00104')) return PATIENT_BILLING_REGISTRY.deepa;
  if (q.includes('anil') || q.includes('venkatesh') || q.includes('00105') || q.includes('pat-5') || q.includes('0005')) return PATIENT_BILLING_REGISTRY.anil;
  if (q.includes('padma') || q.includes('00106') || q.includes('pat-4') || q.includes('pat-6') || q.includes('0004') || q.includes('0006')) return PATIENT_BILLING_REGISTRY.padmavathi;
  if (q.includes('farooq') || q.includes('annapurna') || q.includes('00107') || q.includes('pat-7') || q.includes('0007')) return PATIENT_BILLING_REGISTRY.farooq;
  if (q.includes('sunita') || q.includes('bhagya') || q.includes('srinivas') || q.includes('00201') || q.includes('pat-8') || q.includes('0008')) return PATIENT_BILLING_REGISTRY.sunita;
  
  // Return rotating rich datasets for all other patient IDs so none is ever blank
  const hash = q.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const keys = ['rajesh', 'kavitha', 'suresh', 'anil', 'padmavathi', 'farooq', 'sunita'];
  const selectedKey = keys[hash % keys.length];
  return PATIENT_BILLING_REGISTRY[selectedKey] || PATIENT_BILLING_REGISTRY.rajesh;
}

export function getPatientTimeline(query: string): PatientJourneyTimelineEvent[] {
  const q = query.toLowerCase();
  if (q.includes('rajesh') || q.includes('00101') || q.includes('pat-1') || q.includes('0001')) return PATIENT_TIMELINE_REGISTRY.rajesh;
  if (q.includes('kavitha') || q.includes('lakshmi') || q.includes('00102') || q.includes('pat-2') || q.includes('0002')) return PATIENT_TIMELINE_REGISTRY.kavitha;
  if (q.includes('suresh') || q.includes('irfan') || q.includes('mohammed') || q.includes('00103') || q.includes('pat-3') || q.includes('0003')) return PATIENT_TIMELINE_REGISTRY.suresh;
  if (q.includes('deepa') || q.includes('00104')) return PATIENT_TIMELINE_REGISTRY.deepa;
  if (q.includes('anil') || q.includes('venkatesh') || q.includes('00105') || q.includes('pat-5') || q.includes('0005')) return PATIENT_TIMELINE_REGISTRY.anil;
  if (q.includes('padma') || q.includes('00106') || q.includes('pat-4') || q.includes('pat-6') || q.includes('0004') || q.includes('0006')) return PATIENT_TIMELINE_REGISTRY.padmavathi;
  if (q.includes('farooq') || q.includes('annapurna') || q.includes('00107') || q.includes('pat-7') || q.includes('0007')) return PATIENT_TIMELINE_REGISTRY.farooq;
  if (q.includes('sunita') || q.includes('bhagya') || q.includes('srinivas') || q.includes('00201') || q.includes('pat-8') || q.includes('0008')) return PATIENT_TIMELINE_REGISTRY.sunita;
  
  // Return rotating rich datasets for all other patient IDs so none is ever blank
  const hash = q.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const keys = ['rajesh', 'kavitha', 'suresh', 'anil', 'padmavathi', 'farooq', 'sunita'];
  const selectedKey = keys[hash % keys.length];
  return PATIENT_TIMELINE_REGISTRY[selectedKey] || PATIENT_TIMELINE_REGISTRY.rajesh;
}
