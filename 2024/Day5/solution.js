const { readFileSync } = require("fs");
let isTest = 0;
let path;
isTest ? (path = "test.txt") : (path = "input.txt");
const input = readFileSync(path, "utf8");
const lines = input.split("\n").map((l) => l.trim());
const rules = lines.filter((l) => l.includes("|"));
const updates = lines.filter((l) => l.includes(","));
let p1 = 0;
let p2 = 0;
const wrongOrders = [];

for (let update of updates) {
  let pages = update.split(",").map(Number);

  const isRightOrder = checkRules(pages, rules, false).isRightOrder;

  if (isRightOrder) {
    p1 += pages[Math.floor(pages.length / 2)];
  } else {
    wrongOrders.push(pages);
  }
}

console.log("Part 1:", p1);

for (let pages of wrongOrders) {
  let isRight = false;
  while (!isRight) {
    const result = checkRules(pages, rules, true);
    if (result.isRightOrder) {
      p2 += result.tempPages[Math.floor(pages.length / 2)];
    }
    pages = result.tempPages;
    isRight = result.isRightOrder;
  }
}

console.log("Part 2:", p2);

function checkRules(pages, rules, swap) {
  let isRightOrder = true;
  let tempPages = [...pages];

  for (r of rules) {
    const rule = r.split("|").map(Number);
    if (!tempPages.includes(rule[0]) || !tempPages.includes(rule[1])) continue;

    const firstIndex = tempPages.findIndex((p) => p === rule[0]);
    const secondIndex = tempPages.findIndex((p) => p === rule[1]);

    if (firstIndex > secondIndex) {
      isRightOrder = false;
      if (swap) {
        const temp = tempPages[firstIndex];
        tempPages[firstIndex] = tempPages[secondIndex];
        tempPages[secondIndex] = temp;
      }
    }
  }

  return { isRightOrder, tempPages };
}
