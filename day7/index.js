const fs = require('fs');
const path = require('path');

function readGrid(p) {
  const txt = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const lines = txt.split('\n').filter(l => l.length > 0 || true);
  return lines.map(l => l.replace(/\r/g, ''));
}

function findStart(grid) {
  for (let r = 0; r < grid.length; r++) {
    const c = grid[r].indexOf('S');
    if (c >= 0) return [r, c];
  }
  return null;
}

function simulate(grid) {
  const R = grid.length;
  const C = Math.max(...grid.map(l => l.length));
  // normalize line lengths with '.' beyond end
  const mat = grid.map(l => (l + '.'.repeat(C)).slice(0, C).split(''));

  const start = findStart(grid);
  if (!start) return 0;
  let [rS, cS] = start;

  const q = [];
  const visited = new Set();
  const key = (r, c) => `${r},${c}`;
  // enqueue helper marks visited immediately to avoid duplicates
  const enqueue = (r, c) => {
    if (r < 0 || r >= R || c < 0 || c >= C) return;
    const k = key(r, c);
    if (visited.has(k)) return;
    visited.add(k);
    q.push([r, c]);
  };

  enqueue(rS + 1, cS);

  let qi = 0;
  let splits = 0;

  while (qi < q.length) {
    const [r, c] = q[qi++];
    const cell = mat[r][c];
    if (cell === '^') {
      splits++;
      enqueue(r, c - 1);
      enqueue(r, c + 1);
    } else {
      enqueue(r + 1, c);
    }
  }

  return splits;
}

function main() {
  const p = path.join(__dirname, 'input.txt');
  const grid = readGrid(p);
  const splits = simulate(grid);
  console.log(splits);
}

if (require.main === module) main();
