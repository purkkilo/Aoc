const { POINT_CONVERSION_COMPRESSED } = require("constants");
const { start } = require("repl");
const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 5 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = "TODO";
  let coords = [];
  input.forEach((line) => {
    let temp = line.split(" -> ");
    let startCoords = temp[0].split(",").map(Number);
    let endCoords = temp[1].split(",").map(Number);
    if (startCoords[0] === endCoords[0] || startCoords[1] === endCoords[1]) {
      coords.push({
        x1: startCoords[0],
        y1: startCoords[1],
        x2: endCoords[0],
        y2: endCoords[1],
      });
    }
  });

  let points = {};
  coords.forEach((coord) => {
    if (coord.x1 === coord.x2) {
      let startY, endY;
      if (coord.y1 > coord.y2) {
        startY = coord.y2;
        endY = coord.y1;
      } else {
        startY = coord.y1;
        endY = coord.y2;
      }

      for (let y = startY; y <= endY; y++) {
        if (!points[`${coord.x1},${y}`]) {
          points[`${coord.x1},${y}`] = 1;
        } else {
          points[`${coord.x1},${y}`]++;
        }
      }
    }
    if (coord.y1 === coord.y2) {
      let startX, endX;
      if (coord.x1 > coord.x2) {
        startX = coord.x2;
        endX = coord.x1;
      } else {
        startX = coord.x1;
        endX = coord.x2;
      }
      for (let x = startX; x <= endX; x++) {
        if (!points[`${x},${coord.y1}`]) {
          points[`${x},${coord.y1}`] = 1;
        } else {
          points[`${x},${coord.y1}`]++;
        }
      }
    }
  });
  solution = 0;
  Object.values(points).forEach((point) => {
    if (point >= 2) {
      solution++;
    }
  });
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 5 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let coords = [];
  // Count occurence of 1 in each position in each digit
  input.forEach((line) => {
    let temp = line.split(" -> ");
    let startCoords = temp[0].split(",").map(Number);
    let endCoords = temp[1].split(",").map(Number);
    coords.push({
      x1: startCoords[0],
      y1: startCoords[1],
      x2: endCoords[0],
      y2: endCoords[1],
    });
  });

  let points = {};
  coords.forEach((coord) => {
    let start, end;
    if (coord.x1 < coord.x2) {
      start = { x: coord.x1, y: coord.y1 };
      end = { x: coord.x2, y: coord.y2 };
    } else {
      start = { x: coord.x2, y: coord.y2 };
      end = { x: coord.x1, y: coord.y1 };
    }

    if (start.x == end.x || start.y == end.y) {
      let startX = Math.min(start.x, end.x);
      let startY = Math.min(start.y, end.y);
      let endX = Math.max(start.x, end.x);
      let endY = Math.max(start.y, end.y);

      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          if (!points[`${x},${y}`]) {
            points[`${x},${y}`] = 1;
          } else {
            points[`${x},${y}`]++;
          }
        }
      }
    } else {
      let gap = end.x - start.x;
      for (let i = 0; i <= gap; i++) {
        let x = start.x + i;
        let y = start.y + (end.y > start.y ? i : -i);
        if (!points[`${x},${y}`]) {
          points[`${x},${y}`] = 1;
        } else {
          points[`${x},${y}`]++;
        }
      }
    }
  });

  solution = 0;
  Object.values(points).forEach((point) => {
    if (point >= 2) {
      solution++;
    }
  });
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
