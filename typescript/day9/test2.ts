import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [
  [
    [
      `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
    ],
    2,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
