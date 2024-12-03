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

const mulInstructions = /mul\(([0-9]+),([0-9]+)\)/g;
const instructions = adventOfCodeInput.matchAll(mulInstructions);


let multiply = 0;
for (let instruction of instructions) {
  multiply +=
    parseInt(instruction[1]) *
    parseInt(instruction[2]);
}

console.log(multiply);
