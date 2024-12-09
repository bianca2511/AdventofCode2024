'use strict';

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
 * @param {bigint} result
 * @param {string | any[]} terms
 * @param {number} index
 * @param {bigint} currentSum
 * @returns {boolean}
 */

function checkMath(result, terms, index, currentSum) {
  if (index === terms.length) {
    return currentSum === result;
  }

  if (currentSum > result) {
    return false;
  }

  const term = terms[index];
  const termString = term.toString();
  return (
    checkMath(
      result,
      terms,
      index + 1,
      BigInt(currentSum.toString() + termString)
    ) ||
    checkMath(result, terms, index + 1, currentSum + term) ||
    checkMath(result, terms, index + 1, currentSum * term)
  );
}

let sum = 0n;

for (let line of lines) {
  let result = BigInt(line.split(":")[0]);
  let terms = line
    .split(":")[1]
    .split(" ")
    .slice(1)
    .map((element) => BigInt(element));

  if (checkMath(result, terms, 1, terms[0])) {
    sum += BigInt(result);
    // console.log(result);
  }
}

console.log(sum);
