import { readFileSync } from "fs";
import path from "path";
import {
  Direction,
  Position,
  findStart,
  getNextPos,
  getPipe,
  isOutOfBound,
  isSame,
  next,
} from "./part1";

function oppositeWall(direction: Direction): string {
  switch (direction) {
    case "north":
    case "south":
      return "-";

    case "east":
    case "west":
      return "|";
    default:
      throw new Error("Unknown direction");
  }
}

// walk four direction
// all direction has met odd number of wall
// a 'z' turn of wall should also be counted
function isWithinLoop(
  pos: Position,
  loop: Position[],
  lines: string[]
): boolean {
  for (let direction of Object.values(Direction)) {
    let currentPos = pos;
    let wallMet = 0;
    let nextPos = getNextPos(currentPos, direction);
    let lastSeenCorners = "";
    while (!isOutOfBound(nextPos, lines)) {
      if (loop.some((wall) => isSame(wall, nextPos))) {
        const pipe = getPipe(nextPos, lines);
        if (pipe === oppositeWall(direction)) {
          wallMet++;
        }
        if (["L", "J", "7", "F"].includes(pipe)) {
          lastSeenCorners += pipe;
          if (lastSeenCorners.length === 2) {
            if (["L7", "JF", "7L", "FJ"].includes(lastSeenCorners)) {
              wallMet++;
            }
            lastSeenCorners = "";
          }
        }
      }
      nextPos = getNextPos(nextPos, direction);
    }
    if (wallMet % 2 === 0) {
      return false;
    }
  }
  return true;
}

export function solve(input: string): number {
  const lines = input.split("\n");

  const start = findStart(lines);

  let prevFront = start;
  let prevBack = start;
  let front = next(start, start, lines);
  let back = next(front, start, lines);

  const loop = [start, front, back];

  while (!isSame(front, back)) {
    const nextFront = next(prevFront, front, lines);
    const nextBack = next(prevBack, back, lines);

    if (isSame(nextFront, back) && isSame(nextBack, front)) {
      break;
    }

    prevFront = front;
    prevBack = back;
    front = nextFront;
    back = nextBack;
    loop.push(front, back);
  }

  let area = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (loop.some((wall) => isSame(wall, { y, x }))) {
        continue;
      }
      if (isWithinLoop({ y, x }, loop, lines)) {
        area++;
      }
    }
  }

  return area;
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
