import { runTest } from "../test-runner";
import { solve } from "./part1";

const testCases: [[string], number][] = [
  [
    [
      `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
    ],
    2,
  ],
  [
    [
      `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
    ],
    6,
  ],
];

function main() {
  runTest(solve, testCases);
}

main();
