const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 3 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );

  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  let gammaRate = "";
  let epsilonRate = "";
  let counts = [];
  let binaryCount = input.length;

  // Count occurence of 1 in each position in each digit
  input.forEach((binary) => {
    binary.split("").forEach((digit, index) => {
      if (digit === "1") {
        if (counts[index]) {
          counts[index]++;
        } else {
          counts[index] = 1;
        }
      }
    });
  });

  // Get rates
  counts.forEach((binary) => {
    let oneMajority = binary >= binaryCount / 2;
    if (oneMajority) {
      gammaRate += "1";
      epsilonRate += "0";
    } else {
      gammaRate += "0";
      epsilonRate += "1";
    }
  });
  solution = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 3 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );

  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  let oxygenGeneratorRating = "";
  let CO2ScrubberRating = "";
  let oxValues = [];
  let CO2Values = [];
  binLength = input[0].length;
  let onesCount = 0;
  let zeroCount = 0;

  // Get sort based on first bit values into 2 arrays
  input.forEach((binary) => {
    if (binary[0] === "1") {
      oxValues.push(binary);
    } else {
      CO2Values.push(binary);
    }
  });

  // Get oxygenGeneratorRating from oxValues
  for (let index = 1; index < binLength; index++) {
    onesCount = zeroCount = 0;

    oxValues.forEach((binary) => {
      binary[index] === "1" ? ++onesCount : ++zeroCount;
    });

    if (onesCount >= zeroCount) {
      oxValues = oxValues.filter((binary) => binary[index] === "1");
    } else {
      oxValues = oxValues.filter((binary) => binary[index] === "0");
    }

    if (oxValues.length === 1) {
      oxygenGeneratorRating = oxValues[0];
      break;
    }
  }

  // Get CO2ScrubberRating from CO2Values
  for (let index = 1; index < binLength; index++) {
    onesCount = zeroCount = 0;
    CO2Values.forEach((binary) => {
      binary[index] === "0" ? ++zeroCount : ++onesCount;
    });

    if (zeroCount <= onesCount) {
      CO2Values = CO2Values.filter((binary) => binary[index] === "0");
    } else {
      CO2Values = CO2Values.filter((binary) => binary[index] === "1");
    }

    if (CO2Values.length === 1) {
      CO2ScrubberRating = CO2Values[0];
      break;
    }
  }

  solution =
    parseInt(oxygenGeneratorRating, 2) * parseInt(CO2ScrubberRating, 2);
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
