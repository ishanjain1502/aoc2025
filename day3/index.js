const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const lines = data.trim().split(/\r?\n/).filter(Boolean);
let totalJoltage = 0;
for (const line of lines) {
    const bank = line.trim();
    if (bank.length < 2) continue;

    let maxBankJoltage = 0;
    for (let i = 0; i < bank.length - 1; i++) {
      for (let j = i + 1; j < bank.length; j++) {
        const currentJoltage = parseInt(bank[i] + bank[j], 10);
        
        if (currentJoltage > maxBankJoltage) {
          maxBankJoltage = currentJoltage;
        }
        
      }
    }

    totalJoltage += maxBankJoltage;
  }

  console.log(`Total Output Joltage: ${totalJoltage}`);