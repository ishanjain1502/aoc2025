const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = data.trim().split(/\r?\n/).filter(Boolean);

let pos = 50;
let zeros = 0;

for (const line of lines) {
	const dir = line[0];
	const dist = parseInt(line.slice(1), 10);
	if (isNaN(dist) || dist <= 0) {
		// still update position for zero or negative (none expected)
		if (dir === 'R') pos = (pos + (dist || 0)) % 100;
		else pos = ((pos - (dist || 0)) % 100 + 100) % 100;
		continue;
	}
	let first_k = 0;
	if (dir === 'R') first_k = (100 - pos) % 100;
	else first_k = pos % 100;
	if (first_k === 0) first_k = 100;

	if (first_k <= dist) {
		zeros += 1 + Math.floor((dist - first_k) / 100);
	}

	// Update position after the rotation
	if (dir === 'R') pos = (pos + dist) % 100;
	else pos = ((pos - dist) % 100 + 100) % 100;
}

console.log(zeros);
