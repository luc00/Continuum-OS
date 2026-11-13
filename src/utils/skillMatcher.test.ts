import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSkillMatchScore,
  rankColleaguesBySkill,
  ColleagueProfile,
} from './skillMatcher';

const sampleProfiles: ColleagueProfile[] = [
  {
    id: 'p1',
    name: 'Giulia Marchetti',
    department: 'Logistica & Supply Chain',
    role: 'Logistics Analyst',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    hiddenSkills: ['Excel Macros', 'VBA', 'Olandese antico', 'Filologia'],
    backgroundStory: 'Master in lingue fiamminghe e 6 anni di macro Excel complesse.',
    availabilityStatus: 'Disponibile 15m',
    endorsementsCount: 18,
  },
  {
    id: 'p2',
    name: 'Marco Neri',
    department: 'Risorse Umane',
    role: 'HR Recruiter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    hiddenSkills: ['Podcast Audio Editing', 'Storytelling'],
    backgroundStory: 'Ex fonico e podcaster.',
    availabilityStatus: 'Disponibile domani',
    endorsementsCount: 4,
  },
];

test('calculateSkillMatchScore identifies high relevance for Excel and Olandese', () => {
  const scoreGiulia = calculateSkillMatchScore('macro excel olandese', sampleProfiles[0]);
  const scoreMarco = calculateSkillMatchScore('macro excel olandese', sampleProfiles[1]);
  assert.ok(scoreGiulia > 85, `Expected scoreGiulia > 85, got ${scoreGiulia}`);
  assert.ok(scoreGiulia > scoreMarco, 'Giulia should rank higher than Marco for Excel & Dutch');
});

test('rankColleaguesBySkill places best match first', () => {
  const ranked = rankColleaguesBySkill('vba macro', sampleProfiles);
  assert.equal(ranked[0].id, 'p1');
});
