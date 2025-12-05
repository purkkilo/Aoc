const { getAllDays, benchmark, copyPreviousDay, logger } = require("./helpers");
const path = require("path");
const args = process.argv.slice(2);
const command = args[0];
let selected_day, isTest;
const days = getAllDays(path.join(__dirname, "days"));

switch (command) {
  case "solve":
    let day, part;
    if (args[1] === "-t") {
      console.log("test");
      isTest = true;
      day = args[2];
      part = args[3];
    } else {
      isTest = false;
      day = args[1];
      part = args[2];
    }

    if (day) {
      if (days.find((d) => d.day === Number(day))) {
        selected_day = require(`./days/${day}/day${day}`);
        if (part) {
          part == 1
            ? benchmark(selected_day.part1, isTest)
            : benchmark(selected_day.part2, isTest);
        } else {
          benchmark(selected_day.part1, isTest);
          benchmark(selected_day.part2, isTest);
        }
      } else if (day === "all") {
        days.forEach((d) => {
          selected_day = require(`./days/${d.day}/day${d.day}`);
          benchmark(selected_day.part1, isTest);
          benchmark(selected_day.part2, isTest);
        });
      } else {
        logger(`Day ${day} not implemented yet`, "error");
      }
    } else {
      logger("Usage: node runner.js solve <day or 'all'> <part>", "blue");
      logger("Part is optional", "blue");
      logger(
        "To use testinputs: node runner.js solve -t <day or 'all'> <part>",
        "cyan"
      );
    }

    break;
  case "new":
    let newD = args[1];
    let newDay;
    if (newD) {
      newD = parseInt(newD);
      if (days.find((d) => d.day === newD)) {
        logger(`Day ${newD} already exists!`, "error");
        break;
      } else {
        newDay = { ...days[days.length - 1] };
        newDay.day = newD;

        if (newD < 10) {
          newDay.path = newDay.path.slice(0, -1) + newD;
        } else {
          newDay.path = newDay.path.slice(0, -2) + newD;
        }
        copyPreviousDay("./sampleday", newDay.path, newDay.day);
        logger(`Folder for day ${newDay.day} Created`, "success");
      }
    } else {
      let newDay = { day: 1, path: path.join(__dirname, "days", "1") };
      if (days.length) {
        newDay = newDay = { ...days[days.length - 1] };
        newDay.day++;
      }
      console.log(newDay);
      if (days.find((d) => d.day === newDay.day)) {
        logger(`Day ${newDay.day} already exists!`, "error");
        break;
      } else {
        if (newDay.day < 10) {
          newDay.path = newDay.path.slice(0, -1) + newDay.day.toString();
        } else {
          newDay.path = newDay.path.slice(0, -2) + newDay.day.toString();
        }
        copyPreviousDay("./sampleday", newDay.path, newDay.day);
        logger(`Folder for day ${newDay.day} Created`, "success");
      }
    }
    break;
  default:
    logger("Usage: node runner.js <command>", "blue");
    logger("Commands: solve, new", "blue");
    logger("solve: execute puzzle from given day", "yellow");
    logger(
      "new: creates directory for a new day including sample files",
      "yellow"
    );
}
