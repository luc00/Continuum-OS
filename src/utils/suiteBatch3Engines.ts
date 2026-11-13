// Pure, testable logic engines for the 20 new Continuum Work OS modules

export interface SupplyRouteRisk {
  portName: string;
  congestionPct: number;
  estimatedDelayDays: number;
  marginAtRiskEuros: number;
  alternativeCostDeltaPct: number;
}

/**
 * SupplyPulse: Assesses geopolitical/port disruption impact and backup option viability.
 */
export function evaluateSupplyResilience(risk: SupplyRouteRisk) {
  const severity: 'critical' | 'elevated' | 'stable' =
    risk.estimatedDelayDays >= 14 || risk.congestionPct >= 35
      ? 'critical'
      : risk.estimatedDelayDays >= 5
      ? 'elevated'
      : 'stable';

  const backupRecommended = severity === 'critical' && risk.alternativeCostDeltaPct <= 5;
  const protectedMarginEuros = backupRecommended
    ? Math.round(risk.marginAtRiskEuros * (1 - Math.max(0, risk.alternativeCostDeltaPct) / 100))
    : 0;

  return {
    severity,
    backupRecommended,
    protectedMarginEuros,
    hoursToLockOption: severity === 'critical' ? 2 : 24,
  };
}

/**
 * LiquidCash: Computes optimal fractional factoring and idle weekend overnight sweep yield.
 */
export function calculateTreasuryOptimization(input: {
  upcomingGapEuros: number;
  receivableInvoiceEuros: number;
  factoringRatePct: number;
  idleWeekendCashEuros: number;
  overnightAprPct: number;
}) {
  const fractionToFactorEuros = Math.min(input.upcomingGapEuros, input.receivableInvoiceEuros);
  const factoringCostEuros = Math.round((fractionToFactorEuros * input.factoringRatePct) / 100);
  // Weekend = 2.5 days of yield
  const weekendYieldEuros = Number(
    ((input.idleWeekendCashEuros * (input.overnightAprPct / 100) * 2.5) / 365).toFixed(2)
  );
  const netLiquidityImpactEuros = Number((weekendYieldEuros - factoringCostEuros).toFixed(2));

  return {
    fractionToFactorEuros,
    factoringCostEuros,
    weekendYieldEuros,
    netLiquidityImpactEuros,
    gapFullyCovered: fractionToFactorEuros >= input.upcomingGapEuros,
  };
}

/**
 * CustomerDNA: Calculates predictive pre-order volume and revenue from interactive prototype feature weights.
 */
export function simulatePrototypeDemand(input: {
  baseAudience: number;
  selectedFeatures: Array<{ weightMultiplier: number; unitCostEuros: number }>;
  pricePointEuros: number;
}) {
  const totalMultiplier = input.selectedFeatures.reduce(
    (acc, f) => acc * f.weightMultiplier,
    1.0
  );
  // Price elasticity dampening around reference 89€
  const priceElasticity = Math.max(0.45, Math.min(1.35, 89 / Math.max(25, input.pricePointEuros)));
  const predictedPreorders = Math.round(input.baseAudience * totalMultiplier * priceElasticity);
  const totalUnitCost = input.selectedFeatures.reduce((acc, f) => acc + f.unitCostEuros, 18);
  const grossRevenueEuros = predictedPreorders * input.pricePointEuros;
  const grossMarginEuros = predictedPreorders * (input.pricePointEuros - totalUnitCost);

  return {
    predictedPreorders,
    grossRevenueEuros,
    grossMarginEuros,
    unitMarginEuros: input.pricePointEuros - totalUnitCost,
  };
}

/**
 * PriceMorph: Tailors non-manipulative value terms based on buyer liquidity & urgency profile.
 */
export function computeEmpatheticOffer(input: {
  basePriceEuros: number;
  buyerProfile: 'low_budget_high_visibility' | 'extreme_urgency_12h' | 'standard_enterprise';
}) {
  if (input.buyerProfile === 'low_budget_high_visibility') {
    const finalPrice = Math.round(input.basePriceEuros * 0.7);
    return {
      finalPriceEuros: finalPrice,
      discountOrPremiumPct: -30,
      valueExchangeClause: 'Caso studio pubblico co-firmato + pagamento annuale anticipato',
      deliverySla: 'Standard (5 giorni lavorativi)',
      conversionLiftPct: 44,
    };
  }
  if (input.buyerProfile === 'extreme_urgency_12h') {
    const finalPrice = Math.round(input.basePriceEuros * 1.25);
    return {
      finalPriceEuros: finalPrice,
      discountOrPremiumPct: 25,
      valueExchangeClause: 'Corsia prioritaria dedicata con penale SLA garantita 12 ore',
      deliverySla: 'Express 12 ore garantite',
      conversionLiftPct: 38,
    };
  }
  return {
    finalPriceEuros: input.basePriceEuros,
    discountOrPremiumPct: 0,
    valueExchangeClause: 'Piano standard trimestrale flessibile senza vincoli',
    deliverySla: 'Standard (48 ore)',
    conversionLiftPct: 18,
  };
}

/**
 * TrustEscrow: Computes released vs locked vault amounts across programmable IoT/customs milestones.
 */
export function computeEscrowState(
  totalContractEuros: number,
  milestones: Array<{ pct: number; verified: boolean }>
) {
  const releasedPct = milestones
    .filter((m) => m.verified)
    .reduce((acc, m) => acc + m.pct, 0);
  const clampedPct = Math.min(100, releasedPct);
  const releasedEuros = Math.round((totalContractEuros * clampedPct) / 100);
  const lockedEuros = totalContractEuros - releasedEuros;

  return {
    releasedPct: clampedPct,
    releasedEuros,
    lockedEuros,
    fullySettled: clampedPct >= 100,
  };
}

/**
 * TabZero: Natural-language command parser for the keyboard-free voice-visual canvas.
 */
export function parseTabZeroVoiceCommand(
  command: string,
  records: Array<{ id: string; region: string; amount2025: number; amount2026: number }>
) {
  const lower = command.toLowerCase();
  const filterBelow100 =
    lower.includes('sotto i 100') || lower.includes('< 100') || lower.includes('elimina');
  const focusNorth = lower.includes('nord');

  const filteredRecords = records.filter((r) => {
    if (filterBelow100 && r.amount2026 < 100) return false;
    return true;
  });

  const northRow = records.find((r) => r.region.toLowerCase().includes('nord'));
  const northDeltaPct = northRow
    ? Math.round(((northRow.amount2026 - northRow.amount2025) / northRow.amount2025) * 100)
    : -14;

  const emailRecipient = lower.includes('luca') ? 'Luca Bellini (Direttore Nord Italia)' : 'Team Commerciale';

  return {
    filteredRecords,
    removedCount: records.length - filteredRecords.length,
    northDeltaPct,
    highlightNorth: focusNorth,
    draftEmail: {
      to: emailRecipient,
      subject: `Analisi vendite ottobre (${northDeltaPct}% Nord Italia)`,
      body: `Ciao Luca, ho confrontato i volumi di ottobre rispetto allo scorso anno escludendo i micro-ordini sotto i €100. Nel Nord Italia registriamo una flessione del ${Math.abs(northDeltaPct)}%: ti va di condividere i fattori principali sul territorio così prepariamo insieme il recupero di novembre?`,
    },
  };
}
