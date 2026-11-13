export interface OpenFileContext {
  id: string;
  filename: string;
  filepath: string;
  cursorLine: number;
  totalLines: number;
  unstagedChanges: number;
  app: 'vscode' | 'figma' | 'notion' | 'slack' | 'github';
  lastEditedMinutesAgo: number;
}

export interface BlockerContext {
  id: string;
  source: string;
  person: string;
  avatar: string;
  waitingOn: string;
  ageHours: number;
  severity: 'high' | 'medium' | 'low';
}

export interface CognitiveBriefing {
  warmupMinutesSaved: number;
  readinessScore: number;
  openFilesCount: number;
  criticalBlockersCount: number;
  primaryAction: string;
}

/**
 * Calculates how many minutes of "cognitive warmup" are saved by instantly
 * restoring open files, active cursor position, and pending blockers.
 */
export function calculateWarmupReduction(
  files: OpenFileContext[],
  blockers: BlockerContext[]
): number {
  if (files.length === 0 && blockers.length === 0) return 0;
  // Baseline search overhead: 12 minutes
  // + 4 minutes per active file context + 6 minutes per unresolved blocker
  const baseline = 12;
  const fileFactor = files.length * 4.5;
  const blockerFactor = blockers.length * 6;
  return Math.min(60, Math.round(baseline + fileFactor + blockerFactor));
}

/**
 * Computes an overall cognitive readiness score (0-100)
 */
export function calculateReadinessScore(
  files: OpenFileContext[],
  blockers: BlockerContext[]
): number {
  if (files.length === 0) return 60;
  let score = 95;
  // Deduct for high severity blockers
  const critical = blockers.filter((b) => b.severity === 'high').length;
  score -= critical * 8;
  // Deduct if any file has been abandoned for more than 48 hours without commit
  const staleFiles = files.filter((f) => f.lastEditedMinutesAgo > 2880).length;
  score -= staleFiles * 5;
  return Math.max(30, Math.min(100, score));
}

/**
 * Generates an instantaneous prioritized action recommendation
 */
export function prioritizeImmediateAction(
  files: OpenFileContext[],
  blockers: BlockerContext[]
): string {
  const highBlocker = blockers.find((b) => b.severity === 'high');
  if (highBlocker) {
    return `Sollecita ${highBlocker.person} su ${highBlocker.source} per ${highBlocker.waitingOn}`;
  }
  const mostRecentFile = [...files].sort(
    (a, b) => a.lastEditedMinutesAgo - b.lastEditedMinutesAgo
  )[0];
  if (mostRecentFile) {
    return `Riprendi riga ${mostRecentFile.cursorLine} in ${mostRecentFile.filename} (${mostRecentFile.unstagedChanges} modifiche non salvate)`;
  }
  return 'Tutto allineato: pronto per la nuova sessione.';
}
