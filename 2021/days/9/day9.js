const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 9 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  const heightmap = [];
  input.forEach((line) => {
    heightmap.push(line.split("").map(Number));
  });

  heightmap.forEach((row, y) => {
    row.forEach((number, x) => {
      let lowpoint = true;
      if (y > 0) {
        if (number >= heightmap[y - 1][x]) {
          lowpoint = false;
        }
      }
      if (y < heightmap.length - 1) {
        if (number >= heightmap[y + 1][x]) {
          lowpoint = false;
        }
      }
      if (x > 0) {
        if (number >= heightmap[y][x - 1]) {
          lowpoint = false;
        }
      }
      if (x < row.length - 1) {
        if (number >= heightmap[y][x + 1]) {
          lowpoint = false;
        }
      }
      if (lowpoint) {
        solution += number + 1;
      }
    });
  });

  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 9 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  const heightmap = [];
  const lowPoints = [];
  input.forEach((line) => {
    heightmap.push(line.split("").map(Number));
  });

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  heightmap.forEach((row, y) => {
    row.forEach((number, x) => {
      let lowpoint = true;

      for (let e = 0; e < dr.length; e++) {
        let yy = y + dr[e];
        let xx = x + dc[e];
        if (
          yy >= 00 &&
          yy <= heightmap.length - 1 &&
          xx >= 0 &&
          xx <= row.length - 1
        ) {
          if (number >= heightmap[yy][xx]) {
            lowpoint = false;
          }
        }
      }

      if (lowpoint) {
        lowPoints.push({ y: y, x: x });
      }
    });
  });

  let basins = [];
  for (let point of lowPoints) {
    let basin = findBasin(point, heightmap); // get coordinates of neighbors that meet the criteria
    basins.push(basin);
  }
  basins.sort((a, b) => b.length - a.length);
  solution = basins[0].length * basins[1].length * basins[2].length;
  console.log("Answer:", solution);
}

function findBasin(pos, heightmap) {
  let basin = [pos];
  let queue = [...nextPositions(pos, heightmap)];
  let nextLoc = queue.pop();
  while (nextLoc) {
    if (heightmap[nextLoc.y][nextLoc.x] !== 9) {
      basin.push(nextLoc);
      let visited = [...basin, ...queue];
      let adj = filterOutVisitedPositions(
        nextPositions(nextLoc, heightmap),
        visited
      );
      queue.push(...adj);
    }
    nextLoc = queue.pop();
  }
  return basin;
}

function isInBounds(x, y, heightmap) {
  if (y < 0) return false;
  if (y >= heightmap.length) return false;
  if (x < 0) return false;
  if (x >= heightmap[y].length) return false;
  return true;
}

function filterOutVisitedPositions(nextPos, visited) {
  let res = [];
  for (let pos of nextPos) {
    if (!visited.find((p) => p.x === pos.x && p.y === pos.y)) {
      res.push(pos);
    }
  }
  return res;
}
function nextPositions(position, heightmap) {
  let x = position.x;
  let y = position.y;
  let next = [];
  if (isInBounds(x - 1, y, heightmap)) next.push({ x: x - 1, y });
  if (isInBounds(x + 1, y, heightmap)) next.push({ x: x + 1, y });
  if (isInBounds(x, y - 1, heightmap)) next.push({ x, y: y - 1 });
  if (isInBounds(x, y + 1, heightmap)) next.push({ x, y: y + 1 });
  return next;
}

module.exports = {
  part1,
  part2,
};
