import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";

export function hash(input: string): number {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    result += input[i].charCodeAt(0);
    result *= 17;
    result %= 256;
  }

  return result;
}

export function solve(input: string): number {
  const inputs = input.split(",");

  const result = sum(inputs.map(hash));

  return result;
}

function main() {
  const input = readFileSync(path.join(__dirname, "./input.txt"), {
    encoding: "utf-8",
  });

  const result = solve(input);
  console.log(result);
}

if (require.main === module) {
  main();
}
