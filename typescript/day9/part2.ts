import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";
import { getDiffSequence } from "./part1";

function predict(sequence: number[]): number {
  if (sequence.every((value) => value === 0)) {
    return 0;
  }

  return sequence[0] - predict(getDiffSequence(sequence));
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const sequences = lines.map((line) =>
    line.split(" ").map((v) => parseInt(v))
  );

  const prediction = sequences.map(predict);

  return sum(prediction);
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
