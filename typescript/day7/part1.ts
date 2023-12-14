import { readFileSync } from "fs";
import path from "path";
import { sum } from "../util";

const cards = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
].reverse();

function getCardStrength(card: string): number {
  return cards.indexOf(card);
}

function getHandType(hand: string): number {
  const counts: [string, number][] = [];

  for (const char of hand.split("")) {
    const currentCount = counts.find((count) => count[0] === char);
    currentCount ? currentCount[1]++ : counts.push([char, 1]);
  }

  switch (counts.length) {
    case 1: // AAAAA
      return 6;
    case 2: // AAAA2 AAA22
      return counts.map((count) => count[1]).includes(4) ? 5 : 4;
    case 3: // AAA23 AA223
      return counts.map((count) => count[1]).includes(3) ? 3 : 2;
    case 4: // AA234
      return 1;
    default:
      return 0;
  }
}

function sortHands(hand1: [string, number], hand2: [string, number]): number {
  const hand1Type = getHandType(hand1[0]);
  const hand2Type = getHandType(hand2[0]);

  if (hand1Type !== hand2Type) {
    return hand1Type - hand2Type;
  }

  for (let i = 0; i < hand1[0].length; i++) {
    const cardStrength1 = getCardStrength(hand1[0][i]);
    const cardStrength2 = getCardStrength(hand2[0][i]);

    if (cardStrength1 === cardStrength2) {
      continue;
    }

    return cardStrength1 - cardStrength2;
  }

  return 0;
}

export function readHand(line: string): [string, number] {
  const [hand, bid] = line.split(" ");

  return [hand, parseInt(bid)];
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const hands = lines.map(readHand).sort(sortHands);

  const winnings = hands.map((hand, index) => (index + 1) * hand[1]);

  let result = sum(winnings);

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
