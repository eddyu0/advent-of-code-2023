export function runTest<T extends readonly any[]>(
  solver: (...args: T) => number,
  testCases: [T, number][]
) {
  testCases.forEach((testCase, i) => {
    console.log(`test case ${i}`);
    const result = solver(...testCase[0]);
    if (result === testCase[1]) {
      console.log("PASSED");
    } else {
      console.error(`FAILED. Expect ${testCase[1]}, received ${result}`);
    }
  });
}
