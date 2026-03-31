const dns = require('dns');
const mongoose = require('mongoose');

function applySrvPublicDns(uri) {
  if (
    !uri.startsWith('mongodb+srv://') ||
    /^false|0$/i.test(String(process.env.MONGO_USE_PUBLIC_DNS || 'true').trim())
  ) {
    return;
  }
  const servers = (process.env.MONGO_DNS_SERVERS || '8.8.8.8,1.1.1.1')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  try {
    dns.setServers(servers);
    console.log(`DNS for SRV: ${servers.join(', ')}`);
  } catch (e) {
    console.warn('Could not set DNS servers:', e.message);
  }
}

async function connectMongo() {
  const uri = (process.env.MONGO_URI || '').trim();
  if (!uri) {
    throw new Error('MONGO_URI is missing in .env');
  }
  applySrvPublicDns(uri);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15_000 });
  console.log('✅ Connected to MongoDB');
}

module.exports = { connectMongo };
