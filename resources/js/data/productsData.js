/**
 * Pharmaceutical Products Data
 * Matches future Laravel API resource structure:
 * GET /api/v1/products?featured=true
 */
export const featuredProducts = [
  {
    id: 1,
    productCode: "CIP-PAR-650",
    brandName: "CIPLON-PARA 650",
    genericName: "Paracetamol IP",
    category: "Analgesics & Antipyretics",
    therapeuticArea: "Pain Management",
    dosageForm: "Tablet",
    strength: "650 mg",
    packSize: "10 × 10 Tablets (Alu-Alu Blister)",
    composition: "Each uncoated tablet contains: Paracetamol IP 650 mg; Excipients q.s.",
    indications: "Symptomatic relief of mild to moderate pain and febrile conditions.",
    storage: "Store protected from moisture and direct sunlight at a temperature not exceeding 30°C.",
    description: "High-purity rapid disintegration formulation engineered for predictable dissolution and consistent therapeutic relief.",
    badge: "Fast Dissolution",
    featured: true
  },
  {
    id: 2,
    productCode: "CRD-AML-05",
    brandName: "CARDIOVAST-AM",
    genericName: "Amlodipine Besylate & Atorvastatin Calcium",
    category: "Cardiovascular Agents",
    therapeuticArea: "Cardiology",
    dosageForm: "Film-coated Tablet",
    strength: "5 mg / 10 mg",
    packSize: "10 × 10 Tablets (Blister Pack)",
    composition: "Each film-coated tablet contains: Amlodipine Besylate IP equivalent to Amlodipine 5 mg, Atorvastatin Calcium Trihydrate IP equivalent to Atorvastatin 10 mg.",
    indications: "Management of essential hypertension with concomitant dyslipidemia as adjunct to diet.",
    storage: "Store in a cool, dry place. Protect from light and moisture.",
    description: "Fixed-dose combination formulation designed for comprehensive cardiovascular risk management and patient adherence.",
    badge: "Dual Action",
    featured: true
  },
  {
    id: 3,
    productCode: "GLY-MET-500",
    brandName: "GLYCONIL-M 500",
    genericName: "Metformin Hydrochloride IP",
    category: "Oral Hypoglycemic Agents",
    therapeuticArea: "Diabetes & Endocrinology",
    dosageForm: "Prolonged-Release Tablet",
    strength: "500 mg",
    packSize: "10 × 14 Tablets (Strip Pack)",
    composition: "Each prolonged-release tablet contains: Metformin Hydrochloride IP 500 mg (in sustained release matrix); Excipients q.s.",
    indications: "Glycemic control in adult patients with Type 2 Diabetes Mellitus.",
    storage: "Store below 25°C. Keep out of reach of children.",
    description: "Hydrophilic matrix tablet providing steady drug release over 24 hours with minimized gastrointestinal discomfort.",
    badge: "Sustained Release",
    featured: true
  },
  {
    id: 4,
    productCode: "AZI-MAC-500",
    brandName: "AZIMAC-500",
    genericName: "Azithromycin Dihydrate IP",
    category: "Macrolide Antibacterial",
    therapeuticArea: "Anti-Infective",
    dosageForm: "Film-coated Tablet",
    strength: "500 mg",
    packSize: "1 × 3 Tablets / 1 × 6 Tablets (Blister)",
    composition: "Each film-coated tablet contains: Azithromycin Dihydrate IP equivalent to anhydrous Azithromycin 500 mg.",
    indications: "Treatment of susceptible respiratory tract, skin, and soft tissue bacterial infections.",
    storage: "Store below 30°C in a dry place. Protect from moisture.",
    description: "Broad-spectrum macrolide antibiotic with high tissue penetration and convenient once-daily dosing regimen.",
    badge: "High Bio-Availability",
    featured: true
  },
  {
    id: 5,
    productCode: "PAN-PRI-DSR",
    brandName: "PANTOPRIME-DSR",
    genericName: "Pantoprazole Sodium & Domperidone",
    category: "Proton Pump Inhibitor & Prokinetic",
    therapeuticArea: "Gastroenterology",
    dosageForm: "Gastro-resistant Capsule",
    strength: "40 mg / 30 mg",
    packSize: "10 × 10 Capsules (Alu-Alu)",
    composition: "Each hard gelatin capsule contains: Pantoprazole Sodium IP equivalent to Pantoprazole 40 mg (as enteric coated pellets), Domperidone IP 30 mg (as sustained release pellets).",
    indications: "Management of gastroesophageal reflux disease (GERD) and associated dyspepsia.",
    storage: "Store below 25°C in a cool and dry place. Protect from direct light.",
    description: "Multi-pellet technology offering targeted duodenal release of pantoprazole and sustained release of domperidone.",
    badge: "Enteric Coated Pellets",
    featured: true
  },
  {
    id: 6,
    productCode: "RES-SYN-FL",
    brandName: "RESPISYNC-FL",
    genericName: "Fluticasone Propionate & Salmeterol",
    category: "Respiratory Formulations",
    therapeuticArea: "Respiratory",
    dosageForm: "Dry Powder Inhaler (Capsule)",
    strength: "250 mcg / 50 mcg",
    packSize: "30 Inhalation Capsules with Device",
    composition: "Each inhalation capsule contains: Fluticasone Propionate IP 250 mcg, Salmeterol Xinafoate IP equivalent to Salmeterol 50 mcg.",
    indications: "Maintenance treatment of asthma and chronic obstructive pulmonary disease (COPD).",
    storage: "Store below 25°C. Do not freeze. Store capsules in original blister until immediate use.",
    description: "Precision-engineered micronized powder formulation optimized for uniform fine-particle lung deposition.",
    badge: "Micronized Powder",
    featured: true
  }
];

export const productCategories = [
  "All Therapeutic Areas",
  "Cardiology",
  "Anti-Infective",
  "Diabetes & Endocrinology",
  "Gastroenterology",
  "Respiratory",
  "Pain Management"
];
