import { readFileSync } from "fs";
import path from "path";

export function solve(input: string): number {
  const lines = input.split("\n");
  const result = 0;

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
