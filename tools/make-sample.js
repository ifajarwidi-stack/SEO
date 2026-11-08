// Membuat dashboard/security-daily.json (DATA CONTOH sintetis) sesuai docs/jago-security-data-contract.md
// Pakai: node tools/make-sample.js
const fs = require('fs');
const path = require('path');

let seed = 20261108;
const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

const categories = [
  { id: 'bot_scanner', label: 'Bot & Scanner' },
  { id: 'ddos_l7', label: 'DDoS L7 / Rate Limit' },
  { id: 'sqli', label: 'SQL Injection' },
  { id: 'xss', label: 'XSS' },
  { id: 'path_trav', label: 'Path Traversal (LFI/RFI)' },
  { id: 'rce', label: 'RCE / Command Injection' },
];
const base = [1800, 700, 320, 240, 150, 70];
const growth = [0.25, 0.45, 0.20, 0.10, 0.05, 0.35];

const N = 730;
const last = process.env.SAMPLE_END || '2026-11-08';
const end = new Date(last + 'T00:00:00Z');
const spikes = categories.map(() => ({ len: 0, mult: 1 }));
const days = [];
for (let i = 0; i < N; i++) {
  const d = new Date(end.getTime() - (N - 1 - i) * 86400000);
  const dow = d.getUTCDay();
  const weekday = dow === 0 || dow === 6 ? 0.78 : 1.0;
  const blocked = {};
  categories.forEach((c, k) => {
    if (spikes[k].len <= 0 && rnd() < 0.012) spikes[k] = { len: 2 + Math.floor(rnd() * 4), mult: 1.5 + rnd() * 1.2 };
    const sp = spikes[k].len > 0 ? spikes[k].mult : 1;
    spikes[k].len--;
    const trend = 1 + growth[k] * (i / N);
    const season = 1 + 0.08 * Math.sin((i / 365) * 2 * Math.PI + k);
    blocked[c.id] = Math.max(1, Math.round(base[k] * trend * season * weekday * sp * (1 + 0.09 * gauss())));
  });
  const total = Object.values(blocked).reduce((a, b) => a + b, 0);
  const bad = Math.round(total * Math.min(0.6, Math.max(0.2, 0.33 + 0.05 * (i / N) + 0.025 * gauss())));
  days.push({ date: d.toISOString().slice(0, 10), blocked, bad_ip: bad, complete: true });
}
days[N - 1].complete = false; // hari berjalan

// invarian dari kontrak bagian 2
days.forEach((d, i) => {
  const tot = Object.values(d.blocked).reduce((a, b) => a + b, 0);
  if (d.bad_ip > tot) throw new Error('bad_ip > total pada ' + d.date);
  if (i && (new Date(d.date) - new Date(days[i - 1].date)) !== 86400000) throw new Error('celah tanggal pada ' + d.date);
});
if (days.length < 720) throw new Error('kurang dari 720 hari');

const out = {
  schema_version: 1,
  generated_at: process.env.SAMPLE_GENERATED || '2026-11-08T05:00:03Z',
  timezone: 'Asia/Jakarta',
  is_sample: true,
  categories,
  days,
};
const file = path.join(__dirname, '..', 'dashboard', 'security-daily.json');
fs.writeFileSync(file, JSON.stringify(out));
console.log('ok:', days.length, 'hari ->', path.relative(process.cwd(), file));
