const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
if (!data) {
  console.error('Empty input');
  process.exit(1);
}

const lines = data.trim().split(/\r?\n/);
const rows = lines.length;
const grid = lines.map(line => line.split(''));

let totalRemoved = 0;
let round = 0;

while (true) {
  const toRemove = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== '@') continue;
      let neighbors = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr < 0 || nr >= rows) continue;
          if (nc < 0 || nc >= grid[nr].length) continue;
          if (grid[nr][nc] === '@') neighbors++;
        }
      }
      if (neighbors < 4) toRemove.push([r, c]);
    }
  }

  if (toRemove.length === 0) break;

  // Remove simultaneously
  for (const [r, c] of toRemove) {
    if (grid[r][c] === '@') {
      grid[r][c] = '.';
      totalRemoved++;
    }
  }

  round++;
}

console.log(totalRemoved);
