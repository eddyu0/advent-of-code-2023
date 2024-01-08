import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [
  [
    [
      `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
    ],
    400,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
