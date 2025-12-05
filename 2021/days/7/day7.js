const { parseTextFile, logger } = require("../../helpers");
const isNumber = 1;

function part1(isTest) {
  logger(
    `\n---------- Day 7 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, ",");
  let solution = null;
  // Count occurence of 1 in each position in each digit
  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);
  // Slow and ineffiecient way, median should work?
  for (let i = minPos; i < maxPos; i++) {
    let fuel = 0;
    input.forEach((pos) => {
      fuel += Math.abs(pos - i);
    });
    if (solution) {
      if (fuel < solution.consumption) {
        solution = { position: i, consumption: fuel };
      }
    } else {
      solution = { position: i, consumption: fuel };
    }
  }

  console.log("Answer:", solution.consumption);
}

function part2(isTest) {
  logger(
    `\n---------- Day 7 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, ",");
  let solution = { position: -1, consumption: Infinity };
  // Count occurence of 1 in each position in each digit
  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);
  for (let i = minPos; i < maxPos; i++) {
    let fuel = 0;
    input.forEach((pos) => {
      let n = Math.abs(pos - i);
      // Sum formula -> n = n * (n + 1) / 2)
      let f = (n * (n + 1)) / 2;
      fuel += f;
      /* Slow, brute-force way

      let f = Math.abs(pos - i)
      for (let index = 1; index <= f; index++) {
        fuel += index;
      }


      */
    });

    if (fuel < solution.consumption) {
      solution = { position: i, consumption: fuel };
    }
  }
  console.log("\nAnswer:", solution.consumption);
}

module.exports = {
  part1,
  part2,
};
