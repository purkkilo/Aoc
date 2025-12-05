const { readFileSync } = require("fs");
let isTest = 0;
let testCase = 1;
let path;
// JS implementation because my go skills are still thrash
// If test = 1 === true, select test_txt, otherwise use actual txt
isTest ? (path = `test${testCase}.txt`) : (path = "input.txt");
const input = readFileSync(path, "utf8");

P1(input);
P2(input);

function P1(input) {
  const disk = input.split("").map((_, i) => {
    const n = input[i];
    const isFile = i % 2 == 0;
    const fileId = isFile ? i / 2 : ".";
    return [fileId, parseInt(n)];
  });
  let fileIndex = getNextFileIndex(disk);
  let currentFile = disk[fileIndex];

  for (let i = 0; i < disk.length; ) {
    // if  i >= fileIndex, no more space to fill
    if (i >= fileIndex) break;

    const [id, length] = disk[i];
    // Already a file, move on
    if (id !== ".") {
      i++;
      continue;
    }

    // If empty, move to next
    if (currentFile[1] == 0) {
      fileIndex = getNextFileIndex(disk);
      currentFile = disk[fileIndex];
    }

    const [fileId, fileLength] = currentFile;
    // Fill the space
    // if more file than space, fill the space and move to next
    if (fileLength >= length) {
      disk[i] = [fileId, length];
      currentFile[1] = fileLength - length;
      i++;
    }
    // more space than file
    else {
      // fill the space
      disk[i] = [id, length - fileLength];
      // file empty, will be replaced on next round
      currentFile[1] = 0;
      // move space
      disk.splice(i, 0, [fileId, fileLength]);
    }
  }

  console.log("P1", getChecksum(disk));
}

function P2(input) {
  const disk = input.split("").map((_, i) => {
    const n = input[i];
    const isFile = i % 2 == 0;
    const fileId = isFile ? i / 2 : ".";
    return [fileId, parseInt(n)];
  });
  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i][0] == ".") continue;
    // Block to move
    const [blockId, space] = disk[i];
    const foundPosition = findAvailableSpace(disk, space, i);
    if (foundPosition == -1) continue;

    disk[i] = [".", space];
    disk[foundPosition][1] -= space;
    disk.splice(foundPosition, 0, [blockId, space]);
  }

  console.log("P2", getChecksum(disk));
}

// Return index if space found, if not, return -1
function findAvailableSpace(disk, space, index) {
  for (let i = 0; i < index; i++) {
    const [id, length] = disk[i];
    if (id == "." && length >= space) return i;
  }
  return -1;
}

// Get file from the end
function getNextFileIndex(disk) {
  let fileIndex = disk.length - 1;
  let currentFile = disk[fileIndex];
  //return the first block that is not free space and not empty
  while (currentFile[0] == "." || currentFile[1] == 0) {
    fileIndex--;
    currentFile = disk[fileIndex];
  }
  return fileIndex;
}

function getChecksum(disk) {
  let sum = 0;
  let place = 0;
  for (let i = 0; i < disk.length; i++) {
    const [fileId, length] = disk[i];
    if (fileId === "." || length <= 0) {
      place += length;
      continue;
    }
    // Go through the block and add the sum
    for (let j = 0; j < length; j++) {
      sum += fileId * place;
      place++;
    }
  }
  return sum;
}

function test(compactDisk, checksum, testCase) {
  console.log("--------TESTING--------");
  console.log(compactDisk, checksum);
  if (testCase === 1) {
    console.log(test2, 1928);
    console.log(compactDisk === test2, checksum === 1928);
  } else {
    console.log(test1, 60);
    console.log(compactDisk === test1, checksum === 60);
  }
}
