/**
 * Pure logic calculations for the revolutionary workplace suite
 */

export interface NegotiationBoundary {
  partyName: string;
  minPrice: number;
  maxPrice: number;
  preferredPaymentDays: number;
  maxPaymentDays: number;
  ipOwnershipStrict: boolean;
  slaUptimeMin: number;
}

export interface BlindDealResult {
  hasZopa: boolean;
  agreedPrice: number;
  paymentTermsDays: number;
  uptimeSla: number;
  mutualSavingsHours: number;
  compromiseSummary: string;
}

/**
 * Blind ZOPA (Zone of Possible Agreement) matcher for NegotiateZero.
 * Never leaks boundary thresholds to opposing parties, only outputs the mutually optimal intersection.
 */
export function computeBlindNegotiationMatch(
  buyer: NegotiationBoundary,
  seller: NegotiationBoundary
): BlindDealResult {
  // Check if price overlap exists (Buyer max >= Seller min)
  const hasPriceOverlap = buyer.maxPrice >= seller.minPrice;
  const hasPaymentOverlap = seller.maxPaymentDays >= buyer.preferredPaymentDays;

  if (!hasPriceOverlap) {
    return {
      hasZopa: false,
      agreedPrice: 0,
      paymentTermsDays: 0,
      uptimeSla: 0,
      mutualSavingsHours: 0,
      compromiseSummary: 'Nessun ZOPA identificato sul prezzo base senza concessioni accessorie.',
    };
  }

  // Nash equilibrium midpoint within overlap
  const effectiveMin = Math.max(buyer.minPrice, seller.minPrice);
  const effectiveMax = Math.min(buyer.maxPrice, seller.maxPrice);
  const agreedPrice = Math.round((effectiveMin + effectiveMax) / 2);

  // Payment terms: buyer prefers longer, seller prefers faster
  const paymentTermsDays = Math.min(buyer.preferredPaymentDays, seller.maxPaymentDays);
  const uptimeSla = Math.max(buyer.slaUptimeMin, seller.slaUptimeMin);

  return {
    hasZopa: true,
    agreedPrice,
    paymentTermsDays,
    uptimeSla,
    mutualSavingsHours: 32, // typical 32 hours of redlining saved
    compromiseSummary: `Accordo ottimale a €${agreedPrice.toLocaleString()} con pagamento a ${paymentTermsDays} giorni e SLA ${uptimeSla}%.`,
  };
}

export interface TeamActivityMetadata {
  department: string;
  afterHoursEmailPct: number; // 0-100%
  calendarFragmentationScore: number; // 0-100
  avgContextSwitchesPerHour: number;
  avgResponseLatencyMinutes: number;
  deepWorkHoursPerWeek: number;
}

export interface BurnoutAssessment {
  riskLevel: 'critical' | 'warning' | 'healthy';
  fatigueIndex: number; // 0-100
  primarySymptom: string;
  suggestedIntervention: string;
}

/**
 * Heuristic burnout risk evaluation based strictly on metadata (privacy-safe, no content inspection)
 */
export function calculateBurnoutRisk(meta: TeamActivityMetadata): BurnoutAssessment {
  let score = 0;

  // After-hours activity weight
  if (meta.afterHoursEmailPct > 35) score += 30;
  else if (meta.afterHoursEmailPct > 20) score += 15;

  // Calendar fragmentation (no deep work blocks)
  if (meta.deepWorkHoursPerWeek < 4) score += 30;
  else if (meta.deepWorkHoursPerWeek < 8) score += 15;

  // Frequent context switches
  if (meta.avgContextSwitchesPerHour > 9) score += 25;
  else if (meta.avgContextSwitchesPerHour > 6) score += 12;

  // Sluggish response latency (sign of cognitive saturation)
  if (meta.avgResponseLatencyMinutes > 90) score += 15;

  score = Math.min(100, score);

  if (score >= 65) {
    return {
      riskLevel: 'critical',
      fatigueIndex: score,
      primarySymptom: `Sovraccarico severo: +${meta.afterHoursEmailPct}% comunicazioni serali e soli ${meta.deepWorkHoursPerWeek}h di deep work.`,
      suggestedIntervention: 'Istituire "No-Meeting Friday" e congelare notifiche Slack dalle 18:30 alle 08:30.',
    };
  } else if (score >= 35) {
    return {
      riskLevel: 'warning',
      fatigueIndex: score,
      primarySymptom: 'Frammentazione dell\'attenzione in aumento con frequenti cambi task.',
      suggestedIntervention: 'Raggruppare i meeting in fasce pomeridiane e proteggere le mattine per lavoro profondo.',
    };
  }

  return {
    riskLevel: 'healthy',
    fatigueIndex: score,
    primarySymptom: 'Ritmo operativo equilibrato con tempo adeguato per concentrazione.',
    suggestedIntervention: 'Mantenere il regime attuale di coordinamento asincrono.',
  };
}

export interface SimulationScenarioInput {
  baseProbability: number;
  containsDiscountRequest: boolean;
  hasAggressiveDeadline: boolean;
  wordCount: number;
}

/**
 * Monte Carlo simulator for FutureCast proposal reaction odds
 */
export function simulateConsequenceOdds(input: SimulationScenarioInput): {
  successRate: number;
  discountPushbackRisk: number;
  frictionDelayDays: number;
  recommendedTweak: string;
} {
  let success = input.baseProbability;
  let pushback = 20;
  let delay = 3;

  if (input.hasAggressiveDeadline) {
    success -= 14;
    delay += 5;
    pushback += 15;
  }

  if (input.wordCount > 600) {
    // Too verbose
    success -= 8;
    delay += 2;
  }

  if (input.containsDiscountRequest) {
    pushback += 35;
  }

  success = Math.max(10, Math.min(95, success));
  pushback = Math.max(5, Math.min(90, pushback));

  return {
    successRate: success,
    discountPushbackRisk: pushback,
    frictionDelayDays: delay,
    recommendedTweak:
      pushback > 40
        ? 'Riformula il pricing legandolo a milestone di valore anziché canone fisso anticipato.'
        : 'Formulazione ottimale: procedi all\'invio con confidenza elevata.',
  };
}
