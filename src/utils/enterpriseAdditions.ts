import {
  NexusGovRegulation,
  VirtualBoardMember,
  BoardRoomScenario,
  BlindCandidate,
  DepartmentBioCapital,
} from '../types';

/**
 * NexusGov: Calculates regulatory compliance health across active legal mandates.
 */
export function calculateComplianceHealth(regulations: NexusGovRegulation[]) {
  if (!regulations || regulations.length === 0) {
    return { overallScore: 100, pendingActions: 0, daysToNextDeadline: 999, compliantRate: 100 };
  }

  const signedCount = regulations.filter((r) => r.complianceBlockSigned).length;
  const pendingCount = regulations.filter((r) => !r.complianceBlockSigned && r.status === 'action_required').length;
  const daysToNextDeadline = Math.min(...regulations.map((r) => r.daysRemaining));

  const baseScore = Math.round((signedCount / regulations.length) * 100);
  const penalty = pendingCount * 12;
  const overallScore = Math.max(20, Math.min(100, baseScore + (regulations.length - pendingCount) * 5 - penalty));
  const compliantRate = Math.round((signedCount / regulations.length) * 100);

  return {
    overallScore,
    pendingActions: pendingCount,
    daysToNextDeadline,
    compliantRate,
  };
}

/**
 * BoardRoom: Simulates board crisis survivability and decision consensus.
 */
export function simulateBoardroomConsensus(
  scenario: BoardRoomScenario,
  members: VirtualBoardMember[]
) {
  if (!members || members.length === 0) {
    return {
      consensusVerdict: 'CONDITIONAL' as const,
      survivabilityIndex: 50,
      primaryVulnerability: 'Consiglio non costituito',
      votesSummary: { approve: 0, conditional: 0, reject: 0 },
    };
  }

  const approveCount = members.filter((m) => m.vote === 'approve').length;
  const conditionalCount = members.filter((m) => m.vote === 'conditional_amend').length;
  const rejectCount = members.filter((m) => m.vote === 'reject_fatal').length;

  // Factor in runway and EBITDA margin impact
  let baseSurvivability = scenario.cashRunwayMonths >= 12 ? 80 : scenario.cashRunwayMonths >= 6 ? 62 : 38;
  if (scenario.currentEbitdaPct < 5) baseSurvivability -= 14;

  const avgRiskTolerance = Math.round(
    members.reduce((acc, m) => acc + m.riskToleranceScore, 0) / members.length
  );

  const survivabilityIndex = Math.max(
    15,
    Math.min(96, Math.round((baseSurvivability + avgRiskTolerance) / 2))
  );

  let consensusVerdict: 'APPROVED' | 'CONDITIONAL' | 'BLOCKED' = 'CONDITIONAL';
  if (rejectCount >= 2) {
    consensusVerdict = 'BLOCKED';
  } else if (approveCount >= 2 && rejectCount === 0) {
    consensusVerdict = 'APPROVED';
  }

  const primaryVulnerability =
    rejectCount > 0
      ? members.find((m) => m.vote === 'reject_fatal')?.stressTestFailureScenario || 'Rischio insolvenza o diluizione'
      : 'Esecuzione operativa e tempi di pareggio economico';

  return {
    consensusVerdict,
    survivabilityIndex,
    primaryVulnerability,
    votesSummary: {
      approve: approveCount,
      conditional: conditionalCount,
      reject: rejectCount,
    },
  };
}

/**
 * TalentMatrix: Blind algorithmic ranking based purely on execution quality and efficiency.
 */
export function evaluateBlindCandidate(sub: {
  executionScore: number;
  logicQualityScore: number;
  algorithmicEfficiencyScore: number;
  timeSpentMinutes: number;
  targetTimeMinutes: number;
}) {
  const rawWeighted =
    sub.executionScore * 0.45 +
    sub.logicQualityScore * 0.35 +
    sub.algorithmicEfficiencyScore * 0.2;

  // Time bonus: completing accurately within target time
  const timeFactor = sub.timeSpentMinutes <= sub.targetTimeMinutes ? 1.05 : 0.95;
  const compositeScore = Math.min(100, Math.round(rawWeighted * timeFactor));

  // Benchmark percentile relative to industry average (assumed mean 72, std 12)
  const zScore = (compositeScore - 72) / 12;
  const percentileRank = Math.max(1, Math.min(99, Math.round(50 + zScore * 34)));
  const isTopTier = percentileRank >= 90;

  return {
    compositeScore,
    percentileRank,
    isTopTier,
  };
}

/**
 * BioCapital: Assesses organizational biological recovery, workload imbalances, and cognitive ROI.
 */
export function computeBioCapitalROI(departments: DepartmentBioCapital[]) {
  if (!departments || departments.length === 0) {
    return {
      averageRecoveryScore: 80,
      criticalDepartmentsCount: 0,
      totalShieldedHours: 0,
      preventedBurnoutCostEstimate: 0,
    };
  }

  const totalRecovery = departments.reduce((acc, d) => acc + d.recoveryScore, 0);
  const averageRecoveryScore = Math.round(totalRecovery / departments.length);

  const criticalDepartments = departments.filter(
    (d) => d.chronicFatigueRisk === 'critical' || d.strainWorkloadRatio >= 1.35
  );

  const totalShieldedHours = departments.reduce((acc, d) => {
    return acc + (d.rebalancedSchedule?.shieldedRecoveryHours || 0);
  }, 0);

  // Financial model: average senior knowledge worker hour ~ €85, prevention multiplier 3.2x
  const preventedBurnoutCostEstimate = Math.round(totalShieldedHours * 85 * 3.2);

  return {
    averageRecoveryScore,
    criticalDepartmentsCount: criticalDepartments.length,
    totalShieldedHours,
    preventedBurnoutCostEstimate,
  };
}
