import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWarmupReduction,
  calculateReadinessScore,
  prioritizeImmediateAction,
  OpenFileContext,
  BlockerContext,
} from './contextEngine';

const mockFiles: OpenFileContext[] = [
  {
    id: 'f1',
    filename: 'auth.service.ts',
    filepath: 'src/services/auth.service.ts',
    cursorLine: 142,
    totalLines: 320,
    unstagedChanges: 4,
    app: 'vscode',
    lastEditedMinutesAgo: 45,
  },
  {
    id: 'f2',
    filename: 'CheckoutModal.tsx',
    filepath: 'src/components/CheckoutModal.tsx',
    cursorLine: 88,
    totalLines: 190,
    unstagedChanges: 2,
    app: 'vscode',
    lastEditedMinutesAgo: 90,
  },
];

const mockBlockers: BlockerContext[] = [
  {
    id: 'b1',
    source: 'Figma',
    person: 'Marco Bianchi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    waitingOn: 'Approvazione wireframe token auth Frame 4',
    ageHours: 14,
    severity: 'high',
  },
];

test('calculateWarmupReduction computes time saved based on files and blockers', () => {
  const emptySaved = calculateWarmupReduction([], []);
  assert.equal(emptySaved, 0);

  const saved = calculateWarmupReduction(mockFiles, mockBlockers);
  // baseline 12 + (2 * 4.5) + (1 * 6) = 12 + 9 + 6 = 27
  assert.equal(saved, 27);
});

test('calculateReadinessScore reflects penalty for critical blockers', () => {
  const score = calculateReadinessScore(mockFiles, mockBlockers);
  // 95 - 8 = 87
  assert.equal(score, 87);
});

test('prioritizeImmediateAction identifies high-severity blocker first', () => {
  const action = prioritizeImmediateAction(mockFiles, mockBlockers);
  assert.match(action, /Marco Bianchi/);
});
