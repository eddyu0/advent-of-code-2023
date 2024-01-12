import { runTest } from "../test-runner";
import { solve } from "./part1";

const testCases: [[string], number][] = [
  [[`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`], 1320],
];

function main() {
  runTest(solve, testCases);
}

main();