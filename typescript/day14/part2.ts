import { readFileSync } from "fs";
import path from "path";
import { Position } from "../day10/part1";
import { findLoad } from "./part1";

type Direction = "north" | "west" | "south" | "east";

function roll(pos: Position, direction: Direction, platform: string[][]): void {
  let finalPos = { ...pos };
  if (".#".includes(platform[pos.y][pos.x])) {
    return;
  }
  switch (direction) {
    case "north":
      while (finalPos.y > 0 && platform[finalPos.y - 1][finalPos.x] === ".") {
        finalPos = { y: finalPos.y - 1, x: finalPos.x };
      }
      break;
    case "west":
      while (finalPos.x > 0 && platform[finalPos.y][finalPos.x - 1] === ".") {
        finalPos = { y: finalPos.y, x: finalPos.x - 1 };
      }
      break;
    case "south":
      while (
        finalPos.y < platform.length - 1 &&
        platform[finalPos.y + 1][finalPos.x] === "."
      ) {
        finalPos = { y: finalPos.y + 1, x: finalPos.x };
      }
      break;
    case "east":
      while (
        finalPos.x < platform.length - 1 &&
        platform[finalPos.y][finalPos.x + 1] === "."
      ) {
        finalPos = { y: finalPos.y, x: finalPos.x + 1 };
      }
      break;
    default:
      break;
  }
  platform[pos.y][pos.x] = ".";
  platform[finalPos.y][finalPos.x] = "O";
}

function tiltCycle(platform: string[][]) {
  for (const direction of ["north", "west"] as Direction[]) {
    for (let row = 0; row < platform.length; row++) {
      for (let col = 0; col < platform[0].length; col++) {
        roll({ y: row, x: col }, direction, platform);
      }
    }
  }
  for (const direction of ["south", "east"] as Direction[]) {
    for (let row = platform.length - 1; row >= 0; row--) {
      for (let col = platform[0].length - 1; col >= 0; col--) {
        roll({ y: row, x: col }, direction, platform);
      }
    }
  }
}

function encodePlatform(platform: string[][]) {
  return platform.map((row) => row.join("")).join("\n");
}

function tiltTrillion(platform: string[][]) {
  const seen = [encodePlatform(platform)];
  tiltCycle(platform);
  while (!seen.includes(encodePlatform(platform))) {
    seen.push(encodePlatform(platform));
    tiltCycle(platform);
  }
  const cycleLength =
    seen.length - seen.findIndex((p) => p === encodePlatform(platform));

  const remainingCycles = (1_000_000_000 - seen.length) % cycleLength;

  for (let i = 0; i < remainingCycles; i++) {
    tiltCycle(platform);
  }
  return platform;
}

// tilt cycle for north, west, south, east
// find cycle length when start === end
// calculate remaining cycle upon repeating the cycle to 1_000_000_000
// run tilt cycle for the remaining cycles
export function solve(input: string): number {
  const platform = input.split("\n").map((line) => line.split(""));

  const newPlatform = tiltTrillion(platform);
  const load = findLoad(newPlatform);

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
