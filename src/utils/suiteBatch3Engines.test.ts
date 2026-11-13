import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateSupplyResilience,
  calculateTreasuryOptimization,
  simulatePrototypeDemand,
  computeEmpatheticOffer,
  computeEscrowState,
  parseTabZeroVoiceCommand,
} from './suiteBatch3Engines';

test('SupplyPulse: evaluateSupplyResilience flags critical port slowdown and recommends zero-delta European option', () => {
  const res = evaluateSupplyResilience({
    portName: 'Porto di Ningbo-Zhoushan',
    congestionPct: 40,
    estimatedDelayDays: 18,
    marginAtRiskEuros: 140000,
    alternativeCostDeltaPct: 0,
  });

  assert.equal(res.severity, 'critical');
  assert.equal(res.backupRecommended, true);
  assert.equal(res.protectedMarginEuros, 140000);
  assert.equal(res.hoursToLockOption, 2);
});

test('LiquidCash: calculateTreasuryOptimization factors only required gap and yields weekend return', () => {
  const res = calculateTreasuryOptimization({
    upcomingGapEuros: 22000,
    receivableInvoiceEuros: 65000,
    factoringRatePct: 0.85,
    idleWeekendCashEuros: 50000,
    overnightAprPct: 4.1,
  });

  assert.equal(res.fractionToFactorEuros, 22000);
  assert.equal(res.factoringCostEuros, 187);
  assert.ok(res.weekendYieldEuros > 10);
  assert.equal(res.gapFullyCovered, true);
});

test('CustomerDNA: simulatePrototypeDemand computes pre-orders and unit margin accurately', () => {
  const res = simulatePrototypeDemand({
    baseAudience: 1000,
    selectedFeatures: [
      { weightMultiplier: 1.15, unitCostEuros: 12 },
      { weightMultiplier: 1.22, unitCostEuros: 14 },
    ],
    pricePointEuros: 89,
  });

  assert.equal(res.predictedPreorders, 1403);
  assert.equal(res.unitMarginEuros, 45);
  assert.ok(res.grossRevenueEuros > 120000);
});

test('PriceMorph: computeEmpatheticOffer exchanges 30% discount for public case study on low liquidity', () => {
  const offer = computeEmpatheticOffer({
    basePriceEuros: 10000,
    buyerProfile: 'low_budget_high_visibility',
  });

  assert.equal(offer.finalPriceEuros, 7000);
  assert.equal(offer.discountOrPremiumPct, -30);
  assert.ok(offer.valueExchangeClause.includes('Caso studio'));
});

test('TrustEscrow: computeEscrowState tracks verified tranche releases', () => {
  const state = computeEscrowState(100000, [
    { pct: 20, verified: true },
    { pct: 30, verified: true },
    { pct: 50, verified: false },
  ]);

  assert.equal(state.releasedPct, 50);
  assert.equal(state.releasedEuros, 50000);
  assert.equal(state.lockedEuros, 50000);
  assert.equal(state.fullySettled, false);
});

test('TabZero: parseTabZeroVoiceCommand filters micro-orders below 100 and prepares polite email to Luca', () => {
  const res = parseTabZeroVoiceCommand(
    'Prendi i dati di ottobre, elimina le righe sotto i 100 euro e prepara una mail per Luca sul nord Italia',
    [
      { id: '1', region: 'Nord Italia', amount2025: 10000, amount2026: 8200 },
      { id: '2', region: 'Centro Micro-Ordine', amount2025: 120, amount2026: 75 },
    ]
  );

  assert.equal(res.removedCount, 1);
  assert.equal(res.northDeltaPct, -18);
  assert.ok(res.draftEmail.to.includes('Luca'));
  assert.ok(res.draftEmail.body.includes('18%'));
});
