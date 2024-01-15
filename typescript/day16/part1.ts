import { readFileSync } from "fs";
import path from "path";
import { Direction, Position, isOutOfBound } from "../day10/part1";

function nextPos(pos: Position, direction: Direction): Position {
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
      throw new Error(`Unknown direction: ${direction}`);
  }
}

const reflection: Record<string, Record<Direction, Direction>> = {
  "/": {
    north: "east",
    east: "north",
    south: "west",
    west: "south",
  },
  "\\": {
    north: "west",
    west: "north",
    east: "south",
    south: "east",
  },
};

function encodeStep(pos: Position, dir: Direction): string {
  return `${pos.y},${pos.x}-${dir}`;
}

function traverse(
  maze: string[][],
  direction: Direction,
  pos: Position,
  history: string[]
): string[] {
  if (
    isOutOfBound(pos, maze) ||
    history.some((trail) => trail === encodeStep(pos, direction))
  ) {
    return history;
  }

  history.push(encodeStep(pos, direction));

  const object = maze[pos.y][pos.x];

  if (
    object === "." ||
    (["east", "west"].includes(direction) && object === "-") ||
    (["north", "south"].includes(direction) && object === "|")
  ) {
    const next = nextPos(pos, direction);
    return traverse(maze, direction, next, history);
  }

  if (object === "/" || object === "\\") {
    const nextDirection = reflection[object][direction];
    const next = nextPos(pos, nextDirection);
    return traverse(maze, nextDirection, next, history);
  }

  if (object === "-") {
    traverse(maze, "west", nextPos(pos, "west"), history);
    traverse(maze, "east", nextPos(pos, "east"), history);
    return history;
  } else {
    traverse(maze, "north", nextPos(pos, "north"), history);
    traverse(maze, "south", nextPos(pos, "south"), history);
    return history;
  }
}

export function solve(input: string): number {
  const maze = input.split("\n").map((line) => line.split(""));

  const history = traverse(maze, "east", { y: 0, x: 0 }, []);

  const result = new Set(history.map((trail) => trail.split("-")[0]));

  return result.size;
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
