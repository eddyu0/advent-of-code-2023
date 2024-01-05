import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";
import { Position } from "./../day10/part1";

function expandUniverse(lines: string[]): string[] {
  const emptyRows: number[] = [];
  const nonEmptyCols: number[] = [];
  for (let y = 0; y < lines.length; y++) {
    let isEmptyRow = true;
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "#") {
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
  const emptyCols = [...Array(lines[0].length).keys()].filter(
    (col) => !nonEmptyCols.includes(col)
  );

  const newUniverse = lines.flatMap((line, index) => {
    const newRow = expandColumn(line, emptyCols);
    if (emptyRows.includes(index)) {
      return [newRow, newRow];
    }
    return newRow;
  });

  return newUniverse;
}

function expandColumn(line: string, cols: number[]): string {
  return line
    .split("")
    .map((col, index) => (cols.includes(index) ? col.repeat(2) : col))
    .join("");
}

function pairDistance(galaxy1: Position, galaxy2: Position): number {
  return Math.abs(galaxy2.x - galaxy1.x) + Math.abs(galaxy2.y - galaxy1.y);
}

export function findPairs(universe: string[]): [Position, Position][] {
  const galaxies: Position[] = [];
  const pairs: [Position, Position][] = [];
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe[0].length; x++) {
      if (universe[y][x] === "#") {
        galaxies.push({ y, x });
      }
    }
  }

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      pairs.push([galaxies[i], galaxies[j]]);
    }
  }

  return pairs;
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const newUniverse = expandUniverse(lines);
  const pairs = findPairs(newUniverse);

  const distance = sum(pairs.map((pair) => pairDistance(...pair)));

  return distance;
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
