import { readFileSync } from "fs";
import path from "path";
import { buildMap } from "./part1";

function getSeedsRanges(seeds: number[]): [number, number][] {
  const seedRanges = seeds
    .map((start, index) => (index % 2 === 0 ? [start, seeds[index + 1]] : null))
    .filter((seedRange): seedRange is [number, number] => seedRange !== null)
    .sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);

  return seedRanges;
}

/**
 * Range splitting cases
 * ------------------------
 * [seed]
 *        [mapping]
 *
 * --- break: id(seed start, seed end) ---
 *
 * ------------------------
 * [seed]
 *    [mapping]
 *
 * --- seed start < map start: id(seed start, map start) ---
 * --- seed end > map start: map(map start, seed end) ---
 *
 * ------------------------
 * [   seed   ]
 *  [mapping]
 *
 * --- seed start < map start: id(seed start, map start)
 * --- seed start < map start, seed end > map end: map(map start, map end)
 * --- seed end > map end: continue: id(map end, seed end)
 *
 * ------------------------
 *  [seed]
 * [mapping]
 *
 * --- return map(seed start, seed end)
 *
 * ------------------------
 *       [seed]
 * [mapping]
 *
 * --- map(seed start, map end)
 * --- continue: id(map end, seed end)
 *
 * ------------------------
 *            [seed]
 * [mapping]
 *
 * --- continue: id(seed start, seed end) ---
 *
 */

// Transform 1 layer of ranges with 1 layer of map
function transformRange(
  range: [number, number],
  map: [number, number, number][]
) {
  let inputRange: [number, number] | null = range;
  let outputRanges: [number, number][] = [];

  for (const mapping of map) {
    if (!inputRange) {
      break;
    }

    const [seedStart, seedRange] = inputRange;
    const [mapStart, mapRange, offset] = mapping;

    const seedEnd = seedStart + seedRange - 1;
    const mapEnd = mapStart + mapRange - 1;

    inputRange = null;

    if (seedStart < mapStart) {
      const idRangeLength =
        seedEnd < mapStart ? seedRange : mapStart - seedStart;
      const idRange = [seedStart, idRangeLength] as [number, number];
      outputRanges.push(idRange);

      if (seedEnd < mapStart) {
        break;
      }
    }

    if (seedStart <= mapEnd) {
      const toMapStart = seedStart < mapStart ? mapStart : seedStart;
      const toMapRangeLength =
        seedEnd <= mapEnd ? seedEnd - toMapStart + 1 : mapEnd - toMapStart + 1;
      const mappedRange = [toMapStart + offset, toMapRangeLength] as [
        number,
        number
      ];
      outputRanges.push(mappedRange);
    }

    if (seedEnd > mapEnd) {
      const restStart = seedStart > mapEnd ? seedStart : mapEnd;
      const restRangeLength = seedEnd - restStart + 1;
      inputRange = [restStart, restRangeLength] as [number, number];
      continue;
    }
  }

  if (inputRange !== null) {
    outputRanges.push(inputRange);
  }

  return outputRanges;
}

export function solve(input: string): number {
  const lines = input.split("\n\n");

  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => parseInt(seed));

  const seedsRanges = getSeedsRanges(seeds);

  const maps = lines.slice(1).map(buildMap);

  let outputRanges = seedsRanges;

  for (const map of maps) {
    outputRanges = outputRanges.flatMap((range) => transformRange(range, map));
  }

  const lowest = Math.min(...outputRanges.map((o) => o[0]));

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

// ! This runs out of memory
function enumerateSeeds(seedRanges: number[]): number[] {
  const seeds = seedRanges
    .map((start, index) =>
      index % 2 === 0 ? [start, seedRanges[index + 1]] : null
    )
    .filter((seedRange): seedRange is number[] => seedRange !== null)
    .flatMap(([start, range]) =>
      [...Array(range).keys()].map((_, index) => start + index)
    );

  return seeds;
}
