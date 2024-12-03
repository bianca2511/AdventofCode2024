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
const betweenDosAndDonts = /don't\(\).*do\(\)/g;

function getMults(string) {
  const instructions = string.matchAll(mulInstructions);
  let multiply = 0;

  for (let instruction of instructions) {
    multiply += parseInt(instruction[1]) * parseInt(instruction[2]);
  }
  return multiply;
}

let totalSum = getMults(adventOfCodeInput);

const forbiddenInstructions = adventOfCodeInput.matchAll(betweenDosAndDonts);

let forbiddenSum = 0;
array = Array.from(forbiddenInstructions);

for (let instruction of array) {
  console.log(instruction[0],'\n\n\n');
  forbiddenSum += getMults(instruction[0]);
  //   console.log("Mul:", getMults(instruction[0]));
}

let goodSum = totalSum - forbiddenSum;
console.log(goodSum);
