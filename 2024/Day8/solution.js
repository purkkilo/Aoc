// https://adventofcode.com/2024/day/8
const { readFileSync } = require("fs");
let isTest = 0;
let path;
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
let lines = input.split("\n").map((l) => l.trim().split(""));
let rows = lines.length;
let columns = lines[0].length;

let p1 = 0;
let p2 = 0;

let antennas = [];
let types = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    if (lines[r][c] !== ".") {
      antennas.push({ type: lines[r][c], r: r, c: c });
      types.push(lines[r][c]);
    }
  }
}

types = new Set(types);
let A1 = [];
let A2 = [];

// For p2, check each point
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    // p1, check points for each antenna
    types.forEach((t) => {
      let as = antennas.filter((a) => a.type === t);
      as.forEach((a) => {
        as.forEach((b) => {
          if (a.r !== b.r && a.c !== b.c) {
            let dr = b.r - a.r;
            let dc = b.c - a.c;
            let a1r = a.r - dr;
            let a1c = a.c - dc;
            let a2r = b.r + dr;
            let a2c = b.c + dc;

            let a1 = { r: a1r, c: a1c };
            let a2 = { r: a2r, c: a2c };

            if (isValidPoint(a1, A1)) {
              A1.push(a1);
            }
            if (isValidPoint(a2, A1)) {
              A1.push(a2);
            }

            // If point (r,c) is on the same line/slope as previous 2 points
            let dr1 = r - a.r;
            let dr2 = r - b.r;
            let dc1 = c - a.c;
            let dc2 = c - b.c;
            // dr1/dc1 == dr2/dc2 ----> dr1 * dc2 == dc1 * dr2, no division funny business
            let m1 = dr1 * dc2;
            let m2 = dc1 * dr2;
            if (m1 == m2 && isValidPoint({ r: r, c: c }, A2)) {
              A2.push({ r: r, c: c });
            }
          }
        });
      });
    });
  }
}

p1 = A1.length;
p2 = A2.length;
console.log("p1:", p1);
console.log("p2:", p2);

function isValidPoint(point, A) {
  if (point.r >= 0 && point.r < rows && point.c >= 0 && point.c < columns) {
    if (A.findIndex((a) => a.r === point.r && a.c === point.c) === -1) {
      return true;
    }
  }

  return false;
}
