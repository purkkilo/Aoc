const { parseTextFile, logger } = require("../../helpers");
const isNumber = 1;

function part1(isTest) {
  logger(
    `\n---------- Day 6 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, ",");
  let solution = "TODO";
  const days = 80;

  for (let day = 0; day < days; day++) {
    input.forEach((fish, index) => {
      if (fish) {
        --input[index];
      } else {
        input[index] = 6;
        input.push(8);
      }
    });
  }
  solution = input.length;
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 6 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, ",");
  let population = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  let solution = "TODO";
  const days = 256;
  // Get timer values from input
  for (let index = 0; index < input.length; index++) {
    population[input[index]]++;
  }

  for (let day = 0; day < days; day++) {
    let lanternFishes = Object.keys(population);
    for (let i = 0; i < lanternFishes.length; i++) {
      let timer = parseInt(lanternFishes[i]);
      // if day == 0, add the 0 day's population to days 7 and 9 to simulate creating new fishes
      // Day 9 is a buffer day to make shifting work correctly, probably there's easier solution but I'm dumb
      if (timer === 0) {
        population[7] += population[timer];
        population[9] += population[timer];
      } else {
        // 'Move' the fishes to previous day
        population[timer - 1] = population[timer];
        population[timer] = 0;
      }
    }
  }

  solution = Object.values(population).reduce((a, b) => a + b);
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
