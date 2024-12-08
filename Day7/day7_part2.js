const fs = require("fs");

/**
 * @param {fs.PathOrFileDescriptor} filePath
 * @returns {string}
 */
function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    // @ts-ignore
    console.error(`Got an error trying to read the file: ${error.message}`);
    return "";
  }
}

const adventOfCodeInput = readFile("../Day7/day7input.txt");

const lines = adventOfCodeInput.split("\n");

/**
 * @param {string | bigint} result
 * @param {string | any[]} terms
 * @param {number} index
 * @param {bigint} currentSum
 * @returns {boolean}
 */
function checkMath(result, terms, index, currentSum) {
  if (index == terms.length) {
    return currentSum == BigInt(result);
  }

  const term = terms[index];
  const concatValue = BigInt(currentSum + term);
  if (checkMath(result, terms, index + 1, concatValue)) {
    return true;
  }

  if (checkMath(result, terms, index + 1, currentSum + BigInt(term))) {
    return true;
  }

  if (checkMath(result, terms, index + 1, currentSum * BigInt(term))) {
    return true;
  }

  return false;
}

let sum = 0n;

for (let line of lines) {
  let result = line.split(":")[0];
  let terms = line.split(":")[1].split(" ").slice(1);
  //   console.log(result, terms);

  if (checkMath(result, terms, 0, 0n)) {
    sum += BigInt(result);
    // console.log(result);
  }
}

console.log(sum);
