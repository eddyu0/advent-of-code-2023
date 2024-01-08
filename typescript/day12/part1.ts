import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";

export function enumerate(
  springs: string,
  damages: number[],
  seenHash: boolean
): number {
  if (springs === "") {
    return damages.length === 0 || (damages.length === 1 && damages[0] === 0)
      ? 1
      : 0;
  }
  switch (springs[0]) {
    case ".":
      if (damages.length > 0 && damages[0] > 0) {
        if (seenHash) {
          return 0;
        }
        return enumerate(springs.slice(1), damages, false);
      }
      return enumerate(springs.slice(1), damages.slice(1), false);
    case "#":
      // valid case: [1+, ...]
      if (damages.length === 0 || damages[0] === 0) {
        return 0;
      }
      return enumerate(
        springs.slice(1),
        [damages[0] - 1, ...damages.slice(1)],
        true
      );
    case "?":
      if (damages.length === 0) {
        // has to be .
        return enumerate(springs.slice(1), damages.slice(1), false);
      }
      if (seenHash) {
        return damages[0] === 0
          ? // . case
            enumerate(springs.slice(1), damages.slice(1), false)
          : // # case
            enumerate(
              springs.slice(1),
              [damages[0] - 1, ...damages.slice(1)],
              true
            );
      }
      const dotCase = enumerate(springs.slice(1), damages, false);
      const hashCase = enumerate(
        springs.slice(1),
        [damages[0] - 1, ...damages.slice(1)],
        true
      );
      return dotCase + hashCase;

    default:
      throw new Error("This should be unreachable");
  }
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const arrangements = lines
    .map((line) => line.split(" "))
    .map((line) =>
      enumerate(
        line[0],
        line[1].split(",").map((damage) => parseInt(damage)),
        false
      )
    );

  return sum(arrangements);
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
