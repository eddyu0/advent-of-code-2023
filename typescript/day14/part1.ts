import { readFileSync } from "fs";
import path from "path";

function tilt(platform: string[][]): string[][] {
  for (let row = 1; row < platform.length; row++) {
    for (let col = 0; col < platform[0].length; col++) {
      if (".#".includes(platform[row][col])) {
        continue;
      }
      let finalRow = row;
      while (finalRow > 0 && platform[finalRow - 1][col] === ".") {
        finalRow--;
      }
      platform[row][col] = ".";
      platform[finalRow][col] = "O";
    }
  }
  return platform;
}

export function findLoad(platform: string[][]): number {
  let totalLoad = 0;
  for (let row = 0; row < platform.length; row++) {
    const loadLevel = platform.length - row;
    const loadRow = platform[row].filter((x) => x === "O").length * loadLevel;
    totalLoad += loadRow;
  }
  return totalLoad;
}

export function solve(input: string): number {
  const platform = input.split("\n").map((line) => line.split(""));
  const tiltedPlatform = tilt(platform);
  const load = findLoad(tiltedPlatform);

  return load;
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
