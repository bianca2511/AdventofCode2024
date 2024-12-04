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
const matrix = adventOfCodeInput.split("\n").map((row) => row.split(""));
const len = matrix.length;
let xmas = 0;

for (let i = 1; i < len-1; i++) {
  for (let j = 1; j< len-1; j++) {
    if (matrix[i][j] == "A") {
      if (
        ((matrix[i - 1][j - 1] == "M" && matrix[i + 1][j + 1] == "S") ||
          (matrix[i - 1][j - 1] == "S" && matrix[i + 1][j + 1] == "M")) &&
        ((matrix[i - 1][j + 1] == "M" && matrix[i + 1][j - 1] == "S") ||
          (matrix[i - 1][j + 1] == "S" && matrix[i + 1][j - 1] == "M"))
      ) {
        xmas++;
      }
    }
  }
}
console.log(xmas);
