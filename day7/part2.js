const fs = require('fs');
const path = require('path');

function readGrid(p) {
  const txt = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const lines = txt.split('\n');
  return lines.map(l => l.replace(/\r/g, ''));
}

function findStart(grid) {
  for (let r = 0; r < grid.length; r++) {
    const c = grid[r].indexOf('S');
    if (c >= 0) return [r, c];
  }
  return null;
}

function countTimelines(grid) {
  const R = grid.length;
  if (R === 0) return 0n;
  const C = Math.max(...grid.map(l => l.length));
  const mat = grid.map(l => (l + '.'.repeat(C)).slice(0, C).split(''));

  const start = findStart(grid);
  if (!start) return 0n;
  const [rS, cS] = start;
  const sr = rS + 1;
  const sc = cS;

  const memo = new Map();

  function key(r, c) { return r + ',' + c; }

  function dp(r, c) {
    // if out of bounds, timeline exits (count 1)
    if (r < 0 || r >= R || c < 0 || c >= C) return 1n;
    const k = key(r, c);
    if (memo.has(k)) return memo.get(k);
    const cell = mat[r][c];
    let res = 0n;
    if (cell === '^') {
      // splitter: particle chooses left or right (many-worlds branching)
      res = dp(r, c - 1) + dp(r, c + 1);
    } else {
      // normal: goes down
      res = dp(r + 1, c);
    }
    memo.set(k, res);
    return res;
  }

  return dp(sr, sc);
}

function main() {
  const p = path.join(__dirname, 'input.txt');
  const grid = readGrid(p);
  const ans = countTimelines(grid);
  console.log(ans.toString());
}

if (require.main === module) main();
