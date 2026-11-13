import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateComplianceHealth,
  simulateBoardroomConsensus,
  evaluateBlindCandidate,
  computeBioCapitalROI,
} from './enterpriseAdditions';
import { NexusGovRegulation, VirtualBoardMember, BoardRoomScenario, DepartmentBioCapital } from '../types';

test('NexusGov: calculateComplianceHealth reflects unsigned critical items and upcoming deadlines', () => {
  const mockRegulations: NexusGovRegulation[] = [
    {
      id: 'reg-1',
      title: 'Nuova Direttiva Fatturazione Elettronica B2B 2026',
      jurisdiction: 'Unione Europea (UE)',
      sector: 'Fiscale & Fatturazione',
      effectiveDate: '1 Luglio 2026',
      daysRemaining: 48,
      status: 'action_required',
      impactSummary: 'Obbligo trasmissione formato XML v2.1',
      autoActions: {
        contractTemplateModified: 'Template Clausola 14 aggiornato a standard XML v2.1',
        auditedSuppliersCount: 4,
        compliantSuppliersCount: 4,
        regulatoryArticle: 'Art. 219/c-bis Direttiva IVA',
      },
      complianceBlockSigned: false,
    },
    {
      id: 'reg-2',
      title: 'GDPR Cookie Consent Framework v3.0',
      jurisdiction: 'Nazionale (IT)',
      sector: 'Privacy & GDPR',
      effectiveDate: '15 Settembre 2026',
      daysRemaining: 124,
      status: 'proactively_applied',
      impactSummary: 'Bando al dark pattern nel rifiuto consenso',
      autoActions: {
        contractTemplateModified: 'Banner policy rigenerato',
        auditedSuppliersCount: 1,
        compliantSuppliersCount: 1,
        regulatoryArticle: 'Art. 7 Linee Guida Garante Privacy',
      },
      complianceBlockSigned: true,
    },
  ];

  const result = calculateComplianceHealth(mockRegulations);
  assert.equal(result.pendingActions, 1);
  assert.equal(result.daysToNextDeadline, 48);
  assert.equal(result.compliantRate, 50);
});

test('BoardRoom: simulateBoardroomConsensus blocks high-risk decision when key members veto', () => {
  const scenario: BoardRoomScenario = {
    id: 'sc-1',
    title: 'Acquisizione Competitor in Declino per 24M€',
    category: 'Acquisizione Concorrente',
    initialConditions: 'Cassa residua: 14M€, debito bancario da accendere: 12M€',
    currentEbitdaPct: 3.8,
    cashRunwayMonths: 5,
    proposedAction: 'Finanziamento a leva per rilevare il competitor e consolidare il mercato',
    projectedCost: '24.000.000 €',
  };

  const members: VirtualBoardMember[] = [
    {
      id: 'm1',
      name: 'Warren Buffett Clone',
      archetype: 'Warren Buffett (Risk & Value)',
      avatar: '',
      roleTitle: 'Chief Value & Risk Architect',
      critiqueQuote: 'La leva finanziaria con soli 5 mesi di cassa è roulette russa.',
      riskToleranceScore: 18,
      stressTestFailureScenario: 'Insolvenza finanziaria se i tassi d\'interesse salgono di 75bps',
      recommendation: 'Rigettare o rinegoziare solo ad earn-out senza debito bancario.',
      vote: 'reject_fatal',
    },
    {
      id: 'm2',
      name: 'Elon Musk Clone',
      archetype: 'Elon Musk (Hyper-Growth & Aggression)',
      avatar: '',
      roleTitle: 'Hyper-Scale & Velocity Lead',
      critiqueQuote: 'Se non raddoppiamo la quota di mercato verremo spazzati via in 2 anni.',
      riskToleranceScore: 88,
      stressTestFailureScenario: 'Esecuzione lenta dell\'integrazione software',
      recommendation: 'Procedere a massima velocità tagliando i costi ridondanti entro 90 giorni.',
      vote: 'approve',
    },
    {
      id: 'm3',
      name: 'Daniel Kahneman Clone',
      archetype: 'Daniel Kahneman (Cognitive Biases)',
      avatar: '',
      roleTitle: 'Behavioral Bias Auditor',
      critiqueQuote: 'State cadendo nella trappola del sunk-cost e nell\'eccesso di ottimismo.',
      riskToleranceScore: 22,
      stressTestFailureScenario: 'Crollo morale del team acquisito e fuga dei talenti chiave',
      recommendation: 'Sospendere fino a stress-test indipendente.',
      vote: 'reject_fatal',
    },
  ];

  const result = simulateBoardroomConsensus(scenario, members);
  assert.equal(result.consensusVerdict, 'BLOCKED');
  assert.equal(result.votesSummary.reject, 2);
  assert.ok(result.survivabilityIndex < 60);
});

test('TalentMatrix: evaluateBlindCandidate scores purely by execution without bias', () => {
  const topCandidate = evaluateBlindCandidate({
    executionScore: 96,
    logicQualityScore: 92,
    algorithmicEfficiencyScore: 98,
    timeSpentMinutes: 38,
    targetTimeMinutes: 45,
  });

  assert.ok(topCandidate.compositeScore >= 90);
  assert.ok(topCandidate.percentileRank >= 90);
  assert.equal(topCandidate.isTopTier, true);
});

test('BioCapital: computeBioCapitalROI detects sales department chronic fatigue and calculates shielded savings', () => {
  const departments: DepartmentBioCapital[] = [
    {
      id: 'd-sales',
      department: 'Vendite & Business Dev',
      headcount: 14,
      recoveryScore: 42,
      strainWorkloadRatio: 1.58,
      chronicFatigueRisk: 'critical',
      projectedNextWeekHours: 62,
      rebalancedSchedule: {
        tasksShiftedCount: 18,
        destinationDepartment: 'Customer Success (Fresco, Recovery 88%)',
        shieldedRecoveryHours: 54,
        status: 'auto_applied',
      },
    },
    {
      id: 'd-success',
      department: 'Customer Success',
      headcount: 18,
      recoveryScore: 88,
      strainWorkloadRatio: 0.88,
      chronicFatigueRisk: 'optimal',
      projectedNextWeekHours: 35,
    },
  ];

  const result = computeBioCapitalROI(departments);
  assert.equal(result.criticalDepartmentsCount, 1);
  assert.equal(result.totalShieldedHours, 54);
  assert.ok(result.preventedBurnoutCostEstimate > 10000);
});
