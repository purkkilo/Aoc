const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

let card_values = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

function part1(isTest) {
  logger(
    `\n---------- Day 7 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");

  let ranked = [];
  let first = input.shift().split(" ");
  ranked.push({ hand: first[0], bet: Number(first[1]) });

  input.forEach((element) => {
    let temp = element.split(" ");
    let currentHand = { hand: temp[0], bet: Number(temp[1]) };
    let insertIndex = 0;
    let handWon = false;
    ranked.every((secondHand, index) => {
      insertIndex = index;
      handWon = handWinds(currentHand.hand, secondHand.hand);
      return handWon;
    });

    if (handWon && insertIndex === ranked.length - 1) {
      if (ranked.length === 1) {
        insertIndex = 1;
      } else {
        insertIndex++;
      }
    }
    ranked.splice(insertIndex, 0, currentHand);
  });

  const fs = require("fs");
  fs.writeFile("./console.json", JSON.stringify(ranked), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
  //console.log({ ranked });

  let answer = 0;

  ranked.forEach((hand, index) => {
    answer += hand.bet * (index + 1);
  });

  console.log({ answer });
}

function handWinds(firstHand, secondHand) {
  const firstDetails = getHandDetails(firstHand);
  const secondDetails = getHandDetails(secondHand);
  let firstValue = 0;
  let secondValue = 0;
  //console.log({ firstHand, secondHand });
  if (checkIfSameType(firstDetails, secondDetails)) {
    //console.log("Same type!");
    for (let index = 0; index < firstHand.split("").length; index++) {
      firstValue = card_values[firstHand[index]];
      secondValue = card_values[secondHand[index]];
      if (firstValue === secondValue) {
        continue;
      } else {
        if (firstValue > secondValue) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    //console.log("Different type!");
    let firstDuplicates = Object.keys(firstDetails.duplicates)
      .map((x) => Number(x))
      .sort((a, b) => b - a);
    let secondDuplicates = Object.keys(secondDetails.duplicates)
      .map((x) => Number(x))
      .sort((a, b) => b - a);

    //console.log({ firstDuplicates, secondDuplicates });
    if (firstDuplicates[0] > secondDuplicates[0]) {
      return true;
    }
    if (firstDuplicates[0] === secondDuplicates[0]) {
      if (firstDuplicates[1] > secondDuplicates[1]) return true;
      if (firstDuplicates[1] <= secondDuplicates[1]) {
        // two pairs > one pair
        if (firstDetails.duplicates[2] > secondDetails.duplicates[2])
          return true;
        else return false;
      }
    }
    return false;
  }
}

function getHandDetails(hand) {
  let counts = {};
  let duplicates = {};
  hand.split("").forEach((card) => {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  });
  Object.values(counts).forEach((element) => {
    duplicates[element] = duplicates[element] ? duplicates[element] + 1 : 1;
  });
  return { counts, duplicates };
}

function checkIfSameType(firstDetails, secondDetails) {
  //
  if (
    (firstDetails.duplicates[5] && secondDetails.duplicates[5]) ||
    (firstDetails.duplicates[4] && secondDetails.duplicates[4]) ||
    (firstDetails.duplicates[3] &&
      secondDetails.duplicates[3] &&
      firstDetails.duplicates[2] &&
      secondDetails.duplicates[2]) ||
    (firstDetails.duplicates[3] &&
      secondDetails.duplicates[3] &&
      firstDetails.duplicates[1] &&
      secondDetails.duplicates[1]) ||
    (firstDetails.duplicates[2] === 2 && secondDetails.duplicates[2] === 2) ||
    (firstDetails.duplicates[2] === 1 &&
      secondDetails.duplicates[2] === 1 &&
      firstDetails.duplicates[1] === 3 &&
      secondDetails.duplicates[1] === 3) ||
    (firstDetails.duplicates[1] === 5 && secondDetails.duplicates[1] === 5)
  ) {
    return true;
  }
  return false;
}

function part2(isTest) {
  logger(
    `\n---------- Day 7 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );

  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  card_values["J"] = 1;
}

module.exports = {
  part1,
  part2,
};
