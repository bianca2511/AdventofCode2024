const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("../Day9/day9input.txt");
// function parseDiskMap(diskMap) {
//   const fileMap = {};
//   const freeIndices = [];
//   let currentIndex = 0; // Tracks the current block index
//   let fileId = 0; // Tracks the current file ID

//   for (let i = 0; i < diskMap.length; i++) {
//     const length = parseInt(diskMap[i], 10);

//     if (i % 2 === 0) {
//       // File block
//       for (let j = 0; j < length; j++) {
//         fileMap[currentIndex] = fileId;
//         currentIndex++;
//       }
//       fileId++;
//     } else {
//       // Free space
//       for (let j = 0; j < length; j++) {
//         freeIndices.push(currentIndex);
//         currentIndex++;
//       }
//     }
//   }

//   return { fileMap, freeIndices };
// }

// const { fileMap, freeIndices } = parseDiskMap(adventOfCodeInput);

// // console.log("File Map:", fileMap);
// console.log("Free Indices:", freeIndices);

// const freeSpots = freeIndices.length-2;
// const entries = Object.entries(fileMap);

// const movableEntries = entries.slice(-freeSpots);

// console.log("Movabe entries", movableEntries);
// console.log(movableEntries.length);

// let checkSum = 0;

// for (let i = freeSpots - 1; i >= 0; i--) {
//   const [index, value] = movableEntries[i];
// //   console.log("pissssssss:", movableEntries[i]);
// //   console.log(value, freeIndices[freeSpots-i-1]);
// //   console.log("Checksum+= ", value,"*", freeIndices[freeSpots-i-1]);
//   checkSum += parseInt(value, 10) * freeIndices[freeSpots - i-1];
// }

// const unmovableEntries = entries.slice(0, -freeSpots);

// for ([index, value] of unmovableEntries) {
//   checkSum += parseInt(index) * value;
// //   console.log("Checksum+= ", value,"*", index);
// }

// console.log(checkSum);

function parseDiskMap(diskMap) {
  const layout = [];
  let fileId = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const length = parseInt(diskMap[i], 10);

    if (i % 2 === 0) {
      // File block
      for (let j = 0; j < length; j++) {
        layout.push(fileId);
      }
      fileId++;
    } else {
      // Free space
      for (let j = 0; j < length; j++) {
        layout.push(null); // Represent free space as `null`
      }
    }
  }

  return layout;
}

function compactAndChecksum(layout) {
  for (let i = layout.length - 1; i >= 0; i--) {
    // Find the first `null` from the start
    let index = layout.indexOf(null);
    if (index !== -1) {
      if (layout[i] != null) {
        // Move the non-null element to the first null position
        layout[index] = layout[i];
        layout[i] = -5; // Mark the moved element
      } else if (layout[i] === null) {
        // Mark nulls at the end that are skipped
        layout[i] = -5;
      }
    }
  }

  let checksum = 0;
  for (let i = 0; i < layout.length; i++) {
    if (layout[i] !== null && layout[i] !== -5) {
      checksum += i * layout[i];
    }
  }

  return { layout, checksum };
}

let layout = parseDiskMap(adventOfCodeInput);

const { layout: compactedLayout, checksum } = compactAndChecksum(layout);
console.log("Compacted Layout:", compactedLayout);
console.log("Checksum:", checksum);
