import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";

const cache: Record<string, number> = {};

export function enumerate(springs: string, damages: number[]): number {
  if (springs === "") {
    return damages.length === 0 ? 1 : 0;
  }
  if (damages.length === 0) {
    return springs.includes("#") ? 0 : 1;
  }

  let arrangements = 0;

  const key = `${springs} ${damages.join(",")}`;

  if (key in cache) {
    return cache[key];
  }

  // . case
  if (".?".includes(springs[0])) {
    arrangements += enumerate(springs.slice(1), damages);
  }

  // # case
  if ("#?".includes(springs[0])) {
    if (
      springs.length >= damages[0] &&
      (springs.length === damages[0] || springs[damages[0]] !== "#") &&
      !springs.slice(0, damages[0]).includes(".")
    ) {
      arrangements += enumerate(
        springs.slice(damages[0] + 1),
        damages.slice(1)
      );
    }
  }

  cache[key] = arrangements;

  return arrangements;
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const arrangements = lines
    .map((line) => line.split(" "))
    .map((line, index) => {
      const result = enumerate(
        Array(5).fill(line[0]).join("?"),
        Array(5)
          .fill(line[1])
          .join(",")
          .split(",")
          .map((damage) => parseInt(damage))
      );
      return result;
    });

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
