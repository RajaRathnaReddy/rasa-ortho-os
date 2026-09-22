export interface PastVisitRecord {
  id: string;
  date: string;
  doctor: string;
  department: string;
  visitType: 'Initial OP' | 'Follow-up' | 'Post-Surgical' | 'Procedure' | 'Emergency Intake';
  chiefComplaint: string;
  clinicalDiagnosis: string;
  interventions: string;
  prescriptions: string[];
  imagingSummary?: string;
  scanStudyId?: string;
  notes: string;
}

export interface OpTriageData {
  token: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  phone: string;
  occupation: string;
  doctorAssigned: string;
  cabin: string;
  primaryJoint: string;
  duration: string;
  painScore: number; // 1-10 VAS
  painCharacter: string[];
  onsetMode: 'Gradual Degenerative' | 'Acute Trauma / Fall' | 'Sports Injury' | 'Post-Surgical';
  mobilityStatus: string;
  triageVitals: {
    bp: string;
    pulse: number;
    spo2: string;
    temp: string;
    weightKg: number;
    heightCm: number;
    bmi: number;
    bmiCategory: string;
  };
  criticalAlerts: string[];
  priorSurgeries?: string;
  investigationsStatus: string;
  rawScanId: string;
  scanThumbnailUrl: string;
  billingStatus: 'paid' | 'pending' | 'tpa';
  billingAmount: string;
  registeredTime: string;
  status: 'Waiting' | 'In Cabin' | 'Completed' | 'Arrived' | 'Confirmed';
  isNewPatient: boolean;
  pastVisitsCount: number;
  pastVisits: PastVisitRecord[];
}

export const INITIAL_OP_TRIAGE_RECORDS: OpTriageData[] = [
  {
    token: 'T-101',
    patientId: 'PT-2024-00101',
    patientName: 'Rajesh Kumar Sharma',
    age: 58,
    gender: 'M',
    phone: '+91 98765 01001',
    occupation: 'Retired Bank Manager (Sedentary + Stairs)',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Knee Joint',
    duration: '8 Months (Progressive deterioration)',
    painScore: 8,
    painCharacter: ['Sharp on weight-bearing', 'Crepitus / bone grinding sound', 'Morning stiffness 40 mins'],
    onsetMode: 'Gradual Degenerative',
    mobilityStatus: 'Antalgic limp · Unable to climb stairs · Difficulty standing > 10m · Uses single-point cane',
    triageVitals: {
      bp: '138/88 mmHg',
      pulse: 76,
      spo2: '98%',
      temp: '98.4°F',
      weightKg: 86,
      heightCm: 168,
      bmi: 30.5,
      bmiCategory: 'Obese Class I (Excess Joint Stress)',
    },
    criticalAlerts: [
      '⚠️ Active Blood Thinner: Tab Ecosprin 75mg daily (Cardiac stent 2021)',
      '⚠️ Documented Penicillin Allergy (Severe rash)',
      'Type 2 Diabetes Mellitus (HbA1c: 7.2%)',
    ],
    priorSurgeries: 'Right Knee Arthroscopic Meniscectomy (2018 at Apollo)',
    investigationsStatus: 'Digital AP Standing Weight-Bearing Radiograph Ready (XR-2024-8842)',
    rawScanId: 'xr-knee-01',
    scanThumbnailUrl: '/images/xray-knee-standing.jpg',
    billingStatus: 'paid',
    billingAmount: '₹1,200 (UPI)',
    registeredTime: '09:15 AM',
    status: 'In Cabin',
    isNewPatient: false,
    pastVisitsCount: 3,
    pastVisits: [
      {
        id: 'VIS-9912',
        date: '10 Aug 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Joint Reconstruction OPD',
        visitType: 'Procedure',
        chiefComplaint: 'Intractable right medial knee pain unassisted by oral NSAIDs.',
        clinicalDiagnosis: 'Tricompartmental Osteoarthritis Rt Knee (Grade IV K-L)',
        interventions: 'Aspiration 18ml clear synovial fluid + Intra-articular High MW Hyaluronic Acid (Synvisc-One) 6ml injected under aseptic technique.',
        prescriptions: ['Tab Aceclofenac 100mg SOS', 'Cap Diacerein 50mg OD', 'Quadriceps isometric strengthening program'],
        imagingSummary: 'Right knee AP standing showed joint space narrowing to 1.8mm.',
        scanStudyId: 'xr-knee-01',
        notes: 'Advised patient that visco-supplementation offers temporary pain relief only. Surgical arthroplasty discussed if pain returns.'
      },
      {
        id: 'VIS-8401',
        date: '22 May 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Joint Reconstruction OPD',
        visitType: 'Follow-up',
        chiefComplaint: 'Increasing stiffness in morning and crepitus upon squatting.',
        clinicalDiagnosis: 'Bilateral Knee Osteoarthritis (Rt > Lt)',
        interventions: 'Physical therapy protocol prescribed (Closed chain kinetic exercises, Hamstrings stretching).',
        prescriptions: ['Tab Paracetamol 650mg TDS', 'Tab Pantoprazole 40mg OD', 'Glucosamine + Chondroitin sachet'],
        notes: 'Weight reduction advised (-6 kg target). Pain score was 6/10.'
      },
      {
        id: 'VIS-7210',
        date: '14 Jan 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Orthopedic OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'First presentation of right knee ache after walking > 1 km.',
        clinicalDiagnosis: 'Right Knee Early-to-Moderate Osteoarthritis with Meniscal Degeneration',
        interventions: 'Initial clinical workup, digital X-rays ordered, knee brace fitted.',
        prescriptions: ['Tab Etoricoxib 90mg OD for 7 days', 'Knee neoprene cap during walking'],
        notes: 'Baseline consultation completed.'
      }
    ]
  },
  {
    token: 'T-102',
    patientId: 'PT-2024-00102',
    patientName: 'Kavitha Ramachandran',
    age: 44,
    gender: 'F',
    phone: '+91 98765 01002',
    occupation: 'School Teacher (Overhead blackboard writing)',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Shoulder Joint',
    duration: '3 Months following sudden overhead jerk',
    painScore: 7,
    painCharacter: ['Severe night pain when sleeping on right side', 'Painful arc between 60°-120°', 'Inability to reach back for hooks'],
    onsetMode: 'Sports Injury',
    mobilityStatus: 'Active abduction limited to 70° · Passive abduction 150° with pain · Drop arm test positive',
    triageVitals: {
      bp: '124/82 mmHg',
      pulse: 80,
      spo2: '99%',
      temp: '98.6°F',
      weightKg: 64,
      heightCm: 160,
      bmi: 25.0,
      bmiCategory: 'Normal / Borderline',
    },
    criticalAlerts: [
      '⚠️ Sulfa drug intolerance (Gastric upset)',
      'Hypothyroidism on Eltroxin 50mcg',
    ],
    investigationsStatus: 'Shoulder MRI High-Res T2 Coronal Ready (MR-2024-7712)',
    rawScanId: 'mr-shoulder-02',
    scanThumbnailUrl: '/images/mri-shoulder-cuff.svg',
    billingStatus: 'pending',
    billingAmount: '₹800',
    registeredTime: '09:30 AM',
    status: 'Waiting',
    isNewPatient: false,
    pastVisitsCount: 2,
    pastVisits: [
      {
        id: 'VIS-9104',
        date: '28 Jul 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Shoulder & Sports Clinic',
        visitType: 'Procedure',
        chiefComplaint: 'Unbearable night pain in right shoulder, unable to write on blackboard.',
        clinicalDiagnosis: 'Suspected Rotator Cuff Tear vs Subacromial Impingement Syndrome',
        interventions: 'Diagnostic subacromial bursa infiltration with Triamcinolone 40mg + 2% Lignocaine. High-resolution MRI advised.',
        prescriptions: ['Tab Aceclofenac-SP 1-0-1 for 5 days', 'Arm sling for comfort during sleep', 'Pendulum exercises'],
        imagingSummary: 'X-Ray Right Shoulder showed acromial beaking (Bigliani Type II acromion).',
        scanStudyId: 'mr-shoulder-02',
        notes: 'Infiltration provided 40% relief for 2 weeks, then pain recurred with overhead weakness.'
      },
      {
        id: 'VIS-8550',
        date: '12 Jun 2026',
        doctor: 'Dr. K. Senthil Nathan',
        department: 'General Orthopedics',
        visitType: 'Initial OP',
        chiefComplaint: 'Right shoulder strain after catching a falling storage box.',
        clinicalDiagnosis: 'Acute Right Supraspinatus Strain',
        interventions: 'Ice compression, topical NSAID gel, rest advised.',
        prescriptions: ['Tab Thiocolchicoside + Paracetamol 1-0-1 for 7 days', 'Volini gel local application'],
        notes: 'Told to review if pain persists beyond 3 weeks.'
      }
    ]
  },
  {
    token: 'T-103',
    patientId: 'PT-2024-00103',
    patientName: 'Suresh Babu Naidu',
    age: 62,
    gender: 'M',
    phone: '+91 98765 01003',
    occupation: 'Retired PWD Engineer',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Left Knee (Post-TKR)',
    duration: 'Post-Op Day 45 Review',
    painScore: 2,
    painCharacter: ['Mild surgical site tightness', 'Minimal weather ache', 'Stable joint'],
    onsetMode: 'Post-Surgical',
    mobilityStatus: 'Independent walking without cane · Active Knee Flexion 110° · Full active extension (0° lag)',
    triageVitals: {
      bp: '126/80 mmHg',
      pulse: 72,
      spo2: '99%',
      temp: '98.4°F',
      weightKg: 74,
      heightCm: 172,
      bmi: 25.0,
      bmiCategory: 'Normal',
    },
    criticalAlerts: [
      '⚠️ Post-Op DVT Prophylaxis completed POD 28 (Tab Apixaban 2.5mg BD)',
      'Well-controlled Hypertension (Amlodipine 5mg)',
    ],
    priorSurgeries: 'Left Total Knee Arthroplasty on 08 Aug 2026 by Dr. Anand Krishnamurthy',
    investigationsStatus: 'Digital Left Knee AP/Lat Alignment Radiograph Ready (XR-2024-6019)',
    rawScanId: 'xr-tkr-03',
    scanThumbnailUrl: '/images/xray-tkr-postop.svg',
    billingStatus: 'paid',
    billingAmount: '₹600 (Post-Op Review)',
    registeredTime: '10:15 AM',
    status: 'Arrived',
    isNewPatient: false,
    pastVisitsCount: 4,
    pastVisits: [
      {
        id: 'VIS-9811',
        date: '22 Aug 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Arthroplasty Post-Op Clinic',
        visitType: 'Post-Surgical',
        chiefComplaint: 'Post-Op Day 14 routine suture removal and dressing check.',
        clinicalDiagnosis: 'Post Left TKA Day 14 (Uneventful Recovery)',
        interventions: 'Surgical staples removed (28 staples). Incision clean, primary intention healing, no erythema or discharge. Cryotherapy continued.',
        prescriptions: ['Tab Apixaban 2.5mg BD (finish 28-day course)', 'Tab Paracetamol 650mg SOS', 'Tab Calcium + Vit D3 OD'],
        notes: 'Active flexion 95°, active extension full. Home physiotherapy progressing well.'
      },
      {
        id: 'VIS-9750',
        date: '08 Aug 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Operation Theatre 1',
        visitType: 'Procedure',
        chiefComplaint: 'Scheduled Left Total Knee Arthroplasty Admission.',
        clinicalDiagnosis: 'Severe End-Stage Left Knee Osteoarthritis (Varus 9.5°)',
        interventions: 'Cemented Left Total Knee Arthroplasty with Zimmer NexGen CR (Femur Sz 4, Tibia Sz 4, 10mm PE insert). Intra-op periarticular cocktail injection.',
        prescriptions: ['IV Cefuroxime 1.5g', 'IV Paracetamol', 'Inj Enoxaparin 40mg SC OD'],
        imagingSummary: 'Post-op immediate check radiograph verified neutral mechanical axis.',
        scanStudyId: 'xr-tkr-03',
        notes: 'Patient mobilized with walker on Post-Op Day 1.'
      },
      {
        id: 'VIS-9602',
        date: '24 Jul 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'PAC Clinic',
        visitType: 'Follow-up',
        chiefComplaint: 'Pre-anesthetic clearance and surgical implant sizing.',
        clinicalDiagnosis: 'End-Stage OA Left Knee for Elective Arthroplasty',
        interventions: 'Cardiology clearance obtained (ECHO EF 60%). Pre-op template completed.',
        prescriptions: ['Pre-admission incentive spirometer exercises'],
        notes: 'Cross-matched 2 units PRBC on reserve. Patient consented.'
      },
      {
        id: 'VIS-9210',
        date: '15 May 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Joint Reconstruction OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'Severe left knee pain for 2 years, severe night aching, unable to walk > 50 meters.',
        clinicalDiagnosis: 'Severe Left Knee OA Grade IV',
        interventions: 'Digital weight-bearing X-rays showed bone-on-bone medial contact. Surgery indicated.',
        prescriptions: ['Analgesics while awaiting surgical date'],
        notes: 'Patient elected for surgery after family consultation.'
      }
    ]
  },
  {
    token: 'T-104',
    patientId: 'PT-2024-00104',
    patientName: 'Deepa Venkat',
    age: 37,
    gender: 'F',
    phone: '+91 98765 01004',
    occupation: 'Corporate HR & Amateur Football Player',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Knee Joint',
    duration: 'Yesterday Evening (Acute Non-Contact Pivot Injury)',
    painScore: 9,
    painCharacter: ['Audible "POP" heard during twist', 'Immediate large tense swelling within 1 hour (Hemarthrosis)', 'Knee giving way upon weight-bearing'],
    onsetMode: 'Sports Injury',
    mobilityStatus: 'Unable to bear weight on right leg · Supported by 2 attendants · High degree of guarding',
    triageVitals: {
      bp: '128/82 mmHg',
      pulse: 88,
      spo2: '99%',
      temp: '98.6°F',
      weightKg: 58,
      heightCm: 165,
      bmi: 21.3,
      bmiCategory: 'Normal Healthy',
    },
    criticalAlerts: [
      '⚠️ ACUTE HEMARTHROSIS: Marked joint effusion tense to palpation',
      'No known drug allergies (NKDA)',
    ],
    investigationsStatus: 'Emergency 3T Knee MRI Sagittal T2 Fat-Sat Ready (MR-2024-9104)',
    rawScanId: 'mr-acl-04',
    scanThumbnailUrl: '/images/mri-knee-acl.svg',
    billingStatus: 'paid',
    billingAmount: '₹1,500 (Credit Card)',
    registeredTime: '10:45 AM',
    status: 'Confirmed',
    isNewPatient: true, // 🟢 NEW PATIENT
    pastVisitsCount: 0,
    pastVisits: [] // No past records
  },
  {
    token: 'T-105',
    patientId: 'PT-2024-00105',
    patientName: 'Anil Kumar Reddy',
    age: 52,
    gender: 'M',
    phone: '+91 98765 01005',
    occupation: 'Software Architect (10+ hrs daily desk screen time)',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Cervical Spine (C5-C6)',
    duration: '5 Months (Aggravated over past 3 weeks)',
    painScore: 7,
    painCharacter: ['Shooting electrical pain into right shoulder and thumb/index fingers (C6 dermatome)', 'Numbness/tingling in right forearm', 'Neck stiffness on rotation'],
    onsetMode: 'Gradual Degenerative',
    mobilityStatus: 'Spurling sign positive on right side · Neck extension limited to 15° · Normal lower limb gait',
    triageVitals: {
      bp: '136/86 mmHg',
      pulse: 74,
      spo2: '98%',
      temp: '98.2°F',
      weightKg: 78,
      heightCm: 175,
      bmi: 25.5,
      bmiCategory: 'Slightly Overweight',
    },
    criticalAlerts: [
      '⚠️ Chronic Smoker (10 pack-years) · Microvascular healing risk',
      'Mild Dyslipidemia (on Tab Atorvastatin 10mg)',
    ],
    investigationsStatus: 'Cervical Spine AP/Lat Digital Radiographs Ready (XR-2024-4421)',
    rawScanId: 'xr-cervical-05',
    scanThumbnailUrl: '/images/xray-cervical-spine.svg',
    billingStatus: 'paid',
    billingAmount: '₹1,000',
    registeredTime: '11:00 AM',
    status: 'Confirmed',
    isNewPatient: false,
    pastVisitsCount: 2,
    pastVisits: [
      {
        id: 'VIS-9430',
        date: '02 Aug 2026',
        doctor: 'Dr. Rajeshwari Swaminathan',
        department: 'Spine & Pain Clinic',
        visitType: 'Follow-up',
        chiefComplaint: 'Right thumb paresthesia and nocturnal neck aches.',
        clinicalDiagnosis: 'Cervical Spondylotic Radiculopathy C6',
        interventions: 'Soft cervical collar prescribed for sleep/driving. Ergonomic desk workstation modifications outlined.',
        prescriptions: ['Tab Pregabalin 75mg + Methylcobalamin 750mcg HS', 'Tab Naproxen 500mg BD for 7 days', 'Tab Pantoprazole 40mg OD'],
        imagingSummary: 'Dynamic flexion-extension cervical views showed no frank instability.',
        scanStudyId: 'xr-cervical-05',
        notes: 'Recommended nerve conduction velocity (NCV) test and spine surgeon review if symptoms persist.'
      },
      {
        id: 'VIS-8800',
        date: '19 Apr 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Orthopedic OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'Neck tension and upper trapezius spasms during software release sprint.',
        clinicalDiagnosis: 'Postural Cervical Myofascial Strain',
        interventions: 'Hot fomentation, neck isometric posture exercises.',
        prescriptions: ['Tab Thiocolchicoside 4mg 1-0-1 for 5 days'],
        notes: 'Advised hourly stretch breaks and monitor elevation.'
      }
    ]
  },
  {
    token: 'T-106',
    patientId: 'PT-2024-00106',
    patientName: 'Padmavathi R.',
    age: 67,
    gender: 'F',
    phone: '+91 98765 01006',
    occupation: 'Homemaker (Difficulty with floor sitting & prayer)',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Hip Joint',
    duration: '1.5 Years with progressive stiffness',
    painScore: 8,
    painCharacter: ['Deep groin and anterior thigh ache', 'Marked stiffness when putting on footwear', 'Start-up pain after resting in chair'],
    onsetMode: 'Gradual Degenerative',
    mobilityStatus: 'Trendelenburg gait positive · True limb shortening 1.2 cm on right · Needs high commode',
    triageVitals: {
      bp: '144/92 mmHg',
      pulse: 80,
      spo2: '97%',
      temp: '98.4°F',
      weightKg: 69,
      heightCm: 154,
      bmi: 29.1,
      bmiCategory: 'Overweight / High Risk',
    },
    criticalAlerts: [
      '⚠️ DEXA Scan Confirmed Severe Osteoporosis (L1-L4 T-Score: -3.1, Femoral Neck: -2.9)',
      '⚠️ Fall Risk High: Uses four-prong quad cane',
      'Essential Hypertension on Tab Amlodipine + Telmisartan',
    ],
    priorSurgeries: 'Cholecystectomy (2012)',
    investigationsStatus: 'Digital Pelvis with Both Hips Standing Radiograph Ready (XR-2024-3991)',
    rawScanId: 'xr-pelvis-06',
    scanThumbnailUrl: '/images/xray-pelvis-hip.jpg',
    billingStatus: 'paid',
    billingAmount: '₹1,200',
    registeredTime: '11:15 AM',
    status: 'Confirmed',
    isNewPatient: false,
    pastVisitsCount: 3,
    pastVisits: [
      {
        id: 'VIS-9310',
        date: '14 Jun 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Joint Reconstruction OPD',
        visitType: 'Follow-up',
        chiefComplaint: 'Worsening right groin pain, unable to cross legs or sit on traditional floor mat.',
        clinicalDiagnosis: 'Advanced Primary Osteoarthritis Right Hip (Kellgren-Lawrence Gr IV)',
        interventions: 'Reviewed DEXA bone scan. Anti-resorptive bone therapy initiated (Inj Zoledronic Acid 5mg IV infusion completed).',
        prescriptions: ['Tab Calcium Citrate 1000mg + Vit D3 2000IU daily', 'Tab Tramadol + Paracetamol SOS', 'Tab Pantoprazole 40mg OD'],
        imagingSummary: 'Pelvis AP X-ray demonstrated marked superolateral migration and bone cyst formation in acetabular roof.',
        scanStudyId: 'xr-pelvis-06',
        notes: 'Total Hip Arthroplasty (THA) with uncemented porous cup discussed with son.'
      },
      {
        id: 'VIS-8640',
        date: '05 Mar 2026',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Joint Reconstruction OPD',
        visitType: 'Follow-up',
        chiefComplaint: 'Limping on right side, right leg feels slightly shorter.',
        clinicalDiagnosis: 'Bilateral Hip Osteoarthritis (Right severe, Left mild)',
        interventions: 'Measured 1cm shoe raise prescription for right footwear to balance pelvis.',
        prescriptions: ['Tab Etoricoxib 60mg OD for 10 days', 'Non-weight bearing pool hydrotherapy'],
        notes: 'Patient advised against floor sitting or deep squatting.'
      },
      {
        id: 'VIS-7890',
        date: '10 Oct 2025',
        doctor: 'Dr. Anand Krishnamurthy',
        department: 'Orthopedic OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'Persistent aching in right groin previously treated as back sciatica elsewhere.',
        clinicalDiagnosis: 'Right Hip Osteoarthritis with Reduced Internal Rotation (Patrick FABER test positive)',
        interventions: 'Initial pelvic screening radiograph performed.',
        prescriptions: ['Tab Paracetamol 650mg TDS', 'Hip abductor isometric exercises'],
        notes: 'Baseline orthopedic evaluation.'
      }
    ]
  },
  {
    token: 'T-107',
    patientId: 'PT-2024-00107',
    patientName: 'Mohammed Farooq',
    age: 39,
    gender: 'M',
    phone: '+91 98765 01007',
    occupation: 'Delivery Fleet Supervisor (Motorcycle accident)',
    doctorAssigned: 'Dr. Anand Krishnamurthy',
    cabin: 'Cabin 101',
    primaryJoint: 'Right Ankle Mortise',
    duration: '2 Hours Ago (Road Traffic Accident - 2 Wheeler Skid)',
    painScore: 10,
    painCharacter: ['Excruciating throbbing pain', 'Gross visible deformity and lateral talar tilt', 'Tense skin with fracture blistering risk'],
    onsetMode: 'Acute Trauma / Fall',
    mobilityStatus: 'Non-weight bearing · Transported via Trauma Stretcher · Temporary posterior splint applied in casualty',
    triageVitals: {
      bp: '146/94 mmHg (Acute Pain Driven)',
      pulse: 98,
      spo2: '98%',
      temp: '98.6°F',
      weightKg: 76,
      heightCm: 172,
      bmi: 25.7,
      bmiCategory: 'Normal',
    },
    criticalAlerts: [
      '⚠️ STAT EMERGENCY TRAUMA: Unstable Bimalleolar Ankle Fracture (Weber B)',
      '⚠️ NPO Since 07:00 AM (Suitable for Emergency ORIF Today)',
      'Distal pulses intact (Dorsalis Pedis + Posterior Tibial 2+)',
    ],
    investigationsStatus: 'Emergency STAT Digital Ankle AP/Lateral Radiographs Ready (XR-2024-1102)',
    rawScanId: 'xr-ankle-07',
    scanThumbnailUrl: '/images/xray-ankle-fracture.svg',
    billingStatus: 'tpa',
    billingAmount: 'Emergency TPA Cashless Initiated (₹1.8L)',
    registeredTime: '11:30 AM',
    status: 'Waiting',
    isNewPatient: true, // 🟢 NEW PATIENT
    pastVisitsCount: 0,
    pastVisits: [] // Fresh emergency case
  },
  {
    token: 'T-201',
    patientId: 'PT-2024-00201',
    patientName: 'Sunita Devi',
    age: 51,
    gender: 'F',
    phone: '+91 98765 01008',
    occupation: 'Homemaker (Household chores & forward bending)',
    doctorAssigned: 'Dr. Lakshmi Narayana',
    cabin: 'Cabin 102',
    primaryJoint: 'Lumbar Spine (L4-L5)',
    duration: '4 Months (Aggravated since last 2 weeks)',
    painScore: 8,
    painCharacter: ['Sharp electric shock pain radiating down left lower limb to big toe', 'Numbness in L5 dermatome', 'Pain worsens on coughing/sneezing'],
    onsetMode: 'Gradual Degenerative',
    mobilityStatus: 'Positive Straight Leg Raise (SLR 35° left) · Neurological claudication distance < 150m · Forward flexed antalgic posture',
    triageVitals: {
      bp: '142/90 mmHg',
      pulse: 84,
      spo2: '98%',
      temp: '98.2°F',
      weightKg: 78,
      heightCm: 156,
      bmi: 32.1,
      bmiCategory: 'Obese Class I',
    },
    criticalAlerts: [
      '⚠️ Hypertension on Telmisartan 40mg',
      '⚠️ Neurological Red Flag: Left EHL motor weakness (Grade 4/5)',
      'Osteopenia on bone scan (T-score -2.1)',
    ],
    investigationsStatus: 'Lumbar Spine MRI Sagittal T2 FSE Ready (MR-2024-5119)',
    rawScanId: 'mr-spine-08',
    scanThumbnailUrl: '/images/mri-lumbar-spine.jpg',
    billingStatus: 'paid',
    billingAmount: '₹1,500 (Cash)',
    registeredTime: '09:35 AM',
    status: 'In Cabin',
    isNewPatient: false,
    pastVisitsCount: 2,
    pastVisits: [
      {
        id: 'VIS-9501',
        date: '04 Sep 2026',
        doctor: 'Dr. Lakshmi Narayana',
        department: 'Spine Surgery OPD',
        visitType: 'Follow-up',
        chiefComplaint: 'Left leg sciatica radiating to big toe, unable to stand to cook meals.',
        clinicalDiagnosis: 'L4-L5 Lumbar Disc Extrusion with Left L5 Nerve Root Compression',
        interventions: 'Advised strict short-term bed rest, neuro-protective medications, spine MRI ordered.',
        prescriptions: ['Tab Pregabalin 75mg HS', 'Tab Methylprednisolone 16mg tapering dose', 'Tab Pantoprazole 40mg OD'],
        imagingSummary: 'MRI Lumbar spine demonstrated prominent posterior disc herniation with canal encroachment.',
        scanStudyId: 'mr-spine-08',
        notes: 'If foot weakness progresses or urinary symptoms arise, emergency microdiscectomy indicated.'
      },
      {
        id: 'VIS-9100',
        date: '20 Jul 2026',
        doctor: 'Dr. Lakshmi Narayana',
        department: 'Spine Surgery OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'Lower back stiffness and dull ache after lifting water can.',
        clinicalDiagnosis: 'Acute Lumbar Muscle Spasm & Lumbar Spondylosis',
        interventions: 'Lumbosacral belt support, core strengthening physical therapy advised.',
        prescriptions: ['Tab Aceclofenac-SP 1-0-1 for 7 days', 'Muscle relaxant at bedtime'],
        notes: 'Initial spine consult.'
      }
    ]
  },
  {
    token: 'T-202',
    patientId: 'PT-2024-00202',
    patientName: 'Lakshmi Sundaram',
    age: 62,
    gender: 'F',
    phone: '+91 98765 01009',
    occupation: 'Retired School Headmistress',
    doctorAssigned: 'Dr. Lakshmi Narayana',
    cabin: 'Cabin 102',
    primaryJoint: 'Right Hip Joint',
    duration: '1 Year with progressive groin pain',
    painScore: 7,
    painCharacter: ['Groin pain aggravated by internal rotation', 'Difficulty cutting toenails / putting on socks', 'Stiffness after sitting'],
    onsetMode: 'Gradual Degenerative',
    mobilityStatus: 'Trendelenburg lurch present · True limb shortening 1.5 cm · Requires high chair',
    triageVitals: {
      bp: '130/84 mmHg',
      pulse: 72,
      spo2: '98%',
      temp: '98.0°F',
      weightKg: 70,
      heightCm: 158,
      bmi: 28.0,
      bmiCategory: 'Overweight',
    },
    criticalAlerts: [
      '⚠️ Osteoporosis on DEXA (T-Score -2.8) · High fracture risk',
      'Mild bronchial asthma (uses Budecort inhaler SOS)',
    ],
    investigationsStatus: 'Pelvis with Both Hips AP Standing Radiograph Ready (XR-2024-3991)',
    rawScanId: 'xr-pelvis-06',
    scanThumbnailUrl: '/images/xray-pelvis-hip.jpg',
    billingStatus: 'tpa',
    billingAmount: 'TPA Pre-Auth Approved',
    registeredTime: '09:50 AM',
    status: 'Waiting',
    isNewPatient: false,
    pastVisitsCount: 2,
    pastVisits: [
      {
        id: 'VIS-9340',
        date: '18 Jul 2026',
        doctor: 'Dr. Lakshmi Narayana',
        department: 'Joint Reconstruction OPD',
        visitType: 'Follow-up',
        chiefComplaint: 'Right hip pain increasing, unable to walk around residential colony.',
        clinicalDiagnosis: 'Right Hip Osteoarthritis Gr IV',
        interventions: 'TPA pre-authorization documents submitted for Right Total Hip Replacement.',
        prescriptions: ['Tab Etodolac 400mg BD', 'Cap Calcitriol 0.25mcg OD'],
        imagingSummary: 'Pelvis X-ray showed loss of joint space and subchondral sclerosis.',
        scanStudyId: 'xr-pelvis-06',
        notes: 'Awaiting TPA approval confirmation for surgery scheduling.'
      },
      {
        id: 'VIS-8720',
        date: '11 Feb 2026',
        doctor: 'Dr. Lakshmi Narayana',
        department: 'Orthopedic OPD',
        visitType: 'Initial OP',
        chiefComplaint: 'Right groin discomfort attributed initially to pelvic muscle strain.',
        clinicalDiagnosis: 'Early Right Hip Osteoarthritis',
        interventions: 'Physical therapy, cycling, non-impact exercises advised.',
        prescriptions: ['Glucosamine sulfate sachets', 'Tab Paracetamol SOS'],
        notes: 'Initial clinical assessment.'
      }
    ]
  },
];
