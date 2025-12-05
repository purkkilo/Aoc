const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 2 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let instructions = input.map((element) => {
    let i = element.split(" ");
    return { instruction: i[0], value: Number(i[1]) };
  });
  let horizontal = 0;
  let depth = 0;
  let solution = 0;
  instructions.forEach((element) => {
    if (element.instruction === "forward") {
      horizontal += element.value;
    } else if (element.instruction === "up") {
      depth -= element.value;
    } else {
      depth += element.value;
    }
  });

  solution = horizontal * depth;
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 2 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let instructions = input.map((element) => {
    let i = element.split(" ");
    return { instruction: i[0], value: Number(i[1]) };
  });
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  instructions.forEach((element) => {
    if (element.instruction === "forward") {
      horizontal += element.value;
      depth += aim * element.value;
    } else if (element.instruction === "up") {
      aim -= element.value;
    } else {
      aim += element.value;
    }
  });

  solution = horizontal * depth;
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
