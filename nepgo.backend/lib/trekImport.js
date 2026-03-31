const Trek = require('../models/Trek');

const DIFFICULTY = ['Easy', 'Moderate', 'Challenging'];
const BUDGET = ['Low', 'Medium', 'High'];
const EXPERIENCE = ['Beginner', 'Moderate', 'Experienced'];

function validateAndNormalize(row) {
  if (!row || typeof row !== 'object') {
    throw new Error('Each trek must be an object');
  }
  const name = String(row.name || '').trim();
  if (!name) throw new Error('name is required');

  const difficulty = row.difficulty;
  if (!DIFFICULTY.includes(difficulty)) {
    throw new Error(`difficulty must be one of: ${DIFFICULTY.join(', ')}`);
  }
  const budget = row.budget;
  if (!BUDGET.includes(budget)) {
    throw new Error(`budget must be one of: ${BUDGET.join(', ')}`);
  }
  const minExperience = row.minExperience;
  if (!EXPERIENCE.includes(minExperience)) {
    throw new Error(`minExperience must be one of: ${EXPERIENCE.join(', ')}`);
  }

  const altitude = Number(row.altitude);
  if (!Number.isFinite(altitude) || altitude < 0) {
    throw new Error('altitude must be a non-negative number');
  }

  const image = String(row.image || '').trim();
  if (!image) throw new Error('image URL is required');

  const reviews = Array.isArray(row.reviews)
    ? row.reviews.map((r) => ({
        name: String(r.name || 'Guest').trim() || 'Guest',
        rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
        text: String(r.text || 'Great experience').trim() || 'Great experience',
      }))
    : [];

  const accommodation = Array.isArray(row.accommodation)
    ? row.accommodation.map((a) => ({
        type: String(a.type || 'Tea Houses').trim(),
        description: String(a.description || '').trim() || 'Along the route',
        price: String(a.price || 'Varies').trim(),
      }))
    : [];

  return {
    name,
    region: String(row.region || 'Nepal').trim(),
    difficulty,
    duration: String(row.duration || '').trim() || '—',
    altitude,
    budget,
    minExperience,
    description: String(row.description || '').trim() || name,
    highlights: Array.isArray(row.highlights) ? row.highlights.map(String) : [],
    sustainabilityScore: Math.min(10, Math.max(0, Number(row.sustainabilityScore) || 5)),
    bestSeason: String(row.bestSeason || 'Spring/Autumn').trim(),
    groupSize: String(row.groupSize || '2-10 people').trim(),
    image,
    weatherLocation: String(row.weatherLocation || name).trim(),
    itinerary: Array.isArray(row.itinerary) ? row.itinerary.map(String) : [],
    reviews,
    accommodation,
    coordinates:
      row.coordinates &&
      row.coordinates.latitude != null &&
      row.coordinates.longitude != null
        ? {
            latitude: Number(row.coordinates.latitude),
            longitude: Number(row.coordinates.longitude),
          }
        : undefined,
    tags: Array.isArray(row.tags) ? row.tags.map(String) : [],
    featured: Boolean(row.featured),
  };
}

/**
 * @param {object[]} rows
 * @param {{ mode?: 'skip' | 'replace' }} opts
 */
async function importTreks(rows, opts = {}) {
  const mode = opts.mode === 'replace' ? 'replace' : 'skip';
  const results = { created: 0, updated: 0, skipped: 0, errors: [] };

  if (!Array.isArray(rows)) {
    throw new Error('Expected an array of trek objects');
  }

  for (const row of rows) {
    try {
      const doc = validateAndNormalize(row);
      const existing = await Trek.findOne({ name: doc.name });
      if (existing) {
        if (mode === 'skip') {
          results.skipped += 1;
          continue;
        }
        await Trek.findByIdAndUpdate(existing._id, { $set: doc }, { runValidators: true });
        results.updated += 1;
      } else {
        await Trek.create(doc);
        results.created += 1;
      }
    } catch (e) {
      results.errors.push({ name: row?.name, message: e.message });
    }
  }

  return results;
}

module.exports = { validateAndNormalize, importTreks };
