/**
 * Pure scoring + selection for Trek Recommender (unit-tested).
 */

export function calculateTrekScore(trek, preferences) {
  let score = 0;

  if (preferences.experience === trek.minExperience) {
    score += 35;
  } else if (preferences.experience === 'Experienced') {
    if (trek.minExperience === 'Moderate') score += 30;
    else if (trek.minExperience === 'Beginner') score += 25;
    else score += 20;
  } else if (preferences.experience === 'Moderate') {
    if (trek.minExperience === 'Beginner') score += 30;
    else if (trek.minExperience === 'Experienced') score += 25;
    else score += 20;
  } else {
    if (trek.minExperience === 'Beginner') score += 35;
    else if (trek.minExperience === 'Moderate') score += 20;
    else score += 10;
  }

  if (preferences.budget === trek.budget) {
    score += 25;
  } else if (preferences.budget === 'High') {
    if (trek.budget === 'Medium') score += 20;
    else if (trek.budget === 'Low') score += 15;
    else score += 25;
  } else if (preferences.budget === 'Medium') {
    if (trek.budget === 'Low') score += 20;
    else if (trek.budget === 'High') score += 15;
    else score += 25;
  } else {
    if (trek.budget === 'Low') score += 25;
    else if (trek.budget === 'Medium') score += 15;
    else score += 5;
  }

  const trekDays = parseInt(String(trek.duration), 10);
  const preferredDays =
    preferences.timeAvailable.split('-')[1] || preferences.timeAvailable.split('-')[0];
  const maxPreferredDays = parseInt(preferredDays, 10);

  if (trekDays <= maxPreferredDays) {
    score += 20;
  } else if (trekDays <= maxPreferredDays + 3) {
    score += 15;
  } else if (trekDays <= maxPreferredDays + 7) {
    score += 10;
  } else {
    score += 5;
  }

  if (preferences.preferredRegion === 'Any') {
    score += 15;
  } else if (preferences.preferredRegion === trek.region) {
    score += 15;
  } else {
    score += 5;
  }

  const season = preferences.season;
  const best = trek.bestSeason || '';
  if (season && best.includes(season)) {
    score += 5;
  } else if (season && best === 'All year') {
    score += 5;
  } else {
    score += 2;
  }

  return score;
}

export function buildDiverseRecommendations(scoredTreks, { minScore = 25, maxCount = 3 } = {}) {
  const filteredTreks = scoredTreks
    .filter((trek) => trek.score >= minScore)
    .sort((a, b) => b.score - a.score);

  const diverseRecommendations = [];
  const selectedRegions = new Set();
  const selectedDifficulties = new Set();

  if (filteredTreks.length > 0) {
    diverseRecommendations.push(filteredTreks[0]);
    selectedRegions.add(filteredTreks[0].region);
    selectedDifficulties.add(filteredTreks[0].difficulty);
  }

  for (let i = 1; i < filteredTreks.length && diverseRecommendations.length < maxCount; i++) {
    const trek = filteredTreks[i];
    const isDifferentRegion = !selectedRegions.has(trek.region);
    const isDifferentDifficulty = !selectedDifficulties.has(trek.difficulty);
    if (isDifferentRegion || isDifferentDifficulty) {
      diverseRecommendations.push(trek);
      selectedRegions.add(trek.region);
      selectedDifficulties.add(trek.difficulty);
    }
  }

  for (let i = 1; i < filteredTreks.length && diverseRecommendations.length < maxCount; i++) {
    const trek = filteredTreks[i];
    if (!diverseRecommendations.find((r) => r.id === trek.id)) {
      diverseRecommendations.push(trek);
    }
  }

  return diverseRecommendations;
}
