const { count } = require("console");
const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 4 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  let input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = "TODO";
  const bingo = input[0].split(",").map(Number);
  const cards = [];
  let bingoCard = [];
  let finalBingoNumber = null;
  let card = [];
  let index = 0;
  input.splice(0, 2);

  input.forEach((line, i) => {
    let boardLine = line
      .split(" ")
      .filter((l) => l !== "")
      .map((n) => {
        return { number: Number(n), inResult: false };
      });

    if (boardLine.length) {
      card.push(boardLine);
      if (i === input.length - 1) {
        cards.push({ index: index, card: card });
      }
    } else {
      cards.push({ index: index, card: card });
      ++index;
      card = [];
    }
  });
  for (let i = 0; i < bingo.length; i++) {
    let bingoNumber = bingo[i];
    //console.log("Number drawn:", bingoNumber);
    let foundBingo = false;
    for (let a = 0; a < cards.length; a++) {
      const player = cards[a];

      for (let r = 0; r < player.card.length; r++) {
        // Mark number
        for (let x = 0; x < player.card[r].length; x++) {
          if (bingoNumber == player.card[r][x].number) {
            player.card[r][x].inResult = true;
          }
        }
        let countX = 0;
        let countY = 0;
        // Check rows
        for (let x = 0; x < player.card[r].length; x++) {
          if (player.card[r][x].inResult) {
            countX++;
          }
        }

        // Check columns
        for (let y = 0; y < player.card[r].length; y++) {
          if (player.card[y][r].inResult) {
            countY++;
          }
        }

        if (countX === 5 || countY === 5) {
          foundBingo = true;
          finalBingoNumber = bingoNumber;
          bingoCard = player.card;
        }
        // Check columns

        if (foundBingo) {
          break;
        }
      }
      if (foundBingo) {
        break;
      }
    }
    if (foundBingo) {
      console.log("Number:", finalBingoNumber, "- Bingo!");
      break;
    }
  }

  let sum = 0;
  bingoCard.forEach((row) => {
    row.forEach((n) => {
      if (!n.inResult) {
        sum += n.number;
      }
    });
  });
  solution = sum * finalBingoNumber;
  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 4 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = "TODO";
  const bingoNumbers = input[0].split(",").map(Number);
  let cards = [];
  let card = [];
  let index = 0;
  let finalBingo = false;
  let sum = 0;
  let finalBingoNumber = 0;
  input.splice(0, 2);
  input.forEach((line, i) => {
    let boardLine = line
      .split(" ")
      .filter((l) => l !== "")
      .map((n) => {
        return Number(n);
      });

    if (boardLine.length) {
      card.push(boardLine);
      if (i === input.length - 1) {
        cards.push(card);
      }
    } else {
      cards.push(card);
      ++index;
      card = [];
    }
  });
  let cardsToBeRemoved = [];

  for (let i = 0; i < bingoNumbers.length; i++) {
    //console.log("Number drawn:", bingoNumbers[i]);
    for (let j = 0; j < cards.length; j++) {
      // Mark the given bingonumber as "X" on the card
      for (let k = 0; k < cards[j].length; k++) {
        for (let l = 0; l < cards[j][k].length; l++) {
          if (cards[j][k][l] == bingoNumbers[i]) {
            cards[j][k][l] = "X";
          }
        }
      }

      let bingoFound = false;
      // Check rows
      for (let k = 0; k < cards[j].length; k++) {
        let bingoRow = true;
        for (let l = 0; l < cards[j][k].length; l++) {
          if (cards[j][k][l] !== "X") {
            bingoRow = false;
          }
        }
        if (bingoRow) {
          bingoFound = true;
        }
      }

      // Check columns
      for (let k = 0; k < cards[j].length; k++) {
        let bingoColumn = true;
        for (let l = 0; l < cards[j][k].length; l++) {
          if (cards[j][l][k] !== "X") bingoColumn = false;
        }
        if (bingoColumn) {
          bingoFound = true;
        }
      }

      if (bingoFound) {
        if (cards.length == 1) {
          for (let k = 0; k < cards[0].length; k++) {
            for (let l = 0; l < cards[0][k].length; l++) {
              if (cards[0][k][l] !== "X") {
                sum += cards[0][k][l];
              }
            }
          }

          finalBingoNumber = bingoNumbers[i];
          finalBingo = true;
        } else cardsToBeRemoved.push(j);
      }
      if (finalBingo) {
        break;
      }
    }

    for (let j = 0; j < cardsToBeRemoved.length; j++) {
      cards[cardsToBeRemoved[j]] = null;
      //console.log(cards.splice(j));
    }
    cards = cards.filter((element) => element != null);
    cardsToBeRemoved = [];

    if (finalBingo) {
      console.log("Number:", finalBingoNumber, "- Bingo!");
      break;
    }
  }

  solution = sum * finalBingoNumber;
  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
