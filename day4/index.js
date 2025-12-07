const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = data.trim().split(/\r?\n/).filter(Boolean);

const rows = lines.length;
const cols = lines[0].length;

let accessible = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (lines[r][c] !== '@') continue;
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        if (lines[nr][nc] === '@') count++;
      }
    }
    if (count < 4) accessible++;
  }
}

console.log(accessible);
