const { readFileSync } = require("fs");
let isTest = 0;
let path;
// JS implementation because my go skills are still thrash
// If test = 1 === true, select test_txt, otherwise use actual txt
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
let lines = input.split("\n").map((l) => l.trim());
let guardPosition = {
  y: lines.findIndex((l) => l.includes("^")),
  x: lines[lines.findIndex((l) => l.includes("^"))].indexOf("^"),
};
let p1 = 0;
let p2 = 0;

lines = lines.map((l) => l.split(""));
let rows = [...lines];

let initialPosition = { ...guardPosition };
let direction = "UP";
let positions = [];
let isGuardVisible = true;
while (isGuardVisible) {
  isGuardVisible = isMovablePosition(rows, -1, -1);
}
rows.forEach((line) => {
  p1 += line.filter((c) => c === "X").length;
});
console.log("p1:", p1);

// Test every position, slow as hell but works
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    // Just some progress printing
    /*
    process.stdout.write(
      `row: ${i}/${lines.length}, column: ${j}/${lines[0].length}, p2: ${p2}`
    );
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);

    */
    if (initialPosition.y === i && initialPosition.x === j) continue;
    rows = [...lines];
    positions = [];
    direction = "UP";
    isGuardVisible = true;
    guardPosition = { ...initialPosition };
    while (isGuardVisible) {
      isGuardVisible = isMovablePosition(rows, i, j);
    }
  }
}

console.log("p2:", p2);

function isMovablePosition(rows, i, j) {
  let nextPosition = { ...guardPosition };
  if (direction === "UP") {
    nextPosition.y--;
  } else if (direction === "DOWN") {
    nextPosition.y++;
  } else if (direction === "LEFT") {
    nextPosition.x--;
  } else if (direction === "RIGHT") {
    nextPosition.x++;
  }
  if (
    nextPosition.y >= 0 &&
    nextPosition.x >= 0 &&
    nextPosition.y < rows.length &&
    nextPosition.x < rows[0].length
  ) {
    let mark = rows[nextPosition.y][nextPosition.x];
    if (mark === "#" || (nextPosition.y === i && nextPosition.x === j)) {
      if (direction === "UP") {
        direction = "RIGHT";
      } else if (direction === "DOWN") {
        direction = "LEFT";
      } else if (direction === "LEFT") {
        direction = "UP";
      } else if (direction === "RIGHT") {
        direction = "DOWN";
      }
    } else {
      rows[guardPosition.y][guardPosition.x] = "X";
      let p = positions.find(
        (p) => p.y === guardPosition.y && p.x === guardPosition.x
      );
      if (p) {
        // If position visited already, and the direction is same
        // => Loop
        if (p.direction === direction) {
          p2++;
          return false;
        }
      } else {
        positions.push({
          y: guardPosition.y,
          x: guardPosition.x,
          direction: direction,
        });
      }
      guardPosition = nextPosition;
    }
    return true;
  }
  rows[guardPosition.y][guardPosition.x] = "X";
  return false;
}
