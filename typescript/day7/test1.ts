import { runTest } from "../test-runner";
import { solve } from "./part1";

const testCases: [[string], number][] = [
  [
    [
      `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
    ],
    6440,
  ],
  [
    [
      `AA8AA 1
AA2AA 2`,
    ],
    4,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
