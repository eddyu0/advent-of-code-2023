import { readFileSync } from "fs";
import path from "path";

function countMatch(line: string) {
  const [winningSection, pickedSection] = line.split("|");

  const winningNumbers = winningSection.split(": ")[1].split(/\ +/);
  const pickedNumbers = pickedSection.trim().split(/\ +/);

  return pickedNumbers.filter((picked) => winningNumbers.includes(picked))
    .length;
}

function countCopies(cardsMatches: number[], cardsCopies: number[]): number {
  if (cardsCopies.length === 1) {
    return cardsCopies[0];
  }

  const [currentCardMatches, ...restCardsMatches] = cardsMatches;

  const [currentCardCopies, ...restCardsCopies] = cardsCopies;

  const newCopies = restCardsCopies.map((count, index) =>
    index < currentCardMatches ? count + currentCardCopies : count
  );

  return currentCardCopies + countCopies(restCardsMatches, newCopies);
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const matches = lines.map(countMatch);

  const copies = Array(matches.length).fill(1);

  const totalCopies = countCopies(matches, copies);

  return totalCopies;
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
