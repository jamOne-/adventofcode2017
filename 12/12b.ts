import { Test, runTests } from '../test-runner';
import * as fs from 'fs';

interface VisitNode {
    id: string;
    neighbours: string[];
    visited: boolean;
}

function solve(input: string) {
    const lines = input.split('\r\n');
    const nodes = new Map<string, VisitNode>();

    lines.forEach(line => {
        const [id, neighboursString] = line.split(' <-> ');
        nodes.set(id, { id, neighbours: neighboursString.split(', '), visited: false });
    });

    let groups = 0;
    for (const node of nodes.values()) {
        if (node.visited)
            continue;
            
        const q: VisitNode[] = [node];

        while (q.length > 0) {
            const node = q.shift() !;

            node.neighbours.forEach(neighbour => {
                const neighbourNode = nodes.get(neighbour) !;

                if (!neighbourNode.visited) {
                    neighbourNode.visited = true;
                    q.push(neighbourNode);
                }
            });
        }

        groups += 1;
    }

    return groups;
}

const testList: Test[] = [
    { input: '0 <-> 2\r\n1 <-> 1\r\n2 <-> 0, 3, 4\r\n3 <-> 2, 4\r\n4 <-> 2, 3, 6\r\n5 <-> 6\r\n6 <-> 4, 5', output: 2 },
];

runTests(solve, testList);

fs.readFile('./input.txt', 'utf8', (err, input) => {
    console.log('solve(input):', solve(input));
});
