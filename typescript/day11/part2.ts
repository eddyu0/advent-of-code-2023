import { readFileSync } from "fs";
import path from "path";
import { Position } from "../day10/part1";
import { sum } from "../util";
import { findPairs } from "./part1";

type Expansion = {
  row: number[];
  col: number[];
};

function findExpansion(universe: string[]): Expansion {
  const emptyRows: number[] = [];
  const nonEmptyCols: number[] = [];
  for (let y = 0; y < universe.length; y++) {
    let isEmptyRow = true;
    for (let x = 0; x < universe[0].length; x++) {
      if (universe[y][x] === "#") {
        isEmptyRow = false;

        if (!nonEmptyCols.includes(x)) {
          nonEmptyCols.push(x);
        }
      }
    }
    if (isEmptyRow) {
      emptyRows.push(y);
    }
  }
  const emptyCols = [...Array(universe[0].length).keys()].filter(
    (col) => !nonEmptyCols.includes(col)
  );

  return { row: emptyRows, col: emptyCols };
}

function pairDistance(
  galaxy1: Position,
  galaxy2: Position,
  expansion: Expansion,
  multiplier: number
): number {
  const rangeX = [galaxy1.x, galaxy2.x].sort((a, b) => a - b);
  const rangeY = [galaxy1.y, galaxy2.y].sort((a, b) => a - b);

  let distanceX = 0;
  let distanceY = 0;

  for (let x = rangeX[0] + 1; x <= rangeX[1]; x++) {
    distanceX += expansion.col.includes(x) ? multiplier : 1;
  }

  for (let y = rangeY[0] + 1; y <= rangeY[1]; y++) {
    distanceY += expansion.row.includes(y) ? multiplier : 1;
  }

  return distanceX + distanceY;
}

export function solve(input: string, multiplier: number): number {
  const lines = input.split("\n");

  const expansion = findExpansion(lines);
  const pairs = findPairs(lines);

  const distance = sum(
    pairs.map((pair) => pairDistance(...pair, expansion, multiplier))
  );

  return distance;
}

function main() {
  const input = readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  const result = solve(input, 1_000_000);
  console.log(result);
}

if (require.main === module) {
  main();
}
