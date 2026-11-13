export type SuiteTab =
  | 'overview'
  // Pilastro 1: Autonomia & Zero-Attrito Personale (6)
  | 'contextflow'
  | 'shadowself'
  | 'chronosculptor'
  | 'zeroui'
  | 'tabzero'
  | 'inboxzero'
  // Pilastro 2: Collaborazione, Persone & Energia (6)
  | 'asyncsync'
  | 'skillmesh'
  | 'burnoutradar'
  | 'biocapital'
  | 'cultureos'
  | 'meetingskipper'
  // Pilastro 3: Talenti, R&D & Esecuzione (6)
  | 'legacybridge'
  | 'talentmatrix'
  | 'outcomemarket'
  | 'swarmlabs'
  | 'patentforge'
  | 'oneclickbureaucracy'
  // Pilastro 4: Mercato, Clienti & Crescita (6)
  | 'customerdna'
  | 'competitorxray'
  | 'ghostagency'
  | 'pricemorph'
  | 'pivotengine'
  | 'microfranchise'
  // Pilastro 5: Finanza, Filiera & Accordi (7)
  | 'negotiatezero'
  | 'trustescrow'
  | 'liquidcash'
  | 'supplypulse'
  | 'mergermatch'
  | 'autofollowup'
  | 'futurecast'
  // Pilastro 6: Governance, Sicurezza & Verità (6)
  | 'nexusgov'
  | 'boardroom'
  | 'decisionledger'
  | 'proofguard'
  | 'zeroleak'
  | 'reputationshield';

export type SuiteCategory =
  | 'autonomy'
  | 'people'
  | 'execution'
  | 'market'
  | 'finance'
  | 'governance';

export interface SuiteModuleMeta {
  id: SuiteTab;
  name: string;
  badge: string;
  tagline: string;
  problem: string;
  solution: string;
  category: SuiteCategory;
  categoryLabel: string;
}

// ContextFlow Types
export interface DesktopAppSession {
  id: string;
  name: string;
  icon: string;
  category: 'IDE' | 'Design' | 'Chat' | 'Docs' | 'VCS';
  activeItem: string;
  subDetail: string;
  cursorOrLocation: string;
  status: 'active' | 'pending_review' | 'idle';
  urlOrCommand: string;
  diffPreview?: string[];
}

export interface MorningBriefingData {
  greeting: string;
  headline: string;
  activeTask: string;
  waitingOn: string;
  immediateNextStep: string;
  cognitiveScore: number;
}

// AsyncSync Types
export interface MicroVideoClip {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  avatar: string;
  duration: number;
  posterImage: string;
  createdAt: string;
  transcript: Array<{
    second: number;
    text: string;
  }>;
  actionItems: Array<{
    id: string;
    task: string;
    assignee: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
  }>;
  pinpointComments: Array<{
    id: string;
    second: number;
    author: string;
    avatar: string;
    text: string;
    createdAt: string;
  }>;
}

// SkillMesh Types
export interface SkillColleague {
  id: string;
  name: string;
  currentRole: string;
  department: string;
  avatar: string;
  matchScore: number;
  hiddenSuperpower: string;
  matchReasoning: string;
  availability: string;
  tags: string[];
  endorsedByCount: number;
  pastExperience: string;
}

// ProofGuard Types
export interface VerifiedSource {
  title: string;
  organization: string;
  year: number;
  credibilityIndex: string;
  biasRating: string;
  url?: string;
}

export interface DocumentClaim {
  id: string;
  text: string;
  status: 'verified' | 'needs_update' | 'disputed' | 'unverified';
  confidenceScore: number;
  verdictTitle: string;
  verdictSummary: string;
  primarySource: VerifiedSource;
  suggestedFootnote: string;
  footnoteInserted?: boolean;
}

// NegotiateZero Types
export interface NegotiationTerms {
  partyA: {
    name: string;
    targetPrice: number;
    minPrice: number;
    paymentDays: number;
    ipClause: string;
    deliveryWeeks: number;
  };
  partyB: {
    name: string;
    targetPrice: number;
    maxPrice: number;
    paymentDays: number;
    ipClause: string;
    deliveryWeeks: number;
  };
  status: 'draft' | 'crossing' | 'matched' | 'sealed';
  zopaResult?: {
    agreedPrice: number;
    paymentDays: number;
    deliveryWeeks: number;
    ipSynthesis: string;
    redliningHoursSaved: number;
  };
}

// BurnoutRadar Types
export interface DepartmentBurnoutMetric {
  id: string;
  department: string;
  headcount: number;
  riskLevel: 'critical' | 'warning' | 'healthy';
  fatigueScore: number;
  afterHoursCommPct: number;
  deepWorkHoursAvg: number;
  calendarFragmentationPct: number;
  contextSwitchesPerHour: number;
  actionRecommendation: string;
}

// LegacyBridge Types
export interface LegacyProcessRunbook {
  id: string;
  title: string;
  expertName: string;
  systemName: string;
  recordedDate: string;
  stepsCount: number;
  decisionBranches: number;
  steps: Array<{
    stepNumber: number;
    action: string;
    systemScreen: string;
    exactClickOrField: string;
    fallbackBranch?: string;
  }>;
}

// DecisionLedger Types
export interface CorporateDecision {
  id: string;
  title: string;
  dateDecided: string;
  department: string;
  decisionOwner: string;
  problemContext: string;
  chosenPath: string;
  discardedAlternatives: string[];
  underlyingData: string;
  acceptedRisks: string;
  reviewDate: string;
}

// ShadowSelf Types
export interface ShadowSelfLog {
  id: string;
  time: string;
  counterpartTwin: string;
  topic: string;
  decisionTaken: string;
  status: 'autonomous_resolved' | 'human_action_required';
  savingMinutes: number;
}

// ZeroUI Workspace Types
export interface ZeroUiWorkspaceBlock {
  id: string;
  type: 'timeline' | 'financial_simulator' | 'crm_pipeline' | 'task_matrix' | 'supplier_roster';
  title: string;
  data: any;
}

// FutureCast Types
export interface FutureCastScenario {
  id: string;
  label: string;
  probabilityPct: number;
  reactionSentiment: 'enthusiastic' | 'cautious' | 'pushback' | 'dealbreaker';
  predictedPushbackClause: string;
  mitigationSuggestion: string;
}

// ChronoSculptor Types
export interface BioCognitiveSlot {
  timeSlot: string;
  energyLevel: 'peak_creative' | 'focused_execution' | 'low_energy_admin' | 'recharge';
  scheduledActivity: string;
  autoRescheduledNotice?: string;
}

// OutcomeMarket Types
export interface OutcomePackage {
  id: string;
  title: string;
  scopeSummary: string;
  deliverableType: string;
  bountyEuros: number;
  slaHours: number;
  status: 'dispatching' | 'processing_parallel' | 'verifying_tests' | 'completed';
  testsPassed: string;
}

// NexusGov Types
export interface NexusGovRegulation {
  id: string;
  title: string;
  jurisdiction: 'Nazionale (IT)' | 'Unione Europea (UE)' | 'Internazionale';
  sector: 'Fiscale & Fatturazione' | 'Privacy & GDPR' | 'Sicurezza Lavoro' | 'Bandi & Agevolazioni' | 'ESG & AI Act';
  effectiveDate: string;
  daysRemaining: number;
  status: 'action_required' | 'proactively_applied' | 'monitored';
  impactSummary: string;
  autoActions: {
    contractTemplateModified: string;
    auditedSuppliersCount: number;
    compliantSuppliersCount: number;
    regulatoryArticle: string;
  };
  complianceBlockSigned: boolean;
}

// BoardRoom Types
export interface VirtualBoardMember {
  id: string;
  name: string;
  archetype: 'Warren Buffett (Risk & Value)' | 'Elon Musk (Hyper-Growth & Aggression)' | 'Peter Drucker (Organizational Strategy)' | 'Daniel Kahneman (Cognitive Biases)';
  avatar: string;
  roleTitle: string;
  critiqueQuote: string;
  riskToleranceScore: number; // 0-100
  stressTestFailureScenario: string;
  recommendation: string;
  vote: 'approve' | 'conditional_amend' | 'reject_fatal';
}

export interface BoardRoomScenario {
  id: string;
  title: string;
  category: 'Crollo Vendite 30%' | 'Pivot Modello di Business' | 'Acquisizione Concorrente' | 'Crisi Fornitori Chip';
  initialConditions: string;
  currentEbitdaPct: number;
  cashRunwayMonths: number;
  proposedAction: string;
  projectedCost: string;
}

// TalentMatrix Types
export interface TalentChallenge {
  id: string;
  title: string;
  department: string;
  businessContext: string;
  objective: string;
  timeLimitHours: number;
  activeSubmissionsCount: number;
  benchmarkPercentileAvg: number;
}

export interface BlindCandidate {
  id: string;
  candidateCode: string; // e.g. #EXEC-8492
  challengeId: string;
  executionScore: number; // 0-100
  logicQualityScore: number;
  algorithmicEfficiencyScore: number;
  timeSpentMinutes: number;
  solutionSnippet: string;
  keyStrengths: string[];
  biasFreeBadge: string;
  selectedForOffer?: boolean;
}

// BioCapital Types
export interface DepartmentBioCapital {
  id: string;
  department: string;
  headcount: number;
  recoveryScore: number; // 0-100 (wearables + sleep)
  strainWorkloadRatio: number; // 1.0 is balanced, > 1.4 is under-recovery
  chronicFatigueRisk: 'critical' | 'moderate' | 'optimal';
  projectedNextWeekHours: number;
  rebalancedSchedule?: {
    tasksShiftedCount: number;
    destinationDepartment: string;
    shieldedRecoveryHours: number;
    status: 'pending_confirmation' | 'auto_applied';
  };
}
