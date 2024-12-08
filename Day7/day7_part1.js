const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day7/day7input.txt");

const lines = adventOfCodeInput.split("\n");

function checkMath(result, terms, index, currentSum) {
  if (index == terms.length) {
    return currentSum == parseInt(result);
  }

  const term = parseInt(terms[index]);
  return (
    checkMath(result, terms, index + 1, currentSum + term) ||
    checkMath(result, terms, index + 1, currentSum * term)
  );
}

let sum = 0;

for (let line of lines) {
  let result = line.split(":")[0];
  let terms = line.split(":")[1].split(" ").slice(1);
  console.log(result, terms);

  if (checkMath(result, terms, 0, 0)) {
    sum += parseInt(result);
  }
}

console.log(sum);
