import { readFileSync } from "fs";
import path from "path";

/**
 * for each line l
 *  find all number, with its (start index, end index)
 * for each number, probe its surrounding
 *  input[l - 1][start index - 1] -> input[l - 1][end index + 1]
 *  input[l][start index - 1], input[l][end index - 1]
 *  input[l + 1][start index - 1] -> input[l + 1][end index + 1]
 * if symbol, push number
 *
 */

function isSymbol(char: string): boolean {
  return "~!@#$%^&*()-_=+/".includes(char);
}

export function solve(input: string): number {
  const lines = input.split("\n");
  let sum = 0;

  lines.forEach((line, row) => {
    const matches = line.matchAll(/(\d+)/g);

    for (const match of matches) {
      const start = Math.max(0, match.index! - 1);
      const end = Math.min(match.index! + match[0].length, line.length);

      // check prev line
      const prevLine =
        row - 1 > 0 ? lines[row - 1].slice(start, end + 1).split("") : [];
      // check start - 1, end + 1 (current line)
      const currentLine = (start >= 0 ? [line[start]] : []).concat(
        end < line.length ? [line[end]] : []
      );
      // check next line
      const nextLine =
        row + 1 < lines.length
          ? lines[row + 1].slice(start, end + 1).split("")
          : [];

      const hasSymbol = prevLine.concat(currentLine, nextLine).some(isSymbol);

      if (hasSymbol) {
        sum += parseInt(match[0]);
      }
    }
  });

  return sum;
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
