import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

interface Node {
    id: string;
    children: string[];
    weight: number;
}

function solve(input: string) {
    const lines = input.split('\r\n');
    const nodes = new Map<string, Node>();
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

    return nodeId;
}

const testList: Test[] = [
    {
        // tslint:disable-next-line:max-line-length
        input: 'pbga (66)\r\nxhth (57)\r\nebii (61)\r\nhavc (66)\r\nktlj (57)\r\nfwft (72) -> ktlj, cntj, xhth\r\nqoyq (66)\r\npadx (45) -> pbga, havc, qoyq\r\ntknk (41) -> ugml, padx, fwft\r\njptl (61)\r\nugml (68) -> gyxo, ebii, jptl\r\ngyxo (61)\r\ncntj (57)',
        output: 'tknk',
    },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
