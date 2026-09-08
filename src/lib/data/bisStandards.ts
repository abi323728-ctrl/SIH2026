import { Standard } from "@/types";

export const BIS_STANDARDS_DATABASE: Standard[] = [
  {
    id: "std-is-16102",
    isNumber: "IS 16102 (Part 1 & 2)",
    title: "Self-Ballasted LED Lamps for General Lighting Services",
    productCategory: "Electrical & Lighting",
    industry: "Consumer Electronics & Lighting",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2014,
    ministry: "Ministry of Electronics and Information Technology (MeitY) / DPIIT",
    scope: "Specifies the safety and performance requirements for self-ballasted LED lamps with supply voltage up to 250V AC.",
    applicability: "Mandatory for all domestic manufacturers and importers of self-ballasted LED lamps sold in India.",
    testingRequirements: [
      "Interchangeability & Mechanical Strength of Lamp Caps",
      "Insulation Resistance and Electric Strength after Humidity Treatment",
      "Resistance to Heat, Fire and Tracking (Glow-wire test at 650°C/750°C)",
      "Creepage Distances and Clearances",
      "Luminous Flux, Efficacy and Correlated Colour Temperature (CCT)",
      "Harmonic Current Emissions (THD < 20% / IS 14700 Part 3 Sec 2)"
    ],
    markingRequirements: [
      "Standard ISI Mark with Unique CML/L License Number",
      "Rated Voltage, Wattage, Frequency, and Lumens",
      "Country of Origin & Manufacturer Name/Brand",
      "CCT rating (Warm White, Cool White, Daylight)"
    ],
    requiredDocuments: [
      "Factory Layout & In-House Testing Equipment Calibration Records",
      "Manufacturing Process Flowchart",
      "Raw Material Test Certificates for LED Chips, Driver, and PBT Housing",
      "Authorization Letter from Factory Head",
      "Third-Party NABL Accredited Laboratory Test Report"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 15885 (Part 2/Sec 13)", "IS 16103 (Part 1)", "IS 14700"],
    feeEstimateRange: "₹45,000 - ₹95,000 (Application + Testing + Marking Fee)",
    labTestTurnaround: "15 - 25 Working Days",
    imageKeyword: "led-bulb"
  },
  {
    id: "std-is-2347",
    isNumber: "IS 2347",
    title: "Domestic Pressure Cookers — Specification",
    productCategory: "Kitchen Appliances & Cookware",
    industry: "Consumer Goods & Metallurgy",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2017,
    ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    scope: "Covers requirements for domestic pressure cookers made of aluminium alloys or stainless steel suitable for cooking purposes.",
    applicability: "Mandatory under Domestic Pressure Cooker (Quality Control) Order. No uncertified cooker can be manufactured, sold, or imported.",
    testingRequirements: [
      "Hydrostatic Pressure Test (Proof Pressure up to 3 times operating pressure)",
      "Safety Valve & Fusible Plug Operating Pressure Test",
      "Bursting Pressure Test",
      "Thermal Shock & Cooking Pressure Retention",
      "Handle Attachment Strength & Temperature Rise during cooking",
      "Food Contact Safety (Leaching test for Aluminium / Stainless Steel grade 304)"
    ],
    markingRequirements: [
      "Mandatory ISI Mark prominently engraved or stamped on vessel base and lid",
      "Nominal Capacity in Litres",
      "Manufacturer Name, Trade Mark, and Batch/Lot Number",
      "Maximum Operating Pressure rating (e.g. 1.0 kgf/cm²)"
    ],
    requiredDocuments: [
      "Metallurgical Test Certificate for Stainless Steel (SS 304/AISI 304) or Aluminium Alloy (IS 21)",
      "Pressure gauge calibration records and hydrostatic test rig schema",
      "Quality Control Plan (QCP) and in-factory sampling records"
    ],
    officialSourceUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/isdetails/2347",
    relatedStandards: ["IS 21", "IS 6911", "IS 1660"],
    feeEstimateRange: "₹50,000 - ₹1,10,000",
    labTestTurnaround: "12 - 20 Working Days",
    imageKeyword: "pressure-cooker"
  },
  {
    id: "std-is-1293",
    isNumber: "IS 1293",
    title: "Plugs and Socket-Outlets of Rated Voltage up to and Including 250 Volts and Rated Current up to 16 Amperes",
    productCategory: "Electrical Accessories",
    industry: "Electrical Wiring & Safety",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2019,
    ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    scope: "Applies to plugs, fixed and portable socket-outlets for AC only with or without earthing contact, rated voltage not exceeding 250V.",
    applicability: "Mandatory under Plugs and Socket-Outlets (Quality Control) Order for all 6A, 10A, and 16A plugs, adapters, and extension boards.",
    testingRequirements: [
      "Dimensions & Gauge Check (Non-interchangeability with incorrect ratings)",
      "Protection against Electric Shock (Standard Test Finger inspection)",
      "Terminal Strength and Screw Tightening Torque",
      "Temperature Rise under Continuous Full-Load Current",
      "Making and Breaking Capacity (100 operations at 1.25 times rated voltage)",
      "Insulation Resistance and Electric Strength",
      "Glow Wire Test for Insulating Materials at 850°C"
    ],
    markingRequirements: [
      "ISI Mark on front/side casing with CML number",
      "Rated current in Amperes (6A / 16A) and voltage (250V ~)",
      "Terminal markings: 'L' (Line), 'N' (Neutral), and Earthing symbol"
    ],
    requiredDocuments: [
      "Material Data Sheets for Polycarbonate/Urea Formaldehyde resins",
      "Die and Mould drawings with dimensional verification",
      "In-house test bench records for temperature rise and high-voltage flash"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 3854", "IS 302 (Part 1)"],
    feeEstimateRange: "₹40,000 - ₹85,000",
    labTestTurnaround: "14 - 21 Working Days",
    imageKeyword: "electrical-plug"
  },
  {
    id: "std-is-269",
    isNumber: "IS 269",
    title: "Ordinary Portland Cement (33, 43 and 53 Grade) — Specification",
    productCategory: "Building Materials",
    industry: "Construction & Civil Infrastructure",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2015,
    ministry: "Ministry of Commerce and Industry (Cement QCO)",
    scope: "Covers manufacture and chemical/physical requirements of Ordinary Portland Cement (OPC) across 33, 43, and 53 strength grades.",
    applicability: "Mandatory for all cement plants in India and overseas manufacturing units exporting to India under Cement (Quality Control) Order.",
    testingRequirements: [
      "Compressive Strength at 3 days, 7 days, and 28 days",
      "Initial and Final Setting Time (Vicat apparatus)",
      "Fineness by Specific Surface (Blaine air permeability method)",
      "Soundness by Le-Chatelier method and Autoclave expansion",
      "Chemical Composition: Loss on Ignition (LOI), Insoluble Residue (IR), Magnesia (MgO), Sulphuric Anhydride (SO3)",
      "Total Chloride content (< 0.1%)"
    ],
    markingRequirements: [
      "Standard ISI Mark in bold with Licence (CM/L) number",
      "Grade designation (e.g., OPC 53 Grade)",
      "Net Mass of cement bag (50 kg)",
      "Week and Year of manufacturing (e.g. Wk 34 / 2026)"
    ],
    requiredDocuments: [
      "Quarry lease and Clinker source validation certificate",
      "Online XRF/XRD chemical lab verification",
      "Daily testing logs for compressive strength cubes"
    ],
    officialSourceUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/isdetails/269",
    relatedStandards: ["IS 456", "IS 4031", "IS 4032"],
    feeEstimateRange: "₹1,20,000 - ₹3,50,000 (Includes plant inspection & marking fee)",
    labTestTurnaround: "32 Working Days (due to 28-day hydration test cycle)",
    imageKeyword: "cement"
  },
  {
    id: "std-is-1417",
    isNumber: "IS 1417",
    title: "Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking",
    productCategory: "Precious Metals & Jewellery",
    industry: "Gems, Jewellery & Assay",
    scheme: "Hallmarking (Gold & Silver)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2016,
    ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
    scope: "Specifies the fineness of gold alloys used in jewelry/artefacts and the method of hallmarking including HUID 6-digit alphanumeric code.",
    applicability: "Mandatory in over 288 designated districts of India for 14k (585), 18k (750), 20k (833), 22k (916), 23k (958), and 24k (995/999) gold items.",
    testingRequirements: [
      "Fire Assay Method (Lead cupellation / gravimetric verification)",
      "X-Ray Fluorescence (XRF) Spectrometry non-destructive screening",
      "Homogeneity testing of soldered and cast parts",
      "Laser micro-engraving clarity of BIS Triangle & 6-digit HUID code"
    ],
    markingRequirements: [
      "BIS Triangular Hallmark Logo",
      "Purity in Karats & Fineness (e.g. 22K916, 18K750, 14K585)",
      "6-Digit Unique Alphanumeric HUID (Hallmark Unique Identification) Code"
    ],
    requiredDocuments: [
      "Jeweller BIS Portal Registration Certificate",
      "Assaying and Hallmarking Centre (AHC) Job Card",
      "Laser engraving log report synced with central Manakonline server"
    ],
    officialSourceUrl: "https://www.bis.gov.in/hallmarking-overview/",
    relatedStandards: ["IS 1418 (Assaying of Gold)", "IS 2112 (Silver Hallmarking)"],
    feeEstimateRange: "₹35 per article + GST at recognized BIS Assaying Center",
    labTestTurnaround: "4 - 8 Hours per batch at AHC",
    imageKeyword: "gold-hallmark"
  },
  {
    id: "std-is-14543",
    isNumber: "IS 14543",
    title: "Packaged Drinking Water (Other Than Packaged Natural Mineral Water) — Specification",
    productCategory: "Food & Beverage Safety",
    industry: "Water Treatment & Bottling",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2024,
    ministry: "Ministry of Health & Family Welfare / FSSAI & BIS Joint Compliance",
    scope: "Specifies hygienic standards, physical, chemical, microbiological, toxic substances, and pesticide residue limits in packaged water.",
    applicability: "Mandatory certification under Food Safety and Standards (FSSAI) and BIS Act. Manufacturing without ISI mark is a criminal offence.",
    testingRequirements: [
      "Microbiological testing: Absence of E. coli, Coliform, Pseudomonas aeruginosa, Faecal Streptococci",
      "Pesticide Residue Limits (Individual < 0.0001 mg/l, Total < 0.0005 mg/l by GC-MS)",
      "Heavy Metal Toxicity (Lead, Arsenic, Cadmium, Mercury, Chromium)",
      "Total Dissolved Solids (TDS: 75 - 500 mg/l)",
      "Packaging Migration test for PET / Polycarbonate bottles"
    ],
    markingRequirements: [
      "ISI Mark on bottle label with CML License number",
      "Batch Number, Date of Manufacturing and Expiry / Best Before date",
      "Source of water (e.g. RO treated ground water / municipal)",
      "Treatment process used (RO, UV, Ozonation, Micron filtration)"
    ],
    requiredDocuments: [
      "Microbiology and Chemical In-House Laboratory setup verification with qualified chemist/microbiologist",
      "Central Ground Water Authority (CGWA) NOC for borewell extraction",
      "Ozone generator & reverse osmosis maintenance logs"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 13428", "IS 10500"],
    feeEstimateRange: "₹85,000 - ₹1,80,000",
    labTestTurnaround: "15 - 20 Working Days",
    imageKeyword: "packaged-water"
  },
  {
    id: "std-is-9873",
    isNumber: "IS 9873 (Part 1, 2, 3 & 4)",
    title: "Safety of Toys — Mechanical, Physical, Flammability and Chemical Migration",
    productCategory: "Children Products & Toys",
    industry: "Consumer Goods & Toy Manufacturing",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2019,
    ministry: "Department for Promotion of Industry and Internal Trade (Toys QCO)",
    scope: "Prescribes safety requirements for toys intended for use by children up to 14 years of age covering sharp edges, choke hazards, and toxic elements.",
    applicability: "Mandatory for all toys manufactured in or imported into India. Custom clearance requires valid BIS ISI license.",
    testingRequirements: [
      "Mechanical and physical tests: Drop test, impact test, torque test, tension test for small parts",
      "Flammability test (rate of flame spread across textile/plush toys)",
      "Migration of toxic elements: Antimony, Arsenic, Barium, Cadmium, Chromium, Lead, Mercury, Selenium (ICP-OES)",
      "Phthalate content testing for plastic toys (< 0.1% concentration)"
    ],
    markingRequirements: [
      "Standard ISI Mark with CM/L code",
      "Age grading symbol (e.g. 'Not suitable for children under 3 years')",
      "Warning labels for choking hazard, battery handling, and adult supervision"
    ],
    requiredDocuments: [
      "Raw material non-toxicity certificates for plastics, colorants, and fabrics",
      "BOM (Bill of Materials) and component safety datasheets",
      "In-house physical safety testing apparatus documentation"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 15644 (Electric Toy Safety)"],
    feeEstimateRange: "₹65,000 - ₹1,35,000",
    labTestTurnaround: "10 - 18 Working Days",
    imageKeyword: "toys"
  },
  {
    id: "std-is-1786",
    isNumber: "IS 1786",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT Rebars)",
    productCategory: "Metals & Steel Products",
    industry: "Civil & Structural Engineering",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2008,
    ministry: "Ministry of Steel (Steel & Steel Products QCO)",
    scope: "Covers requirements for deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 500, Fe 550, and Fe 600.",
    applicability: "Mandatory under Ministry of Steel Quality Control Orders. Sale of non-BIS TMT bars is illegal in India.",
    testingRequirements: [
      "Tensile Strength, 0.2% Proof Stress, and Percentage Elongation",
      "Bend and Re-bend test without signs of fracture",
      "Rib pattern geometry and projected rib area verification",
      "Chemical Analysis: Carbon (< 0.25%), Sulphur, Phosphorus (S+P limits for D and S grades)",
      "Corrosion resistance test (for CRS grade rebars)"
    ],
    markingRequirements: [
      "Continuous rolled brand name, ISI mark, and grade (e.g. 'TATA TISCON 550D ISI') embossed at intervals not exceeding 1.5m",
      "Bundle tag with CM/L number, heat number, and mill test certificate"
    ],
    requiredDocuments: [
      "Billet traceability certificates and ladle refining furnace logs",
      "Universal Testing Machine (UTM) calibration records",
      "Spectrometer calibration log for chemical analysis"
    ],
    officialSourceUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/isdetails/1786",
    relatedStandards: ["IS 432", "IS 2062", "IS 1608"],
    feeEstimateRange: "₹1,50,000 - ₹4,00,000",
    labTestTurnaround: "7 - 14 Working Days",
    imageKeyword: "steel-rebars"
  },
  {
    id: "std-is-694",
    isNumber: "IS 694",
    title: "PVC Insulated Cables for Working Voltages up to and Including 1100 V",
    productCategory: "Electrical Cables & Wires",
    industry: "Power & Infrastructure",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2010,
    ministry: "DPIIT / Ministry of Power",
    scope: "Specifies requirements for single-core and multi-core cables with copper or aluminium conductors insulated with PVC.",
    applicability: "Mandatory under Electrical Wires and Cables QCO for all domestic building wires, submersible cables, and flexible cords.",
    testingRequirements: [
      "Conductor Resistance test (Ohm/km at 20°C)",
      "High Voltage Water Immersion spark test (3 kV for 5 mins)",
      "Insulation Resistance (constant k value)",
      "Tensile strength and elongation at break of PVC insulation before and after ageing",
      "Hot deformation test and Heat shock test at 150°C",
      "Flammability test (oxygen index and temperature index for FRLS cables)"
    ],
    markingRequirements: [
      "Sequential meter marking with brand name, ISI Mark, and CM/L license number on cable jacket",
      "Voltage grade (1100V), Conductor size in sq.mm, and Flame Retardant rating (FRLS / ZHFR)"
    ],
    requiredDocuments: [
      "Electrolytic copper cathode purity certificate (99.97% Cu)",
      "PVC compound formulation and plasticizer technical datasheets",
      "Continuous spark tester calibration logs"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 8130", "IS 5831", "IS 10810"],
    feeEstimateRange: "₹60,000 - ₹1,20,000",
    labTestTurnaround: "12 - 18 Working Days",
    imageKeyword: "electrical-cables"
  },
  {
    id: "std-is-13252",
    isNumber: "IS 13252 (Part 1)",
    title: "Information Technology Equipment — Safety (General Requirements)",
    productCategory: "IT & Telecommunications",
    industry: "Information Technology Hardware",
    scheme: "Scheme-II (CRS - Compulsory Registration)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2010,
    ministry: "Ministry of Electronics and Information Technology (MeitY)",
    scope: "Applies to mains-powered or battery-powered information technology equipment, including laptops, servers, power adapters, and smartphones.",
    applicability: "Mandatory under MeitY Compulsory Registration Scheme (CRS). Importers and OEMs must register on the BIS CRS portal.",
    testingRequirements: [
      "Input Current and Power Rating validation",
      "Electric Strength (Hi-Pot test) and Earth Continuity",
      "Touch Current and Protective Conductor Current",
      "Heating and Abnormal Operating Conditions test",
      "Mechanical Strength (Impact and drop test on enclosures)",
      "Flammability of PCB and plastic materials (UL94 V-0 or equivalent)"
    ],
    markingRequirements: [
      "BIS CRS Standard Mark with 'Self Declaration - Conforming to IS 13252 (Part 1)'",
      "Registration Number (R-XXXXXXXX) prominently displayed on product label and packaging",
      "Portal URL: www.bis.gov.in printed adjacent to the mark"
    ],
    requiredDocuments: [
      "ISO 9001 Factory Quality Management Certificate",
      "Trademark / Brand Ownership authorization letter",
      "Complete Technical Construction File (Schematics, PCB layout, Safety Critical Components list)",
      "Test Report from BIS-approved Indian Laboratory (valid for 90 days from issuance)"
    ],
    officialSourceUrl: "https://www.crsbis.in/BIS/",
    relatedStandards: ["IS 16046 (Secondary Lithium Cells)", "IS 616 (Audio/Video Equipment)"],
    feeEstimateRange: "₹35,000 - ₹70,000 (Government fee per model series)",
    labTestTurnaround: "10 - 15 Working Days",
    imageKeyword: "laptop-electronics"
  },
  {
    id: "std-is-4151",
    isNumber: "IS 4151",
    title: "Protective Helmets for Two Wheeler Riders — Specification",
    productCategory: "Automotive Safety & Gear",
    industry: "Automotive & Road Safety",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2015,
    ministry: "Ministry of Road Transport and Highways (MoRTH)",
    scope: "Specifies construction, materials, shock absorption, penetration resistance, and retention system for two-wheeler protective helmets.",
    applicability: "Mandatory under MoRTH QCO. All non-ISI two-wheeler helmets are banned from manufacturing, import, and sale across India.",
    testingRequirements: [
      "Impact Attenuation Test (Drop from 3m onto flat and hemispherical steel anvils at -10°C, +50°C, and water spray)",
      "Penetration Resistance Test (3 kg drop striker)",
      "Retention System Dynamic Strength and Micrometric Buckle slippage",
      "Visor Optical Clarity, Light Transmission (> 85%), and Scratch Resistance",
      "Rigidity and Peripheral Field of Vision Angle (> 105° lateral)"
    ],
    markingRequirements: [
      "ISI Mark prominently visible on outer rear shell with CML code",
      "Helmet Size in centimetres (e.g. 58 cm - Large)",
      "Month and Year of manufacture",
      "Mass of helmet in grams (Maximum allowed: 1200g ± 50g)"
    ],
    requiredDocuments: [
      "EPS (Expanded Polystyrene) high-density foam test report",
      "Polycarbonate/ABS shell impact rating validation",
      "In-house drop test tower calibration certification"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 9944", "IS 7692"],
    feeEstimateRange: "₹75,000 - ₹1,40,000",
    labTestTurnaround: "14 - 20 Working Days",
    imageKeyword: "helmet"
  },
  {
    id: "std-is-4250",
    isNumber: "IS 4250",
    title: "Domestic Electric Food Mixers (Liquidizers and Grinders) — Safety and Performance",
    productCategory: "Kitchen Appliances & Cookware",
    industry: "Consumer Appliances",
    scheme: "Scheme-I (ISI Mark)",
    qcoStatus: "Mandatory (QCO Active)",
    year: 2021,
    ministry: "DPIIT",
    scope: "Covers electrical safety, insulation, motor thermal protection, grinding efficiency, and mechanical durability of domestic mixies.",
    applicability: "Mandatory under Domestic Electrical Appliances Quality Control Order.",
    testingRequirements: [
      "Insulation resistance and flash dielectric strength at 1500V",
      "Continuous and intermittent running temperature rise of universal motor windings",
      "Leakage of liquids into motor housing test",
      "Blade locking torque and impact resistance of stainless steel jars",
      "Overload circuit breaker tripping time"
    ],
    markingRequirements: [
      "ISI Mark on motor base plate with CML number",
      "Rated Wattage (e.g. 750W / 1000W), Voltage, and RPM",
      "Duty rating (e.g. 30 minutes continuous / 5 minutes rest)"
    ],
    requiredDocuments: [
      "Motor winding insulation class certificate (Class B/F)",
      "Food-grade certification for stainless steel jars and polycarbonate lids",
      "Endurance test rig logs"
    ],
    officialSourceUrl: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
    relatedStandards: ["IS 302 (Part 1)", "IS 302 (Part 2/Sec 14)"],
    feeEstimateRange: "₹45,000 - ₹90,000",
    labTestTurnaround: "12 - 16 Working Days",
    imageKeyword: "mixer-grinder"
  }
];
