import { readFileSync } from "fs";
import path from "path";

export type Position = { y: number; x: number };

export const Direction = {
  north: "north",
  east: "east",
  south: "south",
  west: "west",
} as const;

export type Direction = keyof typeof Direction;

const Connections = {
  north: ["|", "7", "F", "S"],
  south: ["|", "L", "J", "S"],
  east: ["-", "J", "7", "S"],
  west: ["-", "L", "F", "S"],
};

export function isSame(pos1: Position, pos2: Position): boolean {
  return pos1.y === pos2.y && pos1.x === pos2.x;
}

function flipDirection(direction: Direction): Direction {
  switch (direction) {
    case "north":
      return "south";
    case "south":
      return "north";
    case "east":
      return "west";
    case "west":
      return "east";
    default:
      throw new Error("unknown direction");
  }
}

export function findStart(lines: string[]): Position {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "S") {
        return { y, x };
      }
    }
  }
  throw new Error("Starting point not found");
}

export function getNextPos(pos: Position, direction: Direction): Position {
  switch (direction) {
    case "north":
      return { y: pos.y - 1, x: pos.x };
    case "south":
      return { y: pos.y + 1, x: pos.x };
    case "east":
      return { y: pos.y, x: pos.x + 1 };
    case "west":
      return { y: pos.y, x: pos.x - 1 };
    default:
      throw new Error("Unknown direction");
  }
}

export function getPipe(pos: Position, lines: string[]): string {
  return lines[pos.y][pos.x];
}

export function isOutOfBound(
  pos: Position,
  lines: string[] | string[][]
): boolean {
  return !(
    pos.x >= 0 &&
    pos.x < lines[0].length &&
    pos.y >= 0 &&
    pos.y < lines.length
  );
}

export function next(from: Position, pos: Position, lines: string[]): Position {
  const pipe = getPipe(pos, lines);
  for (const direction of Object.values(Direction)) {
    const nextPos = getNextPos(pos, direction);
    if (isSame(nextPos, from) || isOutOfBound(nextPos, lines)) {
      continue;
    }
    const nextPipe = getPipe(nextPos, lines);
    if (
      Connections[direction].includes(nextPipe) &&
      Connections[flipDirection(direction)].includes(pipe)
    ) {
      return nextPos;
    }
  }
  throw new Error("No connecting Pipe found");
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const start = findStart(lines);

  let prevFront = start;
  let prevBack = start;
  let front = next(start, start, lines);
  let back = next(front, start, lines);
  let distance = 1;

  while (!isSame(front, back)) {
    const nextFront = next(prevFront, front, lines);
    const nextBack = next(prevBack, back, lines);

    if (isSame(nextFront, back) && isSame(nextBack, front)) {
      return distance;
    }

    prevFront = front;
    prevBack = back;
    front = nextFront;
    back = nextBack;
    distance++;
  }

  return distance;
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
