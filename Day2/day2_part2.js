const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day2/day2input.txt");

function isReportSafe(array) {
  let safety = true;
  let order;

  for (let i = 0; i < array.length - 1 && safety == true; i++) {
    if (
      Math.abs(array[i] - array[i + 1]) < 1 ||
      Math.abs(array[i] - array[i + 1]) > 3
    ) {
      return false;
    }
  }

  if (array[0] < array[1]) {
    order = true; //array should be increasing
  } else {
    order = false; //array should be decreasing
  }

  for (let i = 1; i < array.length - 1; i++) {
    if (array[i] < array[i + 1] && order == false) {
      return false;
    } else if (array[i] > array[i + 1] && order == true) {
      return false;
    }
  }

  return true;
}

function canBeSafeWithOneRemoval(array) {
    for (let i = 0; i < array.length; i++) {

      //create a new array excluding the level at index `i`
      const modifiedArray = array.slice(0, i).concat(array.slice(i + 1));
  
      //check if the new array is safe
      if (isReportSafe(modifiedArray)) {
        return true;
      }
    }
}

let safe = 0;

if (adventOfCodeInput) {
  const lines = adventOfCodeInput.split("\n");

  for (let line of lines) {
    let array = line.split(" ").map(Number); //converts the whole array to numbers
    if(canBeSafeWithOneRemoval(array)) {
        safe++;
    }
  }
}

console.log(safe);
