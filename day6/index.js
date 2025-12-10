const fs = require('fs');
const path = require('path');

function readLines(p) {
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').split('\n');
}

function padLines(lines) {
  const max = Math.max(...lines.map(l => l.length));
  return lines.map(l => l + ' '.repeat(max - l.length));
}

function findProblemRanges(paddedLines) {
  const rows = paddedLines.length;
  const cols = paddedLines[0].length;
  const blankCol = (c) => {
    for (let r = 0; r < rows; r++) if (paddedLines[r][c] !== ' ') return false;
    return true;
  };

  const ranges = [];
  let c = 0;
  while (c < cols) {
    // skip blank columns
    while (c < cols && blankCol(c)) c++;
    if (c >= cols) break;
    const start = c;
    while (c < cols && !blankCol(c)) c++;
    const end = c - 1;
    ranges.push([start, end]);
  }
  return ranges;
}

function extractProblem(paddedLines, range) {
  const [c0, c1] = range;
  const rows = paddedLines.length;
  const parts = [];
  for (let r = 0; r < rows; r++) {
    const s = paddedLines[r].slice(c0, c1 + 1).trim();
    parts.push(s);
  }
  // last non-empty is operator, preceding non-empty rows are numbers
  let op = null;
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] !== '') { op = parts[i]; parts.splice(i, 1); break; }
  }
  const numbers = parts.filter(s => s !== '').map(s => BigInt(s));
  const operator = op ? op.trim()[0] : '+';
  return { numbers, operator };
}

function evalProblem(problem) {
  const { numbers, operator } = problem;
  if (operator === '+') {
    return numbers.reduce((a, b) => a + b, 0n);
  }
  // default to multiplication for '*'
  return numbers.reduce((a, b) => a * b, 1n);
}

function main() {
  const p = path.join(__dirname, 'input.txt');
  const lines = readLines(p);
  if (lines.length === 0) { console.log('0'); return; }
  const padded = padLines(lines);
  const ranges = findProblemRanges(padded);
  let grand = 0n;
  for (const r of ranges) {
    const prob = extractProblem(padded, r);
    const val = evalProblem(prob);
    grand += val;
  }
  console.log(grand.toString());
}

if (require.main === module) main();
