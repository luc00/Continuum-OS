import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBlindNegotiationMatch,
  calculateBurnoutRisk,
  simulateConsequenceOdds,
  NegotiationBoundary,
  TeamActivityMetadata,
} from './suiteEngines';

test('computeBlindNegotiationMatch correctly identifies mutual ZOPA without leaking limits', () => {
  const buyer: NegotiationBoundary = {
    partyName: 'Azienda Beta SpA',
    minPrice: 38000,
    maxPrice: 52000,
    preferredPaymentDays: 45,
    maxPaymentDays: 60,
    ipOwnershipStrict: false,
    slaUptimeMin: 99.5,
  };

  const seller: NegotiationBoundary = {
    partyName: 'TechCorp Solutions',
    minPrice: 42000,
    maxPrice: 58000,
    preferredPaymentDays: 30,
    maxPaymentDays: 45,
    ipOwnershipStrict: true,
    slaUptimeMin: 99.9,
  };

  const match = computeBlindNegotiationMatch(buyer, seller);
  assert.equal(match.hasZopa, true);
  // effective min: 42000, effective max: 52000 => midpoint 47000
  assert.equal(match.agreedPrice, 47000);
  assert.equal(match.paymentTermsDays, 45);
  assert.equal(match.uptimeSla, 99.9);
  assert.equal(match.mutualSavingsHours, 32);
});

test('calculateBurnoutRisk flags high-risk team when after-hours activity surges', () => {
  const highRiskTeam: TeamActivityMetadata = {
    department: 'Product Design',
    afterHoursEmailPct: 44,
    calendarFragmentationScore: 82,
    avgContextSwitchesPerHour: 11,
    avgResponseLatencyMinutes: 120,
    deepWorkHoursPerWeek: 2.5,
  };

  const assessment = calculateBurnoutRisk(highRiskTeam);
  assert.equal(assessment.riskLevel, 'critical');
  assert.ok(assessment.fatigueIndex >= 65);
  assert.match(assessment.suggestedIntervention, /No-Meeting/);
});

test('simulateConsequenceOdds lowers success when deadline is aggressive', () => {
  const smooth = simulateConsequenceOdds({
    baseProbability: 80,
    containsDiscountRequest: false,
    hasAggressiveDeadline: false,
    wordCount: 220,
  });

  const aggressive = simulateConsequenceOdds({
    baseProbability: 80,
    containsDiscountRequest: true,
    hasAggressiveDeadline: true,
    wordCount: 750,
  });

  assert.ok(smooth.successRate > aggressive.successRate);
  assert.ok(aggressive.discountPushbackRisk > smooth.discountPushbackRisk);
});
