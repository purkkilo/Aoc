const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;
let solution = 0;
let octopus = [];
function part1(isTest) {
  logger(
    `\n---------- Day 11 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let steps = 10;
  solution = 0;
  octopus = [];
  input.forEach((row) => {
    octopus.push(row.split("").map(Number));
  });

  for (let index = 1; index <= steps; index++) {
    console.log("Step:", index);
    for (let y = 0; y < octopus.length; y++) {
      for (let x = 0; x < octopus[y].length; x++) {
        octopus[y][x]++;
      }
    }
    for (let y = 0; y < octopus.length; y++) {
      for (let x = 0; x < octopus[y].length; x++) {
        if (octopus[y][x] === 10) {
          flash(y, x);
        }
      }
    }
    // Reset flashed octos
    for (let y = 0; y < octopus.length; y++) {
      for (let x = 0; x < octopus[y].length; x++) {
        if (octopus[y][x] === -1) {
          octopus[y][x] = 0;
        }
      }
    }
  }
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 11 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let steps = 10;
  solution = 0;
  octopus = [];
  input.forEach((row) => {
    octopus.push(row.split("").map(Number));
  });
  console.log("Answer:", solution);
}

function flash(y, x) {
  solution++;
  octopus[y][x] = -1;
  // Locate neighbours
  console.log(`octopus[${y}][${x}]`);
  let adj = [-1, 0, 1];
  for (row of adj) {
    for (col of adj) {
      let yy = y + row;
      let xx = x + col;
      if (
        yy >= 0 &&
        yy < octopus.length &&
        xx >= 0 &&
        xx < octopus[0].length &&
        octopus[yy][xx] !== -1 // Handle the octopus[y][x] itself
      ) {
        // Increment the number and check if it needs to flash
        octopus[yy][xx]++;
        if (octopus[yy][xx] >= 10) {
          flash(yy, xx);
        }
      }
    }
  }
}

module.exports = {
  part1,
  part2,
};
