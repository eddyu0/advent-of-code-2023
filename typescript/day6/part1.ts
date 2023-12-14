import { readFileSync } from "fs";
import path from "path";
import { zip } from "../util";

export type Record = {
  time: number;
  distance: number;
};

function readRecord(input: string): Record[] {
  const [timeStr, distanceStr] = input.split("\n");
  const times = timeStr
    .split(":")[1]
    .trim()
    .split(/\ +/)
    .map((t) => parseInt(t));
  const distances = distanceStr
    .split(":")[1]
    .trim()
    .split(/\ +/)
    .map((d) => parseInt(d));

  const records = zip(times, distances, (time, distance) => ({
    time,
    distance,
  }));

  return records;
}

// distance = pressed * (time - pressed)
// distance = time * pressed - pressed^2

// for each { time, distance }
// solve for x: distance < time * x - x^2
// -x^2 + time * x - distance > 0
// (-b +/-sqrt(b^2 - 4ac))/2a > 0
// (-time +/-sqrt(time^2 - 4 * -1 * -distance)) / -2 > 0
export function predictWins(records: Record[]) {
  let wins = [];

  for (const record of records) {
    const { time, distance } = record;

    const solution1 =
      (-1 * time + Math.sqrt(time ** 2 - 4 * -1 * -1 * distance)) / -2;
    const solution2 =
      (-1 * time - Math.sqrt(time ** 2 - 4 * -1 * -1 * distance)) / -2;

    const start = Math.floor(solution1 + 1);
    const stop = Math.ceil(solution2 - 1);

    const waysToWin = Math.floor(stop) - Math.ceil(start) + 1;

    wins.push(waysToWin);
  }

  return wins.reduce((total, win) => total * win, 1);
}

export function solve(input: string): number {
  const records = readRecord(input);

  const wins = predictWins(records);
  return wins;
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
