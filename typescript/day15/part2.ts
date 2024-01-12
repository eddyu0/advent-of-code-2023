import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";
import { hash } from "./part1";

export function solve(input: string): number {
  const inputs = input.split(",");

  const hashmap: Record<number, string[]> = {};

  for (const input of inputs) {
    if (input.includes("-")) {
      const label = input.split("-")[0];
      const boxNumber = hash(label);
      if (boxNumber in hashmap) {
        hashmap[boxNumber] = hashmap[boxNumber].filter(
          (lens) => lens.split(" ")[0] !== label
        );
      }
    } else {
      const [label, focalLength] = input.split("=");
      const boxNumber = hash(label);
      if (!(boxNumber in hashmap)) {
        hashmap[boxNumber] = [`${label} ${focalLength}`];
      } else {
        const replaceIndex = hashmap[boxNumber].findIndex(
          (lens) => lens.split(" ")[0] === label
        );
        if (replaceIndex >= 0) {
          hashmap[boxNumber].splice(replaceIndex, 1, `${label} ${focalLength}`);
        } else {
          hashmap[boxNumber].push(`${label} ${focalLength}`);
        }
      }
    }
  }

  let result = 0;

  for (const [boxNumber, lenses] of Object.entries(hashmap)) {
    result += sum(
      lenses.map(
        (lens, index) =>
          (parseInt(boxNumber) + 1) * (index + 1) * parseInt(lens.split(" ")[1])
      )
    );
  }

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
