#!/usr/bin/env node
/**
 * Bulk-add or update treks from JSON without editing code.
 *
 * Usage:
 *   node importTreks.js path/to/treks.json
 *   node importTreks.js path/to/treks.json --replace   # overwrite same name
 *
 * JSON shape: [ { name, region, difficulty, ... }, ... ]  OR  { "treks": [ ... ] }
 * Required fields match the Trek model (see data/treks.import.example.json).
 */

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const { connectMongo } = require('./lib/mongoConnect');
const { importTreks } = require('./lib/trekImport');

async function main() {
  const fileArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
  if (!fileArg) {
    console.error('Usage: node importTreks.js <treks.json> [--replace]');
    process.exit(1);
  }
  const replace = process.argv.includes('--replace');
  const abs = path.resolve(process.cwd(), fileArg);
  if (!fs.existsSync(abs)) {
    console.error('File not found:', abs);
    process.exit(1);
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (e) {
    console.error('Invalid JSON:', e.message);
    process.exit(1);
  }
  const rows = Array.isArray(raw) ? raw : raw.treks;
  if (!Array.isArray(rows)) {
    console.error('JSON must be an array of treks or { "treks": [...] }');
    process.exit(1);
  }

  await connectMongo();
  const result = await importTreks(rows, { mode: replace ? 'replace' : 'skip' });
  console.log(JSON.stringify(result, null, 2));
  await mongoose.disconnect();
  if (result.errors.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
