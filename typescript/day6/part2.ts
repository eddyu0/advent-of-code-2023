import { readFileSync } from "fs";
import path from "path";
import { Record, predictWins } from "./part1";

function readRecord(input: string): Record {
  const [timeStr, distanceStr] = input.split("\n");

  const time = parseInt(timeStr.split(":")[1].split(" ").join(""));
  const distance = parseInt(distanceStr.split(":")[1].split(" ").join(""));

  return { time, distance };
}

export function solve(input: string): number {
  const record = readRecord(input);
  const result = predictWins([record]);

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
