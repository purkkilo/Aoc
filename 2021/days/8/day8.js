const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 8 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  let signals = [];
  input.forEach((line) => {
    let l = line.split("|");
    signals.push({
      pattern: l[0].trim().split(" "),
      output: l[1].trim().split(" "),
    });
  });

  signals.forEach((signal) => {
    signal.output.forEach((s) => {
      let l = s.length;
      if (l === 2 || l === 3 || l === 4 || l === 7) {
        solution++;
      }
    });
  });

  console.log("Answer:", solution);
}

function part2(isTest) {
  logger(
    `\n---------- Day 8 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  let solution = 0;
  let signals = [];

  input.forEach((line) => {
    let l = line.split("|");
    signals.push({
      pattern: l[0].trim().split(" "),
      output: l[1].trim().split(" "),
    });
  });

  const digits = [
    { digit: 0, letters: "abcefg" },
    { digit: 1, letters: "cf" },
    { digit: 2, letters: "acdeg" },
    { digit: 3, letters: "acdfg" },
    { digit: 4, letters: "bcdf" },
    { digit: 5, letters: "abdfg" },
    { digit: 6, letters: "abdefg" },
    { digit: 7, letters: "acf" },
    { digit: 8, letters: "abcdefg" },
    { digit: 9, letters: "abcdfg" },
  ];

  signals.forEach((signal) => {
    let lettersCounts = [
      { letter: "a", count: 0 },
      { letter: "b", count: 0 },
      { letter: "c", count: 0 },
      { letter: "d", count: 0 },
      { letter: "e", count: 0 },
      { letter: "f", count: 0 },
      { letter: "g", count: 0 },
    ];
    let solvedLetters = [
      { letter: "a", solvedLetter: "" },
      { letter: "b", solvedLetter: "" },
      { letter: "c", solvedLetter: "" },
      { letter: "d", solvedLetter: "" },
      { letter: "e", solvedLetter: "" },
      { letter: "f", solvedLetter: "" },
      { letter: "g", solvedLetter: "" },
    ];

    signal.pattern.forEach((s) => {
      s.split("").forEach((l) => {
        let temp = lettersCounts.find((t) => t.letter === l);
        temp.count++;
      });
    });

    // Letters used in numbers:
    /*
      a found in 8 numbers
      b found in 6 numbers ---> Unique
      c found in 8 numbers
      d found in 7 numbers
      e found in 4 numbers ---> Unique
      f found in 9 numbers ---> Unique
      g found in 7 numbers
    */
    // Find corresponding letters
    const e = lettersCounts.find((l) => l.count === 4).letter;
    const b = lettersCounts.find((l) => l.count === 6).letter;
    const f = lettersCounts.find((l) => l.count === 9).letter;

    // cf in number 1, f already solved, so get c
    const c = signal.pattern.find((l) => l.length === 2).replace(f, "");

    // a and c used in 8 number, c already solved so get a
    const a = lettersCounts.find((l) => l.count === 8 && l.letter !== c).letter;

    // number 4 has 4 letters -> bcdf -> d only one left to solve
    const d = signal.pattern
      .find((l) => l.length === 4)
      .replace(b, "")
      .replace(c, "")
      .replace(f, "");

    // only letter left is g, it occurs in 7 numbers same as d
    const g = lettersCounts.find((l) => l.count === 7 && l.letter !== d).letter;

    // Mark letter connections
    solvedLetters.find((l) => l.letter === "a").solvedLetter = a;
    solvedLetters.find((l) => l.letter === "b").solvedLetter = b;
    solvedLetters.find((l) => l.letter === "c").solvedLetter = c;
    solvedLetters.find((l) => l.letter === "d").solvedLetter = d;
    solvedLetters.find((l) => l.letter === "e").solvedLetter = e;
    solvedLetters.find((l) => l.letter === "f").solvedLetter = f;
    solvedLetters.find((l) => l.letter === "g").solvedLetter = g;

    // replace letters
    for (let i = 0; i < signal.output.length; i++) {
      let chars = signal.output[i].split("");
      for (let c = 0; c < chars.length; c++) {
        chars[c] = solvedLetters.find(
          (l) => l.solvedLetter === chars[c]
        ).letter;
      }
      chars = chars.sort();
      signal.output[i] = chars.join("");
    }

    // Find digits
    let str = "";
    signal.output.forEach((element) => {
      let dig = digits.find((d) => d.letters === element);
      if (dig) {
        str += dig.digit.toString();
      } else {
        console.log("wtf");
      }
    });
    solution += parseInt(str);
  });

  console.log("Answer:", solution);
}

module.exports = {
  part1,
  part2,
};
