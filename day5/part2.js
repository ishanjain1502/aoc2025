const fs = require('fs');
const path = require('path');

function parseRanges(text) {
	const lines = text.split(/\r?\n/);
	const sep = lines.findIndex(l => l.trim() === '');
	const rangesLines = sep >= 0 ? lines.slice(0, sep) : lines;
	return rangesLines.map(l => l.trim()).filter(Boolean).map(l => {
		const [a, b] = l.split('-').map(s => s.trim());
		return [BigInt(a), BigInt(b)];
	});
}

function mergeRanges(ranges) {
	if (!ranges.length) return [];
	const sorted = ranges.slice().sort((x, y) => (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0));
	const out = [];
	let [curA, curB] = sorted[0];
	for (let i = 1; i < sorted.length; i++) {
		const [a, b] = sorted[i];
		if (a <= curB + 1n) {
			curB = curB > b ? curB : b;
		} else {
			out.push([curA, curB]);
			curA = a; curB = b;
		}
	}
	out.push([curA, curB]);
	return out;
}

function totalCovered(ranges) {
	const merged = mergeRanges(ranges);
	let total = 0n;
	for (const [a, b] of merged) {
		total += (b - a + 1n);
	}
	return total;
}

function main() {
	const p = path.join(__dirname, 'input.txt');
	const txt = fs.readFileSync(p, 'utf8');
	const ranges = parseRanges(txt);
	const total = totalCovered(ranges);
	console.log(total.toString());
}

if (require.main === module) main();
