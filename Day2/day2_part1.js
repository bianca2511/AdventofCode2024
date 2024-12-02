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


let safe = 0;

if (adventOfCodeInput) {
  // Split the content by newline to get an array of lines
  const lines = adventOfCodeInput.split("\n");

  for (let line of lines) {
    let array = line.split(' ').map(Number); //converts the whole array to numbers
    // let array2 = line.split(' '); //keeps the numbers as strings
    // let array3 = parseInt(line.split(' ')); //parseInt only expects 1 elements, not a whole array

    let safety = true;
    let order;

    for (let i = 0; i < array.length - 1 && safety ==true; i++) {
        if (
          Math.abs(array[i] - array[i + 1]) < 1 ||
          Math.abs(array[i] - array[i + 1]) > 3
        ) {
          safety = false;
          break;
        }
      }

    if (array[0] < array[1]) {
      order = true; //array should be increasing
    } else {
      order = false; //array should be decreasing
    }

    for (let i = 1; i < array.length - 1; i++) {
      if (array[i] < array[i + 1] && order == false) {
        safety = false;
        break;
      } else if (array[i] > array[i + 1] && order == true) {
        safety = false;
        break;
      }
    }

    if (safety == true) {
      safe++;
    }
  }
}

console.log(safe);
