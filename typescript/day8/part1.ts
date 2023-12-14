import { readFileSync } from "fs";
import path from "path";

type Node = {
  id: string;
  left: string;
  right: string;
};

function readNode(line: string): Node {
  const [id, navigationStr] = line.split(" = ");
  const [left, right] = navigationStr
    .slice(1, navigationStr.length - 1)
    .split(", ");

  return { id, left, right };
}

function walk(node: Node, instruction: string): string {
  if (instruction === "L") {
    return node.left;
  } else {
    return node.right;
  }
}

function navigate(nodes: Node[], instruction: string): number {
  let steps = 0;
  const destination = nodes.find((node) => node.id === "ZZZ")!;
  let currentNode = nodes.find((node) => node.id === "AAA")!;
  let restInstructions = instruction;

  while (currentNode.id !== destination.id) {
    if (restInstructions.length === 0) {
      restInstructions = instruction;
    }

    const nextInstruction = restInstructions[0];
    restInstructions = restInstructions.slice(1);

    const nextNodeId = walk(currentNode, nextInstruction);
    const nextNode = nodes.find((node) => node.id === nextNodeId);

    currentNode = nextNode!;

    steps++;
  }

  return steps;
}

export function solve(input: string): number {
  const [instruction, network] = input.split("\n\n");
  const nodes = network.split("\n").map(readNode);

  const steps = navigate(nodes, instruction);

  return steps;
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
