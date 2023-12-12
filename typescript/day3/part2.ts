import { readFileSync } from "fs";
import path from "path";

/**
 * find * with adjacent number
 *
 * find all * with its (row, index)
 * for each *, probe surrounding 8 block
 *  row-1 .. row+1
 *    index-1 .. index+1
 * if isNumber, expand selection, push number, get start&end index, save checked blocks
 * skip if blocks checked
 */

function isDigit(char: string): boolean {
  return "0123456789".includes(char);
}

export function solve(input: string): number {
  const lines = input.split("\n");

  let sum = 0;
  lines.forEach((line, row) => {
    const stars = line.matchAll(/(\*)/g);

    for (const match of stars) {
      const index = match.index!;

      const lineStart = Math.max(0, row - 1);
      const lineEnd = Math.min(row + 1, lines.length - 1);

      const indexStart = Math.max(0, index - 1);
      const indexEnd = Math.min(index + 1, line.length - 1);

      const skipBlocks = [[row, index]];
      const gears = [];

      for (let j = lineStart; j <= lineEnd; j++) {
        for (let i = indexStart; i <= indexEnd; i++) {
          if (skipBlocks.some(([row, index]) => j === row && i === index)) {
            continue;
          }

          if (isDigit(lines[j][i])) {
            skipBlocks.push([j, i]);
            // expand selection
            let gear = lines[j][i];
            let left = i - 1;
            let right = i + 1;
            while (left >= 0) {
              skipBlocks.push([j, left]);
              if (!isDigit(lines[j][left])) {
                break;
              }
              gear = lines[j][left] + gear;
              left--;
            }
            while (right < lines.length) {
              skipBlocks.push([j, right]);
              if (!isDigit(lines[j][right])) {
                break;
              }
              gear = gear + lines[j][right];
              right++;
            }
            gears.push(parseInt(gear));
          }
        }
      }

      if (gears.length === 2) {
        const gearRatio = gears[0] * gears[1];
        sum += gearRatio;
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
