/**
 * Company Profile & Statistics Mock Data
 * Structure matches future Laravel API: GET /api/v1/company-profile or /api/v1/settings
 */
export const companyProfile = {
  name: "ApexBio Life Sciences",
  legalName: "ApexBio Pharmaceuticals Ltd.",
  tagline: "Advancing Global Healthcare Through Scientific Precision & Quality",
  description: "A research-driven pharmaceutical enterprise dedicated to developing, manufacturing, and supplying high-quality finished formulations across diverse therapeutic areas.",
  foundedYear: 2004,
  headquarters: "Innovation Park, Sector 62, Bio-Tech Corridor",
  email: "corporate@apexbio-pharma.com",
  enquiriesEmail: "enquiry@apexbio-pharma.com",
  phone: "+1 (800) 458-7290",
  businessHours: "Monday – Friday: 09:00 – 18:00 (EST)",
  
  stats: [
    {
      id: "stat-products",
      value: "180+",
      label: "Pharmaceutical Formulations",
      subtext: "Across solid, liquid, and semi-solid dosage forms"
    },
    {
      id: "stat-therapeutic",
      value: "12+",
      label: "Therapeutic Areas",
      subtext: "Covering acute and chronic medical indications"
    },
    {
      id: "stat-experience",
      value: "20+",
      label: "Years of Excellence",
      subtext: "Committed to scientific precision and safety"
    },
    {
      id: "stat-markets",
      value: "45+",
      label: "Distribution Markets",
      subtext: "Serving global healthcare partners and institutions"
    }
  ],

  corePillars: [
    {
      id: "quality",
      title: "Quality by Design",
      description: "Rigorous analytical testing, in-process controls, and continuous verification at every phase of pharmaceutical manufacturing.",
      iconName: "ShieldCheck"
    },
    {
      id: "innovation",
      title: "Scientific Innovation",
      description: "Dedicated formulation development and stability studies to enhance drug bio-availability and therapeutic performance.",
      iconName: "Microscope"
    },
    {
      id: "integrity",
      title: "Regulatory Integrity",
      description: "Strict adherence to Good Manufacturing and Good Laboratory Practices with full audit-trail compliance and traceability.",
      iconName: "FileCheck"
    },
    {
      id: "patient-focus",
      title: "Patient-Centric Care",
      description: "Every formulation is engineered with safety, consistent efficacy, and accessible healthcare solutions in mind.",
      iconName: "HeartHandshake"
    }
  ]
};
