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
const maxM = Math.floor(maxDigits / 2);
const ten = 10n;
let total = 0n;
for (let m = 1; m <= maxM; m++) {
  const start = ten ** BigInt(m - 1);
  const end = ten ** BigInt(m) - 1n;
  for (let t = start; t <= end; t++) {
    const s = t.toString();
    const n = BigInt(s + s);
    for (const [lo, hi] of ranges) {
      if (lo <= n && n <= hi) {
        total += n;
        break;
      }
    }
  }
}
console.log(total.toString());
