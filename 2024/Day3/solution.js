const { readFileSync } = require("fs");
let isTest = 0;
let path;
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
//const lines = input.split("\n").map((l) => l.trim());
const mul = /mul\([-0-9]+,[-0-9]+\)/gm;
let instructions = [];

// Get all instructions from string
instructions = [...input.matchAll(mul)];

// Calculate valid multiplications
let p1 = 0;
for (let instruction of instructions) {
  const numbers = instruction[0]
    .replace("mul(", "")
    .replace(")", "")
    .split(",");
  p1 += numbers[0] * numbers[1];
}

console.log("Part 1:", p1);

const doCom = /do\(\)/gm;
const dontCom = /don't\(\)/gm;
let doMulti = true;
let p2 = 0;

instructions = [
  ...instructions,
  ...input.matchAll(doCom),
  ...input.matchAll(dontCom),
].sort((a, b) => a.index - b.index);

for (let instruction of instructions) {
  if (instruction[0].includes("do")) {
    doMulti = true;
  }
  if (instruction[0].includes("don't")) {
    doMulti = false;
  }

  if (doMulti && instruction[0].includes("mul")) {
    const numbers = instruction[0]
      .replace("mul(", "")
      .replace(")", "")
      .split(",");
    p2 += numbers[0] * numbers[1];
  }
}

console.log("Part 2:", p2);
