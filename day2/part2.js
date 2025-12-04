const fs = require('fs');
const path = require('path');
const inputPath = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(inputPath, 'utf8').trim();
if (!data) { console.error('Empty input'); process.exit(1); }

const ranges = data.split(',').map(s => {
  const [a,b] = s.split('-');
  return [BigInt(a), BigInt(b)];
});

let maxDigits = 0;
for (const [a,b] of ranges) {
  maxDigits = Math.max(maxDigits, a.toString().length, b.toString().length);
}

const ten = 10n;
const seen = new Set();

for (let m = 1; m < maxDigits; m++) {
  const kMax = Math.floor(maxDigits / m);
  if (kMax < 2) continue; // need at least two repeats
  const start = (m === 1) ? 1n : ten ** BigInt(m - 1);
  const end = ten ** BigInt(m) - 1n;
  for (let k = 2; k <= kMax; k++) {
    const totalLen = m * k;
    if (totalLen > maxDigits) break;
    for (let t = start; t <= end; t++) {
      const block = t.toString();
      const s = block.repeat(k);
      if (s.length !== totalLen) continue;
      const n = BigInt(s);
      // Check if n falls into any range
      for (const [lo, hi] of ranges) {
        if (lo <= n && n <= hi) {
          seen.add(n.toString());
          break;
        }
      }
    }
  }
}

let total = 0n;
for (const v of seen) total += BigInt(v);
console.log(total.toString());
