const { parseTextFile, logger } = require("../../helpers");
const isNumber = 0;

function part1(isTest) {
  logger(
    `\n---------- Day 7 part 1 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );
  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  input.shift();
  let solution = 0;
  const sizeLimit = 100000;
  const { directories } = mapDirectories(input);
  const finalDirectories = directories.filter((d) => d.size <= sizeLimit);
  solution = finalDirectories.reduce((partial, a) => partial + a.size, 0);
  console.log(
    "Sum of the total size of directories under",
    sizeLimit,
    ":",
    solution
  );
}

function part2(isTest) {
  logger(
    `\n---------- Day 7 part 2 ${isTest ? "(TESTINPUT)" : ""} ----------`,
    "cyan"
  );

  const input = parseTextFile(__dirname, isTest, isNumber, "\n");
  input.shift();

  const FILESYSTEMLIMIT = 70000000;
  const UNUSEDPSPACELIMIT = 30000000;
  let solution = 0;

  const { directories, root } = mapDirectories(input);
  let unusedSpace = FILESYSTEMLIMIT - root.size;
  let neededSpace = UNUSEDPSPACELIMIT - unusedSpace;
  solution = directories
    .filter((d) => d.size >= neededSpace)
    .sort((a, b) => a.size - b.size)[0];
  console.log(
    `Smallest: ${solution.name}, increasing unused space by`,
    solution.size
  );
}

function mapDirectories(input) {
  let currentDirectory = {
    name: "/",
    path: "",
    files: [],
    isRoot: true,
    parent: null,
    size: 0,
  };
  let directories = [currentDirectory];
  let currentCommand = "";
  input.forEach((line) => {
    let input = line.split(" ");
    if (line.startsWith("$")) {
      let command = input[1];
      switch (command) {
        case "cd":
          currentCommand = "cd";
          let argument = input[2];
          if (argument === "..") {
            if (currentDirectory.parent !== null) {
              currentDirectory = directories.find(
                (dir) => dir.path === currentDirectory.parent
              );
            }
          } else {
            let d = directories.find(
              (dir) => dir.path === `${currentDirectory.path}/${input[2]}`
            );
            if (d) {
              currentDirectory = d;
            } else {
              currentDirectory = {
                id: directories.length,
                name: input[2],
                path: `${currentDirectory.path}/${input[2]}`,
                files: [],
                isRoot: false,
                parent: currentDirectory.path,
                size: 0,
              };
              directories.push(currentDirectory);
            }
          }

          break;
        case "ls":
          currentCommand = "ls";
          break;
        default:
          console.log("wtf");
      }
    } else {
      if (currentCommand === "ls") {
        let file = {
          name: input[1],
          path: `${currentDirectory.path}/${input[1]}`,
        };
        if (input[0] === "dir") {
          file.isDirectory = true;
          file.size = 0;
        } else {
          file.isDirectory = false;
          file.size = Number(input[0]);
        }
        currentDirectory.files.push(file);
      }
    }
  });

  let root = directories.find((d) => d.isRoot === true);
  root.size = calculateDirectorySize(root, directories);
  return {
    directories,
    root,
  };
}

function calculateDirectorySize(dir, directories) {
  let size = 0;
  dir.files.forEach((file) => {
    if (file.isDirectory) {
      let d = directories.find((f) => f.path === file.path);
      let s = calculateDirectorySize(d, directories);
      size += s;
      d.size = s;
      file.size = s;
    } else {
      size += file.size;
    }
  });
  return size;
}

module.exports = {
  part1,
  part2,
};
