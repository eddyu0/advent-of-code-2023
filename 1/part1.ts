import { readFileSync } from "fs";
import path from "path";

const testCases: [string, number][] = [
  [
    `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
    142,
  ],
];

const DIGIT = "0123456789";

export function getLineCalibration(line: string): number {
  let first = "";
  let last = "";

  let firstPointer = 0;
  let lastPointer = line.length - 1;

  while (!first || !last) {
    if (firstPointer >= line.length && lastPointer < 0) {
      break;
    }
    if (!first) {
      if (DIGIT.includes(line[firstPointer])) {
        first = line[firstPointer];
      }
      firstPointer++;
    }

    if (!last) {
      if (DIGIT.includes(line[lastPointer])) {
        last = line[lastPointer];
      }
      lastPointer--;
    }
  }

  const result = parseInt(first + last);
  return isNaN(result) ? 0 : result;
}

export function getDocCalibrationSum(doc: string) {
  const line = doc.split("\n");
  const calibrations = line.map((line) => getLineCalibration(line));
  return calibrations.reduce((sum, val) => sum + val, 0);
}

testCases.forEach((testCase, i) => {
  console.log(`test case ${i}`);
  const result = getDocCalibrationSum(testCase[0]);
  if (result === testCase[1]) {
    console.log("PASSED");
  } else {
    throw new Error(`FAILED. Expect ${testCase[1]}, received ${result}`);
  }
});

const INPUT = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

console.log(getDocCalibrationSum(INPUT));
