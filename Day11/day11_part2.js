const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day11/day11input.txt");

let stones = adventOfCodeInput.split(" ");
console.log(stones);

function blinky(stones, blink) {
  let stoneCounts = new Map();

  // Initialize the stone counts
  for (let stone of stones) {
    stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
  }

  for (let i = 0; i < blink; i++) {
    let newStoneCounts = new Map();

    for (let [stone, count] of stoneCounts.entries()) {
      if (stone === "0") {
        newStoneCounts.set("1", (newStoneCounts.get("1") || 0) + count);
      } else if (stone.length % 2 === 0) {
        let stone1 = stone.slice(0, stone.length / 2);
        let stone2 = BigInt(stone.slice(stone.length / 2)).toString();

        newStoneCounts.set(stone1, (newStoneCounts.get(stone1) || 0) + count);
        newStoneCounts.set(stone2, (newStoneCounts.get(stone2) || 0) + count);
      } else {
        let newStone = (BigInt(stone) * 2024n).toString();
        newStoneCounts.set(newStone, (newStoneCounts.get(newStone) || 0) + count);
      }
    }

    stoneCounts = newStoneCounts;
    console.log("Iteration:", i + 1);
  }

  // Sum up all the stone counts
  let totalStones = 0;
  for (let count of stoneCounts.values()) {
    totalStones += count;
  }

  return totalStones;
}

let sum = blinky(stones, 75);

console.log(sum);
