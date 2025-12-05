const { readFileSync } = require("fs");
let isTest = 0;
let path;
// JS implementation because my go skills are still thrash
// If test = 1 === true, select test_txt, otherwise use actual txt
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
let lines = input.split("\n").map((l) => l.trim());

//p1
checkEquation(1);
//p2
checkEquation(2);

function checkEquation(part) {
  let p1 = 0;
  let valid = false;
  for (let line of lines) {
    const eq = line.split(":").map((l) => l.trim());
    const test = Number(eq[0]);
    const numbers = eq[1].split(" ").map(Number);
    let sums = [];

    for (let i = 0; i < numbers.length - 1; i++) {
      let n1, n2;
      let toAdd = [];
      if (i === 0) {
        n1 = numbers[i];
        n2 = numbers[i + 1];
        if (part === 1) {
          toAdd.push(n1 + n2, n1 * n2);
        } else {
          toAdd.push(n1 + n2, n1 * n2, Number(n1.toString() + n2.toString()));
        }
      } else {
        sums.forEach((s) => {
          n1 = s;
          n2 = numbers[i + 1];
          if (part === 1) {
            toAdd.push(s + numbers[i + 1], s * numbers[i + 1]);
          } else {
            toAdd.push(
              s + numbers[i + 1],
              s * numbers[i + 1],
              Number(n1.toString() + n2.toString())
            );
          }
        });
      }
      sums = toAdd;
    }
    valid = sums.includes(test);
    if (valid) {
      p1 += test;
    }
  }
  console.log(`p${part}:`, p1);
}
