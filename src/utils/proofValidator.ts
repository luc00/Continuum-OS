export interface CitationSource {
  title: string;
  organization: string;
  year: number;
  url?: string;
  credibilityIndex: string;
  biasRating: string;
}

export interface ClaimVerification {
  id: string;
  text: string;
  startIndex: number;
  endIndex: number;
  status: 'verified' | 'needs_update' | 'disputed' | 'unverified';
  confidenceScore: number;
  verdictTitle: string;
  verdictSummary: string;
  primarySource: CitationSource;
  suggestedFootnote: string;
  footnoteInserted?: boolean;
}

/**
 * Detects whether a sentence makes an empirical statistical or quantitative claim
 */
export function hasStatisticalClaim(sentence: string): boolean {
  const statRegex = /(\d+([.,]\d+)?\s*(%|percento|percentuale|x|volte|miliardi|milioni|€|\$|dollari|euro|punti))/i;
  const growthKeywords = /(cresciut|aumentat|diminuit|raddoppiat|tasso di|quota di mercato)/i;
  return statRegex.test(sentence) || growthKeywords.test(sentence);
}

/**
 * Formats a clean academic footnote citation in Chicago/APA style
 */
export function formatCitationFootnote(
  footnoteIndex: number,
  source: CitationSource
): string {
  return `[${footnoteIndex}] ${source.organization} (${source.year}). "${source.title}". Accesso archivio verificato.`;
}

/**
 * Computes overall document veracity score (0-100)
 */
export function calculateDocumentVeracity(claims: ClaimVerification[]): number {
  if (claims.length === 0) return 100;
  const total = claims.reduce((acc, c) => {
    let weight = 1.0;
    if (c.status === 'verified') weight = 1.0;
    else if (c.status === 'needs_update') weight = 0.7;
    else if (c.status === 'disputed') weight = 0.3;
    else weight = 0.5;
    return acc + c.confidenceScore * weight;
  }, 0);
  return Math.round(total / claims.length);
}
