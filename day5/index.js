const fs = require('fs');
const path = require('path');

function parseInput(text) {
	const lines = text.split(/\r?\n/);
	const sep = lines.findIndex(l => l.trim() === '');
	const rangesLines = sep >= 0 ? lines.slice(0, sep) : [];
	const idsLines = sep >= 0 ? lines.slice(sep + 1) : lines;

	const ranges = rangesLines
		.map(l => l.trim())
		.filter(Boolean)
		.map(l => {
			const [a, b] = l.split('-').map(s => Number(s.trim()));
			return [a, b];
		});

	const ids = idsLines.map(l => l.trim()).filter(Boolean).map(s => Number(s));

	return { ranges, ids };
}

function mergeRanges(ranges) {
	if (!ranges.length) return [];
	const sorted = ranges.slice().sort((x, y) => x[0] - y[0]);
	const out = [];
	let [curA, curB] = sorted[0];
	for (let i = 1; i < sorted.length; i++) {
		const [a, b] = sorted[i];
		if (a <= curB + 1) {
			curB = Math.max(curB, b);
		} else {
			out.push([curA, curB]);
			curA = a; curB = b;
		}
	}
	out.push([curA, curB]);
	return out;
}

function countFresh(ranges, ids) {
	const merged = mergeRanges(ranges);
	let count = 0;
	for (const id of ids) {
		for (const [a, b] of merged) {
			if (id >= a && id <= b) { count++; break; }
			if (id < a) break;
		}
	}
	return count;
}

function main() {
	const p = path.join(__dirname, 'input.txt');
	const txt = fs.readFileSync(p, 'utf8');
	const { ranges, ids } = parseInput(txt);
	const ans = countFresh(ranges, ids);
	console.log(ans);
}

if (require.main === module) main();
