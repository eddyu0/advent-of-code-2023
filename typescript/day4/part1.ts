import { readFileSync } from "fs";
import path from "path";

function getPoint(line: string): number {
  const [winningSection, pickedSection] = line.split("|");

  const winningNumbers = winningSection.split(": ")[1].split(/\ +/);
  const pickedNumbers = pickedSection.trim().split(/\ +/);

  let point = 0;

  pickedNumbers.forEach((picked) => {
    if (winningNumbers.includes(picked)) {
      point = point === 0 ? 1 : point * 2;
    }
  });

  return point;
}

// for each line
// separate out winning numbers and picked numbers
// let point = 0
// for each picked number, check if it's in winning set
// point = 0 ? 1 : point * 2
export function solve(input: string): number {
  const lines = input.split("\n");

  const result = lines
    .map((line) => getPoint(line))
    .reduce((sum, point) => (sum += point), 0);

  return result;
}

function main() {
  const input = readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  const result = solve(input);
  console.log(result);
}

if (require.main === module) {
  main();
}
