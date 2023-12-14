import { runTest } from "../test-runner";
import { solve } from "./part2";

const testCases: [[string], number][] = [[[``], -1]];

function main() {
  runTest(solve, testCases);
}

main();
