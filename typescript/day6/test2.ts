import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [
  [
    [
      `Time:      7  15   30
Distance:  9  40  200`,
    ],
    71503,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
