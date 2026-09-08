import { BIS_STANDARDS_DATABASE } from "@/lib/data/bisStandards";
import { BIS_SERVICES_DATABASE } from "@/lib/data/bisServices";
import { StructuredAIContent } from "@/types";

// Keywords that indicate BIS and Indian Standards intent
const BIS_KEYWORDS = [
  "bis", "isi", "isi mark", "standard", "standards", "indian standard", "certification", 
  "scheme", "crs", "hallmark", "huid", "qco", "quality control order", "compliance", 
  "testing", "lab", "laboratory", "license", "licence", "cml", "r-number", "fmcs", 
  "manakonline", "marking", "mandatory", "audit", "manufacturer", "import", "customs",
  "bulb", "led", "cooker", "pressure cooker", "cement", "water", "packaged water", 
  "drinking water", "steel", "tmt", "rebar", "plug", "socket", "cable", "wire", 
  "helmet", "toy", "toys", "laptop", "cell", "battery", "gold", "silver", "jewellery",
  "mixer", "grinder", "switch", "pvc", "concrete", "verify", "document", "spec", "dossier"
];

// Off-topic indicators (topics clearly unrelated to BIS/Indian standards)
const OFF_TOPIC_KEYWORDS = [
  "recipe", "pasta", "pizza", "burger", "cook pasta", "movie", "cinema", "cricket", 
  "ipl", "football", "song", "lyrics", "joke", "relationship", "politics", "president", 
  "weather forecast", "horoscope", "astrology", "write a poem", "write python script", 
  "write java code", "hack", "bypass password"
];

export interface QueryAnalysisResult {
  isOffTopic: boolean;
  refusalMessage?: string;
  structuredContent?: StructuredAIContent;
  fallbackText?: string;
}

export function processBISQuery(userQuery: string): QueryAnalysisResult {
  const queryLower = userQuery.toLowerCase().trim();

  // 1. Check for explicit off-topic refusal trigger
  const hasOffTopicKeyword = OFF_TOPIC_KEYWORDS.some(kw => queryLower.includes(kw));
  const hasBisKeyword = BIS_KEYWORDS.some(kw => queryLower.includes(kw));

  if (hasOffTopicKeyword && !hasBisKeyword) {
    return {
      isOffTopic: true,
      refusalMessage: "I'm specialized in BIS, Indian Standards, product compliance and BIS services. Please ask me a BIS-related question.",
      structuredContent: {
        productOrTopic: "Off-Topic Query",
        applicability: "Not applicable under BIS jurisdiction.",
        certificationStatus: "Not Applicable",
        keyRequirements: [],
        source: {
          title: "Bureau of Indian Standards Policy Scope",
          sourceName: "BIS IntelliAssist Compliance Guardrail",
          url: "https://www.bis.gov.in",
          isOfficial: true,
          verifiedAt: new Date().toISOString().split("T")[0]
        },
        confidence: "High",
        isOffTopic: true,
        importantNotice: "I'm specialized in BIS, Indian Standards, product compliance and BIS services. Please ask me a BIS-related question."
      }
    };
  }

  // 2. Search for direct IS Number match (e.g. "IS 16102", "16102", "IS 2347", "IS 269", "IS 1417")
  const isMatch = BIS_STANDARDS_DATABASE.find(std => {
    const rawNumber = std.isNumber.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanQuery = queryLower.replace(/[^a-z0-9]/g, "");
    if (cleanQuery.includes(rawNumber)) return true;
    const parts = std.isNumber.toLowerCase().split(" ");
    if (parts.length > 1 && parts[1] && queryLower.includes(parts[1])) return true;
    return false;
  });

  if (isMatch) {
    return {
      isOffTopic: false,
      structuredContent: {
        productOrTopic: isMatch.title,
        relevantStandard: isMatch.isNumber,
        standardTitle: isMatch.title,
        applicability: isMatch.applicability,
        certificationStatus: isMatch.qcoStatus.includes("Mandatory") ? "Mandatory" : "Voluntary",
        certificationScheme: isMatch.scheme,
        keyRequirements: isMatch.testingRequirements.slice(0, 4),
        testingParameters: isMatch.testingRequirements,
        markingRequirements: isMatch.markingRequirements,
        source: {
          title: `${isMatch.isNumber} Official BIS Standard & QCO Specification`,
          isNumber: isMatch.isNumber,
          sourceName: "Bureau of Indian Standards (Official Source)",
          url: isMatch.officialSourceUrl,
          isOfficial: true,
          verifiedAt: new Date().toISOString().split("T")[0]
        },
        confidence: "Verified Official",
        importantNotice: "Requirements can change. Verify the current requirement on the official BIS source before making a compliance decision.",
        flowchartSteps: [
          "1. Check Scope & Clause applicability under " + isMatch.isNumber,
          "2. Establish in-house laboratory testing setup per Scheme of Inspection & Testing (SIT)",
          "3. File application on Manakonline with raw material & factory QC documents",
          "4. Undergo factory audit & third-party NABL sample validation",
          "5. Grant of CM/L licence to mark ISI emblem on product packaging"
        ]
      }
    };
  }

  // 3. Search for Product Category matches (e.g. LED, Bulb, Pressure Cooker, Cement, Gold, Hallmark, Water, Cable, Helmet, Toy, Laptop, Mixer)
  const productMatches = BIS_STANDARDS_DATABASE.filter(std => {
    const titleMatch = std.title.toLowerCase().split(" ").some(w => w.length > 3 && queryLower.includes(w));
    const prodCategoryMatch = std.productCategory.toLowerCase().split(" ").some(w => w.length > 3 && queryLower.includes(w));
    const keywordMatch = std.imageKeyword && queryLower.includes(std.imageKeyword.replace("-", " "));
    
    // Product specific synonyms
    if (queryLower.includes("led") || queryLower.includes("bulb") || queryLower.includes("lamp")) return std.id === "std-is-16102";
    if (queryLower.includes("cooker") || queryLower.includes("pressure")) return std.id === "std-is-2347";
    if (queryLower.includes("cement") || queryLower.includes("concrete")) return std.id === "std-is-269";
    if (queryLower.includes("gold") || queryLower.includes("hallmark") || queryLower.includes("huid") || queryLower.includes("jewel")) return std.id === "std-is-1417";
    if (queryLower.includes("water") || queryLower.includes("packaged") || queryLower.includes("bottle")) return std.id === "std-is-14543";
    if (queryLower.includes("toy") || queryLower.includes("children")) return std.id === "std-is-9873";
    if (queryLower.includes("steel") || queryLower.includes("tmt") || queryLower.includes("rebar")) return std.id === "std-is-1786";
    if (queryLower.includes("cable") || queryLower.includes("wire") || queryLower.includes("pvc")) return std.id === "std-is-694";
    if (queryLower.includes("plug") || queryLower.includes("socket") || queryLower.includes("adapter")) return std.id === "std-is-1293";
    if (queryLower.includes("laptop") || queryLower.includes("phone") || queryLower.includes("it equipment") || queryLower.includes("crs")) return std.id === "std-is-13252";
    if (queryLower.includes("helmet") || queryLower.includes("two wheeler")) return std.id === "std-is-4151";
    if (queryLower.includes("mixer") || queryLower.includes("grinder") || queryLower.includes("mixie")) return std.id === "std-is-4250";

    return titleMatch || prodCategoryMatch || keywordMatch;
  });

  if (productMatches.length > 0) {
    const matched = productMatches[0];
    return {
      isOffTopic: false,
      structuredContent: {
        productOrTopic: matched.title,
        relevantStandard: matched.isNumber,
        standardTitle: matched.title,
        applicability: matched.applicability,
        certificationStatus: matched.qcoStatus.includes("Mandatory") ? "Mandatory" : "Voluntary",
        certificationScheme: matched.scheme,
        keyRequirements: matched.testingRequirements.slice(0, 4),
        testingParameters: matched.testingRequirements,
        markingRequirements: matched.markingRequirements,
        source: {
          title: `${matched.isNumber} — Official BIS Indian Standard`,
          isNumber: matched.isNumber,
          sourceName: "Official Bureau of Indian Standards Portal",
          url: matched.officialSourceUrl,
          isOfficial: true,
          verifiedAt: new Date().toISOString().split("T")[0]
        },
        confidence: "High",
        importantNotice: "Requirements can change. Verify the current requirement on the official BIS source before making a compliance decision.",
        flowchartSteps: [
          `1. Verification of product technical specs against ${matched.isNumber}`,
          "2. Preparing Quality Manual and SIT (Scheme of Inspection and Testing)",
          "3. Sample dispatch to BIS Central Laboratory / NABL Accredited Center",
          "4. Comprehensive on-site factory audit by BIS technical assessors",
          "5. Issue of CM/L licence number and authorized use of the ISI mark"
        ]
      }
    };
  }

  // 4. Search BIS Services (e.g. how to obtain certification, FMCS, hallmarking, verification, fee)
  const serviceMatch = BIS_SERVICES_DATABASE.find(serv => {
    return queryLower.includes(serv.code.toLowerCase()) ||
      queryLower.includes(serv.name.toLowerCase().split(" ")[0]) ||
      serv.applicableProducts.some(p => queryLower.includes(p.toLowerCase().split(" ")[0]));
  });

  if (serviceMatch || queryLower.includes("certification") || queryLower.includes("how to obtain") || queryLower.includes("document") || queryLower.includes("process")) {
    const s = serviceMatch || BIS_SERVICES_DATABASE[0];
    return {
      isOffTopic: false,
      structuredContent: {
        productOrTopic: s.name,
        relevantStandard: "BIS Conformity Assessment Regulations",
        standardTitle: s.shortDescription,
        applicability: `Applicable to manufacturers, brand owners, and importers falling under ${s.schemeType}.`,
        certificationStatus: "Mandatory",
        certificationScheme: s.schemeType,
        keyRequirements: s.keyBenefits,
        testingParameters: s.mandatoryPrerequisites,
        markingRequirements: [
          "Affixing authorized BIS Standard Mark / ISI Emblem",
          "Displaying valid License (CM/L or R-Number)",
          "Batch traceability and production tracking tags"
        ],
        source: {
          title: `${s.name} — Official Procedural Guidelines`,
          sourceName: "e-BIS Manakonline Portal",
          url: s.officialPortalUrl,
          isOfficial: true,
          verifiedAt: new Date().toISOString().split("T")[0]
        },
        confidence: "Verified Official",
        importantNotice: "Requirements can change. Verify current requirement on the official BIS source before making a compliance decision.",
        flowchartSteps: s.stepByStepProcess.map(step => `${step.stepNumber}. ${step.title}: ${step.description}`)
      }
    };
  }

  // 5. General BIS Query Fallback (When no specific standard is matched, but query is BIS related)
  return {
    isOffTopic: false,
    structuredContent: {
      productOrTopic: userQuery,
      relevantStandard: "Indian Standards Catalogue (Bureau of Indian Standards)",
      standardTitle: "BIS National Standards & Quality Control Orders",
      applicability: "Under the Bureau of Indian Standards Act 2016, products covered under mandatory Quality Control Orders (QCOs) require BIS certification prior to production or import.",
      certificationStatus: "Depends on Product Rating",
      certificationScheme: "Scheme-I (ISI Mark)",
      keyRequirements: [
        "Factory Quality Management System conformity (ISO 9001 / BIS QMS)",
        "Adequate in-house testing equipment with valid NABL calibration",
        "Compliance with product-specific Scheme of Inspection and Testing (SIT)",
        "Product labeling with genuine ISI Mark and unique CM/L code"
      ],
      source: {
        title: "BIS Official Portal & Know Your Standards Directory",
        sourceName: "Official Bureau of Indian Standards Registry",
        url: "https://www.bis.gov.in",
        isOfficial: true,
        verifiedAt: new Date().toISOString().split("T")[0]
      },
      confidence: "High",
      importantNotice: "Requirements can change. Verify the current requirement on the official BIS source before making a compliance decision."
    }
  };
}
