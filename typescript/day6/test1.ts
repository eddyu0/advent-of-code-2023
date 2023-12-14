import { runTest } from "../test-runner";
import { solve } from "./part1";

const testCases: [[string], number][] = [
  [
    [
      `Time:      7  15   30
Distance:  9  40  200`,
    ],
    288,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
