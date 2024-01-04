import { runTest } from "../test-runner";
import { solve } from "./part1";

const testCases: [[string], number][] = [
  [
    [
      `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
    ],
    4,
  ],
  [
    [
      `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
    ],
    8,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
