import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

interface Node {
    id: string;
    children: string[];
    weight: number;
}

const nodes = new Map<string, Node>();

function getProperWeight(weights: number[]) {
    return [...weights].sort((a, b) => a - b)[Math.floor(weights.length / 2)];
}

function calculateWeight(node: Node): { weight: number, balance: number } {
    if (node.children.length === 0) {
        return { weight: node.weight, balance: 0 };
    }

    const calculated = node.children.map(childId => calculateWeight(nodes.get(childId) !));
    const badBalance = calculated.find(({ balance }) => balance > 0);

    if (badBalance !== undefined) {
        return badBalance;
    }

    const weights = calculated.map(({ weight }) => weight);
    const weight = getProperWeight(weights);

    for (let i = 0; i < node.children.length; i += 1) {
        const nodeId = node.children[i];
        const w = weights[i];

        if (w !== weight) {
            return {
                weight: -1,
                balance: nodes.get(nodeId)!.weight + weight - w,
            };
        }
    }

    return {
        weight: weights.reduce((sum, weight) => sum + weight, node.weight),
        balance: 0,
    };
}

function solve(input: string) {
    const lines = input.split('\r\n');
    const parents = new Map<string, string>();

    lines.forEach(line => {
        const match = line.match(/(\w+).*?(\d+)(.*->\s+(.*))?/);
        const [_, id, weight, __, childrenString] = match !;
        const children = childrenString && childrenString.split(', ') || [];

        nodes.set(id, {
            id,
            children,
            weight: Number.parseInt(weight, 10),
        });

        children.forEach(child => parents.set(child, id));
    });

    let nodeId = parents.keys().next().value;
    while (parents.has(nodeId)) {
        nodeId = parents.get(nodeId) !;
    }

    const { balance } = calculateWeight(nodes.get(nodeId) !);

    return balance;
}

const testList: Test[] = [
    {
        // tslint:disable-next-line:max-line-length
        input: 'pbga (66)\r\nxhth (57)\r\nebii (61)\r\nhavc (66)\r\nktlj (57)\r\nfwft (72) -> ktlj, cntj, xhth\r\nqoyq (66)\r\npadx (45) -> pbga, havc, qoyq\r\ntknk (41) -> ugml, padx, fwft\r\njptl (61)\r\nugml (68) -> gyxo, ebii, jptl\r\ngyxo (61)\r\ncntj (57)',
        output: 60,
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
