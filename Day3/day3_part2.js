const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day3/day3input.txt");
const mulInstructions = /mul\(([0-9]+),([0-9]+)\)/;
const doInstruction = /do\(\)/;
const dontInstruction = /don't\(\)/;

let mulEnabled = true; // enabled
let totalSum = 0;
const tokens = adventOfCodeInput.match(/mul\([^\)]+\)|do\(\)|don't\(\)/g);
console.log(tokens);

for (let token of tokens) {
  if (token.startsWith("mul(")) {
    if (mulEnabled) {
      const match = token.match(mulInstructions);
      if (match) {
        console.log(match, match[1], match[2]);
        totalSum += match[1] * match[2];
      }
    }
  } else if (doInstruction.test(token)) {
    mulEnabled = true;
  } else if (dontInstruction.test(token)) {
    mulEnabled = false;
  }
}

console.log("Final sum:", totalSum);
