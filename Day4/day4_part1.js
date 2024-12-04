const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day4/day4input.txt");
const xmas = /(?=(XMAS))|(?=(SAMX))/g; //positive lookahead makes it work with overlap
let horizontalCount = 0;

let horizontal = adventOfCodeInput.matchAll(xmas);

for (let _ of horizontal) {
  horizontalCount++;
}
console.log("Horizontal: ", horizontalCount);

const matrix = adventOfCodeInput.split("\n").map((row) => row.split(""));

let len = matrix.length;
let verticalCount = 0;

for (let j = 0; j < len; j++) {
  for (let i = 0; i < len - 3; i++) {
    if (
      (matrix[i][j] == "X" &&
        matrix[i + 1][j] == "M" &&
        matrix[i + 2][j] == "A" &&
        matrix[i + 3][j] == "S") ||
      (matrix[i][j] == "S" &&
        matrix[i + 1][j] == "A" &&
        matrix[i + 2][j] == "M" &&
        matrix[i + 3][j] == "X")
    ) {
      verticalCount++;
    }
  }
}
console.log("Vertical: ", verticalCount);

let diagonalCount = 0;

for (let i = 0; i < len - 3; i++) {
  for (let j = 0; j < len - 3; j++) {
    if (
      (matrix[i][j] == "X" &&
        matrix[i + 1][j + 1] == "M" &&
        matrix[i + 2][j + 2] == "A" &&
        matrix[i + 3][j + 3] == "S") ||
      (matrix[i][j] == "S" &&
        matrix[i + 1][j + 1] == "A" &&
        matrix[i + 2][j + 2] == "M" &&
        matrix[i + 3][j + 3] == "X")
    ) {
      diagonalCount++;
    }
  }
}

for (let i = 3; i < len; i++) {
  for (let j = 0; j < len - 3; j++) {
    if (
      (matrix[i][j] == "X" &&
        matrix[i - 1][j + 1] == "M" &&
        matrix[i - 2][j + 2] == "A" &&
        matrix[i - 3][j + 3] == "S") ||
      (matrix[i][j] == "S" &&
        matrix[i - 1][j + 1] == "A" &&
        matrix[i - 2][j + 2] == "M" &&
        matrix[i - 3][j + 3] == "X")
    ) {
      diagonalCount++;
    }
  }
}

console.log("Diagonal: ", diagonalCount);

let totalCount = horizontalCount +verticalCount +diagonalCount;
console.log("Total count: ", totalCount);
