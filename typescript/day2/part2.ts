import { readFileSync } from "fs";
import path from "path";
import { Constraint } from "./part1";

function getPower(line: string): number {
  const [_, setsString] = line.split(":");

  const sets = setsString.split(";");
  const { red, green, blue } = sets.reduce(
    (minSet, set) => {
      set
        .split(",")
        .map((draw) => draw.trim().split(" ") as [string, keyof Constraint])
        .forEach(([count, color]) => {
          if (parseInt(count) > minSet[color]) {
            minSet[color] = parseInt(count);
          }
        });

      return minSet;
    },
    { red: 0, green: 0, blue: 0 }
  );
  const power = red * green * blue;

  return power;
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const result = lines
    .map((line) => getPower(line))
    .reduce((sum, power) => sum + power, 0);

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
