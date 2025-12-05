const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;
// Was an idiot and overwrote the file with node runner.js new
function part1(isTest) {
  logger(
    `\n---------- Day X part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  console.log(input);
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day X part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  console.log(input);
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
