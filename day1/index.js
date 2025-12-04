const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').trim().split(/\r?\n/);

let pos = 50;
let count = 0;

for (const line of data) {
	if (!line) continue;
	const dir = line[0];
	const n = parseInt(line.slice(1), 10);
	if (dir === 'R') {
		pos = (pos + n) % 100;
	} else {
		pos = ((pos - n) % 100 + 100) % 100;
	}
	if (pos === 0) count++;
}

console.log(count);

