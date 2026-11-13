export interface ColleagueProfile {
  id: string;
  name: string;
  department: string;
  role: string;
  avatar: string;
  hiddenSkills: string[];
  backgroundStory: string;
  availabilityStatus: string;
  endorsementsCount: number;
}

/**
 * Calculates a match score between a user search query and an employee's latent skill set
 */
export function calculateSkillMatchScore(
  query: string,
  profile: ColleagueProfile
): number {
  if (!query.trim()) return 70;
  const qTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  if (qTerms.length === 0) return 75;

  let hits = 0;
  const searchPool = [
    profile.department,
    profile.role,
    ...profile.hiddenSkills,
    profile.backgroundStory,
  ].join(' ').toLowerCase();

  for (const term of qTerms) {
    if (searchPool.includes(term)) {
      hits += 1;
    }
  }

  const baseScore = Math.min(99, Math.round(60 + (hits / qTerms.length) * 38));
  // Add subtle boost if they have high peer endorsements
  const endorsementBonus = Math.min(3, Math.floor(profile.endorsementsCount / 5));
  return Math.min(99, baseScore + endorsementBonus);
}

/**
 * Filters and ranks colleague profiles based on natural language query
 */
export function rankColleaguesBySkill(
  query: string,
  profiles: ColleagueProfile[]
): Array<ColleagueProfile & { matchScore: number }> {
  return profiles
    .map((p) => ({
      ...p,
      matchScore: calculateSkillMatchScore(query, p),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
