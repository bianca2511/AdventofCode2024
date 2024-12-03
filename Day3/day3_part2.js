const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

let adventOfCodeInput = readFile("../Day3/day3input.txt");
adventOfCodeInput = adventOfCodeInput.split("\n").join(" ");
const mulInstructions = /mul\(([0-9]+),([0-9]+)\)/;
const doInstruction = /do\(\)/;
const dontInstruction = /don't\(\)/;

let mulEnabled = true; // enabled
let totalSum = 0;
const tokens = adventOfCodeInput.match(/do\(\)|don't\(\)|mul\(([0-9]+),([0-9]+)\)/g);
console.log(tokens.length);

for (let token of tokens) {
  if (token == "don't()") {
    mulEnabled = false;
  } else if (token == "do()") {
    mulEnabled = true;
  } else if (token.startsWith("mul(")) {
    if (mulEnabled) {
      const match = token.match(mulInstructions);
      if (match) {
        console.log(match[1], match[2]);
        totalSum += match[1] * match[2];
      }
    }
  }
}

console.log("Final sum:", totalSum);