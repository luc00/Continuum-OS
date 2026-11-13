import test from 'node:test';
import assert from 'node:assert/strict';
import {
  hasStatisticalClaim,
  formatCitationFootnote,
  calculateDocumentVeracity,
  ClaimVerification,
} from './proofValidator';

test('hasStatisticalClaim correctly flags numerical and growth claims', () => {
  assert.equal(
    hasStatisticalClaim("L'adozione dell'IA è cresciuta del 40% nel settore manifatturiero"),
    true
  );
  assert.equal(
    hasStatisticalClaim('Questo è un semplice paragrafo introduttivo senza cifre'),
    false
  );
  assert.equal(
    hasStatisticalClaim('I ricavi hanno superato 15 milioni di euro nel 2025'),
    true
  );
});

test('formatCitationFootnote outputs standard citation numbering', () => {
  const footnote = formatCitationFootnote(1, {
    title: 'European AI Survey',
    organization: 'Eurostat',
    year: 2025,
    credibilityIndex: 'High',
    biasRating: 'Neutral',
  });
  assert.equal(footnote, '[1] Eurostat (2025). "European AI Survey". Accesso archivio verificato.');
});

test('calculateDocumentVeracity yields accurate weighted veracity', () => {
  const sampleClaims: ClaimVerification[] = [
    {
      id: 'c1',
      text: 'Sample 1',
      startIndex: 0,
      endIndex: 10,
      status: 'verified',
      confidenceScore: 90,
      verdictTitle: 'Ok',
      verdictSummary: 'Verified',
      primarySource: { title: 'T', organization: 'O', year: 2025, credibilityIndex: 'H', biasRating: 'N' },
      suggestedFootnote: '[1]',
    },
    {
      id: 'c2',
      text: 'Sample 2',
      startIndex: 11,
      endIndex: 20,
      status: 'needs_update',
      confidenceScore: 80,
      verdictTitle: 'Needs Update',
      verdictSummary: 'Old year',
      primarySource: { title: 'T2', organization: 'O2', year: 2021, credibilityIndex: 'M', biasRating: 'N' },
      suggestedFootnote: '[2]',
    },
  ];
  // c1: 90 * 1.0 = 90. c2: 80 * 0.7 = 56. (90 + 56)/2 = 73
  const score = calculateDocumentVeracity(sampleClaims);
  assert.equal(score, 73);
});
