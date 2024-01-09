import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [
  [
    [
      `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
    ],
    64,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
