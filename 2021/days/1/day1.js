const { parseTextFile, logger } = require("../../helpers");
const isNumber = 1;

function part1(isTest) {
  logger(
    `\n---------- Day 1 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let temp = null;
  let increasedCount = 0;
  for (let depth of input) {
    if (temp && depth > temp) {
      ++increasedCount;
    }
    temp = depth;
  }

  console.log("Answer:", increasedCount);
}

function part2(isTest) {
  logger(
    `\n---------- Day 1 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let sum = 0;
  let temp = 0;
  let increasedCount = 0;
  let numbersToSum = 3;

  for (let index = 0; index < input.length; ++index) {
    if (index <= input.length - numbersToSum) {
      temp = sum;
      sum = 0;
      for (let i = index; i < index + numbersToSum; ++i) {
        sum += input[i];
      }
      if (temp && sum > temp) {
        temp = sum;
        increasedCount += 1;
      }
    }
  }

  console.log("Answer:", increasedCount);
}

module.exports = {
  part1,
  part2,
};
