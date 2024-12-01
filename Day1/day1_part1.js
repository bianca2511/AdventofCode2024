const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day1/day1input.txt");

let list1 = [];
let list2 = [];

if (adventOfCodeInput) {
  // Split the content by newline to get an array of lines
  const lines = adventOfCodeInput.split("\n");

  for (let line of lines) {
    let parts = line.split(/\s+/); //Split line based on spaces and store the parts
    list1.push(parseInt(parts[0]));
    list2.push(parseInt(parts[1]));
  }
}

list1.sort();
list2.sort();

// For each position in the list, calculate difference
let sum = 0;
for (let i = 0; i < list1.length; i++) {
  sum += Math.abs(list1[i] - list2[i]);
}

console.log(sum);
