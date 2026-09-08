import { BISService } from "@/types";

export const BIS_SERVICES_DATABASE: BISService[] = [
  {
    id: "serv-scheme-1",
    code: "SCHEME-I",
    name: "ISI Mark Product Certification Scheme",
    shortDescription: "Third-party certification scheme granting the iconic ISI mark for manufactured goods meeting Indian Standards.",
    fullDescription: "Scheme-I is the premier product certification scheme operated by BIS since 1955. It involves factory quality audits, verification of in-house testing equipment, independent sampling, and granting of a Certification Marks Licence (CM/L).",
    schemeType: "Scheme-I (ISI Mark)",
    badge: "Most Widely Used",
    turnaroundTime: "30 - 60 Calendar Days",
    applicableProducts: [
      "Cement & Structural Steel (IS 269, IS 1786)",
      "LED Bulbs & Drivers (IS 16102, IS 15885)",
      "Packaged Drinking Water (IS 14543)",
      "Domestic Pressure Cookers & LPG Cylinders (IS 2347, IS 3196)",
      "Protective Helmets & Safety Footwear (IS 4151, IS 15298)",
      "Electrical Cables, Plugs & Switches (IS 694, IS 1293)"
    ],
    keyBenefits: [
      "Legal compliance with mandatory Government Quality Control Orders (QCOs)",
      "Direct consumer trust and qualification for Government e-Marketplace (GeM) tenders",
      "Right to emboss the globally recognized ISI Mark on products and marketing packaging"
    ],
    mandatoryPrerequisites: [
      "Fully operational manufacturing unit with in-house laboratory facilities for mandatory IS clauses",
      "Qualified Quality Control technical staff appointed in the factory",
      "Manufacturing machinery meeting process requirements described in Scheme of Inspection and Testing (SIT)"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Portal Submission on Manakonline",
        description: "Submit Form-I online along with factory blueprint, machinery list, test equipment calibration certificates, and application fee."
      },
      {
        stepNumber: 2,
        title: "Factory Preliminary Inspection",
        description: "BIS inspecting officers conduct on-site audit to inspect manufacturing capability, raw material controls, and witness lab testing."
      },
      {
        stepNumber: 3,
        title: "Sample Draw & Independent Lab Testing",
        description: "Officers seal independent production samples and dispatch to BIS Central/Regional lab or BIS-recognized NABL laboratory."
      },
      {
        stepNumber: 4,
        title: "Licence Grant & CM/L Allotment",
        description: "Upon satisfactory test report and conformity to Indian Standard, CM/L license number is issued to stamp the ISI Mark."
      }
    ],
    officialPortalUrl: "https://www.manakonline.in/MANAK/productCertification",
    iconName: "ShieldCheck",
    imagePath: "/images/bis-products.jpg"
  },
  {
    id: "serv-scheme-2",
    code: "CRS",
    name: "Compulsory Registration Scheme (CRS)",
    shortDescription: "Fast-track self-declaration compliance scheme for IT, electronics, solar, and smart devices under MeitY & MNRE.",
    fullDescription: "Introduced by the Ministry of Electronics and Information Technology (MeitY) and managed by BIS, the Compulsory Registration Scheme allows manufacturers to register electronic and IT equipment based on test reports from BIS-approved Indian laboratories.",
    schemeType: "Scheme-II (CRS - Compulsory Registration)",
    badge: "Fast Track Digital",
    turnaroundTime: "15 - 25 Calendar Days",
    applicableProducts: [
      "Laptops, Tablets, Servers & Smart Phones (IS 13252 Part 1)",
      "Secondary Lithium Cells & Power Banks (IS 16046 Part 2)",
      "Smart TVs, Audio Systems & Set Top Boxes (IS 616)",
      "Solar PV Modules & Inverters (IS 14286, IS 16221)",
      "Smart Watches, CCTV Cameras & Wireless Earbuds"
    ],
    keyBenefits: [
      "No mandatory prior factory audit required before grant of registration",
      "Registration granted digitally with an R-XXXXXXXX number within 20 working days",
      "Streamlined portal for adding series models and international brand owners"
    ],
    mandatoryPrerequisites: [
      "Product safety test report from a BIS-recognized testing laboratory in India (valid for 90 days)",
      "Brand authorization letter or Trademark registration certificate",
      "Indian Authorized Representative (AIR) for foreign manufacturing entities"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Sample Testing at BIS Recognized Lab",
        description: "Send representative product samples to a recognized Indian testing laboratory for safety parameter evaluation."
      },
      {
        stepNumber: 2,
        title: "Online Application on CRS Portal",
        description: "Upload valid test report, Factory Business Licence, Brand Owner Authorization, and AIR undertaking on crsbis.in."
      },
      {
        stepNumber: 3,
        title: "Digital Scrutiny & Grant of R-Number",
        description: "BIS officials review documents digitally and issue unique 8-digit Registration number (e.g. R-41234567)."
      },
      {
        stepNumber: 4,
        title: "Standard Mark Labeling",
        description: "Affix BIS CRS Standard Mark along with 'Self Declaration - Conforming to IS XXXXX' on product label."
      }
    ],
    officialPortalUrl: "https://www.crsbis.in/BIS/",
    iconName: "Cpu",
    imagePath: "/images/bis-lab.jpg"
  },
  {
    id: "serv-hallmarking",
    code: "HALLMARK",
    name: "Gold & Silver Hallmarking Scheme (HUID)",
    shortDescription: "Laser-verified purity certification and 6-digit Hallmark Unique Identification (HUID) for precious jewelry.",
    fullDescription: "Mandatory hallmarking of gold jewelry protects consumers against adulteration. Gold items are assayed and laser-inscribed with the BIS logo, fineness grade, and an untamperable 6-digit HUID code synced to the central BIS database.",
    schemeType: "Hallmarking (Gold & Silver)",
    badge: "Consumer Protection",
    turnaroundTime: "Same Day (4 - 8 Hours per batch)",
    applicableProducts: [
      "14 Karat (585 Fineness) Gold Jewellery & Artefacts",
      "18 Karat (750 Fineness) Gold Jewellery",
      "20 Karat (833 Fineness) Traditional Items",
      "22 Karat (916 Fineness) Bridal & Standard Gold",
      "24 Karat (995 / 999 Fineness) Bullion & Coins",
      "Silver Articles & Cutlery (IS 2112)"
    ],
    keyBenefits: [
      "Guarantees certified purity when buying or pledging gold anywhere in India",
      "Traceability of each ornament from the Assaying & Hallmarking Centre to jeweler",
      "Verification capability for citizens directly on the BIS CARE mobile app"
    ],
    mandatoryPrerequisites: [
      "Jewellers must obtain free zero-cost one-time portal registration on Manakonline",
      "Jewellery pieces must be sent to BIS-accredited Assaying and Hallmarking Centres (AHC)"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Jeweller Batch Creation",
        description: "Jeweller generates online job card with item weight and purity declaration."
      },
      {
        stepNumber: 2,
        title: "Fire Assay & XRF Testing",
        description: "AHC conducts destructive fire assay testing and XRF multi-point scanning for gold fineness."
      },
      {
        stepNumber: 3,
        title: "Laser HUID Micro-Engraving",
        description: "Automated high-precision laser engraves BIS triangle, purity stamp, and 6-digit HUID code."
      },
      {
        stepNumber: 4,
        title: "Database Sync & Dispatch",
        description: "HUID records are uploaded to BIS server allowing immediate customer verification via mobile app."
      }
    ],
    officialPortalUrl: "https://www.manakonline.in/MANAK/hallmarking",
    iconName: "Sparkles",
    imagePath: "/images/bis-hero.jpg"
  },
  {
    id: "serv-fmcs",
    code: "FMCS",
    name: "Foreign Manufacturers Certification Scheme",
    shortDescription: "Enables overseas factories located outside India to obtain ISI Mark license for exporting goods to India.",
    fullDescription: "Under FMCS (Scheme-I for Overseas Entities), international manufacturers can obtain BIS license to affix the ISI mark on their products before shipping them into the Indian market.",
    schemeType: "FMCS (Foreign Manufacturers)",
    badge: "International Trade",
    turnaroundTime: "90 - 180 Calendar Days",
    applicableProducts: [
      "Automotive Tyres & Tubes (IS 15633, IS 15636)",
      "Solar Panels & Cells for Indian Utility Projects",
      "Chemicals, Polymers, PVC Resins & Steel Billets",
      "Medical Diagnostic Devices & Specialized Machinery"
    ],
    keyBenefits: [
      "Fast customs clearance without import detention at Indian ports of entry",
      "Seamless compliance with Indian mandatory Quality Control Orders (QCOs)",
      "Long-term 1 to 2 year validity with simplified renewal procedures"
    ],
    mandatoryPrerequisites: [
      "Appointment of an Authorized Indian Representative (AIR) residing in India",
      "Payment of overseas inspection airfare, accommodation, and per-diem fees for BIS auditors",
      "Performance Bank Guarantee (PBG) submitted to BIS headquarters"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Form-VI Submission & AIR nomination",
        description: "Overseas manufacturer submits technical dossiers, AIR authorization, and nomination form."
      },
      {
        stepNumber: 2,
        title: "Overseas Factory Audit",
        description: "Delegation of BIS technical officers visits international plant to inspect quality systems."
      },
      {
        stepNumber: 3,
        title: "Witness Testing & Sample Cargo Dispatch",
        description: "Samples drawn at overseas factory are flown to BIS accredited laboratories in India."
      },
      {
        stepNumber: 4,
        title: "Grant of Overseas CM/L Licence",
        description: "Upon testing approval and PBG confirmation, foreign manufacturer licence is issued."
      }
    ],
    officialPortalUrl: "https://www.bis.gov.in/product-certification/foreign-manufacturers-certification-scheme-fmcs/",
    iconName: "Globe",
    imagePath: "/images/bis-products.jpg"
  },
  {
    id: "serv-lab",
    code: "LABS",
    name: "Central & Regional Laboratory Testing Services",
    shortDescription: "State-of-the-art testing across 8 BIS central labs and 150+ NABL accredited partner institutions.",
    fullDescription: "BIS operates a nationwide network of testing laboratories providing conformity assessment, chemical analysis, mechanical stress testing, electrical safety, microbiological screening, and forensic standard compliance evaluations.",
    schemeType: "Management Systems Certification (MSCD)",
    badge: "NABL Accredited",
    turnaroundTime: "7 - 30 Calendar Days (Sample dependent)",
    applicableProducts: [
      "Electrical & Electronics Safety & EMC testing",
      "Chemical, Pesticide & Fertilizer composition analysis",
      "Microbiology and heavy metal testing of water & beverages",
      "Tensile, bend, and impact metallurgy testing of steel rebars"
    ],
    keyBenefits: [
      "Court-admissible certified testing reports with NABL accreditation",
      "Automated Sample Tracking System (LIMS) on Manakonline with real-time status alerts",
      "Benchmark calibration reference standards provided to industry laboratories"
    ],
    mandatoryPrerequisites: [
      "Properly packaged, sealed, and documented test samples with requisite form declarations",
      "Advance payment of testing charges as per BIS Laboratory Schedule of Rates"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Sample Inward & QR Coding",
        description: "Sample logged into LIMS system with tamper-proof QR code to prevent identity leakage."
      },
      {
        stepNumber: 2,
        title: "Environmental Conditioning & Testing",
        description: "Specimen tested in controlled humidity and temperature chambers as per IS criteria."
      },
      {
        stepNumber: 3,
        title: "Digital Test Certificate Generation",
        description: "Cryptographically signed test report generated and synced to applicant's portal."
      }
    ],
    officialPortalUrl: "https://www.bis.gov.in/laboratory-services/overview/",
    iconName: "FlaskConical",
    imagePath: "/images/bis-lab.jpg"
  },
  {
    id: "serv-verification",
    code: "VERIFY",
    name: "Licence Verification & BIS CARE Grievance Portal",
    shortDescription: "Instantly verify CM/L licenses, CRS R-numbers, HUID codes, and report counterfeit or substandard products.",
    fullDescription: "Empowers consumers, manufacturers, and procurement agencies to verify the authenticity of any ISI license, R-Number, or Hallmarked gold piece. Includes a direct whistle-blowing and grievance redressal system with swift enforcement action.",
    schemeType: "Scheme-IV (Certificate of Conformity)",
    badge: "Public Verification",
    turnaroundTime: "Instant Online / 48hr Enforcement",
    applicableProducts: [
      "Any product bearing an ISI Mark (search by CM/L number or Manufacturer name)",
      "Any electronics product bearing BIS CRS logo (search by R-XXXXXXXX number)",
      "Any Hallmarked Gold jewellery (search by 6-digit HUID code)",
      "Consumer grievance reporting against fake ISI marks"
    ],
    keyBenefits: [
      "100% free instant verification directly against the live National Standards Database",
      "Reward and whistleblower protection for reporting counterfeit ISI products",
      "Direct investigation and search & seizure conducted by BIS Enforcement Branch"
    ],
    mandatoryPrerequisites: [
      "CM/L 7 or 8-digit number, 8-digit R-number, or 6-digit HUID code stamped on the product"
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Input Licence / HUID Code",
        description: "Type the code into the verification tool or scan the QR code via mobile camera."
      },
      {
        stepNumber: 2,
        title: "Real-time BIS Registry Query",
        description: "System verifies active status, manufacturer address, brand names, and validity dates."
      },
      {
        stepNumber: 3,
        title: "Instant Report & Grievance Option",
        description: "View authenticity report; if discrepancy detected, file a one-click complaint to BIS vigilance."
      }
    ],
    officialPortalUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/knowyourstandards",
    iconName: "SearchCheck",
    imagePath: "/images/bis-hero.jpg"
  }
];
