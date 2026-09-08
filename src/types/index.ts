export type UserRole = "Manufacturer" | "Compliance Engineer" | "Consumer" | "Auditor" | "BIS Official";

export interface User {
  id: string;
  name: string;
  email: string;
  organization?: string;
  role: UserRole;
  avatarUrl?: string;
  licenseNumber?: string;
}

export type SchemeType = 
  | "Scheme-I (ISI Mark)"
  | "Scheme-II (CRS - Compulsory Registration)"
  | "Scheme-IV (Certificate of Conformity)"
  | "Hallmarking (Gold & Silver)"
  | "FMCS (Foreign Manufacturers)"
  | "Eco Mark"
  | "Management Systems Certification (MSCD)";

export type QCOStatus = "Mandatory (QCO Active)" | "Voluntary" | "Draft QCO / Proposed" | "Under Revision";

export interface Standard {
  id: string;
  isNumber: string; // e.g. "IS 16102 (Part 1)"
  title: string;
  productCategory: string;
  industry: string;
  scheme: SchemeType;
  qcoStatus: QCOStatus;
  year: number;
  ministry?: string;
  scope: string;
  applicability: string;
  testingRequirements: string[];
  markingRequirements: string[];
  requiredDocuments: string[];
  officialSourceUrl: string;
  relatedStandards: string[];
  feeEstimateRange?: string;
  labTestTurnaround?: string;
  imageKeyword?: string;
}

export interface BISService {
  id: string;
  code: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  schemeType: SchemeType;
  badge: string;
  turnaroundTime: string;
  applicableProducts: string[];
  keyBenefits: string[];
  mandatoryPrerequisites: string[];
  stepByStepProcess: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  officialPortalUrl: string;
  iconName: string;
  imagePath?: string;
}

export interface SourceCitation {
  title: string;
  isNumber?: string;
  sourceName: string;
  url: string;
  isOfficial: boolean;
  verifiedAt: string;
}

export interface StructuredAIContent {
  productOrTopic: string;
  relevantStandard?: string;
  standardTitle?: string;
  applicability: string;
  certificationStatus: "Mandatory" | "Voluntary" | "Depends on Product Rating" | "Not Applicable";
  certificationScheme?: SchemeType;
  keyRequirements: string[];
  testingParameters?: string[];
  markingRequirements?: string[];
  source: SourceCitation;
  confidence: "High" | "Medium" | "Verified Official";
  importantNotice?: string;
  flowchartSteps?: string[];
  isOffTopic?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: "user" | "assistant" | "system";
  timestamp: string;
  text?: string;
  structuredContent?: StructuredAIContent;
  attachedDocument?: {
    name: string;
    size: string;
    type: string;
    extractedStandards?: string[];
  };
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  messages: Message[];
  isPinned?: boolean;
  detectedStandard?: string;
}

export interface DocumentAnalysisResult {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  identifiedStandards: {
    isNumber: string;
    matchConfidence: number;
    mandatoryStatus: boolean;
    standardTitle: string;
  }[];
  complianceScore: number; // 0-100
  summary: string;
  clausesDetected: {
    clauseNumber: string;
    description: string;
    status: "Compliant" | "Gap Identified" | "Verification Needed";
    recommendation: string;
  }[];
  checklist: {
    item: string;
    category: "Safety" | "Performance" | "Marking" | "Factory Quality Audit";
    status: "Passed" | "Action Required" | "Pending Lab Test";
  }[];
}
