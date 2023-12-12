import { readFileSync } from "fs";
import path from "path";

/**
 * read seeds: number[]
 *
 * build seed to soil map
 * [[start, offset], [start, offset]]
 *
 */

function parseMapping(mapping: string): [number, number, number] {
  const [destStart, sourceStart, range] = mapping
    .split(" ")
    .map((value) => parseInt(value));

  const offset = destStart - sourceStart;

  return [sourceStart, range, offset];
}

export function buildMap(mapStr: string) {
  const mappings = mapStr.split("\n").slice(1);

  const map = mappings
    .map(parseMapping)
    .sort((map1, map2) => map1[0] - map2[0]);

  return map;
}

export function transform(seed: number, maps: [number, number, number][][]) {
  let result = seed;

  for (const mapping of maps) {
    for (const [rangeStart, range, offset] of mapping) {
      if (result < rangeStart) {
        break;
      }
      if (result > rangeStart + range - 1) {
        continue;
      }
      if (result >= rangeStart && result <= rangeStart + range - 1) {
        result = result + offset;
        break;
      }
    }
  }

  return result;
}

export function solve(input: string): number {
  const lines = input.split("\n\n");

  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => parseInt(seed));
  const maps = lines.slice(1).map(buildMap);

  const locations = seeds.map((seed) => transform(seed, maps));

  const lowest = Math.min(...locations);

  return lowest;
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
