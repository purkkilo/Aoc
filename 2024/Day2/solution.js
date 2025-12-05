const { readFileSync } = require("fs");
let isTest = 0;
let path;
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
const lines = input.split("\n").map((l) => l.trim());
let safeCount = 0;
let dampenedSafeCount = 0;

for (const l of lines) {
  let levels = l.split(" ").map(Number);
  if (checkIfSafe(levels)) {
    safeCount++;
    dampenedSafeCount++;
    continue;
  }

  for (let i = 0; i < levels.length; i++) {
    // Drop each level one at a time and try again
    const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (checkIfSafe(newLevels)) {
      dampenedSafeCount++;
      break;
    }
  }
}

console.log("Safe count: ", safeCount);
console.log("Safe count with dampness: ", dampenedSafeCount);

function checkIfSafe(levels) {
  const isAscending = checkSorted(levels, true);
  const isDescending = checkSorted(levels, false);
  const sorted = isAscending || isDescending;

  if (!sorted) return false;

  for (let i = 1; i < levels.length; i++) {
    const diff = Math.abs(levels[i] - levels[i - 1]);
    // If diff < 1 or diff > 3, not safe
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
}

function checkSorted(arr, isAscending) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (isAscending) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    } else {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
  }
  return true;
}
