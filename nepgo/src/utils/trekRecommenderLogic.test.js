import { calculateTrekScore, buildDiverseRecommendations } from './trekRecommenderLogic';

const baseTrek = {
  id: '1',
  region: 'Khumbu',
  difficulty: 'Challenging',
  budget: 'High',
  minExperience: 'Moderate',
  duration: '14 days',
  bestSeason: 'Spring/Autumn',
};

describe('calculateTrekScore', () => {
  it('scores higher when experience and budget match', () => {
    const prefs = {
      experience: 'Moderate',
      budget: 'High',
      timeAvailable: '16+ days',
      preferredRegion: 'Khumbu',
      season: 'Spring',
    };
    const s = calculateTrekScore(baseTrek, prefs);
    expect(s).toBeGreaterThan(80);
  });

  it('penalizes region mismatch', () => {
    const prefs = {
      experience: 'Moderate',
      budget: 'High',
      timeAvailable: '16+ days',
      preferredRegion: 'Annapurna',
      season: 'Spring',
    };
    const match = calculateTrekScore(baseTrek, {
      ...prefs,
      preferredRegion: 'Khumbu',
    });
    const miss = calculateTrekScore(baseTrek, prefs);
    expect(match).toBeGreaterThan(miss);
  });
});

describe('buildDiverseRecommendations', () => {
  it('returns up to maxCount diverse picks', () => {
    const scored = [
      { id: 'a', region: 'R1', difficulty: 'Easy', score: 90 },
      { id: 'b', region: 'R2', difficulty: 'Easy', score: 85 },
      { id: 'c', region: 'R1', difficulty: 'Moderate', score: 80 },
    ];
    const out = buildDiverseRecommendations(scored, { minScore: 0, maxCount: 2 });
    expect(out.length).toBeLessThanOrEqual(2);
    expect(out[0].id).toBe('a');
  });
});
