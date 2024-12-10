const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day10/day10input.txt");

let lines = adventOfCodeInput.split("\n");
let map = [];
for (let line of lines) {
  let row = [];
  for (let character of line) {
    if (character == ".") {
      row.push(-10);
    } else {
      row.push(parseInt(character));
    }
  }
  map.push(row);
}

const numRows = map.length;
const numCols = map[0].length;

class Direction {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let directions = [
  new Direction(0, 1), // down
  new Direction(1, 0), // right
  new Direction(-1, 0), // left
  new Direction(0, -1), // up
];


function findTrailheads(indexX, indexY, visited = new Set()) {
  let current = map[indexX][indexY];

  if (current == 9) {
    visited.add([indexX,indexY]);
    return visited;
  }

  for (let dir of directions) {
    let newX = indexX + dir.x;
    let newY = indexY + dir.y;

    // Check bounds and whether the next step is valid
    if (
      newX >= 0 &&
      newX < numRows &&
      newY >= 0 &&
      newY < numCols &&
      map[newX][newY] === current + 1
    ) {
      // Continue the trail, passing along the visited set
      findTrailheads(newX, newY, visited);
    }
  }

  return visited; // Return the set of distinct reachable ends
}

let totalScore = 0;

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (map[i][j] === 0) {
      let reachableEnds = findTrailheads(i, j);
      console.log(reachableEnds);
      totalScore += reachableEnds.size; 
    }
  }
}

console.log("Score:", totalScore);
