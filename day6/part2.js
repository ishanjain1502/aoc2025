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
    while (c < cols && blankCol(c)) c++;
    if (c >= cols) break;
    const start = c;
    while (c < cols && !blankCol(c)) c++;
    const end = c - 1;
    ranges.push([start, end]);
  }
  return ranges;
}

function extractOperator(paddedLines, range) {
  const bottom = paddedLines.length - 1;
  const [c0, c1] = range;
  for (let c = c0; c <= c1; c++) {
    const ch = paddedLines[bottom][c];
    if (ch !== ' ') return ch;
  }
  return '+';
}

function extractNumbersFromColumns(paddedLines, range) {
  const bottom = paddedLines.length - 1; // operator row
  const [c0, c1] = range;
  const numbers = [];
  // iterate columns right-to-left
  for (let c = c1; c >= c0; c--) {
    let s = '';
    for (let r = 0; r < bottom; r++) {
      const ch = paddedLines[r][c];
      if (ch !== ' ') s += ch;
    }
    if (s !== '') {
      // s is string of digits from top (most significant) to bottom
      numbers.push(BigInt(s));
    }
  }
  return numbers;
}

function evalProblem(numbers, op) {
  if (op === '+') return numbers.reduce((a, b) => a + b, 0n);
  return numbers.reduce((a, b) => a * b, 1n);
}

function main() {
  const p = path.join(__dirname, 'input.txt');
  const lines = readLines(p);
  if (lines.length === 0) { console.log('0'); return; }
  const padded = padLines(lines);
  const ranges = findProblemRanges(padded);
  let grand = 0n;
  for (const range of ranges) {
    const op = extractOperator(padded, range);
    const nums = extractNumbersFromColumns(padded, range);
    const val = evalProblem(nums, op);
    grand += val;
  }
  console.log(grand.toString());
}

if (require.main === module) main();
