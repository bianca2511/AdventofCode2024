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

let map = new Map();

for(let i=0; i<list1.length; i++) {
    if(map.get(list1[i])== null) {
        map.set(list1[i],0);
        let frequency = 0; //frequency of list1[i] in list2
        for(let j=0; j<list2.length; j++) {
            if(list2[j] == list1[i]) {
                frequency++;
            }
        }

        map.set(list1[i], frequency);

    } else {
        continue;
    }
}

let sum = 0; // add up the simiarity scores
for (let [key, value] of map.entries()) {
    sum += key * value;
}

console.log(sum);