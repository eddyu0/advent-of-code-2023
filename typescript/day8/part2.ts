import { readFileSync } from "fs";
import path from "path";
import { Node, readNode, walk } from "./part1";

function findStart(nodes: Node[]): Node[] {
  return nodes.filter((node) => node.id.endsWith("A"));
}

function isDestination(node: Node): boolean {
  return node.id.endsWith("Z");
}

function findNode(nodes: Node[], id: string): Node {
  return nodes.find((node) => node.id === id)!;
}

function findLCM(nums: number[]): number {
  const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

  return nums.reduce(lcm, 1);
}

function navigate(
  nodes: Node[],
  startNodes: Node[],
  instruction: string
): number {
  let steps = startNodes.map((node) => -1);
  let stepsCount = 0;
  let currentNodes = startNodes;
  let restInstructions = instruction;

  while (!steps.every((step) => step > 0)) {
    if (restInstructions.length === 0) {
      restInstructions = instruction;
    }

    const nextInstruction = restInstructions[0];
    restInstructions = restInstructions.slice(1);

    const nextNodesIds = currentNodes.map((node) =>
      walk(node, nextInstruction)
    );
    const nextNodes = nextNodesIds.map((id) => findNode(nodes, id));

    currentNodes = nextNodes!;

    stepsCount++;

    currentNodes.map(isDestination).forEach((isDest, index) => {
      if (isDest && steps[index] < 0) {
        steps[index] = stepsCount;
      }
    });
  }

  return findLCM(steps);
}

export function solve(input: string): number {
  const [instruction, network] = input.split("\n\n");
  const nodes = network.split("\n").map(readNode);

  const startNodes = findStart(nodes);
  const steps = navigate(nodes, startNodes, instruction);

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
