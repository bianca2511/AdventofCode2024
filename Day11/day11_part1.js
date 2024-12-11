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
  let idx=0;
  for (let i = 0; i < blink; i++) {
    let newStones = [];
    for (let stone of stones) {
      if (stone == "0") {
        newStones.push("1");
      } else if (stone.length % 2 == 0) {
        let stone1 = stone.slice(0, stone.length / 2);
        let stone2 = BigInt(
          stone.slice(stone.length / 2, stone.length)
        ).toString();
        newStones.push(stone1, stone2);
      } else {
        let newStone = (BigInt(stone) * 2024n).toString();
        newStones.push(newStone);
      }
    }
    stones = newStones;
    console.log("piss", idx);
    idx++;
  }

  return stones.length;
}

let sum = blinky(stones, 75);

console.log(sum);