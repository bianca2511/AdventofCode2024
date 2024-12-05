const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day5/day5input.txt");

const lines = adventOfCodeInput.split("\n");
console.log(lines);

const emptyLineIndex = lines.findIndex((line) => line == "");

const part1 = lines.slice(0, emptyLineIndex); // Lines before the empty line
const part2 = lines.slice(emptyLineIndex + 1); // Lines after the empty line

const updateOrder = part1.map((line) => {
  const [a, b] = line.split("|").map(Number);
  return { a, b };
});

const newUpdates = part2.map((line) => line.split(",").map(Number));

console.log("Update order rules: ", updateOrder);
console.log("Updates list: ", newUpdates);

function isUpdateInOrder(update, rules) {
  for (let { a, b } of rules) {
    const indexA = update.indexOf(a);
    const indexB = update.indexOf(b);

    if (indexA !== -1 && indexB !== -1 && indexA > indexB) {
      return false;
    }
  }
  return true;
}
let count = 0;
for (let update of newUpdates) {
  if (isUpdateInOrder(update, updateOrder)) {
    const middleIndex = Math.floor(update.length / 2);
    count += update[middleIndex];
  }
}

console.log(count);
