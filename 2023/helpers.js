const {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  renameSync,
} = require("fs");
const path = require("path");
const { hrtime } = require("process");
const { copySync } = require("fs-extra");
const { colors, NS_PER_SEC, colorCodes } = require("./constants");

const logger = (message, color) => {
  if (color) {
    const colorCode = colors.find((c) => c.name === color).code;
    console.log(colorCode + message + colorCodes.normal);
  } else {
    console.log(message);
  }
};

// Get all days from days folder
const getAllDays = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      return { day: Number(dirent.name), path: path.join(source, dirent.name) };
    })
    .sort((a, b) => a.day - b.day);

const parseTextFile = (directory, isTest, isNumber, delimiter) => {
  let input, file, text;
  // If test = 1 === true, select test_txt, otherwise use actual txt
  isTest ? (file = "test.txt") : (file = "input.txt");
  let textFile = path.join(directory, file);

  try {
    text = readFileSync(textFile, "utf8");
    // If isNumber = 1 === true, convert input lines as numbers, otherwise keep them as is
    isNumber
      ? (input = text.split(delimiter).map(Number))
      : (input = text.split(delimiter).map((line) => line.trim()));
  } catch (err) {
    console.error(err);
  }
  return input;
};

// To measure performance
const benchmark = (func, isTest) => {
  start = hrtime();
  func(isTest);
  diff = hrtime(start);
  logger(
    `Execution time: ${(diff[0] * NS_PER_SEC + diff[1]) / 1000000}ms`,
    "success"
  );
};

const copyPreviousDay = (source, destination, newDay) => {
  // Create new folder
  if (!existsSync(destination)) {
    mkdirSync(destination, { recursive: true });
  }
  // Copy sample day contents to new folder
  copySync(source, destination, { recursive: true }, function (err) {
    if (err) {
      console.error(err);
    }
  });
  // rename day.js
  renameSync(
    path.join(destination, "day.js"),
    path.join(destination, `day${newDay}.js`)
  );
};

const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
};

module.exports = {
  getAllDays,
  parseTextFile,
  benchmark,
  copyPreviousDay,
  logger,
  printProgress,
  colorCodes,
};
