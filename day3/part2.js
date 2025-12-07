const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = data.trim().split(/\r?\n/).filter(Boolean);

let totalJoltage = 0;

for (const line of lines) {
  const bank = line.trim();
  if (bank.length < 12) continue;

  let selectedDigits = '';
  let currentPos = 0;
  let remaining = 12;

  while (remaining > 0) {
    const canSkip = bank.length - currentPos - remaining;
    let maxDigit = -1;
    let maxPos = -1;
    
    for (let i = currentPos; i <= currentPos + canSkip; i++) {
      if (parseInt(bank[i]) > maxDigit) {
        maxDigit = parseInt(bank[i]);
        maxPos = i;
      }
    }
    
    selectedDigits += bank[maxPos];
    currentPos = maxPos + 1;
    remaining--;
  }
  
  const maxBankJoltage = parseInt(selectedDigits, 10);
  totalJoltage += maxBankJoltage;
}

console.log(`Total Output Joltage: ${totalJoltage}`);
