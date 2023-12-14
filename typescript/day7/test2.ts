import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [
  [
    [
      `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
    ],
    5905,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
