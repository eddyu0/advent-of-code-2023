const testCases: [string, number][] = [
  [
    `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
    281,
  ],
];

const DIGIT = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const DIGIT_WORD = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

export function getLineCalibration(line: string): number {
  let first = "";
  let last = "";

  let firstPointer = 0;
  let lastPointer = line.length - 1;

  let firstSlidingWindow = "";
  let lastSlidingWindow = "";

  while (!first || !last) {
    if (firstPointer >= line.length && lastPointer < 0) {
      break;
    }

    if (!first) {
      firstSlidingWindow = firstSlidingWindow + line[firstPointer];

      if (DIGIT.includes(line[firstPointer])) {
        first = line[firstPointer];
      }

      const digitIndexes = DIGIT_WORD.map((word, index) =>
        firstSlidingWindow.includes(word) ? index : null
      ).filter((i) => i !== null) as number[];

      if (digitIndexes.length > 0) {
        first = DIGIT[digitIndexes[0]];
      }

      firstPointer++;

      if (firstSlidingWindow.length >= 5) {
        firstSlidingWindow = firstSlidingWindow.substring(1);
      }
    }

    if (!last) {
      lastSlidingWindow = line[lastPointer] + lastSlidingWindow;

      if (DIGIT.includes(line[lastPointer])) {
        last = line[lastPointer];
      }

      const digitIndexes = DIGIT_WORD.map((word, index) =>
        lastSlidingWindow.includes(word) ? index : null
      ).filter((i) => i !== null) as number[];

      if (digitIndexes.length > 0) {
        last = DIGIT[digitIndexes[0]];
      }

      lastPointer--;

      if (lastSlidingWindow.length >= 5) {
        lastSlidingWindow = lastSlidingWindow.substring(0, 5);
      }
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

import { readFileSync } from "fs";
import path from "path";

const INPUT = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

console.log(getDocCalibrationSum(INPUT));
