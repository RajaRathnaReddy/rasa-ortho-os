const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Shoulder Rotator Cuff MRI
const shoulderSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="boneGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="#b0bec5" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#37474f" stop-opacity="0.4"/>
    </radialGradient>
    <linearGradient id="softTissue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c2833"/>
      <stop offset="50%" stop-color="#2c3e50"/>
      <stop offset="100%" stop-color="#0e1726"/>
    </linearGradient>
    <filter id="pacsGlow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Dark PACS Background -->
  <rect width="800" height="600" fill="#050811"/>
  <rect width="800" height="600" fill="url(#softTissue)" opacity="0.6"/>

  <!-- Soft tissue contour of shoulder -->
  <path d="M 120,40 Q 260,30 380,80 Q 520,130 620,240 Q 720,360 740,580 L 100,580 Z" fill="#141d26" opacity="0.7"/>

  <!-- Clavicle -->
  <path d="M 150,110 Q 280,105 380,135 Q 390,150 360,165 Q 260,140 140,145 Z" fill="url(#boneGrad)" opacity="0.85"/>
  <text x="240" y="130" fill="#78909c" font-size="11" font-family="monospace">CLAVICLE</text>

  <!-- Acromion -->
  <path d="M 380,135 Q 460,145 490,170 Q 470,195 410,185 Q 385,160 380,135 Z" fill="url(#boneGrad)" opacity="0.9"/>
  <text x="430" y="160" fill="#90a4ae" font-size="11" font-family="monospace">ACROMION</text>

  <!-- Glenoid Cavity & Scapula -->
  <path d="M 280,240 Q 325,230 335,280 Q 340,360 300,410 Q 240,430 220,330 Z" fill="url(#boneGrad)" opacity="0.85"/>
  <text x="240" y="320" fill="#78909c" font-size="11" font-family="monospace">GLENOID</text>

  <!-- Humeral Head (Large rounded ball) -->
  <circle cx="450" cy="310" r="95" fill="url(#boneGrad)" opacity="0.92"/>
  <path d="M 410,390 L 430,580 L 510,580 L 520,380 Z" fill="url(#boneGrad)" opacity="0.88"/>
  <text x="425" y="315" fill="#37474f" font-weight="bold" font-size="13" font-family="monospace">HUMERUS</text>

  <!-- Joint Space -->
  <path d="M 338,250 Q 355,320 338,390" stroke="#00e5ff" stroke-width="2.5" stroke-dasharray="4 2" fill="none" opacity="0.8"/>

  <!-- Supraspinatus Tendon with High Signal Tear -->
  <path d="M 280,190 Q 380,195 440,225" stroke="#90a4ae" stroke-width="12" fill="none" stroke-linecap="round"/>
  <!-- Tear Gap (Fluid Bright T2 Signal) -->
  <ellipse cx="405" cy="210" rx="16" ry="9" fill="#00e676" opacity="0.9" filter="url(#pacsGlow)"/>
  <circle cx="405" cy="210" r="4" fill="#ffffff"/>
  <!-- Caliper Measurement Line -->
  <line x1="390" y1="210" x2="420" y2="210" stroke="#ffeb3b" stroke-width="2"/>
  <line x1="390" y1="204" x2="390" y2="216" stroke="#ffeb3b" stroke-width="2"/>
  <line x1="420" y1="204" x2="420" y2="216" stroke="#ffeb3b" stroke-width="2"/>
  <text x="365" y="195" fill="#ffeb3b" font-size="10" font-family="monospace" font-weight="bold">1.2 cm TEAR GAP</text>

  <!-- Pointer arrow to tear -->
  <path d="M 490,140 L 420,200" stroke="#f44336" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="500" y="140" fill="#ff5252" font-size="11" font-family="monospace" font-weight="bold">FULL THICKNESS TEAR</text>

  <!-- HUD DICOM Metadata -->
  <text x="25" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold">KAVITHA RAMACHANDRAN (44F)</text>
  <text x="25" y="52" fill="#80cbc4" font-size="10" font-family="monospace">ID: PT-2024-00102 · MOD: MR COR T2 FSE</text>
  <text x="25" y="68" fill="#80cbc4" font-size="10" font-family="monospace">TR: 3200ms · TE: 85ms · FOV: 16cm</text>

  <text x="775" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold" text-anchor="end">RASA ORTHO PACS</text>
  <text x="775" y="52" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">ACC: MR-2024-7712 · RT SHOULDER</text>
  <text x="775" y="68" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">SERIES 4 / SLICE 8</text>

  <text x="740" y="560" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">R</text>
  <text x="25" y="575" fill="#90a4ae" font-size="10" font-family="monospace">W: 1420 L: 580 · 16-BIT GRAYSCALE</text>
</svg>`;

// 2. Post-Op TKR with Metallic Prosthesis
const tkrPostOpSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="femurGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#cfd8dc" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#455a64" stop-opacity="0.3"/>
    </radialGradient>
    <linearGradient id="metalProsthesis" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e0f7fa"/>
      <stop offset="30%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#b2ebf2"/>
      <stop offset="100%" stop-color="#80deea"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="#050811"/>

  <!-- Femur Shaft -->
  <path d="M 330,20 L 330,220 Q 300,260 270,300 L 530,300 Q 500,260 470,220 L 470,20 Z" fill="url(#femurGrad)"/>
  <text x="375" y="140" fill="#607d8b" font-size="12" font-family="monospace">DISTAL FEMUR</text>

  <!-- Tibia Shaft -->
  <path d="M 270,380 Q 310,400 330,440 L 330,590 L 470,590 L 470,440 Q 490,400 530,380 Z" fill="url(#femurGrad)"/>
  <text x="380" y="520" fill="#607d8b" font-size="12" font-family="monospace">PROXIMAL TIBIA</text>

  <!-- Fibula -->
  <path d="M 220,390 Q 240,430 250,590 L 280,590 Q 270,430 250,380 Z" fill="url(#femurGrad)" opacity="0.6"/>

  <!-- ZIMMER NEXGEN CR FEMORAL PROSTHESIS (Dense Radio-opaque Metal) -->
  <path d="M 275,260 Q 330,240 400,240 Q 470,240 525,260 L 525,320 Q 470,340 400,340 Q 330,340 275,320 Z" fill="url(#metalProsthesis)" stroke="#ffffff" stroke-width="2"/>
  <rect x="385" y="210" width="30" height="40" fill="url(#metalProsthesis)"/> <!-- Femoral Peg -->

  <!-- POLYETHYLENE ARTICULAR INSERT (Radiolucent space between metal components) -->
  <rect x="290" y="325" width="220" height="18" fill="#1c2833" stroke="#00e5ff" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="340" y="338" fill="#00e5ff" font-size="10" font-family="monospace">PE SPACER (10mm)</text>

  <!-- TIBIAL METAL TRAY & STEM EXTENSION -->
  <path d="M 270,345 L 530,345 L 525,365 Q 480,375 415,375 L 415,450 L 385,450 L 385,375 Q 320,375 275,365 Z" fill="url(#metalProsthesis)" stroke="#ffffff" stroke-width="2"/>

  <!-- Radiopaque Bone Cement Mantle -->
  <path d="M 270,367 Q 400,380 530,367" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.9"/>

  <!-- Mechanical Axis Alignment Verified Line (180° Neutral) -->
  <line x1="400" y1="20" x2="400" y2="590" stroke="#76ff03" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8"/>
  <text x="410" y="80" fill="#76ff03" font-size="11" font-family="monospace">NEUTRAL MECHANICAL AXIS (179.8°)</text>

  <!-- HUD Annotations -->
  <text x="25" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold">SURESH BABU NAIDU (62M)</text>
  <text x="25" y="52" fill="#80cbc4" font-size="10" font-family="monospace">POST-OP POD 45 CHECK · LT KNEE AP</text>
  <text x="25" y="68" fill="#80cbc4" font-size="10" font-family="monospace">IMPLANT: ZIMMER NEXGEN CR SZ 4</text>

  <text x="775" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold" text-anchor="end">RASA PACS ORTHO</text>
  <text x="775" y="52" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">ACC: XR-2024-6019 · 78 kVp 16 mAs</text>
  <text x="775" y="68" fill="#76ff03" font-size="10" font-family="monospace" font-weight="bold" text-anchor="end">ALIGNMENT: PERFECT STABILITY</text>

  <text x="740" y="560" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">L</text>
</svg>`;

// 3. Knee ACL Tear Sagittal MRI
const aclKneeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="femurCondyle" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#b0bec5" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#263238" stop-opacity="0.3"/>
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="#030712"/>

  <!-- Distal Femoral Condyle (Rounded Sagittal Profile) -->
  <path d="M 280,40 Q 360,30 440,80 Q 560,180 540,320 Q 500,380 400,370 Q 280,350 250,260 L 250,40 Z" fill="url(#femurCondyle)"/>
  <text x="340" y="160" fill="#78909c" font-size="12" font-family="monospace">FEMORAL CONDYLE</text>

  <!-- Posterior Cruciate Ligament (PCL - Intact, Dark Black Band) -->
  <path d="M 390,260 Q 450,330 420,430" stroke="#000000" stroke-width="14" fill="none" stroke-linecap="round"/>
  <text x="445" y="340" fill="#81c784" font-size="10" font-family="monospace">PCL (INTACT)</text>

  <!-- ANTERIOR CRUCIATE LIGAMENT (ACL - Ruptured, Discontinuous Fibers with Edema) -->
  <!-- Proximal stump -->
  <path d="M 440,240 L 400,285" stroke="#37474f" stroke-width="12" fill="none" stroke-linecap="round"/>
  <!-- Bright Edema Gap in Mid-substance -->
  <ellipse cx="375" cy="315" rx="24" ry="14" fill="#00e676" opacity="0.85"/>
  <circle cx="375" cy="315" r="5" fill="#ffffff"/>
  <text x="210" y="320" fill="#ff5252" font-size="12" font-family="monospace" font-weight="bold">COMPLETE ACL RUPTURE &gt;&gt;</text>
  <!-- Distal stump -->
  <path d="M 350,345 L 320,390" stroke="#546e7a" stroke-width="10" fill="none" stroke-linecap="round"/>

  <!-- Tibial Plateau -->
  <path d="M 220,390 Q 360,380 530,400 L 510,580 L 260,580 Z" fill="url(#femurCondyle)"/>
  <text x="360" y="470" fill="#78909c" font-size="12" font-family="monospace">TIBIAL PLATEAU</text>

  <!-- Lateral Femoral Notch Bone Bruise / Contusion (High Signal on T2) -->
  <ellipse cx="460" cy="270" rx="35" ry="25" fill="#80d8ff" opacity="0.35"/>
  <text x="480" y="250" fill="#40c4ff" font-size="10" font-family="monospace">BONE CONTUSION</text>

  <!-- Patella & Patellar Tendon -->
  <ellipse cx="190" cy="240" rx="25" ry="40" fill="url(#femurCondyle)"/>
  <path d="M 185,280 Q 200,340 240,410" stroke="#90a4ae" stroke-width="10" fill="none"/>
  <text x="110" y="240" fill="#90a4ae" font-size="10" font-family="monospace">PATELLA</text>

  <!-- HUD -->
  <text x="25" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold">DEEPA VENKAT (37F)</text>
  <text x="25" y="52" fill="#80cbc4" font-size="10" font-family="monospace">ID: PT-2024-00104 · MOD: MR SAG T2 FAT-SAT</text>
  <text x="25" y="68" fill="#ff5252" font-size="10" font-family="monospace" font-weight="bold">ACUTE ACL MID-SUBSTANCE TEAR (PIVOT SHIFT)</text>

  <text x="775" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold" text-anchor="end">RASA SPORTS ORTHO</text>
  <text x="775" y="52" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">ACC: MR-2024-9104 · RT KNEE</text>
  <text x="775" y="68" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">LACHMAN POSITIVE</text>

  <text x="740" y="560" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">R</text>
</svg>`;

// 4. Cervical Spine Lateral Radiograph
const cervicalSpineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="vertGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="70%" stop-color="#cfd8dc" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#37474f" stop-opacity="0.35"/>
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="#040711"/>

  <!-- Cranial Base / Occiput -->
  <path d="M 280,20 Q 420,20 500,70 L 400,90 Z" fill="url(#vertGrad)" opacity="0.8"/>

  <!-- C1 (Atlas) & C2 (Axis Odontoid) -->
  <ellipse cx="370" cy="110" rx="35" ry="18" fill="url(#vertGrad)"/>
  <path d="M 340,135 L 420,135 L 410,180 L 350,180 Z" fill="url(#vertGrad)"/>
  <text x="435" y="160" fill="#b0bec5" font-size="12" font-family="monospace" font-weight="bold">C2 (Axis)</text>

  <!-- C3 -->
  <path d="M 330,195 L 415,195 L 410,235 L 335,235 Z" fill="url(#vertGrad)"/>
  <text x="430" y="220" fill="#b0bec5" font-size="11" font-family="monospace">C3</text>

  <!-- C4 -->
  <path d="M 320,250 L 405,250 L 400,290 L 325,290 Z" fill="url(#vertGrad)"/>
  <text x="420" y="275" fill="#b0bec5" font-size="11" font-family="monospace">C4</text>

  <!-- C5 with Spondylotic Osteophytes -->
  <path d="M 305,305 L 395,305 L 390,345 L 300,345 Z" fill="url(#vertGrad)"/>
  <text x="410" y="330" fill="#b0bec5" font-size="11" font-family="monospace">C5</text>

  <!-- C5-C6 Disc Space (Marked Disc Narrowing) -->
  <line x1="300" y1="350" x2="390" y2="350" stroke="#ff1744" stroke-width="3" stroke-dasharray="2 2"/>
  <text x="130" y="355" fill="#ff5252" font-size="11" font-family="monospace" font-weight="bold">C5-C6 DISC COLLAPSE &gt;&gt;</text>

  <!-- C6 with Anterior & Posterior Osteophytes -->
  <path d="M 290,358 L 385,358 L 380,400 L 285,400 Z" fill="url(#vertGrad)"/>
  <!-- Anterior Beaking -->
  <path d="M 285,358 L 270,365 L 285,375 Z" fill="#ffffff"/>
  <!-- Posterior Osteophyte encroaching canal -->
  <path d="M 385,358 L 400,363 L 383,372 Z" fill="#ffeb3b"/>
  <text x="405" y="385" fill="#b0bec5" font-size="11" font-family="monospace">C6</text>

  <!-- C7 -->
  <path d="M 280,415 L 375,415 L 370,460 L 275,460 Z" fill="url(#vertGrad)"/>
  <text x="390" y="440" fill="#b0bec5" font-size="11" font-family="monospace">C7</text>

  <!-- Spinous Processes -->
  <path d="M 420,150 L 510,180 L 480,200 Z" fill="url(#vertGrad)" opacity="0.7"/>
  <path d="M 405,270 L 490,310 L 470,325 Z" fill="url(#vertGrad)" opacity="0.7"/>
  <path d="M 370,440 L 540,510 L 510,530 Z" fill="url(#vertGrad)" opacity="0.8"/> <!-- C7 Prominens -->
  <text x="550" y="525" fill="#78909c" font-size="10" font-family="monospace">SPINE C7 PROMINENS</text>

  <!-- Lordosis Curvature Line -->
  <path d="M 375,90 Q 320,280 340,480" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5 3" fill="none" opacity="0.7"/>
  <text x="210" y="210" fill="#00e5ff" font-size="10" font-family="monospace">LOSS OF CERVICAL LORDOSIS</text>

  <!-- HUD -->
  <text x="25" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold">ANIL KUMAR REDDY (52M)</text>
  <text x="25" y="52" fill="#80cbc4" font-size="10" font-family="monospace">LATERAL CERVICAL SPINE RADIOGRAPH</text>
  <text x="25" y="68" fill="#80cbc4" font-size="10" font-family="monospace">DX: CERVICAL SPONDYLOTIC RADICULOPATHY (C6)</text>

  <text x="775" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold" text-anchor="end">RASA SPINE INSTITUTE</text>
  <text x="775" y="52" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">ACC: XR-2024-4421 · 65 kVp 10 mAs</text>
  <text x="775" y="68" fill="#ffeb3b" font-size="10" font-family="monospace" text-anchor="end">FORAMINAL STENOSIS DETECTED</text>

  <text x="740" y="560" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">R</text>
</svg>`;

// 5. Ankle Fracture Radiograph (Bimalleolar Fracture)
const ankleFractureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="tibiaGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="70%" stop-color="#b0bec5" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#37474f" stop-opacity="0.4"/>
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="#04060f"/>

  <!-- Tibia Shaft -->
  <path d="M 310,20 L 310,320 L 260,400 L 410,400 L 430,320 L 430,20 Z" fill="url(#tibiaGrad)"/>
  <text x="345" y="160" fill="#546e7a" font-size="12" font-family="monospace">TIBIA</text>

  <!-- Fibula Shaft -->
  <path d="M 465,20 L 465,310 L 525,430 L 490,445 L 440,310 L 440,20 Z" fill="url(#tibiaGrad)" opacity="0.85"/>
  <text x="460" y="160" fill="#546e7a" font-size="11" font-family="monospace">FIBULA</text>

  <!-- FRACTURE 1: Oblique Weber-B Fibula Fracture Line -->
  <path d="M 450,335 L 515,385" stroke="#ff1744" stroke-width="4" stroke-linecap="round"/>
  <!-- Fracture displacement gap -->
  <polygon points="450,335 480,350 475,360 445,342" fill="#000000"/>
  <text x="535" y="360" fill="#ff5252" font-size="11" font-family="monospace" font-weight="bold">&lt;&lt; OBLIQUE FIBULAR FRACTURE (WEBER B)</text>

  <!-- FRACTURE 2: Medial Malleolus Transverse Fracture Line -->
  <path d="M 255,395 L 305,395" stroke="#ff1744" stroke-width="3.5" stroke-linecap="round"/>
  <polygon points="255,392 305,392 305,398 255,398" fill="#000000"/>
  <text x="80" y="398" fill="#ff5252" font-size="11" font-family="monospace" font-weight="bold">MEDIAL MALLEOLUS FX &gt;&gt;</text>

  <!-- Talus (Ankle Mortise) -->
  <path d="M 285,415 Q 360,405 470,420 L 485,490 Q 370,510 270,480 Z" fill="url(#tibiaGrad)"/>
  <text x="360" y="460" fill="#37474f" font-weight="bold" font-size="12" font-family="monospace">TALUS</text>

  <!-- Calcaneus & Foot outline -->
  <path d="M 270,485 Q 260,580 340,580 L 530,580 Q 560,540 480,490 Z" fill="url(#tibiaGrad)" opacity="0.6"/>

  <!-- Talar Tilt & Medial Clear Space Widening (Instability) -->
  <line x1="280" y1="405" x2="285" y2="425" stroke="#ffeb3b" stroke-width="2"/>
  <text x="210" y="435" fill="#ffeb3b" font-size="9" font-family="monospace">WIDENED MORTISE 6.2mm</text>

  <!-- HUD -->
  <text x="25" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold">MOHAMMED FAROOQ (39M)</text>
  <text x="25" y="52" fill="#80cbc4" font-size="10" font-family="monospace">RIGHT ANKLE AP MORTISE · EMERGENCY TRAUMA</text>
  <text x="25" y="68" fill="#ff1744" font-size="10" font-family="monospace" font-weight="bold">ACUTE UNSTABLE BIMALLEOLAR FRACTURE (ORIF INDICATED)</text>

  <text x="775" y="35" fill="#26a69a" font-size="12" font-family="monospace" font-weight="bold" text-anchor="end">RASA TRAUMA CENTER</text>
  <text x="775" y="52" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">ACC: XR-2024-1102 · STAT EMERGENCY</text>
  <text x="775" y="68" fill="#80cbc4" font-size="10" font-family="monospace" text-anchor="end">OT BOOKING: TRAUMA THEATRE 3</text>

  <text x="740" y="560" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">R</text>
</svg>`;

fs.writeFileSync(path.join(targetDir, 'mri-shoulder-cuff.svg'), shoulderSvg);
fs.writeFileSync(path.join(targetDir, 'xray-tkr-postop.svg'), tkrPostOpSvg);
fs.writeFileSync(path.join(targetDir, 'mri-knee-acl.svg'), aclKneeSvg);
fs.writeFileSync(path.join(targetDir, 'xray-cervical-spine.svg'), cervicalSpineSvg);
fs.writeFileSync(path.join(targetDir, 'xray-ankle-fracture.svg'), ankleFractureSvg);

console.log('Successfully created all 5 distinct orthopedic scans!');
