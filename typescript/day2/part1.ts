import { readFileSync } from "fs";
import path from "path";

export type Constraint = {
  red: number;
  green: number;
  blue: number;
};

function parseGame(line: string, constraint: Constraint): number {
  const [gameIdString, setsString] = line.split(":");
  const gameId = gameIdString.match(/^Game (\d+)/)?.[1];

  if (!gameId) {
    throw new Error("Invalid Game id format");
  }

  const sets = setsString.split(";");

  const possible = sets.every((set) =>
    set.split(",").every((draw) => {
      const [count, color] = draw.trim().split(" ");
      return parseInt(count) <= constraint[color as keyof Constraint];
    })
  );

  return possible ? parseInt(gameId) : 0;
}

export function solve(input: string, constraint: Constraint): number {
  const lines = input.split("\n");
  const result = lines
    .map((line) => parseGame(line, constraint))
    .reduce((sum, id) => sum + id, 0);

  return result;
}

function main() {
  const input = readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  const constraint = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const result = solve(input, constraint);
  console.log(result);
}

if (require.main === module) {
  main();
}
