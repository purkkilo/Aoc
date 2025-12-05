const { readFileSync } = require("fs");
let isTest = 0;
let path;
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
const lines = input.split("\n").map((l) => l.trim());
let p1 = 0;
let p2 = 0;

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    // P1
    let horizontal, vertical, diagonal, otherDiagonal;
    horizontal =
      lines[y][x] + lines[y][x + 1] + lines[y][x + 2] + lines[y][x + 3];

    if (horizontal === "XMAS" || horizontal === "SAMX") {
      p1++;
    }

    if (lines[y + 3]) {
      vertical =
        lines[y][x] + lines[y + 1][x] + lines[y + 2][x] + lines[y + 3][x];

      if (vertical === "XMAS" || vertical === "SAMX") {
        p1++;
      }

      diagonal =
        lines[y][x] +
        lines[y + 1][x + 1] +
        lines[y + 2][x + 2] +
        lines[y + 3][x + 3];

      otherDiagonal =
        lines[y][x] +
        lines[y + 1][x - 1] +
        lines[y + 2][x - 2] +
        lines[y + 3][x - 3];

      if (diagonal === "XMAS" || diagonal === "SAMX") {
        p1++;
      }

      if (otherDiagonal === "XMAS" || otherDiagonal === "SAMX") {
        p1++;
      }
    }
    // P2
    if (lines[y][x] === "A") {
      if (lines[y - 1] && lines[y + 1]) {
        const test = lines[y - 1][x - 1] + lines[y][x] + lines[y + 1][x + 1];
        const test2 = lines[y + 1][x - 1] + lines[y][x] + lines[y - 1][x + 1];
        if (
          (test === "MAS" || test === "SAM") &&
          (test2 === "MAS" || test2 === "SAM")
        )
          p2++;
      }
    }
  }
}

console.log("Part 1:", p1);
console.log("Part 2:", p2);
