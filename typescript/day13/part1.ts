import { readFileSync } from "fs";
import path from "path";

function isColumnSame(col1: number, col2: number, pattern: string[]): boolean {
  for (let row = 0; row < pattern.length; row++) {
    if (pattern[row][col1] !== pattern[row][col2]) {
      return false;
    }
  }
  return true;
}

function checkVerticalReflection(
  row1: number,
  row2: number,
  pattern: string[]
): boolean {
  while (row1 >= 0 && row2 < pattern.length) {
    if (pattern[row1] !== pattern[row2]) {
      return false;
    }
    row1--;
    row2++;
  }
  return true;
}

function checkHorizontalReflection(
  col1: number,
  col2: number,
  pattern: string[]
): boolean {
  while (col1 >= 0 && col2 < pattern[0].length) {
    if (!isColumnSame(col1, col2, pattern)) {
      return false;
    }
    col1--;
    col2++;
  }
  return true;
}

export function solve(input: string): number {
  const patterns = input.split("\n\n").map((pattern) => pattern.split("\n"));

  let result = 0;

  for (const pattern of patterns) {
    let patternSolved = false;
    for (let row1 = 0; row1 < pattern.length - 1 && !patternSolved; row1++) {
      const row2 = row1 + 1;
      if (checkVerticalReflection(row1, row2, pattern)) {
        result += (row1 + 1) * 100;
        patternSolved = true;
      }
    }

    for (let col1 = 0; col1 < pattern[0].length - 1 && !patternSolved; col1++) {
      const col2 = col1 + 1;
      if (checkHorizontalReflection(col1, col2, pattern)) {
        result += col1 + 1;
        patternSolved = true;
      }
    }
  }

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
