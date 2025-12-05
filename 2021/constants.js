const NS_PER_SEC = 1e9;

const colorCodes = {
  success: "\u001b[1;32m",
  error: "\u001b[1;31m",
  yellow: "\u001b[1;33m",
  blue: "\u001b[1;34m",
  purple: "\u001b[1;35m",
  cyan: "\u001b[1;36m",
  normal: "\u001b[0m",
};

const colors = [
  { name: "error", code: "\u001b[1;31m" },
  { name: "success", code: "\u001b[1;32m" },
  { name: "yellow", code: "\u001b[1;33m" },
  { name: "blue", code: "\u001b[1;34m" },
  { name: "purple", code: "\u001b[1;35m" },
  { name: "cyan", code: "\u001b[1;36m" },
];

module.exports = {
  NS_PER_SEC,
  colorCodes,
  colors,
};
